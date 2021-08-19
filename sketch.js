let tiles;
let unitsAsset
let back;
let size = 150;

function preload() {
    tiles = ["grassTile.png", "forestTile.png", "mountainTile.png", "marshTile.png"]
    for (let i = 0; i < tiles.length; i++) {
        tiles[i] = loadImage("assets/tiles/" + tiles[i])
    }
    unitsAsset = ["archerUnit.png", "cannonUnit.png", "kingUnit.png", "knightUnit.png", "swordmanUnit.png"]
    for (let i = 0; i < unitsAsset.length; i++) {
        unitsAsset[i] = loadImage("assets/units/" + unitsAsset[i])
    }
    back = loadImage("assets/back.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    game = new Game(unitsAsset, tiles, back, size)
}

function draw() {
    game.checkDeath()
    game.showGame()
}


function mousePressed() {
    game.selectUnit()
}