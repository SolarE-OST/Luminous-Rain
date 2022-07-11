class MainMenu extends Phaser.Scene {
    constructor() {
        super("Main Menu");
        Object.assign(this, musicScenes)
    }

    preload() {
        this.getSong("music/0f.mp3");
    }

    create() {
        // Initialize Sound
        this.audioPlaying = false;
        this.initSound();
        this.ampVal = 0;
        //this.music.gainNode.gain.value = options.musicVolume;
        this.music.gainNode.gain.value = 0.1;

        this.titleText = [];
        for (let i = 0; i < 3; i++) { //change title text glow strength
            this.titleText[i] = this.add.text(450, 120, "Luminous Rain", {
                fontSize: 100,
                align: "center",
                color: "#f0f076",
                stroke: "#f0f076",
                strokeThickness: 1,
                padding: {
                    x: 60,
                    y: 60
                }
            }).setShadow(0, 0, "#f0f076", 20).setOrigin(0.5, 0.5).setScrollFactor(0.1);

        }

        //following code is temporary

        this.glow = this.add.layer();

        this.testDroplet = this.add.droplet({
            r: 4,
            movement: Movement.piecewise({
                movementArray: [
                    Movement.linear({
                        x: 100,
                        y: 200,
                        xf: 300,
                        yf: 100,
                        length: 70,
                    }),
                    Movement.still({x: 300, y: 100, length: 50}),
                    Movement.linear({
                        x: 300,
                        y: 100,
                        xf: 700,
                        yf: 500,
                        length: 50,
                    }),
                    Movement.kinematic({
                        x: 700,
                        y: 500,
                        vx: -5,
                        vy: -10,
                        ay: 0.2,
                        length: 100
                    }),
                    Movement.parametric({
                        para: t => [(t / 5)**2, 200 * Math.sin(t / 10) + 300]
                    })
                ]
            }),
            delay: 3
        });
        

        this.testDroplets = [];
        for (let i = 0; i < 2 * Math.PI * 999 / 1000; i+=2 * Math.PI / 1000) {
            this.testDroplets.push(this.add.droplet({
                r: 4,
                delay: 50,
                movement: Movement.kinematic({
                    x: 450,
                    y: 300,
                    vx: 2 * Math.cos(i) + Math.random(),
                    vy: 2 * Math.sin(i) + Math.random(),
                    ay: 0.03
                })
            }))
        }

    }

    update() {
        if (this.songLoaded && !this.audioPlaying) {
            //console.log("song playing");
            this.music.sourceNode.buffer = this.song;
            //console.log(this.music.sourceNode);
            this.music.sourceNode.start(0, 15.9);
            this.music.sourceNode.loop = true;
            this.music.sourceNode.loopStart = 15.9;
            this.audioPlaying = true;
        }

        this.setFlicker();


        //this.testDroplet.move();
        for (let singleDroplet of this.testDroplets) {
            singleDroplet.move();
        }
    }
}