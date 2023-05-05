function setup() {
	createCanvas(1080, 1920);
	background(0);
	colorMode(HSB, (d = width / 2));
	angleMode(DEGREES);
	rectMode(CENTER);
	strokeWeight(0.15);
	stroke(0, 0, 0, d / 2);
  
	colorSpeed = random(0.15, 2);
  }
  
  let backgroundModes = ["none", "black", "white"];
  let sizeModes = ["static", "sin"];
  let colorSpeed;
  let currSizeMode;
  let d;
  let globalFrame = 0;
  let steps = 360;
  
  const INTERACTION_KEY = 53;
  function keyPressed() {
	if (keyCode === INTERACTION_KEY) {
	  restart();
	}
  }
  
  const restart = () => {
	background(0);
	globalFrame = 0;
	backgroundModes = shuffle(backgroundModes);
	sizeModes = shuffle(sizeModes);
	colorSpeed = random(0.15, 2);
  };
  
  function draw() {
	translate(width / 2, height / 2);
	rotate(frameCount / 10);
	let currBackgroundMode = backgroundModes[0];
	currSizeMode = sizeModes[0];
	if (currBackgroundMode === "black") {
	  background(0, 20);
	} else if (currBackgroundMode === "white") {
	  background(d, 20);
	}
  
	let r = width / 5;
	let newR = sqrt(r * r + r * r);
	let sp = 0.25;
	for (let i = 0; i < steps; i++) {
	  circ(width / 2, height / 2, newR - r, 0, sp);
	  circ(width / 2, height / 2, newR - r, 90, sp);
	  circ(width / 2, height / 2, newR - r, 180, sp);
	  circ(width / 2, height / 2, newR - r, 270, sp);
	  globalFrame++;
	}

	if(frameCount % 10000 === 0){
		restart()
	}
  }
  
  function circ(x, y, r, a, s) {
	let newR = sqrt(r * r + r * r);
	let dis = dist(x, y, width / 2, height / 2);
	fill((dis * colorSpeed + frameCount) % d, d, d, d / 2);
	let nx = x + sin(globalFrame * s + a) * (newR + r * 2);
	let ny = y + cos(globalFrame * s + a) * (newR + r * 2);
	let s2 = sin(globalFrame) * 0.003;
	if (r > 5) {
	  circ(nx, ny, newR - r, 0, s2);
	} else {
	  let offset = 0;
	  if (currSizeMode === "sin") {
		offset = sin(frameCount + s - a) * 50;
	  }
	  ellipse(width / 2 - nx, height / 2 - ny, r * 5 + offset);
	}
  }
  