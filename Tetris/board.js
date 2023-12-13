//import
import { ROWS, COLS } from "./constants.js";
import { Line, Block, RightJ, LeftJ, RightS, LeftS, Tpiece } from "./pieces.js";


//board.js
export class Board { 
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
  }
  
  correctChanges(){
    for(let y = 0; y < this.grid.length; y++){
      for(let x = 0; x < this.grid[y].length; x++){
      if(this.grid[y][x] > 0){
      this.ctx.fillRect(x ,y , 1, 1);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y -.1);
      this.ctx.lineTo(x , y + .9);
      this.ctx.lineTo(x + .9, y + .9);
      this.ctx.lineTo(x + .9, y);
      this.ctx.lineTo(x , y);
      this.ctx.lineWidth = 0.2;
      this.ctx.stroke();
      }else{this.ctx.clearRect(x, y, 1, 1)}
      
      }
    }
    console.log(this.grid);
  }
  
  checkForLoss(piece){
   
    if(piece.positionY + piece.matrix.length === this.grid.length){
      this.newPiece()
    }
     
    
  }

  async newPiece() {
    let piece = 'obj';
    let randomNum = Math.floor(Math.random() * 6);
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
      case 5:
        piece = new Tpiece(this.ctx, this);
        break;
    }
    document.addEventListener("keydown", ()=> piece.keyListeners());
    this.ctx.fillStyle = piece.fillStyle;
    piece.startPiece();
    setTimeout(()=>{
      for (let i = 0; i < this.grid.length - piece.matrix.length; i++) {
        
      setTimeout(() => { piece.moveDown(); 
        this.checkForLoss(piece)}, 1000 * i)
     
    }}, 1000)
}

  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }
}






  