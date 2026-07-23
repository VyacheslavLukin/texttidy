/** Pull every email address out of the text. Pure — empty string if none found. */
export function transform(text, o) {
  let list = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  if (o.unique) list = [...new Set(list)];
  if (o.sort) list = list.sort((a, b) => a.localeCompare(b));
  const sep = o.separator === 'comma' ? ', ' : o.separator === 'space' ? ' ' : '\n';
  return list.join(sep);
}
