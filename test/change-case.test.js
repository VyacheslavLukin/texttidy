import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/change-case.js';

const s = 'the QUICK brown Fox. it jumps!';

test('change-case: lower', () => {
  assert.equal(transform(s, { mode: 'lower' }), 'the quick brown fox. it jumps!');
});
test('change-case: upper', () => {
  assert.equal(transform(s, { mode: 'upper' }), 'THE QUICK BROWN FOX. IT JUMPS!');
});
test('change-case: title', () => {
  assert.equal(transform(s, { mode: 'title' }), 'The Quick Brown Fox. It Jumps!');
});
test('change-case: sentence', () => {
  assert.equal(transform(s, { mode: 'sentence' }), 'The quick brown fox. It jumps!');
});
test('change-case: alternating', () => {
  assert.equal(transform('abcd', { mode: 'alternating' }), 'aBcD');
});
test('change-case: inverse swaps case', () => {
  assert.equal(transform('aB cD', { mode: 'inverse' }), 'Ab Cd');
});
test('change-case: unknown mode returns input unchanged', () => {
  assert.equal(transform(s, { mode: 'wat' }), s);
});
