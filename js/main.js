	/*----- constants -----*/
const easyMode = {
	gridWidth: 9, 
	gridHeight: 9, 
	bombNumber: 10
}; 

const mediumMode = {
	gridWidth: 16, 
	gridHeight: 16, 
	bombNumber: 40
}; 

const hardMode = {
	gridWidth: 30, 
	gridHeight: 16, 
	bombNumber: 99
};
	/*----- state variables -----*/
let winner, bombCounter, timer ; 
const board; 

	/*----- cached elements  -----*/
const diffSelectorEl = document.querySelector("#difficulty-selector");
const boardEl = document.querySelector("#grid"); 


	/*----- event listeners -----*/
diffSelectorEl.addEventListener("click", handleDifficultyClick);

	/*----- functions -----*/
function handleDifficultyClick(evt) {
	if (evt.target.id === "easy") {
		gameStart("easy");
	} else if (evt.target.id === "medium") {
		gameStart("medium");
	} else if (evt.target.id === "hard") {
		gameStart("hard");
	}
}

// later: change css for top bar elements to start hidden before changing the ~.style.display to the properties outlined in the current css file 
function gameStart(difficulty) {
	diffSelectorEl.style.display = "none";
	boardEl.style.display = "grid";
	buildArr(`${difficulty}Mode.gridWidth`, `${difficulty}Mode.gridHeight`);
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
	};
	const arrColumns = []; 
	for (i = 0; i < y; i++) {
		arrColumns.push(arrRows)
	}
};

class cellObject {
	constructor() {
		this.hasBomb: null, 
		this.numOfNearBombs: null,
		this.isFlipped: false, 
		this.isFlagged: null 
	}
}


// class MinesweeperGame {
// 	constructor (difficulty) {

// 	}
// }