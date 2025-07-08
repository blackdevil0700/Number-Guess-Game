const numInput = document.querySelector(".guessField");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".prev-guess");
const lastResult = document.querySelector(".guesses-remaining");
const lowOrHi = document.querySelector(".low-or-high");
const startover = document.querySelector(".resultpara");

let randomnum = Math.floor(Math.random() * 100 + 1);
let prevGuess = [];
let numGuess = 1;
let playGame = true;

// Add event listener correctly
if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        const guess = parseInt(numInput.value);
        validCheck(guess);
    });
}

function validCheck(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100");
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) {
            if(prevGuess[9] === randomnum) {
                displayGuess(guess);
                displayMessage(`Congratulations! You guessed the number ${randomnum} correctly!`);
                endgame();
            } else {
                displayGuess(guess);
                displayMessage(`Game over! The correct number was ${randomnum}.`);
                endgame();
            }
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomnum) {
        displayMessage(`Congratulations! You guessed the number ${randomnum} correctly!`);
        endgame();
    } else if (guess < randomnum) {
        displayMessage("Your guess is too low!");
    } else {
        displayMessage("Your guess is too high!");
    }
}

function displayGuess(guess) {
    numInput.value = "";
    guessSlot.innerHTML += `[${guess}] `;
    lastResult.innerHTML = `${10-numGuess}`;
    numGuess++;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
    numInput.setAttribute("disabled", "");
    const p = document.createElement("p");
    p.classList.add('button');
    p.innerHTML = "<h2 id='new-game'>Start New Game</h2>";
    startover.appendChild(p);
    playGame = false;

    const newGameButton = document.querySelector("#new-game");
    newGameButton.addEventListener("click", function () {
        resetGame();
    });
}
    

function resetGame() {
    randomnum = Math.floor(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    lastResult.innerHTML = "";
    lowOrHi.innerHTML = "";
    numInput.removeAttribute("disabled");
    startover.removeChild(document.querySelector(".button"));
    playGame = true;
}
