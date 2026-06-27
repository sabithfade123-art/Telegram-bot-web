const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const retryMenu = document.getElementById("retryMenu");
const currentScoreEl = document.getElementById("currentScore");
const highScoreEl = document.getElementById("highScore");

// Game Mechanics Configurations
let birdY = 200;
let birdVelocity = 0;
let gravity = 0.25;
let jumpForce = -5.5;
let isGameOver = false;
let gameStarted = false;
let score = 0;
let highScore = 0;

let pipes = [];
const pipeWidth = 50;
const pipeGap = 130;
const pipeSpeed = 2;

// Event Listeners for Interaction
window.addEventListener("keydown", (e) => { if(e.code === "Space") handleJump(); });
canvas.addEventListener("touchstart", (e) => { e.preventDefault(); handleJump(); });

function handleJump() {
    if (!gameStarted) gameStarted = true;
    if (!isGameOver) {
        birdVelocity = jumpForce;
    }
}

function resetGame() {
    birdY = 200;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    currentScoreEl.innerText = score;
    isGameOver = false;
    gameStarted = false;
    retryMenu.classList.add("hidden");
    loop();
}

function createPipe() {
    let topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 30;
    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: canvas.height - topHeight - pipeGap,
        passed: false
    });
}

function loop() {
    if (isGameOver) return;

    // Clear Canvas
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameStarted) {
        birdVelocity += gravity;
        birdY += birdVelocity;
    }

    // Draw Bird (Neon Cyan Circle representation matching the video vibe)
    ctx.beginPath();
    ctx.arc(60, birdY, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#05ffa1";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#05ffa1";
    ctx.fill();
    ctx.shadowBlur = 0; // reset glow for performance

    // Pipe Management
    if (gameStarted && (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 180)) {
        createPipe();
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        if (gameStarted) pipes[i].x -= pipeSpeed;

        // Draw Pipes with Neon Magenta outlines
        ctx.strokeStyle = "#bc13fe";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#bc13fe";
        
        // Top Pipe
        ctx.strokeRect(pipes[i].x, 0, pipeWidth, pipes[i].top);
        // Bottom Pipe
        ctx.strokeRect(pipes[i].x, canvas.height - pipes[i].bottom, pipeWidth, pipes[i].bottom);
        ctx.shadowBlur = 0; // reset

        // Collision Checks
        if (60 + 14 > pipes[i].x && 60 - 14 < pipes[i].x + pipeWidth) {
            if (birdY - 14 < pipes[i].top || birdY + 14 > canvas.height - pipes[i].bottom) {
                endGame();
            }
        }

        // Score Track
        if (!pipes[i].passed && pipes[i].x + pipeWidth < 60) {
            pipes[i].passed = true;
            score++;
            currentScoreEl.innerText = score;
            if (score > highScore) {
                highScore = score;
                highScoreEl.innerText = highScore;
            }
        }

        // Clean out screen left pipes
        if (pipes[i].x + pipeWidth < 0) pipes.splice(i, 1);
    }

    // Boundary Collisions
    if (birdY + 14 > canvas.height || birdY - 14 < 0) {
        endGame();
    }

    requestAnimationFrame(loop);
}

function endGame() {
    isGameOver = true;
    retryMenu.classList.remove("hidden");
}

// Kick off initial drawing state
loop();
