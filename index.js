let computerScore = 0;
let userScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].toLowerCase();
}
function getUserChoice() {
    let userChoice = prompt("Please enter your choice (rock, paper, or scissors): ");
    while (userChoice.toLocaleLowerCase() !== 'rock' && userChoice.toLocaleLowerCase() !== 'paper' && userChoice.toLocaleLowerCase() !== 'scissors') {
        userChoice = prompt("Please enter a valid choice (rock, paper, or scissors): ");
    }
    return userChoice.toLowerCase();
}

function playRound(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        console.log("Tie!");
    } else if (userChoice === 'rock' && computerChoice === 'scissors' || userChoice === 'paper' && computerChoice === 'rock' || userChoice === 'scissors' && computerChoice === 'paper') {
        console.log("User wins!");
        userScore++;
    } else {
        console.log("Computer wins!");
        computerScore++;
    }
}
function playGame() {
    for (let i = 0; i < 5; i++) {
        const userChoice = getUserChoice();
        const computerChoice = getComputerChoice();
        playRound(userChoice, computerChoice);
        if (userScore === 5) {
            console.log("User wins!");
            break;
        } else if (computerScore === 5) {
            console.log("Computer wins!");
            break;
        }
    }
}

playGame();
console.log("User score: " + userScore);
console.log("Computer score: " + computerScore);
if (userScore > computerScore) {
    console.log("User wins!");
} else if (computerScore > userScore) {
    console.log("Computer wins!");
} else {
    console.log("Tie!");
}