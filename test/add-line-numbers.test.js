import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/add-line-numbers.js';

test('add-line-numbers: numbers from 1 with dot separator', () => {
  const o = { start: '1', separator: 'dot', pad: false, skipBlank: true };
  assert.equal(transform('a\nb', o), '1. a\n2. b');
});

test('add-line-numbers: invalid start falls back to 1', () => {
  const o = { start: 'x', separator: 'dot', pad: false, skipBlank: true };
  assert.equal(transform('a', o), '1. a');
});

test('add-line-numbers: custom start and paren separator', () => {
  const o = { start: '5', separator: 'paren', pad: false, skipBlank: true };
  assert.equal(transform('a\nb', o), '5) a\n6) b');
});

test('add-line-numbers: tab and space separators', () => {
  assert.equal(
    transform('a', { start: '1', separator: 'tab', pad: false, skipBlank: true }),
    '1\ta'
  );
  assert.equal(
    transform('a', { start: '1', separator: 'space', pad: false, skipBlank: true }),
    '1 a'
  );
});

test('add-line-numbers: unknown separator falls back to dot', () => {
  const o = { start: '1', separator: 'zzz', pad: false, skipBlank: true };
  assert.equal(transform('a', o), '1. a');
});

test('add-line-numbers: zero-pads to equal width', () => {
  const o = { start: '9', separator: 'dot', pad: true, skipBlank: true };
  assert.equal(transform('a\nb', o), '09. a\n10. b');
});

test('add-line-numbers: skips blank lines when skipBlank on', () => {
  const o = { start: '1', separator: 'dot', pad: false, skipBlank: true };
  assert.equal(transform('a\n\nb', o), '1. a\n\n2. b');
});

test('add-line-numbers: numbers blank lines when skipBlank off', () => {
  const o = { start: '1', separator: 'dot', pad: false, skipBlank: false };
  assert.equal(transform('a\n\nb', o), '1. a\n2. \n3. b');
});
