class Position {
    constructor(x, y, size, tiles) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tiles = tiles
        this.tile = random(this.tiles)
    }

    drawPosition() {
        // Stroke of Hexagons
        let hexagon = new Polygon(this.x, this.y, this.size, 6)
        noFill()
        strokeWeight(5)
        hexagon.drawPolygon()
        // Insert Tile
        imageMode(CENTER);
        image(this.tile, this.x, this.y)
        this.tile.resize(this.size, this.size)
    }
}