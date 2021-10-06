'use strict'

const MINE = '💣';
const EMPTY = ' ';
const LIFE = '❤️';
const FLAG = '📍'


var gLive = 3;
var gInterval;
var gMineCount = 2;
var gEmptyCellPos = [];
var gFistClick = false;
//var lifes = ['❤️','❤️','❤️']


//for time function
var isTimmerOn = false
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;


/// set the main
function setMainOnBoard(gBoard, mineCount) {
    for (var i = 0; i < mineCount; i++) {
        var minePos = getEmptyLocation();
        gBoard[minePos.i][minePos.j].isMine = !gBoard[minePos.i][minePos.j].isMine;
    }
}


function cellMarkedel(i, j) {
    var cellClick = gBoard[i][j];

    if (!cellClick.isMarked) renderCell({ i, j }, FLAG);
    else renderCell({ i, j }, EMPTY);
    cellClick.isMarked = !gBoard[i][j].isMarked
}


function cellClicked(elCell, i, j, event) {


    
    console.log(event)
    var cellClick = gBoard[i][j];
    console.log('cellClick1', cellClick)
    
    if (!isTimmerOn) {
        timer(Date.now())
        isTimmerOn = !isTimmerOn;
    }
    
    if (!gFistClick) {
        setMainOnBoard(gBoard, gMineCount);
        gFistClick = true;
    }
    
    if (event.button === 2) {
        cellMarkedel(i, j);
        console.log('cellClick3', cellClick)
        return;
    }

    if (!cellClick.isShown) {
        // gBoard[i][j].isShown = true;
        cellClick.isShown = !gBoard[i][j].isShown

        console.log('cellClick2', cellClick)

        var countNegs = setMinesNegsCoun(gBoard, i, j);
        /// MODEL

        gBoard[i][j].minesAroundCount = countNegs;
        //console.log('countNegs', countNegs)

        /// DOM - VISUAL FOR GAMER
        renderCell({ i, j }, countNegs);

        if (cellClick.isMine) {
            renderCell({ i, j }, MINE);
            gMineCount++;
            gLive--;

            if (gLive === 2) document.querySelector('.playerLive').innerText = 'Life Remainig: ❤️❤️';
            if (gLive === 1) document.querySelector('.playerLive').innerText = 'Life Remainig: ❤️';
            if (gLive === 0) document.querySelector('.playerLive').innerText = 'Life Remainig: ';

            winOrLose();
        }
    }
}


/// gamr over for [layer]
function winOrLose() {
    if (gLive === 0) {
        document.querySelector('.playerLive').innerText = 'Life Remainig: ';
        document.querySelector('.restartGame').innerText = '🤯';
        var gamerStatus = 'Try Again!';
        document.querySelector('.player-status').innerText = gamerStatus;
        clearInterval(gInterval);
    }
    else {
        if (gLive > 0 && gBoard.isShown && !gBoard.isMine) {
            document.querySelector('.player-status').innerText = gamerStatus;
            clearInterval(gInterval);
        }
    }
}


/// smaily reset btn
function restartGame() {
    initGame();
    gMineCount = 2;
    document.querySelector('.playerLive').innerText = 'Life Remainig: ❤️❤️❤️';
    document.querySelector('.player-status').innerText = '';
    clearInterval(gInterval);
}
