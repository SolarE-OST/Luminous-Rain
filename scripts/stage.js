class Stage extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.levelName = key;
        this.songPath = "";
        this.map = [];
        this.startingBackgroundColor = "#1e1e46";
        Object.assign(this, musicScenes);
    }

    preload() {

    }

    create(data) {
        this.t = 0;

        let testLinear = {
            x: 200,
            y: 300, grav: 0.01,
            xf: 700,
            yf: 400,
            length: 180
        }

        this.map = [
            [60, Pattern.explode({x: 450, y: 300, grav: 0.01})],
            [120, Pattern.spiral({x: 450, y: 300, length: 120, color: 0xff0000, angle: Math.PI / 3 + 0.02, fpd: 0.5})],
            [300, Pattern.multiSpiral({x: 450, y: 300, length: 400, color: 0x8000ff, angle: Math.PI / 40, fpd: 4})],
            [301, Pattern.multiSpiral({x: 450, y: 300, length: 400, color: 0x8000ff, angle: Math.PI / 40, fpd: 4, rotationOffset: Math.PI})],
            [350, Pattern.falling({x: 300})],
            [355, Pattern.falling({x: 330})],
            [360, Pattern.falling({x: 360})],
            [365, Pattern.falling({x: 390})],
            [370, Pattern.falling({x: 420})],
            [400, Pattern.multiSpiral({x: 450, y: 300, length: 300, color: 0x8000ff, angle: Math.PI / 40, fpd: 4, rotationOffset: 0.35, radiusArray: [4, 6, 4], other: {life: 100}})],
            [401, Pattern.multiSpiral({x: 450, y: 300, length: 300, color: 0x8000ff, angle: Math.PI / 40, fpd: 4, rotationOffset: Math.PI + 0.35, radiusArray: [4, 6, 4]})]
        ];

        this.activeDroplets = this.physics.add.group()
        this.glow = this.add.layer();

    }

    update() {
        this.t++;

        if (this.map.length > 0 && this.t == this.map[0][0]) {
            let newBullets = this.map[0][1].generate(this);
            for (let newBullet of newBullets) {
                this.activeDroplets.add(newBullet);
            }
            this.map.shift();
        }

        for (let activeDroplet of this.activeDroplets.getChildren()) {
            activeDroplet.move();
            if (activeDroplet.readyDelete) {
                activeDroplet.glow.destroy();
                activeDroplet.destroy();
            }
        }
    }
}