class Player extends Entity {
    constructor(position, size, img) {
        super(position, size);
        this.img = img;
    }

    preload() {


    }

    tick() {
        if (keyIsDown(RIGHT_ARROW)) {
            this.position.x += 10;

        }

        if (keyIsDown(LEFT_ARROW)) this.position.x -= 10;

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
        image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
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

        if (collideRectCircle(0, height * 0.95, width, height, this.position.x, this.position.y, this.size.x)) {
            console.log("collideRectCircle");
            health--; 
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
        //tint(this.row * 10);
        image(this.img, this.position.x, this.position.y, this.size.x, this.size.y);        
    }

    phys() {        
        var hit = collideRectCircle(this.position.x, this.position.y, this.size.x, this.size.y, ball.position.x, ball.position.y, ball.size.x);
        
        if(hit) {
            ball.velocity.reflect(new p5.Vector(0, 1));
            var e = gameManager.entitys.indexOf(this)
            gameManager.entitys.splice(e, 1);
            gameManager.score += 1;
            //console.log(e);
            console.log(gameManager.entitys.length);
            if(gameManager.entitys.length <= 2) {                
                gameManager.lvlUp();
                
            }
        }
        
    }

}