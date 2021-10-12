let paddelImg;

let player;
let ball;

let gameManager;

let health;

function preload() {
  paddelImg = loadImage('src/paddel.png');
}

function setup() {
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


  drawHealth(health);

  gameManager.tick();
  gameManager.phys();
  gameManager.draw();

}

function drawHealth(health) {
  for (var i = 0; i < health; i++) {
    fill("red");
    noStroke();

    ellipse(37.5 + i * 75, 37.5, 40, 40)
  }
}

function keyPressed() {
  if (!this.ended) {
    gameManager.started = true;
  }
}