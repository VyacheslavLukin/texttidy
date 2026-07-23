import { splitLines } from '../util.js';

export function transform(text, o) {
  if (o.mode === 'chars') return Array.from(text).reverse().join('');
  if (o.mode === 'lines') return splitLines(text).reverse().join('\n');
  // words: reverse the word order within each line
  return splitLines(text)
    .map((l) => l.split(/\s+/).filter(Boolean).reverse().join(' '))
    .join('\n');
}
