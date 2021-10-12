class GameManager {
    constructor(health) {
        this.entitys = new Array();
        this.started = false;
        this.ended = false;
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
            new p5.Vector(22, 22),
            new p5.Vector(0, -4));

        this.register(player);
        this.register(ball);
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
        this.entitys = [];
        this.setup();
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