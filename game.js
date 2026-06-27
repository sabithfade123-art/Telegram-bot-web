    // Change bird color to match theme (Neon Magenta Circle representation)
    ctx.beginPath();
    ctx.arc(60, birdY, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#ff007f"; // Changed to neon-magenta
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff007f";
    ctx.fill();
    ctx.shadowBlur = 0;

    // ... down where pipes are rendered inside the loop:
    for (let i = pipes.length - 1; i >= 0; i--) {
        if (gameStarted) pipes[i].x -= pipeSpeed;

        // Draw Pipes with Neon Purple outlines matching the template
        ctx.strokeStyle = "#9d4edd"; // Changed to purple theme
        ctx.lineWidth = 3;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#9d4edd";
        
