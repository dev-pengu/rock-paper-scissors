const messageContainer = document.querySelector('#message-container');
const playerChoice = document.querySelector('#player-choice');
const computerChoice = document.querySelector('#computer-choice');
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const ROCK_IMG = "images/rock.png";
const PAPER_IMG = "images/paper.png";
const SCISSOR_IMG = "images/scissors.png";

const TIE_MESSAGE = "It's a tie!";
const ROUND_WIN_MESSAGE = "You win this round!";
const ROUND_LOSS_MESSAGE = "You lose this round.";

let playerScore = 0;
let computerScore = 0;

function getPlayerChoice(e) {
	let btnId = e.target.getAttribute('id');
	switch(btnId) {
		case ROCK:
			playerChoice.setAttribute('src', ROCK_IMG);
			playerChoice.setAttribute('alt', ROCK);
			return ROCK;
			break;
		case PAPER:
			playerChoice.setAttribute('src', PAPER_IMG);
			playerChoice.setAttribute('alt', PAPER);
			return PAPER;
			break;
		case SCISSORS:
			playerChoice.setAttribute('src', SCISSOR_IMG);
			playerChoice.setAttribute('alt', SCISSORS);
			return SCISSORS;
			break;
	}
}

function computerPlay() {
	let randomNum = Math.random();
	if (randomNum < 1/3) {
		updateComputerPlayGraphic(ROCK);
		return ROCK;
	} else if (randomNum > 1/3 && randomNum < 2/3) {
		updateComputerPlayGraphic(PAPER);
		return PAPER;
	} else {
		updateComputerPlayGraphic(SCISSORS);
		return SCISSORS;
	}
}

function updateComputerPlayGraphic(str) {
	switch(str) {
		case ROCK:
			computerChoice.setAttribute('src', ROCK_IMG);
			computerChoice.setAttribute('alt', ROCK);
			break;
		case PAPER:
			computerChoice.setAttribute('src', PAPER_IMG);
			computerChoice.setAttribute('alt', PAPER);
			break;
		case SCISSORS:
			computerChoice.setAttribute('src', SCISSOR_IMG);
			computerChoice.setAttribute('alt', SCISSORS);
			break;
	}
}

function updateScoreboard() {
	let element = document.querySelector('#score-text');
	element.textContent = `${playerScore} - ${computerScore}`;
}

function playRound(e) {
	if(!checkForWinner()) {
		let computerSelection = computerPlay();
		let playerSelection = getPlayerChoice(e);
		
		if (playerSelection == computerSelection) {
			messageContainer.textContent = TIE_MESSAGE;
			return;
		} else if (playerSelection == ROCK && computerSelection == SCISSORS) {
			roundWin();
		} else if (playerSelection == SCISSORS && computerSelection == PAPER) {
			roundWin();
		} else if (playerSelection == PAPER && computerSelection == ROCK) {
			roundWin();
		} else {	
			roundLoss();
		}
		if (checkForWinner()) {
			if (playerScore == 5) {
				gameOver('You Win!');
			} else if (computerScore == 5) {
				gameOver('You Lose.');
			}
		}
	}
}

function gameOver(message) {
	messageContainer.textContent = message;
	document.querySelector('#play-again').style.display = "block";
}

function playAgain() {
	playerChoice.setAttribute('src', "");
	playerChoice.setAttribute('alt', "");
	
	computerChoice.setAttribute('src', "");
	computerChoice.setAttribute('alt', "");
	playerSelection = null;
	playerScore = 0;
	computerScore = 0;
	updateScoreboard();
	messageContainer.textContent = "";
	document.querySelector('#play-again').style.display = "none";
}

function roundWin() {
	messageContainer.textContent = ROUND_WIN_MESSAGE;
	playerScore++;
	updateScoreboard();
}

function roundLoss() {
	messageContainer.textContent = ROUND_LOSS_MESSAGE;
	computerScore++;
	updateScoreboard();
}

function checkForWinner() {
	return computerScore == 5 || playerScore == 5;
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
	button.addEventListener('click', function(e) { playRound(e);});
});

document.querySelector('#play-again').addEventListener('click', playAgain);