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

    //this.load.image('player', 'assets/sprites/player.png');

    // Load Maps
    this.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Music

    // Load Sounds

    // Load Spritesheets
    this.load.spritesheet('player', 'assets/sprites/player.png', 46, 46);
    this.load.spritesheet('testman', 'assets/sprites/testman.png', 46, 46);
    this.load.spritesheet('enemy', 'assets/sprites/enemy.png', 18, 18);

    // Load Tilesets
    this.load.image('gameTileset2', 'assets/tilesets/testtileset.png');

    // Load Videos

    // Load Weather Sprites
    this.load.image('rain', 'assets/sprites/rain.png');
    this.load.image('snow', 'assets/sprites/snow.png');

    // Load Fonts
    this.game.load.bitmapFont('pxlfont', 'assets/fonts/font.png', 'assets/fonts/font.xml');

    // WebFont.load({
    //   google: {
    //     families: ['Bangers']
    //   },
    //   active: this.fontsLoaded
    // });
  }

  create(){

      // Check for XBOX or PS Controller
    this.inputClass = new Input(this.game);

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
