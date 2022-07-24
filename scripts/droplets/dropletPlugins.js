// Droplets

class DropletPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject("droplet", this.createDroplet);
    }
  
    createDroplet(args) {
        return this.displayList.add(
            new Droplet(this.scene, this.scene.getTime(), args)
        );
    }
}



// Warnings

class CircleWarningPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject("circleWarning", this.createWarning);
    }
  
    createWarning(args) {
        return this.displayList.add(
            new CircleWarning(this.scene, args)
        );
    }
}