export function transform(text, o) {
  switch (o.mode) {
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'title':
      return text.replace(
        /\p{L}[\p{L}'’]*/gu,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      );
    case 'sentence':
      return text
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_m, p, c) => p + c.toUpperCase());
    case 'alternating': {
      let i = 0;
      return text.replace(/\p{L}/gu, (c) => {
        const r = i % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
        i++;
        return r;
      });
    }
    case 'inverse':
      return text.replace(/\p{L}/gu, (c) => {
        const lo = c.toLowerCase();
        return c === lo ? c.toUpperCase() : lo;
      });
    default:
      return text;
  }
}
