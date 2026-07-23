import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/remove-line-breaks.js';

test('remove-line-breaks: joins with a space by default', () => {
  const o = { replaceWith: 'space', keepParagraphs: false };
  assert.equal(transform('one\ntwo\nthree', o), 'one two three');
});

test('remove-line-breaks: joins directly when replaceWith is none', () => {
  const o = { replaceWith: 'none', keepParagraphs: false };
  assert.equal(transform('ab\ncd', o), 'abcd');
});

test('remove-line-breaks: joins with comma when replaceWith is comma', () => {
  const o = { replaceWith: 'comma', keepParagraphs: false };
  assert.equal(transform('a\nb\nc', o), 'a, b, c');
});

test('remove-line-breaks: keeps paragraph breaks when enabled', () => {
  const o = { replaceWith: 'space', keepParagraphs: true };
  assert.equal(transform('a\nb\n\nc\nd', o), 'a b\n\nc d');
});

test('remove-line-breaks: empty input yields empty output', () => {
  assert.equal(transform('', { replaceWith: 'space', keepParagraphs: false }), '');
});
