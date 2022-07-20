class Single {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }

    generate(scene) {
        switch (this.type) {
            case "plain":
                return [scene.add.droplet(this.args)];
                break;
            default:
                console.error(`Droplet type "${this.type}" does not exist`);
        }
    }
}

class BasePattern {
    constructor() {
        this.dropletArray = [];
    }

    generate(scene) {
        return this.dropletArray.map(d => d.generate(scene)[0]);
    }
}



class Explode extends BasePattern {
    constructor({x, y, num = 6, speed = 2, grav = 0.05, randomRotation = true, rotationOffset = 0, other = {}}) {
        super();
        let randomFactor = randomRotation ? Math.random() * 2 * Math.PI : rotationOffset;

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
                other: other
            }));
        }
    }
}

class Falling extends BasePattern {
    constructor({x, r = 4, y = -r, vx = (Math.random() - 0.5) * 0.5, vy = 3, grav = 0.05, other = {}}) {
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

class Storm extends BasePattern {
    constructor({length, density=5, speed=5, other = {}}) {
        super();
        
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
    single: (type, args) => new Single(type, args),
    explode: args => new Explode(args), //{x, y, num = 6, speed = 5, grav = 0.05}
    falling: args => new Falling(args),
    spiral: args => new Spiral(args), //{x, y, length, fpd = 2, rotationOffset = 0, angle = Math.PI / 10, speed = 2}
    multiSpiral: args => new MultiSpiral(args),
}