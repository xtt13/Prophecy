import Phaser from 'phaser';
import Musicplayer from '../prefabs/audio/Musicplayer';
import Soundmanager from '../prefabs/audio/Soundmanager';

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
					end: 0.2,
					loop: false
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
					loop: false
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
					loop: false
				},
				gravel2: {
					start: 4.625,
					end: 5.25,
					loop: false
				},
				gravel3: {
					start: 5.25,
					end: 5.67,
					loop: false
				}
			}
		};
	}

	preload() {

		this.text = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2, 'font', '', 20);
		this.text.anchor.set(0.5);
		this.text.tint = 0xffffff;
		this.text.text = '';
		// this.text.scale.set(0.26);


		// var style = { font: "10px Pixeled", fill: "#49ffc5", align: "center", wordWrap: "break-word"};
		// this.text = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2, "", style);
		// this.text.anchor.set(0.5);
		// this.text.padding.set(10, 16);
		// // this.text.lineSpacing = 20;
		// // this.text.padding.set(40, 40);
		// console.log(this.text);

		// this.game.canvas.oncontextmenu = function (e) {
		// 	e.preventDefault();
		// };


		this.graphics = game.add.graphics(this.game.camera.width / 2, this.game.camera.height / 2);
		this.graphics.lineStyle(8, 0x49ffc5);
		this.graphics.scale.setTo(0.5);


		// Lucy
		this.load.image('lucy', 'assets/sprites/lucy/lucy.png');
		this.load.spritesheet('lucyShadow', 'assets/sprites/lucy/lucyShadow.png', 20, 9);
		

		// Endboss
		this.load.image('endBoss', 'assets/sprites/endboss/endBoss.png');
		this.load.image('endBossHead', 'assets/sprites/endboss/endBossHead.png');
		this.load.image('endBossHeadShadow', 'assets/sprites/endboss/endBossHeadShadow.png');
		this.load.image('endBossNeck', 'assets/sprites/endboss/endBossNeck.png');
		this.load.image('endBossClaw1', 'assets/sprites/endboss/endBossClaw1.png');
		this.load.image('endBossClaw2', 'assets/sprites/endboss/endBossClaw2.png');
			

		// LockGame Sprites
		this.load.image('LockGameRing', 'assets/sprites/lockgame/LockGameRing.png');
		this.load.image('LockGameBar', 'assets/sprites/lockgame/LockGameBar.png');
		this.load.image('LockGameBall', 'assets/sprites/lockgame/LockGameBall.png');

		// Load Maps
		this.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map3', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map4', 'assets/maps/map4.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map5', 'assets/maps/map5.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map6', 'assets/maps/map6.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map7', 'assets/maps/map7.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map8', 'assets/maps/map8.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map9', 'assets/maps/map9.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map10', 'assets/maps/map10.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map11', 'assets/maps/map11.json', null, Phaser.Tilemap.TILED_JSON);


		// Load Music
		this.load.audio('MainTitle', 'assets/music/MainTitle.mp3');


		// Load Sounds
		this.load.audio('AtmoWindRain', 'assets/sounds/AtmoWindRain.mp3');
		this.load.audio('startGame', 'assets/sounds/startGame.mp3');
		this.load.audio('AxWaterfall', 'assets/sounds/AxWaterfall.mp3');
		this.load.audio('AtmoWaterStill', 'assets/sounds/AtmoWaterStill.mp3');
		this.load.audio('achivement', 'assets/sounds/achivement.mp3');
		this.load.audio('sfxBridge', 'assets/sounds/sfxBridge.mp3');
		this.load.audio('sfxPickUp', 'assets/sounds/sfxPickUp.mp3');
		this.load.audio('sfxfalldown', 'assets/sounds/sfxfalldown.mp3');
		this.load.audio('sfxfalldown', 'assets/sounds/sfxfalldown.mp3');
		this.load.audio('sfxstonedoor', 'assets/sounds/sfxstonedoor.mp3');
		this.load.audio('sfxheartbeat', 'assets/sounds/sfxheartbeat.mp3');
		this.load.audio('sfxletters', 'assets/sounds/sfxletters.mp3');
		this.load.audio('sfxBossReverb', 'assets/sounds/sfxBossReverb.mp3');


		// Load AudioSpriteSheets
		this.load.audiosprite('AxThunderstrike', 'assets/sounds/AxThunderstrike.mp3', null, this.AxThunderstrikeJSON);
		this.load.audiosprite('PxFootsteps', 'assets/sounds/PxFootsteps.mp3', null, this.pxFootstepsJSON);


		// Particles
		this.load.image('rain', 'assets/sprites/particles/rain.png');
		this.load.image('snow', 'assets/sprites/particles/snow.png');
		this.load.image('fly', 'assets/sprites/particles/fly.png');
		this.load.image('waterdrop', 'assets/sprites/particles/waterdrop.png');
		this.load.image('glimmerParticle', 'assets/sprites/particles/glimmerParticle.png');
		this.load.image('particle', 'assets/sprites/particles/particle.png');
		this.load.image('particleStart', 'assets/sprites/particles/particleStart.png');
		this.load.image('leave', 'assets/sprites/particles/leave.png');
		this.load.image('blackParticle', 'assets/sprites/particles/blackParticle.png');
		this.load.image('cyanParticle', 'assets/sprites/particles/cyanParticle.png');
		this.load.image('blood', 'assets/sprites/particles/blood.png');
		this.load.image('bloodHeart', 'assets/sprites/particles/bloodHeart.png');
		this.load.image('bulletParticle', 'assets/sprites/particles/bulletParticle.png');
		this.load.image('bulletBeam', 'assets/sprites/particles/bulletBeam.png');
		this.load.spritesheet('treeleaves', 'assets/sprites/particles/treeleaves.png', 3, 3);
		this.load.spritesheet('fireSpritesheet', 'assets/sprites/particles/fireSpritesheet.png', 1, 1);
		this.load.spritesheet('sparklingSpritesheet', 'assets/sprites/particles/sparklingSpritesheet.png', 1, 1);
		

		// Player
		this.load.spritesheet('player', 'assets/sprites/player/player.png', 55, 55);
		this.load.image('playerArm', 'assets/sprites/player/playerArm.png');
		this.load.image('invisibleAttack', 'assets/sprites/player/invisibleAttack.png');
		this.load.image('bulletPlayer', 'assets/sprites/player/bulletPlayer.png');


		// Villager		
		this.load.spritesheet('priest', 'assets/sprites/villager/priest.png', 22, 36);
		this.load.spritesheet('smith', 'assets/sprites/villager/smith.png', 31, 41);
		this.load.spritesheet('botanist', 'assets/sprites/villager/botanist.png', 25, 45);
		this.load.spritesheet('librarian', 'assets/sprites/villager/librarian.png', 16, 48);
		this.load.spritesheet('girl1', 'assets/sprites/villager/girl1.png', 14, 30);
		this.load.spritesheet('girl2', 'assets/sprites/villager/girl2.png', 15, 32);
		this.load.spritesheet('girl3', 'assets/sprites/villager/girl3.png', 15, 26);
		this.load.spritesheet('veteran', 'assets/sprites/villager/veteran.png', 34, 42);
		this.load.spritesheet('woman1', 'assets/sprites/villager/woman1.png', 13, 32);
		this.load.spritesheet('woman2', 'assets/sprites/villager/woman2.png', 17, 37);


		// Enemies
		this.load.spritesheet('enemy', 'assets/sprites/enemies/enemy.png', 18, 18);
		this.load.spritesheet('enemyPartsSpritesheet', 'assets/sprites/enemies/enemyPartsSpritesheet.png', 16, 16);
		this.load.image('rock', 'assets/sprites/enemies/rock.png');
		this.load.image('bulletRock', 'assets/sprites/enemies/bulletRock.png');
		this.load.image('sprout', 'assets/sprites/enemies/sprout.png');
			

		// Doors
		this.load.spritesheet('templeDoor', 'assets/sprites/doors/templeDoor.png', 72, 108);
		this.load.spritesheet('bossDoor', 'assets/sprites/doors/bossDoor.png', 96, 128);


		// Items
		this.load.spritesheet('item', 'assets/sprites/items/testitem.png', 25, 27);
		this.load.spritesheet('potion', 'assets/sprites/items/potion.png', 32, 32);


		// Load Tilesets
		this.load.image('tileset', 'assets/tilesets/tileset.png');
		this.load.image('Clouds', 'assets/tilesets/Clouds.png');
		this.load.image('Godrays', 'assets/tilesets/godrays.png');


		// Load Videos


		// Load Mobile Control
		this.load.atlas('dpad', 'assets/input/dpad.png', 'assets/input/dpad.json');
		this.load.atlas('generic', 'assets/input/generic-joystick.png', 'assets/input/generic-joystick.json');


		// GameButtons
		this.load.spritesheet('mapButton', 'assets/input/mapButton.png', 60, 20);
		this.load.spritesheet('questButton', 'assets/input/questButton.png', 60, 20);
		this.load.spritesheet('optionsButton', 'assets/input/optionsButton.png', 60, 20);
		this.load.spritesheet('muteMusicButton', 'assets/input/muteMusicButton.png', 90, 20);
		this.load.spritesheet('muteSoundButton', 'assets/input/muteSoundButton.png', 90, 20);


		// Load Weather Sprites
		this.load.image('cloud', 'assets/sprites/cloud.png');


		// Load GUI
		this.load.image('heart', 'assets/sprites/gui/heart.png');
		this.load.image('dashBar', 'assets/sprites/gui/dashBar.png');
		this.load.image('newGameMap', 'assets/sprites/gui/newGameMap.png');
		// this.load.image('cursor', 'assets/sprites/gui/cursor.png');


		// Other
		this.load.image('island', 'assets/sprites/island.png');
		this.load.image('branch', 'assets/sprites/branch.png');
		this.load.spritesheet('chest', 'assets/sprites/chest.png', 17, 15);


		// Load Fonts
		// this.load.bitmapFont('pxlfont', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		this.load.bitmapFont('pxlfont', 'assets/fonts/prophecy.png', 'assets/fonts/prophecy.fnt');
		this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia-black.png', 'assets/fonts/minecraftia.xml');
	}

	create() {
		this.game.musicPlayer = new Musicplayer(this.game);
		this.game.soundManager = new Soundmanager(this.game);

		/*eslint no-undef: */
		if (__DEV__) {
			this.state.start('Game', true, false);
		} else {
			this.state.start('DeltaStorm', true, false);
		}
	}

	render() {}

	loadUpdate() {
		// Log Loadingprogress
		this.loadingprogress = this.load.onFileComplete.add(progress => {
			if (typeof ipc == 'undefined') {
				this.text.text = progress;

				// this.graphics.clear();
				// this.graphics = game.add.graphics(this.text.x + 3, this.text.y + 5);
				// this.graphics.lineStyle(1, 0x49ffc5, 1);
				// this.graphics.scale.setTo(9);

				// var newValue = parseInt((progress/10)/2);

				// this.graphics.arc(0, 0, 3, -1.6, newValue, false);

			}

			console.log('%c Loadingprogress: ' + progress + ' % ', 'background: #222; color: #49ffc5');
		});
	}
}