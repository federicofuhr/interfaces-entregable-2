import Circle from './class/Circle.js';
import Rect from './class/Rect.js';

document.addEventListener("DOMContentLoaded", init);

function init() {

    /** @type {CanvasRenderingContext2D} */
    let canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight =  canvas.height;

    const CANT_FIG = 30;

    let figures = [];
    let lastClickedFigure = null;
    let isMouseDown = false;

    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);

    function addFigure() {
        addCircle();
        drawFigure();
    }

    function drawFigure() {
        clearCanvas();
        for (let i = 0; i < figures.length; i++) {
            figures[i].draw();
        }
    }

    function clearCanvas() {
        ctx.fillStyle = '#F8F8FF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function addRect() {
        let posX = Math.round(Math.random() * canvasWidth);
        let posY = Math.round(Math.random() * canvasHeight);
        let color = randomRGBA();
        let rect = new Rect(posX, posY, 20, 20, color, ctx);
        figures.push(rect);
    }

    function addCircle() {
        let color = randomRGBA();
        let circle = new Circle(posX, posY, 40, color, ctx);
        figures.push(circle);
        posY += 5;
    }

    function addFigures() {
        addFigure();
        if (figures.length < CANT_FIG) {
            setTimeout(addFigures, 0);
        }
    }

    setTimeout(() => {
        addFigures();
    }, 333);

    function findClickedFigure(x, y) {
        for (let i = 0; i < figures.length; i++) {
            const element = figures[i];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }

    function onMouseDown(e) {
        isMouseDown = true;
        if (lastClickedFigure != null) {
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;
        }
        let clickFig = findClickedFigure(e.layerX, e.layerY);
        if (clickFig != null) {
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;
        }
        drawFigure();
    }

    function onMouseUp(e) {
        isMouseDown = false;
    }

    function onMouseMove(e) {
        if (isMouseDown && (lastClickedFigure != null)) {
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            drawFigure();
        }
    }
    
    function randomRGBA() {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let a = 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
}