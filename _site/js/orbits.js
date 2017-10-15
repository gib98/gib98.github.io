window.onload = setup
EARTH = 5.972e24
SUN = 1.989e30
GRAT = 1.099e19
ESDIST = 149.6e9
window.planets = []
G = 6.67408e-11
METERS_TO_AU = 6.68459e-14
POWER_OF_R = -2
DEL_T = .005
    /* unit conversion:
    1 pixel = 10 million kilometers
    1 milisecond = sonething years
    1 'mass unit' = 5.972e24 kg (mass of earth)
    */
MASSC = EARTH
TIMEC = 3.154e7 * .75
DISTC = 10e10
AUTOM = 1.496e+11
ACCC = 6656.77641
SHOW_PATHS = false

function planet(dist = 1, direction = 0, velocity = 1, color = 'green') {
    this.x = 500 + dist * 100 * Math.cos((direction - 90) * (Math.PI / 180));
    this.y = 500 + dist * 100 * Math.sin((direction + 90) * (Math.PI / 180));
    this.direction = -(direction) * (Math.PI / 180);
    this.velocity = velocity * 30000
    this.vx = (this.velocity * Math.cos(this.direction));
    this.vy = (this.velocity * Math.sin(this.direction));
    this.ax = 0
    this.ay = 0
    this.accel = 0
    this.jerk = 0
    this.jy = 0
    this.jx = 0
    this.color = color
    this.maxDist = NaN
    this.minDist = NaN
    drawCircle(this.x, this.y, 5, this.color)
    this.calcPos = function () {
        dist = Math.sqrt(Math.pow(this.x - 500, 2) + Math.pow(this.y - 500, 2))
        dist /= 100
        if (isNaN(this.maxDist)) {
            this.maxDist = dist
        }
        else if (dist > this.maxDist) {
            this.maxDist = dist
        }
        if (isNaN(this.minDist)) {
            this.minDist = dist
        }
        else if (dist < this.maxDist) {
            this.minDist = dist
        }
        dist *= window.AUTOM
        this.adir = Math.atan2(500 - this.y, 500 - this.x)
        this.accel = (window.SUN) * window.G * Math.pow(dist, window.POWER_OF_R)
        this.ax = this.accel * Math.cos(this.adir)
        this.ay = this.accel * Math.sin(this.adir)
        this.dx = .5 * this.ax * Math.pow((window.DEL_T / 1000) * window.TIMEC, 2) + (this.vx * (window.DEL_T / 1000) * window.TIMEC)
        this.dy = .5 * this.ay * Math.pow((window.DEL_T / 1000) * window.TIMEC, 2) + (this.vy * (window.DEL_T / 1000) * window.TIMEC)
        this.dx /= window.AUTOM
        this.dx *= 100
        this.dy /= window.AUTOM
        this.dy *= 100
        this.x += this.dx
        this.y += this.dy
        this.vx += (this.ax * (window.DEL_T / 1000) * window.TIMEC)
        this.vy += (this.ay * (window.DEL_T / 1000) * window.TIMEC)
    }
    this.draw = function () {
        drawCircle(this.x, this.y, 5, this.color)
    }
}

function setup() {
    console.log('setting up')
    window.c = document.getElementById('game');
    c.height = 1000
    c.width = 1000
    window.ctx = window.c.getContext('2d');
    drawSun()
}

function drawSun() {
    drawCircle(window.c.width / 2, window.c.height / 2, 20, 'yellow')
}

function drawCircle(centerX, centerY, radius, color = 'green') {
    window.ctx.beginPath();
    window.ctx.arc(centerX, 1000 - centerY, radius, 0, 2 * Math.PI, false);
    window.ctx.fillStyle = color;
    window.ctx.fill();
    window.ctx.lineWidth = 5;
    window.ctx.strokeStyle = color;
    window.ctx.stroke();
}

function render() {
    if (!window.SHOW_PATHS) {
        c.height = 1000
        c.width = 1000
        drawSun();
    }
    for (i = 0; i < window.planets.length; i++) {
        for (k = 0; k < 2500; k++) {
            window.planets[i].calcPos()
        }
        window.planets[i].draw();
    }
}

function init() {
    window.intervalID = window.setInterval(render, 10);
    document.getElementById("init").setAttribute("style", "visibility: hidden;")
}

function stop() {
    window.clearInterval(window.intervalID)
    document.getElementById("init").setAttribute("style", "visibility: visible;")
}

function reset() {
    stop()
    window.planets = []
    c.height = 1000
    c.width = 1000
    drawSun();
}

function test() {
    earth = new planet(1, 0, 1, 'blue')
    mars = new planet(1, 45, 1, 'red')
}

function addPlanet() {
    window.colorField = document.getElementById("color")
    window.directionField = document.getElementById("direction")
    window.distanceField = document.getElementById("distance")
    window.speedField = document.getElementById("speed")
    window.planets.push(new planet(parseFloat(window.distanceField.value), parseFloat(window.directionField.value), parseFloat(window.speedField.value), window.colorField.value))
}