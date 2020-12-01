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

init();