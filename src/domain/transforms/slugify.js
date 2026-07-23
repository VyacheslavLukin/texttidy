import { splitLines } from '../util.js';

export function transform(text, o) {
  const sep = o.separator === 'underscore' ? '_' : '-';
  const one = (s) => {
    let r = s.normalize('NFKD').replace(/[̀-ͯ]/g, ''); // strip accents
    if (o.lowercase) r = r.toLowerCase();
    r = r.replace(/[^a-zA-Z0-9]+/g, ' ').replace(/^ +| +$/g, '');
    return r.replace(/ +/g, sep);
  };
  if (o.perLine) return splitLines(text).map(one).filter(Boolean).join('\n');
  return one(text);
}
