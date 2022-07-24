class Stage extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.levelName = key;
        this.beatMap = [];
        this.map = [];

        this.title = "";
        this.composer = "";
        this.subtitle = "";
        this.difficulty = 0;
        this.tempo = 120;
        this.offset = 0; //decrease if bullets are too early, increase if bullets are too late
        this.wait = 0;
        this.timeSignature = 4;
        this.songPath = "";
        this.saveLoc = ["", ""];
        this.storyboard = false;

        this.startingBackgroundColor = "#1e1e46";
        Object.assign(this, musicScenes);
    }

    // returns amount of time in frames that pass during the given number of beats
    getTime(beats) {
        return Math.round(beats / this.tempo * 60 * 60);
    }

    preload() {
        this.load.image("bb", "images/particle.png");
        this.getSong(this.songPath);

    }

    create(data) {
        this.wait += 100;
        this.t = -this.wait;

        BasePattern.prototype.tempo = this.tempo;

        this.waiting = false;

        this.bb = this.add.particles("bb");
    
        this.loadingCircle = this.bb.createEmitter({
            tint: 0x0080ff,
            x: 300,
            y: 300,
            scale: { start: 0.4, end: 0, ease: Phaser.Math.Easing.Quintic.Out },
            blendMode: "ADD",
            frequency: 30,
            emitZone: {
                type: "edge",
                source: new Phaser.Geom.Circle(0, 0, 40),
                quantity: 24,
                yoyo: false,
            },
        });
        this.loadingText = [];
        for (let i = 0; i < 3; i++) {
            this.loadingText[i] = this.add.text(300, 200, "Loading...", {
                fontSize: 50,
                align: "center",
                color: "#f0f076",
                stroke: "#f0f076",
                strokeThickness: 3,
                padding: {
                    x: 20,
                    y: 20,
                }
            }).setShadow(0, 0, "#f0f076", 20).setOrigin(0.5, 0.5);
        }


        /*
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
        */

        this.activeDroplets = this.physics.add.group()
        this.glow = this.add.layer();

        this.initSound();

        this.buildBeatmap();
        this.processBeatmap();

        


        this.cameras.main.setBackgroundColor(this.startingBackgroundColor);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

    }

    // processes manually charted beatmap into timemap for the game to run
    processBeatmap() {
        // change later to incorporate tempo/time signature changes
        for (let i = 0; i < this.beatMap.length; i++) {
            let measure = this.beatMap[i];
            let measureTimestamp = this.getTime((i + 1) * this.timeSignature);
            for (let beat of measure) {
                let timestamp = measureTimestamp + this.getTime(beat[0] - 5) + this.offset;
                this.map.push([timestamp, beat[1]]);
            }
        }
        this.map.push([999999999, "idk"]);

    }

    update() {
        if (this.t % (settings.songRefreshRate.value * 60) == settings.songRefreshRate.value * 60 - 1 && this.t >= 0) {
            this.music.sourceNode.stop();
            this.music.sourceNode = this.audioContext.createBufferSource();
            this.music.sourceNode.connect(this.music.gainNode);
            this.music.gainNode.connect(this.audioContext.destination);
            this.music.sourceNode.connect(this.music.analyserNode);
            this.music.sourceNode.buffer = this.song;
            this.music.sourceNode.start(0, this.t / 60);
            this.music.gainNode.gain.value = settings.musicVolume.value;
            //this.music.gainNode.gain.value = 0.1;
            //this.startedMultiplying = true;
        }

        if (this.songLoaded) {
            this.t++;
        }

        if (this.waiting) {
            this.wait--;
        }

        if (this.songLoaded && !this.waiting && !this.audioPlaying) {
            this.waiting = true;
            this.loadingCircle.stop();
            this.tweens.add({
                targets: this.loadingText,
                alpha: 0,
                ease: "Quintic.easeOut",
                duration: 300,
                delay: 0,
                repeat: 0
              }).on("complete", () => {
              for (let singleText of this.loadingText) {
                singleText.destroy();
              }
              this.loadingText = null;
              this.loadingCircle = null;
            });
        }

        if (this.wait <= 0 && !this.audioPlaying) {
            //console.log("song playing");
            this.music.sourceNode.buffer = this.song;
            //console.log(this.music.sourceNode);
            this.music.sourceNode.start(0);
            this.music.gainNode.gain.value = settings.musicVolume.value;
            this.waiting = false;
            /*
            if (this.wait != null && settings.startTime + options.startTime < this.wait) {
              this.audioContext.suspend();
            }
            */
            this.audioPlaying = true;
            
            /*for (let singleText of this.loadingText) {
              singleText.destroy();
            }*/
        }
      
        this.setFlicker();
        
        //console.log(this.map.length);
        let simultaneous = true;
        if (this.map.length > 1) {
            while (simultaneous) {
                if (this.t == this.map[0][0]) {
                    let newBullets = this.map[0][1].generate(this);
                    for (let newBullet of newBullets) {
                        this.activeDroplets.add(newBullet);
                    }
                    this.map.shift();
                } else if (this.t > this.map[0][0]) {
                    this.map.shift();
                } else {
                    simultaneous = false;
                }
            }
        }

        for (let activeDroplet of this.activeDroplets.getChildren()) {
            activeDroplet.move();
            if (activeDroplet.readyDelete) {
                if (activeDroplet.glow) {
                    activeDroplet.glow.destroy();
                }
                activeDroplet.destroy();
            }
        }
    }
}