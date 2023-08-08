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
let winner, bombCounter, timer, difficulty, firstClick, height, width; 
const boardArr = []; 


	/*----- cached elements  -----*/
const diffSelectorEl = document.querySelector("#difficulty-selector");
const boardEl = document.querySelector("#grid"); 
const bombCounterEl = document.querySelector("#bomb-counter")


	/*----- event listeners -----*/
diffSelectorEl.addEventListener("click", handleDifficultyClick);
boardEl.addEventListener("click", handleBoardClick)
boardEl.addEventListener("contextmenu", handleRightClick)
// boardEl.on('mouseup', handleMiddleClick)
// boardEl.addEventListener("wheel", (event) => {console.log('scrollwheel clicked')});

	/*----- functions -----*/
init() 

function init() {
	boardEl.innerHTML = ""
	winner = false 
	bombCounter = 0 
	timer = 0 
	firstClick = true; 
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
	if (evt.button === 0 ) {
		const gridEls = [...document.querySelectorAll('#grid>div')]
		const colIdx = ( gridEls.indexOf(evt.target) % difficultyMode[difficulty].gridWidth )
		const rowIdx = Math.floor( gridEls.indexOf(evt.target) / difficultyMode[difficulty].gridHeight)
		if (firstClick === true) {
			bombCounterEl.innerText = difficultyMode[difficulty].bombNumber; 
			placeRandomBomb(difficultyMode[difficulty].bombNumber, rowIdx, colIdx); 
			calculateNearBombs(); 
			renderCellContent(colIdx, rowIdx);
			floodFillAll(colIdx, rowIdx)
			// floodFillUp(colIdx, rowIdx)
			// floodFillDown (colIdx, rowIdx)
			// floodFillLeft (colIdx, rowIdx)
			// floodFillRight (colIdx, rowIdx)
			// floodFillTopLeft (colIdx, rowIdx)
			// floodFillTopRight (colIdx, rowIdx)
			// floodFillBottomLeft (colIdx, rowIdx)
			// floodFillBottomRight (colIdx, rowIdx)
			// still need to implement the flood fill algorithm
		} else {
			renderCellContent(colIdx, rowIdx);
			console.log(colIdx, rowIdx)
			// all of the other clicks to play the game 
		}
	// console.log(colIdx, rowIdx, difficultyMode[difficulty].bombNumber)
	} else if (evt.button === 4) {  /* still not working */
		console.log("middlemouseclick")
	}
}

function handleRightClick(evt) {  /* STILL NEED TO MAKE THIS A TOGGLE */
	evt.preventDefault() 
	if (firstClick === false) {
		const gridEls = [...document.querySelectorAll('#grid>div')]
		const colIdx = ( gridEls.indexOf(evt.target) % difficultyMode[difficulty].gridWidth )
		const rowIdx = Math.floor( gridEls.indexOf(evt.target) / difficultyMode[difficulty].gridHeight)
		if (!boardArr[colIdx][rowIdx].isFlipped) {
			boardArr[colIdx][rowIdx].isFlagged = !boardArr[colIdx][rowIdx].isFlagged 
			if (boardArr[colIdx][rowIdx].isFlagged) {
				document.getElementById(`c${rowIdx}r${colIdx}`).innerText = "🚩"
			}
			if (boardArr[colIdx][rowIdx].isFlagged === false) {
				document.getElementById(`c${rowIdx}r${colIdx}`).innerText = ""
			}
		}
	} 
	bombCounterCalculation()
}

function handleMiddleClick (evt) {  /* still not working */
	// evt.preventDefault() 
	console.log("middle mouse click")
}

// later: change css for top bar elements to start hidden before changing the ~.style.display to the properties outlined in the current css file 
function renderGameStart(difficulty) {
	diffSelectorEl.style.display = "none";
	boardEl.style.display = "grid";
	console.log(difficultyMode[difficulty].gridWidth)
	console.log(difficultyMode[difficulty].bombNumber)
	const width = difficultyMode[difficulty].gridWidth
	const height = difficultyMode[difficulty].gridHeight
	buildArr(width, height);
	renderCells(height, width);
}

function renderCellContent (i, j) {
	boardArr[i][j].isFlipped = true; 
	if (boardArr[i][j].hasBomb === true) {
		document.getElementById(`c${j}r${i}`).innerText = "💣"
	} 
	// if (boardArr[i][j].numOfNearBombs === 0) {
	// 	document.getElementById(`c${j}r${i}`).innerText = ""
	// } 
	else {
		document.getElementById(`c${j}r${i}`).innerHTML = `<strong>${boardArr[i][j].numOfNearBombs}</strong>`
	}
}

function renderAllCellsContent () {
	for (let i = 0; i < difficultyMode[difficulty].gridHeight; i++) {
		for (let j = 0; j < difficultyMode[difficulty].gridWidth; j++) {
			if (boardArr[i][j].hasBomb === true) {
				document.getElementById(`c${i}r${j}`).innerText = "💣"
			} else {
				document.getElementById(`c${i}r${j}`).innerHTML = `<strong>${boardArr[i][j].numOfNearBombs}</strong>`
			}
		}
	}
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
	for(let i = 0; i < x; i++){
		const row = []
		for(let j = 0; j < y; j++) {
		  row.push(new CellObject())
		}
		boardArr.push(row)
	  }
	// const arrRows = []; 
	// for (i = 0; i < x ; i++) {
	// 	arrRows.push(new CellObject);
	// 	// arrRows.push("1");
	// }; 
	// for (i = 0; i < y; i++) {
	// 	boardArr.push(arrRows)
	// }
};

class CellObject {
	constructor() {
		this.hasBomb = false, 
		this.numOfNearBombs = 0,
		this.isFlipped = false, 
		this.isFlagged = false,
		this.flagCounter = 0
	}
}

function bombCounterCalculation() {
	let bombCounter = difficultyMode[difficulty].bombNumber
	let counter = 0 
	boardArr.forEach(function(array) {
		array.forEach(function(element) {
			if (element.isFlagged === true) {
				counter ++
			}
		})
	} )
	bombCounter = bombCounter - counter 
	bombCounterEl.innerText = bombCounter
}

function renderCells (height, width) {
	for (let i = 0; i < height; i ++) {
		for (let e = 0; e < width; e ++) {
			const cellEl = document.createElement("div") /* changed from div to button*/ 
			cellEl.setAttribute("id", `c${i}r${e}`)
			cellEl.innerText = ""
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
	let i = 0;  
	while (i < bombNumber) {
		let bombRow = randomRow(rowIdx); 
		let bombCol = randomCol(colIdx); 
		if (boardArr[bombCol][bombRow].hasBomb === false) {
			boardArr[bombCol][bombRow].hasBomb = true; 
			boardArr[bombCol][bombRow].numOfNearBombs = null; 
			i++; 
		} 
	}	
	// calculateNearBombs()
}

function calculateNearBombs() {
	for (let i = 0; i < difficultyMode[difficulty].gridHeight; i++) {
		for (let j = 0; j < difficultyMode[difficulty].gridWidth; j++) {
			let count = 0 
			count = checkAbove(count, i, j) 
			count = checkBelow(count, i, j)
			count = checkSides(count, i, j)
			boardArr[i][j].numOfNearBombs = count 
		}
	}
}

function randomRow(rowIdx) {
	let randRow = null; 
	// while (randRow === null || randRow === rowIdx || randRow === (rowIdx + 2) || randRow === (rowIdx - 2)) {		trying to force a 0 bomb count for the starting square 
	while (randRow === null || randRow === rowIdx ) {
		randRow = Math.round(Math.random() * (difficultyMode[difficulty].gridWidth - 1) ) 
	}
	return randRow; 
}
function randomCol(colIdx) {
	let randCol = null; 
	// while (randCol === null || randCol === colIdx || randCol === (colIdx + 2) || randCol === (colIdx - 2)) {		trying to force a 0 bomb count for the starting square 
	while (randCol === null || randCol === colIdx ) {
		randCol = Math.round(Math.random() * (difficultyMode[difficulty].gridHeight - 1) ) 
	}
	return randCol; 
}

function checkAbove(count, i, j) {
	if (j !== 0) {		/* if cell is on top row */
		if (i === 0) {		/* if cell is on the far left */
			if (boardArr[i][j-1].hasBomb === true) count ++		
			if (boardArr[i+1][j-1].hasBomb === true) count ++		
		} else if (i === (difficultyMode[difficulty].gridWidth - 1)) {		/* if cell is on far right */
			if (boardArr[i][j-1].hasBomb === true) count ++	
			if (boardArr[i-1][j-1].hasBomb === true) count ++	
		} else {
			if (boardArr[i-1][j-1].hasBomb === true) count ++	
			if (boardArr[i][j-1].hasBomb === true) count ++	
			if (boardArr[i+1][j-1].hasBomb === true) count ++	
		}
	}
	return count
}

function checkBelow(count, i, j) {
	if (j !== (difficultyMode[difficulty].gridHeight - 1)) {		/* if cell is on bottom row */
		if (i === 0) {		/* if cell is on the far left */
			if (boardArr[i][j+1].hasBomb === true) count ++
			if (boardArr[i+1][j+1].hasBomb === true) count ++ 
		} else if (i === (difficultyMode[difficulty].gridWidth - 1)) {		/* if cell is on far right */
			if (boardArr[i][j+1].hasBomb === true) count ++ 
			if (boardArr[i-1][j+1].hasBomb === true) count ++ 		
		} else {
			if (boardArr[i-1][j+1].hasBomb === true) count ++ 		
			if (boardArr[i][j+1].hasBomb === true) count ++ 		
			if (boardArr[i+1][j+1].hasBomb === true) count ++ 		
		}
	}
	return count 
}

function checkSides(count, i, j) {
	if (i === 0) {		/* if cell is on the far left */
		if (boardArr[i+1][j].hasBomb === true)  count ++ 
	} if (i === (difficultyMode[difficulty].gridWidth - 1)) {		/* if cell is on far right */
		if (boardArr[i-1][j].hasBomb === true)  count ++ 	
	} if (i !== 0 && i !== (difficultyMode[difficulty].gridWidth - 1)) {	
		if (boardArr[i-1][j].hasBomb === true) count ++ 		
		if (boardArr[i+1][j].hasBomb === true)  count ++ 		
	}

	return count 
}

function getLoser() {			// check if player clicked on bomb 

}

function floodFillAll (i,j) {
	if (firstClick === true){
		clearAbove(i,j)
		clearBelow(i,j)
		clearRight(i,j)
		clearLeft(i,j)
		clearTopLeft(i,j)
		clearTopRight(i,j)
		clearBottomLeft(i,j)
		clearBottomRight(i,j)
		firstClick = false; 
	}
	if(boardArr[i] && boardArr[i][j]) {
		if (boardArr[i][j].isFlipped === false){
			clearAbove(i,j)
			clearBelow(i,j)
			clearRight(i,j)
			clearLeft(i,j)
			clearTopLeft(i,j)
			clearTopRight(i,j)
			clearBottomLeft(i,j)
			clearBottomRight(i,j)
		}
	} else return

}


function floodFillUp (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearAbove(i,j)
		return floodFillUp(i, j-1)
	}
}
function floodFillDown (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearBelow(i,j)
		return floodFillDown(i, j+1)
	}
}
function floodFillRight (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearRight(i,j)
		return floodFillRight(i+1, j)
	}
}
function floodFillLeft (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearLeft(i,j)
		return floodFillLeft(i-1, j)
	}
}
function floodFillTopLeft (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearTopLeft(i,j)
		return floodFillTopLeft(i-1, j-1)
	}
}
function floodFillTopRight (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearLeft(i,j)
		return floodFillTopRight(i+1, j-1)
	}
}
function floodFillBottomLeft (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearLeft(i,j)
		return floodFillBottomLeft(i-1, j+1)
	}
}
function floodFillBottomRight (i, j) {
	if (boardArr[i] && boardArr[i][j]){
		clearLeft(i,j)
		return floodFillBottomRight(i+1, j+1)
	}
}


// function floodFill (i, j) {
// 	if (i > (difficultyMode[difficulty].gridWidth - 1) || i < 0) {
// 		return
// 	}
// 	if (j > (difficultyMode[difficulty].gridHeight - 1) || j < 0) {
// 		return
// 	}
// 	if (boardArr[i][j].hasBomb === false) {
// 		renderCellContent(i,j)
// 		floodFill (i, j + 1)
// 		floodFill (i, j - 1)
// 		floodFill (i + 1, j)
// 		floodFill (i - 1, j)
// 		// if (i !== (difficultyMode[difficulty].gridHeight - 1)) {
// 		// 	floodFill (i + 1, j)
// 		// }
// 		// if (i > 0) {
// 		// 	floodFill (i - 1, j)
// 		// }
// 		// if (j !== (difficultyMode[difficulty].gridWidth - 1)) {
// 		// 	floodFill (i, j + 1)
// 		// }
// 		// if (j > 0) {
// 		// 	floodFill (i, j - 1)
// 		// }
// 	} else {return}
// } 

// recursive strategy 
//  employ same check logic as above looking for a bomb 
// guard against edge to determine which cells are available to be checked 
	// THEN start branching statements checking for a bomb in the available cells 
		// under those branching statements reveal the OTHER non-bomb containing, available cells 
// do this in each direction 
// probably define all of this as a HELPER RECURSIVE function that is called in the nonrecursive parent function 
// question is to pass what function into what, starting from that first click square 

// function clearAbove(i, j) {
// 	if (j !== 0) {		/* if cell is on top row */
// 		if (i === 0) {		/* if cell is on the far left */
// 			if (boardArr[i][j-1].hasBomb === false) {
// 				renderCellContent(i, j-1)				
// 			}	
// 			if (boardArr[i+1][j-1].hasBomb === false) {
// 				renderCellContent(i+1, j-1)		
// 			}		
// 		} if (i === (difficultyMode[difficulty].gridWidth - 1)) {		/* if cell is on far right */
// 			if (boardArr[i-1][j-1].hasBomb === false) {
// 				renderCellContent(i-1, j-1)
// 			}	
// 			if (boardArr[i][j-1].hasBomb === false) {
// 				renderCellContent(i, j-1)				
// 			}	
// 		} else {
// 			if (boardArr[i-1][j-1].hasBomb === false) {
// 				renderCellContent(i-1, j-1)
// 			}	
// 			if (boardArr[i][j-1].hasBomb === false) {
// 				renderCellContent(i, j-1)				
// 			}	
// 			if (boardArr[i+1][j-1].hasBomb === false) {
// 				renderCellContent(i+1, j-1)		
// 			}	
// 		}
// 	}
// 	return 
// }

// function clearBelow(i, j) {
// 	if (j !== (difficultyMode[difficulty].gridHeight - 1)) {		/* if cell is on bottom row */
// 		if (i === 0) {		/* if cell is on the far left */
// 			if (boardArr[i][j+1].hasBomb === false) {
// 				renderCellContent(i, j+1)				
// 			}	
// 			if (boardArr[i+1][j+1].hasBomb === false) {
// 				renderCellContent(i+1, j+1)		
// 			}	
// 		} if (i === (difficultyMode[difficulty].gridWidth - 1)) {		/* if cell is on far right */
// 			if (boardArr[i-1][j+1].hasBomb === false) {
// 				renderCellContent(i-1, j+1)
// 			}	
// 			if (boardArr[i][j+1].hasBomb === false) {
// 				renderCellContent(i, j+1)				
// 			}
// 		} else {
// 			if (boardArr[i-1][j+1].hasBomb === false) {
// 				renderCellContent(i-1, j+1)
// 			}	
// 			if (boardArr[i][j+1].hasBomb === false) {
// 				renderCellContent(i, j+1)				
// 			}	
// 			if (boardArr[i+1][j+1].hasBomb === false) {
// 				renderCellContent(i+1, j+1)		
// 			}	
// 		}
// 	}
// 	return  
// }
function clearAbove(i, j) {
	if (boardArr[i] && boardArr[i][j-1] && boardArr[i][j-1].isFlipped === false) {		/* if cell is on top row */	
		if (boardArr[i][j-1].hasBomb === false) {
			renderCellContent(i, j-1)	
			return floodFillAll (i,j-1)			
		}
	} return 
}

function clearBelow(i, j) {
	if (boardArr[i] && boardArr[i][j+1] && boardArr[i][j+1].isFlipped === false) {		/* if cell is on bottom row */
		if (boardArr[i][j+1].hasBomb === false) {
			renderCellContent(i, j+1)	
			return floodFillAll (i,j+1)				
		}
	} return  
}

function clearTopRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j-1] && boardArr[i+1][j-1].isFlipped === false) {		/* if cell is on top right */
		if (boardArr[i+1][j-1].hasBomb === false) {
			renderCellContent(i+1, j-1)	
			return floodFillAll (i+1,j-1)				
		}
	} return  
}
function clearTopLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j-1] && boardArr[i-1][j-1].isFlipped === false) {		/* if cell is on top left */
		if (boardArr[i-1][j-1].hasBomb === false) {
			renderCellContent(i-1, j-1)
			return floodFillAll (i-1,j-1)					
		}
	} return  
}
function clearBottomRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j+1] && boardArr[i+1][j+1].isFlipped === false) {		/* if cell is on bottom right */
		if (boardArr[i+1][j+1].hasBomb === false) {
			renderCellContent(i+1, j+1)
			return floodFillAll (i+1,j+1)					
		}
	} return  
}
function clearBottomLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j+1] && boardArr[i-1][j+1].isFlipped === false) {		/* if cell is on bottom left */
		if (boardArr[i-1][j+1].hasBomb === false) {
			renderCellContent(i-1, j+1)
			return floodFillAll (i-1,j+1)					
		}
	} return  
}

function clearRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j] && boardArr[i+1][j].isFlipped === false) {		/* if cell is not on right */
		if (boardArr[i+1][j].hasBomb === false) {
			renderCellContent(i + 1, j)	
			return floodFillAll (i + 1,j)				
		}	
	}
	return  
}

function clearLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j] && boardArr[i-1][j].isFlipped === false) { 		/* if the cell is not on left */
	if (boardArr[i-1][j].hasBomb === false) {
		renderCellContent(i - 1, j)				
	}	
} 
return  
}

// function clearAbove(i, j) {
// 	if (j !== 0 && boardArr[i][j-1].isFlipped === false) {		/* if cell is on top row */	
// 		if (boardArr[i][j-1].hasBomb === false) {
// 			renderCellContent(i, j-1)	
// 			return floodFillAll (i,j-1)			
// 		}
// 	} return 
// }

// function clearBelow(i, j) {
// 	if (j !== (difficultyMode[difficulty].gridHeight - 1)  && boardArr[i][j+1].isFlipped === false) {		/* if cell is on bottom row */
// 		if (boardArr[i][j+1].hasBomb === false) {
// 			renderCellContent(i, j+1)	
// 			return floodFillAll (i,j+1)				
// 		}
// 	} return  
// }

// function clearTopRight(i, j) {
// 	if (j !== 0 && i !== (difficultyMode[difficulty].gridWidth - 1) && boardArr[i+1][j-1].isFlipped === false) {		/* if cell is on top right */
// 		if (boardArr[i+1][j-1].hasBomb === false) {
// 			renderCellContent(i+1, j-1)	
// 			return floodFillAll (i+1,j-1)				
// 		}
// 	} return  
// }
// function clearTopLeft(i, j) {
// 	if (j !== 0 && i !== 0 && boardArr[i-1][j-1].isFlipped === false) {		/* if cell is on top left */
// 		if (boardArr[i-1][j-1].hasBomb === false) {
// 			renderCellContent(i-1, j-1)
// 			return floodFillAll (i-1,j-1)					
// 		}
// 	} return  
// }
// function clearBottomRight(i, j) {
// 	if (j !== (difficultyMode[difficulty].gridHeight - 1) && i !== (difficultyMode[difficulty].gridWidth - 1) && boardArr[i+1][j+1].isFlipped === false) {		/* if cell is on bottom right */
// 		if (boardArr[i+1][j+1].hasBomb === false) {
// 			renderCellContent(i+1, j+1)
// 			return floodFillAll (i+1,j+1)					
// 		}
// 	} return  
// }
// function clearBottomLeft(i, j) {
// 	if (j !== (difficultyMode[difficulty].gridHeight - 1) && i !== 0 && boardArr[i-1][j+1].isFlipped === false) {		/* if cell is on bottom left */
// 		if (boardArr[i-1][j+1].hasBomb === false) {
// 			renderCellContent(i-1, j+1)
// 			return floodFillAll (i-1,j+1)					
// 		}
// 	} return  
// }

// function clearRight(i, j) {
// 	if (i !== (difficultyMode[difficulty].gridWidth - 1) && boardArr[i+1][j].isFlipped === false) {		/* if cell is not on right */
// 		if (boardArr[i+1][j].hasBomb === false) {
// 			renderCellContent(i + 1, j)	
// 			return floodFillAll (i + 1,j)				
// 		}	
// 	}
// 	return  
// }

// function clearLeft(i, j) {
// 	if (i !== 0 && boardArr[i-1][j].isFlipped === false) { 		/* if the cell is not on left */
// 	if (boardArr[i-1][j].hasBomb === false) {
// 		renderCellContent(i - 1, j)				
// 	}	
// } 
// return  
// }

// check that the array element actually exists as the parameter 


// class MinesweeperGame {
// 	constructor (difficulty) {

// 	}
// }