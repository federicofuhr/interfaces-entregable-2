export default class Cell {
    /**
     * CONSTRUCTOR DE LA CLASE CELDA
     */
    constructor(x1, y1, size, context) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x1 + size;
        this.y2 = y1 + size;
        this.width = size;
        this.height = size;
        this.occuped = false;
        this.token = null;
        this.context = context;
        let img = new Image();
        img.src = './images/celda.png';
        this.img = img;
    }
    /**
     * RETORNA LA COORDENADA X
     */
    getX1() {
        return this.x1;
    }
    /**
     * RETORNA LA COORDENADA Y
     */
    getY1() {
        return this.y1;
    }
    /**
     * RETORNA LA COORDENADA X MAS EL TAMANIO DE LA CELDA
     */
    getX2() {
        return this.x2;
    }
    /**
     * RETORNA LA COORDENADA Y MAS EL TAMANIO DE LA CELDA
     */
    getY2() {
        return this.y2;
    }
    /**
     * RETORNA EL ANCHO DE LA CELDA
     */
    getWidth() {
        return this.width;
    }
    /**
     * RETORNA EL ALTO DE LA CELDA
     */
    getHeight() {
        return this.height;
    }
    /**
     * RETORNA UN BOOLEANO QUE RESPONDE SI ESTA OCUPADA O NO
     */
    isOccuped() {
        return this.occuped;
    }
    /**
     * RETORNA LA FICHA UBICADA EN ESTA CELDA
     */
    getToken() {
        return this.token;
    }
    /**
     * LA CELDA SE OCUPA
     */
    setOccuped() {
        this.occuped = true;
    }
    /**
     * SE PASA UNA FICHA POR PARAMETRO PARA CARGAR GUARDARLA EN LA CELDA
     */
    setToken(token) {
        this.token = token;
    }
    /**
     * SE PASA EL PATH DE LA IMAGEN DE LA CELDA POR PARAMETRO
     */
    setImage(src) {
        this.img.src = src;
    }
    /**
     * FUNCION PARA PINTAR LA CELDA EN EL CANVAS
     */
    drawCell() {
        this.context.drawImage(this.img, this.x1, this.y1, this.width, this.height);
    }
}