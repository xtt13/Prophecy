import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Input from '../prefabs/Input';
import Musicplayer from '../prefabs/Musicplayer';
import Soundmanager from '../prefabs/Soundmanager';

export default class extends Phaser.State {
	init() {}

	preload() {
		// this.stage.backgroundColor = "#000000";

		// this.text = this.game.add.bitmapText(300, 300, 'pxlfont', '', 51);
		// this.text.anchor.set(0.5);
		// this.text.tint = 0xFFFFFF;
		// this.text.text = 'Loading';
		// this.text.scale.set(0.26);

		// Load Sprites

		//this.load.image('player', 'assets/sprites/player.png');
		// this.load.image('tileSpriteClouds', 'assets/sprites/tilespriteClouds3xblur.png');

		this.load.image('LockGameRing', 'assets/sprites/LockGameRing.png');
		this.load.image('LockGameBar', 'assets/sprites/LockGameBar.png');
		this.load.image('LockGameBall', 'assets/sprites/LockGameBall.png');

		// Load Maps
		this.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map3', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map4', 'assets/maps/map4.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map5', 'assets/maps/map5.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map6', 'assets/maps/map6.json', null, Phaser.Tilemap.TILED_JSON);

		// Load Music
		this.load.audio('LostMerged', 'assets/music/LostMerged.mp3');

		// Load Sounds
		this.load.audio('AtmoWindRain', 'assets/sounds/AtmoWindRain.mp3');
		
		// this.load.audio('AtmoWaterStill', 'assets/sounds/AtmoWaterStill.mp3');

		this.load.audio('ThunderNear1', 'assets/sounds/ThunderNear1.mp3');
		this.load.audio('ThunderNear2', 'assets/sounds/ThunderNear2.mp3');
		this.load.audio('ThunderNear3', 'assets/sounds/ThunderNear3.mp3');
		this.load.audio('ThunderNear4', 'assets/sounds/ThunderNear4.mp3');
		this.load.audio('ThunderNear5', 'assets/sounds/ThunderNear5.mp3');

		// Load Spritesheets
		// this.load.spritesheet('player', 'assets/sprites/player.png', 46, 46);
		this.load.spritesheet('player', 'assets/sprites/playerIdle.png', 42, 42);
		this.load.spritesheet('testman', 'assets/sprites/testman.png', 46, 46);
		this.load.spritesheet('priest', 'assets/sprites/priest.png', 41, 41);
		this.load.spritesheet('enemy', 'assets/sprites/enemy.png', 18, 18);
		this.load.spritesheet('item', 'assets/sprites/testitem.png', 25, 27);

		this.load.spritesheet('templeDoor', 'assets/sprites/templeDoor.png', 72, 108);

		// Load Tilesets
		this.load.image('gameTileset2', 'assets/tilesets/testtileset.png');
		this.load.image('Clouds', 'assets/tilesets/Clouds.png');

		// Load Videos

		// Load Mobile Controll
		this.load.atlas('dpad', 'assets/input/dpad.png', 'assets/input/dpad.json');
		this.load.atlas('generic', 'assets/input/generic-joystick.png', 'assets/input/generic-joystick.json');

		// Load Weather Sprites
		this.load.image('rain', 'assets/sprites/rain.png');
		this.load.image('snow', 'assets/sprites/snow.png');
		this.load.image('fly', 'assets/sprites/fly.png');
		this.load.image('glimmerParticle', 'assets/sprites/glimmerParticle.png');
		this.load.image('leave', 'assets/sprites/leave.png');
		this.load.image('cloud', 'assets/sprites/cloud.png');

		// Load Fonts
		// this.load.bitmapFont('pxlfont', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		this.load.bitmapFont('pxlfont', 'assets/fonts/prophecy.png', 'assets/fonts/prophecy.fnt');
	}

	create() {
		this.game.musicPlayer = new Musicplayer(this.game);
		this.game.soundManager = new Soundmanager(this.game);

		this.state.start('Game', true, false);
	}

	render() {}

	loadUpdate() {
		// Log Loadingprogress
		this.loadingprogress = this.load.onFileComplete.add(progress => {
			// this.text.text = progress;
			console.log('%c Loadingprogress: ' + progress + ' % ', 'background: #222; color: #bada55');
		});
	}
}
