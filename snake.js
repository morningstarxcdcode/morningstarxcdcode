# Snake Game Code

## HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Advanced Snake Game</h1>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script src="script.js"></script>
</body>
</html>
```

## CSS
```css
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
}

h1 {
    margin: 20px;
}

canvas {
    border: 1px solid black;
}
```

## JavaScript
```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvas.width / 20)), y: Math.floor(Math.random() * (canvas.height / 20)) };
    } else {
        snake.pop(); // Remove last segment
    }

    snake.unshift(head); // Add new head
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    draw();
    update();
    setTimeout(gameLoop, 100);
}

gameLoop();


