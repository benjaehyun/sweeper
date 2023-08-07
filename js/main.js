	/*----- constants -----*/
const difficultyMode = [{
	gridWidth: 9, 
	gridHeight: 9, 
	bombNumber: 10
	}, 
 	{
	gridWidth: 16, 
	gridHeight: 16, 
	bombNumber: 40
	},
	{
	gridWidth: 30, 
	gridHeight: 16, 
	bombNumber: 99
	}]
	/*----- state variables -----*/
let winner, bombCounter, timer, difficulty, height, width; 
const boardArr = []; 

	/*----- cached elements  -----*/
const diffSelectorEl = document.querySelector("#difficulty-selector");
const boardEl = document.querySelector("#grid"); 


	/*----- event listeners -----*/
diffSelectorEl.addEventListener("click", handleDifficultyClick);
boardEl.addEventListener("click", handleBoardClick)

	/*----- functions -----*/
init() 

function init() {
	boardEl.innerHTML = ""
	winner = false 
	bombCounter = 0 
	timer = 0 
	renderDifficultySelection()
}

function renderDifficultySelection() {
	boardEl.style.display = "none"
	diffSelectorEl.style.display = "flex"
}

function handleDifficultyClick(evt) {
	if (evt.target.id === "easy") {
		renderGameStart(0);
		return difficulty = 0;
	} else if (evt.target.id === "medium") {
		renderGameStart(1);
		return difficulty = 1;
	} else if (evt.target.id === "hard") {
		renderGameStart(2);
		return difficulty = 2;
	}
}

function handleBoardClick(evt) {
	const gridEls = [...document.querySelectorAll('#grid>div')]
	const colIdx = ( gridEls.indexOf(evt.target) % difficultyMode[difficulty].gridWidth )
	const rowIdx = Math.floor( gridEls.indexOf(evt.target) / difficultyMode[difficulty].gridHeight)
	placeRandomBomb(difficultyMode[difficulty].bombNumber, rowIdx, colIdx); 
	console.log(colIdx, rowIdx)
}

// later: change css for top bar elements to start hidden before changing the ~.style.display to the properties outlined in the current css file 
function renderGameStart(difficulty) {
	diffSelectorEl.style.display = "none";
	boardEl.style.display = "grid";
	console.log(difficultyMode[difficulty].gridWidth)
	const width = difficultyMode[difficulty].gridWidth
	const height = difficultyMode[difficulty].gridHeight
	buildArr(width, height);
	renderCells(height, width);
}

// if u add some of the features from the pseudocode, will probably have to make and fill the game properties (width, height, bombNumber) dynamically
// const arr1 = []
// for (i=0; i<5; i++) {
//     arr1.push(new newArr)
// }
// const arr2 = []
// for (i=0; i < 4; i++) {
//     arr2.push(arr1)
// }
// console.log(arr2)
function buildArr (x, y) {
	const arrRows = []; 
	for (i = 0; i < x ; i++) {
		arrRows.push(new CellObject);
		// arrRows.push("1");
	}; 
	for (i = 0; i < y; i++) {
		boardArr.push(arrRows)
	}
	return boardArr; 
};

class CellObject {
	constructor() {
		this.hasBomb = null, 
		this.numOfNearBombs = null,
		this.isFlipped = false, 
		this.isFlagged = false 
	}
}

function renderCells (height, width) {
	for (let i = 0; i < height; i ++) {
		for (let e = 0; e < width; e ++) {
			const cellEl = document.createElement("div")
			cellEl.setAttribute("id", `r${i}c${e}`)
			cellEl.innerText = "1"
			cellEl.style.border = "solid"
			cellEl.style.display = "flex"
			cellEl.style.justifyContent = "center"
			cellEl.style.alignItems = "center"
			boardEl.appendChild(cellEl)
			
		}
	}
	boardEl.style.gridTemplateColumns = `repeat(${width}, 1fr)`
	boardEl.style.gridTemplateRows = `repeat(${height}, 1fr)`
}

function placeRandomBomb(bombNumber, rowIdx, colIdx) {
	let i = 0 
	while (i < bombNumber) {
		let bombRow = randomRow(rowIdx); 
		let bombCol = randomCol(colIdx); 
		if (boardArr[bombCol][bombRow].hasBomb = false) {
			boardArr[bombCol][bombRow].hasBomb = true; 
			i ++
		}
	}

	/* i dont think that you can use a for loop because there are edge cases where it can produce the same cell location*/
	// for (let i = 0; i < bombNumber; i++) {
	// 	boardArr[randomRow(rowIdx)][randomCol(colIdx)].hasBomb = true; 
	// 	// randomRow(rowIdx)
	// 	console.log(randomRow(rowIdx), randomCol(colIdx))
	// }
	
}

function randomRow(rowIdx) {
	let randRow = null; 
	while (randRow === null || randRow === rowIdx) {
		randRow = Math.round(Math.random() * (difficultyMode[difficulty].gridWidth - 1) ) 
		return randRow; 
	}
}
function randomCol(colIdx) {
	let randCol = null; 
	while (randCol === null || randCol === colIdx) {
		randCol = Math.round(Math.random() * (difficultyMode[difficulty].gridHeight - 1) ) 
		return randCol; 
	}
}

function getLoser() {			// check if player clicked on bomb 

}

// class MinesweeperGame {
// 	constructor (difficulty) {

// 	}
// }