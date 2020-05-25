const settingsBtn = document.getElementById('settings-btn');
const selectDifficulty = document.getElementById('difficulty');
const word = document.querySelector('.word');
const wordInput = document.querySelector('.text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const loader = document.querySelector('.loader');
const endGameEl = document.getElementById('end-game-container');


// Words container
let words;

let timeInterval;
let score;
let time;

// Get random words from API
async function getWords() {
    try {
        loader.style.opacity = '1';
        const res = await fetch('https://random-word-api.herokuapp.com/word?number=50');
        words = await res.json();
        loader.style.opacity = '0';
    } catch (error) {
        alert(error);
    }   
};

// Display word in UI
function renderRandomWord() {
    word.innerHTML = words[Math.floor(Math.random() * words.length)].toUpperCase();
};

// Check if correct word is entered
function matchWords(e) {
    const input = e.target.value.toUpperCase();
    if(input === word.innerText) {
        updateScore();
        clearInput();
        renderRandomWord();
        addTime();
    }
};

// Update score and display it in UI
function updateScore() {
    score++;
    scoreEl.innerText = score;   
};

// Update time and display it in UI
function updateTime() {
    time--;
    timeEl.innerText = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
};

// Add time after entering correct word
function addTime() {
    if (selectDifficulty.value === 'easy') {
        time += 5;
    } else if (selectDifficulty.value === 'medium') {
        time += 3;
    } else if (selectDifficulty.value === 'hard') time += 2;
};

// End game when time is up
function gameOver() {
    endGameEl.innerHTML = `
            <h1>Time ran out!</h1>
            <p>Your final score is ${score}</p>
            <button class="again">Play again</button>
        `;

    endGameEl.style.display = 'flex';
};

// Clear word input
function clearInput() {
    wordInput.value = '';
};

// Initialize game
async function init() {
    score = 0;
    scoreEl.innerHTML = score;
    time = 10;
    timeEl.innerHTML = time;
    wordInput.focus();
    clearInput();
    timeInterval = setInterval(updateTime, 1000);
    endGameEl.style.display = 'none';
    await getWords();
    renderRandomWord();
};

init();

// Event listeners
wordInput.addEventListener('input', matchWords);
document.addEventListener('click', e => {
    if(e.target.className === 'again') {
        init();
    }
});