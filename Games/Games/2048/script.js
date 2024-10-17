const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const gameOverScreen = document.getElementById('game-over');
const playAgainButton = document.getElementById('play-again-button');

let score = 0;
let grid = [];

function init() {
    score = 0;
    scoreDisplay.innerText = score;
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    render();
    addRandomTile();
    addRandomTile();
}

function addRandomTile() {
    const emptyTiles = [];
    grid.forEach((row, rIdx) => {
        row.forEach((value, cIdx) => {
            if (value === 0) {
                emptyTiles.push({ rIdx, cIdx });
            }
        });
    });
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    if (randomTile) {
        grid[randomTile.rIdx][randomTile.cIdx] = Math.random() < 0.9 ? 2 : 4;
        render();
    }
}

function render() {
    gridContainer.innerHTML = '';
    grid.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            if (value) {
                tile.classList.add(`tile-${value}`);
                tile.innerText = value;
            }
            gridContainer.appendChild(tile);
        });
    });
}

function move(direction) {
    let moved = false;
    switch (direction) {
        case 'up':
            for (let col = 0; col < 4; col++) {
                for (let row = 1; row < 4; row++) {
                    if (grid[row][col] !== 0) {
                        let r = row;
                        while (r > 0 && (grid[r - 1][col] === 0 || grid[r - 1][col] === grid[r][col])) {
                            if (grid[r - 1][col] === grid[r][col]) {
                                grid[r - 1][col] *= 2;
                                score += grid[r - 1][col];
                                grid[r][col] = 0;
                                moved = true;
                                break;
                            } else {
                                grid[r - 1][col] = grid[r][col];
                                grid[r][col] = 0;
                                moved = true;
                            }
                            r--;
                        }
                    }
                }
            }
            break;

        case 'down':
            for (let col = 0; col < 4; col++) {
                for (let row = 2; row >= 0; row--) {
                    if (grid[row][col] !== 0) {
                        let r = row;
                        while (r < 3 && (grid[r + 1][col] === 0 || grid[r + 1][col] === grid[r][col])) {
                            if (grid[r + 1][col] === grid[r][col]) {
                                grid[r + 1][col] *= 2;
                                score += grid[r + 1][col];
                                grid[r][col] = 0;
                                moved = true;
                                break;
                            } else {
                                grid[r + 1][col] = grid[r][col];
                                grid[r][col] = 0;
                                moved = true;
                            }
                            r++;
                        }
                    }
                }
            }
            break;

        case 'left':
            for (let row = 0; row < 4; row++) {
                for (let col = 1; col < 4; col++) {
                    if (grid[row][col] !== 0) {
                        let c = col;
                        while (c > 0 && (grid[row][c - 1] === 0 || grid[row][c - 1] === grid[row][c])) {
                            if (grid[row][c - 1] === grid[row][c]) {
                                grid[row][c - 1] *= 2;
                                score += grid[row][c - 1];
                                grid[row][c] = 0;
                                moved = true;
                                break;
                            } else {
                                grid[row][c - 1] = grid[row][c];
                                grid[row][c] = 0;
                                moved = true;
                            }
                            c--;
                        }
                    }
                }
            }
            break;

        case 'right':
            for (let row = 0; row < 4; row++) {
                for (let col = 2; col >= 0; col--) {
                    if (grid[row][col] !== 0) {
                        let c = col;
                        while (c < 3 && (grid[row][c + 1] === 0 || grid[row][c + 1] === grid[row][c])) {
                            if (grid[row][c + 1] === grid[row][c]) {
                                grid[row][c + 1] *= 2;
                                score += grid[row][c + 1];
                                grid[row][c] = 0;
                                moved = true;
                                break;
                            } else {
                                grid[row][c + 1] = grid[row][c];
                                grid[row][c] = 0;
                                moved = true;
                            }
                            c++;
                        }
                    }
                }
            }
            break;
    }

    if (moved) {
        addRandomTile();
        scoreDisplay.innerText = score;
        checkGameOver();
    }
}

function checkGameOver() {
    const emptyTiles = grid.flat().filter(value => value === 0).length;
    if (emptyTiles === 0) {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if ((row < 3 && grid[row][col] === grid[row + 1][col]) ||
                    (col < 3 && grid[row][col] === grid[row][col + 1])) {
                    return;
                }
            }
        }
        gameOverScreen.style.display = 'flex';
    }
}

window.addEventListener('keydown', (event) => {
    if (!gameOverScreen.style.display) {
        switch (event.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    }
});

resetButton.addEventListener('click', init);
playAgainButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    init();
});

init();
