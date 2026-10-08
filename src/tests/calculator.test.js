'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../calculator');

test('adds numbers, including the example operation', () => {
  assert.equal(calculate('2', '+', '3'), 5);
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(-2, '+', 3), 1);
  assert.equal(calculate(0.1, '+', 0.2), 0.30000000000000004);
});

test('subtracts numbers, including the example operation', () => {
  assert.equal(calculate('10', '-', '4'), 6);
  assert.equal(calculate(4, '-', 10), -6);
  assert.equal(calculate(-4, '-', -10), 6);
});

test('multiplies numbers, including the example operation', () => {
  assert.equal(calculate('45', '*', '2'), 90);
  assert.equal(calculate(-4, '*', 3), -12);
  assert.equal(calculate(5, '*', 0), 0);
});

test('divides numbers, including the example operation', () => {
  assert.equal(calculate('20', '/', '5'), 4);
  assert.equal(calculate(7, '/', 2), 3.5);
  assert.equal(calculate(-12, '/', 3), -4);
});

test('rejects division by zero and negative zero', () => {
  assert.throws(() => calculate(1, '/', 0), /Cannot divide by zero/);
  assert.throws(() => calculate(1, '/', -0), /Cannot divide by zero/);
});

test('rejects invalid or non-finite operands', () => {
  for (const [first, second] of [
    ['', '2'],
    ['2', ''],
    ['not-a-number', '2'],
    ['2', 'NaN'],
    [Infinity, 2],
    [2, -Infinity],
  ]) {
    assert.throws(
      () => calculate(first, '+', second),
      /Both operands must be finite numbers/,
    );
  }
});

test('rejects unsupported operators', () => {
  assert.throws(() => calculate(1, '%', 2), /Operator must be one of/);
  assert.throws(() => calculate(1, '**', 2), /Operator must be one of/);
});
