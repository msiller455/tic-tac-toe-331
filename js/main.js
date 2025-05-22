/*-------- Cached Elements ---------*/
const boardEl = document.querySelector('div.board')
const messageEl = document.querySelector('.message')
const resetBtn = document.querySelector('.reset-btn')


/*-------- Constant Lookup Variables ---------*/
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

/*-------- State Variables ---------*/
let board, turn, winner

/*-------- Event Listeners ---------*/
boardEl.addEventListener('click', handleBoardClick)
resetBtn.addEventListener('click', init)

/*-------- Functions ---------*/
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

function handleBoardClick(evt) {
  if (evt.target !== boardEl && !winner) {
    const boardChildren = [...boardEl.children]
    const childIdx = boardChildren.indexOf(evt.target)

    if (!board[childIdx]) {
      board[childIdx] = turn
      turn = changeTurn(turn)
      winner = checkWinner()
      render()
    }
  }
}

function changeTurn(currentTurn) {
  if (currentTurn === 'X') {
    return 'O'
  } else {
    return 'X'
  }
}

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

// Render Functions
function render() {
  renderBoard()
  renderMessage()
  renderButton()
}

function renderBoard() {
  board.forEach(function (cell, idx) {
    if (cell) {
      boardEl.children[idx].innerText = cell
    } else {
      boardEl.children[idx].innerText = ''
    }
  })
}

function renderMessage() {
  if (winner === 'T') {
    messageEl.innerText = 'It is a tie game!'
  } else if (winner) {
    messageEl.innerText = `Congrats, Player ${winner} has won the game!`
  } else {
    messageEl.innerText = `It is ${turn}'s turn, please choose a space.`
  }
}

function renderButton() {
  if (winner) {
    resetBtn.style.visibility = 'visible'
  } else {
    resetBtn.style.visibility = 'hidden'
  }
}


/*-------- Game Start ---------*/
init()