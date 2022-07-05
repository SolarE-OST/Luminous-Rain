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
  }
}