import { Board } from "./board.js";
export { Piece, Line, Block, LeftJ, RightJ, LeftS, RightS, Tpiece };

class Piece {
    constructor(ctx, parent) {
        this.ctx = ctx;
        this.parent = parent;
        this.positionY = 0;

    }


    startPiece() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix.length; x++) {
                if (this.matrix[y][x] > 0) {
                    this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                }
            }
        }
        this.parent.correctChanges();
    }


    moveDown() {

        let proceed = true;
        let check = false;
        for (let y = 0; y < this.matrix.length; y++) {
            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = 0;
                    }
                }
            }

            for (let x = 0; x < this.matrix[y].length; x++) {
                if ((this.parent.grid[y + this.positionY + 1][x + this.positionX] === 0) && ((this.positionY + this.matrix.length) < this.parent.grid.length)) {
                    check = true;
                } else if (this.matrix[y][x] === 0) {
                    check = true; 
                } else {
                    check = false;
                    proceed = false;
                    console.log(false)
                }
            }
        }

        if (proceed === true) {

            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = 0;
                    }
                }
            }
            this.positionY++
            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                    }
                }
            }
            this.parent.correctChanges();
        }else if(proceed === false){
            console.log('down: false')
        }
    }

    keyListeners() {
        if (event.code === "ArrowRight") {
            this.moveRight();
        }
        if (event.code === "ArrowLeft") {
            this.moveLeft();
        }
    }

    moveRight() {
        let proceed = true;
        let check = false;
        for (let y = 0; y < this.matrix.length; y++) {
            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = 0;
                    }
                }
            }

            for (let x = 0; x < this.matrix[y].length; x++) {
                if ((this.parent.grid[y + this.positionY][x + this.positionX + 1] === 0) && ((this.positionX + this.matrix[y].length) < this.parent.grid[y].length)) {
                    check = true;
                } else if (this.matrix[y][x] === 0) {
                    check = true;
                } else {
                    check = false;
                    proceed = false;
                }
            }
        }

        if (proceed === true) {
            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = 0;
                    }
                }
            }

            this.positionX++;
            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                    }
                }
            }
            this.parent.correctChanges();
        } else {
            for (let y = 0; y < this.matrix.length; y++) {
                for (let x = 0; x < this.matrix.length; x++) {
                    if (this.matrix[y][x] > 0) {
                        this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                    }
                }
            }
            console.log(false)
        }



    }
    moveLeft() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix.length; x++) {
                if (this.matrix[y][x] > 0) {
                    this.parent.grid[y + this.positionY][x + this.positionX] = 0;
                }
            }
        }
        this.positionX--
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix.length; x++) {
                if (this.matrix[y][x] > 0) {
                    this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                }
            }
        }
        this.parent.correctChanges();
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
            [2],
            [2],
            [2],
            [2]
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