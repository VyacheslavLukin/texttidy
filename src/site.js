// Site-wide config — the ONE place to change brand/domain/URL.
// Everything (titles, canonical, sitemap, schema) reads from here.
export default {
  name: 'TextTidy',
  tagline: 'Fast, private text tools that just work',
  // Placeholder domain — swap for your real one before launch. Must be https, no trailing slash.
  origin: 'https://texttidy.app',
  // Shown in footer / About. Keep short.
  blurb:
    'Free online text tools. Everything runs in your browser — your text never leaves your device.',
  // Date the site first went live. Feeds schema `datePublished` (an honest freshness/authority
  // signal for search + AI engines). `dateModified` is derived per-page from git in build.js.
  launchDate: '2026-07-06',
  // Publisher / brand entity — anchors the site in Google's Knowledge Graph and gives AI search
  // engines a stable "who is this" entity to cite. `logo` should be a raster ≥112×112.
  // `sameAs` lists official profiles (social, Wikipedia, Crunchbase…) — add them as they exist;
  // empty entries are omitted from the schema.
  publisher: {
    name: 'TextTidy',
    logo: '/assets/apple-touch-icon.png',
    sameAs: [],
  },
  // Categories double as hub pages (/clean/, /lines/, /transform/). `label` shows in nav/cards;
  // the SEO fields drive the generated category landing page. Keep the copy unique per category.
  categories: [
    {
      id: 'clean',
      label: 'Clean & Fix',
      h1: 'Clean & Fix Text Tools',
      metaTitle: 'Clean & Fix Text Tools — Remove Spaces, Accents & More',
      metaDescription:
        'Free online tools to clean up messy text: remove extra spaces, line breaks, accents, and punctuation, extract emails and URLs, and find & replace — all in your browser.',
      intro:
        'Tidy up messy text with this set of cleaning tools — collapse stray spaces, strip accents and punctuation, remove unwanted line breaks, pull out emails and links, and run bulk find-and-replace. Every tool works entirely in your browser, so your text never leaves your device.',
    },
    {
      id: 'lines',
      label: 'Lines',
      h1: 'Line Tools',
      metaTitle: 'Line Tools — Sort, Dedupe & Number Lines Online',
      metaDescription:
        'Free online tools for working with lists line by line: sort lines alphabetically or by length, remove duplicate or empty lines, and add line numbers. Private and in-browser.',
      intro:
        'Work with lists a line at a time — sort them alphabetically or by length, strip out duplicate or empty lines, and add sequential numbering. Ideal for cleaning up email lists, keyword lists, and any one-item-per-line data, all privately in your browser.',
    },
    {
      id: 'transform',
      label: 'Transform',
      h1: 'Transform Text Tools',
      metaTitle: 'Transform Text Tools — Case, Cipher, Binary, Morse & More',
      metaDescription:
        'Free online tools to transform text: change case, reverse text, generate URL slugs, count words, make fancy Unicode text, and encode Morse, binary, or Caesar cipher. In-browser.',
      intro:
        'Reshape and re-encode your text — change its case, reverse it, slugify a title, count word frequency, generate fancy Unicode letters, or encode it as Morse code, binary, or a Caesar cipher. Each transformation happens instantly in your browser, with nothing uploaded.',
    },
  ],
  // Analytics — Cloudflare Web Analytics (cookieless, no consent banner needed).
  // Paste the site token from the Cloudflare dashboard → Web Analytics.
  // Leave empty to disable (no script is emitted, e.g. for local builds).
  analytics: {
    cloudflareToken: '',
  },
  // Legal / contact — read by the privacy & terms pages (src/pages.js) and the footer.
  // Replace `entity` with the operating person/company and set a real contact address.
  legal: {
    // Sole trader: UK law (Electronic Commerce Regulations 2002) requires you to identify
    // yourself, so use your real name — typically '<Your name> trading as TextTidy'.
    // Appears in the Terms of Service.
    entity: 'Vyacheslav Lukin trading as TextTidy',
    contactEmail: 'privacy@texttidy.app',
    effectiveDate: '2026-07-06',
    // Jurisdiction whose law governs the Terms.
    governingLaw: 'England and Wales',
  },
};
