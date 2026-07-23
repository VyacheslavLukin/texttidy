/**
 * Count how often each word appears. Output is one `word: count` per line.
 * Pure — empty string when there are no qualifying words.
 */
export function transform(text, o) {
  const min = Number.parseInt(o.minLength, 10);
  const floor = Number.isNaN(min) ? 1 : min;
  const words = (text.match(/[\p{L}\p{N}']+/gu) || [])
    .map((w) => (o.caseInsensitive ? w.toLowerCase() : w))
    .filter((w) => w.length >= floor);
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);
  const entries = [...counts.entries()].sort((a, b) => {
    if (o.order === 'alpha') return a[0].localeCompare(b[0]);
    const diff = o.order === 'countAsc' ? a[1] - b[1] : b[1] - a[1];
    return diff || a[0].localeCompare(b[0]);
  });
  return entries.map(([w, c]) => `${w}: ${c}`).join('\n');
}
