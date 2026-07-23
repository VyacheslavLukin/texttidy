// Unicode "math" alphabet starts (upper, lower, digit) — all hole-free styles.
const STYLES = {
  bold: [0x1d400, 0x1d41a, 0x1d7ce],
  sansBold: [0x1d5d4, 0x1d5ee, 0x1d7ec],
  mono: [0x1d670, 0x1d68a, 0x1d7f6],
};

/**
 * Map A–Z, a–z and 0–9 onto a Unicode display style (bold / sans-bold / mono).
 * Pure — non-alphanumeric characters pass through unchanged.
 */
export function transform(text, o) {
  const [U, L, D] = STYLES[o.style] || STYLES.bold;
  let out = '';
  for (const ch of text) {
    const c = ch.codePointAt(0);
    if (c >= 65 && c <= 90) out += String.fromCodePoint(U + (c - 65));
    else if (c >= 97 && c <= 122) out += String.fromCodePoint(L + (c - 97));
    else if (c >= 48 && c <= 57) out += String.fromCodePoint(D + (c - 48));
    else out += ch;
  }
  return out;
}
