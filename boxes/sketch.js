function setup() {
    createCanvas(720, 1280);
    rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();
}
let a = 0;
let a2 = 0;
let timer = 0;
let mode = "one";
let next = "";

let modes = ["black", "random"];
let modeIndex = 0;

let r, g, b;

function draw() {
    if (mode === "one") {
        draw1();
    } else if (mode === "two") {
        draw2();
    } else if (mode === "three") {
        draw3();
    } else if (mode === "wait") {
        wait();
    }

    if (frameCount % 5000 === 0) {
        choseColors();
        modeIndex = (modeIndex + 1) % modes.length;
    }

    // if(frameCount > 785)
    // 		exit()
}

function choseColors() {
    r = random(255);
    g = random(255);
    b = random(255);
}
const INTERACTION_KEY = 135;
function keyPressed() {
    if (keyCode === INTERACTION_KEY) {
        choseColors();

        modeIndex = (modeIndex + 1) % modes.length;
    }
}

function wait() {
    timer++;
    if (timer > 60) {
        mode = next;
        timer = 0;
    }
}

function draw1() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = 0; i < width / 160; i++) {
        for (let j = 0; j < height / 160; j++) {
            translate(40 + i * 160, 40 + j * 160);
            rotate(a);
            arc(0, 0, 80, 80, 90, 0, PIE);
            resetMatrix();
            translate(120 + i * 160, 40 + j * 160);
            rotate(a);
            arc(0, 0, 80, 80, 180, 90, PIE);
            resetMatrix();

            translate(40 + i * 160, 120 + j * 160);
            rotate(a);
            arc(0, 0, 80, 80, 0, 270, PIE);
            resetMatrix();

            translate(120 + i * 160, 120 + j * 160);
            rotate(a);
            arc(0, 0, 80, 80, 270, 180, PIE);
            resetMatrix();
        }
    }
    if (a == 180) {
        next = "three";
        mode = "wait";
    }
    if (a == 360) {
        next = "two";
        mode = "wait";
        a = 0;
    }

    a++;
}

function draw2() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }

    for (let i = 0; i < width / 160; i++) {
        for (let j = 0; j < height / 160; j++) {
            translate(40 + i * 160, 40 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();

            translate(120 + i * 160, 40 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();

            translate(40 + i * 160, 120 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();

            translate(120 + i * 160, 120 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();
        }
    }
    if (modes[modeIndex] === "black") {
        fill(255);
    } else {
        fill(r, g, b);
        // fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = -1; i < width / 160; i++) {
        for (let j = -1; j < height / 160; j++) {
            xoff = map(a2, 0, 90, 0, 160);
            translate(80 + i * 160 + xoff, 80 + j * 160);
            rotate(a2);
            rect(0, 0, 80, 80);
            resetMatrix();
        }
    }

    if (a2 == 90) {
        next = "one";
        mode = "wait";
        a2 = 0;
    }
    a2++;
}
function draw3() {
    if (modes[modeIndex] === "black") {
        background(255);
        fill(0);
    } else {
        background(r, g, b);
        fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = 0; i < width / 160 + 1; i++) {
        for (let j = 0; j < height / 160 + 1; j++) {
            translate(40 + i * 160, 40 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();

            translate(120 + i * 160, 40 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();

            translate(40 + i * 160, 120 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();

            translate(120 + i * 160, 120 + j * 160);
            rotate(a);
            ellipse(0, 0, 80, 80);
            resetMatrix();
        }
    }
    if (modes[modeIndex] === "black") {
        fill(255);
    } else {
        fill(r, g, b);
        // fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = 0; i < width / 160 + 2; i++) {
        for (let j = 0; j < height / 160 + 2; j++) {
            xoff = map(a2, 0, 90, 0, 160);
            translate(i * 160 - xoff, j * 160);
            rotate(-a2);
            rect(0, 0, 80, 80);
            resetMatrix();
        }
    }

    if (a2 == 90) {
        next = "one";
        mode = "wait";
        a2 = 0;
    }
    a2++;
}
  //joey aronson 2019
