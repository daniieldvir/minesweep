'use strict'

// negs count
function setMinesNegsCoun(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMine) count++;
        }
    }
    return count;
}


function getRandomInt(min, max) {
    var randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
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
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


function timer(startTime) {
    var elTimerSpan = document.querySelector('.timer span')
    gInterval = setInterval(() => {
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


// window.addEventListener('contextmenu', e => {
//     e.preventDefault();
//     console.log(e.button)
// })




