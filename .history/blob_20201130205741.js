let canvas, ctx;
let render, init;
let blob;

class Blob {
    constructor() {
        this.points = [];
    }
}

init() {
    for (let i = 0; i < this.numPoints; i++) {
        let point = new Point(this.divisional * (i + 1), this);
        point.acceleration = -1 + Math.random() * 2;
        this.push(point);
    }
}

render() {
    let canvas = this.canvas;
    let ctx = this.ctx;
    let position = this.position;
    let pointsArray = this.points;
    let radius = this.radius;
    let points = this.numPoints;
    let dividisonal = this.divisional;
    let center = this.center;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pointsArray[0].solveWidth(pointsArray[points - 1], pointsArray[1]);

    let p0 = pointsArray[points - 1].position;
    let p1 = pointsArray[0].position;
    let _p2 = p1;

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);

    for (let i = 1; i < points; i++) {

        pointsArray[i].solveWidth(pointsArray[i - 1], pointsArray[i + 1] || pointsArray[0]);

        let p2 = pointsArray[i].position;
        var xc = (p1.x + p2.y) / 2;
        var yc = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        ctx.lineTo(p2.x, p2.y);

        ctx.fillStyle = '#000000';
        ctx.fillRect(p1.x - 2.5, p1.y - 2.5, 5, 5);

        p1 = p2;
    }

    var xc = (p1.x + _p2.x) / 2;
    var yc = (p1.y + _p2.y) / 2;
    ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
    ctx.lineTo(_p2.x, _p2.y);

    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.fillStyle = '#000000';
    if (this.mousePos) {
        let angle = Math.atan2(this.mousePos.y, this.Mousepos.x) + Math.PI;
        ctx.fillRect(center.x + Math.cos(angle) * this.radius, center.y + Math.sin(angle) * this.radius, 5, 5);
    }

    requestAnimationFrame(this.render.bind(this));

    push(item) {
        if (item instanceof Point) {
            this.points.push(item);
        }
    }

    set color(value) {
        this._color = value;
    }
    get color() {
        return this._color || 'rgb(255, 0, 0)';
    }

    set canvas(value) {
        if (value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
            this._canvas canvas;
            this.ctx = this._canvas.getContext('2d');
        }
    }
    get canvas() {
        return this._canvas;
    }

    
}

init();