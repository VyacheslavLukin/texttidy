/** Pull every http(s) URL out of the text. Pure — empty string if none found. */
export function transform(text, o) {
  let list = (text.match(/https?:\/\/[^\s<>"')]+/g) || []).map((u) => u.replace(/[.,;:!?]+$/, ''));
  if (o.unique) list = [...new Set(list)];
  if (o.sort) list = list.sort((a, b) => a.localeCompare(b));
  const sep = o.separator === 'comma' ? ', ' : o.separator === 'space' ? ' ' : '\n';
  return list.join(sep);
}
