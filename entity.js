class GameManager {
    constructor(health) {
        this.entitys = new Array();
        this.started = false;
        this.ended = false;
        this.level = 1;
        this.score = 0;
        this.health = health;
        this.mouseInput = false;
    }

    register(e) {
        this.entitys.push(e)
    }

    setup() {
        player = new Player(
            new p5.Vector((windowWidth / 2) - (75 / 2), windowHeight * 0.88),
            new p5.Vector(clamp(128 - this.level * 8, 40, 120), 15),
            paddelImg);

        ball = new Ball(new p5.Vector(windowWidth / 2 + 15, windowHeight * 0.8),
            new p5.Vector(30, 30),
            new p5.Vector(random(-0.1, 0.1), -6 - 0.4 * gameManager.level),
            ballImg);

        this.register(player);
        this.register(ball);


        var spacing = 85;
        var tileSizeX = 75;
        var tileSizeY = 28;

        var nX = Math.floor(windowWidth / 85);
        var padding = (windowWidth - nX * 85) / 2;


        for (var i = 0; i < nX; i++) {
            var n = 0;
            for (var k = 0; k < clamp(this.level + 2, 1, (height - 75 - 300) / 28); k++) {
                if (n >= 10) n = 0;
                var tile = new Tile(new p5.Vector(padding + i * spacing, 95 + k * 36), new p5.Vector(75, 28), uiManager.tileImgs[n], k);
                n++;

                gameManager.register(tile);
            }
        }
    }

    tick() {
        if (this.started) {
            this.entitys.forEach(e => {
                if (e instanceof Entity) {
                    e.tick();
                }
            });
        }
    }

    draw() {
        this.entitys.forEach(e => {
            if (e instanceof Entity) {
                e.draw();
            }
        });
    }

    phys() {
        this.entitys.forEach(e => {
            if (e instanceof Entity) {
                e.phys();
            }
        })
    }

    reset() {
        player.position = new p5.Vector((windowWidth / 2) - (75 / 2), windowHeight * 0.88);

        ball.position = new p5.Vector(windowWidth / 2 + 15, windowHeight * 0.8);
        ball.velocity = new p5.Vector(random(-0.1, 0.1), -6 - 0.4 * gameManager.level)

        //this.setup();
    }

    lvlUp() {
        this.entitys = [];
        this.level++;
        this.setup();
    }


    end() {
        this.ended = true;
        this.started = false;
        noLoop();
    }
}

class Entity {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }

    tick() {

    }

    draw() {

    }

    phys() {

    }
}

class UIManager {
    constructor() {
        this.tileImgs = new Array();
        this.font = loadFont('src/ps.ttf');
    }

    preload() {
        this.tileImgs[0] = loadImage('src/tile_1.png')
        this.tileImgs[1] = loadImage('src/tile_2.png')
        this.tileImgs[2] = loadImage('src/tile_3.png')
        this.tileImgs[3] = loadImage('src/tile_4.png')
        this.tileImgs[4] = loadImage('src/tile_5.png')
        this.tileImgs[5] = loadImage('src/tile_6.png')
        this.tileImgs[6] = loadImage('src/tile_7.png')
        this.tileImgs[7] = loadImage('src/tile_8.png')
        this.tileImgs[8] = loadImage('src/tile_9.png')
        this.tileImgs[9] = loadImage('src/tile_10.png')
    }

    setup() {
        textFont(this.font);

    }

    draw() {
        noSmooth();
        fill(50)
        rect(0, 0, width, 75)
        noStroke();

        fill(255);
        textSize(26);
        text(pad(gameManager.score, 5), width - 150, 50 / 2, 100, 50)

        textSize(16)
        text(gameManager.mouseInput ? "Mouse" : "Keyboard", width * 0.6, 50 / 2, 100, 50);
        textSize(8);
        text("M -> toggle", width * 0.6, 50 / 2 + 30, 100, 50);


        for (var i = 0; i < gameManager.health; i++) {
            fill("red");
            noStroke();

            image(heartImg, 20 + i * 60, 20, 40, 40)
        }
        if (gameManager.ended) {
            clear();
            fill(120);
            background(40);
            textSize(48);
            text("Game Over!", width / 2 - 48 / 2, height / 2 - 48 / 2);
            textSize(30);
            text("Score: " + pad(gameManager.score, 5), width / 2 - 48 / 2 + 40, height / 2 + 30);
        }

    }
}