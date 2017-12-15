import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Input from '../prefabs/Input';

export default class extends Phaser.State {
  init (){
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload (){
    // Load Sprites
    this.load.image('loaderBg', 'assets/sprites/loader-bg.png');
    this.load.image('loaderBar', 'assets/sprites/loader-bar.png');
    //this.load.image('mushroom', 'assets/sprites/mushroom2.png');

    //this.load.image('player', 'assets/sprites/player.png');

    // Load Maps
    this.load.tilemap('testlevel', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Music

    // Load Sounds

    // Load Spritesheets
    this.load.spritesheet('player', 'assets/sprites/player.png', 46, 46);

    // Load Tilesets
    this.load.image('gameTileset', 'assets/tilesets/sum.png');
    this.load.image('gameTileset2', 'assets/tilesets/testtileset.png');

    // Load Videos

    // Load Fonts
    // WebFont.load({
    //   google: {
    //     families: ['Bangers']
    //   },
    //   active: this.fontsLoaded
    // });
  }

  create(){

    this.state.start('Game', true, false, this.inputClass);
  }

  render (){
    if (this.fontsReady) {
      this.state.start('Game');
    }
  }

  fontsLoaded (){
    this.fontsReady = true;
  }

  loadUpdate(){
    // Log Loadingprogress
    this.loadingprogress = this.load.onFileComplete.add(function( progress ) {
      console.log("%c Loadingprogress: " + progress + " % ", "background: #222; color: #bada55");
    });
  }

}
