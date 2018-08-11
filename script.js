/*Java script*/


// card variable
let kolory = ["kier", "trefl", "Karo", "Pik"],
    figury = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jopek", "Dama", "Krol", "AS"];


//DOM variable
let textArea = document.getElementById("text-area"),
    newGame = document.getElementById("new-game-button"),
    hit = document.getElementById("hit-button"),
    stay = document.getElementById("stay-button");

//Game variable
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

newGame.addEventListener("click", function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    deck = createDeck();
    shuffleCards(deck);
    dealerCards = [nextCard(), nextCard()];
    playerCards = [nextCard(), nextCard()];

    newGame.style.display = "none";
    hit.style.display = 'inline';
    stay.style.display = 'inline';
    showStatus();
});

hit.addEventListener("click", function () {
    playerCards.push(nextCard());
    checkForEndOfGame();
    showStatus();
});
stay.addEventListener("click", function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function checkForEndOfGame() {
    updateScore();
    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(nextCard());
            updateScore();
        }
    }
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }

    }
}

function createDeck() {
    let talia = [];
    for (let i = 0; i < kolory.length; i++) {

        for (let j = 0; j < figury.length; j++) {
            let card = {
                kolor: kolory[i],
                figura: figury[j]
            };
            talia.push(card);
        }
    }
    return talia;
}

function shuffleCards(deck) {
    for (let i = 0; i < deck.length; i++) {
        let random = Math.trunc(Math.random() * deck.length);
        let tmp = deck[i];
        deck[i] = deck[random];
        deck[random] = tmp;

    }
}

function getCardString(card) {
    return card.figura + " " + card.kolor;
}

function getCardScore(card) {
    switch (card.figura) {
        case "AS":
            return 1;
        case "2":
            return 2;
        case "3":
            return 3;
        case"4":
            return 4;
        case"5":
            return 5;
        case"6":
            return 6;
        case"7":
            return 7;
        case"8":
            return 8;
        case"9":
            return 9;
        default:
            return 10;
    }


}


function getScore(cardArray) {
    let score = 0;

    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];

        score += getCardScore(card);

        if (card.figura === "AS") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScore() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function nextCard() {
    return deck.shift();
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Witaj";
        return;
    }

    let dealerCardsString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsString += getCardString(dealerCards[i]) + "\n";
    }

    let playerCardsString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsString += getCardString(playerCards[i]) + "\n";
    }
    updateScore();


    textArea.innerText =
        "Dealer ma \n" +
        dealerCardsString +
        "(Score: " + dealerScore + ")\n\n" +


        "Ty masz \n" +
        playerCardsString +
        "(Score: " + playerScore + ")\n\n";

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "Wygrales!";
        }
        else {
            textArea.innerText += "Dealer wygrywa!";


        }
        newGame.style.display = "inline";
        hit.style.display = "none";
        stay.style.display = "none";
    }

}



















