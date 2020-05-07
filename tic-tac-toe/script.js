(function() {
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
        activePlayer = 1;
        count = 0;
        player0.className = 'player player0';
        player1.className = 'player player1';
        player0Name.innerText = 'Player 1';
        player1Name.innerText = 'Player 2';
        player0.classList.add('active');
        gameFieldsEl.forEach(el => el.style.cursor = 'pointer');
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
            activePlayer === 1 ? e.target.innerText = 'O' : e.target.innerText = 'X';
            //Check if player made a winning move
            if(checkWinner()) {
                endGame();
            //Check if all fields are already selected
            } else if(count === 9) {
                player0.className = 'player player0';
                player1.className = 'player player1';
            //Continue game
            } else {
                activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
                player0.classList.toggle('active');
                player1.classList.toggle('active');
                if(activePlayer === 2) makeMoveAI();
            }         
        }   
    };

    function makeMoveAI() {
        let move;

        const smallCount = () => {
            move = Math.floor(Math.random() * 9);
            console.log('Move from random !!!!!!');
            while(fieldsArr[move] === 1 || fieldsArr[move] === 2) {
                move = Math.floor(Math.random() * 9);     
            };
            return move;
        };

        fieldsArr.forEach((el, i) => {

            //AI logic
            
            function logic(a) {
                const b = a === 1 ? 2 : 1;
                
                if (i === 0) {
                    if(count <= 1) move = smallCount(); 
                    if(fieldsArr[1] === a && fieldsArr[2]=== undefined) move = 2;
                    else if(fieldsArr[3] === a && fieldsArr[6] === undefined) move = 6;
                    else if(fieldsArr[4] === a && fieldsArr[8] === undefined) move = 8;
                    else if(fieldsArr[2] === a && fieldsArr[1] === undefined) move = 1; 
                    else if(fieldsArr[6] === a && fieldsArr[3] === undefined) move = 3;
                    else if(fieldsArr[8] === a && fieldsArr[4] === undefined) move = 4;
                } else if (i === 1) {
                    if(count <= 1) move = smallCount();  
                    if(fieldsArr[2] === a && fieldsArr[0] === undefined) move = 0;
                    else if(fieldsArr[0] === a && fieldsArr[2] === undefined) move = 2;
                    else if(fieldsArr[4] === a && fieldsArr[7] === undefined) move = 7;
                    else if(fieldsArr[7] === a && fieldsArr[4] === undefined) move = 4;
                } else if (i === 2) {
                    if(count <= 1) move = smallCount();
                    if(fieldsArr[1] === a && fieldsArr[0] === undefined) move = 0;
                    else if(fieldsArr[4] === a && fieldsArr[6] === undefined) move = 6;
                    else if(fieldsArr[5] === a && fieldsArr[8] === undefined) move = 8;
                    else if(fieldsArr[0] === a && fieldsArr[1] === undefined) move = 1; 
                    else if(fieldsArr[6] === a && fieldsArr[4] === undefined) move = 4;
                    else if(fieldsArr[8] === a && fieldsArr[5] === undefined) move = 5;
                } else if (i === 3) {
                    if(count <= 1) move = smallCount();
                    if(fieldsArr[4] === a && fieldsArr[5] === undefined) move = 5;
                    else if(fieldsArr[5] === a && fieldsArr[4] === undefined) move = 4;
                    else if(fieldsArr[0] === a && fieldsArr[6] === undefined) move = 6;
                    else if(fieldsArr[6] === a && fieldsArr[0] === undefined) move = 0;
                } else if (i === 4) {
                    if(count <= 1) move = smallCount();
                    if(fieldsArr[5] === a && fieldsArr[3] === undefined) move = 3;
                    else if(fieldsArr[1] === a && fieldsArr[7] === undefined) move = 7;
                    else if(fieldsArr[2] === a && fieldsArr[6] === undefined) move = 6;
                    else if(fieldsArr[6] === a && fieldsArr[2] === undefined) move = 2;
                    else if(fieldsArr[8] === a && fieldsArr[0] === undefined) move = 0;
                    else if(fieldsArr[0] === a && fieldsArr[8] === undefined) move = 8;
                } else if (i === 5) {
                    if(count <= 1) move = smallCount();
                    if(fieldsArr[4] === a && fieldsArr[3] === undefined) move = 3;
                    else if(fieldsArr[3] === a && fieldsArr[4] === undefined) move = 4;
                    else if(fieldsArr[2] === a && fieldsArr[8] === undefined) move = 8;
                    else if(fieldsArr[8] === a && fieldsArr[2] === undefined) move = 2;
                } else if (i === 6) {
                    if(count <= 1) move = smallCount();
                    if(fieldsArr[7] === a && fieldsArr[8] === undefined) move = 8;
                    else if(fieldsArr[8] === a && fieldsArr[7] === undefined) move = 7;
                    else if(fieldsArr[4] === a && fieldsArr[2] === undefined) move = 2;
                    else if(fieldsArr[2] === a && fieldsArr[4] === undefined) move = 4; 
                    else if(fieldsArr[3] === a && fieldsArr[0] === undefined) move = 0;
                    else if(fieldsArr[0] === a && fieldsArr[3] === undefined) move = 3;
                } else if (i === 7) {
                    if(count <= 1) move = smallCount();
                    if(fieldsArr[8] === a && fieldsArr[6] === undefined) move = 6;
                    else if(fieldsArr[6] === a && fieldsArr[8] === undefined) move = 8;
                    else if(fieldsArr[4] === a && fieldsArr[1] === undefined) move = 1;
                    else if(fieldsArr[1] === a && fieldsArr[4] === undefined) move = 4;
                } else if (i === 8) {
                    if(count <= 1) move = smallCount();
                    else if(fieldsArr[7] === a && fieldsArr[6] === undefined) move = 6;
                    else if(fieldsArr[2] === a && fieldsArr[5] === undefined) move = 5; 
                    else if(fieldsArr[4] === a && fieldsArr[0] === undefined) move = 0;
                    else if(fieldsArr[0] === a && fieldsArr[4] === undefined) move = 4;
                    else if(fieldsArr[6] === a && fieldsArr[7] === undefined) move = 7;
                    else if(fieldsArr[5] === a && fieldsArr[2] === undefined) move = 2;
                    
                }; 
            
                if(move === undefined) {
                    move = smallCount();
                }
                
            
            }
            if(el === 1)
            logic(1);
            
           
                       
        });
        
        setTimeout(function() {
            console.log(move);
            count++;
            fieldsArr[move] = activePlayer;
            const selected = document.getElementById(`${move+1}`);
            selected.classList.add('selected');
            selected.innerText = 'X';
            if(checkWinner()) {
                endGame();
            //Check if all fields are already selected
            } else if(count === 9) {
                player0.className = 'player player0';
                player1.className = 'player player1';
            //Continue game
            } else {
                activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
                player0.classList.toggle('active');
                player1.classList.toggle('active');
                if(activePlayer === 2) makeMoveAI();
            }         
            }, 750);
        

        
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

    init();
})();


const test = [, , , , , , 5];
console.log(test);