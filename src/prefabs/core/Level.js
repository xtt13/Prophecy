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
import Chest from '../gamemechanics/Chest';
import Safe from './Safe';
import LevelBuilder from './LevelBuilder';
import Lucy from '../beings/Lucy';
import Eventmanager from './Eventmanager';
import Questmanager from './Questmanager';
import Daycycle from '../gamemechanics/Daycycle';
// import LockGame from '../minigame/LockGame';
import GUI from '../gui/GUI';
import Battery from './Battery';
import Rock from '../beings/Rock';
import Raptor from '../beings/Raptor';
import Bird from '../beings/Bird';
import Flower from '../gamemechanics/Flower';
import Sprout from '../beings/Sprout';
import Gamescaler from '../gamemechanics/Gamescaler';

export default class {
	constructor(game, instruction) {
		this.game = game;
		// this.game.time.slowMotion = 1.0;

		var time = new Date();
			

		/*eslint no-undef: */
		if (__DEV__) {
			var timeValue = config.devHour;
			
		} else {
			// var timeValue = 11;
			var timeValue = time.getHours();
		}


		if (timeValue >= 0 && timeValue < 6) {

			this.night = true;


		} else if (timeValue >= 6 && timeValue < 8) {

			this.night = false;

		} else if (timeValue >= 8 && timeValue < 18) {

			this.night = false;


		} else if (timeValue >= 18 && timeValue < 21) {

			this.night = false;

		} else if (timeValue >= 21 && timeValue < 24) {

			this.night = true;

		}


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
		

		this.game.forceSingleUpdate = true;


		// Arrays
		this.characters = [];
		this.items = [];
		this.chests = [];
		this.activatedBridges = [];
		this.enemies = [];
		this.birds = [];
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


		if(__DEV__ && config.buildMode){
			let XY = this.safe.getDEVCoordinates();
			if (XY == undefined) return;

			// Create Player
			this.player = new Player(this.game, XY.x, XY.y, this);
		} else {
			// Create Player
			this.player = new Player(this.game, this.startPoint.x, this.startPoint.y, this);
		}

		this.sfxheartbeat = this.game.add.audio('sfxheartbeat');
		this.sfxheartbeat.loop = true;
		// this.sfxheartbeat.allowMultiple = false;

		if(this.player.health < 2){
			this.sfxheartbeat.play();
		}

		

		this.GUICLASS = new GUI(this.game, this);

		if(!this.dayCycle){
			this.GUICLASS.healthBar.fadeOut();
		}

		if(__DEV__ && config.buildMode){
			window.addEventListener('beforeunload', (event) => {
				this.safe.setDEVCoordinates(this.player);
				this.gameData.direction = this.inputClass.direction;
				this.safe.setGameConfig(this.gameData);
			});
		}


		// Set Player Direction

		switch (this.gameData.direction) {
			case 'up':
				this.player.animations.play('static_idle_up');
				break;

			case 'down':
				this.player.animations.play('static_idle_down');
				break;

			case 'left':
				this.player.animations.play('static_idle_left');
				break;

			case 'right':
				this.player.animations.play('static_idle_right');
				break;

			default:
				this.player.animations.play('static_idle_down');
				break;
		}

		// Create Lucy
		this.lucy = this.tilemapProperties.lucy ? new Lucy(this.game, this.player.x + 10, this.player.y - 10, this) : false;



		// Set Player inside GUIClass
		this.GUICLASS.setLevel(this);

		// Load Items
		this.loadItems();

		// Load Chests
		this.loadChests();

		// Load Enemies
		if (config.enemies) this.loadEnemies();

		// // Load GamePeople
		// this.loadPeople();

		// Load Custom Emitter
		this.loadEmitter();

		// EventManager
		this.eventManager = new Eventmanager(this.game, this);

		// Create Weather
		this.weather = new Weather(this.game, this.tilemapProperties.weather, this, this.backgroundLayer);

		// Daycycle Class
		this.dayCycleClass = new Daycycle(this.game, this);

		// Load GamePeople
		this.loadPeople();

		// Saving Notification
		// this.GUICLASS.createNotification('saving', 'Saving ...');

		// Init InputClass
		this.inputClass = new Input(this.game, this);

		if(this.tilemapProperties.disableAttack !== undefined && this.tilemapProperties.disableAttack){
			this.inputClass.disableAttack = true;
		}

		this.levelBuilder = new LevelBuilder(this.game, this, this.currentMap);


	}

	loadEntryPoints() {
		// Get array of startpoints from JSON-Map
		let elementsArr = this.findObjectsByType('startPointType', this.map, 'EntryPoints');

		// Find and map startpoints
		elementsArr.forEach(function (element) {
			// Find Default Startpoint
			if (element.properties.startPointType == 'default') {
				this.defaultStartPoint = {
					x: element.x,
					y: element.y
				};
			}

			// Find Custom Startpoints
			if (element.properties.startPointType == 'custom') {
				let point = [];
				point['id'] = element.properties.id;
				point['x'] = element.x - 5;
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
		elementsArr.forEach(function (element) {

			// Nicht bei Nacht und nightVersion == false
			



			if ((this.tilemapProperties.weather == 'Storm' && !element.properties.nightVersion) || (this.night && !element.properties.nightVersion)) return;
			if (!this.night && element.properties.nightVersion) return;

			// Da bei QuestID
			if (element.properties.ifQuestID !== undefined) {
				let check = this.questManager.checkIfQuestExists(element.properties.ifQuestID);
				if (!check) return;
			}

			// Nicht bei QuestID
			if (element.properties.ifNotQuestID !== undefined) {
				let valueElem = element.properties.ifNotQuestID;
				let entries = valueElem.split(',');

				for (var i = 0; i < entries.length; i++) {
					let check = this.questManager.checkIfQuestExists(parseInt(entries[i]));
					if (check) return;
				}


			}

			this.characters.push(new Character(this.game, element, this.player, this));


		}, this);
	}

	loadItems() {
		// Get array of items from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'Items');

		// Find specific items
		elementsArr.forEach(function (element) {

			if(element.properties.ifQuestID !== undefined){
				if (!this.questManager.checkIfQuestExists(element.properties.ifQuestID)) return;
			}

			if (this.itemIDs.includes(element.properties.id)) return;

			if (element.properties.type == 'key') {
				let x = element.x - 10;
				let y = element.y + 10;
				this.items.push(new Item(this.game, x, y, 'item', element.properties, this));
			}

			if (element.properties.type == 'doll') {
				let x = element.x - 10;
				let y = element.y + 10;
				this.items.push(new Item(this.game, x, y, 'doll', element.properties, this));
			}

			if (element.properties.type == 'potion') {
				let x = element.x;
				let y = element.y;
				this.items.push(new Item(this.game, x, y, 'potion', element.properties, this));
			}
			if (element.properties.type == 'flower'){
				let x = element.x;
				let y = element.y;
				new Flower(this.game, x, y, 'flower', element.properties, this);
			}
		}, this);
	}

	loadChests() {
		// Get array of items from JSON-Map
		let elementsArr = this.findObjectsByType(true, this.map, 'Chests');
		// Find specific items
		elementsArr.forEach(function (element) {
			
			// if (this.itemIDs.includes(element.properties.id)) return;
			let x = element.x - 10;
			let y = element.y + 10;
			this.chests.push(new Chest(this.game, x, y, element.properties, this));


		}, this);
	}

	loadEmitter() {
		// Get array of items from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'CustomEmitter');

		//Find specific emitter
		elementsArr.forEach(function (element) {

			if (element.properties.type == 'tree') {

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

			} else if (element.properties.type == 'water') {

				let x = element.x + this.map.tileWidth;
				let y = element.y + this.map.tileHeight;


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

			} else if (element.properties.type == 'fire') {

				let x = element.x;
				let y = element.y;



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

			} else if (element.properties.type == 'fountainSparkling') {
				let x = element.x + (element.width / 2);
				let y = element.y + (element.height / 2);

				this.fountainSparkling = this.game.add.emitter(x, y, 100);
				this.fountainSparkling.width = element.width;
				this.fountainSparkling.height = element.height;
				this.fountainSparkling.maxParticleScale = 1;
				this.fountainSparkling.maxRotation = 0;
				// this.fountainSparkling.maxParticleScale = 1;
				this.fountainSparkling.gravity = 0;

				// this.fountainSparkling.setAlpha(0.5, 1, 300, null, true);
				// this.fountainSparkling.minParticleSpeed.set(100);
				this.fountainSparkling.setXSpeed(0, 0);
				this.fountainSparkling.setYSpeed(0);
				this.fountainSparkling.maxParticleSpeed.set(1);
				this.fountainSparkling.makeParticles('sparklingSpritesheet', [0, 1, 2, 3], 100);
				this.fountainSparkling.start(false, 1000, 0.1, 0);

			} else if (element.properties.type == 'flies') {
				let x = element.x + (element.width / 2);
				let y = element.y + (element.height / 2);

				this.templeFliesEmitter = this.game.add.emitter(x, y, 30);
				// emitter.fixedToCamera = true;
				this.templeFliesEmitter.width = element.width;
				this.templeFliesEmitter.height = element.height;
				// this.templeFliesEmitter.angle = -10;
				this.templeFliesEmitter.minParticleScale = 0.1;
				this.templeFliesEmitter.maxParticleScale = 0.5;
				// emitter.maxParticleSpeed.setTo(2, 2);

				this.templeFliesEmitter.setYSpeed(-5, 5);
				this.templeFliesEmitter.setXSpeed(5, -5);

				this.templeFliesEmitter.gravity = 0.5;
				this.templeFliesEmitter.minRotation = 0;
				this.templeFliesEmitter.maxRotation = 0;
				this.templeFliesEmitter.setAlpha(0.7, 1, 1000, Phaser.Easing.Exponential.In, true);
				this.templeFliesEmitter.makeParticles('fly');
				this.templeFliesEmitter.start(false, 10000, 5, 0);
			} else if (element.properties.type == 'startGlimmer') {
				let x = element.x + (element.width / 2);
				let y = element.y + (element.height / 2);

				this.addVillageGlimmer = this.game.add.emitter(x, y, 30);
				this.addVillageGlimmer.width = element.width;
				this.addVillageGlimmer.height = element.height;
				this.addVillageGlimmer.minParticleScale = 2;
				this.addVillageGlimmer.gravity = 0;
				this.addVillageGlimmer.setYSpeed(-0.5, 0.5);
				this.addVillageGlimmer.setXSpeed(-0.5, 0.5);
				this.addVillageGlimmer.maxRotation = 0;
				this.addVillageGlimmer.minRotation = 0;
				// this.addVillageGlimmer.setAlpha(0, 1, 5000, Phaser.Easing.Exponential.In, true);
				this.addVillageGlimmer.makeParticles('particleStart');
				this.addVillageGlimmer.start(false, 0, 5, 0);

			} else if (element.properties.type == 'villageGlimmer') {
				let x = element.x + (element.width / 2);
				let y = element.y + (element.height / 2);

				this.VillageGlimmer = this.game.add.emitter(x, y, 100);
				this.VillageGlimmer.width = element.width;
				this.VillageGlimmer.height = element.height;
				this.VillageGlimmer.minParticleScale = 5;
				this.VillageGlimmer.gravity = 0;
				this.VillageGlimmer.setYSpeed(-4, 4);
				this.VillageGlimmer.setXSpeed(-4, 4);
				this.VillageGlimmer.maxRotation = 0;
				this.VillageGlimmer.minRotation = 0;
				this.VillageGlimmer.setAlpha(0, 1, 5000, Phaser.Easing.Exponential.In, true);
				this.VillageGlimmer.makeParticles('particle');
				this.VillageGlimmer.start(false, 10000, 5, 0);
			} else if(element.properties.type == 'ember'){
				let x = element.x;
				let y = element.y;
				console.log(x, y);
				console.log(this.map);
				console.log(this.groundLayer);
				let test = this.map.getTile(746, 747, this.groundLayer);
				console.log(test);


				this.emberEmitter = this.game.add.emitter(x, y, 100);
				this.emberEmitter.width = element.width;
				this.emberEmitter.height = element.height;
				// this.fireEmitter.maxParticleScale = 1;
				this.emberEmitter.gravity = 0.5;
				this.emberEmitter.setAlpha(0, 1, 300, null, true);
				// this.fireEmitter.minParticleSpeed.set(100);
				this.emberEmitter.setXSpeed(-1, 1);
				this.emberEmitter.setYSpeed(0.8);
				// this.fireEmitter.maxParticleSpeed.set(100);
				this.emberEmitter.gravity = -20;
				this.emberEmitter.makeParticles('emberSpritesheet', [0, 1, 2, 3], 100);
				this.emberEmitter.start(false, 1000, 0.1, 0);
			}


		}, this);
	}

	loadEnemies() {
		// Get array of enemies from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'Enemies');

		// Find specific enemy
		elementsArr.forEach(function (element) {
			
			const killQuestID = element.properties.killQuestID;
			const ifQuestID = element.properties.ifQuestID;

			// if (killQuestID !== undefined && !this.questManager.checkIfQuestWasDone(killQuestID)) {
			// if (ifQuestID !== undefined && !this.questManager.checkIfQuestExists(ifQuestID)) return;

			// Nicht bei QuestID
			if (ifQuestID !== undefined) {
				let valueElem = element.properties.ifQuestID;
				console.log(valueElem);
				let questEntries = valueElem.split(',');
				// console.log(questEntries);

				// for (var e = 0; e < questEntries.length; e++) {
				// 	console.log(e);
				// 	console.log(questEntries[e]);
				// 	let check = this.questManager.checkIfQuestExists(parseInt(questEntries[e]));
				// 	console.log(check);
				// 	if (!check) return;
				// }

				console.log(questEntries[0], questEntries[1]);

				let check1 = this.questManager.checkIfQuestExists(parseInt(questEntries[0]))
				let check2 = this.questManager.checkIfQuestExists(parseInt(questEntries[1]))

				if(!check1 && !check2) return;

			}

			if (element.properties.type == 'seed') {
				this.enemies.push(
					new Enemy(this.game, element.x, element.y, this.player, this.map, this.EnemyMovingTiles, element.properties)
				);
			}


			// }

			if (element.properties.type == 'bird') {
				if(this.night) return;
				this.birds.push(
					new Bird(this.game, element.x, element.y, this.player, this.map, this.groundLayer, element.properties)
				);
			}

			if (element.properties.type == 'sprout') {
				this.enemies.push(
					new Sprout(this.game, element.x, element.y, this.player, this.map, this.collisionLayer, element.properties, this)
				);
			}

			if (element.properties.type == 'rock') {
				this.enemies.push(
					new Rock(this.game, element.x, element.y, this.player, this.map, this.collisionLayer, element.properties, this)
				);
			}

			if (element.properties.type == 'raptor') {
				this.enemies.push(
					new Raptor(this.game, element.x, element.y, this.player, this.map, this.collisionLayer, element.properties, this)
				);
			}

		}, this);
	}

	// Searchmethod for JSON-Map
	findObjectsByType(targetType, tilemap, layer) {
		let result = [];

		tilemap.objects[layer].forEach(function (element) {
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

	enemyCollision() {}

	weaponGunWallCollision(bullet) {
		this.game.camera.shake(0.003, 100);

		let explosion = this.game.add.emitter(bullet.x, bullet.y, 100);
		explosion.fixedToCamera = true;
		explosion.setAlpha(1, 0, 2000, null, false);
		explosion.setXSpeed(this.game.rnd.integerInRange(-100, 100));
		explosion.gravity = 150;
		explosion.setYSpeed(-100);
		explosion.makeParticles('bulletParticle', 100);
		explosion.start(true, 0, null, 10);

		this.game.time.events.add(2000, () => {
			explosion.destroy();
		}, this);

		bullet.kill();
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
		this.game.physics.arcade.collide(this.player, this.enemies, this.player.getDamage, null, this);
		this.game.physics.arcade.collide(this.player.weapon.bullets, this.enemies, this.player.fight, null, this);
		this.game.physics.arcade.collide(this.player.weaponGun.bullets, this.collisionLayer, this.weaponGunWallCollision, null, this);
		this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

		this.game.physics.arcade.collide(this.player, this.characters);
		this.game.physics.arcade.collide(this.player, this.collisionLayer, this.enemyCollision);
		// this.game.physics.arcade.collide(this.player, this.items, this.player.collideWithItem, null, this);

		// If the player is not falling down
		if (!this.fallDown) {
			this.game.world.bringToTop(this.player);
			this.game.world.bringToTop(this.player.customEmitter);
		} else {
			// Shift the player to the last layer
			this.game.world.setChildIndex(this.player, 1);
		}

		// If there is no foreGroundShift
		if (!this.foreGroundShift) {
			this.game.world.bringToTop(this.foregroundLayer);
			this.game.world.bringToTop(this.foregroundLayer2);
			this.game.world.bringToTop(this.trees);


			// if(this.foregroundLayer2 !== undefined){
			// 	this.game.world.bringToTop(this.foregroundLayer2);
			// }			
		}


		// this.game.world.bringToTop(this.foregroundLayer2);

		this.game.world.bringToTop(this.godrays);



		// TilemapPlus Physics
		this.map.plus.physics.collideWith(this.player);

		for (var i = 0, len = this.player.weaponGun.bullets.children.length; i < len; i++) {
			this.map.plus.physics.collideWith(this.player.weaponGun.bullets.children[i]);
		}

		this.map.plus.events.regions.triggerWith(this.player);

		// If night == true && Daycycle is enabled
		if (this.dayCycle) {
			this.game.world.bringToTop(this.dayCycleClass.lightSprite);
			this.dayCycleClass.lightSprite.reset(this.game.camera.x - 5, this.game.camera.y - 5);
			// if(this.night){
				this.dayCycleClass.updateShadowTexture();
			// }
		}

		// Update Weather
		this.weather.updateWeather();

		// If clouds == true -> bringtoTop (Layer)
		if (this.weather.clouds) {
			this.game.world.bringToTop(this.weather.clouds);
		}


		// If Templeflies -> bringToTop
		if (this.weather.templeFliesEmitter) {
			this.game.world.bringToTop(this.weather.templeFliesEmitter);
		}

		// Here cause of NightTexture
		if(!this.eventManager.spotViewerPlayed){
			this.game.world.bringToTop(this.treeDetails);
		}
		
		


		this.levelBuilder.update();

		// If lucy exists -> bringToTop
		if (this.lucy) this.game.world.bringToTop(this.lucy);

		// Update GUIClass
		this.GUICLASS.update();

		// If Lockpicker == true -> update()
		if (this.lockGame) {
			this.lockGame.update();
			this.game.world.bringToTop(this.lockGame.ring);
			this.game.world.bringToTop(this.lockGame.ball);
			this.game.world.bringToTop(this.lockGame.bar);
		}


	}

	slowDownTile(player, tile) {

		// player.body.friction.set(200);


		// if(player.body.velocity.x >= 40){
		// 	player.body.velocity.x++;
		// }

		// if(player.body.velocity.x <= -40){
		// 	player.body.velocity.x--;
		// }
	}

	fallDownCheck(sprite, tile) {

		if (sprite.key !== 'player') return;

		if (this.inputClass.dash) {
			this.lastDirection = null;
			return;
		}

		if (this.lastDirection == null) {
			this.lastDirection = this.inputClass.direction;
		}


		if (this.lastDirection == 'left') {

			if (((sprite.body.x + sprite.body.width) < (tile.worldX + tile.width))) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {

				if (((parseInt(sprite.body.x)) == (tile.worldX + tile.width - 2)) && this.inputClass.direction == 'right') {
					setTimeout(() => {
						this.lastDirection = null;
					}, 500);
				}

			}

		} else if (this.lastDirection == 'right') {

			if (sprite.body.x > tile.worldX) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {

				if (((parseInt(sprite.body.x + sprite.body.width)) == (tile.worldX)) && this.inputClass.direction == 'left') {
					setTimeout(() => {
						this.lastDirection = null;
					}, 500);
				}

			}

		} else if (this.lastDirection == 'up') {


			if (((sprite.body.y + sprite.body.height) < (tile.worldY + tile.height - 5))) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {

				if (((parseInt(sprite.body.y + sprite.body.height)) == (tile.worldY)) && this.inputClass.direction == 'down') {
					setTimeout(() => {
						this.lastDirection = null;
					}, 500);
				}

			}

		} else if (this.lastDirection == 'down') {


			if (sprite.body.y > tile.worldY) {
				this.fallDownProcess(sprite, tile);
				return;
			} else {
				if (this.inputClass.direction !== this.lastDirection) {
					setTimeout(() => {
						this.lastDirection = null;
					}, 1000);
				}
			}

		}


	}

	fallDownProcess(sprite, tile) {
		this.game.camera.unfollow();

		if (this.fallDownSwitch) {



			if (this.fallDownTween == undefined || !this.fallDownTween.isRunning) {
				sprite.body.enable = false;
				var value = sprite.y + 400;
				this.fallDownTween = this.game.add.tween(sprite).to({
					y: value
				}, 8000, Phaser.Easing.Elastic.Out, true);
			}

			if (sprite.key == 'enemy') {
				this.game.world.setChildIndex(sprite, 1);
				return;
			}

			if (this.inputClass.direction == 'down') {
				setTimeout(() => {
					this.fallDown = true;
				}, 500);
			} else {
				this.fallDown = true;
			}



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

				if(this.sfxheartbeat.isPlaying){
					this.sfxheartbeat.stop();
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

		if (this.map.plus.properties.dayCycle) {
			// Background Cloud Layer
			
			// if(this.gameData.currentMap !== 'map2'){
				this.backgroundTileset = this.map.addTilesetImage('Clouds', 'Clouds');
				this.backgroundLayer = this.map.createLayer('Clouds');
				this.backgroundLayer.resizeWorld();
				this.backgroundLayer.scrollFactorX = this.backgroundLayer.scrollFactorY = 0.5;
			// }

			

			// this.backgroundLayer.scrollFactorX = this.backgroundLayer.scrollFactorY = 0.5;

		}

		if (this.map.plus.properties.customSize) {
			this.gameScaler = new Gamescaler(this.game, this, this.map.plus.properties.customWidth, this.map.plus.properties.customHeight);
		} else {
			this.gameScaler = new Gamescaler(this.game, this, config.phaserConfig.width, config.phaserConfig.height);
		}

		//  Connect with Tileset
		this.map.addTilesetImage('tileset', 'tileset', 32, 32);

		//  Define Layers
		this.groundLayer = this.map.createLayer('BackgroundLayer');
		// this.groundLayer.enableScrollDelta = false;
		this.detailGroundLayer = this.map.createLayer('DetailBackgroundLayer');
		this.collisionLayer = this.map.createLayer('CollisionLayer');
		this.foregroundLayer = this.map.createLayer('ForegroundLayer');
		this.treeDetails = this.map.createLayer('TreeDetails');
		this.trees = this.map.createLayer('Trees');

		this.EnemyMovingTiles = this.map.createLayer('EnemyMovingTiles');
		this.EnemyMovingTiles.visible = false;
		this.EnemyMovingTiles.renderable = false;

		// if (this.map.layers[3].name == 'ForegroundLayer2') {
			this.foregroundLayer2 = this.map.createLayer('ForegroundLayer2');
		// }


		//  Resize the world

		this.groundLayer.resizeWorld();
		this.detailGroundLayer.resizeWorld();
		this.foregroundLayer.resizeWorld();

		if (this.map.layers[3].name == 'ForegroundLayer2') {
			this.foregroundLayer2.resizeWorld();
		}

		this.godrays = this.map.addTilesetImage('Godrays', 'Godrays');
		this.godrays = this.map.createLayer('Godrays');
		this.godrays.smoothed = false;
		// this.godrays.tint = 0x8cfff7;
		// this.game.add.tween(this.godrays).to( { alpha: 0.3 }, 5000, 'Linear', true, 0, 0, true).loop();


		// Alpha of Foregroundlayer 0.9
		this.foregroundLayer.alpha = 1;
		this.foregroundLayer2.alpha = 1;

		// Set Collision Tiles
		this.map.setCollision(2482, true, 'CollisionLayer');

		// Set tileCallback for abyss
		this.map.setTileIndexCallback(2481, this.fallDownCheck, this, this.collisionLayer);

		// // Set SlowDownTile
		// this.map.setTileIndexCallback(4, this.slowDownTile, this, this.collisionLayer);

		// this.collisionLayer.debug = true;

		// Get Map Properties
		this.tilemapProperties = this.map.plus.properties;

		if(this.game.rnd.integerInRange(1, 3) == 4 && this.tilemapProperties.dayCycle){
			this.tilemapProperties.weather = 'Storm';
			this.tilemapProperties.athmoSound = 'AtmoWindRain';	
		} else {
			this.tilemapProperties.weather = this.map.plus.properties.weather;
			this.tilemapProperties.athmoSound = this.map.plus.properties.athmoSound;
		}

		// Get Properties for Nightmode
		this.dayCycle = this.tilemapProperties.dayCycle;

		// this.collisionLayer.debug = true;

		// Enable Tile Animations
		this.map.plus.animation.enable();

		if(this.gameData.targetID == undefined){
			this.game.camera.flash(0x000000, 10000);
		} else {
			this.game.camera.flash(0x000000, 1500);
		}
		



	}

	gameOver(time){
		this.sfxheartbeat = this.game.add.audio('sfxheartbeat');
		this.sfxheartbeat.play();
		this.sfxheartbeat.fadeOut(2000);

		let duration = time;
		let easing = Phaser.Easing.Circular.InOut;

		if(this.backgroundLayer !== undefined){
			this.game.add.tween(this.backgroundLayer).to({
				alpha: 0
			}, duration, easing, true);
		}
		
		this.game.add.tween(this.groundLayer).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.detailGroundLayer).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.collisionLayer).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.foregroundLayer).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.treeDetails).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.trees).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.foregroundLayer2).to({
			alpha: 0
		}, duration, easing, true);
		this.game.add.tween(this.godrays).to({
			alpha: 0
		}, duration, easing, true);
	}

	initSoundandMusic() {
		// Get Settings
		this.preferences = this.safe.getGamePreferences();

		// Mute Music or fadeIn Music
		if (this.preferences.muteMusic || this.night) {
			this.muteMusic = true;
		} else {
			this.game.musicPlayer.initMap(this.tilemapProperties, this.tilemapProperties.startMusic, 5000);
			this.muteMusic = false;
		}

		// Mute Sound or fadeIn Sound
		if (this.preferences.muteSound) {
			this.muteSound = true;
		} else {
				
			this.game.soundManager.initSound(this.tilemapProperties, true, 2000, this.night);		
			this.muteSound = false;
		}
	}
}