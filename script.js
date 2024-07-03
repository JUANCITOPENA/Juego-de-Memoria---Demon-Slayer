const characters = [
    'tanjiro', 'nezuko', 'zenitsu', 'inosuke', 'giyu', 'shinobu', 'kanao', 'rengoku'
];

const gameBoard = document.getElementById('gameBoard');
const timerElement = document.getElementById('timer');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const restartGame = document.getElementById('restartGame');
const closeGame = document.getElementById('closeGame');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeRemaining = 60;

function createBoard() {
    const cardArray = [...characters, ...characters];
    cardArray.sort(() => 0.5 - Math.random());

    cardArray.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.character = character;
        card.addEventListener('click', flipCard);

        const frontFace = document.createElement('img');
        frontFace.src = `images/${character}.jpg`;
        card.appendChild(frontFace);

        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;
        if (timeRemaining === 0) {
            clearInterval(timer);
            showModal();
        }
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.character === card2.dataset.character) {
        matchedPairs++;
        if (matchedPairs === characters.length) {
            clearInterval(timer);
            setTimeout(() => alert('¡Ganaste!'), 500);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showModal() {
    modal.style.display = 'block';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
}

restartGame.onclick = function() {
    location.reload();
}

closeGame.onclick = function() {
    window.close();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

createBoard();
