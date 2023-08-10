# sweeper 
A README.md file with these sections:

☐ sweeper: A description of your game. Background info of the game is a nice touch.

☐ Screenshot(s): Images of your actual game.

☐ Technologies Used: List of the technologies used, e.g., JavaScript, HTML, CSS...

☐ Getting Started: In this section include the link to your deployed game and any instructions you deem important.

☐ Next Steps: 
    adjust the behavior of the floodfill recursive function which determines the initial (solveable) pattern of revealed cells upon the first click on the board. 
        for some reason stops at cells that contain a value of 0 
        has odd wrapping behavior that will create "cliffs" of unrevealed cells, this leads to a gross over-use of the function and sometimes solves the entire grid 
    adjust the code so that the state variables can be adjusted and accessed globally, this is a current issue because different stages of the game (and consequently state variables/cached elements) are initiated as a result of user actions and subsequent functions. Alot of this is an issue because of the current logic used to create a game based on a specified difficuly, and resetting it for later games.
    refactor the reveal function so that if a cell containing a value of 0 is clicked, it will also reveal any adjacent cells that also contain a value of 0 until it reaches cells that contain neither bombs or non-0 values
    add the middlemousebutton function back into the code and polish it so that it will reveal all adjacent cells when it is used to click a previously revealed cell 

    |additional game modes and features|
        As outlined in the pseudocode file, add new game modes and functions. 
        |First| 
            idea: a combination of a speedrun and memory game where u replay the exact same board and try to remember the bomb positions and re-clear the same board in shorter solve times 
            store the exact same board of numbers and bomb positions 
            change all of the cells back to their covered state 
            introduce a start button for subsequent attempts just because the completion time matters 
            create a new element storing run number and solve times on the side 
            keep doing this replay cycle until either: 
                the player completion time is higher than the most recent run 
                player clicks a bomb; player loses a normal game of minesweeper 
        |Second| 
            introduce some new scoring system where misclicks are allowed in subsequent runs after the first solve 
            find out a way to get a value that is fairly scored but is still VERY penalizing for clicking on a bomb square 
                maybe look at the way that different typing tests score time against the misspellings but obviously change the weight of errors 
        |Third| 
            create more levels that will not only increase the bomb and grid size but will also reduce the number of empty cells 
                also for the values that are stored in the cells: make all of the numbers more "middling" so make larger and smaller values less frequent   
             note: could affect the logic that populates the cells 
             may not work because i dont know if that logic will exist (but i think it will if i increase the bomb density appropriately)
        |Fourth| 
            make different modes: 
                first: traditional minesweeper where you choose the grid size that ends after a single solve
                second: game continuation discussed above for a completion time highscore 
                third: make the game progressive 
                    start wtih a very easy level and with each solve reinstantiate the board 
                    after each completion create a new board that is harder than the last (think candy crush progression)
                    scored by some level system (such as level number that could then be put into larger categories) and completion time for each level || OR time it took to get to that level in total 
        |Fifth| 
            develop some sort of system that is shows some sort of hint if the player gets stuck 
            maybe unhide a hint button after a certain amount of time has elapsed since the game start 
            use one of the solving algorithms/logic outlined in "https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf" for example 
                i think that this should reveal a logical next move for the player to make based on the previously completed moves 
            the hint can come in any number of forms: 
                maybe highlight a select area (changes based on grid size) that for sure contains a bomb & possibly display the number of bombs in that area depending on the size of the highlighted area 
                highlight the correct next move to make based on the algorithm/logic explained in the above linked thesis 
                maybe find a way to put this into a string and display that string 