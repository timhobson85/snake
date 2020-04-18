const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const frameRate = 10;
const screenSize = 10;
const pixelSize = canvas.width / screenSize;

let pos, vel, food, snake;

init = () => {
  pos = { x: 10, y: 10 };
  vel = { x: 0, y: 0 };

  snake = [
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 }
  ];

  placeFood();
}

init();

function placeFood() {
  food = {
    x: Math.floor(Math.random() * pixelSize),
    y: Math.floor(Math.random() * pixelSize ),
  }

  for (let cell of snake) {
   if (cell.x === food.x && food.y === cell.y) {
     return placeFood();     
   } 
  }
}

document.addEventListener('keydown', keydown);

function keydown(e) {
  switch(e.keyCode) {
    case 37: {
      return vel = { x: -1, y: 0 }
    }
    case 38: {
      return vel = { x: 0, y: -1 }
    }
    case 39: {
      return vel = { x: 1, y: 0 }
    }
    case 40: {
      return vel = { x: 0, y: 1 }
    }
  }
}

setInterval(() => {
  requestAnimationFrame(gameLoop)
}, 1000 / frameRate);

function gameLoop() {
  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, canvas.width, canvas.height )
  
  ctx.fillStyle = 'fuchsia';
  for(let cell of snake){
    for (let cell of snake) {
      ctx.fillRect( cell.x*screenSize, cell.y*screenSize, screenSize, screenSize)
    }
  }

  ctx.fillStyle = 'cyan';
  ctx.fillRect(food.x*screenSize, food.y*screenSize, screenSize, screenSize);

  pos.x += vel.x;
  pos.y += vel.y;

  if (pos.x < 0 || pos.x > pixelSize || pos.y < 0 || pos.y > pixelSize) {
    init();    
  }

  if (food.x === pos.x && food.y === pos.y) {
    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;
    placeFood();
  } 

  if (vel.x || vel.y) {
    for ( let cell of snake ) {
      if (cell.x === pos.x && cell.y === pos.y) {
        return init();        
      }
    }
    snake.push({...pos});
    snake.shift();
  }
  
}

