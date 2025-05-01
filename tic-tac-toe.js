const prompt = require("prompt-sync")()

console.log("Tic Tac Toe")

// Model data
// Our game state variables
let board, turn, winner;


// Controller Functions

// This function represents beginning of game
// will give our state variables "starting values"
function init() {
  board = [
    null, null, null,
    null, null, null,
    null, null, null,
  ]
  turn = 'X'
  winner = null
  render()
}

function gameplayLoop() {
  while (!winner) {
    const choice = prompt('Select a space to play using numbers 0 through 8: ');

    if (choice === 'quit') break;

    const isValid = checkUserChoice(choice)
    if (isValid) {
      board[choice] = turn
      turn = changeTurn(turn)
      render()
    }
  }
}

function checkUserChoice(choice) {
  if (!isNaN(choice)) {
    if (choice >= 0 && choice <= 8) {
      if (board[choice] === null) {
        return true
      }
    }
  }

  console.log('Invalid choice')
  return false
}

function changeTurn(currentTurn) {
  if (currentTurn === 'X') {
    return 'O'
  } else {
    return 'X'
  }
}


// View Functions

// This function is responsible for displaying our state data on screen
function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  console.log(`  ${board[0] || ' '}|${board[1] || ' '}|${board[2] || ' '}`);
  console.log(' --|-|--');
  console.log(`  ${board[3] || ' '}|${board[4] || ' '}|${board[5] || ' '}`);
  console.log(' --|-|--');
  console.log(`  ${board[6] || ' '}|${board[7] || ' '}|${board[8] || ' '}`);
}

function renderMessage() {
  console.log(`It is ${turn}'s turn, please choose a space.`)
}

// Start Game
init()
gameplayLoop()