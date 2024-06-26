//import
import { ROWS, COLS, gameOver } from "./constants.js";
import { Line, Block, RightJ, LeftJ, RightS, LeftS, Tpiece } from "./pieces.js";


//board.js

//General class to create grid for pieces to navigate through

export class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
    this.pieceIsActive = false;
    this.currentPiece = Object;
    this.heldPiece = Object;
    this.nextPiece = Object;
    this.gameIsActive = true;
    this._score = 0;
    this._level = 1;
    this._linesCleared = 0;
    this._levelTally = 0;
    this.speedMultiplier = 1;
    this.controls = { up: false, left: false, down: false, right: false };
  }

  toggleControls() {
    this.controls.up = false;
    this.controls.left = false;
    this.controls.right = false;
    this.controls.down = false;
  }
  //Updates the visuals to represent changes made to the grid, use after every piece move
  correctChanges() {
    document.getElementById("score").textContent = this._score;
    document.getElementById("level").textContent = this._level;
    document.getElementById("lines").textContent = this._linesCleared;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] > 0) {
          switch (this.grid[y][x]) {
            case 1: this.ctx.fillStyle = 'yellow'
              break;
            case 2: this.ctx.fillStyle = 'lightblue'
              break;
            case 3: this.ctx.fillStyle = 'blue'
              break;
            case 4: this.ctx.fillStyle = 'orange'
              break;
            case 5: this.ctx.fillStyle = 'red'
              break;
            case 6: this.ctx.fillStyle = 'green'
              break;
            case 7: this.ctx.fillStyle = 'purple'
              break;
          }
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
    let randomNum = Math.floor(Math.random() * 7);
    console.log(randomNum);
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
      case 6:
        piece = new Tpiece(this.ctx, this);
        break;
    }
    this.currentPiece = piece;
  }

  async checkBoard() {
   for(let i = 1; i < 1000; i++) {
      setTimeout(() => {
        if (this.pieceIsActive === false) {
          this._score += 10;
          this.clearLines();
          let lossCheckTally = [];
          for (let i = 0; i < this.grid[0].length; i++) {
            if (this.grid[0][i] === 0) {
              lossCheckTally.push(true);
            } else {
              lossCheckTally.push(false)
            }
          }
          let lossCheck = lossCheckTally.every(Boolean);
          if (lossCheck) {
            this.newPiece();
            this.pieceIsActive = true;
            this.currentPiece.move();
          } else {
            gameOver.hidden = false;
            button.hidden = false;
            return this._score;
          }



        }
      },i * 1000)
    }
  }

  clearLines() {
    let rowMultiplier = 1;
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row].every(Boolean)) {
        this._linesCleared++;
        this._levelTally++;
        this._score += (100 * rowMultiplier);
        rowMultiplier++;
        this.grid.splice(row, 1);
        this.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        console.log(this.grid);
        if (this._levelTally >= 4) {
          this._level++;
          this.speedMultiplier += .5;
          this._levelTally -= 4;
        }
        this.correctChanges();
      }
    }
  }


  //defines cleared board in between each move
  getEmptyBoard() {
    return Array.from(
      { length: ROWS }, () => Array(COLS).fill(0)
    );
  }



}



