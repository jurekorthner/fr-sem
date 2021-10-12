class GameManager {
    constructor(health) {
        this.entitys = new Array();
        this.started = false;
        this.ended = false;
        this.level = 1;
        this.score = 0;
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
            new p5.Vector(0, -7),
            ballImg);

        this.register(player);
        this.register(ball);


        var spacing = 85;
        var tileSizeX = 75;
        var tileSizeY = 28;

        var nX = Math.floor(windowWidth / 85);
        var padding = (windowWidth - nX * 85) / 2;


        for (var i = 0; i < nX; i++) {
            for (var k = 0; k < this.level + 2; k++) {
                var tile = new Tile(new p5.Vector(padding + i * spacing, 95 + k * 36), new p5.Vector(75, 28), tiles[k], k);

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