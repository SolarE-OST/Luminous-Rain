
/*
function between(a, b, c) {
    return (a <= b && b <= c) || (c <= b && b <= a);
}
*/
let Utils = {
    /**
     * @description returns the linear distance between (x1, y1) and (x2, y2)
     * @param {number} x1 
     * @param {number} x2 
     * @param {number} y1 
     * @param {number} y2 
     */
    dist: (x1, x2, y1, y2) => Math.sqrt((x2 - x1)**2 + (y2 - y1)**2),

    /**
     * @description returns a random number between a and b
     * @param {number} a 
     * @param {number} b 
     */
    random: (a, b) => Math.random() * (b - a) + a
}

let musicScenes = {
    // gets the song given the path and sets object properties
    async getSong(url) {
        this.songLoaded = false;
        this.audioContext = new window.AudioContext();
        //this.load.audio(this.levelName, this.songPath);
        this.song = await this.loadSong(url);
        this.songDuration = this.song.duration;
        this.songLoaded = true;
    },

    // internally request audio file
    async loadSong(url) {
        let request = new XMLHttpRequest();
        let audcont = this.audioContext;
        let audioBuffer = new Promise((resolve) => {
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            // When loaded, decode the data and play the sound
            request.onload = function () {
                //console.log(this);
                audcont.decodeAudioData(
                    request.response,
                    function (buffer) {
                        //console.log("Song loaded");
                        resolve(buffer);
                    },
                    (e) => console.log(e)
                );
            };
            request.send();
        });
        return audioBuffer;
    },

    // initialize WebAudioAPI sound nodes for flickering
    initSound() {
        this.music = {};
        this.music.sourceNode = this.audioContext.createBufferSource();
        this.music.analyserNode = this.audioContext.createAnalyser();
        this.music.gainNode = this.audioContext.createGain();
        this.music.javascriptNode = this.audioContext.createScriptProcessor(
            1024,
            1,
            1
        ); //change 1024?
        this.music.amplitudeArray = new Uint8Array(
            this.music.analyserNode.frequencyBinCount
        );
        this.music.sourceNode.connect(this.music.gainNode);
        this.music.gainNode.connect(this.audioContext.destination);
        this.music.sourceNode.connect(this.music.analyserNode);
        this.music.analyserNode.connect(this.music.javascriptNode);
        this.music.javascriptNode.connect(this.audioContext.destination);

        //this.ampPrevArray = new Array(settings.flickerSmoothLen).fill(0);
        this.ampPrevArray = new Array(5).fill(0);

    },

    // calculate flicker value
    setFlicker() {
        if (this.audioPlaying) {
            this.music.analyserNode.getByteTimeDomainData(this.music.amplitudeArray);
            this.ampVal = Math.max(...this.music.amplitudeArray);
            //let ampSmooth = this.ampPrevArray.reduce((a, b) => (a + b)) / settings.flickerSmoothLen;
            let ampSmooth = this.ampPrevArray.reduce((a, b) => (a + b)) / 5;
            this.flicker = ((ampSmooth - 128) / 128) * 0.8 + 0.2;
            this.ampPrevArray.shift();
            this.ampPrevArray.push(this.ampVal);
        } else {
            this.flicker = 0.0;
        }
    }
}

let menu = {
    // load menu assets
    assetLoad() {
        this.load.audio("select", "music/sfx/select.wav");
        this.load.audio("ok", "music/sfx/ok.wav");
    },

    // set object properties with sound effects
    soundInit() {
        this.select = this.sound.add("select");
        this.ok = this.sound.add("ok");
        //this.sound.volume = options.soundEffectVolume;
        this.sound.volume = 0.1;
    },

    // transition to next scene (has ability to keep music through), used for buttons
    goto(scene, stopMusic = true, musicData = {}) {
        return () => {
            if (!this.audioPlaying) {
              return;
            }
            if (this.transitioning) {
              return;
            } else {
              this.transitioning = true;
            }
            this.cameras.main.fadeOut(1000, 0, 0, 0, (c, t) => {
              if (stopMusic) {
                //this.music.gainNode.gain.value = (1 - t) * options.musicVolume;
                this.music.gainNode.gain.value = (1 - t) * 0.1;
              }
            });
            this.songLoaded = false;
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              if (stopMusic && this.audioPlaying) {
                this.music.sourceNode.stop();
              }
              this.scene.stop();
              //console.log(musicData.sound);
              this.scene.start(scene, musicData);
            })
          }
    },

    // generic button, no tooltip
    button({x, y, w, h, text, callback, fontSize = h - 24, scrollFactor = 0.1, unlocked = true}) {
        let buttonFrame = this.add.rectangle(x, y, w, h, 0x646496).setStrokeStyle(10, 0x505082).setScrollFactor(scrollFactor);

        let buttonText = this.add.text(x, y, text, {
            fontSize: fontSize,
            align: "center",
            color: "#f0f076",
            stroke: "#505082",
            strokeThickness: 10,
        }).setOrigin(0.5, 0.5).setScrollFactor(scrollFactor);
        if (!unlocked) {
            buttonFrame.setAlpha(0.4);
            buttonFrame.setStrokeStyle();
            buttonText.setAlpha(0.4);
        } else {
            buttonText.setShadow(0, 0, "#f0f076", 20);
            buttonFrame.setInteractive({
                useHandCursor: true,
            })
            .on("pointerover", () => {
                buttonFrame.scale = 1.1;
                buttonText.scale = 1.1;
                this.select.play();
            })
            .on("pointerout", () => {
                buttonFrame.scale = 1;
                buttonText.scale = 1;
            })
            .on("pointerdown", () => {
                this.ok.play();
                callback();
            });
        }
        
        let buttonGroup = this.add.group();
        buttonGroup.add(buttonFrame);
        buttonGroup.add(buttonText);
        return buttonGroup;
    },
}