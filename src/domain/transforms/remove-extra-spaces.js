import { splitLines } from '../util.js';

export function transform(text, o) {
  let lines = splitLines(text).map((l) => {
    if (o.tabs) l = l.replace(/\t/g, ' ');
    if (o.collapse) l = l.replace(/ {2,}/g, ' ');
    if (o.trimLines) l = l.replace(/^ +| +$/g, '');
    return l;
  });
  if (o.dropBlank) lines = lines.filter((l) => l.trim() !== '');
  return lines.join('\n');
}
