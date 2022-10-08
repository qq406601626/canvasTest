const random = function (min, max) {
    max = max + 1;
    return Math.floor(Math.random() * (max - min) + min);
}
const app = {
    init: function () {
        this.cacheDOM();
    },
    cacheDOM: function () {
        this.container = $('#container');
        this.mouseX = null;
        this.mouseY = null;
    },
    cursorEvents: function (e) {
        app.mouseX = e.clientX;
        app.mouseY = e.clientY;
    }
}

app.init();

const c = document.getElementById('c')
const cx = c.getContext('2d')
c.width = $('#c').outerWidth();
c.height = $('#c').outerHeight();


//INITIAL CANVAS DRAW
cx.fillStyle = 'rgba(0,0,0,1)';
cx.fillRect(0, 0, c.width, c.height);

function particleFactory(thisCanvas, thisContext) {

    var particleIndex = 0,
        particles = {},
        particleNum = 2;

    thisParticleName = function () {
        this.r = 8;
        this.rStart = this.r;
        this.rIncrement = this.r * -0.01;
        this.x = thisCanvas.width / 2;
        this.y = thisCanvas.height / 2;

        this.vxIsNegative = random(1, 2);

        this.originTriggered = false;
        this.vx = this.vxIsNegative === 1 ? random(0, 50) * -0.1 : random(0, 50) * 0.1;
        this.vxMult = random(10, 20) * 0.1;
        this.vy = random(-10, 10);
        this.vyMult = random(2, 6) * -0.1;
        this.opacity = 1;
        this.gravity = 1;
        this.counter = 0;
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.hue = random(30, 60);
        this.light = random(50, 100);
        this.color = `hsla(${this.hue},100%,${this.light}%,${this.opacity})`;

        this.bounced = false;

        this.duration = 60;
        this.durationCounter = 0;
    }

    thisParticleName.prototype.draw = function () {

        if ((!this.originTriggered) && (app.mouseX != null)) {
            this.originTriggered = true;
            this.x = app.mouseX;
            this.y = app.mouseY;
        }
        this.color = `hsla(${this.hue},100%,${this.light}%,${this.opacity})`;
        thisContext.fillStyle = this.color;
        thisContext.beginPath();
        thisContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        thisContext.fill();

        //START DRAW OPERATION
        this.r += this.rIncrement;
        this.x += this.vx;
        this.y += this.vy;
        this.durationCounter++;
        if (this.vx === 0) {
            this.vx++;
        }
        if (this.vxIsNegative === 1) {
            this.vx
        }
        if (this.vy === 0) {
            this.vy++;
        }
        if (this.y > thisCanvas.height - this.rStart) {
            if (!this.bounced) {
                this.vx *= this.vxMult;
            } else {
                this.vx *= 0.9;
            }
            this.bounced = true;
            this.vy *= this.vyMult;
            this.y = thisCanvas.height - this.rStart;
        }
        this.vy += this.gravity;
        if ((this.r <= 0)) {
            delete particles[this.id];
        }
        this.life++;
        //END DRAW OPERATION
    }

    thisCanvasFunction = function () {
        thisContext.clearRect(0, 0, thisCanvas.width, thisCanvas.height)
        for (var i = 0; i < particleNum; i++) {
            new thisParticleName();
        }
        thisContext.globalCompositeOperation = 'lighter';
        for (var i in particles) {
            particles[i].draw();
        }
    }
    // setInterval(thisCanvasFunction, 15);
    document.addEventListener('click', thisCanvasFunction)
}

window.addEventListener('mousemove', app.cursorEvents, false);
particleFactory(c, cx);


