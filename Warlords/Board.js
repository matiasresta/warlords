class Board {
    constructor(x, y, w, size, tiles) {
        angleMode(DEGREES)
        this.x = x;
        this.y = y;
        this.w = w;
        this.incrementW = w;
        this.h = this.w * 2 - 1;
        this.size = size;
        this.tiles = tiles
        this.distanceH = sin(60) * this.size;
        this.distanceV = cos(60) * this.size;

        // Creation of 2D irregular Array
        this.notIncrement = false;
        this.boardPositions = [];
        for (let i = 0; i < this.h; i++) {
            this.boardPositions.push([])
            for (let j = 0; j < this.incrementW; j++) {
                this.boardPositions[i].push(new Position(this.x, this.y, this.size, this.tiles))
            }
            (this.incrementW >= this.h) || this.notIncrement ? (this.notIncrement = true, this.incrementW--) : this.incrementW++;
        }

        // Arranges Board
        for (let i = 0; i < this.boardPositions.length; i++) {
            for (let j = 0; j < this.boardPositions[i].length; j++) {
                // Centers Board
                this.boardPositions[i][j].x += -this.distanceH * (this.w - 1) / 2
                this.boardPositions[i][j].y += -this.distanceV * 1.5 * (this.w - 1)
                // Creates Y Division of each Row
                this.boardPositions[i][j].x += 0
                this.boardPositions[i][j].y += this.distanceV * i * 3 / 2
                // Creates X division inside each Row
                this.boardPositions[i][j].x += this.distanceH * j
                this.boardPositions[i][j].y += 0
                // Adjust each Row to fit a Board
                let rowQuantity = this.boardPositions[i].length
                rowQuantity > this.w ? this.boardPositions[i][j].x += -(rowQuantity - this.w) * this.distanceH * 0.5 : this.boardPositions[i][j].x = this.boardPositions[i][j].x

            }
        }

        // Creating a 2DVector Array Containing Positions Center
        this.positionsCoordenates = [];
        for (let i = 0; i < this.boardPositions.length; i++) {
            this.positionsCoordenates.push([])
            for (let j = 0; j < this.boardPositions[i].length; j++) {
                let posX = this.boardPositions[i][j].x
                let posY = this.boardPositions[i][j].y
                this.positionsCoordenates[i].push(createVector(posX, posY));
            }
        }
    }

    showBoard() {
        for (let i = 0; i < this.boardPositions.length; i++) {
            for (let j = 0; j < this.boardPositions[i].length; j++) {
                stroke(0)
                this.boardPositions[i][j].drawPosition();
            }
        }
    }

    selectUnit(unitList) {
        unitList.forEach(unit => {
            if (unit.isSelected === true) {
                this.nonSelected = false
            }
        })
        if (mouseIsPressed) {
            unitList.forEach(unit => {
                if (dist(mouseX, mouseY, unit.currentPosition.x, unit.currentPosition.y) < unit.unitSize / 2) {
                    unit.isSelected = true
                } else {
                    unit.isSelected = false
                }
            })
        }
    }

    unitPositions(unitList) {
        let unitPositionsCoordenates = []
        unitList.forEach(unit => {
            unitPositionsCoordenates.push(createVector(unit.x, unit.y))
        })
        unitList.forEach(unit => {
            unit.occupiedPositions = unitPositionsCoordenates
        })
    }

}