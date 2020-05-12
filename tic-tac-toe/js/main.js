var APP = (function(app, logic) {
    const gameBoardEl = document.getElementById('board');
    const gameFieldsEl = Array.from(document.querySelectorAll('.game-board__field'));
    const player0 = document.querySelector('.player0');
    const player1 = document.querySelector('.player1');
    const player0Name = document.getElementById('player1-name')
    const player1Name = document.getElementById('player2-name')
    const score0El = document.getElementById('score0');
    const score1El = document.getElementById('score1')
    const newGame = document.getElementById('new');
    const reset = document.getElementById('reset');

    let score0 = 0,         // player one score
        score1 = 0,         // player two score
        myTurn = true;      // defines which player begins round
        app.fieldsArr = [];     // data array for saving selected fields
        app.count;              // counts number of moves in each round
        app.activePlayer;

    //Game initialization
    function init() {
        gameFieldsEl.forEach(el => {
            el.innerText = '';
            el.className = 'game-board__field';
        });
        displayScores();
        activePlayer = myTurn ? 1 : 2;
        count = 0;
        player0.className = 'player player0';
        player1.className = 'player player1';
        player0Name.innerText = 'Player 1';
        player1Name.innerText = 'Player 2';
        if(activePlayer === 1) player0.classList.add('active');
        else player1.classList.add('active');
        gameFieldsEl.forEach(el => el.style = 'none');
        fieldsArr = [];
        if(!myTurn) logic.makeMoveAI();
        
        myTurn = myTurn ? false : true;
        
        
        //Event listeners
        activePlayer === 1 ? gameBoardEl.addEventListener('click', makeMove) : gameBoardEl.removeEventListener('click', makeMove);
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
            activePlayer === 1 ? e.target.innerText = 'O' : e.target.innerText = 'X';
            afterMove();
        }   
    };

    //End game when there is a winner
    function endGame() {
        //Update UI
        const winner = document.getElementById(`player${activePlayer}-name`);
        winner.innerText = 'WINNER';
        activePlayer === 1 ? score0++ : score1++;
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

    //Move proccessing
    function afterMove() {
        //Check if player won
        if(logic.checkWinner()) {
            endGame();
        //Check if all fields are already selected
        } else if(count === 9) {
            player0.className = 'player player0';
            player1.className = 'player player1';
        //Continue game
        } else {
            activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
            activePlayer === 1 ? gameBoardEl.addEventListener('click', makeMove) : gameBoardEl.removeEventListener('click', makeMove);
            player0.classList.toggle('active');
            player1.classList.toggle('active');
            if(activePlayer === 2) logic.makeMoveAI();
        }
    };

    init();

    //Public methods
    app.init = init;
    app.afterMove = afterMove;
    
    return app;

})(APP || {}, APP.logic);



