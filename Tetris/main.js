import { line, block, rightS, leftS, rightJ, leftJ } from "./pieces.js";
import { COLS, ROWS, BLOCK_SIZE } from "./constants.js";
import { Board } from "./board.js"; 

const button = document.querySelector("button");


//main.js
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);


function play() {
  let board = new Board(ctx);
    let a = 3;
    let b = 0;
    document.addEventListener("keydown", ()=>{
      if(event.code === 'ArrowRight'){
        a++;
        
      }else if(event.code === 'ArrowLeft'){
        a--;
      }})
  
  for(let i = 0; i < (19); i++){
      setTimeout(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        test(board.ctx, block, a, b);
        //b++;
      }, 100 * i)
        
  }
}

  
  


button.addEventListener("click", play)

ctx.fillStyle = 'blue';
function test(ctx, piece, positionX, positionY) {
  let xi = positionX;
  let yi = positionY;
  for (let y = 0; y < piece.length; y++) {
   
    for (let x = 0; x < (piece[y].length); x++) {
      if (piece[y][x] > 0) {
        ctx.fillRect(xi, yi, 1, 1);
        xi++;
      }
    }
    yi++;
    xi = positionX;
  }
}
// ctx.fillRect(6, 0, 1, 1);
//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


