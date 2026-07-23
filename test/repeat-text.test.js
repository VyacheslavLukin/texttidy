import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/repeat-text.js';

test('repeat-text: default repeats 3 times, newline separated', () => {
  const o = { count: '3', separator: 'newline', trailing: false };
  assert.equal(transform('hi', o), 'hi\nhi\nhi');
});

test('repeat-text: space separator', () => {
  const o = { count: '2', separator: 'space', trailing: false };
  assert.equal(transform('hi', o), 'hi hi');
});

test('repeat-text: comma separator', () => {
  const o = { count: '2', separator: 'comma', trailing: false };
  assert.equal(transform('hi', o), 'hi, hi');
});

test('repeat-text: none separator joins directly', () => {
  const o = { count: '2', separator: 'none', trailing: false };
  assert.equal(transform('hi', o), 'hihi');
});

test('repeat-text: trailing adds a separator after the last copy', () => {
  const o = { count: '2', separator: 'newline', trailing: true };
  assert.equal(transform('hi', o), 'hi\nhi\n');
});

test('repeat-text: trailing is a no-op with the none separator', () => {
  const o = { count: '2', separator: 'none', trailing: true };
  assert.equal(transform('hi', o), 'hihi');
});

test('repeat-text: non-numeric count falls back to 1', () => {
  const o = { count: 'abc', separator: 'newline', trailing: false };
  assert.equal(transform('hi', o), 'hi');
});

test('repeat-text: count below 1 falls back to 1', () => {
  const o = { count: '0', separator: 'newline', trailing: false };
  assert.equal(transform('hi', o), 'hi');
});
