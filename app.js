// GAME FUNCTION:
// Player must guess a number between a min and a max
// Player gets a certain amount of guesses
// Notify Player of guesses remaining
// Notify Player of the correct answer if they lose
// Let Player choose to play again


// game values
let min = 1, 
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 5;
    // console.log(winningNum);
    
// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');

    // Assign min UI min & max

    minNum.textContent = min;
    maxNum.textContent = max;

    // event listener- play again
    guessBtn.addEventListener('mousedown', function(e){
        if(e.target.classList.contains('play-again')) {
            window.location.reload();
            
        }
    });

    // Event listener - guess
    guessBtn.addEventListener('click', function() {
        
        let guess = parseInt(guessInput.value);

        // validate guess
        if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        }

        // check if won
        if(guess === winningNum){
            
            gameOver(true, `${winningNum} is correct number! Well done, you win!`);

        } else {

            // If wrong number
            guessesLeft -= 1;
            
            // if last guess
            if(guessesLeft <= 0) {

                gameOver(false, `You are out of guesses, the winning number was ${winningNum}, better luck next time!`);

            } else {

                setMessage(`That is incorrect, please try again, you have ${guessesLeft} guesses left`, 'red');
    
                guessInput.value = '';

            }


        }
    });

    // get random number to start game
    function getRandomNumber(min,max){
        
        return Math.floor(Math.random()*(max-min+1)+min);
        
    }

    // set message
    function setMessage(msg, color) {
        
        message.style.color = color;
        message.textContent = msg;
    }

    // game over win/lose
    function gameOver(won, msg) {
        
        let color;
        won === true ? color = 'green' : color = "red";
        
        // disable input
            guessInput.disabled = true;
            
            // green border and message
            guessInput.style.borderColor = color;
            setMessage(msg, color);
            
            // change submit to play again
            guessBtn.value = 'Play again?';
            guessBtn.style.background = color;
            guessBtn.style.color = 'white';
            guessBtn.className += ' play-again';

    }