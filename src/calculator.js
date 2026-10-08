#!/usr/bin/env node
'use strict';

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function calculate(firstOperand, operator, secondOperand) {
  const first = Number(firstOperand);
  const second = Number(secondOperand);

  if (
    firstOperand === '' ||
    secondOperand === '' ||
    !Number.isFinite(first) ||
    !Number.isFinite(second)
  ) {
    throw new Error('Both operands must be finite numbers.');
  }

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
    default:
      throw new Error('Operator must be one of: +, -, *, /.');
  }
}

module.exports = { calculate };

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number> <operator> <number>');
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
