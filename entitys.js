class Player extends Entity {
    constructor(position, size, img) {
        super(position, size);
        this.img = img;
    }

    preload() {


    }

    tick() {
        if (keyIsDown(RIGHT_ARROW)) {
            this.position.x += 5;

        }

        if (keyIsDown(LEFT_ARROW)) this.position.x -= 5;

    }

    draw() {
        image(this.img, this.position.x, this.position.y, this.size.x, this.size.y)
    }

    phys() {

    }
}

class Ball extends Entity {
    constructor(position, size, initialVelocity) {
        super(position, size);
        this.velocity = initialVelocity;
    }

    tick() {
        this.position.add(this.velocity);
    }

    draw() {
        fill(80, 71, 181);
        circle(this.position.x, this.position.y, this.size.x);
    }

    phys() {
        // Border collision
        if (collideLineCircle(0, 75, width, 75, this.position.x, this.position.y, this.size.x)) {
            this.velocity.y *= -1;
        }

        if (collideLineCircle(width, 75, width, height, this.position.x, this.position.y, this.size.x)) {
            this.velocity.x *= -1;
        }

        if (collideLineCircle(width, height, 0, height, this.position.x, this.position.y, this.size.x)) {
            this.velocity.y *= -1;
        }

        if (collideLineCircle(0, height, 0, 75, this.position.x, this.position.y, this.size.x)) {
            this.velocity.x *= -1;
        }

        //Paddel collision
        if (collideLineCircle(player.position.x, player.position.y, player.position.x + player.size.x, player.position.y, this.position.x, this.position.y, this.size.x)) {
            this.velocity.reflect(new p5.Vector(0, 1));
            this.velocity.rotate(0.2);

        }

        fill(200, 10, 10, 100)
        rect(0, height * 0.95, width, height);
        if (collideRectCircle(0, height * 0.95, width, height, this.position.x, this.position.y, this.size.x)) {
            console.log("collideRectCircle");
            health--;
            gameManager.reset();

        }



    }
}