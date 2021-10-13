let paddelImg;
let font;
let heartImg;
let ballImg;

let player;
let ball;

let gameManager;
let uiManager;

let health;



function preload() {
  paddelImg = loadImage('src/paddel.png');
  ballImg = loadImage('src/ball.png')
  heartImg = loadImage('src/heart.png');
  font = loadFont('src/ps.ttf');

  uiManager = new UIManager();  
  uiManager.preload();
}

function setup() {
  textFont(font);  
  collideDebug(true);

 let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  
  uiManager.setup();

  gameManager = new GameManager(3);
  gameManager.setup();

  //stroke(255);
}

function draw() {  
  background(30);

  fill(50)
  rect(0, 0, width, 75)

  if (health <= 0) {
    gameManager.end()
  }

  fill(255);  
  textSize(26);
  text(pad(gameManager.score, 5), width * 0.89, 50 / 2, 100, 50)

  drawHealth(health);

  gameManager.tick();
  gameManager.phys();
  gameManager.draw();

}

function drawHealth(health) {
  for (var i = 0; i < health; i++) {
    fill("red");
    noStroke();

    image(heartImg, 20+ i * 75, 20, 40, 40)
  }
}

function keyPressed() {
  if (!this.ended) {
    gameManager.started = true;
  }
}

function pad(num, size) {
  var s = "000000" + num;
  return s.substr(s.length - size);
}