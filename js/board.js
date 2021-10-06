'use strict'

var gBoard;
var gStrarLevel = 4;


///init game
function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    gStrarLevel = 4;
    totalSeconds = 0;  
    gLive = 3;  
    gFistClick = false;
    isTimmerOn = false;
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    clearInterval(gInterval);
}


/// render the board
function renderBoard(board, selector) {
    var strHTML = `<table oncontextmenu="return false" border="1"><tbody>`
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board.length; j++) {
            strHTML += `<td class="cell cell${i}-${j}" onmousedown="cellClicked(this,${i},${j},event)"></td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody></table>`
    var elConteiner = document.querySelector(selector)
    elConteiner.innerHTML = strHTML
}


/// level size
function level(number) {
    gStrarLevel = number;

    if (number === 4) gMineCount = 2;
    if (number === 8) gMineCount = 12;
    if (number === 12) gMineCount = 30;

    document.querySelector('.playerLive').innerText = 'Life Remainig: ❤️❤️❤️';
    document.querySelector('.restartGame').innerText = '😃';
    document.querySelector('.player-status').innerText = '';
    //document.querySelector('.timer span').innerText = ''
    
    clearInterval(gInterval)
    initGame()
}


/// build the gamr board
function buildBoard() {
    var board = [];
    for (var i = 0; i < gStrarLevel; i++) {
        board[i] = [];
        for (var j = 0; j < gStrarLevel; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    // console.table('board', board)
    return board
}


