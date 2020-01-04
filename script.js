// Variables
let displayValue = '0';
display();
let operatorIndices;
let operators;

// Math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Operate function that calls math functions
function operate(operator, a, b) {
    let numA = Number(a);
    let numB = Number(b);
    // let result;
    switch (operator) {
        case '+':
            // add(a, b);
            // break;
            return add(numA, numB);
        case '-':
            // subtract(a, b);
            // break;
            return subtract(numA, numB);
        case '*':
            // multiply(a, b);
            // break;
            return multiply(numA, numB);
        case '/':
            // divide(a, b);
            // break;
            return divide(numA, numB);
        default:
            return;
    }
    // return Number(result).toFixed(1);
}

// Display
function display() {
    // let result = displayValue;

    // let rounded = Number(result).toFixed(1);
    // console.log(rounded);
    const displayWindow = document.querySelector('#display');
    displayWindow.textContent = displayValue;
}

function isInt(num) {
    let number = Number(num);
    console.log(`number: ${number}`)
    if (number % 1 === 0) {
        console.log(`number is integer`)
        return true;
    } else {
        console.log(`number is float`)
        return false;
    }
}

// Button click
function buttonClicked() {
    switch (this.value) {
        case 'clear':
            console.log('clear clicked')
            displayValue = '0';
            return display();
        case '=':
            console.log('= clicked');
            return compute();
        default:
            console.log('number and symbols clicked' + this.value);

            if (displayValue === '0') {
                if (this.value === '.') {
                    displayValue += this.value;
                } else {
                    displayValue = this.value;
                }
            } else {
                displayValue += this.value;
            }

            return display();
    }
}

function isMoreThanOneDot(num) {
    let dotCount = 0;
    for (i = 0; i < num.length; i++) {
        if (num[i] === '.') {
            dotCount += 1;
        }
    }
    if (dotCount > 1) {
        return true;
    }
}


function isValidEquation() {

    function isDoubleOperators() {
        for (i = 0; i < operatorIndices.length - 1; i++) {
            if (operatorIndices[i] + 1 === operatorIndices[i + 1]) {
                return true;
            }
        }
        return false;
    }

    // function isDoubleDots() {
    //     for (i = 0; i < displayValue.length - 1; i++) {
    //         if (displayValue[i] === '.' && displayValue[i+1] === '.')
    //     }
    // }

    if (displayValue[0] === '*' || displayValue[0] === '/') {
        console.log('invalid: first operator is * or /');
        return false;
    } else if (operators.length === 0) {
        console.log('invalid: no operators');
        return false;
    } else if (operators[operators.length - 1] === displayValue[displayValue.length - 1]) {
        console.log('invalid: last input is an operator');
        return false;
    } else if (isDoubleOperators()) {
        console.log('invalid: consecutive operators');
        return false;
    } else {
        console.log('valid equation');
        return true;
    }
}

// Evaluate operators
function evaluateOperators(input) {
    operatorIndices = [];
    operators = [];

    for (i = 0; i < input.length; i++) {
        if (input[i] === '+' ||
            input[i] === '-' ||
            input[i] === '*' ||
            input[i] === '/') {
            operatorIndices.push(i);
            operators.push(input[i]);
        }
    }
    console.log('operator indices: ' + operatorIndices.toString());
    console.log('operators: ' + operators.toString());
}

// Calculation
function compute() {
    let input = displayValue;
    console.log('starting calculation: ' + input);
    evaluateOperators(input);
    if (!isValidEquation()) {
        return alert('invalid equation');
    }

    let index;
    let before;
    let a;
    let b;
    let after;

    // Loop while all operators are computed
    // while (operatorIndices.length !== 0)
    // while (isNaN(input)) 
    while (operatorIndices.length !== 0) {
        let multiplyOperatorIndex = operators.indexOf('*');
        let divideOperatorIndex = operators.indexOf('/');

        // prioritise multiplication and division
        if (multiplyOperatorIndex !== -1 || divideOperatorIndex !== -1) {
            if (multiplyOperatorIndex === -1) {
                index = divideOperatorIndex;
            } else if (divideOperatorIndex === -1) {
                index = multiplyOperatorIndex;
            } else {
                index = Math.min(multiplyOperatorIndex, divideOperatorIndex);
            }
        } else {
            index = 0;
        }
        console.log(`index: ${index}`);

        // Parse equation into differnt components before calculation
        let operator = input.slice(operatorIndices[index], operatorIndices[index] + 1);
        if (index === 0) {
            console.log('index === 0')
            before = '';
            a = input.slice(0, operatorIndices[index]);
            b = input.slice(operatorIndices[index] + 1, operatorIndices[index + 1]);
            after = input.slice(operatorIndices[index + 1]);
            if (after === input) {
                after = '';
            }
        } else if (index === operatorIndices.length - 1) {
            before = input.slice(0, operatorIndices[index - 1] + 1);
            a = input.slice(operatorIndices[index - 1] + 1, operatorIndices[index]);
            b = input.slice(operatorIndices[index] + 1);
            after = '';
        } else {
            before = input.slice(0, operatorIndices[index - 1] + 1);
            a = input.slice(operatorIndices[index - 1] + 1, operatorIndices[index]);
            b = input.slice(operatorIndices[index] + 1, operatorIndices[index + 1]);
            after = input.slice(operatorIndices[index + 1]);
        }
        console.log(`before: ${before}, a: ${a}, operator: ${operator}, b: ${b}, after: ${after}`);

        // Check divition by zero
        if (operator === '/' && b === '0') {
            return alert('ERROR: You can\'t divide by 0');
        }

        // Check more than one dot
        if (a.includes('.') && isMoreThanOneDot(a)) {
            return alert('ERROR: You can\'t have more than one dot');
        }
        if (b.includes('.') && isMoreThanOneDot(b)) {
            return alert('ERROR: You can\'t have more than one dot');
        }

        resultValue = operate(operator, a, b);
        input = before + resultValue + after;
        console.log('result of iteration: ' + input);
        evaluateOperators(input);
        console.log(`operatorIndices after iteration: ${operatorIndices}`);
        console.log(`operators after iteration: ${operators}`);
    }
    if (!isInt(input)) {
        input = Number(input).toFixed(1);
    }
    displayValue = input;
    display();
}

// Event listener for button click
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', buttonClicked);
});