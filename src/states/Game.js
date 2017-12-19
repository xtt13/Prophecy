/* globals __DEV__ */
import Phaser from 'phaser';
import Level from '../prefabs/Level';

export default class extends Phaser.State {
  init (inputClass) {
    this.inputClass = inputClass
  }

  create () {
    // Toggle Fullscreen onclick
    this.input.onDown.add(this.toggleFullScreen, this);

    // Später mit unique Tileset auf JSON verknüpfen
    this.level = new Level(this.game, this.inputClass, 'map1');

  }

  update(){
    this.inputClass.update();
    this.level.update();
  }

  render () {
    // Debugging
    if (__DEV__) {
      //this.game.debug.body(this.level.player, 32, 32);    
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
  }

  toggleFullScreen(){
    this.game.scale.startFullScreen(false);
  }
}
