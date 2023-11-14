'use strict';

/*
//////////////////////////
 WHat is DOM Manuipulation


 Document Object Model: A structured representation of html documents. It allows javascript to access html elements and sytles to manipulate them.

 A connection point btw html doc and javascript code.

 Web API's are libraries that are written in javascript and available to use'

 An event is something that happen on the page.
///////// Node are the object that make up the DOM. Everything in the DOM is a node

Refactoring is restructuring code without changing how it works.

*/
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let displayNum = document.querySelector('.number');

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};
// Creating the guess functionality
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage('⛔ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🍾 Correct Number');
    displayNumber(secretNumber);
    document.querySelector('body').style.backgroundColor = '#60b347';
    displayNum.style.width = '30rem';

    //When the score is correct, the highscore should score the point value.

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is too High
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage(' You lost the game');
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#ff2500';
      displayNumber('😠');
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  displayNumber('?');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  displayNum.style.width = '15rem';
});
