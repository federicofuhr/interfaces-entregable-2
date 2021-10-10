export default class Drawable {
    constructor(posX, posY, context) {
        this.posX = posX;
        this.posY = posY;
        this.resaltado = false;
        this.resaltadoEstilo = "red";
        this.ctx = context;
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
    
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }
    isPointInside(x, y) {
        
    }
}