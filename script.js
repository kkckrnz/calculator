// Variables
let displayValue = '';
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
    switch (operator) {
        case '+':
            return add(numA, numB);
        case '-':
            return subtract(numA, numB);
        case '*':
            return multiply(numA, numB);
        case '/':
            return divide(numA, numB);
        default:
            return
    }
}

// Display
function display() {
    const displayWindow = document.querySelector('#display');
    displayWindow.textContent = displayValue;
}

// Button click
function buttonClicked() {
    switch (this.value) {
        case 'clear':
            console.log('clear clicked')
            displayValue = '';
            return display();
        case '=':
            console.log('= clicked');
            return compute();
        default:
            console.log('number and symbols clicked' + this.value);
            displayValue += this.value;
            return display();
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

    let index;
    let before;
    let a;
    let b;
    let after;
    
    // Loop while all operators are computed
    // while (operatorIndices.length !== 0)
    while (isNaN(input))  {
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
        resultValue = operate(operator, a, b);
        input = before + resultValue + after;
        console.log('result of iteration: ' + input);
        evaluateOperators(input);
        console.log(`operatorIndices after iteration: ${operatorIndices}`);
        console.log(`operators after iteration: ${operators}`);
    }
    displayValue = input;
    display();
}

// Event listener for button click
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', buttonClicked);
});