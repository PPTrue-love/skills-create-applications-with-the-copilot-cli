#!/usr/bin/env node
'use strict';

function validateNumber(value, name) {
  const number = Number(value);
  if (value === '' || !Number.isFinite(number)) {
    throw new Error(`${name} must be a finite number.`);
  }
  return number;
}

// Supported operations: addition (+), subtraction (-), multiplication (*),
// division (/), modulo (%), exponentiation (**), and square root (sqrt).
function calculate(firstOperand, operator, secondOperand) {
  const first = validateNumber(firstOperand, 'First operand');
  const second = validateNumber(secondOperand, 'Second operand');
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      if (second === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return first / second;
    case '%':
      return modulo(first, second);
    case '**':
      return power(first, second);
    default:
      throw new Error('Operator must be one of: +, -, *, /, %, **.');
  }
}

function modulo(a, b) {
  const dividend = validateNumber(a, 'Dividend');
  const divisor = validateNumber(b, 'Divisor');
  if (divisor === 0) {
    throw new Error('Cannot calculate modulo by zero.');
  }
  return dividend % divisor;
}

function power(base, exponent) {
  return validateNumber(base, 'Base') ** validateNumber(exponent, 'Exponent');
}

function squareRoot(n) {
  const number = validateNumber(n, 'Number');
  if (number < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(number);
}

module.exports = { calculate, modulo, power, squareRoot };

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args[0] === 'sqrt' && args.length === 2) {
    try {
      console.log(squareRoot(args[1]));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  } else if (args.length !== 3) {
    console.error(
      'Usage: node src/calculator.js <number> <operator> <number> | sqrt <number>',
    );
    process.exitCode = 1;
  } else {
    try {
      console.log(calculate(args[0], args[1], args[2]));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}
