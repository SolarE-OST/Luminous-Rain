class LostMemory extends Stage {
    constructor() {
      super("Lost Memory");
      this.title = "Lost Memory";
      this.composer = "Sakuzyo";
      this.subtitle = "Forest of Reflection";
      this.difficulty = 3;
      this.tempo = 190;
      this.offset = -10;
      this.ts = 6;
      this.songPath = "songs/LostMemory.mp3";
      this.map = [];
      this.saveLoc = ["story1", "s1"];
      this.storyboard = false;
      //Object.assign(this, level);
    }
}