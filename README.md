# sweeper 
Based on the popular game Minesweeper, sweeper is a logic puzzle game which features a grid of clickable squares with hidden bombs scattered through the board. The goal of the game is to clear the entire board without setting off any of the bombs. Originally, the game was developed and released by Microsoft as a part of the "Windows Entertainment Pack", making its first appearance in Windows 3.11. Since Windows 3.11, Minesweeper was a beloved staple for Windows PC users until Windows 8, when it was no longer included with the system install. Today, the game remains free-to-play as a downloadable from the Microsoft Store.

<div style="display:flex; margin: 5vmin auto">
<img src="https://github.com/benjaehyun/sweeper/blob/gh-pages/screenshots/Screenshot%202023-08-10%20at%207.46.47%20PM.png?raw=true"  alt ="Starting Title and Directions" width ="40%" style="margin: 1vmin"> 


<img src="https://github.com/benjaehyun/sweeper/blob/gh-pages/screenshots/Screenshot%202023-08-10%20at%205.18.06%20PM.png?raw=true"  alt="Showing Blank Board After Difficulty Selection" width="40%" style="margin: 1vmin">
</div>

<div style="display:flex; margin: 5vmin auto">
<img src="https://github.com/benjaehyun/sweeper/blob/gh-pages/screenshots/Screenshot%202023-08-10%20at%205.18.15%20PM.png?raw=true" alt="Initial Reveal Pattern" width="40%" style="margin: 1vmin">


<img src="https://github.com/benjaehyun/sweeper/blob/gh-pages/screenshots/Screenshot%202023-08-10%20at%207.47.15%20PM.png?raw=true" alt="Losing Page" width="55%" style="margin: 1vmin">
</div>

<div style="display:flex; margin: 5vmin auto; text-align:center; flex-direction: column;">


<img src="https://github.com/benjaehyun/sweeper/blob/gh-pages/screenshots/Screenshot%202023-08-10%20at%205.27.32%20PM.png?raw=true" alt="Winning Page" width = "40%">
</div>

Technologies Used: JavaScript, HTML, CSS 

## Getting Started:
https://benjaehyun.github.io/sweeper/

All relevant instructions can be found on game page. 

Note: game will be easier to play with a separate mouse. 

Hint: Don't think of the board as a large grid. Rather, break it up into smaller 3x3 squares and solve one cell at a time. Also, try to remember easy patters like corner 1's, edge 3's, 2's sandwiched between corners etc. 

## What's Next: 
#### Known Bugs: 
* Current configuration does not allow bomb placements at ANY of the cells in the same column or index of the starting square (basically creates a giant cross that will always be clear)
  * Refactor the random index generators to give a single pair of indexes that cannot include the specified coordinates of the starting square rather than two separate values. 
* Adjust the code so that the state variables can be adjusted and accessed globally, this is a current issue because different stages of the game (and consequently state variables/cached elements) are initiated as a result of user actions and subsequent functions. Alot of this is an issue because of the current logic used to create a game based on a specified difficuly, and resetting it for later games.
* Add the middlemousebutton function back into the code and polish it so that it will reveal all adjacent cells when it is used to click a previously revealed cell (also inducing the cascading reveal of '0' containing cells)
* Current issue with creating and populating non-square shaped grids due to variable naming convention. 
  * Clean up the usage of certain variables such as colIdx, rowIdx, bombRow, bombCol, and consequently, i/j parameters given to functions/loops. 


#### Additional Game Modes and Features 
###### First Idea    
* A combination of a speedrun and memory game where u replay the exact same board and try to remember the bomb positions and re-clear the same board in shorter solve times 
  * Store the exact same board of numbers and bomb positions 
  * Change all of the cells back to their covered state 
* Introduce a start button for subsequent attempts just because the completion time matters 
* Create a new element storing run number and solve times on the side 
* Keep doing this replay cycle until either: 
  * The player completion time is higher than the most recent run 
  * Player clicks a bomb; player loses a normal game of minesweeper 

###### Second Idea
* Introduce some new scoring system where misclicks are allowed in subsequent runs after the first solve 
* Find out a way to get a value that is fairly scored but is still VERY penalizing for clicking on a bomb square 
  * Maybe look at the way that different typing tests score time against the misspellings but obviously change the weight of errors 

###### Third Idea  
* Create more levels that will not only increase the bomb and grid size but will also reduce the number of empty cells 
  * Also for the values that are stored in the cells: make all of the numbers more "middling" so make larger and smaller values less frequent   
  * Note: could affect the logic that populates the cells 
  * May not work because i dont know if that logic will exist (but i think it will if i increase the bomb density appropriately)

###### Fourth Idea 
Make different modes: 
1. Traditional minesweeper where you choose the grid size that ends after a single solve
2. Game continuation discussed in "First Idea" for a completion time highscore 
3. Make the game progressive 
    * Start with a very easy level and with each solve, create a new instance of the board 
      * Refactor the code for nearly all game components to be stored in a class declaration 
    * After each completion create a new board that is harder than the last (think candy crush progression)
    * Scored by some level system (such as level number that could then be put into larger categories) and completion time for each level OR time it took to get to that level in total 

###### Fifth Idea 
* Develop some sort of system that shows some sort of hint if the player gets stuck
* Maybe unhide a hint button after a certain amount of time has elapsed since the last reveal
* The hint can come in any number of forms: 
  * Could randomly reveal a cell or randomly flag a cell (or multiple depending on remaining number of covered cells)
  * Maybe highlight a select area (changes based on grid size) that for sure contains a bomb & possibly display the number of bombs in that area depending on the size of the highlighted area 
  * Highlight the correct next move to make 
  * Maybe find a way to put this into a string and display that string 
* David Becerra described very interesting algorithmic approaches to solving minesweeper, specifically the naive single point strategy. [Found Here](https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf "D. Becerra Senior Thesis on Algorithmic Approaches to Playing Minesweeper") 
  * Note: will probably not be that useful for implementing a hint in the code, but an interesting read nonetheless