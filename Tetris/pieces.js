//exports to board
export { Piece, Line, Block, LeftJ, RightJ, LeftS, RightS, Tpiece };


class Piece {
    constructor(ctx, parent) {
        this.ctx = ctx;
        this.parent = parent;
        this.positionY = 0;
        this.positionX = 4;
        this.canMoveDown = false;
        this.canMoveRight = false;
        this.canMoveLeft = false;
        this.pieceSpeed = 1;
        this.isActive = true;
    }

    fillMatrix() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix.length; x++) {
                if (this.matrix[y][x] > 0) {
                    this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                }
            }
        }
    }

    clearMatrix() {
        if (this.isActive) {

            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = 0;
                    }
                }
            }
        }
    }


    left() {
        this.clearMatrix();
        this.positionX--;
        this.fillMatrix();
        this.parent.correctChanges();

    }
    down() {
        this.clearMatrix();
        this.positionY++;
        this.fillMatrix();
        this.parent.correctChanges();

    }
    right() {
        this.clearMatrix();
        this.positionX++;
        this.fillMatrix();
        this.parent.correctChanges();
    }

    keyListeners() {
        this.clearMatrix();
        this.determineBoundaries();
        if (this.canMoveRight && event.code === "ArrowRight" && this.isActive) {
            this.right();
        } else {
        };
        if (this.canMoveLeft && event.code === "ArrowLeft" && this.isActive) {
            this.left();
        } else {
        }
        if (this.canMoveDown && event.code === "ArrowDown" && this.isActive) {
            this.pieceSpeed = 3;
        };
        this.canMoveRight = false;
        this.canMoveLeft = false;
    }


    determineBoundaries() {

        let canMoveDownTally = [];
        let canMoveRightTally = [];
        let canMoveLeftTally = [];

        this.clearMatrix();
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x] > 0) {
                    console.log(this.positionY + y + 1)
                    if (this.positionY + y + 1 < this.parent.grid.length) {
                        canMoveDownTally.push(true);
                    } else if (this.positionY + y + 1 !== 0){
                        canMoveDownTally.push(false);
                    }else{
                        canMoveDownTally.push(false);
                    }
                    if (this.parent.grid[this.positionY + y][1 + this.positionX + x] === 0 && this.positionX + x < this.parent.grid[y].length) {
                        canMoveRightTally.push(true);
                    } else {
                        canMoveRightTally.push(false);
                    }
                    if (this.parent.grid[this.positionY + y][this.positionX + x - 1] === 0 && (this.positionX + x) > 0) {
                        canMoveLeftTally.push(true);
                    } else {
                        canMoveLeftTally.push(false);
                    }
                } else {
                    canMoveDownTally.push(true);
                    canMoveRightTally.push(true);
                    canMoveLeftTally.push(true);
                }
            }
        }
        //DETERMINES MOVE POSSIBILITIES FOR THE WHOLE PIECE
        this.canMoveDown = canMoveDownTally.every(Boolean);
        this.canMoveRight = canMoveRightTally.every(Boolean);
        this.canMoveLeft = canMoveLeftTally.every(Boolean);
        this.fillMatrix();
        if (this.canMoveDown === false) {
            this.isActive = false;
        }
       
    }

    move() {
        document.addEventListener("keydown", () => { this.keyListeners() });
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                console.log(this.parent.grid);
                console.log(this.canMoveDown)
                if (this.isActive === true){
                    this.determineBoundaries();
                    if(this.canMoveDown){
                        this.down();
                    } else {
                        delete this.keyListeners;
                        this.isActive = false;
                        this.parent.pieceIsActive = false;
                    }
                }
            }, (1000 * i));

        }
    }
}



class Block extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'yellow';
        this.matrix = [
            [1, 1],
            [1, 1]
        ];

    }
}

class Line extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'lightblue';
        this.matrix = [
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
        ]

    }
}

class LeftJ extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'blue';
        this.matrix = [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0]
        ]

    }
}

class RightJ extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'orange';
        this.matrix = [
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4]
        ]

    }
}

class LeftS extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'red';
        this.matrix = [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0]
        ]

    }
}

class RightS extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'greena';
        this.matrix = [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0]
        ]

    }
}

class Tpiece extends Piece {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.positionX = 4;
        this.fillStyle = 'purple';
        this.matrix = [
            [0, 7, 0],
            [7, 7, 7]
        ]

    }
}




//this.parent.grid[y + this.positionY -1][xi + this.positionX] = 0;