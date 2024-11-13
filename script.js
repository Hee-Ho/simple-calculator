const calculator = document.querySelector(".calculator") //get the calculator class from html
const keys = calculator.querySelector(".calculator_keybr") //get the keys from inside the calculator
const display = calculator.querySelector('.result')
let total = 0;
let num1 = 0;
let num2 = 0;
let reset = 0;
let op = 0; //operator switch

//Set up click event for the keys in the 
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        pressKeys(e); 
    }
})

//For digits
function numberDisplay(key) {
    const k = key.target
    const action = key.target.action
    if (display.textContent.length  < 2 && display.textContent === '0' || reset === 1) {
        display.textContent = k.textContent //if there is no value, then set first digit to key pressed
        reset = 0;
    }
    else {
        //else concat the current key value to the current digit
        display.textContent = display.textContent.concat(k.textContent) //or 
    }
}

//Key press function
//need to break this up 
function pressKeys(key) {
    const k = key.target
    const action = k.dataset.action
    if (!action) { //if the pressed key have no data-action 
        numberDisplay(key);
    }
    else {
        if (action == 'add' || action == 'substract' || action == 'multiply' || action == 'divide') {
            if (op < 1) {
                num1 = parseFloat(display.textContent);
                if (action == 'add') {
                    op = 1;
                }
                if (action ==  'substract') {
                    op = 2;
                }
                if (action == 'multiply') {
                    op = 3;
                }
                if (action == 'divide') {
                    op = 4;
                }
                reset = 1;
            }
        }
        if (action === 'decimal') {
            if (!display.textContent.includes('.')) {
                display.textContent = display.textContent.concat(k.textContent)
            }
        }
        if (action === 'clear') {
            display.textContent = '0';
            total = reset = num1 = num2 = op = 0;
        }
        if (action === 'calculate') { //once calculate is hit, the next input will be treated as a new number
            if (reset == 1) {
                return;
            }
            num2 = parseFloat(display.textContent);
            total = calculation(num1, num2, op);
            display.textContent = total;
            reset = 1;
            op = 0;
        }
        if (action === 'negative') {
            if (display.textContent[0] != '-') {
                if (display.textContent != 0) {
                    display.textContent = '-' + display.textContent;
                }
            } else {
                display.textContent = display.textContent.replace('-', '');
            }
        }
        if (action === 'delete') { //remove the last digit
            if (display.textContent.length > 1) {
                display.textContent = display.textContent.substring(0, display.textContent.length - 1)
            }
            else {
                display.textContent = '0'
            }
        }
    }
}

function calculation(num1, num2, op) {
    if (op == 4 && num2 == 0) {
        return 'Cannot divided by Zero';
    }
    switch (op){
        case 1:
            return num1 + num2;
        case 2: 
            return num1 - num2;
        case 3:
            return num1 * num2;
        case 4:
            return num1 / num2;
        default:
            return 0;
    }
}
