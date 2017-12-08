import Phaser from 'phaser';

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9';
  }

  create () {
      this.state.start('Preload');
  }
}
