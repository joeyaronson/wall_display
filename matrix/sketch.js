function setup() {
	createCanvas(720,1280);
    textSize(60);
		textFont("Courier New");

    textAlign(RIGHT);
    textStyle(BOLD);
    colorMode(HSB,100);
    angleMode(DEGREES);
    background(0);
}

let chars = ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O","0","Q","L","C","J","U","Y","X","z","c","v"
                ,"u","n","x","r","j","f","t","/","\\","|","(",")","1","{","}","["
                ,"]","?","-","_","+","~","<",">","i","!","l","I",";",":",",","^","`","."," "
                ];
let noiseScale=0.1
function draw() {
     background(0,30);
    for(let i  = -10; i <= 60; i++){
        for(let j = -60; j <= 100; j++){
            translate(i*60,j*60)
            let noiseVal = noise(i*noiseScale, j*noiseScale, frameCount*0.009);

            let ch2 = map(noiseVal,0,1,0,chars.length);
            let h = map(noiseVal,0,1,-10,130);
            
            let xo = map(noiseVal,0,1,-100,100);

            fill(h,100,100);
            text(chars[round(ch2)],0+xo,0-sin(frameCount)*80);
            resetMatrix();
        }
    }
}