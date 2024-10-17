const cards = [];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

document.addEventListener('DOMContentLoaded', function () {
    initGame();
    document.getElementById('resetButton').addEventListener('click', resetGame);
});

function initGame() {
    const gameBoard = document.getElementById("gameBoard");
    const cardValues = shuffleArray(['🍎', '🍊', '🍋', '🍌', '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍉', '🍇', '🍍', '🥝', '🍍', '🥝']);
    
    // Clear previous content
    gameBoard.innerHTML = '';
    matchedCards = 0;
    document.getElementById('message').textContent = '';

    // Create the cards
    cardValues.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Define front and back of the card
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${value}</div>
        `;

        card.addEventListener("click", flipCard);
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    playSound('clickSound');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
        matchedCards += 2;

        playSound('correctSound');

        if (matchedCards === cards.length) {
            document.getElementById('message').textContent = 'Congratulations! You matched all cards!';
            playSound('gameCompleteSound');
        }
    } else {
        unflipCards();
        playSound('wrongSound');
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    cards.forEach(card => card.classList.remove('flipped'));
    initGame();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playSound(id) {
    document.getElementById(id).play();
}
