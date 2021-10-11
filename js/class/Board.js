import Cell from "./Cell.js";

export default class Board {
    /**
     * CONSTRUCTOR DE LA CLASE
     */
    constructor(posX, posY, rows, cols, cellSize, context) {
        this.posX = posX;
        this.posY = posY;
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.context = context;
        this.board = this.createBoard();
    }
    /**
     * CREA EL TABLERO POR UNA MATRIZ DONDE CADA CASILLERO TIENE UNA CELDA
     */
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
    /**
     * RETORNA LA CELDA EN LA POSICION I y J
     */
    getCell(i, j) {
        return this.board[i][j];
    }
    /**
     * RETORNA LA COORDEANDA X
     */
    getPosX() {
        return this.posX;
    }
    /**
     * RETORNA LA COORDENADA Y
     */
    getPosY() {
        return this.posY;
    }
    /**
     * RETORNA LA CANTIDAD DE FILAS
     */
    getRows() {
        return this.rows;
    }
    /**
     * RETORNA LA CANTIDAD DE COLUMNAS
     */
    getCols() {
        return this.cols;
    }
    /**
     * RETORNA EL ANCHO/ALTO DE LA CELDA
     */
    getCellSize() {
        return this.cellSize;
    }
    /**
     * RETORNA EL CONTEXTO DEL TABLERO
     */
    getContext() {
        return this.context;
    }
    /**
     * RETORNA EL TABLERO
     */
    getBoard() {
        return this.board;
    }
    /**
     * INGRESA LA COORDENADA X
     */
    setPosX(x) {
        this.posX = x;
    }
    /**
     * INGRESA LA COORDENADA Y
     */
    setPosY(y) {
        this.posY = y;
    }
    /**
     * INGRESA LA CANTIDAD DE FILAS
     */
    setRows(r) {
        this.rows = r;
    }
    /**
     * INGRESA LA CANTIDAD DE COLUMNAS
     */
    setCols(c) {
        this.cols = c;
    }
    /**
     * INGRESA EL ANCHO/ALTO DE LA CELDA
     */
    setCellSize(s) {
        this.cellSize = s;
    }
    /**
     * INGRESO EL CONTEXTO
     */
    setContext(context) {
        this.context = context;
    }
    /**
     * FUNCION PARA DIBUJAR EL TABLERO EN EL CANVAS
     */
    drawBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j].drawCell();
            }
        }
    }

}