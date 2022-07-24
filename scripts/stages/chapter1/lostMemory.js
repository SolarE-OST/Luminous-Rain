class LostMemory extends Stage {
    constructor() {
        super("Lost Memory");
        this.title = "Lost Memory";
        this.composer = "Sakuzyo";
        this.subtitle = `"A past forgotten..."`;
        this.difficulty = 1;
        this.tempo = 190;
        this.offset = -27;
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
                    fpd: 20,
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
                    fpd: 20,
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
                [1, Pattern.explode({x: Utils.random(50, 550), y: 100, num: 6})],
                [6.5, Pattern.fall(Utils.random(5, 595))]
            ],
            [
                [1, Pattern.fall(Utils.random(5, 595))],
                [1.5, Pattern.fall(Utils.random(5, 595))],
                [2.5, Pattern.fall(Utils.random(5, 595))],
                [3.5, Pattern.fall(Utils.random(5, 595))],
                [4, Pattern.fall(Utils.random(5, 595))],
                [5.5, Pattern.fall(Utils.random(5, 595))],
                [6, Pattern.fall(Utils.random(5, 595))],
                [6.5, Pattern.fall(Utils.random(5, 595))]
            ],
            [
                [1, Pattern.fall(Utils.random(5, 595))],
                [1.5, Pattern.fall(Utils.random(5, 595))],
                [2.5, Pattern.fall(Utils.random(5, 595))],
                [3.5, Pattern.fall(Utils.random(5, 595))],
                [4, Pattern.fall(Utils.random(5, 595))],
                [5.5, Pattern.fall(Utils.random(5, 595))],
                [6, Pattern.fall(Utils.random(5, 595))],
                [6.5, Pattern.fall(Utils.random(5, 595))]
            ],
            [
                [1, Pattern.fall(Utils.random(5, 595))],
                [1.5, Pattern.fall(Utils.random(5, 595))],
                [2.5, Pattern.fall(Utils.random(5, 595))],
                [3.5, Pattern.fall(Utils.random(5, 595))],
                [4, Pattern.fall(Utils.random(5, 595))],
                [5.5, Pattern.fall(Utils.random(5, 595))],
                [6, Pattern.fall(Utils.random(5, 595))],
                [6.5, Pattern.fall(Utils.random(5, 595))]
            ],
            [
                [1, Pattern.fall(Utils.random(5, 595))],
                [1.5, Pattern.fall(Utils.random(5, 595))],
                [2, Pattern.fall(Utils.random(5, 595))],
                [2.5, Pattern.fall(Utils.random(5, 595))],
                [3.5, Pattern.fall(Utils.random(5, 595))],
                [4, Pattern.fall(Utils.random(5, 595))],
                [4.5, Pattern.fall(Utils.random(5, 595))],
                [5, Pattern.fall(Utils.random(5, 595))],
                [5.5, Pattern.fall(Utils.random(5, 595))],
                [6.5, Pattern.fall(Utils.random(5, 595))]
            ]
        ];
        
/*
        this.beatMap = Array(32).fill([
            [1, Pattern.single("plain", {
                movement: Movement.still({
                    x: 75,
                    y: 75
                }),
                life: this.getTime(6),
                delay: 0
            })],
            [2, Pattern.single("plain", {
                movement: Movement.still({
                    x: 150,
                    y: 150
                }),
                life: this.getTime(5),
                delay: 0
            })],
            [3, Pattern.single("plain", {
                movement: Movement.still({
                    x: 225,
                    y: 225
                }),
                life: this.getTime(4),
                delay: 0
            })],
            [4, Pattern.single("plain", {
                movement: Movement.still({
                    x: 300,
                    y: 300
                }),
                life: this.getTime(3),
                delay: 0
            })],
            [5, Pattern.single("plain", {
                movement: Movement.still({
                    x: 375,
                    y: 375
                }),
                life: this.getTime(2),
                delay: 0
            })],
            [6, Pattern.single("plain", {
                movement: Movement.still({
                    x: 450,
                    y: 450
                }),
                life: this.getTime(1),
                delay: 0
            })],
        ])*/
    }
}