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
let winner, bombCounter, timer ; 
const boardArr = []; 

	/*----- cached elements  -----*/
const diffSelectorEl = document.querySelector("#difficulty-selector");
const boardEl = document.querySelector("#grid"); 


	/*----- event listeners -----*/
diffSelectorEl.addEventListener("click", handleDifficultyClick);

	/*----- functions -----*/
init() 

function init() {
	board = [] 
	boardEl.innerHTML = ""
	winner = false 
	bombCounter = 0 
	timer = 0 
	// renderDifficultySelection()
}

// function renderDifficultySelection() {
// 	boardEl.style.display = "none"
// 	diffSelectorEl.style.display = "flex"
// }

function handleDifficultyClick(evt) {
	if (evt.target.id === "easy") {
		renderGameStart(0);
	} else if (evt.target.id === "medium") {
		renderGameStart(1);
	} else if (evt.target.id === "hard") {
		renderGameStart(2);
	}
}

// later: change css for top bar elements to start hidden before changing the ~.style.display to the properties outlined in the current css file 
function renderGameStart(difficulty) {
	diffSelectorEl.style.display = "none";
	boardEl.style.display = "grid";
	console.log(difficultyMode[difficulty].gridWidth)
	buildArr(difficultyMode[difficulty].gridWidth, difficultyMode[difficulty].gridHeight);
	renderCells(difficultyMode[difficulty].gridWidth, difficultyMode[difficulty].gridHeight);

	// board = new MinesweeperGame(difficulty) 
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
		arrRows.push(new cellObject);
		// arrRows.push("1");
	}; 
	for (i = 0; i < y; i++) {
		boardArr.push(arrRows)
	}
	return boardArr; 
};

class cellObject {
	constructor() {
		this.hasBomb = null, 
		this.numOfNearBombs = null,
		this.isFlipped = false, 
		this.isFlagged = false 
	}
}

function renderCells ( gridWidth, gridHeight ) {
	for (i = 0; i < gridWidth ; i ++){
		for (e = 0; i < gridHeight; e ++) {
			const cellEl = document.createElement("div")
			cellEl.setAttribute("id", `r${i}c${e}`)
			boardEl.appendChild(cellEl)
		}
	}
}

function getLoser() {			// check if player clicked on bomb 

}

// class MinesweeperGame {
// 	constructor (difficulty) {

// 	}
// }