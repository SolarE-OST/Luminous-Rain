class CircleWarning extends Phaser.GameObjects.PointLight {
    constructor(scene, {x, y, r = 4, length, delay=0, fadeOut=false, fadeTime=1, alpha=0.5}) {
      super(scene, x, y, 0xff0000, r, 0.4);
      this.alpha = 0
      this.length = 0;
      this.fullLength = length;
      this.fadeTime = fadeTime;
      this.maxAlpha = alpha;
      this.delay = delay;
      this.visible = false;
      this.readyDelete = false;
      this.fadeOut = fadeOut;
    }
    
    move(ff=1) {
      if (this.delay <= 0 && this.length < this.fullLength) {
        this.visible = true;
        if (this.fullLength * this.fadeTime > this.length) {
          this.setAlpha(this.length / (this.fullLength * this.fadeTime) * this.maxAlpha); 
        } else if (this.fadeOut && this.fullLength * (1 - this.fadeTime) < this.length) {
          this.setAlpha((this.fullLength - this.length) / (this.fullLength * this.fadeTime) * this.maxAlpha);
        } else {
          this.setAlpha(this.maxAlpha);
        }
        this.length += ff;
      } else {
        if (this.length >= this.fullLength) {
            this.readyDelete = true;
        }
        this.visible = false;
        this.delay -= ff;
      }
    }
  }