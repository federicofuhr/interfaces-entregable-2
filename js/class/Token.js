import Drawable from "./Drawable.js";

export default class Token extends Drawable {
    constructor(posX, posY, radius, context, playerId) {
        super(posX, posY, context);
        this.radius = radius;
        this.playerId = playerId;
        let img = new Image();
        img.src = './images/fede.jpg';
        this.img = img;
    }
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
        this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, 100, 100);
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
    getRadius() {
        return this.radius;
    }
    getPlayerId() {
        return this.playerId;
    }
    isPointInside(x, y) {
        const _x = this.posX - x;
        const _y = this.posY - y;
        return (Math.sqrt(_x * _x + _y * _y) < this.radius);
    }
    setImage(path) {
        let img = new Image();
        img.src = path;
        this.img = img;
    }
}