/** Strip diacritics/accents via Unicode decomposition (é → e, ü → u). Pure. */
export function transform(text, o) {
  let r = text.normalize('NFKD').replace(/[̀-ͯ]/g, '');
  if (o.lowercase) r = r.toLowerCase();
  return r;
}
