'use strict';

const passwordBox = document.getElementById('password');
const btnClick = document.querySelector('.btn');
const length = 12;
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const number = '0123456789';
const symbol = '@#$%()_+~|}{[]<>/-=?*!';
// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%()_+~|}{[]<>/-=?*!0123456789'

const allChars = upperCase + lowerCase + number + symbol;

const onclick = function () {
  createPassword();
};

// btnClick.onclick = function () {
//   createPassword();
// };

btnClick.addEventListener('click', onclick);

function createPassword() {
  let password = '';
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  while (length > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  passwordBox.value = password;
}

function copyPassword() {
  passwordBox.select();
}

// const btnClick = (document.getElementById('btn').onclick = function () {
//   createPassword();
// });
