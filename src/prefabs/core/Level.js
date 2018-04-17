/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/
/*eslint no-duplicate-imports: "error"*/

import config from './../../config';

import Phaser from 'phaser';
import 'phaser-tilemap-plus';

import Player from '../beings/Player';
import Enemy from '../beings/Enemy';
import Character from '../beings/Character';
import Weather from '../gamemechanics/Weather';
import Input from './Input';
import Item from '../gamemechanics/Item';
import Safe from './Safe';
import Lucy from '../beings/Lucy';
import Eventmanager from './Eventmanager';
import Questmanager from './Questmanager';
import Daycycle from '../gamemechanics/Daycycle';
import GUI from '../gui/GUI';
import Battery from './Battery';

export default class {
	constructor(game, instruction) {
		this.game = game;

		this.GUICLASS = new GUI(this.game, this);
		this.battery = new Battery(this.game, this);
		this.safe = new Safe(this.game);
		this.questManager = new Questmanager(this.game, this);

		this.gameData = this.safe.getGameConfig();
		this.itemIDs = this.safe.getItemIDs();
		this.currentMap = this.gameData.currentMap;
		this.restartType = instruction.restartType;

		this.dayCycle = false;
		this.foreGroundShift = false;
		this.fallDown = false;
		this.fallDownSwitch = true;
		this.fallDownLayer = 0;
		this.lastDirection = null;

		// Arrays
		this.characters = [];
		this.items = [];
		this.activatedBridges = [];
		this.enemies = [];
		this.emitter = [];

		// Accesspoints
		this.startPoint = {};
		this.customStartPoints = [];
		this.defaultStartPoint = {};

		// Method
		this.loadLevel();
	}

	loadLevel() {
		// Load Map
		this.initMap();

		// Start Sound and Music
		this.initSoundandMusic();

		// Load Entry Points
		this.loadEntryPoints();

		// Create Player
		this.player = new Player(this.game, this.startPoint.x, this.startPoint.y, this);

		// console.log(this.groundLayer.getTiles(this.player.x, this.player.y, 5, 5));

		// Set Player Direction
		console.log(this.gameData.direction);

		switch (this.gameData.direction) {
			case 'up':
				this.player.animations.play('idle_up');
				break;

			case 'down':
				this.player.animations.play('idle');
				break;

			case 'left':
				this.player.animations.play('idle_left');
				break;

			case 'right':
				this.player.animations.play('idle_right');
				break;
		
			default:
				break;
		}

		// Create Lucy
		this.lucy = this.tilemapProperties.lucy ? new Lucy(this.game, this.player.x + 10, this.player.y - 10, this) : false;

		// Set Player inside GUIClass
		this.GUICLASS.setLevel(this);

		// Load Items
		this.loadItems();

		// Load Enemies
		if (config.enemies) this.loadEnemies();

		// Load GamePeople
		this.loadPeople();

		// Load Custom Emitter
		this.loadEmitter();

		// EventManager
		this.eventManager = new Eventmanager(this.game, this);

		// Create Weather
		this.weather = new Weather(this.game, this.tilemapProperties.weather, this, this.backgroundLayer);

		// Daycycle Class
		this.dayCycleClass = new Daycycle(this.game, this);

		// Saving Notification
		// this.GUICLASS.createNotification('saving', 'Saving ...');

		// Init InputClass
		this.inputClass = new Input(this.game, this);
	}

	loadEntryPoints() {
		// Get array of startpoints from JSON-Map
		let elementsArr = this.findObjectsByType('startPointType', this.map, 'EntryPoints');

		// Find and map startpoints
		elementsArr.forEach(function(element) {
			// Find Default Startpoint
			if (element.properties.startPointType == 'default') {
				this.defaultStartPoint = { x: element.x, y: element.y };
			}

			// Find Custom Startpoints
			if (element.properties.startPointType == 'custom') {
				let point = [];
				point['id'] = element.properties.id;
				point['x'] = element.x;
				point['y'] = element.y;
				this.customStartPoints.push(point);
			}
		}, this);

		// Choose Start Points
		if (this.gameData.targetID == undefined) {
			this.startPoint.x = this.defaultStartPoint.x;
			this.startPoint.y = this.defaultStartPoint.y;
		} else {
			for (var i = 0; i < this.customStartPoints.length; i++) {
				if (this.customStartPoints[i].id == this.gameData.targetID) {
					this.lastTargetID = this.gameData.targetID;
					this.startPoint.x = this.customStartPoints[i].x;
					this.startPoint.y = this.customStartPoints[i].y;
				}
			}
		}
	}

	loadPeople() {
		// Get array of people information from JSON-Map
		let elementsArr = this.findObjectsByType('id', this.map, 'People');

		// Find specific people
		elementsArr.forEach(function(element) {
			// Da bei QuestID
			if(element.properties.ifQuestID !== undefined){
				let check = this.questManager.checkIfQuestExists(element.properties.ifQuestID);
				if(!check) return;
			}

			// Weg bei QuestID
			if(element.properties.ifNotQuestID !== undefined){
				let valueElem = element.properties.ifNotQuestID;
				let entries = valueElem.split(',');

				for (var i = 0; i < entries.length; i++) {
					let check = this.questManager.checkIfQuestExists(parseInt(entries[i]));
					console.log(check);
					if(check) return;
				}


			}

			this.characters.push(new Character(this.game, element, this.player));
			
			
		}, this);
	}

	loadItems() {
		// Get array of items from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'Items');

		// Find specific items
		elementsArr.forEach(function(element) {
			if (this.itemIDs.includes(element.properties.id)) return;
			if (element.properties.type == 'key') {
				this.items.push(new Item(this.game, element.x, element.y, 'item', element.properties));
			}
		}, this);
	}

	loadEmitter() {
		// Get array of items from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'CustomEmitter');

		//Find specific emitter
		elementsArr.forEach(function(element) {
			console.log(element);

			if (element.properties.type == 'tree'){

				let x = element.x + element.width / 2;
				let y = element.y + element.height / 2;


				let customEmitter = this.game.add.emitter(x, y, 10);
				customEmitter.width = element.width;
				customEmitter.height = element.height;
				customEmitter.minParticleScale = 0.5;
				customEmitter.maxParticleScale = 1;
				customEmitter.gravity = 0.5;
				customEmitter.setScale(-1, 1, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
				customEmitter.setYSpeed(100);
				customEmitter.setXSpeed(-100, 100);
				customEmitter.gravity = 0.5;
				customEmitter.makeParticles('treeleaves', [0, 1]);
				customEmitter.start(false, 3000, 400, 0);

			} else if(element.properties.type == 'water'){

				let x = element.x + this.map.tileWidth;
				let y = element.y + this.map.tileHeight;

				console.log('WATER');

				// console.log(element);
				console.log(element.x, element.y);

				this.waterEmitter = this.game.add.emitter(x, y, 50);
				this.waterEmitter.width = element.width;
				this.waterEmitter.height = element.height;
				// this.waterEmitter.minParticleScale = 0.1;
				// this.waterEmitter.maxParticleScale = 0.8;
				// waterEmitter.maxParticleSpeed.setTo(2, 2);
				this.waterEmitter.setYSpeed(0.1, -0.1);
				this.waterEmitter.setXSpeed(0.1, -0.1);
				this.waterEmitter.rotation = 0;
				this.waterEmitter.gravity = 0;
				this.waterEmitter.setAlpha(0.3, 0.8, 1000, Phaser.Easing.Exponential.In, true);
				this.waterEmitter.makeParticles('waterdrop');

				//(explode, lifespan, frequency, quantity, forceQuantity)
				this.waterEmitter.start(false, 3000, 20);

			} else if(element.properties.type == 'fire'){

				let x = element.x;
				let y = element.y;

				console.log(this.groundLayer.getTiles(x, y, 1, 1));

				console.log('üüüüüü');
				// this.waterEmitter = this.game.add.emitter(x, y, 50);
				// this.waterEmitter.width = element.width;
				// this.waterEmitter.height = element.height;
				// // this.waterEmitter.minParticleScale = 0.1;
				// // this.waterEmitter.maxParticleScale = 0.8;
				// // waterEmitter.maxParticleSpeed.setTo(2, 2);
				// this.waterEmitter.setYSpeed(0.1, -0.1);
				// this.waterEmitter.setXSpeed(0.1, -0.1);
				// this.waterEmitter.rotation = 0;
				// this.waterEmitter.gravity = 0;
				// this.waterEmitter.setAlpha(0.3, 0.8, 1000, Phaser.Easing.Exponential.In, true);
				// this.waterEmitter.makeParticles('waterdrop');

				// //(explode, lifespan, frequency, quantity, forceQuantity)
				// this.waterEmitter.start(false, 3000, 20);



				this.fireEmitter = this.game.add.emitter(x, y, 100);
				this.fireEmitter.width = element.width;
				this.fireEmitter.height = element.height;
				// this.fireEmitter.maxParticleScale = 1;
				this.fireEmitter.gravity = 0.5;
				this.fireEmitter.setAlpha(0, 1, 300, null, true);
				// this.fireEmitter.minParticleSpeed.set(100);
				this.fireEmitter.setXSpeed(-1, 1);
				this.fireEmitter.setYSpeed(0.8);
				// this.fireEmitter.maxParticleSpeed.set(100);
				this.fireEmitter.gravity = -20;
				this.fireEmitter.makeParticles('fireSpritesheet', [0, 1, 2, 3], 100);
				this.fireEmitter.start(false, 1000, 0.1, 0);

			}


		}, this);
	}

	loadEnemies() {
		// Get array of enemies from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'Enemies');

		// Find specific enemy
		elementsArr.forEach(function(element) {
			const killQuestID = element.properties.killQuestID;
			if (killQuestID !== undefined && !this.questManager.checkIfQuestWasDone(killQuestID)) {
				if (element.properties.type == 'seed') {
					console.log('create');
					this.enemies.push(
						new Enemy(this.game, element.x, element.y, this.player, this.map, this.groundLayer, element.properties)
					);
				}
			}
		}, this);
	}

	// Searchmethod for JSON-Map
	findObjectsByType(targetType, tilemap, layer) {
		let result = [];

		tilemap.objects[layer].forEach(function(element) {
			let container = Object.keys(element.properties);
			if (container.indexOf(targetType) || container.toString() == targetType) {
				element.y -= tilemap.tileHeight / 2;
				element.x += tilemap.tileHeight / 2;
				// element.width += tilemap.tileHeight / 2;
				// element.height -= tilemap.tileHeight / 2;
				result.push(element);
			}
		}, this);

		return result;
	}

	enemyCollision() {
		console.log('collide');
	}

	// Update Method
	update() {
		// Update InputClass
		this.inputClass.update();

		// If Pathfinder == true -> follow path
		if (this.pathfinder) {
			this.pathfinder.followPath();
		}

		// Collisionhandler
		this.game.physics.arcade.collide(this.enemies, this.enemies, this.enemyCollision);
		this.game.physics.arcade.collide(this.player, this.enemies);
		this.game.physics.arcade.collide(this.player.weapon.bullets, this.enemies, this.player.fight, null, this);
		this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

		this.game.physics.arcade.collide(this.player, this.characters, this.player.talk, null, this);
		this.game.physics.arcade.collide(this.player, this.collisionLayer, this.enemyCollision);
		this.game.physics.arcade.collide(this.player, this.items, this.player.collideWithItem, null, this);

		// If the player is not falling down
		if (!this.fallDown) {
			this.game.world.bringToTop(this.player);
			this.game.world.bringToTop(this.player.customEmitter);
		} else {
			// Shift the player to the last layer
			this.game.world.setChildIndex(this.player, 1);
		}

		// If lucy exists -> bringToTop
		if (this.lucy) this.game.world.bringToTop(this.lucy);

		// If there is no foreGroundShift
		if (!this.foreGroundShift) {
			this.game.world.bringToTop(this.foregroundLayer);
			
			if(this.foregroundLayer2 !== undefined){
				this.game.world.bringToTop(this.foregroundLayer2);
			}
			
		}

		// TilemapPlus Physics
		this.map.plus.physics.collideWith(this.player);
		this.map.plus.events.regions.triggerWith(this.player);

		// If night == true
		if (this.dayCycle) {
			this.game.world.bringToTop(this.dayCycleClass.lightSprite);
			this.dayCycleClass.lightSprite.reset(this.game.camera.x - 5, this.game.camera.y - 5);
			this.dayCycleClass.updateShadowTexture();
		}

		// Update Weather
		this.weather.updateWeather();

		// If clouds == true -> bringtoTop (Layer)
		if (this.weather.clouds) {
			this.game.world.bringToTop(this.weather.clouds);
		}

		// If Lockpicker == true -> update()
		if (this.lockGame) {
			this.lockGame.update();
		}

		// If Templeflies -> bringToTop
		if (this.weather.templeFliesEmitter) {
			this.game.world.bringToTop(this.weather.templeFliesEmitter);
		}

		// Update GUIClass
		this.GUICLASS.update();
	}

	slowDownTile(player, tile){
		// console.log(player);
		// console.log(tile);

		// player.body.friction.set(200);


		// if(player.body.velocity.x >= 40){
		// 	player.body.velocity.x++;
		// }

		// if(player.body.velocity.x <= -40){
		// 	player.body.velocity.x--;
		// }
	}

	fallDownCheck(sprite, tile) {
	
		if (this.inputClass.dash){
			this.lastDirection = null;
			return;
		}

		if(this.lastDirection == null){
			this.lastDirection = this.inputClass.direction;
		}

		// console.log(this.lastDirection);
		// console.log(sprite.body.x, tile.worldX + tile.width, this.inputClass.direction);

		if(this.lastDirection == 'left'){

			if (((sprite.body.x + sprite.body.width) < (tile.worldX + tile.width))) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {

				if(((parseInt(sprite.body.x)) == (tile.worldX + tile.width - 2)) && this.inputClass.direction == 'right'){
						setTimeout(() => {
							this.lastDirection = null;
						}, 500);
				}

			}

		} else if(this.lastDirection == 'right'){

			if (sprite.body.x > tile.worldX) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {
				
				if(((parseInt(sprite.body.x + sprite.body.width)) == (tile.worldX)) && this.inputClass.direction == 'left'){
					setTimeout(() => {
						this.lastDirection = null;
					}, 500);
				}

			}

		} else if(this.lastDirection == 'up'){


			if (((sprite.body.y + sprite.body.height) < (tile.worldY + tile.height - 5))) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {

				if(((parseInt(sprite.body.y + sprite.body.height)) == (tile.worldY)) && this.inputClass.direction == 'down'){
					setTimeout(() => {
						console.log('ho');
						this.lastDirection = null;
					}, 500);
				}

			}
			
		} else if(this.lastDirection == 'down'){  


			if (sprite.body.y > tile.worldY) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {
				if(this.inputClass.direction !== this.lastDirection){
					setTimeout(() => {
						this.lastDirection = null;
					}, 1000);
				}
			}
			
		}


	}

	fallDownProcess(sprite, tile) {
		if (this.fallDownSwitch) {



			if(this.fallDownTween == undefined || !this.fallDownTween.isRunning){
				console.log('eins');
				sprite.body.enable = false;
				var value = sprite.y + 400;
				this.fallDownTween = this.game.add.tween(sprite).to( { y: value }, 8000, Phaser.Easing.Elastic.Out, true);
			}

			if(sprite.key == 'enemy'){
				this.game.world.setChildIndex(sprite, 1);
				return;
			}

			if(this.inputClass.direction == 'down'){
				setTimeout(() => {
					this.fallDown = true;
				}, 500);
			} else {
				this.fallDown = true;
			}

			this.game.camera.unfollow();

			this.fallDownSound = this.game.add.audio('sfxfalldown');
			this.fallDownSound.play();

			this.inputClass.pyfootsteps.stop();
			sprite.animations.stop();

			sprite.movable = false;
			this.game.camera.fade(0x000000, 1000, true);

			

			this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
				if (this.inputClass.stick) {
					this.inputClass.stick.alpha = 0;
					this.inputClass.stick.enabled = false;
				}

				if (this.eventManager.areaSound) {
					this.eventManager.areaSound.fadeOut(2000);
				}

				console.log('Restart');

				this.game.state.restart(true, false);
			});

			this.fallDownSwitch = false;
		}
	}

	initMap() {
		// Add current map
		this.map = this.game.add.tilemap(this.gameData.currentMap);
		// this.map = this.game.add.tilemap('map4');

		if(this.map.plus.properties.dayCycle){
			// Background Cloud Layer
			this.backgroundTileset = this.map.addTilesetImage('Clouds', 'Clouds');
			this.backgroundLayer = this.map.createLayer('Clouds');
			this.backgroundLayer.scrollFactorX = this.backgroundLayer.scrollFactorY = 0.5;
		}

		//  Connect with Tileset
		this.map.addTilesetImage('tileset', 'tileset', 32, 32);

		//  Define Layers
		this.groundLayer = this.map.createLayer('BackgroundLayer');
		this.detailGroundLayer = this.map.createLayer('DetailBackgroundLayer');
		this.collisionLayer = this.map.createLayer('CollisionLayer');
		this.foregroundLayer = this.map.createLayer('ForegroundLayer');

		if(this.map.layers[3].name == 'ForegroundLayer2'){
			this.foregroundLayer2 = this.map.createLayer('ForegroundLayer2');
		}
		

		//  Resize the world
		this.groundLayer.resizeWorld();
		this.detailGroundLayer.resizeWorld();
		this.foregroundLayer.resizeWorld();

		if(this.map.layers[3].name == 'ForegroundLayer2'){
			this.foregroundLayer2.resizeWorld();
		}
		

		// Test
		// this.foregroundLayer.blendMode = Phaser.blendModes.MULTIPLY;

		// Alpha of Foregroundlayer 0.9
		this.foregroundLayer.alpha = 1;

		// Set Collision Tiles
		this.map.setCollision(1602, true, 'CollisionLayer');

		// Set tileCallback for abyss
		this.map.setTileIndexCallback(1601, this.fallDownCheck, this, this.collisionLayer);

		// // Set SlowDownTile
		// this.map.setTileIndexCallback(4, this.slowDownTile, this, this.collisionLayer);

		// this.collisionLayer.debug = true;

		// Get Map Properties
		this.tilemapProperties = this.map.plus.properties;

		// Get Properties for Nightmode
		this.dayCycle = this.tilemapProperties.dayCycle;

		// this.collisionLayer.debug = true;

		// Enable Tile Animations
		this.map.plus.animation.enable();

		// Flashduration from Settings (if map1)
		if (this.gameData.currentMap == 'map1' && this.gameData.playerHealth == 100) {
			this.game.camera.flash(0x000000, 8000, true);
		} else {
			this.game.camera.flash(0x000000, 1500);
		}

		// Customizations
		if (this.currentMap == 'map4') {
			this.door = this.game.add.sprite(253, -12, 'templeDoor');
			this.door.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 8, true);
			this.door.animations.add('idle', [17], 1, true);
		}
	}

	initSoundandMusic() {
		// Get Settings
		this.preferences = this.safe.getGamePreferences();

		// Mute Music or fadeIn Music
		if (this.preferences.muteMusic) {
			this.muteMusic = true;
		} else {
			this.game.musicPlayer.initMap(this.tilemapProperties, this.tilemapProperties.startMusic, 5000);
			this.muteMusic = false;
		}

		// Mute Sound or fadeIn Sound
		if (this.preferences.muteSound) {
			this.muteSound = true;
		} else {
			this.game.soundManager.initSound(this.tilemapProperties.athmoSound);
			this.muteSound = false;
		}
	}
}
