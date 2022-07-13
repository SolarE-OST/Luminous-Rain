class LostMemory extends Stage {
    constructor() {
        super("Lost Memory");
        this.title = "Lost Memory";
        this.composer = "Sakuzyo";
        this.subtitle = "Forest of Reflection";
        this.difficulty = 3;
        this.tempo = 190;
        this.offset = -10;
        this.timeSignature = 4; //6
        this.songPath = "songs/LostMemory.mp3";
        this.map = [];
        this.saveLoc = ["story1", "s1"];
        this.storyboard = false;
        //Object.assign(this, level);

    }

    buildBeatmap() {
        this.beatMap = [
            [
                [1, Pattern.explode({x: 200, y: 300, grav: 0.01})],
                [3, Pattern.explode({x: 400, y: 300, grav: 0.01})],
            ],
            [
                [1, Pattern.explode({x: 150, y: 200, grav: 0.01})],
                [2.5, Pattern.explode({x: 300, y: 200, grav: 0.01})],
                [4, Pattern.explode({x: 450, y: 200, grav: 0.01})],
            ],
            [
                [1, Pattern.explode({x: 200, y: 100, grav: 0.01, other: {color: 0xff0000}})],
                [1, Pattern.explode({x: 400, y: 100, grav: 0.01, other: {color: 0xff0000}})],
            ],
        ];
    }
}