/**
 * Strip punctuation and symbols from the text. Pure.
 * `toSpace` replaces each mark with a space; `collapse` merges the gaps.
 */
export function transform(text, o) {
  let r = text.replace(/[\p{P}\p{S}]/gu, o.toSpace ? ' ' : '');
  if (o.collapse) r = r.replace(/ {2,}/g, ' ');
  return r;
}
