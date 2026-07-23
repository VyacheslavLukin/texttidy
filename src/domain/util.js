// Domain helpers — pure, no I/O. Shared by transforms (browser + Node tests).

/** Split on any newline style (LF, CRLF, or lone CR). */
export const splitLines = (t) => t.split(/\r\n|\r|\n/);

/** Escape a string for safe use as a literal inside a RegExp. */
export const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
