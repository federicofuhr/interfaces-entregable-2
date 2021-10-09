import Cell from "./class/Cell.js";


let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");

// dropSlots es un arreglo de objetos Cell que sirve para representar las ranuras donde se insertan las fichas
let dropSlots = [];
let dX = 0;


// Cargar dropSlots
for (let i = 0; i < 7; i++) {
    dropSlots.push(new Cell(dX, 0, dX + 100, 100));
    dX += 100;
}

// paso 1: definir la matriz que contendra las filas
let matrix = [];
// paso 2: mediante un for, para cada fila vamos a crear un arreglo con sus columnas
let x = 0;
let y = 200;
for (let i = 0; i < 6; i++) {
    // arreglo con las columnas
    let cols = [];
    // mediante el for cargamos el arreglo de las columnas
    for (let j = 0; j < 7; j++) {
        cols.push(new Cell(x, y, x + 100, y + 100));
        x = x + 100;
    }
    x = 0;
    y = y + 100;
    // agregamos el arreglo de columnas a la fila
    matrix.push(cols);
}

// Funciones para representar informacion en el canvas
function drawCircle(cell) {
    let cx = (cell.getX1() + cell.getX2())/2;
    let cy = (cell.getY1() + cell.getY2())/2;
    let radius = cell.getWidth()/3; // o cy seria lo mismo en este caso
    ctx.beginPath();
    // parametros:  x, y, radio, angulo de inicio, angulo de fin, anticlockwise(opcional)
    // Los angulos deben expresarse en rad, por eso se aplica la conversion (Math.PI/180)*360
    ctx.arc(cx, cy, radius, 0, (Math.PI / 180) * 360, true);
    ctx.fillStyle = "steelblue";
    //relleno del circulo
    ctx.fill();
    /*ctx.strokeStyle = "steelblue";
    ctx.lineWidth = 10;
    //contorno del circulo
    ctx.stroke();*/
    ctx.closePath();
    
}

function drawBoardCircles() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            drawCircle(matrix[i][j]);
        }
    }
}

function strokeCells(cells) {
    ctx.strokeStyle = "black";
    cells.forEach(cell => {
        ctx.strokeRect(cell.x1, cell.y1, cell.x2, cell.y2);
    });
}

function drawBoard(matrix) {
    ctx.fillStyle = "blue";
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            ctx.beginPath();
            ctx.fillRect(matrix[i][j].x1, matrix[i][j].y1, matrix[i][j].width, matrix[i][j].height);
            ctx.closePath();
        }
    }

}

function dropToken(j) {
    for (let i = 0; i < matrix.length; i++) {
        if ((i + 1 >= matrix.length) || (matrix[i + 1][j].isOccuped())) {
            matrix[i][j].occuped = true;
            fillCell(matrix[i][j]);
            return {i: i, j: j};
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
    if (checkTopLeft(i,j) == 4) {
        console.log('GANASTE 1');
        return true;
    }
    if (checkTopRight(i,j) == 4) {
        console.log('GANASTE 3');
        return true;
    }
    if (checkLeft(i,j) == 4) {
        console.log('GANASTE 4');
        return true;
    }
    if (checkRight(i,j) == 4) {
        console.log('GANASTE 5');
        return true;
    }
    if (checkBotLeft(i,j) == 4) {
        console.log('GANASTE 6');
        return true;
    }
    if (checkBot(i,j) == 4) {
        console.log('GANASTE 7');
        return true;
    }
    if (checkBotRight(i,j) == 4) {
        console.log('GANASTE 8');
        return true;
    }
    return false;
}

function checkTopLeft(i,j) {
    if ((i >= 0) && (j >= 0)) {
        if (matrix[i][j].isOccuped()) {
            return (checkTopLeft(i - 1, j - 1)) + 1;
        }
    }
    return 0;
}

function checkTopRight(i,j) {
    if ((i >= 0) && (j < 7)) {
        if (matrix[i][j].isOccuped()) {
            return (checkTopRight(i - 1, j + 1)) + 1;
        }
    }
    return 0;  
}

function checkLeft(i,j) {
    if ((j >= 0)) {
        if (matrix[i][j].isOccuped()) {
            return (checkLeft(i, j - 1)) + 1;
        }
    }
    return 0;
}

function checkRight(i,j) {
    if ((j < 7)) {
        if (matrix[i][j].isOccuped()) {
            return (checkRight(i, j + 1)) + 1;
        }
    }
    return 0;
}

function checkBotLeft(i,j) {
    if ((i < 6) && (j >= 0)) {
        if (matrix[i][j].isOccuped()) {
            return (checkBotLeft(i + 1, j - 1)) + 1;
        }
    }
    return 0;
}

function checkBot(i,j) {
    if ((i < 6)) {
        if (matrix[i][j].isOccuped()) {
            return (checkBot(i + 1, j)) + 1;
        }
    }
    return 0;
}

function checkBotRight(i,j) {
    if ((i < 6) && (j < 7)) {
        if (matrix[i][j].isOccuped()) {
            return (checkBotRight(i + 1, j + 1)) + 1;
        }
    }
    return 0;
}

// Eventos

// Evento de prueba: al clickear una celda del arreglo de ranuras se dispara un evento que simula lo que pasaria si se insertara una ficha
canvas.addEventListener("click", e => {
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
});

// Invocaciones

strokeCells(dropSlots);
drawBoard(matrix);
drawBoardCircles();