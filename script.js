// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let displayValue = '0'; // Default display value
let firstValue = '';
let operator = '';
let secondValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'clear') {
            // Reset everything on 'C'
            displayValue = '0';
            firstValue = '';
            operator = '';
            secondValue = '';
            display.textContent = displayValue;
        } else if (value === 'equals') {
            // Handle equals
            if (firstValue && operator && displayValue) {
                secondValue = displayValue;
                displayValue = operate(firstValue, secondValue, operator);
                display.textContent = displayValue;
                // Reset firstValue and operator after calculation
                firstValue = displayValue;
                operator = '';
            }
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(value)) {
            // Handle operators
            if (displayValue !== '0') {
                firstValue = displayValue;
                operator = value;
                displayValue = ''; // Clear display for the next input
            }
        } else {
            // Handle numbers and decimal points
            if (displayValue === '0') {
                displayValue = value; // Remove leading zero
            } else {
                displayValue += value;
            }
            display.textContent = displayValue;
        }
    });
});

function operate(first, second, operator) {
    first = parseFloat(first);
    second = parseFloat(second);

    switch (operator) {
        case 'add':
            return (first + second).toString();
        case 'subtract':
            return (first - second).toString();
        case 'multiply':
            return (first * second).toString();
        case 'divide':
            return (first / second).toString();
        default:
            return second;
    }
}
