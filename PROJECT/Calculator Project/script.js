'use strict';

let equal_pressed = 0;

let btn_input = document.querySelectorAll('.input_button');
//Refer input, equal, clear and erase
let input = document.getElementById('display');
let equal = document.getElementById('equals');
let clear = document.getElementById('clear');
let erase = document.getElementById('erase');

window.onload = () => {
  input.value = '';
};

// Access each class using forEach

btn_input.forEach(button_class => {
  button_class.addEventListener('click', () => {
    if (equal_pressed == 1) {
      input.value = '';
      equal_pressed = 0;
    }
    //display value of each button
    input.value += button_class.value;
  });
});

// Solve the user's input when clicked on equal sign

equal.addEventListener('click', () => {
  equal_pressed = 1;
  let inp_val = input.value;
  try {
    // evaluate user's input
    let solution = eval(inp_val);
    //True for natural numbers
    //false for decimals
    if (Number.isInteger(solution)) {
      input.value = solution;
    } else {
      input.value = solution.toFixed(2);
    }
  } catch (err) {
    // If user's enter a wrong number
    alert('Invalid Input');
  }
});

// Clear whole input

clear.addEventListener('click', () => {
  input.value = '';
});
// Erase single Digit

erase.addEventListener('click', () => {
  input.value = input.value.substr(0, input.value.length - 1);
});
