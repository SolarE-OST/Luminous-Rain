class BaseMovement {
    constructor({ startX: x, startY: y, totalLength: length }) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.stepLength = 0;

        this.complete = false;
    }
/*
    get position() {
        return { x: this.x, y: this.y };
    }
*/
    checkComplete() {
        this.length--;
        if (this.length <= 0) {
            this.complete = true;
        }
    }

    step() { }
}

class Still extends BaseMovement {
    constructor({ x, y, length = 999999 }) {
        super({ startX: x, startY: y, totalLength: length });
    }

    step() {
        if (!this.complete) {
            this.checkComplete();
        }
    }
}

class Linear extends BaseMovement {
    constructor({ x, y, xf, yf, length}) {
        super({ startX: x, startY: y, totalLength: length });
        this.xi = x;
        this.yi = y;
        this.xf = xf;
        this.yf = yf;

        this.xStep = (this.xf - this.xi) / length;
        this.yStep = (this.yf - this.yi) / length;
        this.stepLength = Utils.dist(0, this.xStep, 0, this.yStep);
    }

    step() {
        if (!this.complete) {
            this.x += this.xStep;
            this.y += this.yStep;
            /*
            if (between(this.x, this.xf, this.x + this.xStep) || between(this.y, this.yf, this.y + this.yStep)) {
                */
            this.length--;

            if (this.length <= 0) {
                this.complete = true;
                this.x = this.xf;
                this.y = this.yf;
            }
        }
    }
}

class Kinematic extends BaseMovement {
    constructor({x, y, vx, vy, ax = 0, ay = 0.05, length=999999}) {
        super({ startX: x, startY: y, totalLength: length });
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
    }

    step() {
        if (!this.complete) {
            this.x += this.vx;
            this.y += this.vy;
            this.vx += this.ax;
            this.vy += this.ay;

            this.stepLength = Utils.dist(0, this.vx, 0, this.vy);

            this.checkComplete();
        }
    }
}

class Parametric extends BaseMovement {
    constructor({para, length=999999}) {
        super({ startX: para(0)[0], startY: para(0)[1], totalLength: length });
        this.para = para;
        this.t = 0
    }

    step() {
        if (!this.complete) {
            this.x = this.para(this.t)[0];
            this.y = this.para(this.t)[1];
            this.t++;
            this.stepLength = Utils.dist(this.para(this.t - 1)[0], this.x, this.para(this.t - 1)[1], this.y);

            this.checkComplete();
        }
    }
}



class Piecewise extends BaseMovement {
    constructor({ x = 0, y = 0, movementArray }) {
        super({ startX: x, startY: y });
        this.movementArray = movementArray;
        this.index = 0;
    }

    step() {
        if (!this.complete) {
            let currentMovement = this.movementArray[this.index];
            currentMovement.step();
            this.stepLength = Utils.dist(this.x, currentMovement.x, this.y, currentMovement.y);
            this.x = currentMovement.x;
            this.y = currentMovement.y;
            if (this.movementArray[this.index].complete) {
                this.index++;
                if (this.index >= this.movementArray.length) {
                    this.complete = true;
                }
            }
        }
    }
}

const Movement = {


    /**
     * @description Still: Droplet does not move
     * @param {number} x - X position of droplet
     * @param {number} y - Y position of droplet
     * @param {number} [length = 999999] - How long the droplet stays still (in frames)
     */
    still: (args) => new Still(args), //{ x, y, length = 999999 }

    /**
     * @description Linear: Droplet moves in a straight line
     * @param {number} x - Starting X position of droplet
     * @param {number} y - Starting Y position of droplet
     * @param {number} xf - Ending X position of droplet
     * @param {number} yf - Ending Y position of droplet
     * @param {number} [length = 999999] - How long does it take to complete (in frames)
     */
    linear: args => new Linear(args), //{ x, y, xf, yf, length }
    piecewise: args => new Piecewise(args), //{ x, y, movementArray }

    
    /**
     * @description Kinematic: Droplet moves with velocity and acceleration
     * @param {number} x - X position of droplet
     * @param {number} y - Y position of droplet
     * @param {number} vx - X velocity of droplet
     * @param {number} vy - Y velocity of droplet
     * @param {number} [ax = 0] - X acceleration of droplet
     * @param {number} [ay = 0.05] - Y acceleration of droplet
     * @param {number} [length = 999999] - How long the droplet moves kinematically (in frames)
     */
    kinematic: args => new Kinematic(args), //{x, y, vx, vy, ax = 0, ay, length = 999999 }
    parametric: args => new Parametric(args), //{para, length = 999999 }
}
