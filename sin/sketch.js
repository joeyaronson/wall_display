function setup() {
  createCanvas(720, 1280);
  rot = 2;
  rot2 = 0.02;
  o = 0;
  o2 = 0;
  timer = 0;
  strokeWeight(0.3);

}


let c = [];
let z = [];
let rot;
let rot2;
let o;
let o2;
let o3;
let model;
let timer;
function draw() {
  background(255);
  rot -= rot2;
  o2 += 0.005;
  o = 200 * sin(o2)

  for (let i = 0; i < height + 1; i += 2) {
    c.push(new coord(width/2+o*cos(-rot+(i/(500/10))),i));   
    z.push(new coord(width/2+100-o*cos(rot+(i/(500/10))),i));
  }
  noFill();
  beginShape();
  stroke(0);
  for (let i = 20; i < c.length; i++) {
    vertex(c[i].x, c[i].y);
    vertex(z[i - 20].x, z[i - 20].y);
  }
  endShape();
  c.splice(0, c.length);
  z.splice(0, z.length);
}

function coord(x, y) {
  this.x = x;
  this.y = y;
}