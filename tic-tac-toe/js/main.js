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

    //Game initialization
    function init() {
        gameFieldsEl.forEach(el => {
            el.innerText = '';
            el.className = 'game-board__field';
        });
        displayScores();
        logic.initLogic(myTurn); 
        player0.className = 'player player0';
        player1.className = 'player player1';
        player0Name.innerText = 'Player 1';
        player1Name.innerText = 'Player 2';
        if(logic.getActivePlayer() === 1) player0.classList.add('active');
        else player1.classList.add('active');
        gameFieldsEl.forEach(el => el.style = 'none');
        if(!myTurn) logic.makeMoveAI();
        myTurn = myTurn ? false : true;
        
        
        //Event listeners
        logic.getActivePlayer() === 1 ? gameBoardEl.addEventListener('click', makeMove) : gameBoardEl.removeEventListener('click', makeMove);
        newGame.addEventListener('click', init);
        reset.addEventListener('click', resetScores);
    };

    //Selecting field by player
    function makeMove(e) {
        if(e.target.id >= 1 && e.target.id <= 9 && !e.target.classList.contains('selected')) {
            //Increment selected fields counter
            logic.incrementCount();
            //Save selected field to data array
            logic.addField(e.target.id-1);
            //Update UI
            e.target.classList.add('selected');
            e.target.removeEventListener('click', e);   
            logic.getActivePlayer() === 1 ? e.target.innerText = 'O' : e.target.innerText = 'X';
            afterMove();
        }   
    };

    //End game when there is a winner
    function endGame() {
        //Update UI
        const winner = document.getElementById(`player${logic.getActivePlayer()}-name`);
        winner.innerText = 'WINNER';
        logic.getActivePlayer() === 1 ? score0++ : score1++;
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
        } else if(logic.getCount() === 9) {
            player0.className = 'player player0';
            player1.className = 'player player1';
        //Continue game
        } else {
            logic.getActivePlayer() === 1 ? logic.setActivePlayer(2) : logic.setActivePlayer(1);
            logic.getActivePlayer() === 1 ? gameBoardEl.addEventListener('click', makeMove) : gameBoardEl.removeEventListener('click', makeMove);
            player0.classList.toggle('active');
            player1.classList.toggle('active');
            if(logic.getActivePlayer() === 2) logic.makeMoveAI();
        }
    };

    init();

    //Public methods
    app.init = init;
    app.afterMove = afterMove;
    
    return app;

})(APP || {}, APP.logic);



