function setup() {
	createCanvas(1080, 1920);
	rectMode(CENTER);
	colorMode(HSB, 100);
	angleMode(DEGREES);

	noStroke();
	restart();
}
let fruitHue;
let t = [];
let g1, g2;
let bg, bg1, bg2;
let groundRan;
const INTERACTION_KEY = 53;
function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
		restart();
	}
}
const restart = () => {
	t = [];
	fruitHue = random(-10, 25);

	t.push(new Tree(width / 2, 1600, 0, 400, 0, 40));
	groundRan = random(-10, 10);
	bg = random(100);

};
function draw() {
	bg += 0.005;
	bg1 = color(bg % 100, 40, 40);
	bg2 = color(bg % 100, 40, 100);
	let gradient = drawingContext.createLinearGradient(0, height, 0, 0);
	gradient.addColorStop(0, bg1.toString("#rrggbbaa"));

	gradient.addColorStop(1, bg2.toString("#rrggbbaa"));
	drawingContext.fillStyle = gradient;

	rect(width / 2, height / 2, width, height);

	g1 = color(10, 40, 20 + groundRan);
	g2 = color(10, 40, 60);

	gradient = drawingContext.createLinearGradient(0, 1700, 0, 0);
	gradient.addColorStop(0, g1.toString("#rrggbbaa"));

	gradient.addColorStop(1, g2.toString("#rrggbbaa"));
	drawingContext.fillStyle = gradient;
	rect(width / 2, 1700, width, 450);
	for (let tree of t) {
		tree.display();
		tree.move();
	}

	if (frameCount % 5000 === 0) {
		restart();
	}
}

class Tree {
	constructor(x, y, depth, h, angle, width) {
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = h;
		this.depth = depth;
		this.a = angle;
		this.children = [];
		this.cHeight = 0;
		this.fullHeight = false;
		this.fruit = [];
		this.growRate = random(1, 2);
		let numBranches = random(2, 4);
		let branchAngle2 = random(0, 50);
		let branchWidth = random(this.w / 3, this.w / 1.5);
		if (this.depth < 5) {
			let angleDif = 120 / numBranches;
			let startAngle = random(-60, -40);
			for (let i = 0; i < numBranches; i++) {
				let branchLen = random(this.h / 3, this.h / 1.1);
				let branchAngle = random(-60, 60);
				this.children.push(
					new Tree(
						0,
						0 - this.h + 5,
						this.depth + 1,
						branchLen,
						branchAngle,
						branchWidth
					)
				);
			}
		}
		if (this.depth > 2) {
			let numFruit = random(0, 5);
			for (let i = 0; i < numFruit; i++) {
				this.fruit.push(
					new Fruit(
						random(-this.w / 2, this.w / 2),
						random(0, -this.h),
						random(5, 20),
						fruitHue
					)
				);
			}
		}
	}

	display() {
		push();
		translate(this.x, this.y);
		rotate(this.a);
		if (this.fullHeight) {
			for (let c of this.children) {
				c.display();
				c.move();
			}
		}
		fill(10, 60, 50 + this.depth * 5);

		rect(0, -this.cHeight / 2, this.w, this.cHeight, 5);
		if (this.fullHeight) {
			for (let fruit of this.fruit) {
				fruit.display();
				fruit.move();
			}
		}

		pop();
	}

	move() {
		this.a += cos(frameCount + this.depth * 100) / 20;

		if (!this.fullHeight) {
			if (this.cHeight < this.h) {
				this.cHeight += this.growRate;
			} else {
				this.fullHeight = true;
			}
		}
	}
}

class Fruit {
	constructor(x, y, s, hue) {
		this.x = x;
		this.y = y;
		this.s = s;
		this.ss = 0;
		this.hue = hue;
		this.h = random(-5, 5);
		this.sat = random(50, 100);
		this.b = random(60, 100);
	}
	display() {
		fill((this.hue + this.h + 100) % 100, this.sat, this.b, 70);
		ellipse(this.x, this.y, this.ss);
	}

	move() {
		if (this.ss < this.s) {
			this.ss += 0.5;
		}
	}
}
