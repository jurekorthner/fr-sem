class GameManager {
    constructor(health) {
        this.entitys = new Array();
        this.started = false;
        this.ended = false;
        this.level = 2;
        this.score = 0;
        this.health = health;
    }

    register(e) {
        this.entitys.push(e)
    }

    setup() {
        player = new Player(
            new p5.Vector((windowWidth / 2) - (75 / 2), windowHeight * 0.88),
            new p5.Vector(120, 15),
            paddelImg);

        ball = new Ball(new p5.Vector(windowWidth / 2, windowHeight * 0.5),
            new p5.Vector(30, 30),
            new p5.Vector(random(-0.1, 0.1), -7),
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
            for (var k = 0; k < this.level + 2; k++) {
                if(n >= 10) n = 0;
                console.log("123")
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

        ball.position = new p5.Vector(windowWidth / 2, windowHeight * 0.5);
        ball.velocity = new p5.Vector(0, -5);

        //this.setup();
    }

    lvlUp() {
        this.entitys = [];
        this.setup();
        this.level++;
    }


    end() {
        this.ended = true;
        this.started = false;
        console.log("ended!")
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

    }
}