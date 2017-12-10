/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../prefabs/Mushroom';
import Level from '../prefabs/Level';

export default class extends Phaser.State {
  init () {

  }

  create () {
    // Toggle Fullscreen onclick
    this.input.onDown.add(this.toggleFullScreen, this);

    this.level = new Level(this.game, 'testlevel');
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }

  toggleFullScreen(){
    this.game.scale.startFullScreen(false);
  }
}
