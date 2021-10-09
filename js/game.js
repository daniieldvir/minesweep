'use strict'

var gTimeInterval;
var gMineCount = 2;
var gMarkedCount = 0;
var gEmptyCellPos = [];
var gFistClick = false;
var isWin = false;


/// set the main
function setMainOnBoard(gBoard, mineCount) {
    for (var i = 0; i < mineCount; i++) {
        var minePos = getEmptyLocation();

        /// MODEL
        gBoard[minePos.i][minePos.j].isMine = !gBoard[minePos.i][minePos.j].isMine;
    }
}

/// btn right clcik
function cellMarkedel(elCell, i, j) {
    var cellClick = gBoard[i][j];
    // console.log(elCell)

    if (!cellClick.isMarked) renderCell({ i, j }, FLAG);
    else renderCell({ i, j }, EMPTY);

    /// MODEL
    cellClick.isMarked = !gBoard[i][j].isMarked
    elCell.classList.add('marked');
    elCell.style.backgroundColor = 'rgb(144, 238, 144)';

}

/// btn left click
function cellClicked(elCell, i, j, event) {
    var currCell = gBoard[i][j];

    if (!isTimmerOn) {
        timer(Date.now())
        /// MODEL
        isTimmerOn = !isTimmerOn;
    }

    if (!gFistClick) {
        setMainOnBoard(gBoard, gMineCount);
        setMinesNegsCoun()
        gFistClick = true;
        console.log('gFistClick', gFistClick)
    }

    if (event.button === 2) {
        cellMarkedel(elCell, i, j);
        gGame.isMarked = true
        gMarkedCount++;

        // MODEL
        gGame.markedCount = gMarkedCount
        return;
    }

    if (!currCell.isShown) {
        gBoard[i][j].isShown = true
        // gBoard[i][j].isShown = !gBoard[i][j].isShown
        currCell.isShown = gBoard[i][j].isShown
        currCell.isShown = gGame.shownCount

        // console.log('currCell', currCell)
        // console.log('currCell.isShown', currCell.isShown)
        // console.log('gGame.shownCount', gGame.shownCount)

        if (currCell.isMine) {
            /// DOM - VISUAL FOR GAMER
            renderCell({ i, j }, MINE);
            gMineCount++;

            gLive--;

            if (gLive === 2) document.querySelector('.player-live').innerText = 'Life Remainig: ❤️❤️ ▪️';
            if (gLive === 1) document.querySelector('.player-live').innerText = 'Life Remainig: ❤️ ▪️';
            if (gLive === 0) document.querySelector('.player-live').innerText = 'Life Remainig:  ▪️';

            checkGameOver(isWin);
            return;
        }

        /// DOM - VISUAL FOR GAMER
        if (gBoard[i][j].minesAroundCount === 0) {
            renderCell({ i, j }, EMPTY);
            openBoard(i, j)
            return;
        }

        if (gBoard[i][j].minesAroundCount > 0) {
            renderCell({ i, j }, gBoard[i][j].minesAroundCount);
            return;
        }
    }
}

function checkGameOver() {
    isWin = false;
    gGame.isOn = false;

    if (gLive === 0) {
        openPopUp()
        document.querySelector('.player-live').innerText = 'Life Remainig:  ▪️';
        var elSmile = document.querySelector('.smail-icon');
        elSmile.innerText = LOSE_SMAILE;
        gGame.isOn = false;
        openPopUp()

        setTimeout(function () {
            restartGame()
        }, 2000)

        clearInterval(gTimeInterval)
    }
    if (isWin) {
        openPopUp()
        var elSmile = document.querySelector('.smail-icon');
        elSmile.innerText = WIN_SMAILE;
        clearInterval(gTimeInterval)
    }
}

/// smaily reset btn
function restartGame() {
    initGame();
    gMineCount = 2;
    gFistClick = false;
    clearInterval(gTimeInterval);
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    totalSeconds = 0;

    document.querySelector('.player-live').innerText = 'Life Remainig: ❤️❤️❤️ ▪️';
    document.querySelector('.player-status').innerText = '';
    var elSmile = document.querySelector('.smail-icon');
    elSmile.innerText = START_SMAILE;
}

/// popUp game status win or lose
function openPopUp() {
    var statusTxt = (isWin) ? 'Good Jub' : 'Game Over!'
    var elpopUp = document.querySelector('.pop-up');
    elpopUp.style.display = 'block'
    document.querySelector('.pop-up').innerText = statusTxt ;

    setTimeout(function () {
        closePopUp()
    }, 2000)
}

function closePopUp() {
    var elpopUp = document.querySelector('.pop-up')
    elpopUp.style.display = 'none'
}
