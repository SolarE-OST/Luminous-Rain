class LostMemory extends Stage {
    constructor() {
        super("Lost Memory");
        this.title = "Lost Memory";
        this.composer = "Sakuzyo";
        this.subtitle = "Forest of Reflection";
        this.difficulty = 3;
        this.tempo = 180;
        this.offset = -80;
        this.timeSignature = 6;
        //this.songPath = "music/chapter1/LostMemory.mp3";
        this.songPath = "music/chapter1/Altale.mp3";
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
            [],
            [
                [1, Pattern.explode({x: 200, y: 300, grav: 0.01})],
                [4, Pattern.explode({x: 400, y: 300, grav: 0.01})],
            ],
            [
                [1, Pattern.explode({x: 150, y: 200, grav: 0.01})],
                [4, Pattern.explode({x: 300, y: 200, grav: 0.01})],
            ],
            [
                [1, Pattern.explode({x: 200, y: 100, grav: 0.01, other: {color: 0xff0000}})],
                [4, Pattern.explode({x: 400, y: 100, grav: 0.01, other: {color: 0xff0000}})],
            ],
            
            [
                [1, Pattern.single("plain", {
                    r: 10,
                    color: 0x8000ff,
                    movement: Movement.kinematic({
                        x: 0,
                        y: 600,
                        vx: 3,
                        vy: -6,
                        ay: 0.05
                    }),
                    life: 300,
                    trail: Trail.falling({
                        length: 50,
                        separation: 10,
                    }),
                })]
            ]
        ];
    }
}