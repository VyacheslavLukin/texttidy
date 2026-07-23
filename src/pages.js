// Static content pages (privacy, terms) — data, not logic. The generator (build.js) renders
// these into standalone HTML pages. Copy is a starting-point TEMPLATE that reflects how the
// site actually works today (client-side processing, cookieless analytics, no ads);
// review it with a lawyer and adjust before you rely on it.
//
// A page is: { slug, metaTitle, metaDescription, h1, intro, sections }.
// A section is: { h, p: [paragraph, …], ul?: [item, …] }.

export default function pages(site) {
  const { entity, contactEmail, governingLaw } = site.legal;
  const brand = site.name;

  const privacy = {
    slug: 'privacy',
    metaTitle: `Privacy Policy — ${brand}`,
    metaDescription: `How ${brand} handles your data: text is processed in your browser and never uploaded. What we collect, cookies, analytics, and your rights.`,
    h1: 'Privacy Policy',
    intro: `Your privacy is the whole point of ${brand}. This policy explains what data is and isn't collected when you use the tools on this site.`,
    sections: [
      {
        h: 'The short version',
        p: [
          `The text you paste into any tool is processed entirely in your browser. It is never sent to, stored on, or seen by our servers. There is no account, no login, and no upload.`,
        ],
      },
      {
        h: 'Information we do not collect',
        p: [
          `We do not collect, transmit, or store the content you enter into the tools. All transformations run locally on your device using JavaScript. Because the processing happens client-side, your input never leaves your browser.`,
        ],
      },
      {
        h: 'Information stored on your device',
        p: [
          `To remember your colour-theme choice (System, Light, or Dark), we save a single value in your browser's local storage. It stays on your device, is not sent anywhere, and you can clear it any time via your browser settings.`,
        ],
      },
      {
        h: 'Analytics',
        p: [
          `We use privacy-friendly, cookieless analytics (Cloudflare Web Analytics) to understand aggregate traffic — for example, which tools are visited most. It does not use cookies, does not fingerprint visitors, and does not track you across sites or collect personal data. Measurement is aggregate only.`,
        ],
      },
      {
        h: 'Cookies',
        p: [
          `This site sets no cookies at all. Your colour-theme choice is kept in your browser's local storage (not a cookie), and the analytics are cookieless.`,
        ],
      },
      {
        h: 'Third-party services',
        p: [`We rely on a single service provider to run the site:`],
        ul: [`Cloudflare — hosting/CDN and cookieless analytics.`],
      },
      {
        h: 'Your rights',
        p: [
          `Under UK GDPR and the Data Protection Act 2018 you have rights to access, correct, or delete personal data a business holds about you (visitors elsewhere may have comparable rights under their local laws). Because we do not collect personal data or your tool input, we typically hold nothing to return or delete. To make a request, contact us at ${contactEmail}. You also have the right to complain to the UK's Information Commissioner's Office (ICO) at ico.org.uk.`,
        ],
      },
      {
        h: "Children's privacy",
        p: [
          `${brand} is a general-audience utility and is not directed to children under 13, and we do not knowingly collect personal information from them.`,
        ],
      },
      {
        h: 'Changes to this policy',
        p: [
          `We may update this policy as the site evolves. Material changes will be reflected here with a new effective date.`,
        ],
      },
      {
        h: 'Contact',
        p: [`Questions about this policy? Email ${contactEmail}.`],
      },
    ],
  };

  const terms = {
    slug: 'terms',
    metaTitle: `Terms of Service — ${brand}`,
    metaDescription: `The terms for using ${brand}'s free online text tools: the service is provided as-is, acceptable use, liability limits, and more.`,
    h1: 'Terms of Service',
    intro: `These terms govern your use of ${brand}. By using the site you agree to them.`,
    sections: [
      {
        h: 'Acceptance of terms',
        p: [
          `By accessing or using ${brand} (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.`,
        ],
      },
      {
        h: 'The service',
        p: [
          `${brand} provides free, browser-based text utilities. All processing happens locally in your browser; we do not receive or store the text you enter. The Service is provided free of charge.`,
        ],
      },
      {
        h: 'Acceptable use',
        p: [`You agree not to:`],
        ul: [
          `use the Service for any unlawful purpose or in violation of any applicable law;`,
          `attempt to disrupt, overload, or reverse-engineer the Service or its infrastructure;`,
          `use automated means to scrape or abuse the Service in a way that degrades it for others.`,
        ],
      },
      {
        h: 'No warranty',
        p: [
          `The Service is provided "as is" and "as available", without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy of output, or uninterrupted availability. You are responsible for verifying that any output meets your needs before relying on it.`,
        ],
      },
      {
        h: 'Limitation of liability',
        p: [
          `To the fullest extent permitted by law, ${entity} shall not be liable for any indirect, incidental, or consequential damages, or any loss of data or profits, arising from your use of or inability to use the Service.`,
        ],
      },
      {
        h: 'Intellectual property',
        p: [
          `The Service's name, design, and code are owned by ${entity} or its licensors. The text you process remains yours — we claim no rights over your content.`,
        ],
      },
      {
        h: 'Third-party links',
        p: [
          `The Service may link to third-party sites. We are not responsible for the content, products, or privacy practices of third parties.`,
        ],
      },
      {
        h: 'Changes to the service and terms',
        p: [
          `We may modify or discontinue the Service, and may update these terms, at any time. Continued use after changes take effect constitutes acceptance of the revised terms.`,
        ],
      },
      {
        h: 'Governing law',
        p: [
          `These terms are governed by the laws of ${governingLaw}, without regard to its conflict-of-law rules.`,
        ],
      },
      {
        h: 'Contact',
        p: [`Questions about these terms? Email ${contactEmail}.`],
      },
    ],
  };

  const about = {
    slug: 'about',
    schemaType: 'AboutPage',
    metaTitle: `About ${brand} — Free, Private, In-Browser Text Tools`,
    metaDescription: `What ${brand} is, how it keeps your text private by processing everything in your browser, and who builds and runs it.`,
    h1: `About ${brand}`,
    intro: `${brand} is a growing collection of fast, free text tools that run entirely in your browser — built around one simple idea: your text is yours, so it should never have to leave your device.`,
    sections: [
      {
        h: 'What it is',
        p: [
          `${brand} is a hub of small, focused utilities for everyday text jobs — cleaning up messy spacing, sorting and de-duplicating lists, changing case, extracting emails and links, counting words, converting to Morse or binary, and more. Each tool does one thing well, with no clutter and no learning curve: paste your text, tweak a couple of options, and copy the result.`,
        ],
      },
      {
        h: 'Private by design',
        p: [
          `Every transformation happens locally, in your browser, using JavaScript. The text you paste is never uploaded to a server, never stored, and never seen by us — there is nothing to log because the work is done on your own machine. That also makes the tools fast (no round-trip) and usable on sensitive text you would not want to send to a random website.`,
          `There are no accounts and no sign-up. The only thing saved on your device is your colour-theme preference — see the Privacy Policy for the full detail.`,
        ],
      },
      {
        h: 'Who builds it',
        p: [
          `${brand} is an independent project built and operated by ${entity}. It is developed in the open with a deliberately simple, dependency-free architecture, and new tools are added over time based on what people actually need.`,
        ],
      },
      {
        h: 'How it stays free',
        p: [
          `The site is free to use. It's cheap to run — static files on a CDN, with the actual work done in your browser rather than on servers — so there's no paywall, no accounts, and nothing to sell. Analytics, where used, are cookieless and aggregate: enough to see which tools are popular, and nothing more.`,
        ],
      },
      {
        h: 'Get in touch',
        p: [
          `Have a tool you would like to see, found a bug, or have a question? Email ${contactEmail} — suggestions for new tools are genuinely welcome and help decide what gets built next.`,
        ],
      },
    ],
  };

  return [about, privacy, terms];
}
