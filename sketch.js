let paddelImg;
let heartImg;
let ballImg;

let player;
let ball;

let gameManager;
let uiManager;



function preload() {
  paddelImg = loadImage('src/paddel.png');
  ballImg = loadImage('src/ball.png')
  heartImg = loadImage('src/heart.png');

  uiManager = new UIManager();
  uiManager.preload();
}

function setup() {
  noSmooth();
  noCursor();
  collideDebug(true);

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  uiManager.setup();

  gameManager = new GameManager(3);
  gameManager.setup();
}

function draw() {
  background(30);

  gameManager.tick();
  gameManager.phys();
  gameManager.draw();
  uiManager.draw();

  if (gameManager.health <= 0) {
    if (!gameManager.ended) gameManager.end();    

  }

}

function keyPressed() {
  requestPointerLock()
  if (!gameManager.ended) {
    gameManager.started = true;
  }
  if (gameManager.started && keyCode === 77) { // M key    
    gameManager.mouseInput = gameManager.mouseInput ? false : true;
  }
}

function pad(num, size) {
  var s = "0000000000" + num;
  return s.substr(s.length - size);
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);