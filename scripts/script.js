const ROUNDS_IN_GAME = 5;

let rounds = 0;
let winner = false;
let playerRoundsWon = 0;
let computerRoundsWon = 0;
let playerSelection;


function initGameVariables() {
  rounds = 0;
  winner = false;
  playerRoundsWon = 0;
  computerRoundsWon = 0;
}

function getPlayerInput() {
  playerSelection = prompt("Do you choose Rock, Paper, or Scissors?");
}

function computerPlay() {
  let randomNum = Math.random();
  if (randomNum < 1/3) {
    return "rock";
  } else if (randomNum > 1/3 && randomNum < 2/3) {
    return "paper";
  } else {
    return "scissors"
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  if (playerSelection == computerSelection) {
    return null;
  }
  
  if (playerSelection == "rock" && computerSelection == "scissors") {
    return true; 
  }
  if (playerSelection == "scissors" && computerSelection == "paper") {
    return true;
  }
  if (playerSelection == "paper" && computerSelection == "rock") {
    return true;
  }
  
  return false;
}

function checkGameOver(roundsWon) {
  return roundsWon >= Math.ceil(ROUNDS_IN_GAME / 2);
}

function game() {
  initGameVariables();
  while(winner === false && rounds < ROUNDS_IN_GAME) {
    getPlayerInput();
	while (playerSelection === null || playerSelection == "") {
		console.log(`You did not choose an option.`);
		getPlayerInput();
	}
    let computerSelection = computerPlay();
    let didPlayerWin = playRound(playerSelection, computerSelection);
    
    if (didPlayerWin !== null) {
      if (didPlayerWin) {
		playerRoundsWon++;
		console.log(`You win the round. ${playerSelection} beats ${computerSelection}.`);
	  } else {
		computerRoundsWon++;
		console.log(`You lose the round. ${computerSelection} beats ${playerSelection}.`);
	  }
      rounds++;
    } else {
	  console.log(`There was a draw this round.`);
	}
    
    if (checkGameOver(playerRoundsWon)) {
      console.log("You win!");
	  break;
    }
    if (checkGameOver(computerRoundsWon)) {
      console.log("You lose.");
	  break;
    }
  }
}

game();
