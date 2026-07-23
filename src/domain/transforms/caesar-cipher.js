/**
 * Caesar-shift the letters (default 13 = ROT13). Non-letters pass through.
 * Pure — an unparseable shift is treated as 0 (text unchanged).
 */
export function transform(text, o) {
  let shift = Number.parseInt(o.shift, 10);
  if (Number.isNaN(shift)) shift = 0;
  if (o.decode) shift = -shift;
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= 'Z' ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base);
  });
}
