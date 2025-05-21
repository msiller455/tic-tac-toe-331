// this prompt variable stores a function that allows to retreive user input
const prompt = require("prompt-sync")()

console.log("Tic Tac Toe")

// Constant Reference / Lookup Variables
const WINNING_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left col
  [1, 4, 7], // middle col
  [2, 5, 8], // right col
  [0, 4, 8], // ltr diaganol
  [2, 4, 6], // rtl diaganol
]



// Model portion of our code
// Our game state variables
// We want to track the changes of this data
// to represent the "state of our game"
let board, turn, winner, replay = 'y';


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
  replay = null
  render()
}


// repeatedly prompts the user for a space number
// checks for validity and updates board array if valid
// ends when the winner variable is updated
function gameplayLoop() {
  while (!winner) {
    const choice = prompt('Select a space to play using numbers 0 through 8: ');

    // breakout choice for development
    if (choice === 'quit') break;

    const isValid = checkUserChoice(choice)
    if (isValid) {
      board[choice] = turn
      turn = changeTurn(turn)
      winner = checkWinner()
      render()
    }
  }
}

// Helper functions
// Returns true boolean if choice is number, is between 0 and 8 inclusive, and if corresponding index on board is not occupied
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

const changeTurn = currentTurn => currentTurn === 'X' ? 'O' : 'X'

function checkWinner() {
  for (let combo of WINNING_COMBOS) {
    if (
      board[combo[0]]
      && board[combo[0]] === board[combo[1]]
      && board[combo[0]] === board[combo[2]]
    ) {
      return board[combo[0]]
    }
  }

  // This checks if there are any empty spaces on board
  const hasEmpty = board.some(space => space === null)

  if (hasEmpty) {
    return null
  } else {
    return 'T'
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
  if (winner === 'T') {
    console.log('It is a tie game!')
  } else if (winner) {
    console.log(`Congrats, Player ${winner} has won the game!`)
  } else {
    console.log(`It is ${turn}'s turn, please choose a space.`)
  }
}

// Start Game
while (replay === 'y') {
  init()
  gameplayLoop()

  replay = prompt('If you want to play again, enter "y" in the console: ')
}

console.log('Thanks for playing!')
