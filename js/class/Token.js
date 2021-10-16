import Drawable from "./Drawable.js";

export default class Token extends Drawable {
    /**
     * CONSTRUCTOR DE LA CLASE
     */
    constructor(posX, posY, lastPosX, lastPosY, radius, context, playerId, imgPath) {
        super(posX, posY, lastPosX, lastPosY, context);
        this.radius = radius;
        this.playerId = playerId;
        let img = new Image();
        img.src = './images/' + imgPath;
        this.img = img;
        this.img.onload = this.draw();
        this.locked = false;
    }
    /**
     * DEVUELVE UN BOOLEAN QUE DICE SI LA FICHA ESTA BLOQUEADA O NO
     */
    isLocked() {
        return this.locked;
    }
    /**
     * CAMBIA EL ESTADO DE BLOQUEADO DE LA FICHA
     */
    setLocked(status) {
        this.locked = status;
    }
    /**
     * FUNCION PARA DIBUJAR LA FICHA EN EL CANVAS CON LA IMAGEN
     */
    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, true);
        if (this.resaltado) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, true);
        if (this.resaltado) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
        this.ctx.clip();
        this.ctx.closePath();
        this.ctx.restore();
    }
    /**
     * RETORNA EL RADIO DE LA FICHA
     */
    getRadius() {
        return this.radius;
    }
    /**
     * RETORNA EL ID DEL JUGADOR
     */
    getPlayerId() {
        return this.playerId;
    }
    /**
     * RETORNA UN BOOLEAN QUE DICE SI LA FICHA ESTA EN LAS COORDENADAS X e Y
     */
    isPointInside(x, y) {
        const _x = this.posX - x;
        const _y = this.posY - y;
        return (Math.sqrt(_x * _x + _y * _y) < this.radius);
    }
    /**
     * CARGA LA IMAGEN POR EL PATH PASADO POR PARAMETRO
     */
    setImage(imgPath) {
        let img = new Image();
        img.src = './images/' + imgPath;
        this.img = img;
    }
}