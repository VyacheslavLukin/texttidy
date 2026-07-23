import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/word-frequency.js';

test('word-frequency: default counts, most frequent first, alpha tiebreak', () => {
  const o = { order: 'countDesc', caseInsensitive: true, minLength: '1' };
  assert.equal(transform('the cat the dog the', o), 'the: 3\ncat: 1\ndog: 1');
});

test('word-frequency: case-sensitive keeps differently-cased words apart', () => {
  const o = { order: 'countDesc', caseInsensitive: false, minLength: '1' };
  assert.equal(transform('The the', o), 'the: 1\nThe: 1');
});

test('word-frequency: alphabetical order', () => {
  const o = { order: 'alpha', caseInsensitive: true, minLength: '1' };
  assert.equal(transform('banana apple apple', o), 'apple: 2\nbanana: 1');
});

test('word-frequency: least frequent first (countAsc)', () => {
  const o = { order: 'countAsc', caseInsensitive: true, minLength: '1' };
  assert.equal(transform('a a b', o), 'b: 1\na: 2');
});

test('word-frequency: minLength filters short words', () => {
  const o = { order: 'countDesc', caseInsensitive: true, minLength: '3' };
  assert.equal(transform('go cat dog it', o), 'cat: 1\ndog: 1');
});

test('word-frequency: invalid minLength falls back to 1', () => {
  const o = { order: 'countDesc', caseInsensitive: true, minLength: '' };
  assert.equal(transform('a bb', o), 'a: 1\nbb: 1');
});

test('word-frequency: empty input yields empty output', () => {
  const o = { order: 'countDesc', caseInsensitive: true, minLength: '1' };
  assert.equal(transform('   ', o), '');
});
