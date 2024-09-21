function setup() {
    rectMode(CENTER);
    createCanvas(1080, 1920);
    strokeWeight(7); //set strokeWeight of box

    background(0);
    modes = [ellipse, rect];
    noFill();
    setVars();
}

let x;
let y;
let dx;
let dy;
let r;
let g;
let b;
let r2;
let g2;
let b2;
let modes;
let mode;
let frameNum = 5000;
let destinations = [];
let currentDest = 0;
const INTERACTION_KEY = 53;
let noiseVal = 0.01;

let rco = 1;
let gco = 1;
let bco = 1;
function keyPressed() {
    if (keyCode === INTERACTION_KEY) {
        setVars();
    }
}

function loadDests() {
    for (let i = 0; i < 10; i++) {
        destinations.push({
            dx: random(50, width - 50),
            dy: random(50, height - 50),
        });
    }
}

function modifyDests() {
    for (let i = 0; i < destinations.length; i++) {
        let dest = destinations[i];
        let nx = noise(
            (dest.dx + i * i) * noiseVal,
            (frameCount + i * 100) * noiseVal
        );
        let ny = noise(
            (dest.dy + i * i) * noiseVal,
            (frameCount + i * 100) * noiseVal
        );

        dest.dx += map(nx, 0, 1, -5, 5);
        dest.dy += map(ny, 0, 1, -5, 5);
    }
}

function checkBounds() {
    let outOfBounds = destinations.every(
        ({ dx, dy }) => dx > width || dx < 0 || dy > height || dy < 0
    );
    if (outOfBounds) {
        setVars();
    }
}
function setVars() {
    destinations = [];
    loadDests();

    background(0);
    x = width / 2;
    y = height / 2;
    dx = destinations[0].dx;
    dy = destinations[0].dy;
    r = random(200);
    g = random(200);
    b = random(200);
    rc = r;
    gc = g;
    bc = b;
    r2 = random(0.75, 1);
    g2 = random(0.75, 1);
    b2 = random(0.75, 1);
    r2c = r2;
    g2c = g2;
    b2c = b2;
    mode = random(modes);
}

function draw() {
    background(0);
    currentDest = 0;
    modifyDests();

    dx = destinations[currentDest].dx;
    dy = destinations[currentDest].dy;
    r = rc;
    g = gc;
    b = bc;

    r2 = r2c;
    g2 = g2c;
    b2 = b2c;

    x = width / 2;
    y = height / 2;
    fill(255, 10); //semi transparent fill for box

    while (currentDest < destinations.length) {
        stroke(r, g, b); //set box stroke to r,g,b color
        mode(x, y, 50, 50); //first box
        mode(width - x, y, 50, 50); //second box
        mode(x, height - y, 50, 50); //third box
        mode(width - x, height - y, 50, 50); //fourth box

        if (x < dx) {
            //moves x towards dx in positive direction
            x = x + 3;
        }
        if (x > dx) {
            //moves x towards dx in negative direction
            x = x - 3;
        }
        if (y < dy) {
            //moves y towards dy in positive direction
            y = y + 3;
        }
        if (y > dy) {
            //moves y towards dy in negative direction
            y = y - 3;
        }

        if (r < 0 || r > 200) {
            //flips red at 200 and 0
            r2 = -r2;
        }

        if (g < 0 || g > 200) {
            //flips green at 200 and 0
            g2 = -g2;
        }

        if (b < 0 || b > 200) {
            //flips blue at 200 and 0
            b2 = -b2;
        }

        if (dist(x, y, dx, dy) < 4.5) {
            //generates new destination variables when box
            //has reached the original destination
            dx = destinations[currentDest].dx;
            dy = destinations[currentDest].dy;
            currentDest++;
        }

        r += r2; //increment colors
        g += g2;
        b += b2;
    }
    // DEBUG
    // for (let { dx, dy } of destinations) {
    //   fill(255);
    //   ellipse(dx, dy, 100, 100);
    // }

    if (frameCount % 100 === 0) {
        checkBounds();
    }
}
