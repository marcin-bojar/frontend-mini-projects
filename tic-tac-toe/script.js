(function() {
    const gameBoardEl = document.getElementById('board');
    const gameFieldsEl = Array.from(document.querySelectorAll('.game-board__field'));
    const player0 = document.querySelector('.player0');
    const player1 = document.querySelector('.player1');
    const player0Name = document.getElementById('player0-name')
    const player1Name = document.getElementById('player1-name')
    const score0El = document.getElementById('score0');
    const score1El = document.getElementById('score1')
    const newGame = document.getElementById('new');
    const reset = document.getElementById('reset');

    let activePlayer,
        score0 = 0,
        score1 = 0,
        count,
        fieldsArr = [];

    //Game initialization
    function init() {
        gameFieldsEl.forEach(el => {
            el.innerText = '';
            el.className = 'game-board__field';
        });
        displayScores();
        activePlayer = 0;
        count = 0;
        player0.className = 'player player0';
        player1.className = 'player player1';
        player0Name.innerText = 'Player 1';
        player1Name.innerText = 'Player 2';
        player0.classList.add('active');
        fieldsArr = [];
        
        //Event listeners
        gameBoardEl.addEventListener('click', makeMove);
        newGame.addEventListener('click', init);
        reset.addEventListener('click', resetScores);
    };

    //Selecting field by player
    function makeMove(e) {
        if(e.target.id >= 1 && e.target.id <= 9 && !e.target.classList.contains('selected')) {
            //Increment selected fields counter
            count++;
            //Save selected field to data array
            fieldsArr[e.target.id-1] = activePlayer;
            //Update UI
            e.target.classList.add('selected');
            e.target.removeEventListener('click', e);   
            activePlayer === 0 ? e.target.innerText = 'O' : e.target.innerText = 'X';
            //Check if player made a winning move
            if(checkWinner()) {
                endGame();
            //Check if all fields are already selected
            } else if(count === 9) {
                player0.className = 'player player0';
                player1.className = 'player player1';
            //Continue game
            } else {
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                player0.classList.toggle('active');
                player1.classList.toggle('active');
                
            }         
        }   
    };

    
    function checkWinner() {
        if(
            (fieldsArr[0] === activePlayer && fieldsArr[1] === activePlayer && fieldsArr[2] === activePlayer) ||
            (fieldsArr[3] === activePlayer && fieldsArr[4] === activePlayer && fieldsArr[5] === activePlayer) ||
            (fieldsArr[6] === activePlayer && fieldsArr[7] === activePlayer && fieldsArr[8] === activePlayer) ||
            (fieldsArr[0] === activePlayer && fieldsArr[3] === activePlayer && fieldsArr[6] === activePlayer) ||
            (fieldsArr[1] === activePlayer && fieldsArr[4] === activePlayer && fieldsArr[7] === activePlayer) ||
            (fieldsArr[2] === activePlayer && fieldsArr[5] === activePlayer && fieldsArr[8] === activePlayer) ||
            (fieldsArr[0] === activePlayer && fieldsArr[4] === activePlayer && fieldsArr[8] === activePlayer) ||
            (fieldsArr[2] === activePlayer && fieldsArr[4] === activePlayer && fieldsArr[6] === activePlayer))
            return true;
        else return false;   
    };

    //End game when there is a winner
    function endGame() {
        //Update UI
        const winner = document.getElementById(`player${activePlayer}-name`);
        winner.innerText = 'WINNER';
        activePlayer === 0 ? score0++ : score1++;
        displayScores();
        gameFieldsEl.forEach(el => el.style.cursor = 'default');
        //Remove game board event listener
        gameBoardEl.removeEventListener('click', makeMove);
        

    };

    //Reset scores data
    function resetScores() {
        score0 = 0;
        score1 = 0;
        displayScores();
    };

    //Update scores in UI
    function displayScores() {
        score0El.innerText = score0;
        score1El.innerText = score1;
    };

    init();
})();


