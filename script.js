let equation = document.querySelector(".equation");
let inputAndResult = document.querySelector(".inputAndResult");
let special = document.querySelector(".special");
let operators = document.querySelector(".operation");
let numbers = document.querySelector(".numbers");
let result = 0;

let eqn = "";
numbers.addEventListener("click", getNum => {
        
    if(getNum.target !== getNum.currentTarget){
        eqn += getNum.target.textContent;
        inputAndResult.textContent = eqn;
    }
   
    getNum.stopPropagation();
});

operators.addEventListener("click", getOp=>{
    if(getOp.target !== getOp.currentTarget){
        if (getOp.target.className !== "equals"){
      
            eqn += getOp.target.textContent;
            inputAndResult.textContent = eqn;
        }
        else{
            equation.textContent = eqn;
            let split = eqn.split(`${operation}`);
            let firstNum = Number(split[0]);
            let secondNum = Number(split[1]);
            operate(firstNum, secondNum, getOp.target.className)
        }
        
    }
    
    getOp.stopPropagation();
})

function operate(firstNum, secondNum, operator){

    if (operator == "add"){
        result = add(firstNum, secondNum);
    }
    else if (operator == "subtract"){
        result = subtract(firstNum, secondNum);
    }
    else if (operator == "multiply"){
        result = multiply(firstNum, secondNum);
    }
    else if (operator == "divide"){
        result = divide(firstNum, secondNum);
    }
    inputAndResult.textContent = result;
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

function clear(){
    result = 0;
    firstNum = 0;
    secondNum = 0;
}
