class Unit {
    constructor(p, x, y, size, positionsCoordenates, units) {
        print(p)
        this.p = p
        this.x = x;
        this.y = y;
        this.size = size;
        this.units = units;
        this.m = false
        this.positionsCoordenates = positionsCoordenates
        this.occupiedPositions = []
        this.unitList;
        this.movement = createVector(this.x, this.y);
        this.currentPosition = createVector(this.x.valueOf(), this.y.valueOf());
        this.unitSize = this.size.valueOf() * 0.5
        this.alive = true
        this.isSelected = false
        if (this.p === "P1"){
            this.pCol = color(0, 0, 255)
        } else {
            this.pCol = color(255, 0, 0)
        }
    }

    showUnit(img, health, maxHealth) {
        if (this.alive) {
            this.isDead()
            let healthBar = map(health, 0, maxHealth, 0, this.unitSize / 2)
            let r = 0;
            let g = 255;
            let b = 0
            if (health < 50) {
                r = map(health, 0, maxHealth, 255, 0)
                g = map(health, 0, maxHealth / 2, 0, 255)
                b = 0
            } else if (health <= maxHealth / 2) {
                r = map(health, 0, maxHealth, 0, 255)
            }
            let col = color(r, g, b)
            strokeWeight(3)
            stroke(0)
            fill(this.pCol)
            circle(this.x, this.y, this.unitSize)
            imageMode(CENTER);
            image(img, this.x, this.y)
            img.resize(this.unitSize.valueOf() * 0.9, this.unitSize * 0.9)

            noStroke()
            fill(col)
            rect(this.x - this.unitSize / 4, this.y + this.unitSize / 2, healthBar, this.unitSize / 10)

            noFill()
            stroke(1)
            rect(this.x - this.unitSize / 4, this.y + this.unitSize / 2, this.unitSize / 2, this.unitSize / 10)
        }
    }

    move(posiblePositions) {
        if (this.isSelected) {
            let distance = dist(mouseX, mouseY, this.currentPosition.x, this.currentPosition.y);
            if (mouseIsPressed) {
                if (distance < this.unitSize / 2 || this.m) {
                    noStroke()
                    fill(0, 70)
                    circle(this.x, this.y, this.unitSize)
                    this.x = mouseX
                    this.y = mouseY
                    this.m = true
                    this.movement = this.nearestPosition(posiblePositions)
                }
            } else {
                this.m = false
                this.movement != null ? (this.x = this.movement.x, this.y = this.movement.y, this.currentPosition = createVector(this.x.valueOf(), this.y.valueOf())) : (this.x = this.currentPosition.x, this.y = this.currentPosition.y)
                this.isSelected = false
            }
        }
    }

    nearestPosition(tempPosiblePositions) {
        let posiblePositions = tempPosiblePositions.flat()
        let nearestPosition;
        for (let i = 0; i < posiblePositions.length; i++) {
            if (dist(mouseX, mouseY, posiblePositions[i].x, posiblePositions[i].y) < this.size / 2) {
                nearestPosition = posiblePositions[i]
            }
        }
        return nearestPosition
    }

    posiblePositions(positionsCoordenates, occupiedPositions, range) {
        let posiblePositions = [];
        for (let i = 0; i < positionsCoordenates.length; i++) {
            for (let j = 0; j < positionsCoordenates[i].length; j++) {
                if (dist(this.currentPosition.x, this.currentPosition.y, positionsCoordenates[i][j].x, positionsCoordenates[i][j].y) < this.size * range) {
                    posiblePositions.push(positionsCoordenates[i][j])
                    occupiedPositions.forEach(occupiedPosition => {
                        if (positionsCoordenates[i][j].x === occupiedPosition.x && positionsCoordenates[i][j].y === occupiedPosition.y) {
                            posiblePositions.splice(posiblePositions.indexOf(positionsCoordenates[i][j]))
                        }
                    })
                }
            }
        }
        return posiblePositions
    }

    attackUnit(tempUnitList, nearestPosition) {
        if (this.isSelected) {
            let unitList = [...tempUnitList]
            if (nearestPosition !== undefined) {
                // Eliminate Attack Unit from UnitList
                unitList.forEach(unit => {
                    if (this.currentPosition.x === unit.currentPosition.x && this.currentPosition.y === unit.currentPosition.y) {
                        unitList.splice(unitList.indexOf(unit), 1)
                    }
                })
                unitList.forEach(unit => {
                    if (dist(this.currentPosition.x, this.currentPosition.y, unit.x, unit.y) < this.size * this.attackRange) {
                        if (dist(mouseX, mouseY, unit.x, unit.y) < this.size / 2) {
                            if (!mouseIsPressed && unit.p !== this.p) {
                                unit.health -= this.damage
                            }
                        }
                    }
                })
            }
        }
    }

    isDead() {
        this.health <= 0 ? this.alive = false : this.alive = true;
        if (this.health <= 0) {
            return false
        } else {
            return true
        };
    }
}

class Cannon extends Unit {
    constructor(p, x, y, size, positionsCoordenates, units) {
        super(p, x, y, size, positionsCoordenates, units);
        this.maxHealth = 50
        this.health = this.maxHealth.valueOf()
        this.range = 1;
        this.attackRange = 2
        this.damage = 50
    }

    showUnit() {
        let img = this.units[1]
        super.showUnit(img, this.health, this.maxHealth);

    }

    move() {
        let posiblePositions = []
        posiblePositions = super.posiblePositions(this.positionsCoordenates, this.occupiedPositions, this.range)
        super.move(posiblePositions);
    }

    attackUnit(gameUnits) {
        super.attackUnit(gameUnits, super.nearestPosition(this.positionsCoordenates));
    }

    isDead() {
        super.isDead();
    }
}

class Knight extends Unit {
    constructor(p, x, y, size, positionsCoordenates, units) {
        super(p, x, y, size, positionsCoordenates, units);
        this.maxHealth = 125
        this.health = this.maxHealth.valueOf()
        this.range = 2;
        this.attackRange = 1
        this.damage = 25
    }
    showUnit() {
        let img = this.units[3]
        super.showUnit(img, this.health, this.maxHealth);
    }
    move() {
        let posiblePositions = []
        posiblePositions = super.posiblePositions(this.positionsCoordenates, this.occupiedPositions, this.range)
        super.move(posiblePositions);
    }
    attackUnit(gameUnits) {
        super.attackUnit(gameUnits, super.nearestPosition(this.positionsCoordenates), this.attackRange);
    }
    isDead() {
        super.isDead();
    }
}

class SwordMan extends Unit {
    constructor(p, x, y, size, positionsCoordenates, units) {
        super(p, x, y, size, positionsCoordenates, units);
        this.maxHealth = 100
        this.health = this.maxHealth.valueOf()
        this.range = 1;
        this.attackRange = 1;
        this.damage = 25;
    }
    showUnit() {
        let img = this.units[4]
        super.showUnit(img, this.health, this.maxHealth);
    }
    move() {
        let posiblePositions = []
        posiblePositions = super.posiblePositions(this.positionsCoordenates, this.occupiedPositions, this.range)
        super.move(posiblePositions);
    }
    attackUnit(gameUnits) {
        super.attackUnit(gameUnits, super.nearestPosition(this.positionsCoordenates), this.attackRange);
    }
    isDead() {
        super.isDead();
    }
}

class Archer extends Unit {
    constructor(p, x, y, size, positionsCoordenates, units) {
        super(p, x, y, size, positionsCoordenates, units);
        this.maxHealth = 75
        this.health = this.maxHealth.valueOf()
        this.range = 1;
        this.attackRange = 2;
        this.damage = 25;
    }
    showUnit() {
        let img = this.units[0]
        super.showUnit(img, this.health, this.maxHealth);
    }
    move() {
        let posiblePositions = []
        posiblePositions = super.posiblePositions(this.positionsCoordenates, this.occupiedPositions, this.range)
        super.move(posiblePositions);
    }
    attackUnit(gameUnits) {
        super.attackUnit(gameUnits, super.nearestPosition(this.positionsCoordenates), this.attackRange);
    }
    isDead() {
        super.isDead();
    }
}

class King extends Unit {
    constructor(p, x, y, size, positionsCoordenates, units) {
        super(p, x, y, size, positionsCoordenates, units);
        this.maxHealth = 200
        this.health = this.maxHealth.valueOf()
        this.range = 1;
        this.attackRange = 1;
        this.damage = 30;
    }
    showUnit() {
        let img = this.units[2]
        super.showUnit(img, this.health, this.maxHealth);
    }
    move() {
        let posiblePositions = []
        posiblePositions = super.posiblePositions(this.positionsCoordenates, this.occupiedPositions, this.range)
        super.move(posiblePositions);
    }
    attackUnit(gameUnits) {
        super.attackUnit(gameUnits, super.nearestPosition(this.positionsCoordenates), this.attackRange);
    }
    isDead() {
        super.isDead();
    }
}