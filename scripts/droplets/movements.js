class BaseMovement {
    constructor({ startX: x, startY: y, totalLength: length }) {
        this.x = x;
        this.y = y;
        this.length = length;

        this.complete = false;
    }

    get position() {
        return { x: this.x, y: this.y };
    }

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
    constructor({ x, y, xf, yf, length=999999}) {
        super({ startX: x, startY: y, totalLength: length });
        this.xi = x;
        this.yi = y;
        this.xf = xf;
        this.yf = yf;

        this.xStep = (this.xf - this.xi) / length;
        this.yStep = (this.yf - this.yi) / length;
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
    constructor({x, y, vx, vy, ax = 0, ay, length=999999}) {
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

            this.checkComplete();
        }
    }
}



class Piecewise extends BaseMovement {
    constructor({ x, y, movementArray }) {
        super({ startX: x, startY: y });
        this.movementArray = movementArray;
        this.index = 0;
    }

    step() {
        if (!this.complete) {
            let currentMovement = this.movementArray[this.index];
            currentMovement.step();
            this.x = currentMovement.position.x;
            this.y = currentMovement.position.y;
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
    still(args) {
        return new Still(args); //{ x, y, length = 999999 }
    },
    linear(args) {
        return new Linear(args); //{ x, y, xf, yf, length = 999999 }
    },
    piecewise(args) {
        return new Piecewise(args); //{ x, y, movementArray }
    },
    kinematic(args) {
        return new Kinematic(args); //{x, y, vx, vy, ax = 0, ay, length = 999999 }
    },
    parametric(args) {
        return new Parametric(args); //{para, length = 999999 }
    }
}
