import { splitLines } from '../util.js';

export function transform(text, o) {
  const isEmpty = (l) => (o.whitespaceCounts ? l.trim() === '' : l === '');
  const lines = splitLines(text);
  if (o.collapseToOne) {
    const out = [];
    let prev = false;
    for (const l of lines) {
      const e = isEmpty(l);
      if (e && prev) continue;
      out.push(e ? '' : l);
      prev = e;
    }
    return out.join('\n');
  }
  return lines.filter((l) => !isEmpty(l)).join('\n');
}
