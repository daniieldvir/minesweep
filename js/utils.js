'use strict'

function getRandomInt(min, max) {
    var randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
}

function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}