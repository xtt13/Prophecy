import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.State {
  init () {
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    // Load Sprites
    this.load.image('loaderBg', './assets/sprites/loader-bg.png');
    this.load.image('loaderBar', './assets/sprites/loader-bar.png');
    this.load.image('mushroom', 'assets/sprites/mushroom2.png');

    // Load Maps

    // Load Music

    // Load Sounds

    // Load Spritesheets

    // Load Tilesets

    // Load Videos

    // Load Fonts
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    });
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Game');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }
}
