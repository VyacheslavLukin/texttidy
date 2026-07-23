import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/remove-accents.js';

test('remove-accents: strips diacritics, keeps case by default', () => {
  assert.equal(transform('Café Crème Brûlée', { lowercase: false }), 'Cafe Creme Brulee');
});

test('remove-accents: lowercases the result when option is on', () => {
  assert.equal(transform('Café ÜBER', { lowercase: true }), 'cafe uber');
});

test('remove-accents: leaves plain ASCII and emoji untouched', () => {
  assert.equal(transform('hello 👋', { lowercase: false }), 'hello 👋');
});

test('remove-accents: empty input yields empty output', () => {
  assert.equal(transform('', { lowercase: true }), '');
});
