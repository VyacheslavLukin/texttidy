import { splitLines } from '../util.js';

export function transform(text, o) {
  const sep = o.replaceWith === 'none' ? '' : o.replaceWith === 'comma' ? ', ' : ' ';
  const joinPara = (p) =>
    splitLines(p)
      .map((s) => s.trim())
      .filter(Boolean)
      .join(sep);
  if (o.keepParagraphs) {
    return text
      .split(/\n[ \t]*\n/)
      .map(joinPara)
      .filter(Boolean)
      .join('\n\n');
  }
  return joinPara(text);
}
