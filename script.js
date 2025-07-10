const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay(value) {
    display.textContent = value;
}

function clearCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay('0');
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay(currentInput);
}

function inputOperator(nextOperator) {
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    if (firstOperand === null && currentInput !== '') {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        const result = performCalculation(operator, firstOperand, parseFloat(currentInput));
        updateDisplay(result);
        firstOperand = result;
    }
    operator = nextOperator;
    waitingForSecondOperand = true;
}

function performCalculation(operator, first, second) {
    switch (operator) {
        case '+': return first + second;
        case '-': return first - second;
        case '×': return first * second;
        case '÷': return second !== 0 ? first / second : 'Error';
        default: return second;
    }
}

function handleEquals() {
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation(operator, firstOperand, parseFloat(currentInput));
        updateDisplay(result);
        currentInput = String(result);
        firstOperand = null;
        operator = '';
        waitingForSecondOperand = false;
    }
}

document.querySelector('.buttons').addEventListener('click', function(e) {
    if (!e.target.classList.contains('btn')) return;
    const action = e.target.getAttribute('data-action');
    const value = e.target.textContent;
    if (action === 'digit') {
        inputDigit(value);
    } else if (action === 'operator') {
        inputOperator(value);
    } else if (action === 'clear') {
        clearCalculator();
    } else if (action === 'equals') {
        handleEquals();
    }
});

clearCalculator(); 