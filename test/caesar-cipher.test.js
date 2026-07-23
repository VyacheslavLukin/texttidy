import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/caesar-cipher.js';

test('caesar-cipher: default is ROT13, preserving case', () => {
  assert.equal(transform('Hello', { shift: '13', decode: false }), 'Uryyb');
});

test('caesar-cipher: decode reverses the shift', () => {
  assert.equal(transform('Uryyb', { shift: '13', decode: true }), 'Hello');
});

test('caesar-cipher: leaves non-letters unchanged', () => {
  assert.equal(transform('a1! B?', { shift: '1', decode: false }), 'b1! C?');
});

test('caesar-cipher: wraps around the alphabet', () => {
  assert.equal(transform('zZ', { shift: '1', decode: false }), 'aA');
});

test('caesar-cipher: non-numeric shift leaves text unchanged', () => {
  assert.equal(transform('Hello', { shift: 'x', decode: false }), 'Hello');
});
