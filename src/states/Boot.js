import Phaser from 'phaser';
import 'phaser-tilemap-plus';

export default class extends Phaser.State {
  init () {
    // Boot Log
    console.log('%c Boot it up! ', 'background: #222; color: #bada55');

    // Backgroundcolor Black
    this.stage.backgroundColor = '#000000';
  }

  create () {
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // scale the game 2x
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;  
    this.scale.setUserScale(3, 3);
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;

    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.setMinMax(800, 600, 2000, 1800);


    // enable crisp rendering
    this.game.renderer.renderSession.roundPixels = true;  
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    this.game.plugins.add(Phaser.Plugin.TilemapPlus);

    // Start Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Init Gamepads
    this.input.gamepad.start();

    // Enable Pixel Rendering
    this.stage.smoothed = false;

    // Start the Preload State
    this.state.start('Preload');
  }
}
