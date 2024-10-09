"use strict"
// Selecting Elements
const player0El = document.querySelector('.player-0')
const player1El = document.querySelector('.player-1')
const score0El = document.querySelector("#score-0");
const score1El = document.getElementById("score-1");
const current0El = document.querySelector('#current-0');
const current1El = document.querySelector('#current-1');
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll= document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
let winner = document.querySelector(".who-won");

//Staeting Condition

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;
let playAgain = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove("player-winner");
    player1El.classList.remove("player-winner");
    player0El.classList.add("player-active");
    player1El.classList.remove("player-active");
}

playAgain();

 const switchPlayer = function(){
        document.getElementById(`current-${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle("player-active");
        player1El.classList.toggle("player-active");
 }
//Rolling dice functionality

btnRoll.addEventListener('click', function(){
    if(playing){

        // 1. Generating a random dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dices/dice-${dice}.jpg`;

        // 3. check for rolled 1: if true switch to next player
        if(dice != 1 ){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;

        }else{
            //Switch to next player
            switchPlayer();
        }
    }
});

// Rolling Hold btn functionality
btnHold.addEventListener('click', function(){
    if(playing){
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        
        //2. Check if player score 's >100
            //finish
            if(scores[activePlayer] >=100){
                playing = false;
                diceEl.classList.add("hidden");
                winner.textContent = `Player ${player-winner} Won`
                winner.classList.remove('hidden')
                document.querySelector(`.player-${activePlayer}`).classList.add("player-winner")
                document.querySelector(`.player-${activePlayer}`).classList.remove("player-active");
            }else{
                //switch to the next player
                switchPlayer();
            }
    }
        
});

// Rolling New btn functionality
btnNew.addEventListener('click', playAgain);