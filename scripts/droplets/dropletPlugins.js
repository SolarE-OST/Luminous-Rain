class DropletPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
      super(pluginManager);
      pluginManager.registerGameObject("droplet", this.createDroplet);
    }
  
    createDroplet(args) {
      return this.displayList.add(
        new Droplet(this.scene, args)
      );
    }
  }