const gameFields = Array.from(document.querySelectorAll('.game-board__field'));
const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');
const score0El = document.getElementById('score0');
const score1El = document.getElementById('score1');
const newGame = document.getElementById('new');
const reset = document.getElementById('reset');

let activePlayer, score0, score1;


function init() {
    gameFields.forEach(el => {
        el.innerText = '';
        el.className = 'game-board__field';
    });
    score0 = 0;
    score1 = 0;
    score0El.innerText = 0;
    score1El.innerText = 0;
    activePlayer = 0;
    player0.className = 'player player0';
    player1.className = 'player player1';
    player0.classList.add('active');
};

init();

