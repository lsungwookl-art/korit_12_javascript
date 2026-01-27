const difficultySettings = {
    easy: { size: 10, mines: 10 },
    medium: { size: 15, mines: 30 },
    hard: { size: 20, mines: 60 }
};

let currentDifficulty = 'easy';
let board = [];
let minesRemaining = 0;
let gameOver = false;
let isFirstClick = true;
let timerInterval;
let secondsElapsed = 0;

const gameBoard = document.getElementById('game-board');
const minesLeftDisplay = document.getElementById('mines-left');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best-time');
const gameStatusDisplay = document.getElementById('game-status');
const difficultySelect = document.getElementById('difficulty-select');
const resetButton = document.getElementById('reset-button');

function initGame() {
    const { size, mines } = difficultySettings[currentDifficulty];
    clearInterval(timerInterval);
    board = [];
    minesRemaining = mines;
    secondsElapsed = 0;
    gameOver = false;
    isFirstClick = true;
    
    timerDisplay.textContent = `시간: 0s`;
    minesLeftDisplay.textContent = `지뢰: ${minesRemaining}`;
    gameStatusDisplay.textContent = '';
    gameStatusDisplay.className = 'game-status';
    
    updateBestTimeDisplay();
    createBoard(size);
    renderBoard(size);
}

function createBoard(size) {
    for (let y = 0; y < size; y++) {
        board[y] = [];
        for (let x = 0; x < size; x++) {
            board[y][x] = { isMine: false, isRevealed: false, isFlagged: false, minesAround: 0 };
        }
    }
}

function placeMines(size, mines, safeX, safeY) {
    let placed = 0;
    while (placed < mines) {
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        if (!board[y][x].isMine && (x !== safeX || y !== safeY)) {
            board[y][x].isMine = true;
            placed++;
        }
    }
}

function calculateNumbers(size) {
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (board[y][x].isMine) continue;
            let count = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    let ny = y + dy, nx = x + dx;
                    if (ny >= 0 && ny < size && nx >= 0 && nx < size && board[ny][nx].isMine) count++;
                }
            }
            board[y][x].minesAround = count;
        }
    }
}

function renderBoard(size) {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 32px)`;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            updateCellVisual(cell, x, y);

            cell.addEventListener('mousedown', (e) => {
                if (gameOver) return;
                if (e.buttons === 3) handleChord(x, y); // 좌우 동시 클릭
            });

            cell.addEventListener('mouseup', (e) => {
                if (gameOver) return;
                if (e.button === 0 && e.buttons === 0) handleCellClick(x, y);
            });

            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                handleRightClick(x, y);
            });

            gameBoard.appendChild(cell);
        }
    }
}

function updateCellVisual(el, x, y) {
    const data = board[y][x];
    if (data.isRevealed) {
        el.classList.add('revealed');
        if (data.isMine) {
            el.classList.add('mine');
            el.textContent = '💣';
        } else if (data.minesAround > 0) {
            el.textContent = data.minesAround;
            el.classList.add(`num-${data.minesAround}`);
        }
    } else if (data.isFlagged) {
        el.classList.add('flagged');
        el.textContent = '🚩';
    }
}

function handleCellClick(x, y) {
    if (gameOver || board[y][x].isFlagged || board[y][x].isRevealed) return;

    if (isFirstClick) {
        const { size, mines } = difficultySettings[currentDifficulty];
        placeMines(size, mines, x, y);
        calculateNumbers(size);
        startTimer();
        isFirstClick = false;
    }

    revealCell(x, y);
    checkGameStatus();
    renderBoard(difficultySettings[currentDifficulty].size);
}

function revealCell(x, y) {
    const { size } = difficultySettings[currentDifficulty];
    if (x < 0 || x >= size || y < 0 || y >= size || board[y][x].isRevealed || board[y][x].isFlagged) return;

    board[y][x].isRevealed = true;
    if (board[y][x].isMine) {
        gameOver = true;
        return;
    }

    if (board[y][x].minesAround === 0) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) revealCell(x + dx, y + dy);
        }
    }
}

function handleRightClick(x, y) {
    if (gameOver || board[y][x].isRevealed) return;
    board[y][x].isFlagged = !board[y][x].isFlagged;
    minesRemaining += board[y][x].isFlagged ? -1 : 1;
    minesLeftDisplay.textContent = `지뢰: ${minesRemaining}`;
    renderBoard(difficultySettings[currentDifficulty].size);
}

function handleChord(x, y) {
    const cell = board[y][x];
    if (!cell.isRevealed || cell.minesAround === 0) return;

    const { size } = difficultySettings[currentDifficulty];
    let neighbors = [];
    let closedNeighbors = [];
    let flagCount = 0;

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            let ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < size && nx >= 0 && nx < size) {
                const neighbor = board[ny][nx];
                neighbors.push({nx, ny, data: neighbor});
                if (neighbor.isFlagged) flagCount++;
                if (!neighbor.isRevealed) closedNeighbors.push({nx, ny, data: neighbor});
            }
        }
    }

    // 스마트 로직: 남은 칸이 지뢰수와 같으면 자동 깃발
    if (flagCount < cell.minesAround && closedNeighbors.length === cell.minesAround) {
        closedNeighbors.forEach(pos => {
            if (!pos.data.isFlagged) {
                pos.data.isFlagged = true;
                minesRemaining--;
            }
        });
        flagCount = cell.minesAround;
        minesLeftDisplay.textContent = `지뢰: ${minesRemaining}`;
    }

    // 깃발 수 충족 시 주변 오픈
    if (flagCount === cell.minesAround) {
        neighbors.forEach(pos => {
            if (!pos.data.isRevealed && !pos.data.isFlagged) handleCellClick(pos.nx, pos.ny);
        });
    }
    renderBoard(size);
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        timerDisplay.textContent = `시간: ${secondsElapsed}s`;
    }, 1000);
}

function checkGameStatus() {
    if (gameOver) {
        clearInterval(timerInterval);
        gameStatusDisplay.textContent = '게임 오버! 😭';
        gameStatusDisplay.className = 'game-status lose';
        revealAllMines();
    } else {
        const { size, mines } = difficultySettings[currentDifficulty];
        const revealedCount = board.flat().filter(c => c.isRevealed).length;
        if (revealedCount === size * size - mines) {
            clearInterval(timerInterval);
            gameOver = true;
            gameStatusDisplay.textContent = '승리! 🎉';
            gameStatusDisplay.className = 'game-status win';
            saveBestTime();
        }
    }
}

function revealAllMines() {
    board.flat().forEach(c => { if (c.isMine) c.isRevealed = true; });
}

function saveBestTime() {
    const key = `mine_best_${currentDifficulty}`;
    const best = localStorage.getItem(key) || Infinity;
    if (secondsElapsed < best) {
        localStorage.setItem(key, secondsElapsed);
        updateBestTimeDisplay();
        alert(`축하합니다! 새로운 최고 기록: ${secondsElapsed}초`);
    }
}

function updateBestTimeDisplay() {
    const best = localStorage.getItem(`mine_best_${currentDifficulty}`);
    bestTimeDisplay.textContent = `최고 기록: ${best ? best + 's' : '-'}`;
}

difficultySelect.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
    initGame();
});

resetButton.addEventListener('click', initGame);
initGame();