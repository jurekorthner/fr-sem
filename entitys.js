class Player extends Entity {
    constructor(position, size, img) {
        super(position, size);
        this.img = img;
        this.drag = 0;
    }

    preload() {


    }

    tick() {
        var lastPos = this.position.x;
        this.size.x = clamp(128 - gameManager.level * 8, 40, 120);

        if (keyIsDown(RIGHT_ARROW) && !(this.position.x + this.size.x > width)) this.position.x += 10 + gameManager.level * 2;
        if (keyIsDown(LEFT_ARROW) && !(this.position.x < 0)) this.position.x -= 10 + gameManager.level * 2;

        if (gameManager.mouseInput) this.position.x += movedX;
        this.position.x = clamp(this.position.x, 0, width - this.size.x)

        this.drag = this.position.x - lastPos;
    }

    draw() {
        image(this.img, this.position.x, this.position.y, this.size.x, this.size.y)
    }

    phys() {

    }
}

class Ball extends Entity {
    constructor(position, size, initialVelocity, img) {
        super(position, size);
        this.img = img;
        this.velocity = initialVelocity;
    }

    tick() {
        this.position.add(this.velocity);
    }

    draw() {
        fill(80, 71, 181);
        image(this.img, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
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
        // Top
        if (collideLineCircle(player.position.x, player.position.y, player.position.x + player.size.x, player.position.y, this.position.x, this.position.y, this.size.x)) {
            this.velocity.reflect(new p5.Vector(0, 1));
            this.velocity.rotate(random(-0.1 + player.drag / 12 / 5, 0.1));            
        }              


        // Dead zone collision
        if (collideRectCircle(0, height * 0.95, width, height, this.position.x, this.position.y, this.size.x)) {           
            gameManager.health--;
            gameManager.reset();
        }



    }
}

class Tile extends Entity {
    constructor(position, size, img, row) {
        super(position, size);
        this.img = img;
        this.row = row;        
    }
    draw() {        
        image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);        
    }

    phys() {
        var hit = collideRectCircle(this.position.x, this.position.y, this.size.x, this.size.y, ball.position.x, ball.position.y, ball.size.x);

        if (hit) {
            ball.velocity.reflect(new p5.Vector(0, 1));
            var e = gameManager.entitys.indexOf(this)
            gameManager.entitys.splice(e, 1);
            gameManager.score += 1;
            if (gameManager.entitys.length <= 2) {
                gameManager.lvlUp();
            }
        }

    }

}