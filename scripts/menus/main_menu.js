class MainMenu extends Phaser.Scene {
    constructor() {
        super("Main Menu");
        Object.assign(this, musicScenes);
        Object.assign(this, menu);
    }

    preload() {
        this.getSong("music/0f.mp3");
        this.assetLoad();
    }

    create() {
        // Initialize Sound
        this.audioPlaying = false;
        this.initSound();
        this.ampVal = 0;
        this.music.gainNode.gain.value = settings.musicVolume.value;
        //this.music.gainNode.gain.value = 0.1;
        this.soundInit();

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

        this.playButton = this.button({
            x: 450,
            y: 300,
            w: 700,
            h: 80,
            text: "Play",
            //callback: this.goto("Level Select", false, {music: this.music})
            callback: this.goto("Lost Memory")
        });


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

        this.titleText[0].setStroke("#f0f076", this.flicker * 6);
        for (let singleText of this.titleText) {
            singleText.setShadowBlur(this.flicker * 30);
        }
       
    }
}