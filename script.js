/*Java script*/

let deck = [
    "As pik",
    "2 pik",
    "3 pik"

];
let kolory = ["Serce", "Trefl", "Karo", "Pik"];
let figury = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jopek", "Dama", "Krol", "AS"];
figury.reverse();

function createDeck() {
    for (let i = 0; i < kolory.length; i++) {
        let talia = [];
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

function nextCard {
    return talia.shift();
}

let talia = createDeck();

let kartyGracza = [nextCard(),nextCard()];







