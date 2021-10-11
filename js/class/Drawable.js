export default class Drawable {
    /**
     * CONSTRUCTOR DE LA CLASE
     */
    constructor(posX, posY, lastPosX, lastPosY, context) {
        this.posX = posX;
        this.posY = posY;
        this.resaltado = false;
        this.resaltadoEstilo = "red";
        this.ctx = context;
        this.lastPosX = lastPosX;
        this.lastPosY = lastPosY;
    }
    /**
     * SE PASAN LA ULTIMA POSICION VALIDA EN EL CANVAS
     */
    setLastPosition(x, y) {
        this.lastPosX = x;
        this.lastPosY = y;
    }
    /**
     * SE CARGAN LAS COORDENADAS DEL CANVAS PASADAS POR PARAMETRO
     */
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    /**
     * RETORNA LAS COORDENADAS DE LA ULTIMA POSICION VALIDA
     */
    getLastPosition() {
        const result = {
            x: this.lastPosX,
            y: this.lastPosY
        };
        return result;
    }
    /**
     * RETORNA LAS COORDENADAS ACTUALES
     */
    getPosition() {
        const result = {
            x: this.posX,
            y: this.posY
        };
        return result;
    }
    /**
     * RETORNA LA COORDENADA X
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
     * RETORNA LA ULTIMA COORDENADA X VALIDA
     */
    getLastPosX() {
        return this.lastPosX;
    }
    /**
     * RETORNA LA ULTIMA COORDENADA Y VALIDA
     */
    getLastPosY() {
        return this.lastPosY;
    }
    /**
     * SE PASA POR PARAMETRO SI ES RESALTADO
     */
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }
    /**
     * FUNCION ABSTRACTA PARA SABER SI SE ENCUENTRA EN LAS COORDENADAS X e Y
     */
    isPointInside(x, y) {
        
    }
}