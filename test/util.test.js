import assert from 'node:assert/strict';
import { test } from 'node:test';
import { escapeRegExp, splitLines } from '../src/domain/util.js';

test('splitLines: handles LF, CRLF and lone CR', () => {
  assert.deepEqual(splitLines('a\nb'), ['a', 'b']);
  assert.deepEqual(splitLines('a\r\nb'), ['a', 'b']);
  assert.deepEqual(splitLines('a\rb'), ['a', 'b']);
  assert.deepEqual(splitLines(''), ['']);
});

test('escapeRegExp: escapes regex metacharacters', () => {
  assert.equal(escapeRegExp('a.b*c'), 'a\\.b\\*c');
  assert.equal(escapeRegExp('(x)[y]'), '\\(x\\)\\[y\\]');
  assert.equal(escapeRegExp('plain'), 'plain');
});
