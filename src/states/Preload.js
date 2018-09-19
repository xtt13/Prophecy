import Phaser from 'phaser';
import Musicplayer from '../prefabs/audio/Musicplayer';
import Soundmanager from '../prefabs/audio/Soundmanager';
import config from '../config.js';


export default class extends Phaser.State {
	init() {
		

		this.sfxswordmulti = {
			spritemap: {
				vx1: {
					start: 0,
					end: 1,
					loop: false
				},
				vx2: {
					start: 1,
					end: 2,
					loop: false
				},
				vx3: {
					start: 2,
					end: 3,
					loop: false
				},
				vx4: {
					start: 3,
					end: 4,
					loop: false
				},
				vx5: {
					start: 4,
					end: 5,
					loop: false
				},
				vx6: {
					start: 5,
					end: 6,
					loop: false
				},
				vx7: {
					start: 6,
					end: 7,
					loop: false
				},
				vx8: {
					start: 7,
					end: 8,
					loop: false
				},
				vx9: {
					start: 8,
					end: 9,
					loop: false
				},
				vx10: {
					start: 9,
					end: 10,
					loop: false
				},
				death1: {
					start: 10,
					end: 12,
					loop: false
				},
				death2: {
					start: 12,
					end: 14,
					loop: false
				},
				death3: {
					start: 14,
					end: 16,
					loop: false
				},
				death4: {
					start: 16,
					end: 18,
					loop: false
				},

				cut1:{
					start: 18,
					end: 19,
					loop: false
				},
				cut2:{
					start: 19,
					end: 20,
					loop: false
				},
				reflect1:{
					start: 20,
					end: 21,
					loop: false
				},
				reflect2:{
					start: 21,
					end: 22,
					loop: false
				},
			}
		};



		this.VxBotanic = {
			spritemap: {
				vx1: {
					start: 0,
					end: 2,
					loop: false
				},
				vx2: {
					start: 2,
					end: 4,
					loop: false
				},
				vx3: {
					start: 4,
					end: 6,
					loop: false
				},
				vx4: {
					start: 6,
					end: 8,
					loop: false
				},
				vx5: {
					start: 8,
					end: 10,
					loop: false
				}
			}
		};

		this.VxSeeds = {
			spritemap: {
				vx1: {
					start: 0,
					end: 2,
					loop: false
				},
				vx2: {
					start: 2,
					end: 4,
					loop: false
				},
				vx3: {
					start: 4,
					end: 6,
					loop: false
				},
				vx4: {
					start: 6,
					end: 8,
					loop: false
				},
				vx5: {
					start: 8,
					end: 10,
					loop: false
				},
				vx6: {
					start: 10,
					end: 12,
					loop: false
				},
				vx7: {
					start: 12,
					end: 14,
					loop: false
				},
				vx8: {
					start: 14,
					end: 16,
					loop: false
				},
				vx9: {
					start: 16,
					end: 18,
					loop: false
				},
				vx10: {
					start: 18,
					end: 20,
					loop: false
				},
				vx11: {
					start: 20,
					end: 22,
					loop: false
				},
				vx12: {
					start: 22,
					end: 24,
					loop: false
				},
				vx13: {
					start: 24,
					end: 26,
					loop: false
				},
				vx14: {
					start: 26,
					end: 28,
					loop: false
				},
				vx15: {
					start: 28,
					end: 29,
					loop: false
				}
			}
		};

		this.VxSmith = {
			spritemap: {
				vx1: {
					start: 0,
					end: 1,
					loop: false
				},
				vx2: {
					start: 1,
					end: 2,
					loop: false
				},
				vx3: {
					start: 2,
					end: 3,
					loop: false
				},
				vx4: {
					start: 3,
					end: 4,
					loop: false
				},
				vx5: {
					start: 4,
					end: 5,
					loop: false
				}
			}
		};

		this.VxOracleJSON = {
			spritemap: {
				vx1: {
					start: 0,
					end: 3,
					loop: false
				},
				vx2: {
					start: 3,
					end: 6,
					loop: false
				},
				vx3: {
					start: 6,
					end: 9,
					loop: false
				},
				vx4: {
					start: 9,
					end: 12,
					loop: false
				},
				vx5: {
					start: 12,
					end: 15,
					loop: false
				},
				vx6: {
					start: 15,
					end: 18,
					loop: false
				},
				vx7: {
					start: 18,
					end: 21,
					loop: false
				},
				vx8: {
					start: 22,
					end: 25,
					loop: false
				},
				vx9: {
					start: 25,
					end: 28,
					loop: false
				},
				vx10: {
					start: 28,
					end: 33,
					loop: false
				}
			}
		};

		this.VxPriest = {
			spritemap: {
				vx1: {
					start: 0,
					end: 2,
					loop: false
				},
				vx2: {
					start: 2,
					end: 4,
					loop: false
				},
				vx3: {
					start: 4,
					end: 6,
					loop: false
				}
			}
		};

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

		this.sfxUIJSON = {
			spritemap: {
				openMenu: {
					start: 0,
					end: 1,
					loop: false
				},
				UI1: {
					start: 1,
					end: 2,
					loop: false
				},
				UI2: {
					start: 2,
					end: 3,
					loop: false
				}
			}
		};

		this.sfxChestJSON = {
			spritemap: {
				open: {
					start: 0,
					end: 1,
					loop: false
				},
				close: {
					start: 1,
					end: 3,
					loop: false
				}
			}
		};

		this.sfxLockPickJSON = {
			spritemap: {
				win: {
					start: 0,
					end: 1,
					loop: false
				},
				break: {
					start: 1,
					end: 2,
					loop: false
				},
				roll: {
					start: 2,
					end: 6,
					loop: false					
				}
			}
		};

		this.sfxBirdsJSON = {
			spritemap: {
				flyAway: {
					start: 0,
					end: 4,
					loop: false
				},
				twitter1: {
					start: 4,
					end: 5,
					loop: false
				},
				twitter2: {
					start: 5,
					end: 6,
					loop: false
				},
				twitter3: {
					start: 6,
					end: 7,
					loop: false
				},
				twitter4: {
					start: 7,
					end: 8,
					loop: false
				},
				twitter5: {
					start: 8,
					end: 9,
					loop: false
				}
			}
		};
	}

	preload() {

		this.instructions = this.game.add.image(0, 0, 'instructions');


		// this.text = this.game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        // this.text.setText(content, true, -1, 5, 'left', true)
        // this.text.fixedWidth = 200;
		this.fontImage = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, this.text);
		this.fontImage.anchor.setTo(0.5);
		// this.fontImage.fixedToCamera = true;
		this.fontImage.scale.set(2);

		this.preloadBar = this.game.add.image(172, 220, 'preloadBar');
		this.load.setPreloadSprite(this.preloadBar);


		// this.game.canvas.oncontextmenu = function (e) {
		// 	e.preventDefault();
		// };

		// this.addVillageGlimmer = this.game.add.emitter(this.game.camera.width/2, this.game.camera.height/2, 2000);
		// this.addVillageGlimmer.width = this.game.camera.width;
		// this.addVillageGlimmer.height = this.game.camera.height;
		// this.addVillageGlimmer.minParticleScale = 5;
		// this.addVillageGlimmer.gravity = 0;
		// this.addVillageGlimmer.setYSpeed(-4, 4);
		// this.addVillageGlimmer.setXSpeed(-4, 4);
		// this.addVillageGlimmer.maxRotation = 0;
		// this.addVillageGlimmer.minRotation = 0;
		// this.addVillageGlimmer.setAlpha(0, 1, 4000, Phaser.Easing.Exponential.In, true);
		// this.addVillageGlimmer.makeParticles('particle');
		// this.addVillageGlimmer.start(false, 10000, 1, 0);

		// RAIN AND GLIMMER

		// let emitter = this.game.add.emitter(-500, 0, 400);
		// emitter.fixedToCamera = true;
		// emitter.width = this.game.camera.width * 2;
		// emitter.angle = -30;
		// emitter.makeParticles('rain');
		// emitter.minParticleScale = 0.1;
		// emitter.maxParticleScale = 0.5;
		// emitter.setYSpeed(200, 310);
		// emitter.setXSpeed(-5, 5);
		// emitter.minRotation = 180;
		// emitter.maxRotation = 0;
		// emitter.gravity = 200;
		// emitter.start(false, 2500, 1, 0);

		// this.autumnGlimmerEmitter = this.game.add.emitter(-500, 0, 150);
		// this.autumnGlimmerEmitter.fixedToCamera = true;
		// this.autumnGlimmerEmitter.width = this.game.world.bounds.width;
		// this.autumnGlimmerEmitter.height = this.game.world.bounds.height;
		// this.autumnGlimmerEmitter.minParticleScale = 0.1;
		// this.autumnGlimmerEmitter.maxParticleScale = 0.5;
		// this.autumnGlimmerEmitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
		// this.autumnGlimmerEmitter.setYSpeed(300);
		// this.autumnGlimmerEmitter.setXSpeed(-300, 300);
		// this.autumnGlimmerEmitter.minParticleScale = 0.25;
		// this.autumnGlimmerEmitter.maxParticleScale = 1;
		// this.autumnGlimmerEmitter.gravity = 0.5;
		// this.autumnGlimmerEmitter.minRotation = 25;
		// this.autumnGlimmerEmitter.setAlpha(0.5, 1);
		// this.autumnGlimmerEmitter.makeParticles('glimmerParticle');
		// this.autumnGlimmerEmitter.start(false, 5000, 5, 0);


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
		this.load.tilemap('map12', 'assets/maps/map12.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map13', 'assets/maps/map13.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map14', 'assets/maps/map14.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map15', 'assets/maps/map15.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map16', 'assets/maps/map16.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map17', 'assets/maps/map17.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map18', 'assets/maps/map18.json', null, Phaser.Tilemap.TILED_JSON);


		// Load Music
		this.load.audio('MainTitle', 'assets/music/MxBeginn.mp3');


		// Load Sounds
		this.load.audio('AtmoWindRain', 'assets/sounds/AtmoWindRain.mp3');
		this.load.audio('startGame', 'assets/sounds/startGame.mp3');
		this.load.audio('AxWaterfall', 'assets/sounds/AxWaterfall.mp3');
		this.load.audio('AtmoWaterStill', 'assets/sounds/AtmoWaterStill.mp3');
		this.load.audio('achivement', 'assets/sounds/achivement.mp3');
		this.load.audio('sfxBridge', 'assets/sounds/sfxBridge.mp3');
		this.load.audio('sfxPickUp', 'assets/sounds/sfxPickUp.mp3');
		this.load.audio('sfxfalldown', 'assets/sounds/sfxfalldown.mp3');
		this.load.audio('sfxGameOver', 'assets/sounds/sfxGameOver.mp3');
		this.load.audio('sfxstonedoor', 'assets/sounds/sfxstonedoor.mp3');
		this.load.audio('sfxheartbeat', 'assets/sounds/sfxheartbeat.mp3');
		this.load.audio('sfxletters', 'assets/sounds/sfxletters.mp3');
		this.load.audio('sfxBossReverb', 'assets/sounds/sfxBossReverb.mp3');
		this.load.audio('AxBotanic', 'assets/sounds/AxBotanic.mp3');
		this.load.audio('AxEmber', 'assets/sounds/AxEmber.mp3');
		this.load.audio('sfxSword', 'assets/sounds/sfxSword.mp3');
		this.load.audio('AxForest', 'assets/sounds/AxForest.mp3');
		this.load.audio('AxCrickets', 'assets/sounds/AxCrickets.mp3');
		this.load.audio('sfxShot', 'assets/sounds/sfxShot.mp3');


		// Load AudioSpriteSheets
		this.load.audiosprite('AxThunderstrike', 'assets/sounds/AxThunderstrike.mp3', null, this.AxThunderstrikeJSON);
		this.load.audiosprite('PxFootsteps', 'assets/sounds/PxFootsteps.mp3', null, this.pxFootstepsJSON);
		this.load.audiosprite('VxSmith', 'assets/sounds/VxSmith.mp3', null, this.VxSmith);
		this.load.audiosprite('VxPriest', 'assets/sounds/VxPriest.mp3', null, this.VxPriest);
		this.load.audiosprite('VxSeeds', 'assets/sounds/vxSeeds.mp3', null, this.VxSeeds);
		this.load.audiosprite('VxBotanic', 'assets/sounds/VxBotanic.mp3', null, this.VxBotanic);
		this.load.audiosprite('sfxswordmulti', 'assets/sounds/sfxswordmulti.mp3', null, this.sfxswordmulti);
		this.load.audiosprite('sfxUI', 'assets/sounds/sfxUI.mp3', null, this.sfxUIJSON);
		this.load.audiosprite('sfxBirds', 'assets/sounds/sfxBirds.mp3', null, this.sfxBirdsJSON);this.sfxChestJSON
		this.load.audiosprite('sfxChest', 'assets/sounds/sfxChest.mp3', null, this.sfxChestJSON);
		this.load.audiosprite('sfxLockPick', 'assets/sounds/sfxLockPick.mp3', null, this.sfxLockPickJSON);
		this.load.audiosprite('VxOracle', 'assets/sounds/VxOracle.mp3', null, this.VxOracleJSON);

		// Particles
		this.load.image('particle', 'assets/sprites/particles/particle.png');
		this.load.image('rain', 'assets/sprites/particles/rain.png');
		this.load.image('snow', 'assets/sprites/particles/snow.png');
		this.load.image('fly', 'assets/sprites/particles/fly.png');
		this.load.image('waterdrop', 'assets/sprites/particles/waterdrop.png');
		this.load.image('glimmerParticle', 'assets/sprites/particles/glimmerParticle.png');
		this.load.image('particleStart', 'assets/sprites/particles/particleStart.png');
		this.load.image('leave', 'assets/sprites/particles/leave.png');
		this.load.image('blackParticle', 'assets/sprites/particles/blackParticle.png');
		this.load.image('cyanParticle', 'assets/sprites/particles/cyanParticle.png');
		this.load.image('blood', 'assets/sprites/particles/blood.png');
		this.load.image('bloodEnemy', 'assets/sprites/particles/bloodEnemy.png');
		this.load.image('bloodHeart', 'assets/sprites/particles/bloodHeart.png');
		this.load.image('bulletParticle', 'assets/sprites/particles/bulletParticle.png');
		this.load.image('fishingLineChain', 'assets/sprites/fishingLineChain.png');
		this.load.image('bulletBeam', 'assets/sprites/particles/bulletBeam.png');
		this.load.spritesheet('treeleaves', 'assets/sprites/particles/treeleaves.png', 3, 3);
		this.load.spritesheet('fireSpritesheet', 'assets/sprites/particles/fireSpritesheet.png', 1, 1);
		this.load.spritesheet('emberSpritesheet', 'assets/sprites/particles/emberSpritesheet.png', 1, 1);
		this.load.spritesheet('sparklingSpritesheet', 'assets/sprites/particles/sparklingSpritesheet.png', 1, 1);
		
		

		// Player
		this.load.spritesheet('player', 'assets/sprites/player/player.png', 55, 55);
		this.load.spritesheet('dustAnimation', 'assets/sprites/player/dustAnimation.png', 20, 15);
		this.load.image('playerArm', 'assets/sprites/player/playerArm.png');
		this.load.image('invisibleAttack', 'assets/sprites/player/invisibleAttack.png');
		this.load.image('bulletPlayer', 'assets/sprites/player/bulletPlayer.png');


		// Villager		
		this.load.spritesheet('priest', 'assets/sprites/villager/priest.png', 35, 50);
		this.load.spritesheet('smith', 'assets/sprites/villager/smith.png', 31, 48);
		this.load.spritesheet('botanist', 'assets/sprites/villager/botanist.png', 25, 50);
		this.load.spritesheet('librarian', 'assets/sprites/villager/librarian.png', 16, 48);
		this.load.spritesheet('girl1', 'assets/sprites/villager/girl1.png', 14, 35);
		this.load.spritesheet('girl2', 'assets/sprites/villager/girl2.png', 15, 35);
		this.load.spritesheet('girl3', 'assets/sprites/villager/girl3.png', 15, 30);
		this.load.spritesheet('veteran', 'assets/sprites/villager/veteran.png', 34, 50);
		this.load.spritesheet('woman1', 'assets/sprites/villager/woman1.png', 13, 35);
		this.load.spritesheet('woman2', 'assets/sprites/villager/woman2.png', 17, 40);
		this.load.spritesheet('fisher', 'assets/sprites/villager/fisher.png', 43, 44);
		this.load.spritesheet('oracle', 'assets/sprites/villager/oracle.png', 192, 224);


		// Enemies
		this.load.spritesheet('enemy', 'assets/sprites/enemies/enemy.png', 18, 18);
		this.load.spritesheet('bird', 'assets/sprites/enemies/bird.png', 16, 16);
		this.load.spritesheet('enemyPartsSpritesheet', 'assets/sprites/enemies/enemyPartsSpritesheet.png', 16, 16);
		this.load.spritesheet('predatorPartsSpritesheet', 'assets/sprites/enemies/predatorPartsSpritesheet.png', 16, 16);
		this.load.spritesheet('rock', 'assets/sprites/enemies/rock.png', 96, 128);
		this.load.spritesheet('raptor', 'assets/sprites/enemies/raptor.png', 64, 64);
		this.load.image('bulletRock', 'assets/sprites/enemies/bulletRock.png');
		this.load.image('sprout', 'assets/sprites/enemies/sprout.png');
			

		// Doors
		this.load.spritesheet('templeDoor', 'assets/sprites/doors/templeDoor.png', 72, 108);
		this.load.spritesheet('bossDoor', 'assets/sprites/doors/bossDoor.png', 96, 128);


		// Items
		this.load.spritesheet('item', 'assets/sprites/items/testitem.png', 25, 27);
		this.load.spritesheet('potion', 'assets/sprites/items/potion.png', 32, 32);
		this.load.image('doll', 'assets/sprites/items/doll.png');
		this.load.image('energyStone', 'assets/sprites/items/energyStone.png');


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
		this.load.spritesheet('controllsButton', 'assets/input/controllsButton.png', 60, 20);
		this.load.spritesheet('questButton', 'assets/input/questButton.png', 60, 20);
		this.load.spritesheet('optionsButton', 'assets/input/optionsButton.png', 60, 20);
		this.load.spritesheet('inventoryButton', 'assets/input/inventoryButton.png', 60, 20);
		this.load.spritesheet('muteMusicButton', 'assets/input/muteMusicButton.png', 90, 20);
		this.load.spritesheet('muteSoundButton', 'assets/input/muteSoundButton.png', 90, 20);
		this.load.spritesheet('FSmodeButton', 'assets/input/FSmodeButton.png', 90, 20);

		// Load Weather Sprites
		this.load.image('cloud', 'assets/sprites/cloud.png');


		// Load GUI
		this.load.image('logo', 'assets/sprites/gui/logo.png');
		this.load.image('heart', 'assets/sprites/gui/heart.png');
		this.load.image('dashBar', 'assets/sprites/gui/dashBar.png');
		this.load.image('newGameMap', 'assets/sprites/gui/newGameMap.png');
		this.load.image('gamePadHelper', 'assets/sprites/gui/gamePadHelper.png');
		this.load.image('actionSymbol', 'assets/sprites/gui/actionSymbol.png');
		this.load.image('credits', 'assets/sprites/gui/credits.png');
		this.load.image('instructionsInGame', 'assets/sprites/gui/instructionsInGame.png');
		this.load.spritesheet('characterTalk', 'assets/sprites/gui/talk.png', 15, 12);
		this.load.spritesheet('nextGUI', 'assets/sprites/gui/nextGUI.png', 7, 7);
		
		// this.load.image('cursor', 'assets/sprites/gui/cursor.png');


		// Other
		this.load.image('island', 'assets/sprites/island.png');
		this.load.image('branch', 'assets/sprites/branch.png');
		this.load.spritesheet('chest', 'assets/sprites/chest.png', 30, 30);
		this.load.image('flower', 'assets/sprites/flower.png');
		this.load.spritesheet('flowerPieces', 'assets/sprites/flowerPieces.png', 8, 8);


		// Load Fonts
		// this.load.bitmapFont('pxlfont', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		// this.load.bitmapFont('pxlfont', 'assets/fonts/prophecy.png', 'assets/fonts/prophecy.fnt');
		// this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia-black.png', 'assets/fonts/minecraftia.xml');
		// this.load.image('carinaFont', 'assets/fonts/carinaFont.png');
	}

	create() {

		this.game.renderer.setTexturePriority(['tileset']);
		
		this.game.musicPlayer = new Musicplayer(this.game);
		this.game.soundManager = new Soundmanager(this.game);

		/*eslint no-undef: */
		if (__DEV__) {
			this.state.start(config.devStartState, true, false);
		} else {
			this.state.start('MainMenu', true, false);
		}
	}

	render() {}

	loadUpdate() {
		// Log Loadingprogress
		this.loadingprogress = this.load.onFileComplete.add(progress => {
			if (typeof ipc == 'undefined') {
				var content = '' + progress;
				// this.text.setText(content, true, -1, 5, 'left', true)

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