window.onload = setup

function setup() {
    console.log('setting up')
    window.c = document.getElementById('game');
    c.height = window.innerHeight * .9
    c.width = window.innerWidth * .9
    window.ctx = window.c.getContext('2d');
    drawSun()
}

function drawSun() {
    console.log('drawing sun');
}

function drawCircle(centerX, centerY, radius) {
    window.ctx.beginPath();
    window.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    window.ctx.fillStyle = 'yellow';
    window.ctx.fill();
    window.ctx.lineWidth = 5;
    window.ctx.strokeStyle = 'yellow';
    window.ctx.stroke();
}