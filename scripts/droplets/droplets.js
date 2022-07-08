class Droplet extends Phaser.GameObjects.Ellipse { //circle droplet
    constructor(scene, {r = 4, movement = Movement.still(x, y), delay, life = 999999, dec = false, }) {
        super(scene, movement.position.x, movement.position.y, 2 * r, 2 * r, 0xffffff)
        this.movement = movement;
        this.x = this.movement.position.x;
        this.y = this.movement.position.y;
        this.delay = delay;
        this.life = life;
        this.dec = dec;
    }

    move() {
        this.movement.step();
        this.x = this.movement.position.x;
        this.y = this.movement.position.y;
        this.life--;
        //console.log([this.x, this.y]);
    }
}

