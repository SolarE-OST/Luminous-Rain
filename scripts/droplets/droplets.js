class Droplet extends Phaser.GameObjects.Ellipse { //circle droplet
    constructor(scene, defaultDelay, {r = 4, movement = Movement.still(300, 300), delay = defaultDelay, life = 999999, dec = false, color = 0x0080ff, trail = {type: "none"}, other = {}}) {
        super(scene, movement.x, movement.y, 2 * r, 2 * r, 0xffffff)
        this.scene = scene;
        this.movement = movement;
        this.r = r;
        this.x = this.movement.x;
        this.y = this.movement.y;
        this.delay = delay;
        this.life = life;
        this.dec = dec;
        this.color = color;

        if (trail.type == "none") {
            this.trail = false;
            this.trailLength = 0;
        } else {
            Object.assign(this, trails);
            this.initTrail(trail);
            this.scene = scene;
            this.trail = true;
        }

        
        this.readyDelete = false;
        for (let [k, v] of Object.entries(other)) {
            this[k] = v;
        }

        this.glow = scene.glow.add(scene.add.pointlight(this.x, this.y, this.color, this.r * 4, 0.6, 0.07));

    }

    checkBoundaries() {
        return this.x > -50 && this.x < 650 && this.y > -50 && this.y < 650;
    }

    move() {
        if (this.delay <= 0 && 
            ((this.life >= 0 &&
            this.checkBoundaries()) ||
            this.trailLength > 0)) {
            this.visible = true;
            this.glow.visible = true;
            this.active = true;
            this.glow.active = true;
            this.movement.step();
            this.x = this.movement.x;
            this.y = this.movement.y;
            this.glow.x = this.x;
            this.glow.y = this.y;
            
            /*
            if (this.trail) {
                if (this.trail.byTime) {
                    this.trail.step()
                } else {
                    this.trail.step()
                }
                if (this.trail.dropTrail) {
                    let newTrailDroplet = this.trail.createTrailDroplet();
                    let activatedTrailDroplet = newTrailDroplet.generate(this.scene)[0]
                    this.scene.activeDroplets.add(activatedTrailDroplet);
                }
            }
            */
            if (this.trail) {
                this.stepTrail();
                //console.log(this.trailCounter);
                if (this.trailDrop) {
                    let newTrailDroplet = this.dropTrail().generate(this.scene)[0];
                    this.scene.activeDroplets.add(newTrailDroplet);
                }
            }

            this.life--;
            //console.log([this.x, this.y]);
        } else {
            if ((this.life <= 0 || !this.checkBoundaries())) {
                this.readyDelete = true;
            }
            this.delay--;
            this.visible = false;
            this.glow.visible = false;
            this.active = false;
            this.glow.active = false;
        }
    }
}

