import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/reverse-text.js';

test('reverse-text: reverses characters', () => {
  assert.equal(transform('hello', { mode: 'chars' }), 'olleh');
});

test('reverse-text: reverses characters without splitting surrogate pairs', () => {
  assert.equal(transform('a😀b', { mode: 'chars' }), 'b😀a');
});

test('reverse-text: reverses word order per line', () => {
  assert.equal(transform('one two three', { mode: 'words' }), 'three two one');
  assert.equal(transform('a b\nc d', { mode: 'words' }), 'b a\nd c');
});

test('reverse-text: reverses line order', () => {
  assert.equal(transform('a\nb\nc', { mode: 'lines' }), 'c\nb\na');
});
