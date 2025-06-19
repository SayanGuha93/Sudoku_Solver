var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=medium')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
	// Write your Code here
    SolveSudokuRec(board,0,0);
    FillBoard(board);
}
/* ---------- isSafe (row / col / 3×3 checks) ---------- */
function IsSafe(mat, row, col, num) {
    // Row check
    for (let x = 0; x < 9; x++) {
      if (mat[row][x] === num) return false;
    }
  
    // Column check
    for (let x = 0; x < 9; x++) {
      if (mat[x][col] === num) return false;
    }
  
    // 3×3 sub‑grid check
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat[startRow + i][startCol + j] === num) return false;
      }
    }
  
    return true;
  }
  
  /* ---------- Recursive back‑tracking solver ---------- */
    function SolveSudokuRec(mat, row, col) {
    const n = mat.length;          // 9
  
    // Reached col 9 of last row → solved
    if (row === n - 1 && col === n) return true;
  
    // End of row → advance to next row
    if (col === n) {
      row++;
      col = 0;
    }
  
    // Skip pre‑filled cell
    if (mat[row][col] !== 0) return SolveSudokuRec(mat, row, col + 1);
  
    // Try digits 1‑9
    for (let num = 1; num <= n; num++) {
      if (IsSafe(mat, row, col, num)) {
        mat[row][col] = num;                      // place
        if (SolveSudokuRec(mat, row, col + 1)) return true;
        mat[row][col] = 0;                        // backtrack
      }
    }
  
    return false;                                 // trigger back‑tracking
  }
  