import { Line, Block, RightJ, LeftJ, RightS, LeftS, Tpiece, Piece } from "./pieces.js";
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
ctx.fillStyle = 'blue';
async function play(ctx) {
  let board = new Board(ctx);
  board.checkBoard();
}



  button.onclick = () => play(ctx);


  
  // ctx.fillRect(6, 0, 1, 1);
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


  