const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 10; /* alla rutor */
const tileCount = canvas.width / box;
const scoreText = document.getElementById("scoreText");
const startBtn = document.getElementById("startBtn");
const pausBtn = document.getElementById("pausBtn");
let score = 0;
let speed = 100;

let snake = [
    {x: 10, y: 10},
    {x: 9, y: 10},
    {x: 8, y: 10},
    {x: 7, y: 10}
];

let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
}

let dx = 1;
let dy = 0;

let gameloop;

function drawSnake(){
    ctx.fillStyle = "green"; 
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
    });
}

document.addEventListener("keydown", function(e) {
    const key = e.key;

    if(key === "ArrowUp" && dy !== 1){
        dx = 0;
        dy =-1; /* flytta uppåt */
        console.log("fel");
    } else if(key === "ArrowDown" && dy !== -1){
        dx = 0;
        dy = 1;/* flytta nedåt */
    } else if(key === "ArrowLeft" && dx !== 1){
        dx = -1;
        dy = 0; /* flytta vänster */
    } else if(key === "ArrowRight" && dx !== -1){
        dx = 1;
        dy = 0; /* flytta höger */
    } 
});

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);
}

function generateFood() {
    let collision = true;

    while (collision) {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

        collision = false;
        for(let i = 0; i < snake.length; i++) {
            if (snake[i].x === food.x && snake[i].y === food.y) {
                collision = true;
                break;
            }
        }
    }
}

function updateGame(){

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        clearInterval(gameloop);
        alert("Game Over!");
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
        clearInterval(gameloop);
        alert();
        return;
        }
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreText.textContent = score.toString().padStart(3, "0");
        generateFood();

        if (score % 10 === 0) {
            clearInterval(gameloop);
            speed = Math.max(50, speed - 10);
            gameloop = setInterval(updateGame, speed);
        }
    } else {
        snake.pop();
    }

    // Lägg till nya huvudet
    snake.unshift(head);

    // Rensa canvas och rita om
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

function startGame() {
  if (!gameloop) {
    gameloop = setInterval(updateGame, speed);
  }
}

function pauseGame() {
  if (gameloop) {
    clearInterval(gameloop);
    gameloop = undefined;
  }
}

startBtn.addEventListener("click", startGame);
pausBtn.addEventListener("click", pauseGame);