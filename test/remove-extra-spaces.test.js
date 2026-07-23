import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/remove-extra-spaces.js';

test('remove-extra-spaces: collapses spaces, tabs and trims when all options on', () => {
  const o = { collapse: true, tabs: true, trimLines: true, dropBlank: false };
  assert.equal(transform('  Hello    world \t here  ', o), 'Hello world here');
});

test('remove-extra-spaces: leaves text untouched when all options off', () => {
  const o = { collapse: false, tabs: false, trimLines: false, dropBlank: false };
  assert.equal(transform('  a    b\t', o), '  a    b\t');
});

test('remove-extra-spaces: removes blank lines when dropBlank on', () => {
  const o = { collapse: true, tabs: true, trimLines: true, dropBlank: true };
  assert.equal(transform('a\n   \nb', o), 'a\nb');
});

test('remove-extra-spaces: handles empty string and CRLF', () => {
  const o = { collapse: true, tabs: true, trimLines: true, dropBlank: false };
  assert.equal(transform('', o), '');
  assert.equal(transform('a  b\r\nc  d', o), 'a b\nc d');
});
