function setup() {
    noStroke();
    createCanvas(720,1280);
    rectMode(CENTER);
    angleMode(DEGREES);
    phase01();
    
    
}

let c = 0;
let xoff = 0;
let phase = "wait";
let next = "phase0";
let timer = 0;
function phase01(){
    background(255);
    fill(0);
    for(let i = 40; i < width+160; i+=160){
        for(let j = 40; j < height+160; j+=160){
            translate(i,j);
            
            rect(0+xoff,0-xoff,80,80,c)
            rect(80-xoff,80-xoff,80,80,c)
            resetMatrix();
        }
    }
}
function draw() {
    
    if(phase == "wait"){
        wait();
    }
    if(phase == "phase0"){
        phase0();
    }
    if(phase == "phase1"){
        phase1();
    }
    if(phase == "phase2"){
        phase2();
    }
    if(phase == "phase3"){
        phase3();
    }
    if(phase == "phase4"){
        phase4();
    }
     if(phase == "phase5"){
        phase5();
    }
    
    //debug
    // fill(255,0,255);
    // textSize(50);
    // text("phase: "+phase +"\n next: "+next,50,50);
    // text("c: "+c,100,100);
   

}

function wait(){
    timer++;
    if(timer >= 100){
        phase = next;
        timer = 0;
    }
}
function phase0(){
    background(255);
    fill(0);
    let a = map(c,0,50,0,90);
    for(let i = 40; i < width+160; i+=160){
        for(let j = 40; j < height+160; j+=160){
            translate(i+xoff,j-xoff);
            rotate(a);
            rect(0,0,80,80,c)
            resetMatrix();
        
            translate(i+80-xoff,j+80-xoff);
            rotate(a);
            rect(0,0,80,80,c)
            resetMatrix();
        }
    }
    
    if(c >= 50){
        phase = "wait";
        next = "phase1";
    }
    c+=0.5;
    
    
}
function phase1(){
    background(255);
    fill(0);
    for(let i = 40; i < width+160; i+=160){
        for(let j = 40; j < height+160; j+=160){
            translate(i,j);
            
            rect(0+xoff,0-xoff,80,80,c);
            rect(80-xoff,80-xoff,80,80,c);
            resetMatrix();
        }
    }
    if(xoff<80){
        xoff++; 
    }
    else{
        phase = "wait";
        next = "phase2";
        xoff = 0;
    }
}

function phase2(){
    background(255);
    fill(0);
    let a = map(c,0,50,0,90);
    for(let i = 40; i < width+160; i+=160){
        for(let j = 40; j < height+160; j+=160){
            translate(i+xoff,j-xoff);
            rotate(a);
            rect(0,0,80,80,c);
            resetMatrix();
        
            translate(i+80-xoff,j+80-xoff);
            rotate(a);
            rect(0,0,80,80,c);
            resetMatrix();
        }
    }
    if(c > 0){
       c-=0.5;  
    }
    else{
        c = 0;
        phase = "wait";
        next = "phase3";
    }
     
}

function phase3(){
    background(0);
    fill(255);
    let a = map(c,0,50,0,90);
    for(let i = -40; i < width+160; i+=160){
        for(let j = -40; j < height+160; j+=160){
            translate(i+xoff+80,j-xoff);
            rotate(a);
            rect(0,0,80,80,c)
            resetMatrix();
        
            translate(i+80-xoff+80,j+80-xoff);
            rotate(a);
            rect(0,0,80,80,c)
            resetMatrix();
        }
    }
    c+=0.5; 
    if(c >= 50){
        phase = "wait";
        next = "phase4";
    }
    
}

function phase4(){
    background(0);
    fill(255);
    for(let i = -200; i < width+160; i+=160){
        for(let j = -200; j < height+160; j+=160){
            translate(i+80,j);
            
            rect(0-xoff,0+xoff,80,80,c)
            rect(80+xoff,80+xoff,80,80,c)
            resetMatrix();
        }
    }
    if(xoff<80){
        xoff++; 
    }
    else{
        phase = "wait";
        next = "phase5";
        xoff = 0;
    }
}

function phase5(){
    background(0);
    fill(255);
    let a = map(c,0,50,0,90);
    for(let i = -200; i < width+160; i+=160){
        for(let j = -200; j < height+160; j+=160){
            translate(i+xoff+80,j-xoff);
            rotate(a);
            rect(0,0,80,80,c)
            resetMatrix();
        
            translate(i+160-xoff,j+80-xoff);
            rotate(a);
            rect(0,0,80,80,c)
            resetMatrix();
        }
    }
   
   if(c > 0){
       c-=0.5;  
    }
    else{
        c = 0;
        phase = "wait";
        next = "phase0";
    }
}

