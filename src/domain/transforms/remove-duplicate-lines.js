import { splitLines } from '../util.js';

export function transform(text, o) {
  const seen = Object.create(null);
  const out = [];
  for (const l of splitLines(text)) {
    let k = o.trim ? l.trim() : l;
    if (o.caseInsensitive) k = k.toLowerCase();
    if (seen[k]) continue;
    seen[k] = 1;
    out.push(l);
  }
  if (o.sort) out.sort((a, b) => a.localeCompare(b));
  return out.join('\n');
}
