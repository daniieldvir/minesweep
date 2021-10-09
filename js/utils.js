'use strict'

// negs count
function setMinesNegsCoun() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            count = minesNegsCoun(gBoard, i, j);
            gBoard[i][j].minesAroundCount = count;
        }
    }
    return
}

function minesNegsCoun(board, rowIdx, colIdx) {
    var count = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMine) count++;
        }
    }
    return count
}

function openBoard(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {

        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            
            if (!gBoard[i][j].isMine && !gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
                gBoard[i][j].isShown = !gBoard[i][j].isShown;
                
                gGame.shownCount++;
                
                // console.log('gBoard[i][j].isShown', gBoard[i][j].isShown)
                // console.log('gGame.shownCount', gGame.shownCount)

                var negsPos = { i, j };
                var minesAroundCount = gBoard[i][j].minesAroundCount;
                var cellNum = minesAroundCount > 0 ? minesAroundCount : EMPTY;
                renderCell(negsPos, cellNum)

                if (cellNum === EMPTY) {
                    openBoard(negsPos.i, negsPos.j)
                }
            }
        }
    }
}

function getEmptyLocation() {
    var emptyLocations = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isMine) emptyLocations.push({ i: i, j: j });
        }
    }
    if (!emptyLocations.length) return null;
    return emptyLocations[getRandomIntInclusive(0, emptyLocations.length - 1)];
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    // console.log('elCell', elCell)
    elCell.style.backgroundColor = 'rgb(255, 160, 122)';
    elCell.innerHTML = value;
}

function timer(startTime) {
    var elTimerSpan = document.querySelector('.timer span')
    gTimeInterval = setInterval(() => {
        var totalSecs = Math.floor((Date.now() - startTime) / 1000);
        var hour = Math.floor(totalSecs / 3600);
        var minute = Math.floor((totalSecs - hour * 3600) / 60);
        var seconds = totalSecs - (hour * 3600 + minute * 60);
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        if (seconds < 10) seconds = '0' + seconds;
        elTimerSpan.innerHTML = `${hour}:${minute}:${seconds}`;
    }, 1000);
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}







