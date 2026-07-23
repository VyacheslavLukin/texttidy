import { splitLines } from '../util.js';

export function transform(text, o) {
  let arr = splitLines(text);
  if (o.dedupe) {
    const seen = Object.create(null);
    const d = [];
    for (const l of arr) {
      const k = o.caseInsensitive ? l.toLowerCase() : l;
      if (seen[k]) continue;
      seen[k] = 1;
      d.push(l);
    }
    arr = d;
  }
  const collate = { sensitivity: o.caseInsensitive ? 'base' : 'variant' };
  const strcmp = (a, b) => a.localeCompare(b, undefined, collate);
  if (o.order === 'reverse') return arr.reverse().join('\n');
  const cmp =
    {
      az: strcmp,
      za: (a, b) => -strcmp(a, b),
      lenAsc: (a, b) => a.length - b.length || strcmp(a, b),
      lenDesc: (a, b) => b.length - a.length || strcmp(a, b),
    }[o.order] || strcmp;
  return arr.sort(cmp).join('\n');
}
