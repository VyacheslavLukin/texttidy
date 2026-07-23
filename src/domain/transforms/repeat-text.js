/** Repeat the text a set number of times, joined by a chosen separator. Pure. */
export function transform(text, o) {
  const n = Number.parseInt(o.count, 10);
  const times = Number.isNaN(n) || n < 1 ? 1 : n;
  const sep =
    o.separator === 'space'
      ? ' '
      : o.separator === 'comma'
        ? ', '
        : o.separator === 'none'
          ? ''
          : '\n';
  const joined = Array.from({ length: times }, () => text).join(sep);
  return o.trailing && sep ? joined + sep : joined;
}
