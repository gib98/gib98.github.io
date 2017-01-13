window.onload = setup
EARTH = 5.972e24
SUN = 1.989e30
GRAT = 1.099e19
ESDIST = 149.6e9
window.planets = []
G = 6.67408e-11
METERS_TO_AU = 6.68459e-14
POWER_OF_R = -2
DEL_T = 10
    /* unit conversion:
    1 pixel = 10 million kilometers
    1 milisecond = .1 years
    1 'mass unit' = 5.972e24 kg (mass of earth)
    */
MASSC = EARTH
TIMEC = 3.154e6
DISTC = 10e10

function planet(mass, centerX, centerY, direction, velocity, color) {
    this.mass = mass;
    this.x = centerX;
    this.y = centerY;
    this.direction = direction * (Math.PI / 180);
    this.velocity = velocity
    this.vx = (velocity * Math.cos(this.direction));
    this.vy = (velocity * Math.sin(this.direction));
    this.ax = 0
    this.ay = 0
    window.planets.push(this)
    this.draw = function () {
        dist = Math.sqrt(Math.pow(this.x - window.c.width / 2, 2) + Math.pow(this.y - window.c.height / 2, 2))
        dist *= window.DISTC
        this.adir = Math.atan((this.x - window.c.width / 2) / (this.y - window.c.height / 2))
        force = (this.mass * window.MASSC) * (window.SUN) * window.G * Math.pow(dist, window.POWER_OF_R)
        accel = force / (this.mass * window.MASSC)
        this.ax = accel * Math.cos(this.adir)
        this.ay = accel * Math.sin(this.adir)
        this.ax /= window.DISTC
        this.ax /= Math.pow(31536000, 2)
        this.ax *= .01
        this.ay /= window.DISTC
        this.ay /= Math.pow(31536000, 2)
        this.ay *= .01
        this.x += .5 * this.ax * Math.pow(window.DEL_T / 1000, 2) + this.vx * (window.DEL_T / 1000)
        this.y += .5 * this.ay * Math.pow(window.DEL_T / 1000, 2) + this.vy * (window.DEL_T / 1000)
        drawCircle(this.x, this.y, 5, color)
        this.vx += (this.ax * window.DEL_T / 1000)
        this.vy += (this.ay * window.DEL_T / 1000)
    }
}

function setup() {
    console.log('setting up')
    window.c = document.getElementById('game');
    c.height = window.innerHeight * .9
    c.width = window.innerWidth * .9
    window.ctx = window.c.getContext('2d');
    drawSun()
}

function drawSun() {
    drawCircle(window.c.width / 2, window.c.height / 2, 20)
}

function drawCircle(centerX, centerY, radius, color = 'yellow') {
    window.ctx.beginPath();
    window.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    window.ctx.fillStyle = color;
    window.ctx.fill();
    window.ctx.lineWidth = 5;
    window.ctx.strokeStyle = color;
    window.ctx.stroke();
}

function render() {
    c.height = window.innerHeight * .9
    c.width = window.innerWidth * .9
    drawSun();
    for (i = 0; i < window.planets.length; i++) {
        window.planets[i].draw();
    }
}

function init() {
    window.intervalID = window.setInterval(render, window.DEL_T);
}

function stop() {
    window.clearInterval(window.intervalID)
    window.planets = []
}

function test() {
    earth = new planet(1, 500, 500, 0, 0, 'blue')
    init()
}