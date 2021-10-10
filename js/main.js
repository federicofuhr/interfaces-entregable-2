import Board from "./class/Board.js";
import Token from "./class/Token.js";

let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");

/*// dropSlots es un arreglo de objetos Cell que sirve para representar las ranuras donde se insertan las fichas
let dropSlots = [];
let dX = 0;


// Cargar dropSlots
for (let i = 0; i < 7; i++) {
    dropSlots.push(new Cell(dX, 0, dX + 100, 100));
    dX += 100;
}*/



function dropToken(j) {
    for (let i = 0; i < matrix.length; i++) {
        if ((i + 1 >= matrix.length) || (matrix[i + 1][j].isOccuped())) {
            matrix[i][j].occuped = true;
            fillCell(matrix[i][j]);
            return { i: i, j: j };
        }
    }
}

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
        if (matrix[i][j].isOccuped()) {
            return (checkTopLeft(i - 1, j - 1)) + 1;
        }
    }
    return 0;
}

function checkTopRight(i, j) {
    if ((i >= 0) && (j < 7)) {
        if (matrix[i][j].isOccuped()) {
            return (checkTopRight(i - 1, j + 1)) + 1;
        }
    }
    return 0;
}

function checkLeft(i, j) {
    if ((j >= 0)) {
        if (matrix[i][j].isOccuped()) {
            return (checkLeft(i, j - 1)) + 1;
        }
    }
    return 0;
}

function checkRight(i, j) {
    if ((j < 7)) {
        if (matrix[i][j].isOccuped()) {
            return (checkRight(i, j + 1)) + 1;
        }
    }
    return 0;
}

function checkBotLeft(i, j) {
    if ((i < 6) && (j >= 0)) {
        if (matrix[i][j].isOccuped()) {
            return (checkBotLeft(i + 1, j - 1)) + 1;
        }
    }
    return 0;
}

function checkBot(i, j) {
    if ((i < 6)) {
        if (matrix[i][j].isOccuped()) {
            return (checkBot(i + 1, j)) + 1;
        }
    }
    return 0;
}

function checkBotRight(i, j) {
    if ((i < 6) && (j < 7)) {
        if (matrix[i][j].isOccuped()) {
            return (checkBotRight(i + 1, j + 1)) + 1;
        }
    }
    return 0;
}

// Eventos

// Evento de prueba: al clickear una celda del arreglo de ranuras se dispara un evento que simula lo que pasaria si se insertara una ficha
/* canvas.addEventListener("click", e => {
    let x = e.offsetX;
    let y = e.offsetY;
    for (let i = 0; i < dropSlots.length; i++) {
        if ((dropSlots[i].x1 <= x) && (x <= dropSlots[i].x2)) {
            if ((dropSlots[i].y1 <= y) && (y <= dropSlots[i].y2)) {
                let cellCordenates = dropToken(i);
                checkFourInLine(cellCordenates);
            }
        }
    }
}); */


const rowsQuantity = 6;
const colunmsQuantity = 7;
const maxTokensQuantity = (rowsQuantity * colunmsQuantity) / 2;

let lastClickedToken = null;
let issMouseDown = false;

let playerOneX = 300;
let playerOneY = 600;
let playerTwoX = 1500;
let playerTwoY = 800;

let playerOneTokens = [];
let playerTwoTokens = [];



let canvasWidth = canvas.width;
let canvasHeight = canvas.height;


let board = new Board(500, 200, 6, 7, 100, ctx);
board.drawBoard();




const CANT_FIG = 30;

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

let posX = playerOneX;
let posY = playerOneY;

function addFigure() {
    addToken();
    drawFigure();
}

function drawFigure() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
        board.drawBoard();
    }
}

function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function addRect() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let rect = new Rect(posX, posY, 20, 20, color, ctx);
    figures.push(rect);
}

function addToken() {
    let color = randomRGBA();
    let token = new Token(posX, posY, 40, color, ctx);
    figures.push(token);
    posY += 5;
}

function addFigures() {
    addFigure();
    if (figures.length < CANT_FIG) {
        setTimeout(addFigures, 0);
    }
}

setTimeout(() => {
    addFigures();
}, 333);

function findClickedFigure(x, y) {
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

function onMouseDown(e) {
    isMouseDown = true;
    if (lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }
    let clickFig = findClickedFigure(e.offsetX, e.offsetY);
    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    drawFigure();
}

function onMouseUp(e) {
    isMouseDown = false;
}

function onMouseMove(e) {
    if (isMouseDown && (lastClickedFigure != null)) {
        lastClickedFigure.setPosition(e.offsetX, e.offsetY);
        drawFigure();
    }
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);