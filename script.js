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
        eqn += getOptr.target.className;
        inputAndResult.textContent = eqn;
    }
    getOptr.stopPropagation();
})

result.addEventListener("click", getResult=>{
    if(getResult.target !== getResult.currentTarget){
     
        equation.textContent = eqn;
        let split = eqn.split(/[\+\-\*\/]/g);
        console.log(split);
        let op = eqn.match(/[\+\-\*\/]/g);
        let firstNum = Number(split[0]);
        let secondNum = Number(split[1]);
        inputAndResult.textContent = operate(firstNum, secondNum, op[0]);
        eqn = operate(firstNum, secondNum, op[0]);
    }
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
        results = divide(firstNum, secondNum);
        if (results == Infinity){
            results = "Math ERROR"
        }
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
