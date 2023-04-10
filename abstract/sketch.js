function setup() {
    createCanvas(1080, 1920);
    angleMode(DEGREES);
    rectMode(CENTER);
    colorMode(HSB, 100);
    loadRand();

    modes = shuffle(modes);

    loadShapes();
    chooseBackground();
    noFill();
    strokeWeight(0.1);
}

let modes = ["white", "rainbow", "black", "random"];
let mI = 0;

let ch;
let cs;
let cb;
const INTERACTION_KEY = 53;
function keyPressed() {
    if (keyCode === INTERACTION_KEY) {
        mI++;
        loadRand();

        chooseBackground();
    }
}

const chooseBackground = () => {
    let currMode = modes[mI % modes.length];

    if (currMode === "white") {
        background(100);
    } else if (currMode === "rainbow") {
        background(0);
    } else if (currMode === "black") {
        background(0);
    } else if (currMode === "random") {
        background((ch + 50) % 100, (cs + 50) % 100, (cb + 50) % 100);
    }
};

const loadRand = () => {
    ch = random(0, 100);
    cs = random(0, 100);
    cb = random(0, 100);
};

const loadShapes = () => {
    s.push(new Shape(random(width), random(height)));
    s.push(new Shape(random(width), random(height)));
};
let s = [];
const noiseVal = 0.002;
function draw() {
    for (let shape of s) {
        shape.display();
        shape.move();
        shape.checkBounds();
    }

    s = s.filter((x) => !x.o);
    if (s.length === 0) {
        loadShapes();
    }

    if (frameCount % 10000 === 0) {
        modes = shuffle(modes);
        loadRand();
        chooseBackground();
        s = [];
        loadShapes();
    }
}

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = random(0, 360);
        this.w = random(10, 100);
        this.h = random(10, 100);
        this.r = random(0, 5);
        this.o = false;
        this.s = random(100, 200);
        this.shape = random(["rect", "ellipse"]);
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.a);
        let currMode = modes[mI % modes.length];
        if (currMode === "white") {
            stroke(0);
        } else if (currMode === "rainbow") {
            stroke(frameCount % 100, 100, 80);
        } else if (currMode === "black") {
            stroke(100);
        } else if (currMode === "random") {
            stroke(ch, cs, cb);
        }
        if (this.shape === "rect") {
            rect(0, 0, this.w, this.h, this.r);
        } else if (this.shape === "ellipse") {
            ellipse(0, 0, this.w, this.h);
        }
        pop();
    }

    move() {
        let n = map(
            noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal),
            0,
            1,
            -360,
            360
        );
        let nx = sin(n);
        let ny = cos(n);
        this.x += nx;
        this.y += ny;
        this.a += n / this.s;
        this.w -= nx * 2;
        this.h -= ny * 2;
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
