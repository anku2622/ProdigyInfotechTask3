const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

board.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (gameState[index] !== '') return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    board.forEach(cell => cell.removeEventListener('click', handleClick));
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = `It's a draw!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = 'X';
  gameState = Array(9).fill('');
  statusText.textContent = `Player X's turn`;
  board.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick);
  });
}
