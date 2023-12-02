import { Board } from "./board.js";
const leftJ = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
]

const rightJ = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
]

const leftS = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

const rightS = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]


const block = [
    [1, 1],
    [1, 1]
]

const line = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
]

export { Piece, Block };

class Piece {
   constructor(ctx, parent){
    this.ctx = ctx;
    this.parent = parent;
    this.positionY = 0;

   }
   moveDown() {
    for(let x = 0; x < this.matrix.length; x++){
        this.parent.grid[this.positionY][x + this.positionX] = 0;
        }     
    this.positionY++
    for(let y = 0; y < this.matrix.length; y++){
        for(let x = 0; x < this.matrix.length; x++){
        this.parent.grid[y + this.positionY][x + this.positionX] = this.matrix[y][x];
        }
        
    }
   
   }
   moveRight() {
    for(let x = 0; x < this.matrix.length; x++){
        this.parent.grid[this.positionY][x + this.positionX] = 0;
        }     
    this.positionX++
    for(let y = 0; y < this.matrix.length; y++){
        for(let x = 0; x < this.matrix.length; x++){
        this.parent.grid[this.positionY][x + this.positionX + 1] = this.matrix[y][x];
        }
        
    }
   
   }
}

class Block extends Piece {
    constructor(ctx, parent){
        super(ctx, parent);
        this.positionX = 4;        
        this.matrix = [
            [1, 1],
            [1, 1]
        ];
     
    }
}
//this.parent.grid[y + this.positionY -1][xi + this.positionX] = 0;