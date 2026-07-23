// Tool definitions = single source of truth. Add a tool here + a matching transform
// in assets/app.js (TOOLS[slug]) and it appears everywhere (nav, homepage, sitemap).
//
// option types: 'checkbox' (bool), 'select' (choices[]), 'text' (string)

export default [
  {
    slug: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    category: 'clean',
    metaTitle: 'Remove Extra Spaces from Text — Free Online Tool',
    metaDescription:
      'Instantly remove extra spaces, double spaces and stray tabs from any text or string. Free, private, works in your browser. Paste, clean, copy.',
    h1: 'Remove Extra Spaces',
    intro:
      'Collapse double (and triple) spaces in a string down to one, strip stray tabs, and tidy the ends of every line. Handy for cleaning text pasted from PDFs, emails, or the web.',
    answer:
      'Remove Extra Spaces collapses repeated spaces to a single space and strips stray tabs and trailing whitespace, so text pasted from PDFs, emails, or the web comes out evenly spaced. It runs entirely in your browser and is free to use.',
    inputPlaceholder: 'Paste text with   messy    spacing here…',
    options: [
      {
        key: 'collapse',
        type: 'checkbox',
        label: 'Collapse multiple spaces into one',
        default: true,
      },
      { key: 'tabs', type: 'checkbox', label: 'Convert tabs to a single space', default: true },
      {
        key: 'trimLines',
        type: 'checkbox',
        label: 'Trim spaces at start/end of each line',
        default: true,
      },
      { key: 'dropBlank', type: 'checkbox', label: 'Remove blank lines too', default: false },
    ],
    steps: [
      'Paste or type your text into the left box.',
      'Toggle the options to match what you want cleaned.',
      'Copy the tidied result from the right box.',
    ],
    faq: [
      {
        q: 'Does it remove single spaces between words?',
        a: 'No — only extra (repeated) spaces are collapsed to one, so normal word spacing is preserved.',
      },
      {
        q: 'Will it handle tabs and PDF spacing?',
        a: 'Yes. Enable “Convert tabs” and “Trim lines” to clean the irregular spacing common in copied PDFs.',
      },
      {
        q: 'Is my text uploaded anywhere?',
        a: 'No. The cleaning happens entirely in your browser; nothing is sent to a server.',
      },
    ],
  },
  {
    slug: 'remove-line-breaks',
    name: 'Remove Line Breaks',
    category: 'clean',
    metaTitle: 'Remove Line Breaks from Text — Free Online Tool',
    metaDescription:
      'Remove or delete line breaks and hard returns to join broken text into one paragraph or line. Ideal for text copied from PDFs and emails; optionally keep paragraph breaks. Free and private.',
    h1: 'Remove Line Breaks',
    intro:
      'Strip the hard line breaks — the stray linebreaks you get when copying out of PDFs, code, or emails — and join your text back into flowing paragraphs. You choose what replaces each break.',
    answer:
      'Remove Line Breaks deletes the hard returns inside a block of text and joins the lines back into flowing paragraphs, with an option to keep blank-line paragraph breaks. Everything happens locally in your browser — nothing is uploaded.',
    inputPlaceholder: 'Paste text with unwanted\nline\nbreaks here…',
    options: [
      {
        key: 'replaceWith',
        type: 'select',
        label: 'Replace each break with',
        default: 'space',
        choices: [
          { value: 'space', label: 'A space' },
          { value: 'none', label: 'Nothing (join directly)' },
          { value: 'comma', label: 'A comma + space' },
        ],
      },
      {
        key: 'keepParagraphs',
        type: 'checkbox',
        label: 'Keep paragraph breaks (blank lines)',
        default: true,
      },
    ],
    steps: [
      'Paste text that has line breaks in awkward places.',
      'Pick what should replace each break, and whether to keep paragraph gaps.',
      'Copy the joined text.',
    ],
    faq: [
      {
        q: 'What is the difference between a line break and a paragraph break?',
        a: 'A line break is a single new line; a paragraph break is a blank line between blocks. Keep the checkbox on to preserve paragraph gaps while removing single breaks.',
      },
      {
        q: 'Can I turn a list into a comma-separated line?',
        a: 'Yes — choose “A comma + space” to convert one-item-per-line lists into an inline, comma-separated list.',
      },
      {
        q: 'Does it change spacing inside lines?',
        a: 'No, only the line breaks between lines are affected.',
      },
    ],
  },
  {
    slug: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    category: 'lines',
    metaTitle: 'Remove Empty Lines from Text — Delete Blank Lines Online',
    metaDescription:
      'Delete blank and whitespace-only lines from your text in one click. Free online tool to remove empty or blank lines, runs in your browser, nothing uploaded.',
    h1: 'Remove Empty Lines',
    intro:
      'Delete the empty or blank lines — including lines that only contain spaces or tabs — to close up the gaps in a list or block of text.',
    answer:
      'Remove Empty Lines deletes blank and whitespace-only lines from your text to close up the gaps in a list or block, with an option to collapse runs of blanks down to a single line. It runs in your browser and keeps the remaining lines in order.',
    inputPlaceholder: 'Paste text with blank\n\nlines\n\n\nhere…',
    options: [
      {
        key: 'whitespaceCounts',
        type: 'checkbox',
        label: 'Treat whitespace-only lines as empty',
        default: true,
      },
      {
        key: 'collapseToOne',
        type: 'checkbox',
        label: 'Instead: collapse runs of blank lines to a single one',
        default: false,
      },
    ],
    steps: [
      'Paste text that has unwanted blank lines.',
      'Choose whether whitespace-only lines count as empty.',
      'Copy the compacted result.',
    ],
    faq: [
      {
        q: 'What about lines with just spaces?',
        a: 'Enable “Treat whitespace-only lines as empty” and they will be removed too.',
      },
      {
        q: 'Can I keep single blank lines between paragraphs?',
        a: 'Yes — turn on “collapse runs of blank lines to a single one” to keep paragraph spacing while removing the extra gaps.',
      },
      {
        q: 'Does the order of my lines change?',
        a: 'No, the remaining lines stay in their original order.',
      },
    ],
  },
  {
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'lines',
    metaTitle: 'Remove Duplicate Lines from Text — Free Online Tool',
    metaDescription:
      'Find and remove duplicate lines from a list. Case-insensitive option, keeps original order. Free, private, in-browser.',
    h1: 'Remove Duplicate Lines',
    intro:
      'Deduplicate a list so each line appears only once. Great for cleaning email lists, keyword lists, or any set of values with repeats.',
    answer:
      'Remove Duplicate Lines deletes repeated lines from a list so each one appears only once, keeping the first occurrence and the original order. Optional case-insensitive matching and A→Z sorting make it easy to tidy email or keyword lists, all in your browser.',
    inputPlaceholder: 'apple\nbanana\napple\ncherry\nbanana',
    options: [
      {
        key: 'caseInsensitive',
        type: 'checkbox',
        label: 'Ignore case (Apple = apple)',
        default: false,
      },
      {
        key: 'trim',
        type: 'checkbox',
        label: 'Ignore leading/trailing spaces when comparing',
        default: true,
      },
      { key: 'sort', type: 'checkbox', label: 'Also sort the result A→Z', default: false },
    ],
    steps: [
      'Paste your list, one item per line.',
      'Choose whether case and spacing should be ignored when matching.',
      'Copy the de-duplicated list.',
    ],
    faq: [
      {
        q: 'Which copy is kept?',
        a: 'The first occurrence of each line is kept and later duplicates are removed, preserving order unless you enable sorting.',
      },
      {
        q: 'Are near-duplicates with different capitalisation removed?',
        a: 'Only if you enable “Ignore case”, which treats “Apple” and “apple” as the same line.',
      },
      {
        q: 'Does it remove duplicate words within a line?',
        a: 'No — it works on whole lines. Use Find & Replace for within-line changes.',
      },
    ],
  },
  {
    slug: 'sort-lines',
    name: 'Sort Lines Alphabetically',
    category: 'lines',
    metaTitle: 'Sort Lines Alphabetically — Free Online Text Sorter',
    metaDescription:
      'Sort lines of text alphabetically (A→Z or Z→A), by length, or reverse them. Optional dedupe. Free online tool, in-browser.',
    h1: 'Sort Lines',
    intro:
      'Alphabetise a list, reverse it, or order lines by length. Optionally remove duplicates in the same pass.',
    answer:
      'Sort Lines reorders a list alphabetically (A→Z or Z→A), by length, or in reverse, with an option to remove duplicates in the same pass. Sorting happens instantly in your browser, and your text is never uploaded.',
    inputPlaceholder: 'cherry\napple\nbanana',
    options: [
      {
        key: 'order',
        type: 'select',
        label: 'Order',
        default: 'az',
        choices: [
          { value: 'az', label: 'A → Z' },
          { value: 'za', label: 'Z → A' },
          { value: 'lenAsc', label: 'Shortest → longest' },
          { value: 'lenDesc', label: 'Longest → shortest' },
          { value: 'reverse', label: 'Reverse current order' },
        ],
      },
      { key: 'caseInsensitive', type: 'checkbox', label: 'Case-insensitive sort', default: true },
      { key: 'dedupe', type: 'checkbox', label: 'Remove duplicate lines', default: false },
    ],
    steps: [
      'Paste your list, one item per line.',
      'Choose the sort order (and whether to dedupe).',
      'Copy the sorted list.',
    ],
    faq: [
      {
        q: 'Does it sort numbers correctly?',
        a: 'It sorts as text, so “10” comes before “2”. For pure numeric sorting, pad numbers or sort by length.',
      },
      {
        q: 'Is the sort case-sensitive?',
        a: 'By default it is case-insensitive, so capitalisation does not affect the order. Turn the option off for a strict, case-aware sort.',
      },
      {
        q: 'Can I both sort and dedupe?',
        a: 'Yes — enable “Remove duplicate lines” to do both at once.',
      },
    ],
  },
  {
    slug: 'change-case',
    name: 'Change Text Case',
    category: 'transform',
    metaTitle: 'Change Text Case — Uppercase, Lowercase, Title Case Converter',
    metaDescription:
      'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, or aLtErNaTiNg case instantly. Free online case converter.',
    h1: 'Change Text Case',
    intro:
      'Switch your text between UPPERCASE, lowercase, Title Case, Sentence case, and more — without retyping a thing.',
    answer:
      'Change Text Case converts your text between UPPERCASE, lowercase, Title Case, Sentence case, alternating case, and inverse case without retyping it. The conversion happens instantly in your browser and is free to use.',
    inputPlaceholder: 'Type or paste text to re-case…',
    options: [
      {
        key: 'mode',
        type: 'select',
        label: 'Convert to',
        default: 'sentence',
        choices: [
          { value: 'lower', label: 'lowercase' },
          { value: 'upper', label: 'UPPERCASE' },
          { value: 'title', label: 'Title Case' },
          { value: 'sentence', label: 'Sentence case' },
          { value: 'alternating', label: 'aLtErNaTiNg' },
          { value: 'inverse', label: 'iNVERSE (swap case)' },
        ],
      },
    ],
    steps: [
      'Paste the text you want to re-case.',
      'Pick the target case from the dropdown.',
      'Copy the converted text.',
    ],
    faq: [
      {
        q: 'What is the difference between Title Case and Sentence case?',
        a: 'Title Case capitalises the first letter of every word; Sentence case capitalises only the first letter of each sentence.',
      },
      {
        q: 'Does Title Case follow style-guide rules for small words?',
        a: 'This tool capitalises every word for predictability. For strict AP/Chicago rules that lowercase words like “of” and “the”, edit those by hand afterwards.',
      },
      {
        q: 'Will it change my punctuation?',
        a: 'No, only letter casing changes; punctuation and spacing are untouched.',
      },
    ],
  },
  {
    slug: 'reverse-text',
    name: 'Reverse Text',
    category: 'transform',
    metaTitle: 'Reverse Text — Flip Characters, Words or Lines Online',
    metaDescription:
      'Reverse text by characters, words, or lines. Flip a string backwards instantly with this free, private, in-browser tool.',
    h1: 'Reverse Text',
    intro:
      'Flip your text backwards — reverse the characters, the word order, or the order of lines.',
    answer:
      'Reverse Text flips your text backwards — by characters, by word order, or by line order — while keeping emoji and multi-byte characters intact. It runs entirely in your browser, with nothing uploaded.',
    inputPlaceholder: 'Type text to reverse…',
    options: [
      {
        key: 'mode',
        type: 'select',
        label: 'Reverse by',
        default: 'chars',
        choices: [
          { value: 'chars', label: 'Characters (olleh)' },
          { value: 'words', label: 'Word order' },
          { value: 'lines', label: 'Line order' },
        ],
      },
    ],
    steps: [
      'Paste or type your text.',
      'Choose whether to reverse characters, words, or lines.',
      'Copy the reversed result.',
    ],
    faq: [
      {
        q: 'Does character reverse handle emoji correctly?',
        a: 'Yes — it reverses by Unicode character, so multi-byte characters and most emoji stay intact rather than breaking apart.',
      },
      {
        q: 'What does “reverse word order” do?',
        a: 'It keeps each word spelled normally but puts the words in the opposite order, turning “one two three” into “three two one”.',
      },
      {
        q: 'Can I reverse a list?',
        a: 'Yes, choose “Line order” to flip a list so the last line becomes the first.',
      },
    ],
  },
  {
    slug: 'add-line-numbers',
    name: 'Add Line Numbers',
    category: 'lines',
    metaTitle: 'Add Line Numbers to Text — Free Online Tool',
    metaDescription:
      'Add sequential line numbers to any text. Choose start number, separator, and zero-padding. Free, private, in-browser.',
    h1: 'Add Line Numbers',
    intro:
      'Prefix every line with a running number. Useful for referencing items, numbering steps, or preparing a quick ordered list.',
    answer:
      'Add Line Numbers prefixes every line of your text with a sequential number, letting you choose the starting value, separator, and zero-padding. It’s a free, in-browser way to build numbered lists or reference lines by position.',
    inputPlaceholder: 'First item\nSecond item\nThird item',
    options: [
      { key: 'start', type: 'text', label: 'Start numbering at', default: '1' },
      {
        key: 'separator',
        type: 'select',
        label: 'Separator',
        default: 'dot',
        choices: [
          { value: 'dot', label: '1. text' },
          { value: 'paren', label: '1) text' },
          { value: 'tab', label: '1 → tab → text' },
          { value: 'space', label: '1 text' },
        ],
      },
      { key: 'pad', type: 'checkbox', label: 'Pad with zeros (01, 02, …)', default: false },
      { key: 'skipBlank', type: 'checkbox', label: 'Skip blank lines', default: true },
    ],
    steps: [
      'Paste your lines of text.',
      'Set the starting number, separator, and padding.',
      'Copy the numbered list.',
    ],
    faq: [
      {
        q: 'Can I start from a number other than 1?',
        a: 'Yes — set “Start numbering at” to any whole number.',
      },
      {
        q: 'Will blank lines get a number?',
        a: 'Not if “Skip blank lines” is on; blank lines are passed through unnumbered.',
      },
      {
        q: 'What is zero-padding for?',
        a: 'It keeps numbers aligned (01, 02 … 10) so lists line up neatly in monospaced contexts.',
      },
    ],
  },
  {
    slug: 'find-and-replace',
    name: 'Find and Replace Text',
    category: 'clean',
    metaTitle: 'Find and Replace Text Online — Free Bulk Replace Tool',
    metaDescription:
      'Find and replace text online, including case-insensitive and regex modes. Replace all occurrences instantly. Free and private.',
    h1: 'Find and Replace Text',
    intro:
      'Replace every occurrence of a word or pattern in your text. Supports case-insensitive matching and full regular expressions for power users.',
    answer:
      'Find and Replace swaps every occurrence of a word or pattern in your text for another, with optional case-insensitive matching and full regular-expression support. It replaces all matches in one pass, free and privately in your browser.',
    inputPlaceholder: 'Paste text to search and replace within…',
    options: [
      { key: 'find', type: 'text', label: 'Find', default: '' },
      { key: 'replace', type: 'text', label: 'Replace with', default: '' },
      { key: 'caseInsensitive', type: 'checkbox', label: 'Case-insensitive', default: false },
      { key: 'regex', type: 'checkbox', label: 'Use regular expression', default: false },
    ],
    steps: [
      'Paste your text.',
      'Enter what to find and what to replace it with.',
      'Copy the updated text — all matches are replaced at once.',
    ],
    faq: [
      {
        q: 'Does it replace all matches or just the first?',
        a: 'All matches are replaced in one pass.',
      },
      {
        q: 'Can I use regular expressions?',
        a: 'Yes — enable “Use regular expression” to match patterns, use capture groups in the replacement ($1), and more.',
      },
      {
        q: 'What if my regex is invalid?',
        a: 'The tool shows a small error and leaves your text unchanged until the pattern is valid.',
      },
    ],
  },
  {
    slug: 'slugify',
    name: 'URL Slug Generator',
    category: 'transform',
    metaTitle: 'URL Slug Generator — Convert Text to a Clean Slug',
    metaDescription:
      'Turn any title into a clean, SEO-friendly URL slug. Lowercases, removes accents and symbols, and joins words. Free online slugify tool.',
    h1: 'URL Slug Generator',
    intro:
      'Convert a title or phrase into a tidy, URL-safe slug — lowercase, accent-free, and hyphen-joined — ready to drop into a web address.',
    answer:
      'The URL Slug Generator turns a title or phrase into a clean, URL-safe slug: lowercase, accent-free, symbol-stripped, and hyphen-joined. It’s a free, in-browser way to create SEO-friendly web addresses from any text.',
    inputPlaceholder: 'My Great Blog Post: Draft #1',
    options: [
      {
        key: 'separator',
        type: 'select',
        label: 'Word separator',
        default: 'hyphen',
        choices: [
          { value: 'hyphen', label: 'Hyphen ( - )' },
          { value: 'underscore', label: 'Underscore ( _ )' },
        ],
      },
      { key: 'lowercase', type: 'checkbox', label: 'Lowercase everything', default: true },
      { key: 'perLine', type: 'checkbox', label: 'Slugify each line separately', default: false },
    ],
    steps: [
      'Paste a title or phrase.',
      'Pick a separator and options.',
      'Copy the ready-to-use slug.',
    ],
    faq: [
      {
        q: 'What does it do with accents and symbols?',
        a: 'Accented letters are converted to their plain ASCII form (é → e) and symbols/punctuation are removed, leaving a clean slug.',
      },
      {
        q: 'Why are hyphens preferred over underscores in URLs?',
        a: 'Search engines treat hyphens as word separators, so hyphenated slugs are generally more SEO-friendly than underscores.',
      },
      {
        q: 'Can I convert a whole list of titles at once?',
        a: 'Yes — enable “Slugify each line separately” to turn every line into its own slug.',
      },
    ],
  },
  {
    slug: 'remove-accents',
    name: 'Remove Accents',
    category: 'clean',
    metaTitle: 'Remove Accents from Text — Diacritics Stripper Online',
    metaDescription:
      'Remove accents and diacritics from text (é → e, ü → u, ñ → n). Convert accented letters to plain ASCII. Free, private, in-browser.',
    h1: 'Remove Accents & Diacritics',
    intro:
      'Convert accented and diacritical letters to their plain ASCII equivalents — turning “café”, “naïve”, and “Zürich” into “cafe”, “naive”, and “Zurich”. Useful for filenames, usernames, and ASCII-only systems.',
    answer:
      'Remove Accents converts accented and diacritical letters to their plain ASCII equivalents — café becomes cafe and Zürich becomes Zurich — ideal for usernames, filenames, and systems that only accept unaccented characters. It works entirely in your browser.',
    inputPlaceholder: 'Crème brûlée, jalapeño, Zürich…',
    options: [
      { key: 'lowercase', type: 'checkbox', label: 'Also lowercase the result', default: false },
    ],
    steps: [
      'Paste text containing accented characters.',
      'Optionally lowercase the output.',
      'Copy the plain-ASCII result.',
    ],
    faq: [
      {
        q: 'Which characters get converted?',
        a: 'Letters carrying diacritics — accents, umlauts, tildes, cedillas and the like — are decomposed to their base letter, so é becomes e and ñ becomes n.',
      },
      {
        q: 'Does it remove emoji or other symbols?',
        a: 'No. Only combining accent marks are stripped; emoji and non-Latin scripts are left untouched.',
      },
      {
        q: 'What is this useful for?',
        a: 'ASCII-only usernames and slugs, legacy systems that mishandle accents, and normalising names for search or sorting.',
      },
    ],
  },
  {
    slug: 'extract-emails',
    name: 'Extract Email Addresses',
    category: 'clean',
    metaTitle: 'Extract Email Addresses from Text — Free Online Tool',
    metaDescription:
      'Pull every email address out of a block of text. Deduplicate, sort, and choose the separator. Free, private, runs in your browser.',
    h1: 'Extract Email Addresses',
    intro:
      'Scan any block of text and pull out every email address it contains. Great for turning a messy paste — a thread, a page, a document — into a clean contact list.',
    answer:
      'Extract Email Addresses scans any block of text and pulls out every email address it contains, with options to remove duplicates, sort them, and choose a separator. The extraction runs locally in your browser, so your text is never uploaded.',
    inputPlaceholder: 'Paste text, emails, or a whole page here…',
    options: [
      { key: 'unique', type: 'checkbox', label: 'Remove duplicate addresses', default: true },
      { key: 'sort', type: 'checkbox', label: 'Sort A→Z', default: false },
      {
        key: 'separator',
        type: 'select',
        label: 'Separate results with',
        default: 'newline',
        choices: [
          { value: 'newline', label: 'One per line' },
          { value: 'comma', label: 'Comma + space' },
          { value: 'space', label: 'A space' },
        ],
      },
    ],
    steps: [
      'Paste the text that contains email addresses.',
      'Choose whether to dedupe, sort, and how to separate them.',
      'Copy the extracted list.',
    ],
    faq: [
      {
        q: 'What counts as an email address?',
        a: 'Anything matching the standard name@domain.tld shape is captured; stray text around it is ignored.',
      },
      {
        q: 'Are duplicates removed?',
        a: 'By default yes — the same address appearing twice is kept once. Turn off “Remove duplicate addresses” to keep every occurrence.',
      },
      {
        q: 'Is my text sent anywhere?',
        a: 'No. Extraction happens entirely in your browser; nothing is uploaded.',
      },
    ],
  },
  {
    slug: 'extract-urls',
    name: 'Extract URLs',
    category: 'clean',
    metaTitle: 'Extract URLs from Text — Free Online Link Extractor',
    metaDescription:
      'Extract all links (http and https URLs) from a block of text. Deduplicate, sort, and pick the separator. Free and private, in-browser.',
    h1: 'Extract URLs from Text',
    intro:
      'Pull every web link out of a block of text at once. Paste an article, an email, or raw HTML and get back a clean list of the http and https URLs inside it.',
    answer:
      'Extract URLs finds every http and https link inside a block of text or HTML and returns them as a clean list you can dedupe, sort, and separate however you like. It processes everything in your browser — nothing leaves your device.',
    inputPlaceholder: 'Paste text or HTML containing links…',
    options: [
      { key: 'unique', type: 'checkbox', label: 'Remove duplicate links', default: true },
      { key: 'sort', type: 'checkbox', label: 'Sort A→Z', default: false },
      {
        key: 'separator',
        type: 'select',
        label: 'Separate results with',
        default: 'newline',
        choices: [
          { value: 'newline', label: 'One per line' },
          { value: 'comma', label: 'Comma + space' },
          { value: 'space', label: 'A space' },
        ],
      },
    ],
    steps: [
      'Paste text or HTML that contains links.',
      'Choose dedupe, sort, and separator options.',
      'Copy the list of URLs.',
    ],
    faq: [
      {
        q: 'Which links are detected?',
        a: 'Absolute URLs starting with http:// or https://. A trailing sentence period or comma is trimmed so the link stays clean.',
      },
      {
        q: 'Does it find links without http://?',
        a: 'No — only absolute URLs with a scheme are matched, to avoid false positives on ordinary words with dots.',
      },
      {
        q: 'Can I get them comma-separated?',
        a: 'Yes — choose “Comma + space” to produce an inline, comma-separated list.',
      },
    ],
  },
  {
    slug: 'word-frequency',
    name: 'Word Frequency Counter',
    category: 'transform',
    metaTitle: 'Word Frequency Counter — Count Word Occurrences Online',
    metaDescription:
      'Count how often each word appears in your text. Sort by frequency or alphabetically, ignore case, and filter short words. Free, in-browser.',
    h1: 'Word Frequency Counter',
    intro:
      'See how often each word appears in your text, ranked from most to least frequent. Handy for keyword analysis, checking for overused words, and studying writing style.',
    answer:
      'The Word Frequency Counter tallies how many times each word appears in your text and ranks them from most to least frequent, with options to ignore case and filter out short words. It’s handy for keyword analysis and spotting overused words, and runs privately in your browser.',
    inputPlaceholder: 'Paste an article, essay, or any block of text…',
    options: [
      {
        key: 'order',
        type: 'select',
        label: 'Order',
        default: 'countDesc',
        choices: [
          { value: 'countDesc', label: 'Most frequent first' },
          { value: 'countAsc', label: 'Least frequent first' },
          { value: 'alpha', label: 'Alphabetical' },
        ],
      },
      { key: 'caseInsensitive', type: 'checkbox', label: 'Ignore case (The = the)', default: true },
      { key: 'minLength', type: 'text', label: 'Ignore words shorter than', default: '1' },
    ],
    steps: [
      'Paste the text you want to analyse.',
      'Choose the order and whether case matters.',
      'Copy the word → count list.',
    ],
    faq: [
      {
        q: 'How is a “word” defined?',
        a: 'A run of letters, digits, or apostrophes. Punctuation and spaces separate words, so “don’t” counts as one word.',
      },
      {
        q: 'How are ties broken?',
        a: 'Words with the same count are listed alphabetically, so the output is stable and predictable.',
      },
      {
        q: 'Can I skip common short words?',
        a: 'Set “Ignore words shorter than” to, say, 4 to drop most filler words like “a”, “the”, and “of”.',
      },
    ],
  },
  {
    slug: 'repeat-text',
    name: 'Repeat Text',
    category: 'transform',
    metaTitle: 'Repeat Text — Duplicate a String N Times Online',
    metaDescription:
      'Repeat text a set number of times with a separator of your choice — new line, space, comma, or none. Free, private, in-browser tool.',
    h1: 'Repeat Text',
    intro:
      'Duplicate a word, line, or block of text as many times as you need, joined by whatever separator you choose. Useful for test data, placeholders, and quick lists.',
    answer:
      'Repeat Text duplicates a word, line, or block a set number of times, joined by a new line, space, comma, or nothing at all. It’s a quick, in-browser way to generate placeholder text, test data, or repetitive lists.',
    inputPlaceholder: 'Type the text to repeat…',
    options: [
      { key: 'count', type: 'text', label: 'Number of times', default: '3' },
      {
        key: 'separator',
        type: 'select',
        label: 'Separate copies with',
        default: 'newline',
        choices: [
          { value: 'newline', label: 'A new line' },
          { value: 'space', label: 'A space' },
          { value: 'comma', label: 'A comma + space' },
          { value: 'none', label: 'Nothing (join directly)' },
        ],
      },
      {
        key: 'trailing',
        type: 'checkbox',
        label: 'Add a separator after the last copy',
        default: false,
      },
    ],
    steps: [
      'Type or paste the text you want repeated.',
      'Set how many times and how to separate the copies.',
      'Copy the repeated output.',
    ],
    faq: [
      {
        q: 'What happens with an invalid count?',
        a: 'A blank, non-numeric, or less-than-one count falls back to a single copy, so you always get valid output.',
      },
      {
        q: 'Can I repeat multiple lines at once?',
        a: 'Yes — the entire input block is treated as one unit and repeated together.',
      },
      {
        q: 'How do I get a trailing separator?',
        a: 'Enable “Add a separator after the last copy” — handy for building comma-separated values that end with a comma.',
      },
    ],
  },
  {
    slug: 'caesar-cipher',
    name: 'Caesar Cipher / ROT13',
    category: 'transform',
    metaTitle: 'Caesar Cipher & ROT13 Encoder/Decoder — Free Online Tool',
    metaDescription:
      'Encode or decode text with a Caesar cipher or ROT13. Set any shift value; letters rotate, other characters pass through. Free, in-browser.',
    h1: 'Caesar Cipher / ROT13',
    intro:
      'Shift every letter along the alphabet by a fixed amount — the classic Caesar cipher. Leave the shift at 13 for ROT13, the self-reversing encoding used to hide spoilers and puzzle answers.',
    answer:
      'The Caesar Cipher tool shifts every letter along the alphabet by a fixed amount to encode or decode text; leaving the shift at 13 gives you ROT13, the self-reversing cipher used to hide spoilers. Non-letters pass through unchanged, and it all runs in your browser.',
    inputPlaceholder: 'Type text to encode or decode…',
    options: [
      { key: 'shift', type: 'text', label: 'Shift by', default: '13' },
      { key: 'decode', type: 'checkbox', label: 'Decode (reverse the shift)', default: false },
    ],
    steps: [
      'Type or paste your text.',
      'Set the shift (13 = ROT13) and whether to decode.',
      'Copy the transformed text.',
    ],
    faq: [
      {
        q: 'What is ROT13?',
        a: 'A Caesar cipher with a shift of 13. Because the alphabet has 26 letters, applying it twice returns the original text, so the same setting both encodes and decodes.',
      },
      {
        q: 'What happens to numbers and punctuation?',
        a: 'Only A–Z and a–z are shifted; digits, spaces, and punctuation pass through unchanged. Letter case is preserved.',
      },
      {
        q: 'Is a Caesar cipher secure?',
        a: 'No — it is trivially broken and is meant for fun, puzzles, and lightly obscuring text (like spoilers), not real security.',
      },
    ],
  },
  {
    slug: 'text-statistics',
    name: 'Word & Character Counter',
    category: 'transform',
    metaTitle: 'Word & Character Counter — Count Words, Characters, Lines',
    metaDescription:
      'Count words, characters (with and without spaces), sentences, lines, paragraphs, and reading time. Free online counter, runs in your browser.',
    h1: 'Word & Character Counter',
    intro:
      'Get an instant breakdown of your text — words, characters with and without spaces, sentences, lines, paragraphs, and an estimated reading time. Perfect for essays, posts, and character-limited fields.',
    answer:
      'The Word & Character Counter gives an instant breakdown of your text — words, characters with and without spaces, sentences, lines, paragraphs, and estimated reading time. It updates as you type and counts everything locally in your browser.',
    inputPlaceholder: 'Paste or type your text to analyse…',
    options: [],
    steps: [
      'Paste or type your text on the left.',
      'Read the full breakdown on the right — it updates as you type.',
      'Copy the report if you need it.',
    ],
    faq: [
      {
        q: 'How is reading time estimated?',
        a: 'It assumes an average reading speed of about 200 words per minute and rounds to the nearest minute.',
      },
      {
        q: 'How do you count sentences?',
        a: 'Sentences are counted by terminal punctuation (. ! ?), so most prose is counted accurately, though unusual punctuation may be approximate.',
      },
      {
        q: 'Is there a character limit?',
        a: 'No — paste as much as you like. Everything is counted locally in your browser, so nothing is uploaded.',
      },
    ],
  },
  {
    slug: 'remove-punctuation',
    name: 'Remove Punctuation',
    category: 'clean',
    metaTitle: 'Remove Punctuation from Text — Free Online Tool',
    metaDescription:
      'Strip punctuation and symbols from text in one click. Optionally replace marks with spaces and collapse the gaps. Free, private, in-browser.',
    h1: 'Remove Punctuation',
    intro:
      'Delete commas, periods, quotes, and other punctuation and symbols from your text — leaving just the words. Handy for tokenising, cleaning data, or prepping text for analysis.',
    answer:
      'Remove Punctuation strips commas, periods, quotes, and other punctuation and symbols from your text, leaving just words, numbers, and spaces. You can delete the marks or turn them into spaces, all privately in your browser.',
    inputPlaceholder: 'Paste text with punctuation to strip…',
    options: [
      {
        key: 'toSpace',
        type: 'checkbox',
        label: 'Replace each mark with a space (instead of deleting)',
        default: false,
      },
      {
        key: 'collapse',
        type: 'checkbox',
        label: 'Collapse repeated spaces into one',
        default: true,
      },
    ],
    steps: [
      'Paste the text you want to clean.',
      'Choose whether marks are deleted or turned into spaces.',
      'Copy the punctuation-free result.',
    ],
    faq: [
      {
        q: 'Does it remove apostrophes inside words?',
        a: 'Yes — apostrophes are punctuation, so “don’t” becomes “dont”. If you need to keep contractions, review the output afterwards.',
      },
      {
        q: 'What about currency and math symbols?',
        a: 'Symbols like $, =, and + are removed along with punctuation, leaving letters, numbers, and spaces.',
      },
      {
        q: 'Will my line breaks survive?',
        a: 'Yes — only punctuation and symbols are affected; line breaks and letters are preserved.',
      },
    ],
  },
  {
    slug: 'text-to-binary',
    name: 'Text to Binary',
    category: 'transform',
    metaTitle: 'Text to Binary Converter — Encode & Decode Online',
    metaDescription:
      'Convert text to binary and binary back to text. Encodes each character as 8-bit binary. Free, private, in-browser translator.',
    h1: 'Text to Binary Converter',
    intro:
      'Translate text into binary — each character as a run of zeros and ones — or decode binary back into readable text. A fun way to see how computers store letters.',
    answer:
      'The Text to Binary converter translates text into 8-bit binary — each character as a run of zeros and ones — and decodes binary back into readable text. It handles any character, including emoji, and runs entirely in your browser.',
    inputPlaceholder: 'Type text to encode, or paste binary to decode…',
    options: [
      {
        key: 'mode',
        type: 'select',
        label: 'Mode',
        default: 'encode',
        choices: [
          { value: 'encode', label: 'Text → Binary' },
          { value: 'decode', label: 'Binary → Text' },
        ],
      },
    ],
    steps: [
      'Choose whether to encode text or decode binary.',
      'Paste your input.',
      'Copy the converted result.',
    ],
    faq: [
      {
        q: 'How is each character encoded?',
        a: 'Each character’s Unicode code point is written in binary and padded to at least 8 bits, with a space between characters.',
      },
      {
        q: 'What happens if my binary is invalid?',
        a: 'When decoding, any token that is not made of 0s and 1s stops the conversion with a small error, so you can fix the input.',
      },
      {
        q: 'Can it handle emoji?',
        a: 'Yes — characters beyond the basic set are encoded by their full code point and decode back correctly.',
      },
    ],
  },
  {
    slug: 'morse-code',
    name: 'Morse Code Translator',
    category: 'transform',
    metaTitle: 'Morse Code Translator & Converter — Text to Morse & Back',
    metaDescription:
      'Translate or convert text to Morse code and decode Morse back to text. Supports letters, numbers, and punctuation. Free, private, in-browser tool.',
    h1: 'Morse Code Translator',
    intro:
      'Convert text into International Morse code — dots and dashes — or decode Morse back into plain text. Letters are separated by spaces and words by a slash (/).',
    answer:
      'The Morse Code Translator converts text into International Morse code (dots and dashes) and decodes Morse back into plain text, separating letters with spaces and words with a slash. It supports letters, digits, and punctuation, free and in your browser.',
    inputPlaceholder: 'Type text to encode, or paste Morse (. and -) to decode…',
    options: [
      {
        key: 'mode',
        type: 'select',
        label: 'Mode',
        default: 'encode',
        choices: [
          { value: 'encode', label: 'Text → Morse' },
          { value: 'decode', label: 'Morse → Text' },
        ],
      },
    ],
    steps: [
      'Choose to encode text or decode Morse.',
      'Paste your input (use spaces between letters, “/” between words).',
      'Copy the translation.',
    ],
    faq: [
      {
        q: 'How are words separated?',
        a: 'A forward slash (/) marks a gap between words, while single spaces separate the letters within a word.',
      },
      {
        q: 'What characters are supported?',
        a: 'The 26 letters, digits 0–9, and common punctuation. Unsupported characters are skipped so the rest still translates.',
      },
      {
        q: 'Is the output case-sensitive?',
        a: 'Morse has no case, so decoding returns upper-case text and encoding treats upper and lower case the same.',
      },
    ],
  },
  {
    slug: 'fancy-text',
    name: 'Fancy Text Generator',
    category: 'transform',
    metaTitle: 'Fancy Text Generator — Bold & Unicode Font Styles Online',
    metaDescription:
      'Turn plain text into bold, sans-serif bold, or monospace Unicode letters you can paste into bios, posts, and usernames. Free, in-browser.',
    h1: 'Fancy Text Generator',
    intro:
      'Convert ordinary letters and numbers into eye-catching Unicode styles — 𝐛𝐨𝐥𝐝, 𝘀𝗮𝗻𝘀-𝗯𝗼𝗹𝗱, and 𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 — that you can paste into social bios, posts, and usernames where real formatting is not allowed.',
    answer:
      'The Fancy Text Generator turns plain letters and numbers into bold, sans-serif bold, or monospace Unicode characters you can paste into social bios, posts, and usernames where normal formatting is blocked. Everything is generated in your browser.',
    inputPlaceholder: 'Type text to make fancy…',
    options: [
      {
        key: 'style',
        type: 'select',
        label: 'Style',
        default: 'bold',
        choices: [
          { value: 'bold', label: '𝐁𝐨𝐥𝐝' },
          { value: 'sansBold', label: '𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱' },
          { value: 'mono', label: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎' },
        ],
      },
    ],
    steps: [
      'Type or paste your text.',
      'Pick a Unicode style.',
      'Copy the styled text and paste it anywhere.',
    ],
    faq: [
      {
        q: 'Why does this work in bios that block formatting?',
        a: 'These are not fonts — they are distinct Unicode characters that look bold or monospace, so they survive plain-text fields that strip normal formatting.',
      },
      {
        q: 'Will it look right everywhere?',
        a: 'Most modern devices render these characters, but very old systems or some apps may show boxes for a few of them.',
      },
      {
        q: 'Does it change my spaces and punctuation?',
        a: 'No — only letters and digits are restyled; spaces, punctuation, and emoji pass through unchanged.',
      },
    ],
  },
];
