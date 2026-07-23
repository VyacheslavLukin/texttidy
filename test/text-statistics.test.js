import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transform } from '../src/domain/transforms/text-statistics.js';

test('text-statistics: reports counts for a normal paragraph', () => {
  const text = 'Hello world. This is fine!\n\nSecond paragraph here.';
  assert.equal(
    transform(text, {}),
    [
      'Characters: 50',
      'Characters (no spaces): 42',
      'Words: 8',
      'Sentences: 3',
      'Lines: 3',
      'Paragraphs: 2',
      'Reading time: ~1 min',
    ].join('\n')
  );
});

test('text-statistics: empty input is all zeros with no reading time', () => {
  assert.equal(
    transform('', {}),
    [
      'Characters: 0',
      'Characters (no spaces): 0',
      'Words: 0',
      'Sentences: 0',
      'Lines: 0',
      'Paragraphs: 0',
      'Reading time: ~0 min',
    ].join('\n')
  );
});

test('text-statistics: rounds reading time up for long text', () => {
  const words = Array.from({ length: 500 }, () => 'word').join(' ');
  assert.equal(transform(words, {}).split('\n')[6], 'Reading time: ~3 min');
});
