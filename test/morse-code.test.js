import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/morse-code.js';

test('morse-code: encodes letters and word gaps', () => {
  assert.equal(transform('CAT DOG', { mode: 'encode' }), '-.-. .- - / -.. --- --.');
});

test('morse-code: encodes digits and punctuation', () => {
  assert.equal(transform('SOS!', { mode: 'encode' }), '... --- ... -.-.--');
});

test('morse-code: drops unknown characters when encoding', () => {
  assert.equal(transform('A±B', { mode: 'encode' }), '.- -...');
});

test('morse-code: decodes back to upper-case text', () => {
  assert.equal(transform('-.-. .- - / -.. --- --.', { mode: 'decode' }), 'CAT DOG');
});

test('morse-code: drops unknown codes when decoding', () => {
  assert.equal(transform('.- ...... -...', { mode: 'decode' }), 'AB');
});

test('morse-code: round-trips through encode then decode', () => {
  const encoded = transform('HELLO WORLD', { mode: 'encode' });
  assert.equal(transform(encoded, { mode: 'decode' }), 'HELLO WORLD');
});
