class LostMemory extends Stage {
    constructor() {
        super("Lost Memory");
        this.title = "Lost Memory";
        this.composer = "Sakuzyo";
        this.subtitle = `"A past forgotten..."`;
        this.difficulty = 3;
        this.tempo = 190;
        this.offset = -24;
        this.wait = 50;
        this.timeSignature = 6;
        this.songPath = "music/chapter1/LostMemory.mp3";
        this.map = [];
        this.saveLoc = ["story1", "s1"];
        this.storyboard = false;
        //Object.assign(this, level);

    }

    /* Lost Memory mechanics:
        - Plain droplets
        - Linear, Kinematic movements
        - Circle warnings
        - Burst, Firework, Falling, Storm patterns
        - Falling trail
    */

    buildBeatmap() {
        this.beatMap = [
            [
                [1, Pattern.rain({
                    length: this.getTime(42),
                    fpd: 12,
                    speed: 2,
                    grav: 0.005,
                    other: {
                        color: 0x00ffff
                    }
                })],
            ], [], [], [], [], [], [],
            [
                [1, Pattern.explode({x: Utils.random(50, 550), y: 100, num: 6})],
                [1, Pattern.rain({
                    length: this.getTime(48),
                    fpd: 12,
                    speed: 2,
                    grav: 0.005,
                    other: {
                        color: 0x00ffff
                    }
                })]
            ],
            [
                [1, Pattern.explode({x: Utils.random(50, 550), y: 100, num: 6})]
            ],
            [
                [1, Pattern.explode({x: Utils.random(50, 550), y: 100, num: 6})]
            ],
            [
                [1, Pattern.explode({x: Utils.random(50, 550), y: 100, num: 6})]
            ]
        ];
    }
}