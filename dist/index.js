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
    // CHECK IF GAME IS STILL ACTIVE
    isGameActive() {
        return this.gameStatus;
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
    // COUNT SCORE
    updateScore() {
        this.score = this.state.reduce((curr, prev) => curr + prev, 0);
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
    setState() {
        for (let i = 2, x = 0; i <= 2048; i *= 2, x++) {
            this.state[x] = i;
        }
    }
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
function printStateOnTiles(cards, score, game) {
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
    if (!game.isGameActive()) {
        console.log("its in");
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
const cards = document.querySelectorAll('.card');
const score = document.getElementById('score');
const newGameButton = document.getElementById('newGameBtn');
printStateOnTiles(cards, score, game);
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
        printStateOnTiles(cards, score, game);
    }
};
newGameButton === null || newGameButton === void 0 ? void 0 : newGameButton.addEventListener('click', (e) => {
    let confirmed = confirm("Are you sure.");
    if (confirmed) {
        game = new Game();
        printStateOnTiles(cards, score, game);
    }
});
