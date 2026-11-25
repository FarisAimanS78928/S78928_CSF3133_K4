// Store the available moves, scores, round results, and current player state.
const choices = ["rock", "paper", "scissors"];
const scores = { wins: 0, losses: 0, draws: 0 };
const results = [];
let playerName = '';
let gameStarted = false;

// Choose one of the three moves at random for the computer.
function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

// Validate the player's name, start the game, and enable the move buttons.
function startGame() {
  const nameInput = document.getElementById('playerName');
  const name = nameInput.value.trim();

  if (!name) {
    window.alert('Please enter your name.');
    return;
  }

  playerName = name;
  gameStarted = true;

  const welcome = document.getElementById('welcome');
  welcome.innerHTML = 'Welcome, ';
  welcome.append(document.createTextNode(`${playerName}!`));
  document.getElementById('playerLabel').textContent = playerName;
  document.getElementById('startTime').textContent = Date();

  document.querySelectorAll('.choice-button').forEach(button => {
    button.disabled = false;
  });
}

// Compare the player's move with the computer's and update the game display.
function playRound(playerChoice) {
  if (!gameStarted) {
    window.alert('Click Start Game first.');
    return;
  }
  if (!choices.includes(playerChoice)) {
    return;
  }

  const computerChoice = getComputerChoice();
  let outcome;

  if (playerChoice === computerChoice) {
    outcome = 'Draw';
    scores.draws += 1;
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    outcome = 'Win';
    scores.wins += 1;
  } else {
    outcome = 'Lose';
    scores.losses += 1;
  }

  results.push(outcome);

  const playerImg = document.getElementById('playerImg');
  playerImg.src = `${playerChoice}.png`;
  playerImg.alt = `Your choice: ${playerChoice}`;

  const computerImg = document.getElementById('computerImg');
  computerImg.src = `${computerChoice}.png`;
  computerImg.alt = `Computer's choice: ${computerChoice}`;

  const resultElement = document.getElementById('result');
  resultElement.textContent = outcome === 'Draw'
    ? 'Draw!'
    : `You ${outcome}!`;
  resultElement.style.color = outcome === 'Win'
    ? 'green'
    : outcome === 'Lose'
      ? 'red'
      : 'grey';

  document.getElementById('wins').textContent = scores.wins;
  document.getElementById('losses').textContent = scores.losses;
  document.getElementById('draws').textContent = scores.draws;

  const historyBody = document.getElementById('historyBody');
  if (historyBody.querySelector('.empty-row')) {
    historyBody.innerHTML = '';
  }
  const round = results.length;
  historyBody.innerHTML += `<tr><td>${round}</td><td>${playerChoice}</td><td>${computerChoice}</td><td>${outcome}</td></tr>`;
}

// Count wins and report the total rounds and win percentage.
function showSummary() {
  let wins = 0;
  for (let index = 0; index < results.length; index += 1) {
    if (results[index] === 'Win') {
      wins += 1;
    }
  }

  const winPercentage = results.length === 0
    ? 0
    : Math.round((wins / results.length) * 100);
  window.alert(`You played ${results.length} rounds and won ${winPercentage}%`);
}

// Clear the score, history, latest result, and choice images.
function resetGame() {
  scores.wins = 0;
  scores.losses = 0;
  scores.draws = 0;
  results.length = 0;

  document.getElementById('wins').textContent = '0';
  document.getElementById('losses').textContent = '0';
  document.getElementById('draws').textContent = '0';
  document.getElementById('historyBody').innerHTML = '';

  const resultElement = document.getElementById('result');
  resultElement.textContent = '';
  resultElement.style.color = '';
  document.getElementById('playerImg').src = 'placeholder.png';
  document.getElementById('playerImg').alt = 'Your choice has not been made yet';
  document.getElementById('computerImg').src = 'placeholder.png';
  document.getElementById('computerImg').alt = "The computer's choice has not been made yet";
}

// Show placeholder images until the first round is played.
document.getElementById('playerImg').src = 'placeholder.png';
document.getElementById('computerImg').src = 'placeholder.png';
