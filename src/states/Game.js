/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../prefabs/Mushroom';
import Level from '../prefabs/Level';

export default class extends Phaser.State {
  init () {

  }

  create () {
    this.level = new Level(this.game, 'testlevel');
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }
}
