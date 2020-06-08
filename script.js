
function operate(firstNum, secondNum, operator){
    let result = 0;
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
    return result;
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