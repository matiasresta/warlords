class Polygon {
    constructor(x, y, diagonal = 100, sides = 6, texture = 0) {
        this.x = x;
        this.y = y;
        this.diagonal = diagonal;
        this.sides = sides;
    }

    drawPolygon() {
        angleMode(DEGREES);
        beginShape();
        for (let i = 0; i < this.sides; i++) {
            let angle = 360 / this.sides * i;
            let px = this.x + this.diagonal / 2 * sin(angle);
            let py = this.y - this.diagonal / 2 * cos(angle);
            vertex(px, py)
        }
        endShape(CLOSE)



    }
}