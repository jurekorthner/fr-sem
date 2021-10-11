let bgImg;
 
function preload() {
  bgImg = loadImage('src/space.jpg');
}
 
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.position(20, 20);
}
 
function draw(){
  background(0);
  image(bgImg, 0, 0, width, height);
}