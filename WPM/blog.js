const typingArea = document.getElementById('typingArea');
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');

let timeLeft = 60;
let timer;
let isRunning = false;
let wordsTyped = 0;

// Start the typing test
startButton.addEventListener('click', () => {
    if (!isRunning) {
        typingArea.disabled = false;
        typingArea.focus();
        startButton.disabled = true;
        startTimer();
        isRunning = true;
    }
});

// Start the timer and update the display
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            typingArea.disabled = true;
            startButton.disabled = false;
            calculateWPM();
            isRunning = false;
        }
    }, 1000);
}

// Count words as user types
typingArea.addEventListener('input', () => {
    const text = typingArea.value.trim();
    wordsTyped = text.split(/\s+/).filter(word => word.length > 0).length;
});

// Calculate WPM
function calculateWPM() {
    const wpm = (wordsTyped / (60 - timeLeft)) * 60;
    wpmDisplay.textContent = `WPM: ${Math.round(wpm)}`;
}

