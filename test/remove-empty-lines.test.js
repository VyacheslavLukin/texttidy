import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/remove-empty-lines.js';

test('remove-empty-lines: removes blank and whitespace-only lines', () => {
  const o = { whitespaceCounts: true, collapseToOne: false };
  assert.equal(transform('a\n\n  \nb', o), 'a\nb');
});

test('remove-empty-lines: keeps whitespace-only lines when not counted as empty', () => {
  const o = { whitespaceCounts: false, collapseToOne: false };
  assert.equal(transform('a\n \n\nb', o), 'a\n \nb');
});

test('remove-empty-lines: collapses runs of blanks to a single blank', () => {
  const o = { whitespaceCounts: true, collapseToOne: true };
  assert.equal(transform('a\n\n\n\nb', o), 'a\n\nb');
});

test('remove-empty-lines: empty input yields empty output', () => {
  assert.equal(transform('', { whitespaceCounts: true, collapseToOne: false }), '');
});
