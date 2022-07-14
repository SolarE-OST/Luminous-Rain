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
    initTrail({type, separateByTime = true, separation = 30, length = 4, trailIndividualConfig = {}}) { // type, separationType ("distance" or "time"), separation, 
        this.trailCounter = 0;
        this.trailType = type;
        this.separateByTime = separateByTime;
        this.separation = separation;
        this.trailLength = length;
        this.trailDrop = false;
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
                return this.followTrail(this.trailIndividualConfig);
            default:
                console.error(`Trail of type "${this.trailType}" is invalid`);
        }
    },

    followTrail(config){
        let newMovement = structuredClone(this.followedMovement);
        newMovement.checkComplete = this.movement.checkComplete;
        newMovement.step = this.movement.step;
        return new Single("plain", {
            movement: newMovement,
            life: this.totalLife,
            delay: 0,
            other: config
        })
    },


}