const player1Name = document.getElementById("name-0")
const player1Score = document.getElementById("score-0")
const player2Name = document.getElementById("name-1")
const player2Score = document.getElementById("score-1")
const player1CurrentScore = document.getElementById("current-0")
const player2CurrentScore = document.getElementById("current-1")
const dice1 = document.getElementById('dice-1')
const dice2 = document.getElementById('dice-2')
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');
const player1Panel = document.querySelector('.player-0-panel');
const player2Panel = document.querySelector('.player-1-panel');
const finalScore = document.querySelector('.final-score');

var scores, roundScore, activePlayer, gamePlaying;

const init = () => {
    score = [0, 0];
    roundScore = 0;
    gamePlaying = true;
    activePlayer = 0;
    player1Name.textContent = "PLAYER 1";
    player1Score.textContent = 0;
    player2Name.textContent = "PLAYER 2";
    player2Score.textContent = 0;
    player1CurrentScore.textContent = 0;
    player2CurrentScore.textContent = 0;
    dice1.style.display = "none";
    dice2.style.display = "none";
    player1Panel.classList.remove('winner');
    player2Panel.classList.remove('winner');
    player1Panel.classList.remove('active');
    player2Panel.classList.remove('active');
    player1Panel.classList.add('active');
};

const nextPlayer = () => {
    player1Panel.classList.toggle("active");
    player2Panel.classList.toggle("active");
    dice1.style.display = "none"
    dice2.style.display = "none"
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

const randomNum = (min, max) => {
    return (Math.floor(Math.random() * max - min + 1) + 1);
}

init();

btnRoll.addEventListener("click", () => {
    if (gamePlaying) {
        let randNumDice1 = randomNum(1, 6);
        let randNumDice2 = randomNum(1, 6);
        dice1.style.display = "block"
        dice2.style.display = "block"
        dice1.src = `./assets/image/dice-${randNumDice1}.png`
        dice2.src = `./assets/image/dice-${randNumDice2}.png`
        if (randNumDice2 !== 1 && randNumDice1 !== 1) {
            roundScore += randNumDice1 + randNumDice2;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
})

btnHold.addEventListener("click", () => {
    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];
        let winnerScore;
        finalScore.value ? winnerScore = finalScore.value : winnerScore = 100;
        if (score[activePlayer] >= winnerScore) {
            let winnerPlayer = document.getElementById(`name-${activePlayer}`);
            winnerPlayer.textContent = "WINNER";
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

btnNew.addEventListener("click", init);