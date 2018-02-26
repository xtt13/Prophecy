import Phaser from 'phaser';
import WebFont from 'webfontloader';
import Input from '../prefabs/Input';
import Musicplayer from '../prefabs/Musicplayer';
import Soundmanager from '../prefabs/Soundmanager';

export default class extends Phaser.State {
	init() {
		this.AxThunderstrikeJSON = {
			spritemap: {
				hit1: {
					start: 1,
					end: 4,
					loop: false
				},
				hit2: {
					start: 4,
					end: 8,
					loop: false
				},
				hit3: {
					start: 8,
					end: 12,
					loop: false
				},
				hit4: {
					start: 12,
					end: 16,
					loop: false
				},
				hit5: {
					start: 16,
					end: 20,
					loop: false
				}
			}
		};

		this.pxFootstepsJSON = {
			spritemap: {
				grass1: {
					start: 0,
					end: 0.15,
					loop: true
				},
				grass2: {
					start: 0.625,
					end: 1.25,
					loop: false
				},
				grass3: {
					start: 1.25,
					end: 1.875,
					loop: false
				},
				hard1: {
					start: 2,
					end: 2.15,
					loop: true
				},
				hard2: {
					start: 2.625,
					end: 3.25,
					loop: false
				},
				hard3: {
					start: 3.25,
					end: 3.875,
					loop: false
				},
				gravel1: {
					start: 4,
					end: 4.3,
					loop: true
				},
				gravel2: {
					start: 4.625,
					end: 5.25,
					loop: false
				},
				gravel3: {
					start: 5.25,
					end: 5.67,
					loop: true
				}
			}
		};
	}

	preload() {
		// this.stage.backgroundColor = "#000000";

		this.text = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2, 'font', '', 20);
		this.text.anchor.set(0.5);
		this.text.tint = 0xffffff;
		this.text.text = '';
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
		this.load.audio('MainTitle', 'assets/music/MainTitle.mp3');

		// Load Sounds
		this.load.audio('AtmoWindRain', 'assets/sounds/AtmoWindRain.mp3');
		this.load.audio('startGame', 'assets/sounds/startGame.mp3');
		this.load.audio('AxWaterfall', 'assets/sounds/AxWaterfall.mp3');
		this.load.audio('AxOpenPlain', 'assets/sounds/AxOpenPlain.mp3');
		this.load.audio('achivement', 'assets/sounds/achivement.mp3');

		// this.load.audio('AtmoWaterStill', 'assets/sounds/AtmoWaterStill.mp3');

		// Load AudioSpriteSheets
		this.load.audiosprite('AxThunderstrike', 'assets/sounds/AxThunderstrike.mp3', null, this.AxThunderstrikeJSON);
		this.load.audiosprite('PxFootsteps', 'assets/sounds/PxFootsteps.mp3', null, this.pxFootstepsJSON);

		// Load Spritesheets
		// this.load.spritesheet('player', 'assets/sprites/player.png', 46, 46);
		this.load.spritesheet('player', 'assets/sprites/player.png', 42, 42);
		this.load.spritesheet('testman', 'assets/sprites/testman.png', 46, 46);
		this.load.spritesheet('priest', 'assets/sprites/priest.png', 41, 41);
		this.load.spritesheet('enemy', 'assets/sprites/enemy.png', 18, 18);
		this.load.spritesheet('item', 'assets/sprites/testitem.png', 25, 27);
		this.load.spritesheet('treeleaves', 'assets/sprites/treeleaves.png', 3, 3);

		this.load.spritesheet('templeDoor', 'assets/sprites/templeDoor.png', 72, 108);

		// Load Tilesets
		this.load.image('gameTileset2', 'assets/tilesets/testtileset.png');
		this.load.image('Clouds', 'assets/tilesets/Clouds.png');

		// Load GameMaps
		this.load.image('newGameMap', 'assets/sprites/newGameMap.png');

		// Load Videos

		// Load Mobile Controll
		this.load.atlas('dpad', 'assets/input/dpad.png', 'assets/input/dpad.json');
		this.load.atlas('generic', 'assets/input/generic-joystick.png', 'assets/input/generic-joystick.json');

		// GameButtons
		this.load.spritesheet('mapButton', 'assets/input/mapButton.png', 60, 20);
		this.load.spritesheet('questButton', 'assets/input/questButton.png', 60, 20);
		this.load.spritesheet('optionsButton', 'assets/input/optionsButton.png', 60, 20);
		this.load.spritesheet('muteMusicButton', 'assets/input/muteMusicButton.png', 90, 20);
		this.load.spritesheet('muteSoundButton', 'assets/input/muteSoundButton.png', 90, 20);

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

		if (__DEV__) {
			this.state.start('Game', true, false);
		} else {
			this.state.start('MainMenu', true, false);
		}
	}

	render() {}

	loadUpdate() {
		// Log Loadingprogress
		this.loadingprogress = this.load.onFileComplete.add(progress => {
			if (typeof ipc == 'undefined') {
				this.text.text = progress + '%';
			}
			
			console.log('%c Loadingprogress: ' + progress + ' % ', 'background: #222; color: #bada55');
		});
	}
}
