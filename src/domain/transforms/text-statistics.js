import { splitLines } from '../util.js';

/**
 * Produce a plain-text stats report for the input (counts + reading time).
 * Pure — deterministic `label: value` lines.
 */
export function transform(text, _o) {
  const words = (text.match(/\S+/g) || []).length;
  const minutes = words === 0 ? 0 : Math.max(1, Math.round(words / 200));
  const rows = [
    ['Characters', text.length],
    ['Characters (no spaces)', text.replace(/\s/g, '').length],
    ['Words', words],
    ['Sentences', (text.match(/[.!?]+(?:\s|$)/g) || []).length],
    ['Lines', text === '' ? 0 : splitLines(text).length],
    ['Paragraphs', text.split(/\n\s*\n/).filter((p) => p.trim() !== '').length],
    ['Reading time', `~${minutes} min`],
  ];
  return rows.map(([k, v]) => `${k}: ${v}`).join('\n');
}
