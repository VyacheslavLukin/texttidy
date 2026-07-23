import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/text-to-binary.js';

test('text-to-binary: encodes each character to 8-bit binary', () => {
  assert.equal(transform('AB', { mode: 'encode' }), '01000001 01000010');
});

test('text-to-binary: decodes binary back to text', () => {
  assert.equal(transform('01000001 01000010', { mode: 'decode' }), 'AB');
});

test('text-to-binary: round-trips through encode then decode', () => {
  const encoded = transform('Hi!', { mode: 'encode' });
  assert.equal(transform(encoded, { mode: 'decode' }), 'Hi!');
});

test('text-to-binary: throws on a non-binary token when decoding', () => {
  assert.throws(() => transform('01000001 zzzz', { mode: 'decode' }), /Not binary/);
});

test('text-to-binary: encoding empty input yields empty output', () => {
  assert.equal(transform('', { mode: 'encode' }), '');
});

test('text-to-binary: decoding blank input yields empty output', () => {
  assert.equal(transform('   ', { mode: 'decode' }), '');
});
