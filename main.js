import { Line, Block, RightJ, LeftJ, RightS, LeftS, Tpiece, Piece } from "./pieces.js";
import { COLS, ROWS, BLOCK_SIZE, gameOver } from "./constants.js";
import { Board } from "./board.js";
let canPressPlay = true;
const button = document.getElementById("play-button");
const menu = document.getElementById("menu");
//main.js
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const upBtn = document.getElementById('up');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const downBtn = document.getElementById('down');
document.addEventListener('gesturestart', function (e) {
  e.preventDefault()
})

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
gameOver.hidden = true;
// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
ctx.fillStyle = 'blue';
async function play(ctx) {
  if (canPressPlay) {
    canPressPlay = false;
    menu.style.display = "none";
    
    let board = new Board(ctx);
    document.addEventListener('touchend', () => {
      board.toggleControls();
    })
    upBtn.addEventListener('touchstart', () => {
      if(board.pieceIsActive === true){
      board.controls.up = true;}
    });
    leftBtn.addEventListener('touchstart', () => {
      if(board.pieceIsActive === true){
      board.controls.left = true;}
    });
    downBtn.addEventListener('touchstart', () => {
      if(board.pieceIsActive === true){
      board.controls.down = true;}
    });
    rightBtn.addEventListener('touchstart', () => {
      if(board.pieceIsActive === true){
      board.controls.right = true;}
    });
    board.checkBoard();
  }
}



button.onclick = () => {
  play(ctx);
  console.log('play')
}

// ctx.fillRect(6, 0, 1, 1);
//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


