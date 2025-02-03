document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".box");
    const scoreDisplay = document.querySelector(".SCORE");
    const highScoreDisplay = document.getElementById("hscr");
    
    let snake = [{ x: 15, y: 15 }];
    let food = { x: Math.floor(Math.random() * 30) + 1, y: Math.floor(Math.random() * 30) + 1 };
    let direction = { x: 0, y: 0 };
    let nextDirection = { x: 0, y: 0 };
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;
    highScoreDisplay.textContent = `High Score : ${highScore}`;
    let gameRunning = true;
    
    function draw() {
        box.innerHTML = "";
        snake.forEach((segment, index) => {
            const snakeElement = document.createElement("div");
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add("snake");
            box.appendChild(snakeElement);
        });
        
        const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        box.appendChild(foodElement);
    }
    
    function move() {
        if (!gameRunning) return;
        direction = nextDirection;
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        
        if (head.x < 1 || head.x > 30 || head.y < 1 || head.y > 30 || collision(head)) {
            resetGame();
            return;
        }
        
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = `Score : ${score}`;
            food = { x: Math.floor(Math.random() * 30) + 1, y: Math.floor(Math.random() * 30) + 1 };
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                highScoreDisplay.textContent = `High Score : ${highScore}`;
            }
        } else {
            snake.pop();
        }
    }
    
    function collision(head) {
        return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
    }
    
    function resetGame() {
        gameRunning = false;
        alert("Game Over! Restarting...");
        setTimeout(() => {
            snake = [{ x: 15, y: 15 }];
            direction = { x: 0, y: 0 };
            nextDirection = { x: 0, y: 0 };
            score = 0;
            scoreDisplay.textContent = "Score : 0";
            food = { x: Math.floor(Math.random() * 30) + 1, y: Math.floor(Math.random() * 30) + 1 };
            gameRunning = true;
        }, 1000);
    }
    
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (direction.y === 0) nextDirection = { x: 0, y: -1 };
                break;
            case "ArrowDown":
                if (direction.y === 0) nextDirection = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
                if (direction.x === 0) nextDirection = { x: -1, y: 0 };
                break;
            case "ArrowRight":
                if (direction.x === 0) nextDirection = { x: 1, y: 0 };
                break;
        }
    });
    
    function gameLoop() {
        if (gameRunning) {
            move();
            draw();
        }
        setTimeout(gameLoop, 100);
    }
    
    gameLoop();
});