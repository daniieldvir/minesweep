'use strict'
const MINE = '💣';
const EMPTY = ' ';
const LIFE = '❤️';
const FLAG = '📍'
const START_SMAILE = '😃'
const WIN_SMAILE = '😎'
const LOSE_SMAILE = '🤯'

var gLive = 3;
var gHints = 3;
var gBoard;
var gStrarLevel = 4;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};

///init game
function initGame() {
    var elSmailIcon = document.querySelector('.smail-icon');
    elSmailIcon.innerText = START_SMAILE;

    // var elPlayerlive = document.querySelector('.player-live');
    // elPlayerlive.innerText = LIFE 

    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    gStrarLevel = 4;
    gLive = 3;

    gFistClick = false;
    gGame.isOn = true;
    isTimmerOn = false;
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    totalSeconds = 0;

    clearInterval(gTimeInterval);
}

//for time function
var isTimmerOn = false
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

victory()
function victory() {
    var cellCount = gLevel.SIZE ** 2;
    var cellShownCount = gGame.shownCount;
    var cellMarked = gGame.markedCount;
    var cellMainCount = gMineCount;

    // console.log('cellCount', cellCount);
    // console.log('cellShownCount', cellShownCount);
    // console.log('cellMarkedel', cellMarked);
    // console.log('cellMainCount', cellMainCount);

    // console.log('cler cell', cellCount - cellMainCount);

    // console.log('gGame.shownCount', gGame.shownCount);
    // console.log('gGame.markedCount', gGame.markedCount);
    // console.log('gMineCount', gMineCount);

    if (cellMarked === cellMainCount && cellShownCount === (cellCount - cellMainCount)) {
        console.log('hi')
        isWin = true
    }
    checkGameOver()
    clearInterval(gTimeInterval);
}

///hint - DONT WORK :(
function hint(elCell, i, j) {
    for (let i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var elCell = gBoard[i][j];
            elCell.isShown = !elCell.isShown;
        }
    }
    var countNegs = setMinesNegsCoun();
    renderCell({ i, j }, countNegs)
}

// function hint() {
// 	if (gHints > 0) {
// 		var rendLocation = getEmptyLocation();
// 		var currCell = gBoard[rendLocation.i][rendLocation.j];
// 		while (currCell.isShown || currCell.isMarked) {
// 			rendLocation = getEmptyLocation();
// 			currCell = gBoard[rendLocation.i][rendLocation.j];
// 		}

// 	}
// }


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
    // console.log('strHTML', strHTML)
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

    document.querySelector('.player-live').innerText = 'Life Remainig: ❤️❤️❤️ ▪️';
    var elSmile = document.querySelector('.smail-icon');
    elSmile.innerText = START_SMAILE;
    document.querySelector('.player-status').innerText = '';

    gFistClick = false
    clearInterval(gTimeInterval)
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
    return board
}

// function renderLives() {
//     var elPlayerlive = document.querySelector('.player-live');
//     elPlayerlive = '';
//     for (var i = 0; i < gLive; i++) {
//         elPlayerlive.innerHTML += LIFE
//     }
// }

