const config = {
    type: Phaser.WEBGL,
    width: 900,
    height: 600,
    resolution: window.devicePixelRatio,
    backgroundColor: "#000",
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 },
            enableBody: true,
        }
    },
    /*
    fps: {
      target: 60,
      forceSetTimeOut: true,
    },
    */
    /*
     plugins: {
       global: [
         { key: "BulletPlugin", plugin: BulletPlugin, start: true},
         { key: "PulsarBulletPlugin", plugin: PulsarBulletPlugin, start: true},
         { key: "StarBulletPlugin", plugin: StarBulletPlugin, start: true},
         { key: "BeamPlugin", plugin: BeamPlugin, start: true},
         { key: "ScreenTextPlugin", plugin: ScreenTextPlugin, start: true},
         { key: "CircleWarningPlugin", plugin: CircleWarningPlugin, start: true },
         { key: "LineWarningPlugin", plugin: LineWarningPlugin, start: true },
       ],
     },
     
     scene: [
       MainMenu,
       LevelSelect,
       GameOver,
       Cleared,
       Options,
       Pause,
       
       BPMRT,
       
       Glow,
       
       // story 1
       LostMemory,
       Magicatz,
       Altale,
       Kronos,
       Reprologue,
       CyberMeteoroid,
     ],
     */
    scene: [
        MainMenu
    ]
};


//console.clear();
const g = new Phaser.Game(config);
