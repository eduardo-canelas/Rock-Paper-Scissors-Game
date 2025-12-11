let computerScore = 0;
let userScore = 0;
let currentRound = 1;
let battleHistory = [];

const btn = document.querySelectorAll(".button");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const userSelectionDisplay = document.querySelector("#userSelection");
const computerSelectionDisplay = document.querySelector("#computerSelection");
const playerScore = document.querySelector("#userScore");
const rivalScore = document.querySelector("#computerScore");
const resultDisplay = document.querySelector("#result");
const roundMark = document.querySelector("#roundTitle");
const battleHistoryList = document.querySelector("#battleHistoryList");
const replayButton = document.querySelector("#replayButton");

// Add click event listeners to all buttons (only once!)
btn.forEach(button => {
    button.addEventListener("click", () => {

        const userChoice = button.id;
        const computerChoice = getComputerChoice();

        // Display the choices
        displayUserChoice(userChoice);
        displayComputerChoice(computerChoice);

        // Play the round and get result
        const roundResult = playRound(userChoice, computerChoice);

        // Update scores
        updateScores();

        // Update round mark
        roundMark.textContent = `Round: ${currentRound}`;

        // Add to battle history
        addBattleToHistory(currentRound, userChoice, computerChoice, roundResult);

        // Increment round counter
        currentRound++;

        // Check if game is over (after 5 rounds)
        // Check if game is already over
        if (userScore >= 5 || computerScore >= 5) {
            endGame();
        }
    });
});
replayButton.addEventListener("click", () => resetGame());

function resetGame() {
    // Reset variables
    userScore = 0;
    computerScore = 0;
    currentRound = 1;
    battleHistory = [];

    // Reset score display
    playerScore.textContent = 'User';
    rivalScore.textContent = 'Computer';
    playerScore.setAttribute('data-score', '0');
    rivalScore.setAttribute('data-score', '0');

    // Clear selections
    userSelectionDisplay.textContent = '';
    computerSelectionDisplay.textContent = '';

    // Clear round title
    roundMark.textContent = '';

    // Clear result
    resultDisplay.textContent = '';

    // Clear battle history display
    battleHistoryList.innerHTML = '<p class="emptyState">Start playing to see battle history</p>';

    // Re-enable buttons
    btn.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    });
}
function getComputerChoice() {
    const choices = [rock.id, paper.id, scissors.id];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function displayUserChoice(userChoice) {
    userSelectionDisplay.textContent = userChoice;
}

function displayComputerChoice(computerChoice) {
    computerSelectionDisplay.textContent = computerChoice;
}

function playRound(userChoice, computerChoice) {
    let result;
    if (userChoice === computerChoice) {
        resultDisplay.textContent = "It's a tie!";
        result = 'tie';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultDisplay.textContent = "You win this round!";
        userScore++;
        result = 'win';
    } else {
        resultDisplay.textContent = "Computer wins this round!";
        computerScore++;
        result = 'lose';
    }
    return result;
}

function updateScores() {
    // Update text
    playerScore.textContent = `User`;
    rivalScore.textContent = `Computer`;

    // Update data attributes for ::after display
    playerScore.setAttribute('data-score', userScore);
    rivalScore.setAttribute('data-score', computerScore);

    // Add pulse animation
    playerScore.classList.add('pulse');
    rivalScore.classList.add('pulse');

    // Remove pulse class after animation
    setTimeout(() => {
        playerScore.classList.remove('pulse');
        rivalScore.classList.remove('pulse');
    }, 500);
}

function endGame() {
    // Disable all buttons
    btn.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
    });

    // Display final winner
    roundMark.textContent = "Game Over!";

    if (userScore > computerScore) {
        resultDisplay.textContent = `🎉 You won the game! Final score: ${userScore} - ${computerScore}`;
    } else if (computerScore > userScore) {
        resultDisplay.textContent = `😔 Computer won the game! Final score: ${userScore} - ${computerScore}`;
    } else {
        resultDisplay.textContent = `🤝 It's a tie game! Final score: ${userScore} - ${computerScore}`;
    }
}

// Map choice to emoji
function getEmoji(choice) {
    const emojiMap = {
        'rock': '🪨',
        'paper': '📄',
        'scissors': '✂️'
    };
    return emojiMap[choice] || choice;
}

// Add battle to history display
function addBattleToHistory(round, userChoice, computerChoice, result) {
    // Clear empty state on first battle
    if (battleHistory.length === 0) {
        battleHistoryList.innerHTML = '';
    }

    // Create battle item
    const battleItem = document.createElement('div');
    battleItem.className = `battleItem ${result}`;

    const resultText = result === 'win' ? 'WIN' : result === 'lose' ? 'LOSE' : 'TIE';

    battleItem.innerHTML = `
        <span class="battleRound">Round ${round}</span>
        <div class="battleChoices">
            <span class="battleEmoji">${getEmoji(userChoice)}</span>
            <span class="battleVs">VS</span>
            <span class="battleEmoji">${getEmoji(computerChoice)}</span>
        </div>
        <span class="battleResult">${resultText}</span>
    `;

    // Add to history list
    battleHistoryList.appendChild(battleItem);

    // Scroll to bottom
    battleHistoryList.scrollTop = battleHistoryList.scrollHeight;

    // Store in history array
    battleHistory.push({ round, userChoice, computerChoice, result });
}

// ===== ANTIGRAVITY PARALLAX EFFECT =====
// Mouse-based parallax movement for buttons
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function applyParallax() {
    btn.forEach((button, index) => {
        // Different movement speed for each button
        const speedMultiplier = (index + 1) * 5;
        const moveX = mouseX * speedMultiplier;
        const moveY = mouseY * speedMultiplier;

        // Apply parallax transform (doesn't interfere with floating animation)
        button.style.setProperty('--parallax-x', `${moveX}px`);
        button.style.setProperty('--parallax-y', `${moveY}px`);
    });

    requestAnimationFrame(applyParallax);
}

// Start parallax animation loop
applyParallax();