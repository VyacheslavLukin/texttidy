import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/find-and-replace.js';

test('find-and-replace: empty find returns text unchanged', () => {
  assert.equal(
    transform('hello', { find: '', replace: 'x', caseInsensitive: false, regex: false }),
    'hello'
  );
});

test('find-and-replace: literal case-sensitive replaces all matches', () => {
  const o = { find: 'a', replace: 'X', caseInsensitive: false, regex: false };
  assert.equal(transform('banana', o), 'bXnXnX');
});

test('find-and-replace: literal is case-sensitive by default', () => {
  const o = { find: 'A', replace: 'X', caseInsensitive: false, regex: false };
  assert.equal(transform('Aa', o), 'Xa');
});

test('find-and-replace: literal case-insensitive matches any case', () => {
  const o = { find: 'a', replace: 'X', caseInsensitive: true, regex: false };
  assert.equal(transform('Aa', o), 'XX');
});

test('find-and-replace: literal metacharacters are treated literally', () => {
  const o = { find: 'a.c', replace: 'X', caseInsensitive: false, regex: false };
  assert.equal(transform('a.c abc', o), 'X abc');
});

test('find-and-replace: regex mode supports patterns and case-insensitivity', () => {
  assert.equal(
    transform('a1b2', { find: '\\d', replace: '#', caseInsensitive: false, regex: true }),
    'a#b#'
  );
  assert.equal(
    transform('Hi HELLO', { find: 'h', replace: 'x', caseInsensitive: true, regex: true }),
    'xi xELLO'
  );
});

test('find-and-replace: invalid regex throws', () => {
  assert.throws(() =>
    transform('x', { find: '(', replace: '', caseInsensitive: false, regex: true })
  );
});
