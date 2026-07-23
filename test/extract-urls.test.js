import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/extract-urls.js';

const text = 'See https://a.com/x and http://b.io. Again https://a.com/x here.';

test('extract-urls: default extracts, dedupes, one per line', () => {
  const o = { unique: true, sort: false, separator: 'newline' };
  assert.equal(transform(text, o), 'https://a.com/x\nhttp://b.io');
});

test('extract-urls: keeps duplicates when unique is off', () => {
  const o = { unique: false, sort: false, separator: 'newline' };
  assert.equal(transform(text, o), 'https://a.com/x\nhttp://b.io\nhttps://a.com/x');
});

test('extract-urls: sorts alphabetically when sort is on', () => {
  const o = { unique: true, sort: true, separator: 'newline' };
  assert.equal(transform('https://z.com\nhttps://a.com', o), 'https://a.com\nhttps://z.com');
});

test('extract-urls: comma separator', () => {
  const o = { unique: true, sort: false, separator: 'comma' };
  assert.equal(transform(text, o), 'https://a.com/x, http://b.io');
});

test('extract-urls: space separator', () => {
  const o = { unique: true, sort: false, separator: 'space' };
  assert.equal(transform(text, o), 'https://a.com/x http://b.io');
});

test('extract-urls: no matches yields empty string', () => {
  const o = { unique: true, sort: false, separator: 'newline' };
  assert.equal(transform('just plain text', o), '');
});
