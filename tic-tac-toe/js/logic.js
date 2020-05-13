var APP = (function(app) {
    //Submodule
    let sub = app.logic = app.logic || {};

    // Selecting field by computer
    function makeMoveAI() {
        let moveTaken,
            moveWin,
            moveStopLose,
            moveWinChance,
            moveLoseChance;

        const randomMove = () => {
            let move = Math.floor(Math.random() * 9);
            
            // while(fieldsArr[move] === 1 || fieldsArr[move] === 2) {
            //     move = Math.floor(Math.random() * 9);
            // };

            return move;
        };

        const lastMove = () => {
            let move;
            for(let i = 0; i < 9; i++) {
                if(!fieldsArr[i]) move = i;
            }
            return move;
        };

        if(fieldsArr.length === 0) moveWin = randomMove();
        fieldsArr.forEach((el, i) => {

            
            //If parameter a = computer's player number --> attack mode else defend mode
            
            function attackOrDefend(a) {
                let move;
               // console.log(`Entering LOGIC ${a}`);
                if(el === a) {
                    if (i === 0) {
                        if(count === 8) move = lastMove(); 
                        if(fieldsArr[1] === a && fieldsArr[2]=== undefined) move = 2;
                        else if(fieldsArr[3] === a && fieldsArr[6] === undefined) move = 6;
                        else if(fieldsArr[4] === a && fieldsArr[8] === undefined) move = 8;
                        else if(fieldsArr[2] === a && fieldsArr[1] === undefined) move = 1; 
                        else if(fieldsArr[6] === a && fieldsArr[3] === undefined) move = 3;
                        else if(fieldsArr[8] === a && fieldsArr[4] === undefined) move = 4;
                    } else if (i === 1) {
                        if(count === 8) move = lastMove();  
                        if(fieldsArr[2] === a && fieldsArr[0] === undefined) move = 0;
                        else if(fieldsArr[0] === a && fieldsArr[2] === undefined) move = 2;
                        else if(fieldsArr[4] === a && fieldsArr[7] === undefined) move = 7;
                        else if(fieldsArr[7] === a && fieldsArr[4] === undefined) move = 4;
                    } else if (i === 2) {
                        if(count === 8) move = lastMove();
                        if(fieldsArr[1] === a && fieldsArr[0] === undefined) move = 0;
                        else if(fieldsArr[4] === a && fieldsArr[6] === undefined) move = 6;
                        else if(fieldsArr[5] === a && fieldsArr[8] === undefined) move = 8;
                        else if(fieldsArr[0] === a && fieldsArr[1] === undefined) move = 1; 
                        else if(fieldsArr[6] === a && fieldsArr[4] === undefined) move = 4;
                        else if(fieldsArr[8] === a && fieldsArr[5] === undefined) move = 5;
                    } else if (i === 3) {
                        if(count === 8) move = lastMove();
                        if(fieldsArr[4] === a && fieldsArr[5] === undefined) move = 5;
                        else if(fieldsArr[5] === a && fieldsArr[4] === undefined) move = 4;
                        else if(fieldsArr[0] === a && fieldsArr[6] === undefined) move = 6;
                        else if(fieldsArr[6] === a && fieldsArr[0] === undefined) move = 0;
                    } else if (i === 4) {
                        if(count === 8) move = lastMove();
                        if(fieldsArr[5] === a && fieldsArr[3] === undefined) move = 3;
                        else if(fieldsArr[1] === a && fieldsArr[7] === undefined) move = 7;
                        else if(fieldsArr[2] === a && fieldsArr[6] === undefined) move = 6;
                        else if(fieldsArr[6] === a && fieldsArr[2] === undefined) move = 2;
                        else if(fieldsArr[8] === a && fieldsArr[0] === undefined) move = 0;
                        else if(fieldsArr[0] === a && fieldsArr[8] === undefined) move = 8;
                    } else if (i === 5) {
                        if(count === 8) move = lastMove();
                        if(fieldsArr[4] === a && fieldsArr[3] === undefined) move = 3;
                        else if(fieldsArr[3] === a && fieldsArr[4] === undefined) move = 4;
                        else if(fieldsArr[2] === a && fieldsArr[8] === undefined) move = 8;
                        else if(fieldsArr[8] === a && fieldsArr[2] === undefined) move = 2;
                    } else if (i === 6) {
                        if(count === 8) move = lastMove();
                        if(fieldsArr[7] === a && fieldsArr[8] === undefined) move = 8;
                        else if(fieldsArr[8] === a && fieldsArr[7] === undefined) move = 7;
                        else if(fieldsArr[4] === a && fieldsArr[2] === undefined) move = 2;
                        else if(fieldsArr[2] === a && fieldsArr[4] === undefined) move = 4; 
                        else if(fieldsArr[3] === a && fieldsArr[0] === undefined) move = 0;
                        else if(fieldsArr[0] === a && fieldsArr[3] === undefined) move = 3;
                    } else if (i === 7) {
                        if(count === 8) move = lastMove();
                        if(fieldsArr[8] === a && fieldsArr[6] === undefined) move = 6;
                        else if(fieldsArr[6] === a && fieldsArr[8] === undefined) move = 8;
                        else if(fieldsArr[4] === a && fieldsArr[1] === undefined) move = 1;
                        else if(fieldsArr[1] === a && fieldsArr[4] === undefined) move = 4;
                    } else if (i === 8) {
                        if(count === 8) move = lastMove();
                        else if(fieldsArr[7] === a && fieldsArr[6] === undefined) move = 6;
                        else if(fieldsArr[2] === a && fieldsArr[5] === undefined) move = 5; 
                        else if(fieldsArr[4] === a && fieldsArr[0] === undefined) move = 0;
                        else if(fieldsArr[0] === a && fieldsArr[4] === undefined) move = 4;
                        else if(fieldsArr[6] === a && fieldsArr[7] === undefined) move = 7;
                        else if(fieldsArr[5] === a && fieldsArr[2] === undefined) move = 2;
                        
                    }; 
                }      
               
                if(move !== undefined) {
                   if(a === 2) moveWin = move;
                   else if (a === 1) moveStopLose = move;
                 //  console.log(`Selected from logic function ${a} -----> move ${move}`);
                };
               
            }

            function winChance(a) {
                let move;
              //  console.log(`Entering winCHANCE ${a}`);
                let arr = [];
                if(el === a) {
                    if(i === 0) {
                        if(fieldsArr[1] === undefined && fieldsArr[2] === undefined) {
                            arr = [1,2];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[8] === undefined) {
                            arr = [4,8];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[3] === undefined && fieldsArr[6] === undefined) {
                            arr = [3,6];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 1) {
                        if(fieldsArr[0] === undefined && fieldsArr[2] === undefined) {
                            arr = [0,2];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[7] === undefined) {
                            arr = [4,7];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 2) {
                        if(fieldsArr[1] === undefined && fieldsArr[0] === undefined) {
                            arr = [1,0];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[6] === undefined) {
                            arr = [4,6];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[5] === undefined && fieldsArr[8] === undefined) {
                            arr = [5,8];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 3) {
                        if(fieldsArr[0] === undefined && fieldsArr[6] === undefined) {
                            arr = [0,6];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[5] === undefined) {
                            arr = [4,5];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 4) {
                        if(fieldsArr[1] === undefined && fieldsArr[7] === undefined) {
                            arr = [1,7];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[3] === undefined && fieldsArr[5] === undefined) {
                            arr = [3,5];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[0] === undefined && fieldsArr[8] === undefined) {
                            arr = [0,8];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[2] === undefined && fieldsArr[6] === undefined) {
                            arr = [2,6];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 5) {
                        if(fieldsArr[2] === undefined && fieldsArr[8] === undefined) {
                            arr = [2,8];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[3] === undefined) {
                            arr = [4,3];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 6) {
                        if(fieldsArr[3] === undefined && fieldsArr[0] === undefined) {
                            arr = [3,0];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[2] === undefined) {
                            arr = [4,2];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[7] === undefined && fieldsArr[8] === undefined) {
                            arr = [7,8];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 7) {
                        if(fieldsArr[6] === undefined && fieldsArr[8] === undefined) {
                            arr = [6,8];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[4] === undefined && fieldsArr[1] === undefined) {
                            arr = [4,1];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                    if(i === 8) {
                        if(fieldsArr[4] === undefined && fieldsArr[0] === undefined) {
                            arr = [4,0];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[5] === undefined && fieldsArr[2] === undefined) {
                            arr = [5,2];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                        if(fieldsArr[7] === undefined && fieldsArr[6] === undefined) {
                            arr = [7,6];
                            move = arr[Math.floor(Math.random() * arr.length)]
                        };
                    };
                };
                    
                if(move !== undefined) {
                    if(a === 2) moveWinChance = move;
                    else if(a === 1) moveLoseChance = move;
                    
                  //  console.log(`Selected from winChance() function ${a} ---> move ${move}`);
                }       
            };
            
            // Parameter = 2 --> Attack mode
            // Parameter = 1 --> Defend mode
            // Firing all functions in both modes to collect all info from game board
            attackOrDefend(2);
            attackOrDefend(1);
            winChance(2);
            winChance(1);                          
        });

            // Decision making logic (highest priority to lowest priority)
            // 1) Make winning move
            // 2) Defend from loosing
            // 3) Build winning configuration
            // 4) Interupt building winning configuration by opponent
            if(moveWin !== undefined) moveTaken = moveWin;
            else if(moveStopLose !== undefined) moveTaken = moveStopLose;
            else if(moveWinChance !== undefined) moveTaken = moveWinChance;
            else if(moveLoseChance !== undefined) moveTaken = moveLoseChance;
            
            //console.log(` WIN: ${moveWin}, STOPLOSE: ${moveStopLose}, WINchance: ${moveWinChance}, LOSEChance ${moveLoseChance}`);
        

        //setTimeout for some decision making simulation ;)
        setTimeout(function() {
          //  console.log(moveTaken);
            count++;
            fieldsArr[moveTaken] = activePlayer;
            const selected = document.getElementById(`${moveTaken+1}`);
            selected.classList.add('selected');
            selected.innerText = 'X';
            app.afterMove();       
            }, 750);
        
    };

    //Searching for winning configuration
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

    sub.makeMoveAI = makeMoveAI;
    sub.checkWinner = checkWinner;

    return app;

})(APP || {});