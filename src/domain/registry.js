// Registry: slug → pure transform. Single source of truth for which tools exist
// in the domain. The web adapter loads transforms individually (per-page dynamic
// import); the generator uses this to verify every tool in tools.js has a transform.

import { transform as addLineNumbers } from './transforms/add-line-numbers.js';
import { transform as caesarCipher } from './transforms/caesar-cipher.js';
import { transform as changeCase } from './transforms/change-case.js';
import { transform as extractEmails } from './transforms/extract-emails.js';
import { transform as extractUrls } from './transforms/extract-urls.js';
import { transform as fancyText } from './transforms/fancy-text.js';
import { transform as findAndReplace } from './transforms/find-and-replace.js';
import { transform as morseCode } from './transforms/morse-code.js';
import { transform as removeAccents } from './transforms/remove-accents.js';
import { transform as removeDuplicateLines } from './transforms/remove-duplicate-lines.js';
import { transform as removeEmptyLines } from './transforms/remove-empty-lines.js';
import { transform as removeExtraSpaces } from './transforms/remove-extra-spaces.js';
import { transform as removeLineBreaks } from './transforms/remove-line-breaks.js';
import { transform as removePunctuation } from './transforms/remove-punctuation.js';
import { transform as repeatText } from './transforms/repeat-text.js';
import { transform as reverseText } from './transforms/reverse-text.js';
import { transform as slugify } from './transforms/slugify.js';
import { transform as sortLines } from './transforms/sort-lines.js';
import { transform as textStatistics } from './transforms/text-statistics.js';
import { transform as textToBinary } from './transforms/text-to-binary.js';
import { transform as wordFrequency } from './transforms/word-frequency.js';

export const registry = {
  'remove-extra-spaces': removeExtraSpaces,
  'remove-line-breaks': removeLineBreaks,
  'remove-empty-lines': removeEmptyLines,
  'remove-duplicate-lines': removeDuplicateLines,
  'sort-lines': sortLines,
  'change-case': changeCase,
  'reverse-text': reverseText,
  'add-line-numbers': addLineNumbers,
  'find-and-replace': findAndReplace,
  slugify: slugify,
  'remove-accents': removeAccents,
  'extract-emails': extractEmails,
  'extract-urls': extractUrls,
  'word-frequency': wordFrequency,
  'repeat-text': repeatText,
  'caesar-cipher': caesarCipher,
  'text-statistics': textStatistics,
  'remove-punctuation': removePunctuation,
  'text-to-binary': textToBinary,
  'morse-code': morseCode,
  'fancy-text': fancyText,
};
