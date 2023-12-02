//import
import { ROWS, COLS } from "./constants.js";



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
      this.ctx.fillRect(x ,y , 1, 1)
      }else{this.ctx.clearRect(x, y, 1, 1)}
      
      }
    }
    console.log(this.grid);
  }

  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }
}






  