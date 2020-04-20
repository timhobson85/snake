const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

const frameRate = 10;
const screenSize = 20;
const pixelSize = canvas.width / screenSize;

let pos, vel, food, snake, score;

init = () => {
  score = 0;
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
      return turnLeft();
    }
    case 38: {
      return turnUp();
    }
    case 39: {
      return turnRight();
    }
    case 40: {
      return turnDown();
    }
  }
}

// don't instantly die if you try to go backwards
function turnLeft() {
  if (vel.x === 1 && vel.y === 0) {
    return
  } else {
    return vel = { x: -1, y: 0 }
  }
}

function turnUp() {
  if (vel.x === 0 && vel.y === 1) {
    return
  } else {
    return vel = { x: 0, y: -1 }
  }
}

function turnRight() {
  if (vel.x === -1 && vel.y === 0) {
    return
  } else {
    return vel = { x: 1, y: 0 }
  }
}

function turnDown() {
  if (vel.x === 0 && vel.y === -1) {
    return
  } else {
    return vel = { x: 0, y: 1 }
  }
}

document.getElementById('left').addEventListener('click', () => turnLeft())
document.getElementById('up').addEventListener('click', () => turnUp())
document.getElementById('right').addEventListener('click', () => turnRight())
document.getElementById('down').addEventListener('click', () => turnDown())

setInterval(() => {
  requestAnimationFrame(gameLoop)
}, 1000 / frameRate);

function gameLoop() {
  
  document.getElementById('score').innerHTML = score
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
  
  if (pos.x < 0 || pos.x >= pixelSize || pos.y < 0 || pos.y >= pixelSize) {
    init();    
  }
  
  if (food.x === pos.x && food.y === pos.y) {
    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;
    score++
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


