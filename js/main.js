'use strict'

const MINE = '💣';
const EMPTY = '.';

/// global var
var gBoard = buildBoard();
var gElSelectedCell = null


/// level up and size of board
// var gLevel = [
//     { size: 4, mine: 2 },
//     { size: 8, mine: 12 },
//     { size: 12, mine: 30 },
// ]


// function level() {
//   gLevel.size = number;

// }

function initGame() {
    renderBoard(gBoard, '.board-container')

}

function cellMarked(elCell) {

}

function cellClicked(elCell, i, j) {
    var cellClick = gBoard[i][j];
    console.log('cellClick', i, j, cellClick);





}


// negs count
function setMinesNegsCoun(board, rowIdx, colIdx) {
    var clickCell = [];
    var cunter = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].cell === gBoard[i][j].isMine) cunter++;
            clickCell.push({ i, j })
        }
    }
    return clickCell
}


/// render the board
function renderBoard(board, selector) {
    var strHTML = `<table border="1"><tbody>`;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            var className = getClassName({ i: i, j: j });

            strHTML += `\t<td class="cell ${className}" cell-${i}-${j} onclick="cellClicked(this,${i},${j})">`

            /// mine manually
            if ((i === 1 && j === 1) || (i === 3 && j === 4 - 1)) {
                currCell.isMine = true;
                //console.log(currCell.isMine)
            }

            /// mine true
            if (currCell.isMine) {
                strHTML += MINE
                var countNegs = setMinesNegsCoun(board, i, j)
                console.log('countNegs', countNegs);

                currCell.minesAroundCount = countNegs;
                strHTML += `<class="negs ${countNegs.length}">`
               
                var elNegs = document.querySelector('.negs');

            } else EMPTY



            // see nage phus to [] is consol.og


            if (MINE.length === 0) {
                countNegs.textContent = MINE.length
            }


            strHTML += `\t</td>\n`
        }
        strHTML += `</tr>\n`
    }
    console.log(strHTML)
    var elConteiner = document.querySelector(selector);
    elConteiner.innerHTML = strHTML;
}


/// build the gamr board
function buildBoard() {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: true,
                isMine: false,
                isMarked: true
            }

            board[i][j] = cell;
        }
    }
    console.table('board', board)
    return board
}



