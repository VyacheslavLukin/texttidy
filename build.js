#!/usr/bin/env node

/* Static generator for TextTidy. No dependencies. Run: node build.js  → outputs ./dist */

import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { registry } from './src/domain/registry.js';
import pagesFactory from './src/pages.js';
import site from './src/site.js';
import tools from './src/tools.js';

const contentPages = pagesFactory(site);

const ROOT = import.meta.dirname;
const OUT = path.join(ROOT, 'dist');
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const url = (p) => site.origin + p;
const toolPath = (t) => `/${t.slug}/`;

const catLabel = (id) => site.categories.find((c) => c.id === id)?.label || '';

/* ---------- freshness dates (from git) ---------- */
// Honest per-page dateModified / sitemap lastmod: the most recent commit date across a page's
// source files. Falls back to the configured launch date when git history isn't available
// (e.g. a shallow CI clone, or a not-yet-committed file), so it is never a misleading build-now.
const gitDateCache = new Map();
function gitDate(file) {
  if (gitDateCache.has(file)) return gitDateCache.get(file);
  let d = '';
  try {
    d = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    d = '';
  }
  gitDateCache.set(file, d);
  return d;
}
function lastModified(files) {
  const dates = files.map(gitDate).filter(Boolean).sort(); // ISO dates sort chronologically
  return dates.length ? dates[dates.length - 1] : site.launchDate;
}
// The source files whose changes count as "this tool's content changed".
const toolSources = (t) => ['src/tools.js', `src/domain/transforms/${t.slug}.js`];

/* ---------- brand entity (Organization + WebSite) ---------- */
// Stable @id anchors so every page's `publisher: {@id}` reference resolves to one entity —
// the thing Google's Knowledge Graph and AI search engines use to know "who TextTidy is".
const ORG_ID = `${site.origin}/#organization`;
const SITE_ID = `${site.origin}/#website`;

function orgLd() {
  const p = site.publisher || {};
  const node = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: p.name || site.name,
    url: `${site.origin}/`,
    logo: url(p.logo || '/assets/apple-touch-icon.png'),
  };
  const sameAs = (p.sameAs || []).filter(Boolean);
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.name,
    url: `${site.origin}/`,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

/* ---------- shared chrome ---------- */
function header() {
  const links = ['remove-extra-spaces', 'change-case', 'sort-lines', 'find-and-replace']
    .map((s) => tools.find((t) => t.slug === s))
    .filter(Boolean)
    .map((t) => `<a href="${toolPath(t)}">${esc(t.name)}</a>`)
    .join('');
  return `<header class="site-header"><div class="wrap">
<a class="brand" href="/">Text<span>Tidy</span></a>
<nav>${links}<a href="/">All tools</a>
<button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme">◐ System</button>
</nav>
</div></header>`;
}

// Runs before paint on every page → no flash of the wrong theme.
const themeHeadJs = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
const themeHeadScript = `<script>${themeHeadJs}</script>`;

// Wires the System→Light→Dark cycle + persistence on every page (home has no app.js).
const themeToggleJs = `(function(){
var modes=['system','light','dark'],icon={system:'◐',light:'☀',dark:'☾'},label={system:'System',light:'Light',dark:'Dark'};
var btn=document.getElementById('theme-toggle');
function get(){try{return localStorage.getItem('theme')||'system';}catch(e){return 'system';}}
function apply(m){if(m==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);if(btn){btn.textContent=icon[m]+' '+label[m];btn.setAttribute('aria-label','Color theme: '+label[m]+' (click to change)');}}
apply(get());
if(btn)btn.addEventListener('click',function(){var next=modes[(modes.indexOf(get())+1)%3];try{localStorage.setItem('theme',next);}catch(e){}apply(next);});
})();`;
const themeToggleScript = `<script>${themeToggleJs}</script>`;

// SHA-256 (base64) of an inline script's body, for strict-CSP script-src allow-listing.
const sha256 = (s) => `'sha256-${crypto.createHash('sha256').update(s, 'utf8').digest('base64')}'`;
function footer() {
  return `<footer class="site-footer"><div class="wrap">
<span>${esc(site.name)} — ${esc(site.blurb)}</span>
<span><a href="/">All tools</a> · <a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · Runs in your browser</span>
</div></footer>`;
}

// Cloudflare Web Analytics beacon — cookieless, no consent banner required.
// Emitted only when a token is configured (empty token → nothing, e.g. local builds).
function analyticsScript() {
  const token = site.analytics?.cloudflareToken;
  if (!token) return '';
  return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify(
    { token }
  )}'></script>`;
}

/* ---------- security headers (Cloudflare _headers) ---------- */
// Content-Security-Policy is built from config: it stays tight by default and only opens up
// the specific origins analytics needs, and only when analytics is actually enabled.
function securityHeaders() {
  const analyticsOn = Boolean(site.analytics?.cloudflareToken);

  // Inline <script> bodies are allow-listed by hash (strong). No user-authored HTML is ever
  // emitted, so the XSS surface is already minimal — the CSP is defense-in-depth.
  const scriptSrc = ["'self'", sha256(themeHeadJs), sha256(themeToggleJs)];
  if (analyticsOn) scriptSrc.push('https://static.cloudflareinsights.com');

  const connectSrc = ["'self'"];
  if (analyticsOn) connectSrc.push('https://cloudflareinsights.com');

  const imgSrc = ["'self'", 'data:'];
  const frameSrc = ["'none'"];
  const styleSrc = ["'self'"];

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `img-src ${imgSrc.join(' ')}`,
    `style-src ${styleSrc.join(' ')}`,
    "font-src 'self'",
    `script-src ${scriptSrc.join(' ')}`,
    `connect-src ${connectSrc.join(' ')}`,
    `frame-src ${frameSrc.join(' ')}`,
  ].join('; ');

  const headers = [
    'X-Content-Type-Options: nosniff',
    'X-Frame-Options: DENY',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Strict-Transport-Security: max-age=31536000; includeSubDomains',
    'Permissions-Policy: accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()',
    `Content-Security-Policy: ${csp}`,
  ];

  return `/*\n${headers.map((h) => `  ${h}`).join('\n')}\n`;
}

function shell(opts) {
  const canonical = url(opts.pathname);
  // One @graph per page: the Organization entity is present everywhere so each page's
  // `publisher: {@id}` reference resolves to it. Node builders omit their own @context.
  const ld = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [orgLd(), ...(opts.jsonld || [])],
  })}</script>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14161a" media="(prefers-color-scheme: dark)">
${themeHeadScript}
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:image" content="${url('/assets/og.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)} — ${esc(site.tagline)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${url('/assets/og.png')}">
<link rel="stylesheet" href="/assets/styles.css">
${ld}
</head>
<body>
${header()}
<main class="wrap">
${opts.body}
</main>
${footer()}
${themeToggleScript}
${opts.script || ''}
${analyticsScript()}
</body>
</html>`;
}

/* ---------- related tools ---------- */
function related(tool) {
  const same = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug);
  const others = tools.filter((t) => t.category !== tool.category && t.slug !== tool.slug);
  const pick = same.concat(others).slice(0, 6);
  return `<section class="related"><h2>Related text tools</h2><div class="grid">${pick
    .map(
      (t) =>
        `<a class="card" href="${toolPath(t)}"><b>${esc(t.name)}</b><small>${esc(catLabel(t.category))}</small></a>`
    )
    .join('')}</div></section>`;
}

/* ---------- tool page ---------- */
function toolPage(tool) {
  const faqLd = {
    '@type': 'FAQPage',
    mainEntity: tool.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const appLd = {
    '@type': 'WebApplication',
    name: tool.name,
    url: url(toolPath(tool)),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    description: tool.metaDescription,
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'en',
    isAccessibleForFree: true,
    datePublished: site.launchDate,
    dateModified: lastModified(toolSources(tool)),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': ORG_ID },
  };
  const featureList = (tool.options || []).map((o) => o.label).filter(Boolean);
  if (featureList.length) appLd.featureList = featureList;
  // HowTo mirrors the visible "How to use" steps — a form AI answer engines and Google
  // extract directly. Pure derivation from tool.steps, no new copy.
  const howToLd = {
    '@type': 'HowTo',
    name: `How to use ${tool.name}`,
    description: tool.intro,
    step: tool.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
  };
  const crumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.origin}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: catLabel(tool.category),
        item: url(`/${tool.category}/`),
      },
      { '@type': 'ListItem', position: 3, name: tool.name, item: url(toolPath(tool)) },
    ],
  };

  const faqHtml = tool.faq
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join('');
  const stepsHtml = tool.steps.map((s) => `<li>${esc(s)}</li>`).join('');

  const body = `
<nav class="breadcrumb"><a href="/">Home</a> › <a href="/${tool.category}/">${esc(catLabel(tool.category))}</a> › ${esc(tool.name)}</nav>
<h1>${esc(tool.h1)}</h1>
<p class="lede">${esc(tool.answer)}</p>

<div class="tool">
  <div class="io">
    <label for="input">Input</label>
    <textarea id="input" placeholder="${esc(tool.inputPlaceholder || 'Paste your text here…')}"></textarea>
    <div class="count" id="in-count" role="status" aria-live="polite"></div>
  </div>
  <div class="io">
    <label for="output">Result</label>
    <textarea id="output" readonly placeholder="Result appears here…"></textarea>
    <div class="count" id="out-count" role="status" aria-live="polite"></div>
  </div>
</div>

<div class="options" id="options"></div>
<div class="actions">
  <button class="primary" id="copy">Copy result</button>
  <button id="clear">Clear</button>
  <span class="toast" id="toast" role="status">Copied!</span>
</div>

<div class="content">
  <h2>How to use</h2>
  <ol>${stepsHtml}</ol>
  <h2>About this tool</h2>
  <p>${esc(tool.intro)} ${esc(site.blurb)}</p>
  <h2>FAQ</h2>
  ${faqHtml}
</div>

${related(tool)}

<script type="application/json" id="tool-config">${JSON.stringify({ slug: tool.slug, options: tool.options || [] })}</script>`;

  return shell({
    pathname: toolPath(tool),
    title: tool.metaTitle,
    description: tool.metaDescription,
    jsonld: [appLd, faqLd, howToLd, crumbLd],
    body,
    script: '<script type="module" src="/assets/app.js"></script>',
  });
}

/* ---------- static content page (privacy, terms) ---------- */
function contentPage(page) {
  const pathname = `/${page.slug}/`;
  const sectionsHtml = page.sections
    .map((s) => {
      const paras = s.p.map((t) => `<p>${esc(t)}</p>`).join('');
      const list = s.ul ? `<ul>${s.ul.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>` : '';
      return `<h2>${esc(s.h)}</h2>${paras}${list}`;
    })
    .join('');

  const crumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.origin}/` },
      { '@type': 'ListItem', position: 2, name: page.h1, item: url(pathname) },
    ],
  };
  // A WebPage/AboutPage node (when the page opts in via schemaType) carries a real
  // dateModified and, for the About page, ties the page to the Organization entity.
  const jsonld = [crumbLd];
  if (page.schemaType) {
    const pageLd = {
      '@type': page.schemaType,
      name: page.h1,
      url: url(pathname),
      description: page.metaDescription,
      dateModified: lastModified(['src/pages.js', 'src/site.js']),
    };
    if (page.schemaType === 'AboutPage') pageLd.about = { '@id': ORG_ID };
    jsonld.unshift(pageLd);
  }

  // Legal pages carry a stated effective date; the About page doesn't.
  const updated = page.schemaType
    ? ''
    : `<p class="updated">Last updated: ${esc(site.legal.effectiveDate)}</p>`;

  const body = `
<nav class="breadcrumb"><a href="/">Home</a> › ${esc(page.h1)}</nav>
<h1>${esc(page.h1)}</h1>
<p class="lede">${esc(page.intro)}</p>
<div class="content legal">
  ${updated}
  ${sectionsHtml}
</div>`;

  return shell({
    pathname,
    title: page.metaTitle,
    description: page.metaDescription,
    jsonld,
    body,
  });
}

/* ---------- category hub page ---------- */
const catCard = (t) =>
  `<a class="card" href="${toolPath(t)}"><b>${esc(t.name)}</b><small>${esc(t.metaDescription.split('.')[0])}.</small></a>`;

function categoryPage(cat) {
  const pathname = `/${cat.id}/`;
  const list = tools.filter((t) => t.category === cat.id);
  const cards = list.map(catCard).join('');
  const others = site.categories
    .filter((c) => c.id !== cat.id)
    .map(
      (c) =>
        `<a class="card" href="/${c.id}/"><b>${esc(c.label)}</b><small>${esc(c.metaDescription.split('.')[0])}.</small></a>`
    )
    .join('');

  const collectionLd = {
    '@type': 'CollectionPage',
    name: cat.h1,
    url: url(pathname),
    description: cat.metaDescription,
    dateModified: lastModified(['src/site.js']),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: list.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        url: url(toolPath(t)),
      })),
    },
  };
  const crumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.origin}/` },
      { '@type': 'ListItem', position: 2, name: cat.label, item: url(pathname) },
    ],
  };

  const body = `
<nav class="breadcrumb"><a href="/">Home</a> › ${esc(cat.label)}</nav>
<h1>${esc(cat.h1)}</h1>
<p class="lede">${esc(cat.intro)}</p>
<div class="grid">${cards}</div>
<section class="related"><h2>Other categories</h2><div class="grid">${others}</div></section>`;

  return shell({
    pathname,
    title: cat.metaTitle,
    description: cat.metaDescription,
    jsonld: [collectionLd, crumbLd],
    body,
  });
}

/* ---------- home page ---------- */
function homePage() {
  const sections = site.categories
    .map((cat) => {
      const list = tools.filter((t) => t.category === cat.id);
      if (!list.length) return '';
      return `<h2 class="cat-title"><a href="/${cat.id}/">${esc(cat.label)}</a></h2><div class="grid">${list
        .map(catCard)
        .join('')}</div>`;
    })
    .join('');

  const itemList = {
    '@type': 'ItemList',
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: url(toolPath(t)),
    })),
  };

  const body = `
<section class="hero">
  <h1>${esc(site.name)} — ${esc(site.tagline)}</h1>
  <p>${esc(site.blurb)} No sign-up, no uploads — just paste and go.</p>
</section>
${sections}`;

  return shell({
    pathname: '/',
    title: `${site.name} — ${site.tagline}`,
    description: site.blurb,
    jsonld: [websiteLd(), itemList],
    body,
  });
}

/* ---------- 404 ---------- */
function notFoundPage() {
  const body = `
<section class="hero">
  <h1>Page not found</h1>
  <p>That page doesn't exist or has moved. Browse all ${tools.length} tools below.</p>
  <p><a href="/">← Back to all tools</a></p>
</section>`;
  return shell({
    pathname: '/404.html',
    title: `Page not found — ${site.name}`,
    description: 'The page you were looking for could not be found.',
    body,
  });
}

/* ---------- sitemap + robots ---------- */
function sitemap() {
  // Each URL gets an honest lastmod (real git commit date of its sources), not the build date,
  // so a redeploy that didn't change a page doesn't falsely bump its freshness.
  const entries = [
    { path: '/', mod: lastModified(['src/tools.js', 'src/site.js']) },
    ...site.categories.map((c) => ({ path: `/${c.id}/`, mod: lastModified(['src/site.js']) })),
    ...tools.map((t) => ({ path: toolPath(t), mod: lastModified(toolSources(t)) })),
    ...contentPages.map((p) => ({
      path: `/${p.slug}/`,
      mod: lastModified(['src/pages.js', 'src/site.js']),
    })),
  ];
  const urls = entries
    .map((e) => `<url><loc>${url(e.path)}</loc><lastmod>${e.mod}</lastmod></url>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
function robots() {
  // Everyone is allowed. The AI/search crawlers are listed explicitly as a deliberate
  // "yes, cite us" policy — AI-search citations drive referral traffic, which is the point of
  // an ad-supported utility site. To opt one out later, switch its Allow to Disallow.
  // Google-Extended / Applebot-Extended govern AI training & grounding only (not Search
  // indexing, which stays under the generic Googlebot / Bingbot rules).
  const agents = [
    '*',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'Claude-User',
    'Google-Extended',
    'Applebot-Extended',
  ];
  const groups = agents.map((a) => `User-agent: ${a}\nAllow: /`).join('\n\n');
  return `${groups}\n\nSitemap: ${url('/sitemap.xml')}\n`;
}

// llms.txt (llmstxt.org): a curated, crawl-friendly index of the site for LLMs / AI search.
// Same data as the sitemap, but as readable markdown with a one-line summary per tool.
function llmsTxt() {
  const out = [
    `# ${site.name}`,
    '',
    `> ${site.blurb}`,
    '',
    `${site.tagline}. Every tool runs entirely in the visitor's browser — no uploads, no sign-up, no accounts, no tracking cookies. Free to use.`,
    '',
    '## Browse by category',
    '',
  ];
  for (const cat of site.categories) {
    out.push(`- [${cat.label}](${url(`/${cat.id}/`)}): ${cat.metaDescription}`);
  }
  out.push('');
  for (const cat of site.categories) {
    const list = tools.filter((t) => t.category === cat.id);
    if (!list.length) continue;
    out.push(`## ${cat.label}`, '');
    for (const t of list) out.push(`- [${t.name}](${url(toolPath(t))}): ${t.metaDescription}`);
    out.push('');
  }
  out.push('## More', '');
  for (const p of contentPages) {
    out.push(`- [${p.h1}](${url(`/${p.slug}/`)}): ${p.metaDescription}`);
  }
  out.push('');
  return out.join('\n');
}

/* ---------- write ---------- */
function write(rel, content) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

// Integrity: every tool in tools.js must have a matching domain transform.
const missing = tools.filter((t) => typeof registry[t.slug] !== 'function');
if (missing.length) {
  console.error(`Missing transforms for: ${missing.map((t) => t.slug).join(', ')}`);
  process.exit(1);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, 'assets'), path.join(OUT, 'assets'), { recursive: true });
// Domain modules are served so the browser can import them at runtime.
fs.cpSync(path.join(ROOT, 'src', 'domain'), path.join(OUT, 'domain'), { recursive: true });

write('index.html', homePage());
for (const cat of site.categories) {
  write(`${cat.id}/index.html`, categoryPage(cat));
}
for (const t of tools) {
  write(`${t.slug}/index.html`, toolPage(t));
}
for (const p of contentPages) {
  write(`${p.slug}/index.html`, contentPage(p));
}
write('404.html', notFoundPage());
write('_headers', securityHeaders());
write('sitemap.xml', sitemap());
write('robots.txt', robots());
write('llms.txt', llmsTxt());

console.log(
  `Built ${tools.length + 1 + site.categories.length + contentPages.length} pages → dist/`
);
console.log(
  `  home + ${site.categories.length} categories + ${tools.length} tools + ${contentPages.length} content pages`
);
