const words = [
    "apple", "banana", "orange", "grape", "cherry",
    "mango", "peach", "pear", "plum", "kiwi",
    "lemon", "lime", "melon", "carrot", "potato",
    "tomato", "cucumber", "onion", "garlic", "lettuce",
    "spinach", "broccoli", "pepper", "cabbage", "zucchini",
    "eggplant", "cereal", "bread", "butter", "cheese",
    "milk", "yogurt", "ice cream", "cake", "cookie",
    "chocolate", "candy", "popcorn", "soda", "coffee",
    "tea", "juice", "water", "salt", "pepper",
    "sugar", "honey", "sauce", "spice", "soup",
    "salad", "sandwich", "pizza", "pasta", "rice",
    "noodle", "breakfast", "lunch", "dinner", "snack",
    "fruit", "vegetable", "dessert", "restaurant", "market",
    "grocery", "shopping", "kitchen", "recipe", "cook",
    "bake", "fry", "boil", "grill", "slice",
    "chop", "mix", "stir", "serve", "plate",
    "fork", "spoon", "knife", "glass", "cup",
    "bowl", "pan", "pot", "oven", "stove",
    "microwave", "toaster", "blender", "whisk", "grater",
    "dog", "cat", "fish", "bird", "horse",
    "elephant", "tiger", "lion", "bear", "monkey",
    "zebra", "giraffe", "kangaroo", "rabbit", "deer",
    "frog", "snake", "turtle", "lizard", "whale",
    "dolphin", "shark", "octopus", "crab", "seal",
    "chicken", "duck", "goose", "turkey", "pig",
    "cow", "sheep", "goat", "horse", "donkey",
    "mouse", "rat", "squirrel", "bat", "insect",
    "spider", "ant", "bee", "butterfly", "ladybug",
    "tree", "bush", "flower", "grass", "leaf",
    "mountain", "river", "lake", "ocean", "sea",
    "sky", "cloud", "rain", "snow", "wind",
    "sun", "moon", "star", "planet", "universe",
    "city", "town", "village", "street", "road",
    "building", "house", "apartment", "hotel", "school",
    "library", "park", "garden", "playground", "zoo",
    "museum", "theater", "stadium", "shop", "market",
    "bus", "car", "train", "bicycle", "motorcycle",
    "airplane", "boat", "ship", "submarine", "helicopter",
    "rocket", "taxi", "traffic", "road", "sign",
    "computer", "phone", "tablet", "television", "radio",
    "camera", "printer", "monitor", "keyboard", "mouse",
    "clock", "watch", "calendar", "notebook", "pen",
    "pencil", "eraser", "scissors", "glue", "paper",
    "book", "magazine", "newspaper", "letter", "envelope",
    "gift", "present", "toy", "game", "puzzle",
    "art", "craft", "music", "dance", "theater",
    "movie", "play", "concert", "opera", "museum",
    "exhibition", "festival", "holiday", "celebration", "tradition",
    "family", "friend", "school", "teacher", "student",
    "job", "work", "office", "meeting", "project"
];

let currentWord = "";
let guessedLetters = [];
let attempts = 6;

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attempts = 6;
    updateDisplay();
    document.getElementById("message").innerText = "";
}

function updateDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    const letterButtons = document.getElementById("letterButtons");
    const guessesRemaining = document.getElementById("guessesRemaining");

    wordDisplay.innerHTML = currentWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');

    letterButtons.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.addEventListener('click', () => guessLetter(letter.toLowerCase()));
        letterButtons.appendChild(button);
    });

    guessesRemaining.innerText = `Attempts Remaining: ${attempts}`;
}

function guessLetter(letter) {
    if (!currentWord.includes(letter)) {
        attempts--;
    }
    guessedLetters.push(letter);
    updateDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (attempts <= 0) {
        document.getElementById("message").innerText = "Game Over! The word was: " + currentWord;
    } else if (currentWord.split('').every(letter => guessedLetters.includes(letter))) {
        document.getElementById("message").innerText = "Congratulations! You guessed the word!";
    }
}

document.getElementById("resetButton").addEventListener("click", startGame);

window.onload = startGame;
