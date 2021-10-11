import Board from "./class/Board.js";
import Token from "./class/Token.js";
import Cell from "./class/Cell.js";

let btnStart = document.querySelector("#new-game");
btnStart.addEventListener("click", gameStart);

let srcPlayerOne = "";
let srcPlayerTwo = "";

let select1 = document.querySelector("#token-1");
let select2 = document.querySelector("#token-2");

let options = new Array();
options["1"] = "ficha-amarilla.png";
options["2"] = "ficha-corazon.png";
options["3"] = "ficha-roja.png";
options["4"] = "ficha-verde.png";

select1.addEventListener("change", () => {
    let value1 = select1.value;
    let value2 = select2.value;
    if (value1 != value2) {
        srcPlayerOne = options[value1];
        console.log(srcPlayerOne);
    }
});

select2.addEventListener("change", () => {
    let value1 = select1.value;
    let value2 = select2.value;
    if (value1 != value2) {
        srcPlayerTwo = options[value2];
        console.log(srcPlayerTwo);
    }
});

function gameStart() {

    srcPlayerOne == "" ? srcPlayerOne = "ficha-amarilla.png" : srcPlayerOne;
    srcPlayerTwo == "" ? srcPlayerTwo = "ficha-corazon.png" : srcPlayerTwo;

    let gameOptions = document.querySelector("#game-options");
    gameOptions.classList.add("collapse");

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
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        if (checkTopRight(i, j) == 4) {
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        if (checkLeft(i, j) == 4) {
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        if (checkRight(i, j) == 4) {
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        if (checkBotLeft(i, j) == 4) {
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        if (checkBot(i, j) == 4) {
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        if (checkBotRight(i, j) == 4) {
            document.getElementById("timer").innerHTML = "";
            timer.stop();
            return true;
        }
        return false;
    }

    function checkTopLeft(i, j) {
        if ((i >= 0) && (j >= 0)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
                return (checkTopLeft(i - 1, j - 1)) + 1;
            }
        }
        return 0;
    }

    function checkTopRight(i, j) {
        if ((i >= 0) && (j < 7)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
                return (checkTopRight(i - 1, j + 1)) + 1;
            }
        }
        return 0;
    }

    function checkLeft(i, j) {
        if ((j >= 0)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
                return (checkLeft(i, j - 1)) + 1;
            }
        }
        return 0;
    }

    function checkRight(i, j) {
        if ((j < 7)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
                return (checkRight(i, j + 1)) + 1;
            }
        }
        return 0;
    }

    function checkBotLeft(i, j) {
        if ((i < 6) && (j >= 0)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
                return (checkBotLeft(i + 1, j - 1)) + 1;
            }
        }
        return 0;
    }

    function checkBot(i, j) {
        if ((i < 6)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
                return (checkBot(i + 1, j)) + 1;
            }
        }
        return 0;
    }

    function checkBotRight(i, j) {
        if ((i < 6) && (j < 7)) {
            if ((board.getCell(i, j).getToken() != null) && (board.getCell(i, j).getToken().getPlayerId() == playerTurn)) {
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
    let finalizedGame = false;
    let playerOneX = 100;
    let playerOneY = 100;
    let playerTwoX = 1400;
    let playerTwoY = 100;

    let playerOneTokens = [];
    let playerTwoTokens = [];

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let boardX = 390;
    let boardY = 200;
    let rows = 6;
    let cols = 7;

    let board = new Board(boardX, boardY, rows, cols, 100, ctx);
    board.drawBoard();

    // dropSlots es un arreglo de objetos Cell que sirve para representar las ranuras donde se insertan las fichas
    let dropSlots = [];
    let dX = boardX;
    let dy = boardY - 100;
    let dropSlotIndicator = new Image();
    dropSlotIndicator.src = "./images/down-arrow.png";
    drawDropSlots();


    let isMouseDown = false;




    // Cargar dropSlots
    for (let i = 0; i < cols; i++) {
        let cell = new Cell(dX, dy, board.getCellSize(), ctx)
        cell.setImage(dropSlotIndicator.src);
        dropSlots.push(cell);
        dX += board.getCellSize();
    }

    //dibujar dropSlots
    function drawDropSlots() {
        for (let i = 0; i < dropSlots.length; i++) {
            ctx.beginPath();
            dropSlots[i].drawCell();
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
        ctx.fillStyle = '#282425';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function addToken() {
        let token1 = new Token(playerOneX, playerOneY, playerOneX, playerOneY, 45, ctx, 1, srcPlayerOne);
        let token2 = new Token(playerTwoX, playerTwoY, playerTwoX, playerTwoY, 45, ctx, 2, srcPlayerTwo);
        playerOneTokens.push(token1);
        playerTwoTokens.push(token2);
        playerOneY += 30;
        playerTwoY += 30;
    }

    function addFigures() {
        addFigure();
        if (playerOneTokens.length < CANT_FIG) {
            setTimeout(addFigures, 0);
        }
    }

    function Timer(fn, t) {
        var timerObj = setInterval(fn, t);

        this.stop = function () {
            if (timerObj) {
                clearInterval(timerObj);
                timerObj = null;
            }
            return this;
        }

        // start timer using current settings (if it's not already running)
        this.start = function () {
            if (!timerObj) {
                this.stop();
                timerObj = setInterval(fn, t);
            }
            return this;
        }

        // start with new or original interval, stop current interval
        this.reset = function (newT = t) {
            t = newT;
            return this.stop().start();
        }
    }

    var timeleft = 10;
    var timer = new Timer(function () {
        if (timeleft <= 0) {
            timer.reset(1000);
            timeleft = 10;
            (playerTurn == 1) ? playerTurn = 2 : playerTurn = 1;
            if ((lastClickedToken != null) && (!lastClickedToken.isLocked())) {
                let data = lastClickedToken.getLastPosition();
                lastClickedToken.setPosition(data.x, data.y);
            }
            document.getElementById("timer").innerHTML = "TURNO FINALIZADO";
        } else {
            document.getElementById("timer").innerHTML = "JUGADOR " + playerTurn + " - " + timeleft + " SEGUNDOS RESTANTES";
        }
        timeleft -= 1;
    }, 1000);


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
        return null;
    }

    // Localiza donde fue soltada la ficha y si esta dentro del area permitida


    function onMouseDown(e) {
        isMouseDown = true;
        if (lastClickedToken != null) {
            lastClickedToken.setResaltado(false);
            lastClickedToken = null;
        }
        let clickFig = findClickedFigure(e.offsetX, e.offsetY);
        if ((clickFig != null) && (!clickFig.isLocked())) {
            clickFig.setResaltado(true);
            lastClickedToken = clickFig;
        }
        drawFigure();
    }

    function notifyWinner() {
        console.log("gano el jugador: ", playerTurn);
        canvas.classList.toggle("collapse");
        let notify = document.createElement("div");
        notify.classList.add("winner-screen");
        let img = document.createElement("img");
        img.src = "./images/winner-screen.jpg";
        img.alt = "imagen de victoria";
        let h1 = document.createElement("h1");
        h1.innerHTML = "FELICIDADES JUGADOR " + playerTurn;
        let a = document.createElement("a");
        a.href = "./index.html";
        a.innerHTML = "Reiniciar Juego";
        let div2 = document.createElement("div");
        div2.classList.toggle("message");
        notify.appendChild(img);
        div2.appendChild(h1);
        div2.appendChild(a);
        notify.appendChild(div2);
        let body = document.querySelector(".container-edit");
        body.insertBefore(notify, canvas);
    }

    function dropToken(j, token) {
        for (let i = 0; i < board.getRows(); i++) {
            if ((i + 1 >= board.getRows()) || (board.getCell(i + 1, j).isOccuped())) {
                board.getCell(i, j).setOccuped();
                board.getCell(i, j).setToken(token);
                let x = (board.getCell(i, j).getX1() + board.getCell(i, j).getX2()) / 2;
                let y = (board.getCell(i, j).getY1() + board.getCell(i, j).getY2()) / 2;
                token.setPosition(x, y);
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
        if (((x >= minDx) && (x <= maxDx) && (y >= minDy) && (y <= maxDy))) {
            let clickFig = findClickedFigure(e.offsetX, e.offsetY);
            if (clickFig != null) {
                for (let i = 0; i < dropSlots.length; i++) {
                    if ((dropSlots[i].x1 <= x) && (x <= dropSlots[i].x2)) {
                        if ((dropSlots[i].y1 <= y) && (y <= dropSlots[i].y2)) {
                            timer.reset(1000);
                            timeleft = 10;
                            clickFig.setLocked(true);
                            let cellCordenates = dropToken(i, token);
                            let win = checkFourInLine(cellCordenates);
                            if (!win) {
                                (playerTurn == 1) ? playerTurn = 2: playerTurn = 1;
                            } else
                                notifyWinner();
                        }
                    }
                }
            }
        } else {
            let clickFig = findClickedFigure(e.offsetX, e.offsetY);
            if (clickFig != null) {
                const x = clickFig.getLastPosX();
                const y = clickFig.getLastPosY();
                clickFig.setPosition(x, y);
                drawFigure();
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
    canvas.addEventListener('mouseup', (e) => {
        findDropArea(e);
        drawFigure();
    }, false);
    canvas.addEventListener('mousemove', onMouseMove, false);


    function updateToken(token, src) {
        setTimeout(() => {
            token.setImage(src);
            token.draw();
        }, 0);

    }
}