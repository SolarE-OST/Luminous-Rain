class Single {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }

    generate(scene) {
        switch (this.type) {
            case "plain":
                return [scene.add.droplet(this.args)];
            case "circle warning":
                return [scene.add.circleWarning(this.args)];
            default:
                console.error(`Droplet type "${this.type}" does not exist`);
        }
    }
}

class BasePattern {
    static tempo = 120;

    constructor() {
        this.dropletArray = [];
    }

    static getTime(beats) {
        return Math.round(beats / this.tempo * 60 * 60);
    }

    generate(scene) {
        return this.dropletArray.map(d => d.generate(scene)[0]);
    }
}



class Explode extends BasePattern {
    constructor({x, y, num = 6, speed = 2, grav = 0.05, randomRotation = true, delay=BasePattern.getTime(4), rotationOffset = 0, other = {}}) {
        super();
        let randomFactor = randomRotation ? Math.random() * 2 * Math.PI : rotationOffset;

        this.dropletArray.push(new Single("circle warning", {
            r: num * 2 + 10,
            x: x,
            y: y,
            length: delay
        }))

        for (let i = 0; i < num; i++) {
            this.dropletArray.push(new Single("plain", {
                r: 4,
                movement: Movement.kinematic({
                    x: x,
                    y: y,
                    vx: speed * Math.cos(i / num * 2 * Math.PI + randomFactor),
                    vy: speed * Math.sin(i / num * 2 * Math.PI + randomFactor),
                    ay: grav
                }),
                delay: delay,
                other: other
            }));
        }
    }
}

class Falling extends BasePattern {
    constructor({x, r = 4, y = -r, vx = Utils.random(-0.5, 0.5), vy = 3, grav = 0.05, other = {}}) {
        super();
        this.dropletArray.push(new Single("plain", {
            r: r,
            movement: Movement.kinematic({
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                ay: grav
            }),
            other: other
        }));
    }
}

class Rain extends BasePattern {
    constructor({length, fpd=5, speed=3, grav=0, other = {}}) {
        super();
        for (let i = 0; i < length / fpd; i++) {
            this.dropletArray.push(new Single("plain", {
                delay: i * fpd + Utils.random(-fpd / 2, fpd / 2),
                movement: Movement.kinematic({
                    x: Utils.random(0, 600),
                    y: -5,
                    vx: 0,
                    vy: speed,
                    ay: grav
                }),
                other: other
            }))
        }
    }
}

class Spiral extends BasePattern {
    constructor({x, y, length, fpd = 2, rotationOffset = 0, angle = Math.PI / 10, speed = 2, color = 0x0080ff, other = {}}) {
        super();
        for (let i = 0; i < length / fpd; i++) {
            this.dropletArray.push(new Single("plain", {
                delay: i * fpd,
                color: color,
                movement: Movement.kinematic({
                    x: x,
                    y: y,
                    vx: speed * Math.cos(i * angle + rotationOffset),
                    vy: speed * Math.sin(i * angle + rotationOffset),
                    ay: 0
                }),
                other: other
            }))
        }
    }
}

class MultiSpiral extends BasePattern {
    constructor({x, y, length, fpd = 2, rotationOffset = 0, angle = Math.PI / 10, speed = 2, color = 0x0080ff, width = 3, spacing = Math.PI / 10, radiusArray = Array(width).fill(4), other = {}}) {
        super();
        for (let i = 0; i < length / fpd; i++) {
            for (let j = 0; j < width; j++) {
                this.dropletArray.push(new Single("plain", {
                    delay: i * fpd,
                    color: color,
                    r: radiusArray[j],
                    movement: Movement.kinematic({
                        x: x,
                        y: y,
                        vx: speed * Math.cos(i * angle + j * spacing + rotationOffset),
                        vy: speed * Math.sin(i * angle + j * spacing + rotationOffset),
                        ay: 0
                    }),
                    other: other
                }));
            }
        }
    }
}

const Pattern = {
    /**
     * Single droplet
     * 
     * type - Type of droplet (shape)
     * 
     * args - Config for droplet
     */
    single: (type, args) => new Single(type, args),

    /**
     * Explosion from a single point, follows kinematics
     * 
     * x - X position of explosion
     * 
     * y - Y position of explosion
     * 
     * num - number of droplets in explosion
     * 
     * speed - how fast droplets shoot from explosion
     * 
     * grav - acceleration of droplets after explosion
     */
    explode: args => new Explode(args), //{x, y, num = 6, speed = 5, grav = 0.05}
    falling: args => new Falling(args),

    /**
     * Many droplets that fall for some period of time
     * 
     * length - How long (in frames) should the rain last
     * 
     * fpd - How many frames (on average) per droplet (higher = less droplets)
     * 
     * speed - How fast do the droplets start off
     * 
     * grav - How fast do the droplets accelerate down
     */
    rain: args => new Rain(args),

    spiral: args => new Spiral(args), //{x, y, length, fpd = 2, rotationOffset = 0, angle = Math.PI / 10, speed = 2}

    multiSpiral: args => new MultiSpiral(args),
}