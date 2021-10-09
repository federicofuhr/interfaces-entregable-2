export default class Cell {
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
    getX1() {
        return this.x1;
    }
    getY1() {
        return this.y1;
    }
    getX2() {
        return this.x2;
    }
    getY2() {
        return this.y2;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    isOccuped() {
        return this.occuped;
    }
    setToken(token) {
        this.token = token;
    }

    drawCell() {
        this.context.fillStyle = "tomato";
        this.context.beginPath();
        this.context.arc(this.x1, this.x2, 10, 0, 2 * Math.PI, true);
        
        this.context.closePath();
        //this.context.drawImage(this.img, this.x1, this.y1, this.width, this.height);
    }
}