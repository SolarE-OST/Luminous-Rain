let musicScenes = {
  async getSong(url) {
    this.songLoaded = false;
    this.audioContext = new window.AudioContext();
    //this.load.audio(this.levelName, this.songPath);
    this.song = await this.loadSong(url);
    this.songDuration = this.song.duration;
    this.songLoaded = true;
  },

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