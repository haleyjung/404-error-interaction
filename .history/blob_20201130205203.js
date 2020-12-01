let canvas, ctx;
let render, init;
let blob;

class Blob {
    constructor() {
        this.points = [];
    }
}

// init() {
//     for (let i = 0; i < this.numPoints; i++) {
//         let point = new Point(this.divisional * (i + 1), this);
//         point.acceleration = -1 + Math.random() * 2;
//         this.push(point);
//     }
// }

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
}

init();