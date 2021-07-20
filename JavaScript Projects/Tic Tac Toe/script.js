// Basic setuo
// Determine winner
//Basic AI and winner notification
// Minimax Algorithm

var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys()) // create array of 9 elements and get keys 0-9, and create array from the other array
    /* Prints out this if you do :     
            console.log(origBoard); 
        0: 0
        1: 1
        2: 2
        3: 3
        4: 4
        5: 5
        6: 6
        7: 7
        8: 8
        length: 9*/

        for (let index = 0; index < cells.length; index++) {
            cells[index].innerText = '';
            cells[index].style.removeProperty('background-color');
            cells[index].addEventListener('click', turnClick, false);


        }
}

function turnClick(square){
    //console.log(square.target.id); // printing out the id of the square that you click on
    //First human player will take a turn, then Ai Player, so first check if there has been a tie

    if(typeof origBoard[square.target.id] == 'number'){
        turn(square.target.id, huPlayer);
        if(!checkTie()){
            turn(bestSpot(), aiPlayer);
        }
    }
}

function turn(squareId, player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player; // prints out O when clicked on the tile

    let gameWonIndicator = checkWin(origBoard, player);
    if(gameWonIndicator){
        gameOver(gameWonIndicator);
    }

}


function checkWin(board, player){
    let plays = board.reduce((a,e,i) =>
    (e === player) ? a.concat(i): a, [] ); // a = acumulator, e = element, i = index
    // if element = player, then take the a array and add the index to the array, if it does not equal the player, just return the accumulator
    // to find every index the player has played in

    let gameWonIndicator = null;

    for (let [index, win] of winCombos.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1)){ // checks all the spots on the grid
            gameWonIndicator = {index: index, player: player};
            break;

        }    
    };
    return gameWonIndicator;
}


function gameOver(gameWonIndicator){
    for (let index of winCombos[gameWonIndicator.index]) {
        document.getElementById(index).style.backgroundColor = 
        gameWonIndicator.player == huPlayer ? "blue" : "red";
    }

    for(var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);

    }
    declareWinner(gameWonIndicator.player == huPlayer ? "You Win" : "You lose");
}


function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who; // shows who actually won

}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return emptySquares()[0];
}

function checkTie(){
    if(emptySquares().length == 0){
        for (var i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    } else {
        return false;
    }
}

