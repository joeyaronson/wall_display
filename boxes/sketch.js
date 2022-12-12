function setup() {
    createCanvas(1080, 1920);
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
  let w = 120
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
  const INTERACTION_KEY = 53;
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
    for (let i = 0; i < width / w*2; i++) {
      for (let j = 0; j < height / w*2; j++) {
        translate(w / 2 + i * w*2, w / 2 + j * w*2);
        rotate(a);
        arc(0, 0, w, w, 90, 0, PIE);
        resetMatrix();
        translate(w*2-w/2 + i * w*2, w / 2 + j * w*2);
        rotate(a);
        arc(0, 0, w, w, 180, 90, PIE);
        resetMatrix();
  
        translate(w / 2 + i * w*2, w*2-w/2 + j * w*2);
        rotate(a);
        arc(0, 0, w, w, 0, 270, PIE);
        resetMatrix();
  
        translate(w*2-w/2 + i * w*2, w*2-w/2 + j * w*2);
        rotate(a);
        arc(0, 0, w, w, 270, 180, PIE);
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
  
    for (let i = 0; i < width / w*2; i++) {
      for (let j = 0; j < height / w*2; j++) {
        translate(w / 2 + i * w*2, w / 2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
  
        translate(w*2-w/2 + i * w*2, w / 2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
  
        translate(w / 2 + i * w*2, w*2-w/2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
  
        translate(w*2-w/2 + i * w*2, w*2-w/2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
      }
    }
    if (modes[modeIndex] === "black") {
      fill(255);
    } else {
      fill(r, g, b);
      // fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = -1; i < width / w*2; i++) {
      for (let j = -1; j < height / w*2; j++) {
        xoff = map(a2, 0, 90, 0, w*2);
        translate(80 + i * w*2 + xoff, w + j * w*2);
        rotate(a2);
        rect(0, 0, w, w);
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
    for (let i = 0; i < width / (w*2) + 1; i++) {
      for (let j = 0; j < height / w*2 + 1; j++) {
        translate(w / 2 + i * w*2, w / 2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
  
        translate(w*2-w/2 + i * w*2, w / 2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
  
        translate(w / 2 + i * w*2, w*2-w/2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
  
        translate(w*2-w/2 + i * w*2, w*2-w/2 + j * w*2);
        rotate(a);
        ellipse(0, 0, w, w);
        resetMatrix();
      }
    }
    if (modes[modeIndex] === "black") {
      fill(255);
    } else {
      fill(r, g, b);
      // fill((r + g) % 255, (g + b) % 255, (b + r) % 255);
    }
    for (let i = 0; i < width / w*2 + 2; i++) {
      for (let j = 0; j < height / w*2 + 2; j++) {
        xoff = map(a2, 0, 90, 0, w*2);
        translate(i * w*2 - xoff, j * w*2);
        rotate(-a2);
        rect(0, 0, w, w);
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
  