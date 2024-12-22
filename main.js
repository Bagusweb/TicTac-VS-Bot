const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const notification = document.getElementById('notification');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;
let score = { X: 0, O: 0 };

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

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    if (checkWin()) {
        showNotification(`Player ${currentPlayer} wins!`);
        score[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
    } else if (boardState.every(cell => cell)) {
        showNotification('Draw!');
        gameActive = false;
    } else {
        currentPlayer = 'O';
        computerPlay();
    }
}

function computerPlay() {
    const availableCells = boardState.map((cell, index) => cell === null ? index : null).filter(cell => cell !== null);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const computerMove = availableCells[randomIndex];

    boardState[computerMove] = currentPlayer;
    cells[computerMove].textContent = currentPlayer;
    cells[computerMove].classList.add(currentPlayer);

    if (checkWin()) {
        showNotification(`Player ${currentPlayer} (Computer) wins!`);
        score[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
    } else if (boardState.every(cell => cell)) {
        showNotification('Draw!');
        gameActive = false;
    } else {
        currentPlayer = 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] === currentPlayer && boardState[b] === currentPlayer && boardState[c] === currentPlayer;
    });
}

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

function updateScoreboard() {
    scoreXDisplay.textContent = score.X;
    scoreODisplay.textContent = score.O;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    notification.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
            