"use strict";
// let state: string[][] = [
//     ['empty', 'empty', 'empty', 'empty'],
//     ['empty', 'empty', 'empty', 'empty'],
//     ['empty', 'empty', 'empty', 'empty'],
//     ['empty', 'empty', 'empty', 'empty']];
var Moves;
(function (Moves) {
    Moves[Moves["UP"] = 0] = "UP";
    Moves[Moves["RIGHT"] = 1] = "RIGHT";
    Moves[Moves["DOWN"] = 2] = "DOWN";
    Moves[Moves["LEFT"] = 3] = "LEFT";
})(Moves || (Moves = {}));
class Game {
    // INITIAL STATE
    constructor() {
        // 0 represents empty square,
        // true game status - game is still going, false - game over
        this.state = new Array(16).fill(0);
        this.gameStatus = true;
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem("highScore") || "0");
        // add random inital block value
        this.addRandomTile();
    }
    // PRINT THE BOARD IN THE CONSOLE
    printState() {
        let temp = [];
        this.state.forEach((el, i) => {
            temp.push(el);
            if ((i + 1) % 4 == 0) {
                console.log(temp);
                temp = [];
            }
        });
        console.log("");
    }
    // GET THE STATE
    getCurrentState() {
        return this.state;
    }
    // GET THE SCORE
    getScore() {
        return this.score;
    }
    // UPDATE THE SCORE
    updateScore() {
        this.score = this.state.reduce((curr, prev) => curr + prev, 0);
        this.updateHighScore();
    }
    // GET THE HIGHSCORE
    getHighScore() {
        return this.highScore;
    }
    // UPDATE THE HIGHSCORE
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
        }
    }
    // CHECK IF GAME IS STILL ACTIVE
    isGameActive() {
        let result = this.gameStatus;
        // UPDATE THE HIGHSCORE IF THE GAME IS FINISHED
        if (!this.gameStatus)
            this.updateHighScore();
        return result;
    }
    // ADD RANDOM TILE IN EMPTY SLOT
    addRandomTile() {
        if (!this.gameStatus)
            return;
        let emptyTiles = [];
        this.state.forEach((el, i) => {
            if (el === 0)
                emptyTiles.push(i);
        });
        let index = Math.floor((Math.random() * emptyTiles.length));
        this.state[emptyTiles[index]] = Math.random() < 0.9 ? 2 : 4;
    }
    // CHECK WIN CONDITION - BOARD CONTAINS 2048
    checkIfWon() {
        let result = this.state.includes(2048);
        if (result)
            this.gameStatus = false;
        return result;
    }
    // CHECK LOSE CONDITION - NO EMPTY SLOTS
    checkIfLost() {
        let result = this.state.filter(x => x === 0).length === 0;
        if (result)
            this.gameStatus = false;
        return result;
    }
    // MOVE LEFT ACTION
    moveLeft() {
        if (!this.gameStatus)
            return;
        for (let row = 0; row < 4; row++) {
            let newRow = [];
            let mergeNew = false;
            for (let col = 0; col < 4; col++) {
                let index = row * 4 + col;
                if (this.state[index] !== 0) {
                    let len = newRow.length;
                    if (len > 0 && newRow[len - 1] === this.state[index] && !mergeNew) {
                        newRow[len - 1] *= 2;
                        mergeNew = true;
                    }
                    else {
                        newRow.push(this.state[index]);
                        mergeNew = false;
                    }
                }
            }
            for (let i = newRow.length; i < 4; i++)
                newRow.push(0);
            for (let col = 0; col < 4; col++) {
                this.state[row * 4 + col] = newRow[col];
            }
        }
    }
    // MOVE RIGHT ACTION
    moveRight() {
        if (!this.gameStatus)
            return;
        for (let row = 0; row < 4; row++) {
            let newRow = [];
            let mergeNew = false;
            for (let col = 3; col >= 0; col--) {
                let index = row * 4 + col;
                if (this.state[index] !== 0) {
                    let len = newRow.length;
                    if (len > 0 && newRow[len - 1] === this.state[index] && !mergeNew) {
                        newRow[len - 1] *= 2;
                        mergeNew = true;
                    }
                    else {
                        newRow.push(this.state[index]);
                        mergeNew = false;
                    }
                }
            }
            // [0 0 2 4]  , [4 2 0 0]
            for (let i = newRow.length; i < 4; i++)
                newRow.push(0);
            for (let col = 3, i = 0; col >= 0; col--, i++) {
                this.state[row * 4 + col] = newRow[i];
            }
        }
    }
    // MOVE UP ACTION
    moveUp() {
        if (!this.gameStatus)
            return;
        for (let col = 0; col < 4; col++) {
            let newRow = [];
            let mergeNew = false;
            for (let row = 0; row < 4; row++) {
                let index = row * 4 + col;
                if (this.state[index] !== 0) {
                    let len = newRow.length;
                    if (len > 0 && newRow[len - 1] === this.state[index] && !mergeNew) {
                        newRow[len - 1] *= 2;
                        mergeNew = true;
                    }
                    else {
                        newRow.push(this.state[index]);
                        mergeNew = false;
                    }
                }
            }
            for (let i = newRow.length; i < 4; i++)
                newRow.push(0);
            for (let row = 0; row < 4; row++) {
                this.state[row * 4 + col] = newRow[row];
            }
        }
    }
    // MOVE DOWN ACTION
    moveDown() {
        if (!this.gameStatus)
            return;
        for (let col = 0; col < 4; col++) {
            let newRow = [];
            let mergeNew = false;
            for (let row = 3; row >= 0; row--) {
                let index = row * 4 + col;
                if (this.state[index] !== 0) {
                    let len = newRow.length;
                    if (len > 0 && newRow[len - 1] === this.state[index] && !mergeNew) {
                        newRow[len - 1] *= 2;
                        mergeNew = true;
                    }
                    else {
                        newRow.push(this.state[index]);
                        mergeNew = false;
                    }
                }
            }
            for (let i = newRow.length; i < 4; i++)
                newRow.push(0);
            for (let row = 3, i = 0; row >= 0; row--, i++) {
                // 3 2 1 0
                this.state[row * 4 + col] = newRow[i];
            }
        }
    }
    // ACTIONS FOR THE OUTSIDE WORLD
    move(aciton) {
        switch (aciton) {
            case Moves.UP:
                this.moveUp();
                break;
            case Moves.RIGHT:
                this.moveRight();
                break;
            case Moves.DOWN:
                this.moveDown();
                break;
            case Moves.LEFT:
                this.moveLeft();
                break;
            default:
                console.log('Illegal action');
        }
        this.addRandomTile();
        this.updateScore();
        this.checkIfLost();
        this.checkIfWon();
    }
    // testing
    setState() {
        for (let i = 2, x = 0; i <= 2048; i *= 2, x++) {
            this.state[x] = i;
        }
    }
}
function addSwipeListeners(game, cards, score, highScore) {
    const gameContainer = document.getElementById("game");
    if (!gameContainer) {
        console.error('Game container not found');
        return;
    }
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;
    function handleGesture() {
        const diffX = touchendX - touchstartX;
        const diffY = touchendY - touchstartY;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);
        if (game.isGameActive()) {
            if (absDiffX > absDiffY) {
                if (diffX > 0) {
                    game.move(Moves.RIGHT);
                }
                else {
                    game.move(Moves.LEFT);
                }
            }
            else {
                if (diffY > 0) {
                    game.move(Moves.DOWN);
                }
                else {
                    game.move(Moves.UP);
                }
            }
            printStateOnTiles(cards, score, highScore, game);
        }
    }
    gameContainer.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    });
    gameContainer.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesture();
    });
}
function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        default: return "#cdc1b4";
    }
}
function printStateOnTiles(cards, score, highscoreElement, game) {
    let currentState = game.getCurrentState();
    cards.forEach((card, i) => {
        if (currentState[i] !== 0) {
            card.innerText = currentState[i].toString();
            card.style.backgroundColor = getTileColor(currentState[i]);
        }
        else {
            card.innerText = "";
            card.style.backgroundColor = getTileColor(0);
        }
    });
    if (score) {
        score.innerText = game.getScore().toString();
    }
    if (highscoreElement) {
        highscoreElement.innerText = game.getHighScore().toString();
    }
    if (!game.isGameActive()) {
        const popupMessage = document.getElementById('popupMessageContainer');
        const popupTitle = document.getElementById('popupTitle');
        const popupButton = document.getElementById('popupButton');
        if (game.checkIfWon()) {
            popupTitle.innerText = "Congratulations, you won!";
        }
        else if (game.checkIfLost()) {
            popupTitle.innerText = "Game Over!";
        }
        popupMessage.style.display = 'grid';
        popupButton === null || popupButton === void 0 ? void 0 : popupButton.addEventListener('click', e => {
            popupMessage.style.display = 'none';
        });
    }
}
let game = new Game();
const gameContainer = document.getElementById("game");
if (gameContainer) {
    for (let i = 0; i < 16; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        gameContainer.appendChild(card);
    }
}
const cards = document.querySelectorAll('.card');
const scoreElement = document.querySelector('#score');
const highscoreElement = document.querySelector('#highScore');
const newGameButton = document.querySelector('#newGameBtn');
printStateOnTiles(cards, scoreElement, highscoreElement, game);
addSwipeListeners(game, cards, scoreElement, highscoreElement);
document.onkeydown = function (e) {
    if (game.isGameActive()) {
        switch (e.keyCode) {
            case 37:
                game.move(Moves.LEFT);
                break;
            case 38:
                game.move(Moves.UP);
                break;
            case 39:
                game.move(Moves.RIGHT);
                break;
            case 40:
                game.move(Moves.DOWN);
                break;
        }
        printStateOnTiles(cards, scoreElement, highscoreElement, game);
    }
};
newGameButton === null || newGameButton === void 0 ? void 0 : newGameButton.addEventListener('click', (e) => {
    let confirmed = confirm("Are you sure.");
    if (confirmed) {
        game = new Game();
        printStateOnTiles(cards, scoreElement, highscoreElement, game);
        addSwipeListeners(game, cards, scoreElement, highscoreElement);
    }
});
