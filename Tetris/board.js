//import
import { ROWS, COLS } from "./constants.js";
import { Line, Block, RightJ, LeftJ, RightS, LeftS, Tpiece } from "./pieces.js";


//board.js

//General class to create grid for pieces to navigate through

export class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
    this.pieceIsActive = false;
    this.gameIsActive = true;
  }


  //Updates the visuals to represent changes made to the grid, use after every piece move
  correctChanges() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] > 0) {
          this.ctx.fillRect(x, y, 1, 1);
          this.ctx.beginPath();
          this.ctx.moveTo(x, y - .1);
          this.ctx.lineTo(x, y + .9);
          this.ctx.lineTo(x + .9, y + .9);
          this.ctx.lineTo(x + .9, y);
          this.ctx.lineTo(x, y);
          this.ctx.lineWidth = 0.2;
          this.ctx.stroke();
        } else { this.ctx.clearRect(x, y, 1, 1) }
      }
    }
  }



  //generates a random new piece and initializes move function, then determines if a new piece should be dropped

  newPiece() {
    this.pieceIsActive = true;
    let piece = 'obj';
    let randomNum = Math.floor(Math.random() * 6);
    switch (randomNum) {
      case 0:
        piece = new Block(this.ctx, this);
        break;
      case 1:
        piece = new Line(this.ctx, this);
        break;
      case 2:
        piece = new LeftS(this.ctx, this);
        break;
      case 3:
        piece = new RightS(this.ctx, this);
        break;
      case 4:
        piece = new LeftJ(this.ctx, this);
        break;
      case 5:
        piece = new RightJ(this.ctx, this);
        break;
      case 5:
        piece = new Tpiece(this.ctx, this);
        break;
    }
    this.ctx.fillStyle = piece.fillStyle;
    piece.move();

  }

  checkBoard() {
    for (let i = 1; i < 500; i++) {
      setTimeout(() => {
        if (this.pieceIsActive === false){
          console.log('new piece')
          this.newPiece();
          this.pieceIsActive = true;
        }
      }, i * 1000)

    }


  }



  //defines cleared board in between each move
  getEmptyBoard() {
    return Array.from(
      { length: ROWS }, () => Array(COLS).fill(0)
    );
  }



}



