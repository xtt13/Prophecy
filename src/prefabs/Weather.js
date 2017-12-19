import Phaser from 'phaser';
import config from './../config';

export default class {
  constructor (game, type) {

    this.game = game;

    if(config.weather){
      this.createWeather(type);
    }
  }

  createWeather(type){
    switch(type) {
    case 'Snow':
        this.addSnow();
        break;

    case 'Storm':
        this.addStorm();
        break;
        
    default:
        
    }
  }

  addSnow(){

  }

  addStorm(){
      let emitter = this.game.add.emitter(this.game.world.centerX - 200, 0, 400);
      emitter.fixedToCamera = true;
      emitter.width = this.game.world.width;
      emitter.angle = -30;
      emitter.makeParticles('rain');
      emitter.minParticleScale = 0.1;
      emitter.maxParticleScale = 0.7;
      emitter.setYSpeed(900, 2000);
      emitter.setXSpeed(-5, 5);
      emitter.minRotation = 0;
      emitter.maxRotation = 0;

      emitter.start(false, 1000, 1, 0);

      this.lightningBitmap = this.game.add.bitmapData(window.innerWidth, window.innerHeight + 500);   
      this.lightning = this.game.add.image(this.game.camera.width/2, 0, this.lightningBitmap);
      this.lightning.anchor.setTo(0.5, 0.5); 

      this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.zap, this);

  }

  zap(){
      this.lightningBitmap.x = this.game.camera.x;
      this.lightningBitmap.y = this.game.camera.y;
      this.lightning.x = this.game.camera.x;
      this.lightning.y = this.game.camera.y;

      this.createLightningTexture(this.game.rnd.integerInRange(this.game.camera.x, this.game.camera.x + this.game.camera.width), 0, 45, 3, false);

      this.lightning.alpha = 1;

      this.game.add.tween(this.lightning)
          .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
          .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
          .start();

      this.game.camera.flash(0xFFFFFF, 200);
      this.game.camera.shake(0.005, 500);

  }

  createLightningTexture(x, y, segments, boltWidth, branch){
        let ctx = this.lightningBitmap.context;
        let width = this.lightningBitmap.width;
        let height = this.lightningBitmap.height;

        if (!branch) ctx.clearRect(0, 0, width, height);

        for(var i = 0; i < segments; i++) {

            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = boltWidth;

            ctx.beginPath();
            ctx.moveTo(x, y);

            if (branch) {
                x += this.game.rnd.integerInRange(-10, 10);
            } else {
                x += this.game.rnd.integerInRange(-30, 30);
            }
            if (x <= 10) x = 10;
            if (x >= width-10) x = width-10;

            if (branch) {
                y += this.game.rnd.integerInRange(10, 20);
            } else {
                y += this.game.rnd.integerInRange(20, height/segments);
            }
            if ((!branch && i == segments - 1) || y > height) {
                y = height;
            }

            ctx.lineTo(x, y);
            ctx.stroke();

            if (y >= height) break;

            if (!branch) {
                if (Math.random() * 100 <= 20) {
                    this.createLightningTexture(x, y, 10, 1, true);
                }
            }
        }

        this.lightningBitmap.dirty = true;
  }

  updateWeather(){

  }
}
