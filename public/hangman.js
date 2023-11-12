const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];

const wordDisplay = document.getElementById('word-display');
const guessesRemainingText = document.getElementById('guesses-remaining');
const keyboard = document.getElementById('keyboard');
const gameResult = document.getElementById('hangman-result'); // Hint: Identify the game result element

function startGame(word = words[Math.floor(Math.random() * words.length)], maxGuesses = 6) {
    let guessedLetters = new Set();
    let guessesRemaining = maxGuesses;

    const displayUnderscores = (word) => '_'.repeat(word.length).split('').join(' '); // Hint: Initialize word display with underscores
    wordDisplay.textContent = displayUnderscores(word);

    guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;

    const enableButtons = () => {
        const buttons = keyboard.querySelectorAll('.key');
        buttons.forEach((letterButton) => {
            if (!guessedLetters.has(letterButton.textContent)) {
                letterButton.disabled = false;
            }
        });
    };

    const disableButtons = () => {
        const buttons = keyboard.querySelectorAll('.key');
        buttons.forEach((letterButton) => {
            if (!guessedLetters.has(letterButton.textContent)) {
                letterButton.disabled = true;
            }
        });
    };

    const disableButton = (letter) => {
        const button = keyboard.querySelector(`.key[value="${letter}"]`);
        button.disabled = true;
    };

    const updateKeyboard = () => {
        const buttons = keyboard.querySelectorAll('.key');
        buttons.forEach((letterButton) => {
            if (guessedLetters.has(letterButton.textContent)) {
                letterButton.classList.add('guessed');
            } else {
                letterButton.classList.remove('guessed');
            }
        });
    };

    const processGuess = (guess) => {
        if (guessedLetters.has(guess)) {
            gameResult.textContent = 'You already guessed that letter.';
        } else if (guess.length !== 1 || !/[a-z]/.test(guess)) {
            gameResult.textContent = guess.length !== 1 ? 'Please enter a single letter.' : 'Please enter a letter.'; // Hint: Validate the guess input
        } else {
            guessedLetters.add(guess);

            if (word.includes(guess)) {
                let displayArray = wordDisplay.textContent.split(' ');
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === guess) {
                        displayArray[i] = guess;
                    }
                }
                wordDisplay.textContent = displayArray.join(' ');
                if (!wordDisplay.textContent.includes('_')) {
                    gameResult.textContent = 'Congratulations, you won!';
                    disableButtons();
                }
            } else {
                guessesRemaining--;
                guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;
                if (guessesRemaining === 0) {
                    gameResult.textContent = `Sorry, you lost. The word was "${word}".`;
                    disableButtons();
                } else {
                    gameResult.textContent = 'Incorrect guess.';
                }
            }

            disableButton(guess);
            updateKeyboard();
        }
    };

    enableButtons();

    keyboard.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('key')) {
            processGuess(target.textContent);
        }
    });

    return word;
}

startGame();
