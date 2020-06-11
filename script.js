/* === Declare Global Variables ===*/
let equation = document.querySelector(".equation");
let output = document.querySelector(".output");
let special = document.querySelector(".special");
let operators = document.querySelector(".operation");
let numbers = document.querySelector(".numbers");
let result = document.querySelector(".result");
let eqn = "";

/* === addEventListeners ===*/
numbers.addEventListener("click", getNum);

function getNum(event) {
  if (eqn.length >= 30) {
    numbers.removeEventListener("click", getNum, false);
    operators.removeEventListener("click", getOptr, false);
  }
  if (event.target !== event.currentTarget) {
    eqn += event.target.textContent;
    equation.textContent = eqn;
  }
  event.stopPropagation();
}

operators.addEventListener("click", getOptr);

function getOptr(event) {
  if (eqn.length >= 30) {
    numbers.removeEventListener("click", getNum, false);
    operators.removeEventListener("click", getOptr, false);
  }
  if (event.target !== event.currentTarget) {
    if (/[\+\-x\/]/.test(eqn[eqn.length - 1])) {
      del();
    }
    eqn += event.target.textContent;
    equation.textContent = eqn;
  }
  event.stopPropagation();
}

special.addEventListener("click", (doSpecial) => {
  if (doSpecial.target !== doSpecial.currentTarget) {
    if (doSpecial.target.className == "clear") {
      clear();
    } else if (doSpecial.target.className == "delete") {
      del();
    }
  }
  doSpecial.stopPropagation();
});

result.addEventListener("click", (getResult) => {
  if (getResult.target !== getResult.currentTarget) {
    equation.textContent = eqn;
    let arrayEquation = convertEqn(eqn);
    if (arrayEquation == "Error") {
      output.textContent = "Syntax Error";
      equation.textContent = "";
      eqn = "";
      return;
    }
    output.textContent = calculate(arrayEquation);
    // Make the result to be added to the next operation
    if (eqn !== "") {
      eqn = Number(calculate(arrayEquation));
    }
  }
});

/* === Function Collection === */

function calculate(arrayEquation) {
  let loop = (arrayEquation.length - 1) / 2;
  for (let i = 0; i < loop; i++) {
    if (arrayEquation.includes("x") || arrayEquation.includes("/")) {
      useOperate(arrayEquation, checkPrecedence("x", "/", arrayEquation));
    } else if (arrayEquation.includes("+") || arrayEquation.includes("-")) {
      useOperate(arrayEquation, checkPrecedence("+", "-", arrayEquation));
    }
  }
  return arrayEquation;
}

function checkPrecedence(operator1, operator2, array) {
  let m = array.indexOf(operator1);
  let d = array.indexOf(operator2);
  let y;
  if (m == -1) y = d;
  else if (d == -1) y = m;
  else y = Math.min(m, d);
  return array[y];
}

function useOperate(array, op) {
  let newArray = [];
  let n = array.indexOf(op);
  let firstNum = Number(array[n - 1]);
  let secondNum = Number(array[n + 1]);
  // Check if firstNum or secondNum has at most 1 decimal point
  if (isNaN(firstNum) || isNaN(secondNum)) {
    output.textContent = "Syntax Error";
    equation.textContent = "";
    eqn = "";
    return;
  }
  newArray.push(array.splice(n - 1, 3, operate(firstNum, secondNum, op)));
  return newArray;
}

function operate(firstNum, secondNum, operator) {
  let results = 0;
  if (operator == "+") {
    results = firstNum + secondNum;
  } else if (operator == "-") {
    results = firstNum - secondNum;
  } else if (operator == "x") {
    results = firstNum * secondNum;
  } else if (operator == "/") {
    if (secondNum == 0) {
      results = "Math Error";
      equation.textContent = "";
      eqn = "";
    } else results = firstNum / secondNum;
  }
  if (typeof results == "number") {
    if (results.toString().length > 9) {
      results = results.toPrecision(9);
    }
  }
  return results;
}

function convertEqn(equation) {
  let numbers = equation.split(/[\+\-x\/]/g);
  let op = equation.match(/[\+\-x\/]/g);
  let arrayedEquation = [];

  // If numbers includes a "" element, it means that the equation ends with an operator
  if (numbers.includes("")) {
    return "Error";
  }
  for (let i = 0; i < numbers.length; i++) {
    arrayedEquation.push(numbers[i]);
    if (op[i] != undefined) {
      arrayedEquation.push(op[i]);
    }
  }
  return arrayedEquation;
}

function clear() {
  equation.textContent = "";
  output.textContent = "";
  eqn = "";
}

function del() {
  eqn = eqn.slice(0, eqn.length - 1);
  output.textContent = eqn;
}
