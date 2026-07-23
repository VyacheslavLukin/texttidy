import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/extract-emails.js';

const text = 'Contact a@x.com or b@y.io, and a@x.com again. Not an email: foo@bar';

test('extract-emails: default extracts, dedupes, one per line', () => {
  const o = { unique: true, sort: false, separator: 'newline' };
  assert.equal(transform(text, o), 'a@x.com\nb@y.io');
});

test('extract-emails: keeps duplicates when unique is off', () => {
  const o = { unique: false, sort: false, separator: 'newline' };
  assert.equal(transform(text, o), 'a@x.com\nb@y.io\na@x.com');
});

test('extract-emails: sorts alphabetically when sort is on', () => {
  const o = { unique: true, sort: true, separator: 'newline' };
  assert.equal(transform('z@z.com\na@a.com', o), 'a@a.com\nz@z.com');
});

test('extract-emails: comma separator', () => {
  const o = { unique: true, sort: false, separator: 'comma' };
  assert.equal(transform(text, o), 'a@x.com, b@y.io');
});

test('extract-emails: space separator', () => {
  const o = { unique: true, sort: false, separator: 'space' };
  assert.equal(transform(text, o), 'a@x.com b@y.io');
});

test('extract-emails: no matches yields empty string', () => {
  const o = { unique: true, sort: false, separator: 'newline' };
  assert.equal(transform('nothing here', o), '');
});
