function setup() {
    createCanvas(1080, 1920);
    colorMode(HSB, 100);
    noStroke();
    hypotenuse = sqrt(width * width + height * height);
    for (let i = 0; i < 1000; i++) {
        p.push(new Particle(random(width), random(height)));
    }

    aX = random(width);
    aY = random(height);
}
let p = [];
let noiseVal = 0.02;
let globalColor = 0;
let hypotenuse;
let part;
let fr;
const INTERACTION_KEY = 53;

let attract = false;
let aX, aY;
function draw() {
    background(0, 15);
    for (let i = 0; i < p.length; i++) {
        p[i].display();
        p[i].move();
        p[i].checkBounds();
    }
    let ol = p.length;
    p = p.filter((x) => !x.o);
    let nl = p.length;
    if (ol != nl) {
        for (let i = 0; i < ol - nl; i++) {
            p.push(new Particle(random(width), random(height)));
        }
    }

    globalColor += 0.5;
    fill(100);
    textSize(10);
    if (fr < 10) {
        p.splice(0, 1);
    }
    if (fr > 20) {
        p.push(new Particle(random(width), random(height)));
    }
    if (frameCount % 10 == 0) {
        part = p.length;
        fr = floor(frameRate());
    }

      //debug
  textSize(50);
      text("particles: "+part,20,30);
      text("framerate: " +fr,20,60);
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ax = random(-0.03, 0.03);
        this.ay = random(-0.03, 0.03);
        this.h = random(0, 100);
        this.o = false;
    }

    display() {
        fill(this.h % 100, 100, 100);
        ellipse(this.x, this.y, 3, 3);
    }
    move() {
        let dx = noise(
            this.x * noiseVal + this.ax,
            this.y * noiseVal + this.ax,
            frameCount * this.ax
        );
        let dy = noise(
            this.x * noiseVal + this.ay,
            this.y * noiseVal + this.ay,
            frameCount * this.ay
        );
        let ddx = map(dx, 0, 1, -10, 10);
        let ddy = map(dy, 0, 1, -10, 10);

        this.x += ddx;
        this.y += ddy;
        //this.h+=1;

        if (keyIsDown(INTERACTION_KEY)) {
            let delx = aX - this.x;
            let dely = aY - this.y;

            let angle = atan2(delx, dely);

            let ax = sin(angle);
            let ay = cos(angle);
            let d = dist(this.x, this.y, aX, aY);
            let ds = map(d, 0, hypotenuse, 3, 10);
            this.h += ds / 2;
            this.x += ax * ds;
            this.y += ay * ds;
        } else {
            aX = random(width);
            aY = random(height);
        }
    }

    checkBounds() {
        if (
            this.x > width + 200 ||
            this.x < -200 ||
            this.y > height + 200 ||
            this.y < -200
        ) {
            this.o = true;
        }
    }
}
