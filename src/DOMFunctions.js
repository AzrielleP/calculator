/* eslint-disable linebreak-style */
const DOM = (() => {
  const operators = document.querySelector('.operation');
  const numbers = document.querySelector('.numbers');
  const outputEquation = document.querySelector('.outputEquation');
  const result = document.querySelector('.result');

  const limitEquationLength = (equation, functionX, functionY) => {
    const maxEquationLength = 20;
    if (equation.length >= maxEquationLength) {
      numbers.removeEventListener('click', functionX, false);
      operators.removeEventListener('click', functionY, false);
    }
  };

  const displayEquation = (equationToDisplay) => {
    outputEquation.textContent = equationToDisplay;
  };

  const clearOutputEquation = () => {
    outputEquation.textContent = '';
  };

  const clearResult = () => {
    result.textContent = '';
  };

  const displaySyntaxError = () => {
    result.textContent = 'Syntax Error';
  };

  const displayMathError = () => {
    result.textContent = 'Math Error';
  };

  return {
    limitEquationLength,
    displayEquation,
    clearOutputEquation,
    clearResult,
    displayMathError,
    displaySyntaxError,
  };
})();

export default DOM;
