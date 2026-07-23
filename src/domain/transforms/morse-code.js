// International Morse: letters, digits, common punctuation, and '/' for a word gap.
const MAP = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  0: '-----',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '"': '.-..-.',
  '@': '.--.-.',
  ' ': '/',
};
const REV = Object.fromEntries(Object.entries(MAP).map(([k, v]) => [v, k]));

/**
 * Encode text to Morse (letters space-separated, words split by '/'), or decode
 * Morse back to text. Pure — unknown characters/codes are dropped.
 */
export function transform(text, o) {
  if (o.mode === 'decode') {
    return text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((code) => REV[code] || '')
      .join('');
  }
  return [...text.toUpperCase()]
    .map((ch) => MAP[ch] || '')
    .filter(Boolean)
    .join(' ');
}
