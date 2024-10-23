let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame){
	submit.addEventListener('click', function(e){
		e.preventDefault();
		const guess = parseInt(userInput.value);
		console.log(guess);
		validateGuess(guess);
	});
}

function validateGuess(guess){
	if (isNaN(guess)){
		alert('Please enter a valid number');
	}
	else if (guess < 1 || guess > 100){
		alert('Please enter a number between 1 and 100');
	}
	else{
		prevGuess.push(guess);

		if (numGuess === 10){
			cleanupGuess(guess);
			displayMessage(`Game Over! the number was ${randomNumber}`);
			endGame();
		}
		else{
			cleanupGuess(guess);
			checkGuess(guess);
		}
	}
}

function checkGuess(guess){
	if (guess === randomNumber){
		displayMessage(`Bingo! You guessed it right`);
		endGame();
	}
	else if (guess < randomNumber){
		displayMessage(`Number is tooo low! Try again.`);
	}
	else if (guess > randomNumber){
		displayMessage(`Number is tooo high! Try again.`);
	}
}

function cleanupGuess(guess){
	userInput.value = '';
	guessSlot.innerHTML += `${guess} `;
	numGuess++;
	remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message){
	lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
	userInput.value = '';
	userInput.setAttribute('disabled', '');
	playGame = false;
	newGame();
}

function newGame(){
	const newGameButton = document.querySelector('#newGame');
	newGameButton.addEventListener('click', function(e){
		randomNumber = parseInt(Math.random() * 100 + 1);
		prevGuess = [];
		numGuess = 1;
		guessSlot.innerHTML = '';
		remaining.innerHTML = `${11 - numGuess}`;
		userInput.removeAttribute('disabled');

		playGame = true;
	});
}