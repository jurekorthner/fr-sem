let paddelImg;
let tile1Img, tile2Img, tile3Img, tile4Img, tile5Img, tile6Img, tile7Img, tile8Img, tile9Img, tile10Img;
let tiles;
let font;
let heartImg;
let ballImg;

let player;
let ball;

let gameManager;

let health;



function preload() {
  paddelImg = loadImage('src/paddel.png');
  ballImg = loadImage('src/ball.png')
  heartImg = loadImage('src/heart.png');

  tile1Img = loadImage('src/tile (1).png')
  tile2Img = loadImage('src/tile (2).png')
  tile3Img = loadImage('src/tile (3).png')
  tile4Img = loadImage('src/tile (4).png')
  tile5Img = loadImage('src/tile (5).png')
  tile6Img = loadImage('src/tile (6).png')
  tile7Img = loadImage('src/tile (7).png')
  tile8Img = loadImage('src/tile (8).png')
  tile9Img = loadImage('src/tile (9).png')
  tile10Img = loadImage('src/tile (10).png')

  tiles = [tile1Img, tile2Img, tile3Img, tile4Img, tile5Img, tile6Img, tile7Img, tile8Img, tile9Img, tile10Img];



  font = loadFont('src/ps.ttf');
}

function setup() {
  textFont(font);  
  collideDebug(true);

  health = 3;

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  gameManager = new GameManager();
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