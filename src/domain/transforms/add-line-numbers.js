import { splitLines } from '../util.js';

export function transform(text, o) {
  const lines = splitLines(text);
  let start = parseInt(o.start, 10);
  if (Number.isNaN(start)) start = 1;
  const blank = (l) => o.skipBlank && l.trim() === '';
  const total = lines.filter((l) => !blank(l)).length;
  const width = String(start + Math.max(total - 1, 0)).length;
  const sep = { dot: '. ', paren: ') ', tab: '\t', space: ' ' }[o.separator] || '. ';
  let n = start;
  return lines
    .map((l) => {
      if (blank(l)) return l;
      let num = String(n++);
      if (o.pad) num = num.padStart(width, '0');
      return num + sep + l;
    })
    .join('\n');
}
