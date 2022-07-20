/*
class BaseTrail {
    constructor({byTime = true, time = 30, distance = 30, config = {}}) {
        this.byTime = byTime;
        this.counter = 0;
        this.dropTrail = false;
        this.config = config;
        if (this.byTime) {
            this.separation = time;
        } else {
            this.separation = distance;
        }
    }

    step(dist = 1) {
        this.counter += dist;
        if (this.counter >= this.separation) {
            this.dropTrail = true;
            this.counter = 0;
        }
    }
}

class Follow extends BaseTrail {
    constructor({movement, length = 4, byTime = true, time = 10, distance = 10, config = {}}) {
        super({byTime: byTime, time: time, distance: distance, config: config});
        this.movement = movement;
        this.length = length;
    }

    step(dist = 1) {
        this.counter += dist;
        if (this.counter >= this.separation && this.length > 0) {
            this.dropTrail = true;
            this.counter = 0;
            this.length--;
        }
    }

    createTrailDroplet() {
        this.dropTrail = false;
        this.config.movement = this.movement; 
        //console.log(this.config);
        return new Single("plain", this.config);
    }
}

const Trail = {
    follow: args => new Follow(args),
}
*/

const trails = {
    initTrail({type, separateByTime = true, separation = 30, length = 4, random = 1, trailConfig = {}, trailIndividualConfig = {}}) { // type, separationType ("distance" or "time"), separation, 
        this.trailCounter = 0;
        this.trailType = type;
        this.separateByTime = separateByTime;
        this.separation = separation;
        this.trailLength = length;
        this.trailDrop = false;
        this.random = random;
        this.trailConfig = trailConfig;
        this.trailIndividualConfig = trailIndividualConfig;

        if (this.trailType == "follow") {
            this.followedMovement = structuredClone(this.movement);
            this.totalLife = this.life;
            /*
            Object.defineProperty(this.followedMovement, 'position', {
                get: function() { return { x: this.followedMovement.x, y: this.followedMovement.y }; }
            });
            console.log(this.followedMovement.position);
            */
        }
    },

    stepTrail() {
        if (this.trailLength > 0) {
            if (this.separateByTime) {
                this.trailCounter++;
            } else {
                this.trailCounter += this.movement.stepLength;
            }
            this.trailDrop = this.trailCounter >= this.separation;
        }
    },

    dropTrail() {
        this.trailDrop = false;
        this.trailCounter = 0;
        switch (this.trailType) {
            case "follow":
                //console.log(this.trailIndividualConfig);
                this.trailLength--;
                return this.followTrail();
            case "falling":
                return this.fallingTrail();
            default:
                console.error(`Trail of type "${this.trailType}" is invalid`);
        }
    },

    followTrail() {
        let newMovement = structuredClone(this.followedMovement);
        newMovement.checkComplete = this.movement.checkComplete;
        newMovement.step = this.movement.step;
        return new Single("plain", {
            movement: newMovement,
            life: this.totalLife,
            delay: 0,
            other: this.trailIndividualConfig
        })
    },

    fallingTrail() {
        return new Single("plain", {
            movement: Movement.kinematic({
                x: this.movement.x,
                y: this.movement.y,
                vx: Utils.random(-this.random, this.random),
                vy: 2,
                ax: 0,
                ay: this.trailConfig.ay
            }),
            delay: 0,
            other: this.trailIndividualConfig
        })
    },


}

const Trail = {
    /**
     * @description Follow: trail of droplets that follow the main droplet
     * @param {number} length - How many droplets following
     * @param {number} separation - How separated are the droplets
     * @param {boolean} separateByTime - Should the trail droplets be separated in time (frames) or by distance traveled
     * @param {Object} trailIndividualConfig - Other configuration to all individual trail droplets
     */
    follow({length = 50, separation = 10, separateByTime = true, trailIndividualConfig = {}}) {
        return {
            type: "follow",
            length: length,
            separation: separation,
            separateByTime: separateByTime,
            trailIndividualConfig: trailIndividualConfig
        }
    },

    /**
     * @description Falling: trail of droplets that follow the main droplet
     * @param {number} ay - How fast do the droplets fall
     * @param {number} separation - How separated are the droplets
     * @param {boolean} separateByTime - Should the trail droplets be separated in time (frames) or by distance traveled
     * @param {Object} trailIndividualConfig - Other configuration to all individual trail droplets
     */
     falling({separation = 10, separateByTime = true, ay = 0.05, trailIndividualConfig = {}}) {
        return {
            type: "falling",
            length: 999999,
            separation: separation,
            separateByTime: separateByTime,
            trailConfig: {
                ay: ay
            },
            trailIndividualConfig: trailIndividualConfig
        }
    },
}