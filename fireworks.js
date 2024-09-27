const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworks = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, xVelocity, yVelocity, color) {
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.color = color;
        this.life = 0;
    }

    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.life++;
        if (this.life > 50) {
            this.yVelocity += 0.1;
            this.xVelocity *= 0.99;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const xVelocity = (Math.random() - 0.5) * 10;
    const yVelocity = (Math.random() - 0.5) * 10;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworks.push(new Firework(x, y, xVelocity, yVelocity, color));
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.y > canvas.height || firework.x < 0 || firework.x > canvas.width) {
            fireworks.splice(index, 1);
        }
    });
    if (Math.random() < 0.1) {
        createFirework();
    }
    requestAnimationFrame(animate);
}

animate();
