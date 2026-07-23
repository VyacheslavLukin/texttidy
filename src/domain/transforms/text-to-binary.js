/**
 * Convert text to space-separated binary, or decode binary back to text. Pure.
 * Throws on an invalid binary token during decode (the UI adapter catches it).
 */
export function transform(text, o) {
  if (o.mode === 'decode') {
    return text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((t) => {
        if (!/^[01]+$/.test(t)) throw new Error(`Not binary: ${t}`);
        return String.fromCodePoint(Number.parseInt(t, 2));
      })
      .join('');
  }
  return [...text].map((ch) => ch.codePointAt(0).toString(2).padStart(8, '0')).join(' ');
}
