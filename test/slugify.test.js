import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/slugify.js';

test('slugify: lowercases, strips symbols, joins with hyphens', () => {
  const o = { separator: 'hyphen', lowercase: true, perLine: false };
  assert.equal(transform('My Great Blog Post: Draft #1', o), 'my-great-blog-post-draft-1');
});

test('slugify: converts accented characters to ASCII', () => {
  const o = { separator: 'hyphen', lowercase: true, perLine: false };
  assert.equal(transform('Café déjà vu', o), 'cafe-deja-vu');
});

test('slugify: underscore separator', () => {
  const o = { separator: 'underscore', lowercase: true, perLine: false };
  assert.equal(transform('a b c', o), 'a_b_c');
});

test('slugify: preserves case when lowercase off', () => {
  const o = { separator: 'hyphen', lowercase: false, perLine: false };
  assert.equal(transform('Hello World', o), 'Hello-World');
});

test('slugify: per-line slugifies each line', () => {
  const o = { separator: 'hyphen', lowercase: true, perLine: true };
  assert.equal(transform('First Title\nSecond Title', o), 'first-title\nsecond-title');
});
