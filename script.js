let equation = document.querySelector(".equation");
let inputAndResult = document.querySelector(".inputAndResult");
let special = document.querySelector(".special");
let operators = document.querySelector(".operation");
let numbers = document.querySelector(".numbers");
let result = document.querySelector(".result");

let eqn = "";
numbers.addEventListener("click", getNum => {  
    if(getNum.target !== getNum.currentTarget){
        eqn += getNum.target.textContent;
        inputAndResult.textContent = eqn;
    }
    getNum.stopPropagation();
})

operators.addEventListener("click", getOptr=>{
    if(getOptr.target !== getOptr.currentTarget){
        if (/[\+\-\*\/]/.test(eqn)){
            del();
        }
        eqn += getOptr.target.className;
        inputAndResult.textContent = eqn;
    }
    getOptr.stopPropagation();
})

result.addEventListener("click", getResult=>{
    if(getResult.target !== getResult.currentTarget){
        equation.textContent = eqn;
        let arrayEquation = convertEqn(eqn);

        // Put the result in inputAndResult
        inputAndResult.textContent = operate(firstNum, secondNum, op[0]);
        // Make the result to add when + is created
        eqn = operate(firstNum, secondNum, op[0]);
    }
})

function convertEqn(equation){
    let numbers = equation.split(/[\+\-\*\/]/g);
    let op = equation.match(/[\+\-\*\/]/g);
    let arrayedEquation = [];

    // If numbers includes a "" element, it means that there are two consec
    if (numbers.includes("")) return "Syntax Error";
    for (let i = 0; i < numbers.length; i++){
        arrayedEquation.push(numbers[i]);
        if(op[i] !== undefined){
        arrayedEquation.push(op[i]);
        }
    }
    return arrayedEquation;
}

special.addEventListener("click", doSpecial =>{
    if(doSpecial.target !== doSpecial.currentTarget){
        if (doSpecial.target.className == "clear"){
            clear();
        }
        else if (doSpecial.target.className == "delete"){
            del();
        }
    }
    doSpecial.stopPropagation();
})


function clear(){
    equation.textContent = "";
    inputAndResult.textContent = "";
    eqn = "";
}

function del(){
    eqn = eqn.slice(0, eqn.length-1);
    inputAndResult.textContent = eqn;
}

function operate(firstNum, secondNum, operator){
    let results = 0;
    if (operator == "+"){
        results = add(firstNum, secondNum);
    }
    else if (operator == "-"){
        results = subtract(firstNum, secondNum);
    }
    else if (operator == "*"){
        results = multiply(firstNum, secondNum);
    }
    else if (operator == "/"){
        if (secondNum == 0) results = "Math ERROR"
        else results = divide(firstNum, secondNum);
    }
    return results;
}

function add(addend1, addend2){
    return addend1 + addend2;
}

function subtract(minuend, subtrahend){
    return minuend - subtrahend;
}

function multiply(multiplicand, multiplier){
    return multiplicand * multiplier;
}

function divide(dividend, divisor){
    return dividend / divisor;
}