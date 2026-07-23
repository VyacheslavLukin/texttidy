import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/remove-duplicate-lines.js';

test('remove-duplicate-lines: keeps first occurrence, preserves order', () => {
  const o = { caseInsensitive: false, trim: true, sort: false };
  assert.equal(transform('apple\nbanana\napple\ncherry', o), 'apple\nbanana\ncherry');
});

test('remove-duplicate-lines: case-insensitive treats Apple and apple as same', () => {
  const o = { caseInsensitive: true, trim: true, sort: false };
  assert.equal(transform('Apple\napple\nAPPLE', o), 'Apple');
});

test('remove-duplicate-lines: respects surrounding spaces when trim off', () => {
  const o = { caseInsensitive: false, trim: false, sort: false };
  assert.equal(transform('a\n a \na', o), 'a\n a ');
});

test('remove-duplicate-lines: sorts result when sort on', () => {
  const o = { caseInsensitive: false, trim: true, sort: true };
  assert.equal(transform('cherry\napple\ncherry\nbanana', o), 'apple\nbanana\ncherry');
});
