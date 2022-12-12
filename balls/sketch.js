function setup() {
    noStroke();
    createCanvas(1080, 1920);
    rectMode(CENTER);
    angleMode(DEGREES);
    choseColors();

    phase01();
}

let c = 0;
let xoff = 0;
let phase = "wait";
let next = "phase0";
let timer = 0;

let modes = ["black", "random", "white", "random"];
let modeIndex = 0;

let r, g, b;
const INTERACTION_KEY = 53;
function phase01() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else if (modes[modeIndex] === "white") {
        background(0);
        fill(255);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else if (modes[modeIndex] === "white") {
        background(0);
        fill(255);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = 40; i < width + 160; i += 160) {
        for (let j = 40; j < height + 160; j += 160) {
            translate(i, j);

            rect(0 + xoff, 0 - xoff, 80, 80, c);
            rect(80 - xoff, 80 - xoff, 80, 80, c);
            resetMatrix();
        }
    }
}

function choseColors() {
    r = random(255);
    g = random(255);
    b = random(255);
}

function draw() {
    if (phase == "wait") {
        wait();
    }
    if (phase == "phase0") {
        phase0();
    }
    if (phase == "phase1") {
        phase1();
    }
    if (phase == "phase2") {
        phase2();
    }
    if (phase == "phase3") {
        phase3();
    }
    if (phase == "phase4") {
        phase4();
    }
    if (phase == "phase5") {
        phase5();
    }

    //debug
    // fill(255,0,255);
    // textSize(50);
    // text("phase: "+phase +"\n next: "+next,50,50);
    // text("c: "+c,100,100);
}

function keyPressed() {
    if (keyCode === INTERACTION_KEY) {
        choseColors();

        modeIndex = (modeIndex + 1) % modes.length;
    }
}

function wait() {
    timer++;
    if (timer >= 100) {
        phase = next;
        timer = 0;
    }
}
function phase0() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else if (modes[modeIndex] === "white") {
        background(0);
        fill(255);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }

    let a = map(c, 0, 50, 0, 90);
    for (let i = 40; i < width + 160; i += 160) {
        for (let j = 40; j < height + 160; j += 160) {
            translate(i + xoff, j - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();

            translate(i + 80 - xoff, j + 80 - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();
        }
    }

    if (c >= 50) {
        phase = "wait";
        next = "phase1";
    }
    c += 0.5;
}
function phase1() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else if (modes[modeIndex] === "white") {
        background(0);
        fill(255);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }

    for (let i = 40; i < width + 160; i += 160) {
        for (let j = 40; j < height + 160; j += 160) {
            translate(i, j);

            rect(0 + xoff, 0 - xoff, 80, 80, c);
            rect(80 - xoff, 80 - xoff, 80, 80, c);
            resetMatrix();
        }
    }
    if (xoff < 80) {
        xoff++;
    } else {
        phase = "wait";
        next = "phase2";
        xoff = 0;
    }
}

function phase2() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else if (modes[modeIndex] === "white") {
        background(0);
        fill(255);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    let a = map(c, 0, 50, 0, 90);
    for (let i = 40; i < width + 160; i += 160) {
        for (let j = 40; j < height + 160; j += 160) {
            translate(i + xoff, j - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();

            translate(i + 80 - xoff, j + 80 - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();
        }
    }
    if (c > 0) {
        c -= 0.5;
    } else {
        c = 0;
        phase = "wait";
        next = "phase3";
    }
}

function phase3() {
    if (modes[modeIndex] === "black") {
        background(0);
        fill(255);
    } else if (modes[modeIndex] === "white") {
        background(255);
        fill(0);
    } else {
        fill(r, g, b);
        background((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    let a = map(c, 0, 50, 0, 90);
    for (let i = -40; i < width + 160; i += 160) {
        for (let j = -40; j < height + 160; j += 160) {
            translate(i + xoff + 80, j - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();

            translate(i + 80 - xoff + 80, j + 80 - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();
        }
    }
    c += 0.5;
    if (c >= 50) {
        phase = "wait";
        next = "phase4";
    }
}

function phase4() {
    if (modes[modeIndex] === "black") {
        background(0);
        fill(255);
    } else if (modes[modeIndex] === "white") {
        background(255);
        fill(0);
    } else {
        fill(r, g, b);
        background((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = -200; i < width + 160; i += 160) {
        for (let j = -200; j < height + 160; j += 160) {
            translate(i + 80, j);

            rect(0 - xoff, 0 + xoff, 80, 80, c);
            rect(80 + xoff, 80 + xoff, 80, 80, c);
            resetMatrix();
        }
    }
    if (xoff < 80) {
        xoff++;
    } else {
        phase = "wait";
        next = "phase5";
        xoff = 0;
    }
}

function phase5() {
    if (modes[modeIndex] === "black") {
        background(0);
        fill(255);
    } else if (modes[modeIndex] === "white") {
        background(255);
        fill(0);
    } else {
        fill(r, g, b);
        background((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    let a = map(c, 0, 50, 0, 90);
    for (let i = -200; i < width + 160; i += 160) {
        for (let j = -200; j < height + 160; j += 160) {
            translate(i + xoff + 80, j - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();

            translate(i + 160 - xoff, j + 80 - xoff);
            rotate(a);
            rect(0, 0, 80, 80, c);
            resetMatrix();
        }
    }

    if (c > 0) {
        c -= 0.5;
    } else {
        c = 0;
        phase = "wait";
        choseColors();

        modeIndex = (modeIndex + 1) % modes.length;
        next = "phase0";
    }
}
