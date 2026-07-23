import { escapeRegExp } from '../util.js';

/**
 * Total for ordinary input. Throws only on an invalid user-supplied regex
 * (the documented error path the UI adapter catches).
 */
export function transform(text, o) {
  if (!o.find) return text;
  if (o.regex) {
    const re = new RegExp(o.find, o.caseInsensitive ? 'gi' : 'g'); // may throw
    return text.replace(re, o.replace);
  }
  if (o.caseInsensitive) {
    const re = new RegExp(escapeRegExp(o.find), 'gi');
    return text.replace(re, () => o.replace);
  }
  return text.split(o.find).join(o.replace);
}
