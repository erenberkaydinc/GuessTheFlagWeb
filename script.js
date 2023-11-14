// Elements
const startButton = document.getElementById('start-button');
const app = document.querySelector('.app');
const body = document.body;
let gamebody;
let titleHeader;
let questionsAnsweredText;
let scoreText;
let highScoreText;

let numberOfQuestionsInput;
let numberOfToursLeft;

// All countries & flags in the game
const countries = [
    "estonia",
    "france",
    "germany",
    "ireland",
    "canada",
    "belgium",
    "ukraine",
    "hungary",
    "netherlands",
    "sweden",
    "bulgaria",
    "finland",
    "mexico",
    "italy",
    "monaco",
    "nigeria",
    "poland",
    "spain",
    "united states",
    "united kingdom",
    "turkiye",
    "australia",
    "azerbajian",
    "brazil",
    "kazakhstan",
    "kyrgyzstan",
    "uzbekistan",
   
    
];

// Flag Animation 
let animationIntervalId;
const startAnimation = function changeFlag() {
    let counter = 0;
    animationIntervalId = setInterval(() => {
        document.getElementById('flag-image').src = `assets/flags/${countries[counter]}.png`;
        counter = (counter + 1) % countries.length;
    }, 1000);
}
const stopAnimation = function() {
    clearInterval(animationIntervalId);
}

// Load high score from local storage , if there is no high score set it to 0
let highScore = localStorage.getItem('highScore') || 0;

// Function to update high score and update it in local storage
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreText.textContent = `High Score: ${highScore}`;
    }
}

// Function to update number of tours and update it in local storage
function updateNumberOfTours() {
    numberOfTours++;
    localStorage.setItem('numberOfTours', numberOfTours);
    numberOfToursText.textContent = `Number of tours: ${numberOfTours}`;
}

// Shuffle Array mechanism to shuffle countries array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to reset game after each question , -- Next tour --
function resetGame() {
    shuffleArray(countries);
    correctAnswer = Math.floor(Math.random() * 4); // Number between 0-3
    titleHeader.textContent = countries[correctAnswer].toUpperCase();

    document.querySelectorAll('.flag-col img').forEach((img, index) => {
        img.src = `assets/flags/${countries[index]}.png`;
    });
}

// Function to fully reset game , -- Fully Reset game --
function fullReset() {
    score = 0;
    questionsAnswered = 0;
    scoreText.textContent = `Score: ${score}`;
    questionsAnsweredText.textContent = `Question answered: ${questionsAnswered}`;
    numberOfToursLeft.textContent = `${numberOfQuestionsInput - questionsAnswered} Rounds Left`;
    resetGame();
    window.alert('Game resetted!');
}

function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

function updateTexts({isCorrect}) {
    if(isCorrect) {
        // Correct answer
        score++;
        questionsAnswered++;
        titleHeader.textContent = `Correct! +1`;
        scoreText.textContent = `Score: ${score}`;
        questionsAnsweredText.textContent = `Question answered: ${questionsAnswered}`;
        titleHeader.classList.add('text-success');

        setTimeout(function() {
         document.querySelector('.text-success').classList.remove('text-success');
         }, 900);
    } else {
        // Wrong answer
        score--;
        questionsAnswered++;
        titleHeader.textContent = `Wrong! -1`;
        scoreText.textContent = `Score: ${score}`;
        questionsAnsweredText.textContent = `Question answered: ${questionsAnswered}`;
        titleHeader.classList.add('text-danger');

        setTimeout(function() {
            document.querySelector('.text-danger').classList.remove('text-danger');
        }, 900);
    }
    numberOfToursLeft.textContent = `${numberOfQuestionsInput - questionsAnswered} Rounds Left`;
}

function attachListeners({numberOfQuestionsInput}) {
    document.querySelectorAll('.flag-col img').forEach((img, index) => {
        img.addEventListener('click', function () {
            
            if (questionsAnswered != Number(numberOfQuestionsInput) ) {
                chosenCountry = countries[index];
                if (chosenCountry === countries[correctAnswer]) {
                    updateTexts({isCorrect: true});
                } else {
                    updateTexts({isCorrect: false});
                }

                // Next flag again after 1.2 second
                setTimeout(() => {
                    resetGame();
                    updateHighScore();
                }, 1200);

            } else {
                updateHighScore();
                window.alert(`Game over! Your score is ${score}!`);
                fullReset();
            }

        });
    });
}

// Game Logic
let score = 0;
let correctAnswer;
let questionsAnswered = 0;

// Starting game 
startButton.addEventListener('click', function () {
    numberOfQuestionsInput = document.getElementById('questions-input').value;
    
    if(numberOfQuestionsInput != 0 && numberOfQuestionsInput != null && numberOfQuestionsInput != undefined) {
        stopAnimation();
        
        app.innerHTML = '';
        
        shuffleArray(countries);
        correctAnswer = Math.floor(Math.random() * 4); // Number between 0-3

        // Create a container div for the game
        const gameContainer = document.createElement('div');
        gameContainer.className = 'text-center';
        gameContainer.innerHTML = `
            <h1 id="title-header" class ="col display-3" > Choose </h1>
        
            <div class="container p-2">
                <div class="row justify-content-center p-1">
                    <div class="col-md-4">
                        <h3 class="score p-2"> Score: ${score}</h3>
                    </div>
                    <div class="col-md-4">
                        <h3 class="question-answered p-1 text-secondary"> Question answered: ${questionsAnswered}</h3>
                    </div>
                    <div class="col-md-4">
                        <h3 id="high-score" class="p-1 text-success"> High Score: ${highScore}</h3>
                    </div>
                </div>
                <h3 class="rounds-left p-2">${numberOfQuestionsInput - questionsAnswered} Rounds Left</h3>
                <button id="reset-button" class="btn btn-outline-danger btn-md btn-block" type="button">Reset game</button>
                <div class="row game-body">
                    <div class="col flag-col">
                        <img src="assets/flags/${getRandomCountry()}.png" alt="flag" id="flag-image">
                    </div>
                    <div class="col flag-col">
                        <img src="assets/flags/${getRandomCountry()}.png" alt="flag" id="flag-image">
                    </div>
                    <div class="w-100"></div>
                    <div class="col flag-col">
                        <img src="assets/flags/${getRandomCountry()}.png" alt="flag" id="flag-image">
                    </div>
                    <div class="col flag-col">
                        <img src="assets/flags/${getRandomCountry()}.png" alt="flag" id="flag-image">
                    </div>
                </div>
                
            </div>
        `;
        
        app.appendChild(gameContainer);
        const resetButton = document.getElementById('reset-button');

        // Fully Resetting game except highscore
        resetButton.addEventListener('click', function () {
            fullReset();
        });

        titleHeader = document.getElementById('title-header');
        questionsAnsweredText = document.querySelector('.question-answered');
        scoreText = document.querySelector('.score');
        highScoreText = document.getElementById('high-score');
        numberOfToursLeft = document.querySelector('.rounds-left');

        resetGame();
        attachListeners({numberOfQuestionsInput: numberOfQuestionsInput});

    } else {
        window.alert('Please enter a valid number!');
    }
});


startAnimation();