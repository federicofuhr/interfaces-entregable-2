import Board from "./class/Board.js";
import Token from "./class/Token.js";
import Cell from "./class/Cell.js";

let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");



function fillCell(cell) {
    ctx.fillStyle = "tomato";
    ctx.fillRect(cell.x1, cell.y1, cell.width, cell.height);
}

function checkFourInLine(cell) {
    let i = cell.i;
    let j = cell.j
    if (checkTopLeft(i, j) == 4) {
        console.log('GANASTE 1');
        return true;
    }
    if (checkTopRight(i, j) == 4) {
        console.log('GANASTE 3');
        return true;
    }
    if (checkLeft(i, j) == 4) {
        console.log('GANASTE 4');
        return true;
    }
    if (checkRight(i, j) == 4) {
        console.log('GANASTE 5');
        return true;
    }
    if (checkBotLeft(i, j) == 4) {
        console.log('GANASTE 6');
        return true;
    }
    if (checkBot(i, j) == 4) {
        console.log('GANASTE 7');
        return true;
    }
    if (checkBotRight(i, j) == 4) {
        console.log('GANASTE 8');
        return true;
    }
    return false;
}

function checkTopLeft(i, j) {
    if ((i >= 0) && (j >= 0)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkTopLeft(i - 1, j - 1)) + 1;
        }
    }
    return 0;
}

function checkTopRight(i, j) {
    if ((i >= 0) && (j < 7)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkTopRight(i - 1, j + 1)) + 1;
        }
    }
    return 0;
}

function checkLeft(i, j) {
    if ((j >= 0)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkLeft(i, j - 1)) + 1;
        }
    }
    return 0;
}

function checkRight(i, j) {
    if ((j < 7)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkRight(i, j + 1)) + 1;
        }
    }
    return 0;
}

function checkBotLeft(i, j) {
    if ((i < 6) && (j >= 0)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkBotLeft(i + 1, j - 1)) + 1;
        }
    }
    return 0;
}

function checkBot(i, j) {
    if ((i < 6)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkBot(i + 1, j)) + 1;
        }
    }
    return 0;
}

function checkBotRight(i, j) {
    if ((i < 6) && (j < 7)) {
        if ((board.getCell(i,j).getToken() != null) && (board.getCell(i,j).getToken().getPlayerId() == playerTurn)) {
            return (checkBotRight(i + 1, j + 1)) + 1;
        }
    }
    return 0;
}

const rowsQuantity = 6;
const colunmsQuantity = 7;
const CANT_FIG = (rowsQuantity * colunmsQuantity) / 2;

let lastClickedToken = null;
let playerTurn = 1;
let playerOneX = 300;
let playerOneY = 300;
let playerTwoX = 1500;
let playerTwoY = 300;

let playerOneTokens = [];
let playerTwoTokens = [];

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let boardX = 500;
let boardY = 200;
let rows = 6;
let cols = 7;

let board = new Board(boardX, boardY, rows, cols, 100, ctx);
board.drawBoard();

// dropSlots es un arreglo de objetos Cell que sirve para representar las ranuras donde se insertan las fichas
let dropSlots = [];
let dX = boardX;
let dy = boardY - 100;
drawDropSlots();

let isMouseDown = false;




// Cargar dropSlots
for (let i = 0; i < cols; i++) {
    dropSlots.push(new Cell(dX, dy, board.getCellSize(), ctx));
    dX += board.getCellSize();
}

//dibujar dropSlots
function drawDropSlots() {
    ctx.strokeStyle = "steelblue";
    for (let i = 0; i < dropSlots.length; i++) {
        ctx.beginPath();
        ctx.strokeRect(dropSlots[i].x1, dropSlots[i].y1, board.getCellSize(), board.getCellSize());
        ctx.closePath();
    }
}

function addFigure() {
    addToken();
    drawFigure();
}

function drawFigure() {
    clearCanvas();
    for (let i = 0; i < playerOneTokens.length; i++) {
        playerOneTokens[i].draw();
        playerTwoTokens[i].draw();
        board.drawBoard();
        drawDropSlots();
    }
}

function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function addToken() {
    let token1 = new Token(playerOneX, playerOneY, 45, ctx, 1);
    let token2 = new Token(playerTwoX, playerTwoY, 45, ctx, 2);
    playerOneTokens.push(token1);
    playerTwoTokens.push(token2);
    playerOneY += 5;
    playerTwoY += 5;
}

function addFigures() {
    addFigure();
    if (playerOneTokens.length < CANT_FIG) {
        setTimeout(addFigures, 0);
    }
}

setTimeout(() => {
    addFigures();
}, 333);

function findClickedFigure(x, y) {
    let array;
    (playerTurn == 1) ? array = playerOneTokens: array = playerTwoTokens;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isPointInside(x, y) && (playerTurn == element.getPlayerId())) {
            return element;
        }
    }
}

// Localiza donde fue soltada la ficha y si esta dentro del area permitida


function onMouseDown(e) {
    isMouseDown = true;
    if (lastClickedToken != null) {
        lastClickedToken.setResaltado(false);
        lastClickedToken = null;
    }
    let clickFig = findClickedFigure(e.offsetX, e.offsetY);
    if (clickFig != null) {
        clickFig.setResaltado(true);
        clickFig.setLastPosition(clickFig.getPosX(), clickFig.getPosY());
        lastClickedToken = clickFig;
    }
    drawFigure();
}

function dropToken(j, token) {
    for (let i = 0; i < board.getRows(); i++) {
        if ((i + 1 >= board.getRows()) || (board.getCell(i + 1, j).isOccuped())) {
            board.getCell(i,j).setOccuped();
            board.getCell(i,j).setToken(token);
            let x = (board.getCell(i,j).getX1() + board.getCell(i,j).getX2()) / 2;
            let y = (board.getCell(i,j).getY1() + board.getCell(i,j).getY2()) / 2;
            token.setPosition(x,y);
            drawFigure();
            return {
                i: i,
                j: j
            };
        }
    }
}

function findDropArea(e) {
    let token = lastClickedToken;
    isMouseDown = false;
    const minDx = boardX;
    const maxDx = board.getCols() * board.getCellSize() + boardX;
    const minDy = dy;
    const maxDy = board.getCellSize() + dy;
    const x = e.offsetX;
    const y = e.offsetY;
    if (!((x >= minDx) && (x <= maxDx) && (y >= minDy) && (y <= maxDy))) {
        let clickFig = findClickedFigure(e.offsetX, e.offsetY);
        if (clickFig != null) {
            const x = clickFig.getLastPosX();
            const y = clickFig.getLastPosY();
            clickFig.setLastPosition(clickFig.getPosX(), clickFig.getPosY());
            clickFig.setPosition(x, y);
            for (let i = 0; i < dropSlots.length; i++) {
                if ((dropSlots[i].x1 <= x) && (x <= dropSlots[i].x2)) {
                    if ((dropSlots[i].y1 <= y) && (y <= dropSlots[i].y2)) {
                        let cellCordenates = dropToken(i, token);
                        checkFourInLine(cellCordenates);
                        (playerTurn == 1)? playerTurn = 2: playerTurn = 1;
                    }
                }
            }
        }
    }
}

function onMouseUp(e) {
    isMouseDown = false;
}

function onMouseMove(e) {
    if (isMouseDown && (lastClickedToken != null)) {
        lastClickedToken.setPosition(e.offsetX, e.offsetY);
        drawFigure();
    }
}


canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', (e) => { findDropArea(e) }, false);
canvas.addEventListener('mousemove', onMouseMove, false);