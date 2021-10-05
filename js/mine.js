'use strict'

const MINE = '💣';
const EMPTY = ' ';
const LIFE = '❤️';


var gLive = 3;
var gInterval;
var gMineCount = 2;
var gEmptyCellPos = [];
var gFistClick = false;


//for time function
var isTimmerOn = false
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;


function cellMarked(elCell, event) {
    var cellMarked = gBoard[i][j];  

}


function cellClicked(elCell, i, j, event) {
    var cellClick = gBoard[i][j];
    

    if (!isTimmerOn) {
        timer(Date.now())
        isTimmerOn = !isTimmerOn;
    }

    if (!gFistClick) {
        setMainOnBoard(gBoard, gMineCount);
        gFistClick = true;
    }

    if (!cellClick.isShown) {
        gBoard[i][j].isShown = true;

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

            gameOver();
        }
    }
}

/// set the main
function setMainOnBoard(gBoard, mineCount) {
    for (var i = 0; i < mineCount; i++) {
        var minePos = getEmptyLocation();
        gBoard[minePos.i][minePos.j].isMine = !gBoard[minePos.i][minePos.j].isMine;
    }
}

/// gamr over for [layer]
function gameOver() {
    if (gLive === 0) {
        document.querySelector('.playerLive').innerText = 'Life Remainig: ';
        document.querySelector('.restartGame').innerText = '🤯';
        var gamerStatus = 'Try Again!';
        document.querySelector('.player-status').innerText = gamerStatus;
        clearInterval(gInterval);
    }
}

/// smaily reset btn
function restartGame() {
    initGame();
    document.querySelector('.playerLive').innerText = 'Life Remainig: ❤️❤️❤️';
    document.querySelector('.player-status').innerText = '';
    clearInterval(gInterval);
}

// right click btn

// function rightclick() {
//     var rightclick;
//     var e = window.event;
//     if (e.which) rightclick = (e.which == 3);
//     else if (e.button) rightclick = (e.button == 2);
//     alert(rightclick); // true or false, you can trap right click here by if comparison
// }


// document.body.onclick = function (e) {
//     var isRightMB;
//     e = e || window.event;

//     if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
//         isRightMB = e.which == 3; 
//     else if ("button" in e)  // IE, Opera 
//         isRightMB = e.button == 2;  

//     alert("Right mouse button " + (isRightMB ? "" : " was not") + "clicked!");
// } 



