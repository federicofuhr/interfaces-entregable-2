export default class Figure {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = "red";
        this.ctx = context;
    }
    setFill(fill) {
        this.fill = fill;
    }
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
    getPosition() {
        const result = {
            x: this.getPosX(),
            y: this.getPosY()
        };
        return result;
    }
    getPosX() {
        return this.getPosX;
    }
    getPosY() {
        return this.getPosY;
    }
    getFill() {
        return this.fill;
    }
    draw() {
        this.ctx.fillStyle = this.fill;
    }
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }
    isPointInside(x, y) {
        
    }
}