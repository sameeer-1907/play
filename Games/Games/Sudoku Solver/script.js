document.getElementById("solveButton").addEventListener("click", solveSudoku);
document.getElementById("resetButton").addEventListener("click", resetBoard);

function solveSudoku() {
    const board = [];
    const cells = document.querySelectorAll(".cell");
    
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const value = cells[i * 9 + j].value;
            row.push(value ? parseInt(value) : 0); 
        }
        board.push(row);
    }

    if (!isValidBoard(board)) {
        document.getElementById("message").innerText = "Invalid Sudoku board!";
        return;
    }

    if (solve(board)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells[i * 9 + j].value = board[i][j] === 0 ? '' : board[i][j];
            }
        }
        document.getElementById("message").innerText = "Sudoku solved!";
    } else {
        document.getElementById("message").innerText = "No solution exists!";
    }
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false; 
            }
        }
    }
    return true; 
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
    }
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }
    const boxRowStart = row - row % 3;
    const boxColStart = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + boxRowStart][j + boxColStart] === num) return false;
        }
    }
    return true; 
}

function isValidBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                const num = board[i][j];
                board[i][j] = 0; 
                if (!isValid(board, i, j, num)) {
                    board[i][j] = num; 
                    return false;
                }
                board[i][j] = num;
            }
        }
    }
    return true;
}

function resetBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.value = '');
    document.getElementById("message").innerText = '';
}
