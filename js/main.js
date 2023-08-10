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
	gridWidth: 20, 
	gridHeight: 20, 
	bombNumber: 50
	}, 
	{
	gridWidth: 3, 
	gridHeight: 3, 
	bombNumber: 1
	}]
	/*----- state variables -----*/
let bombCounter, timer, difficulty, firstClick, height, width, timerBool; 
let boardArr = []; 


	/*----- cached elements  -----*/
const diffSelectorEl = document.querySelector("#difficulty-selector");
const boardEl = document.querySelector("#grid"); 
const bombCounterEl = document.querySelector("#bomb-counter")
const timerEl = document.querySelector("#timer")
const resetEl = document.querySelector("button")
const winnerMsgEl = document.querySelector("#winner")
const loserMsgEl = document.querySelector("#loser")


	/*----- event listeners -----*/
diffSelectorEl.addEventListener("click", handleDifficultyClick);
boardEl.addEventListener("click", handleBoardClick)
boardEl.addEventListener("contextmenu", handleRightClick)
resetEl.addEventListener("click", handleReset)
// boardEl.addEventListener("mousedown", handleMiddleClick)

	/*----- functions -----*/
init() 

function init() {
	boardEl.innerHTML = ""
	bombCounter = 0 
	timer = 000 
	timerBool = false
	firstClick = true; 
	difficulty = null; 
	boardArr = [] 
	renderDifficultyMenu()
}

function renderDifficultyMenu() {
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
	if (firstClick === true) {
		bombCounterEl.innerText = difficultyMode[difficulty].bombNumber; 
		placeRandomBomb(difficultyMode[difficulty].bombNumber, rowIdx, colIdx); 
		calculateNearBombs(); 
		renderCellContent(colIdx, rowIdx);
		floodFillAll(colIdx, rowIdx)
		timerBool = true 
		stopWatch()
		firstClick = false; 
	} else {
		if (!boardArr[colIdx][rowIdx].hasBomb){
			renderCellContent(colIdx, rowIdx);
			checkWinner();
		} if (boardArr[colIdx][rowIdx].hasBomb) {
			renderLoser()
		}
	}
}

function handleReset(evt) {
	boardEl.style.backgroundColor = ""
	winnerMsgEl.style.display = "none";
	loserMsgEl.style.display = "none";
	document.querySelector("h1").style.display = "flex";
	init() 
}
 
function handleRightClick(evt) { 
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

function renderGameStart(difficulty) {
	diffSelectorEl.style.display = "none";
	boardEl.style.display = "grid";
	const width = difficultyMode[difficulty].gridWidth
	const height = difficultyMode[difficulty].gridHeight
	buildArr(width, height);
	renderCells(height, width);
}

function renderCellContent (i, j) {
  if(boardArr[i] && boardArr[i][j] && boardArr[i][j].isFlipped === false) {
  	boardArr[i][j].isFlipped = true; 
  	document.getElementById(`c${j}r${i}`).style.backgroundColor = "burlywood"
  	if (boardArr[i][j].hasBomb === true) {
  		document.getElementById(`c${j}r${i}`).innerText = "💣"
  	} 
  	if (boardArr[i][j].numOfNearBombs === 0) {
  		document.getElementById(`c${j}r${i}`).innerText = ""
      renderCellContent(i-1, j-1)
      renderCellContent(i, j-1)
      renderCellContent(i+1, j-1)
      renderCellContent(i-1, j)
      renderCellContent(i+1, j)
      renderCellContent(i-1, j+1)
      renderCellContent(i, j+1)
      renderCellContent(i+1, j+1)
  	} 
  	else {
  		document.getElementById(`c${j}r${i}`).innerHTML = `<strong>${boardArr[i][j].numOfNearBombs}</strong>`
  	}
  } else return
}

function renderAllCellsContent () {
	for (let i = 0; i < difficultyMode[difficulty].gridHeight; i++) {
		for (let j = 0; j < difficultyMode[difficulty].gridWidth; j++) {
			if (boardArr[i][j].hasBomb === true) {
				document.getElementById(`c${j}r${i}`).innerText = "💣"
			} else {
				if (boardArr[i][j].numOfNearBombs === 0) {
					document.getElementById(`c${j}r${i}`).innerText = ""
				} 
				else {
					document.getElementById(`c${j}r${i}`).innerHTML = `<strong>${boardArr[i][j].numOfNearBombs}</strong>`
				}
			}
		}
	}
}

function stopWatch() {
	if (timerBool) {
		timer ++ 
		timerEl.innerText = timer
		setTimeout(stopWatch, 1000)
	}
}
function renderLoser() {
	renderAllCellsContent() 
	timerBool = false 
	boardEl.style.backgroundColor = "tomato"
	document.getElementById("loser").style.display = "flex";
	document.querySelector("h1").style.display = "none";
}

function checkWinner() {
	let cellCount = 0
	boardArr.forEach(function(array) {
		array.forEach(function(element) {
			if (element.isFlipped && !element.hasBomb) {
				cellCount ++
			}
		})
	})
	let gridsize = difficultyMode[difficulty].gridWidth * difficultyMode[difficulty].gridHeight
	if (cellCount === (gridsize - difficultyMode[difficulty].bombNumber)) {
		renderWinner() 
	}
}

function renderWinner() {
	boardEl.style.backgroundColor = "darkseagreen"
	timerBool = false 
	document.getElementById("winner").style.display = "flex";
	document.querySelector("h1").style.display = "none";
}

function buildArr (x, y) {
	for(let i = 0; i < x; i++){
		const row = []
		for(let j = 0; j < y; j++) {
			row.push(new CellObject())
		}
		boardArr.push(row)
		}
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
			const cellEl = document.createElement("div")
			cellEl.setAttribute("id", `c${i}r${e}`)
			cellEl.innerText = ""
			cellEl.style.border = "solid rgb(125, 125, 125)"
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
		console.log(boardArr[bombCol][bombRow], bombCol, bombRow)
		console.log(boardArr[bombCol])
		if (boardArr[bombCol][bombRow].hasBomb === false) {
			boardArr[bombCol][bombRow].hasBomb = true; 
			boardArr[bombCol][bombRow].numOfNearBombs = null; 
			i++; 
		} 
	}	
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
	while (randRow === null || randRow === rowIdx ) {
		randRow = Math.round(Math.random() * (difficultyMode[difficulty].gridWidth - 1) ) 
	}
	return randRow; 
}

function randomCol(colIdx) {
	let randCol = null; 
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
		if (boardArr[i][j].isFlipped === false && boardArr[i][j].numOfNearBombs){
			clearAbove(i,j)
			clearBelow(i,j)
			clearRight(i,j)
			clearLeft(i,j)
			clearTopLeft(i,j)
			clearTopRight(i,j)
			clearBottomLeft(i,j)
			clearBottomRight(i,j)
		}
	}  

}

function clearAbove(i, j) {
	if (boardArr[i] && boardArr[i][j-1] && boardArr[i][j-1].isFlipped === false) {		/* if cell is on top row */	
		if (boardArr[i][j-1].hasBomb === false) {
			renderCellContent(i, j-1)	
			floodFillAll (i,j-1)			
		}
	}  
}

function clearBelow(i, j) {
	if (boardArr[i] && boardArr[i][j+1] && boardArr[i][j+1].isFlipped === false) {		/* if cell is on bottom row */
		if (boardArr[i][j+1].hasBomb === false) {
			renderCellContent(i, j+1)	
			floodFillAll (i,j+1)				
		}
	}   
}

function clearTopRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j-1] && boardArr[i+1][j-1].isFlipped === false) {		/* if cell is on top right */
		if (boardArr[i+1][j-1].hasBomb === false) {
			renderCellContent(i+1, j-1)	
			floodFillAll (i+1,j-1)				
		}
	}   
}
function clearTopLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j-1] && boardArr[i-1][j-1].isFlipped === false) {		/* if cell is on top left */
		if (boardArr[i-1][j-1].hasBomb === false) {
			renderCellContent(i-1, j-1)
			floodFillAll (i-1,j-1)					
		}
	}   
}
function clearBottomRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j+1] && boardArr[i+1][j+1].isFlipped === false) {		/* if cell is on bottom right */
		if (boardArr[i+1][j+1].hasBomb === false) {
			renderCellContent(i+1, j+1)
			floodFillAll (i+1,j+1)					
		}
	}   
}
function clearBottomLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j+1] && boardArr[i-1][j+1].isFlipped === false) {		/* if cell is on bottom left */
		if (boardArr[i-1][j+1].hasBomb === false) {
			renderCellContent(i-1, j+1)
			floodFillAll (i-1,j+1)					
		}
	}   
}

function clearRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j] && boardArr[i+1][j].isFlipped === false) {		/* if cell is not on right */
		if (boardArr[i+1][j].hasBomb === false) {
			renderCellContent(i + 1, j)	
			floodFillAll (i + 1,j)				
		}	
	}
	  
}

function clearLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j] && boardArr[i-1][j].isFlipped === false) { 		/* if the cell is not on left */
	if (boardArr[i-1][j].hasBomb === false) {
		renderCellContent(i - 1, j)		
		floodFillAll (i - 1,j)		
	}	
} 
  
}
