const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d');

const pixelSize = 10;
canvas.width = 200;
canvas.height = 200;

ctx.fillStyle = 'black';
ctx.fillRect( 0, 0, 800, 800 )

// let pos, vel, food, snake;

// draw a 'pixel'
// ctx.fillStyle = 'fuchsia';
// ctx.fillRect( canvas.width / 2 - ( pixelSize  ) , canvas.height / 2 - ( pixelSize  ), pixelSize, pixelSize )

createScreenArray = () => {
  const screen = new Array( canvas.height / pixelSize ).fill(null)
    .map( () => new Array( canvas.width / pixelSize ).fill(0))
  // console.log(screen);
}

createScreenArray();

let snake;

init = () => {
  pos = { x: 10, y: 10 };
  vel = { x: 0, y: 0 };

  snake = [
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 }
  ];

  // placeFood();
}

init();

function gameLoop() {
  for(let cell of snake){
    // console.log( cell )
    ctx.fillStyle = 'fuchsia';
    ctx.fillRect( cell.x * pixelSize , cell.y * pixelSize , pixelSize, pixelSize )
  }
}
gameLoop();

// init();

// function placeFood() {
//   food = {
//     x: Math.floor(Math.random() * ),
//     y: Math.floor(Math.random() * ),
//   }
// }
