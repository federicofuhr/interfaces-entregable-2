import Cell from "./Cell.js";
export default class Board {
    constructor(posX, posY, rows, cols, cellSize, context) {
        this.posX = posX;
        this.posY = posY;
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.context = context;
        this.board = this.createBoard();
    }

    createBoard() {
        let cx = this.posX;
        let cy = this.posY;
        let matrix = [];
        for (let i = 0; i < this.rows; i++) {
            let cols = [];
            for (let j = 0; j < this.cols; j++) {
                cols.push(new Cell(cx, cy, this.cellSize, this.context));
                cx += this.cellSize;
            }
            cx = this.posX;
            cy += this.cellSize;
            matrix.push(cols);
        }
        return matrix;
    }
    // Getters
    getCell(i, j) {
        return this.board[i][j];
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getRows() {
        return this.rows;
    }
    getCols() {
        return this.cols;
    }
    getCellSize() {
        return this.cellSize;
    }
    getContext() {
        return this.context;
    }
    getBoard() {
        return this.board;
    }
    // Setters
    setPosX(x) {
        this.posX = x;
    }
    setPosY(y) {
        this.posY = y;
    }
    setRows(r) {
        this.rows = r;
    }
    setCols(c) {
        this.cols = c;
    }
    setCellSize(s) {
        this.cellSize = s;
    }
    setContext(context) {
        this.context = context;
    }

    // Funciones para representar el tablero en el canvas
    drawBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j].drawCell();
            }
        }
    }

}