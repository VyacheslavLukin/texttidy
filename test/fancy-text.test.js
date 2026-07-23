import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/fancy-text.js';

const cp = (n) => String.fromCodePoint(n);

test('fancy-text: bold maps upper, lower, and digits; passes symbols through', () => {
  const expected = `${cp(0x1d400)}${cp(0x1d41b)}${cp(0x1d7cf)}!`;
  assert.equal(transform('Ab1!', { style: 'bold' }), expected);
});

test('fancy-text: sans-serif bold style', () => {
  assert.equal(transform('a', { style: 'sansBold' }), cp(0x1d5ee));
});

test('fancy-text: monospace style', () => {
  assert.equal(transform('A', { style: 'mono' }), cp(0x1d670));
});

test('fancy-text: unknown style falls back to bold', () => {
  assert.equal(transform('A', { style: 'nope' }), cp(0x1d400));
});

test('fancy-text: leaves spaces and empty input untouched', () => {
  assert.equal(transform('  ', { style: 'bold' }), '  ');
  assert.equal(transform('', { style: 'bold' }), '');
});
