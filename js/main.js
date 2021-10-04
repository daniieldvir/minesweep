'use strict'

const MINE = '💣';
const EMPTY = '.';

var gBoard = buildBoard()

var gLevel = [
    {
        size: 4,
        mine: 2
    },
    {
        size: 8,
        mine: 12
    },
    {
        size: 12,
        mine: 30
    }
];

function initGame() {

    renderBoard(gBoard, '.board-container')

}

function cellMarked(elCell) {

}

function cellClicked(elCell, i, j) {

}



// function setMinesNegsCount(board) {
     
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board.length; j++) {
//             var negs = countNegs(board, i, j)

//         }        
//     }
//     return negs
// }

function setMinesNegsCoun(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j] === MINE) count++;
        }
    }
    return count
}



/// render the board
function renderBoard(board, selector) {
    var strHTML = `<table border="1"><tbody>`;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            
            var cellClass = getClassName({i:i, j:j});

            cellClass += (currCell.isMine) ? ' mine' : ' empty';

            strHTML += `\t<td class="cell ${cellClass}" onclick="shown(this)">`

            /// mine manually
			if ((i === 1 && j === 1) || (i === 3 && j === 4 - 1)) {
                currCell.isMine = true
                console.log(currCell.isMine)
            }

            /// mine true
            if (currCell.isMine) {
                strHTML += MINE
            } else EMPTY



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



