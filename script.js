
/* === Declare Global Variables ===*/
let equation = document.querySelector(".equation");
let inputAndResult = document.querySelector(".inputAndResult");
let special = document.querySelector(".special");
let operators = document.querySelector(".operation");
let numbers = document.querySelector(".numbers");
let result = document.querySelector(".result");
let eqn = "";


/* === addEventListeners ===*/
numbers.addEventListener("click", getNum => {  
    if(getNum.target !== getNum.currentTarget){
        eqn += getNum.target.textContent;
        inputAndResult.textContent = eqn;
    }
    getNum.stopPropagation();
})

operators.addEventListener("click", getOptr=>{
    if(getOptr.target !== getOptr.currentTarget){
        if (/[\+\-x\/]/.test(eqn[eqn.length-1])){
            del();
        }
        eqn += getOptr.target.textContent;
        inputAndResult.textContent = eqn;
    }
    getOptr.stopPropagation();
})

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

result.addEventListener("click", getResult=>{
    if(getResult.target !== getResult.currentTarget){
        equation.textContent = eqn;
        let arrayEquation = convertEqn(eqn);
        if (arrayEquation == "Error"){
            inputAndResult.textContent = "Syntax Error";
            equation.textContent = "";
            eqn = "";
            return;
        }
        // Put the result in inputAndResult
        inputAndResult.textContent = calculate(arrayEquation);
        // Make the result to add when + is created
        eqn = calculate(arrayEquation);
    }
})

/* === Function Collection === */

function calculate(arrayEquation){
    let loop = (arrayEquation.length -1) / 2;
    for (let i = 0; i < loop; i++){
        if(arrayEquation.includes("x") || arrayEquation.includes("/")){
            useOperate(arrayEquation, checkPrecedence("x", "/", arrayEquation));
        }
        else if (arrayEquation.includes("+") || arrayEquation.includes("-")){
            useOperate(arrayEquation, checkPrecedence("+", "-", arrayEquation));        }
    }
    return arrayEquation;
}

function checkPrecedence(operator1, operator2, array){
    let m = array.indexOf(operator1);
    let d = array.indexOf(operator2);
    let y;
    if(m == -1)  y = d;
    else if(d == -1)  y = m;
    else y = Math.min(m,d);
    return array[y];
}

function useOperate(array, op){
    let newArray = [];
    let n = array.indexOf(op);
    let firstNum = Number(array[n-1]);
    let secondNum = Number(array[n+1]);
    newArray.push(array.splice(n-1, 3, operate(firstNum, secondNum, op)));
    return  newArray;
}

function operate(firstNum, secondNum, operator){
    let results = 0;
    if (operator == "+"){
        results = firstNum + secondNum;
    }
    else if (operator == "-"){
        results = firstNum - secondNum;
    }
    else if (operator == "x"){
        results = firstNum * secondNum;
    }
    else if (operator == "/"){
        if (secondNum == 0) results = "Math ERROR"
        else results = firstNum / secondNum;;
    }
    return results.toString();
}

function convertEqn(equation){
    let numbers = equation.split(/[\+\-x\/]/g);
    let op = equation.match(/[\+\-x\/]/g);
    let arrayedEquation = [];

    // If numbers includes a "" element, it means that the equation ends with an operator
    if (numbers.includes("")) {
        return "Error";
    }
    for (let i = 0; i < numbers.length; i++){
        arrayedEquation.push(numbers[i]);
        if(op[i] != undefined){
        arrayedEquation.push(op[i]);
        }
    }
    return arrayedEquation;
}

function clear(){
    equation.textContent = "";
    inputAndResult.textContent = "";
    eqn = "";
}

function del(){
    eqn = eqn.slice(0, eqn.length-1);
    inputAndResult.textContent = eqn;
}

