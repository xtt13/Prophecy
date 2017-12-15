import Phaser from 'phaser';

export default class extends Phaser.State {
  init () {
    // Boot Log
    console.log('%c Boot it up! ', 'background: #222; color: #bada55');

    // Backgroundcolor Black
    this.stage.backgroundColor = '#000000';
  }

  create () {

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
