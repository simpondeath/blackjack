let menuContainer = document.querySelector('.menu-container');
let gameContainer = document.querySelector('.game-container');
let startBtn = document.getElementById('start-btn');
let quitBtn = document.getElementById('quit-btn');
let displayCards = document.getElementById('display-cards');
let displaySum = document.getElementById('display-sum');
let newCardBtn = document.getElementById('new-card-btn');
let playerInfo = document.getElementById('player-info')
let startGameBtn = document.getElementById('start-game-btn');
let replayBtn = document.getElementById('replay-btn');
let button = document.querySelector('.button');
// -----------------------------------------------------------------------
let firstCard   = 0;
let secondCard = 0;
let cards = [];
let sum = 0;
// -----------------------------------------------------------------------
let isAlive = false;
let hasBlackjack = false;
// -----------------------------------------------------------------------
    


function getRandomNumber()
{   
    let randomNumber = Math.floor(Math.random()*13) + 1;
    if (randomNumber > 10)
    {
        return 13;
    }
    else if (randomNumber === 1)
    {
        return 11
    }
    else
    {
        return randomNumber;
    }
}

startGameBtn.addEventListener("click", ()=>
{
    startGame();
    startGameBtn.classList.add('hide');
    newCardBtn.classList.add('visible');
}
)


function loadDeck()
{
    menuContainer.classList.add('hide');
    gameContainer.classList.add('visible');
}

function startGame()
{
    firstCard = getRandomNumber();
    secondCard = getRandomNumber();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    isAlive = true;
    renderGame();
}

function resetStats()
{
    firstCard = 0;
    secondCard = 0;
    cards = [];
    sum = 0;
    isAlive = false;
    hasBlackjack = false;
    startGameBtn.classList.remove('hide');
    newCardBtn.classList.remove('visible'); 
    replayBtn.classList.remove('visible');
    renderGame();
}

function renderGame()
{   
    displayCards.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++)
    {
        displayCards.textContent += cards[i] + " ";
    }

    if (firstCard + secondCard > 21 || firstCard + secondCard === 21)
    {
        resetStats();
    }

    displaySum.textContent = 'Sum: ' + sum;
    if (sum < 21)
    {
        playerInfo.textContent = "Pick New Card";
        hasBlackjack = false;
        isAlive = true;
    }
    else if (sum === 21)
    {
        playerInfo.textContent = "BLACKJACK";
        hasBlackjack = true;
        isAlive = true;
    }
    else
    {
        playerInfo.textContent = "You Lost";
        hasBlackjack = false;
        isAlive = false;
    }

    if (hasBlackjack === true && isAlive === true)
    {
        replayBtn.classList.add("visible");
        quitBtn.classList.add("visible");
        newCardBtn.classList.remove("visible");
    }

    else if (hasBlackjack === false && isAlive === false)
    {
        replayBtn.classList.add("visible");
        quitBtn.classList.add("visible");
        newCardBtn.classList.remove("visible");
    }

}

function newCard()
{   
    if (isAlive === true && hasBlackjack === false)
    {
        let newCard = getRandomNumber();
        sum += newCard;
        cards.push(newCard);
        console.log(cards);
        console.log(sum);
        renderGame();
    }
}

function quitGame()
{   
    gameContainer.classList.remove('visible');
    menuContainer.classList.remove('hide');
    // newCardBtn.classList.add('visible');
    resetStats();
}

function replayGame()
{
    resetStats();
    replayBtn.classList.remove('visible');
}