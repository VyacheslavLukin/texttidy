import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/remove-punctuation.js';

test('remove-punctuation: default deletes marks, keeps letters', () => {
  assert.equal(
    transform("Hello, world! (don't)", { toSpace: false, collapse: true }),
    'Hello world dont'
  );
});

test('remove-punctuation: toSpace replaces marks with spaces', () => {
  assert.equal(transform('a,b.c', { toSpace: true, collapse: true }), 'a b c');
});

test('remove-punctuation: without collapse, gaps are preserved', () => {
  assert.equal(transform('a!!b', { toSpace: true, collapse: false }), 'a  b');
});

test('remove-punctuation: strips symbols too', () => {
  assert.equal(transform('cost = $5 + tax', { toSpace: false, collapse: true }), 'cost 5 tax');
});

test('remove-punctuation: empty input yields empty output', () => {
  assert.equal(transform('', { toSpace: false, collapse: true }), '');
});
