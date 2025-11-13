// script.js (fixed)

const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isTimeOver = false;
let isPlaying = false; 
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isTimeOver = true;
        return;
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard(e) {

    const clickedCard = e.currentTarget;

    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        const cardOneIcon = cardOne.querySelector(".back-view i").className;
        const cardTwoIcon = cardTwo.querySelector(".back-view i").className;

        matchCards(cardOneIcon, cardTwoIcon);
    }
}

function matchCards(icon1, icon2) {
    if (icon1 === icon2) {
        matchedCards++;
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;

        if (matchedCards === 6 && timeLeft > 0) {
            clearInterval(timer);
            isPlaying = false;
        }
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCards() {
    timeLeft = maxTime;
    flips = 0;
    matchedCards = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    isPlaying = false;
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isTimeOver = false;

    let arr = [
        "bx bxl-tiktok",
        "bx bxl-instagram-alt",
        "bx bxl-facebook-circle",
        "bx bxl-twitter",
        "bx bxl-whatsapp",
        "bx bxl-youtube",
        "bx bxl-tiktok",
        "bx bxl-instagram-alt",
        "bx bxl-facebook-circle",
        "bx bxl-twitter",
        "bx bxl-whatsapp",
        "bx bxl-youtube"
    ];

    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        const iconTag = card.querySelector(".back-view i");

        iconTag.className = arr[index];

        card.removeEventListener("click", flipCard);
        card.addEventListener("click", flipCard);
    });
}

shuffleCards();

refreshBtn.addEventListener("click", shuffleCards);


