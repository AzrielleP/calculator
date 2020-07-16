/* eslint-disable linebreak-style */
import DOM from './DOMFunctions';

/* === Declare Global Variables === */
const result = document.querySelector('.result');
const operators = document.querySelector('.operation');
const numbers = document.querySelector('.numbers');
const deleteButton = document.querySelector('.deleteButton');
const clearButton = document.querySelector('.clearButton');
const equalsButton = document.querySelector('.equalsButton');

// eqn holds the string equation
let eqn = '';

/* Special Calculator Functions */

const deleteDigit = () => {
  eqn = eqn.slice(0, eqn.length - 1);
  DOM.displayEquation(eqn);
};

const clearFunction = () => {
  DOM.clearOutputEquation();
  DOM.clearResult();
  eqn = '';
};

/* Errors */
const mathError = () => {
  DOM.displayMathError();
  DOM.clearOutputEquation();
  eqn = '';
};

const syntaxError = () => {
  DOM.displaySyntaxError();
  DOM.clearOutputEquation();
  eqn = '';
};

/* === Perform Calculations=== */

const checkPrecedence = (operator1, operator2, array) => {
  const m = array.indexOf(operator1);
  const d = array.indexOf(operator2);
  let y;
  if (m === -1) y = d;
  else if (d === -1) y = m;
  else y = Math.min(m, d);
  return array[y];
};

const operate = (firstNum, secondNum, operator) => {
  let results = 0;
  if (operator === '+') {
    results = firstNum + secondNum;
  } else if (operator === '-') {
    results = firstNum - secondNum;
  } else if (operator === 'x') {
    results = firstNum * secondNum;
  } else if (operator === '/') {
    if (secondNum === 0) {
      mathError();
      return;
    }
    results = firstNum / secondNum;
  }

  // Limit the number of digits the result has
  if (typeof results === 'number') {
    if (results.toString().length > 7) {
      results = results.toPrecision(7);
    }
  }
  return results;
};

const useOperate = (array, op) => {
  const newArray = [];
  const n = array.indexOf(op);
  const firstNum = Number(array[n - 1]);
  const secondNum = Number(array[n + 1]);
  // Check if firstNum or secondNum has at most 1 decimal point
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(firstNum) || isNaN(secondNum)) {
    syntaxError();
    return;
  }
  newArray.push(array.splice(n - 1, 3, operate(firstNum, secondNum, op)));
  return newArray;
};

const convertEqn = (equation) => {
  const number = equation.split(/[+\-x/]/g);
  const op = equation.match(/[+\-x/]/g);
  let arrayedEquation = [];
  const negaNumberContainer = [];

  for (let i = 0; i < number.length; i += 1) {
    arrayedEquation.push(number[i]);
    if (op[i] !== undefined) {
      arrayedEquation.push(op[i]);
    }
  }

  if (equation[0] === '-') {
    negaNumberContainer.push(arrayedEquation.splice(0, 3).join(''));
    arrayedEquation = negaNumberContainer.concat(arrayedEquation);
  }

  // If numbers includes a "" element, it means that the equation ends with an operator
  if (arrayedEquation.includes('') || equation[equation.length - 1] === '.') {
    syntaxError();
    return;
  }
  return arrayedEquation;
};

const calculate = (arrayEquation) => {
  const loop = (arrayEquation.length - 1) / 2;
  for (let i = 0; i < loop; i += 1) {
    if (arrayEquation.includes('x') || arrayEquation.includes('/')) {
      useOperate(arrayEquation, checkPrecedence('x', '/', arrayEquation));
    } else if (arrayEquation.includes('+') || arrayEquation.includes('-')) {
      useOperate(arrayEquation, checkPrecedence('+', '-', arrayEquation));
    }
  }
  return arrayEquation;
};

const pressEquals = () => {
  DOM.displayEquation(eqn);
  const arrayEquation = convertEqn(eqn);
  result.textContent = calculate(arrayEquation);

  // Make the result to be added to the next operation
  if (eqn !== '') {
    eqn = Number(calculate(arrayEquation));
  }
};

/* addEventListener Functions */
const getNumber = (event) => {
  // eslint-disable-next-line no-use-before-define
  DOM.limitEquationLength(eqn, getNumber, getOperator);
  if (event.target !== event.currentTarget) {
    eqn += event.target.textContent;
    DOM.displayEquation(eqn);
  }
  event.stopPropagation();
};

const displayOnlyOneOperator = () => {
  if (/[+\-x/]/.test(eqn[eqn.length - 1])) {
    deleteDigit();
  }
};

const getOperator = (event) => {
  DOM.limitEquationLength(eqn, getNumber, getOperator);
  if (event.target !== event.currentTarget) {
    displayOnlyOneOperator();
    eqn += event.target.textContent;
    DOM.displayEquation(eqn);
  }
  event.stopPropagation();
};

/* === addEventListeners === */
numbers.addEventListener('click', getNumber);
operators.addEventListener('click', getOperator);
equalsButton.addEventListener('click', pressEquals);
deleteButton.addEventListener('click', deleteDigit);
clearButton.addEventListener('click', clearFunction);
