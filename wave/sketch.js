function setup() {
	createCanvas(1080, 1920);
	rectMode(CENTER);
	colorMode(HSB, 360);
	angleMode(DEGREES);
	loadBg();
	setNoise();
	loadSlices();
	strokeWeight(2.5);
	stroke(360, 0, 360, 250);
}
let s = [];
let noiseVal;
let SPACE = 10;
let DETAIL = 75;
let bg;
let bg1;
let bg2;
let frameOff;

let modes = ["rainbow", "bw", "rainbow2"];
let mI = 2;
let currMode;
const loadBg = () => {
	bg = random(360);
	bg1 = color(bg, 80, 50);
	bg2 = color(bg, 80, 150);
};

const setNoise = () => {
	noiseVal = random(0.0008, 0.003);
	frameOff = random(100, 800);
	currMode = modes[mI % modes.length];
};

const INTERACTION_KEY = 53;
function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
		mI++;
		loadBg();
		setNoise();
	}
}
function draw() {
	background(190);
	let gradient = drawingContext.createLinearGradient(0, height, 0, 0);
	gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

	gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
	drawingContext.fillStyle = gradient;

	rect(width / 2, height / 2, width, height);

	for (let i = 0; i < s.length; i++) {
		s[i].calculateP();
		s[i].display();
	}

	noiseVal += sin((frameCount)/5 + frameOff) / 1000000;

	if (frameCount % 20000 === 0) {
		mI++;
		loadBg();
		setNoise();
	}
}

const loadSlices = () => {
	for (let i = 40; i > 0; i--) {
		s.push(
			new Slice(width / 2 + 200 - i * SPACE, height / 2 + 200 - i * SPACE, i)
		);
	}
};

class Slice {
	constructor(x, y, i) {
		this.x = x;
		this.y = y;
		this.i = i;
		this.w = 600;
		this.h = 150;
		this.p = [];
	}

	calculateP() {
		let p = [];
		for (let i = 0; i <= this.w; i += this.w / DETAIL) {
			let n =
				cos(
					noise(
						i * noiseVal,
						((frameCount)/2 + frameOff - this.i * 10) * noiseVal
					) * 1800
				) * 100;
			p.push({ x: i, y: n });
		}
		this.p = p;
	}

	display() {
		push();

		translate(this.x, this.y);
		let gradient = drawingContext.createLinearGradient(0, 100, 0, -200);

		if (currMode === "rainbow") {
			for (let i = 0; i < 4; i++) {
				let h = map(i, 0, 4, 0, 70);

				let hex = color(
					(h + (frameCount)/2 + frameOff + this.i * 3) % 360,
					360,
					360 - this.i * 5,
					190
				).toString("#rrggbbaa");
				gradient.addColorStop(i / 4, hex);
			}
			drawingContext.fillStyle = gradient;
		} else if (currMode === "bw") {
			gradient.addColorStop(1, "#000000AA");
			gradient.addColorStop(0, "#ffffffAA");
			drawingContext.fillStyle = gradient;
		} else if (currMode === "rainbow2") {
			let col1 = color(
				(bg + 180 + ((frameCount)/2 + frameOff) / 10) % 360,
				360,
				300 - this.i * 5,
				190
			);
			let col2 = color(
				(bg + 180 + 50 + ((frameCount)/2 + frameOff) / 10) % 360,
				360,
				300 - this.i * 5,
				190
			);
			gradient.addColorStop(0, col1.toString("#rrggbbaa"));
			gradient.addColorStop(1, col2.toString("#rrggbbaa"));
			drawingContext.fillStyle = gradient;
		}

		shearY(-30);

		beginShape();

		for (let { x, y } of this.p) {
			vertex(-this.w / 2 + x, -this.h / 2 + y);
		}
		vertex(this.w / 2, this.h / 2);

		vertex(-this.w / 2, this.h / 2);

		endShape(CLOSE);
		pop();
	}
}
