'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate, modulo, power, squareRoot } = require('../calculator');

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

test('calculates modulo remainders', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
  assert.equal(calculate(5, '%', 2), 1);
  assert.equal(calculate(10, '%', 3), 1);
  assert.equal(modulo(10, -3), 1);
  assert.throws(() => modulo(10, 0), /Cannot calculate modulo by zero/);
  assert.throws(() => modulo(10, -0), /Cannot calculate modulo by zero/);
  assert.throws(() => calculate(10, '%', 0), /Cannot calculate modulo by zero/);
  assert.throws(() => modulo('not-a-number', 2), /finite number/);
});

test('raises a base to an exponent', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(5, 0), 1);
  assert.equal(power(2, -2), 0.25);
  assert.equal(calculate(2, '**', 3), 8);
  assert.equal(power(-2, 3), -8);
  assert.throws(() => power('not-a-number', 2), /finite number/);
});

test('calculates square roots and rejects negative numbers', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(2), Math.sqrt(2));
  assert.equal(squareRoot(0.25), 0.5);
  assert.throws(() => squareRoot(-1), /square root of a negative number/);
  assert.throws(() => squareRoot(-0.01), /square root of a negative number/);
  assert.throws(() => squareRoot('not-a-number'), /finite number/);
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
      /finite number/,
    );
  }
});

test('rejects unsupported operators', () => {
  assert.throws(() => calculate(1, '&', 2), /Operator must be one of/);
  assert.throws(() => calculate(1, '^', 2), /Operator must be one of/);
});
