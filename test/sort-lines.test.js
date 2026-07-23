import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/sort-lines.js';

const base = { order: 'az', caseInsensitive: true, dedupe: false };

test('sort-lines: A to Z', () => {
  assert.equal(transform('cherry\napple\nbanana', base), 'apple\nbanana\ncherry');
});

test('sort-lines: Z to A', () => {
  assert.equal(
    transform('apple\ncherry\nbanana', { ...base, order: 'za' }),
    'cherry\nbanana\napple'
  );
});

test('sort-lines: shortest to longest', () => {
  assert.equal(transform('ccc\na\nbb', { ...base, order: 'lenAsc' }), 'a\nbb\nccc');
});

test('sort-lines: longest to shortest', () => {
  assert.equal(transform('a\nccc\nbb', { ...base, order: 'lenDesc' }), 'ccc\nbb\na');
});

test('sort-lines: equal-length lines break ties alphabetically (lenAsc)', () => {
  assert.equal(transform('bb\naa', { ...base, order: 'lenAsc' }), 'aa\nbb');
});

test('sort-lines: equal-length lines break ties alphabetically (lenDesc)', () => {
  assert.equal(transform('bb\naa', { ...base, order: 'lenDesc' }), 'aa\nbb');
});

test('sort-lines: reverse current order', () => {
  assert.equal(transform('a\nb\nc', { ...base, order: 'reverse' }), 'c\nb\na');
});

test('sort-lines: unknown order falls back to A to Z', () => {
  assert.equal(transform('b\na', { ...base, order: 'nonsense' }), 'a\nb');
});

test('sort-lines: case-sensitive sort when caseInsensitive off', () => {
  const out = transform('b\nA', { order: 'az', caseInsensitive: false, dedupe: false });
  assert.equal(out, 'A\nb');
});

test('sort-lines: dedupe removes duplicates before sorting', () => {
  assert.equal(transform('b\na\nb', { ...base, dedupe: true }), 'a\nb');
});

test('sort-lines: case-sensitive dedupe keeps differently-cased lines', () => {
  const o = { order: 'reverse', caseInsensitive: false, dedupe: true };
  assert.equal(transform('a\nA\na', o), 'A\na');
});
