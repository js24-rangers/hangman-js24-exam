// Array med ord
const words = [
    "tree", "book", "fish", "lion", "ship", "wolf", "star", "moon", "rock", "frog",
    "apple", "grape", "chair", "zebra", "ocean", "camel", "clock", "bread", "cloud", "piano",
    "jungle", "planet", "rocket", "guitar", "garden", "castle", "button", "school", "forest", "turtle",
    "candle", "monster", "teacher", "library", "diamond", "rainbow", "sunrise", "picture", "painter", "justice"
];


// Hangman SVG
const svgParts = [
    document.getElementById('ground'),
    document.getElementById('scaffold'),
    document.getElementById('head'),    
    document.getElementById('body'),    
    document.getElementById('arms'),    
    document.getElementById('legs')     
];

// Felbokstäver slots
const wordSlots = [
    document.getElementById('firstword'),
    document.getElementById('secondword'),  
    document.getElementById('thirdword'),
    document.getElementById('fourthword'),
    document.getElementById('fifthword'),
    document.getElementById('sixthword'),
];

// Rätt ord display
const guessedLettersDisplay = document.getElementById('guessedletters');

// Win / Loss Styling
const confetti = document.getElementById('confetti');
const outcomeText = document.getElementById('outcometext');
const theBody = document.getElementById('thebody');
const blurScreen = document.getElementById('blurscreen');
const playAgainButton = document.getElementById('playagainbtn');
const playAgainWindow = document.getElementById('playagainwindow');

// Input och Submit
const submitButton = document.getElementById('submitletter');
const inputField = document.getElementById('textfield');

// Spel variabler
const maxAttempts = svgParts.length; // Max attempts lika många som det finns SVG parts
let attempts = 0;
let guessedLetters = [];
let incorrectGuesses = [];
let currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase(); // Random formula för att ta ord från Array

// Initialize display för rätt ord och sätt understräck där bokstäverna ska vara
function initializeDisplay() {
    guessedLettersDisplay.textContent = "_ ".repeat(currentWord.length).trim(); // (kan ha .join istället)
}
initializeDisplay();

// Funktion som uppdaterar för rätt ord
function updateGuessedLettersDisplay() {
    let displayText = currentWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    guessedLettersDisplay.textContent = displayText;
}

// Funktion som displayar fel gissningar
function displayIncorrectGuess(letter) {
    if (attempts - 1 < maxAttempts) {
        wordSlots[attempts - 1].textContent = letter;
    }
    if (attempts - 1 < svgParts.length) {
        svgParts[attempts - 1].style.visibility = "visible"; // Visar en SVG del
    }
}

// Check Guess Function (Funktion som använder ovanstående funktioner för att kolla om gissningen var rätt)
function checkGuess() {
    const guess = inputField.value.toUpperCase();
    inputField.value = "";

    if (!/[A-Z]/.test(guess)) { // Kan bara skriva in bokstäver A-Z
        alert("Enter a valid letter.");
        return;
    }

    if (guessedLetters.includes(guess) || incorrectGuesses.includes(guess)) { // Om samma bokstav
        alert("You already guessed that letter!");
        return;
    }

    if (currentWord.includes(guess)) { // Om det är rätt bokstav
        guessedLetters.push(guess);
        updateGuessedLettersDisplay();
    } else {
        incorrectGuesses.push(guess);   // Om det är fel gör increment attempts + displaya fel bokstav
        attempts++;
        displayIncorrectGuess(guess);
    }

    // Win / Loss Conditions 
    if (guessedLetters.length === new Set(currentWord).size) { // Om Win
        blurScreen.style.visibility = 'visible'; // Win Screen
        outcomeText.innerHTML = `<b>You won!</b> <br> The right word was:   <b>${currentWord}</b>`; // Win Message

        theBody.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(100,237,125,1) 49%, rgba(165,237,100,1) 100%)"; // Styla bakgrunden grön
        confetti.style.visibility = 'visible'; // Visa confetti .gif
        setTimeout(() => confetti.style.visibility = 'hidden', 2500);

        playAgainWindow.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(100,237,125,1) 49%, rgba(165,237,100,1) 100%)"; // Gör Play Again rutan grön

    } else if (attempts >= maxAttempts) { // Om Loss
        blurScreen.style.visibility = 'visible'; // Loss Screen
        outcomeText.innerHTML = `<b>You lost!</b> <br> The word was:   <b>${currentWord}</b>`; // Loss Message
        theBody.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(219,100,237,1) 49%, rgba(237,100,100,1) 99%)"; // Styla bakgrunden röd
        playAgainWindow.style.background = "radial-gradient(circle, rgba(203,217,255,1) 6%, rgba(219,100,237,1) 49%, rgba(237,100,100,1) 100%)"; // Gör Play Again rutan röd
    }
}

// Reset Game Funktion
function resetGame() {
    attempts = 0;
    guessedLetters = [];
    incorrectGuesses = [];
    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    guessedLettersDisplay.textContent = "_ ".repeat(currentWord.length).trim();
    wordSlots.forEach(slot => slot.textContent = ""); // Tömmer fel gissningarna
    svgParts.forEach(part => part.style.visibility = "hidden"); // Döljer ALLA SVG delar

    theBody.style.background = 'radial-gradient(circle, rgba(145,179,240,1) 6%, rgba(100,149,237,1) 49%, rgba(100,149,237,1) 99%)'; // Gör bakgrunden blå igen

    blurScreen.style.visibility = 'hidden'; // Dölj Win/Loss rutan
    initializeDisplay();
    console.log(currentWord);
}

// Event Listeners
playAgainButton.addEventListener('click', resetGame);
submitButton.addEventListener('click', checkGuess);
inputField.addEventListener('keydown', function(event) { // Gissa bokstäver med Enter
    if (event.key === "Enter") {
        checkGuess();
    }
});

console.log(currentWord);
