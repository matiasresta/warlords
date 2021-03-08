class Game {
    constructor(unitsAsset, tiles, back, size) {
        this.size = size
        this.unitsAsset = unitsAsset
        this.board = new Board(width / 2, height / 2, 4, this.size.valueOf(), tiles)
        this.units = [
            new SwordMan("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 1].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 1].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new SwordMan("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 2].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 2].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new SwordMan("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 3].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 3].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new Knight("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 4].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 1][this.board.w - 4].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new Cannon("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 2][this.board.w - 4].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 2][this.board.w - 4].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new King("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 2][this.board.w - 3].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 2][this.board.w - 3].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new Archer("P1", this.board.positionsCoordenates[(this.board.h - 1) / 2 - 2][this.board.w - 2].x, this.board.positionsCoordenates[(this.board.h - 1) / 2 - 2][this.board.w - 2].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new SwordMan("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w - 2].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w - 2].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new SwordMan("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w - 1].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w - 1].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new SwordMan("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w - 0].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w - 0].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new Knight("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w + 1].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 1][this.board.w  +  1].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new Archer("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 2][this.board.w - 2].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 2][this.board.w - 2].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new King("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 2][this.board.w - 1].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 2][this.board.w - 1].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset),
            new Cannon("P2",this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 2][this.board.w - 0].x, this.board.positionsCoordenates[(this.board.h - 1) - (this.board.h - 1) / 2 + 2][this.board.w - 0].y, this.size.valueOf(), this.board.positionsCoordenates, this.unitsAsset)
        ]
        this.back = back
    }

    showGame(){
        // Background Image
        image(this.back, width / 2, height / 2, width, height)

        // Board Handling
        this.board.showBoard()
        this.board.unitPositions(this.units)

        // Unit Handling
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].attackUnit(this.units)
            this.units[i].showUnit()
            this.units[i].move()
        }

    }

    selectUnit(){
        for (let i = 0; i < this.units.length; i++) {
            this.board.selectUnit(this.units)
        }
    }

    checkDeath(){
        for (let i = 0; i < this.units.length; i++){
            this.units[i].isDead()
            if (!this.units[i].alive){
                this.units.splice(i, 1)
            }
        }
        this.board.unitPositions(this.units)
    }
}