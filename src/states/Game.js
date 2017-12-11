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

  update(){
    this.level.update();
  }

  render () {
    // Debugging
    if (__DEV__) {

    }
  }

  toggleFullScreen(){
    this.game.scale.startFullScreen(false);
  }
}
