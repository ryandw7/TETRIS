//exports to board
export { Piece, Line, Block, LeftJ, RightJ, LeftS, RightS, Tpiece };
class Piece {
    constructor(ctx, parent) {
        this.ctx = ctx;
        this.parent = parent;
        this.positionY = 0;
        this.positionX = 4;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;
        this.canRotate = true;
        this.pieceSpeed = 1;
        this.isActive = true;

    }
    //Fill parent board with matrix position
    fillMatrix() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix.length; x++) {
                if (this.matrix[y][x] > 0) {
                    this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
                }
            }
        }
    }
    //Clear CURRENT matrix position
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


    rotateMatrix() {
        //Tally to segment array into 3 seperate rows and remember which index was left off at
        let tally = 0;
        let newArray = [];
        let newMatrix = [];
        let canRotateTally = [];
        //Breaks piece matrix into a single array
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix.length; col++) {
                newArray.push(this.matrix[col][row]);
            }
        }
        for (let row = 0; row < Math.sqrt(newArray.length); row++) {
            // Creates new row for rotated matrix
            newMatrix.push([]);

            //Loops throw matrix by column
            for (let col = 0; col < Math.sqrt(newArray.length); col++) {
                newMatrix[row].push(newArray[tally]);
                tally++
            }
        }

        //Reverses current rows
        for (let i = 0; i < newMatrix.length; i++) {
            newMatrix[i] = newMatrix[i].reverse();
        }
        //Determine if piece is in bounds to rotate
        for (let row = 0; row < newMatrix.length; row++) {
            for (let col = 0; col < newMatrix.length; col++) {
                if (newMatrix[row][col] > 0) {
                    if ((this.parent.grid[row + this.positionY][col + this.positionX] === 0) && (this.positionX + col <= 10) && (this.positionX + col > 0)) {
                        canRotateTally.push(true);
                    } else {
                        canRotateTally.push(false)
                    }
                } else {
                    canRotateTally.push(true)
                }
            }
        }
        this.canRotate = canRotateTally.every(Boolean);
        //Replaces matrix with rotated matrix if prereqs met
        if (this.canRotate) {
            this.matrix = newMatrix;
        }
    }

    rotatePiece() {
        this.clearMatrix();
        this.rotateMatrix();
        this.fillMatrix();
        this.parent.correctChanges();
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
        if (this.isActive) {
            this.clearMatrix();
            this.determineBoundaries();
            console.log('checking events')
            if (this.canMoveRight && (event.code === "ArrowRight" || this.parent.controls.right === true)) {
                this.right();
            } else {
            };
            if (this.canMoveLeft && (event.code === "ArrowLeft" || this.parent.controls.left === true)) {
                this.left();
            } else {
            }
            if (this.canMoveDown && (event.code === "ArrowUp" || this.parent.controls.up === true)) {
                this.rotatePiece();
            };
            if (this.canMoveDown && (event.code === "ArrowDown" || this.parent.controls.down === true)) {
                this.pieceSpeed = 10;
            };
            if (event === "touchend"){
                this.pieceSpeed = 1;
            }
          
        }
    }


    determineBoundaries() {
        if (this.isActive) {
            let canMoveDownTally = [];
            let canMoveRightTally = [];
            let canMoveLeftTally = [];
            //Loop through each matrix segment and compare with parent grid
            this.clearMatrix();
            for (let y = 0; y < this.matrix.length; y++) {
                
                for (let x = 0; x < this.matrix[y].length; x++) {
                    if (this.matrix[y][x] > 0) {
                        if (this.positionY + 1 + y < this.parent.grid.length) {
                            if (this.parent.grid[this.positionY + y + 1][this.positionX + x] === 0) {

                                canMoveDownTally.push(true);
                            } else {
                                canMoveDownTally.push(false);
                            }
                        } else {
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
        }
    }

    async move() {
        document.addEventListener("keydown", () => this.keyListeners());
        document.addEventListener('touchstart', () => this.keyListeners());
        document.addEventListener('touchend', () => {
            this.keyListeners();
            this.pieceSpeed = 1;
        });
        document.addEventListener("keyup", () => this.pieceSpeed = 1);
        if (this.isActive) {
            for (let i = 0; i < 20; i++) {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        if (this.isActive === true) {
                            this.determineBoundaries();
                            if (this.canMoveDown) {
                                this.down();
                            } else if (!this.canMoveDown) {
                                setTimeout(() => {
                                    this.determineBoundaries();
                                    if (!this.canMoveDown && this.isActive) {
                                        console.log('piece is not active')
                                        this.isActive = false;
                                        this.parent.pieceIsActive = false;
                                        resolve(false)
                                    }
                                }, 500);
                            } else { this.down() }

                        } else {
                            // this.parent.pieceIsActive = false;
                            resolve(false)
                        }
                        resolve(true)
                    }, (500) / ((this.pieceSpeed) * (this.parent.speedMultiplier)));

                }
                )
            }
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
        this.fillStyle = 'green';
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
            [7, 7, 7],
            [0, 0, 0]
        ]

    }
}
