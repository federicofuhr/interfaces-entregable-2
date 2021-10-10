export default class Drawable {
    constructor(posX, posY, context) {
        this.posX = posX;
        this.posY = posY;
        this.resaltado = false;
        this.resaltadoEstilo = "red";
        this.ctx = context;
        this.lastPosX = null;
        this.lastPosY = null;
    }
    setLastPosition(x, y) {
        this.lastPosX = x;
        this.lastPosY = y;
    }
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    getLastPosition() {
        const result = {
            x: this.lastPosX,
            y: this.lastPosY
        };
        return result;
    }
    getPosition() {
        const result = {
            x: this.posX,
            y: this.posY
        };
        return result;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getLastPosX() {
        return this.lastPosX;
    }
    getLastPosY() {
        return this.lastPosY;
    }
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }
    isPointInside(x, y) {
        
    }
}