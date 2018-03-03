import Phaser from 'phaser';
import 'phaser-tilemap-plus';
import PhaserEasystar from 'phaser-easystar-ts';
import Player from '../prefabs/Player';
import Enemy from '../prefabs/Enemy';
import Character from '../prefabs/Character';
import Pathfinder from '../prefabs/Pathfinder';
import Weather from '../prefabs/Weather';
import Bridgebuilder from '../prefabs/Bridgebuilder';
import Input from '../prefabs/Input';
import LockGame from '../prefabs/LockGame';
import Item from '../prefabs/Item';
import Safe from '../prefabs/Safe';
import Lucy from '../prefabs/Lucy';
import Eventmanager from '../prefabs/Eventmanager';
import Questmanager from '../prefabs/Questmanager';
import Daycycle from '../prefabs/Daycycle';
import GUI from '../prefabs/GUI';
import Battery from '../prefabs/Battery';
import config from './../config';

export default class {
	constructor(game, instruction) {
		this.game = game;
		this.GUICLASS = new GUI(this.game, this);
		this.battery = new Battery(this.game, this);

		this.safe = new Safe(this.game);
		this.gameData = this.safe.getGameConfig();
		this.currentMap = this.gameData.currentMap;
		this.restartType = instruction.restartType;

		this.questManager = new Questmanager(this.game, this);

		// Arrays
		this.characters = [];
		this.items = [];
		this.playedDialogues = this.safe.getPlayedDialogues();
		this.activatedBridges = [];
		this.itemIDs = this.safe.getItemIDs();
		this.enemies = [];
		this.emitter = [];

		// Accesspoints
		this.startPoint = {};
		this.customStartPoints = [];
		this.defaultStartPoint = {};

		// Vars
		this.dayCycle = false;
		this.foreGroundShift = false;
		this.fallDown = false;
		this.fallDownSwitch = true;
		this.fallDownCounter = 0;
		this.fallDownLayer = 0;

		// Method
		this.loadLevel();
	}

	loadLevel() {
		// Load Map
		this.initMap();

		this.preferences = this.safe.getGamePreferences();

		if(this.preferences.muteMusic){
			this.muteMusic = true;
		} else {
			this.game.musicPlayer.initMap(this.tilemapProperties, this.tilemapProperties.startMusic, 5000);
			this.muteMusic = false;
		}

		if(this.preferences.muteSound){
			this.muteSound = true;
		} else {
			this.game.soundManager.initSound(this.tilemapProperties.athmoSound);
			this.muteSound = false;
		}

		

		if (this.gameData.currentMap == 'map1' && this.gameData.playerHealth == 100) {
			this.game.camera.flash(0x000000, 8000, true);
		} else {
			this.game.camera.flash(0x000000, 2000);
		}

		// Load Entry Points
		this.loadEntryPoints();

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

		// Create Player
		this.player = new Player(this.game, this.startPoint.x, this.startPoint.y, this);

		// Create Lucy
		this.lucy = new Lucy(this.game, this.player.x + 10, this.player.y - 10, this);

		// Customizations
		if (this.currentMap == 'map3') {
			this.door = this.game.add.sprite(865, 793, 'templeDoor');
			this.door.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 8, true);
			this.door.animations.add('idle', [17], 1, true);
		}

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
		this.GUICLASS.createNotification('saving', 'Saving ...');

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
	}

	loadPeople() {
		// Get array of people information from JSON-Map
		let elementsArr = this.findObjectsByType('id', this.map, 'People');

		// Find specific people
		elementsArr.forEach(function(element) {
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
			if (element.properties.type == 'emitter') {
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
				result.push(element);
			}
		}, this);

		return result;
	}



	// Update Method
	update() {
		// Update InputClass
		this.inputClass.update();

		// If Pathfinder == true -> follow path
		if (this.pathfinder) {
			this.pathfinder.followPath();
		}

		// console.log(Phaser.Rectangle.intersects(this.player.getBounds(), this.collisionLayer.getBounds()));

		// Collisionhandler
		this.game.physics.arcade.collide(this.enemies, this.enemies);
		// this.game.physics.arcade.collide(this.enemies, this.player);
		this.game.physics.arcade.collide(this.enemies, this.player, this.player.getDamage, null, this);
		this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

		this.game.physics.arcade.collide(this.characters, this.player);
		this.game.physics.arcade.collide(this.player, this.collisionLayer);
		this.game.physics.arcade.collide(this.player, this.items, this.player.collideWithItem, null, this);

		if(!this.fallDown){
			this.game.world.bringToTop(this.player);
		} else {
			
			if(this.fallDownLayer < 13){
				this.game.world.moveDown(this.player);
				this.fallDownLayer++;
			}
			
		}
		
		this.game.world.bringToTop(this.lucy);

		if (!this.foreGroundShift) {
			this.game.world.bringToTop(this.foregroundLayer);
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

		if (this.weather.templeFliesEmitter) {
			this.game.world.bringToTop(this.weather.templeFliesEmitter);
		}



		// Update GUIClass
		this.GUICLASS.update();

		// console.log(this.player.x, this.player.y);
	}

	fallDownFunction(){
		console.log('FallDown');

		// if(this.fallDownSwitch){
		// 	this.fallDown = true;
		// 	this.inputClass.pyfootsteps.stop();	
		// 	this.player.animations.stop();
		// 	this.player.movable = false;
		// 	this.game.camera.fade(0x000000, 1000, true);
		// 	this.game.time.events.loop(50, () => {
		// 		this.player.body.velocity.y = 300;
		// 	}, this);
		// 	this.game.time.events.add(
		// 		Phaser.Timer.SECOND * 1, () => {
		// 			console.log('restart');
		// 			this.fallDownCounter = 0;
		// 			this.game.state.restart(true, false);
		// 	});
		// 	this.fallDownSwitch = false;
		// }


		if(this.fallDownCounter > 30 && this.inputClass.direction == 'up'){
			if(this.fallDownSwitch){
			this.fallDown = true;
			this.inputClass.pyfootsteps.stop();	
			this.player.animations.stop();
			this.player.movable = false;
			this.game.camera.fade(0x000000, 1000, true);
			this.game.time.events.loop(50, () => {
				this.player.body.velocity.y = 300;
			}, this);
			this.game.time.events.add(
				Phaser.Timer.SECOND * 1, () => {
					console.log('restart');
					this.fallDownCounter = 0;
					this.game.state.restart(true, false);
			});
			this.fallDownSwitch = false;
			}
			}

		

		if(this.fallDownCounter > 20 && (this.inputClass.direction == 'left' || this.inputClass.direction == 'right')){
		if(this.fallDownSwitch){
			this.fallDown = true;
			this.inputClass.pyfootsteps.stop();	
			this.player.animations.stop();
			this.player.movable = false;
			this.game.camera.fade(0x000000, 1000, true);
			this.game.time.events.loop(50, () => {
				this.player.body.velocity.y = 300;
			}, this);
			this.game.time.events.add(
				Phaser.Timer.SECOND * 1, () => {
					console.log('restart');
					this.fallDownCounter = 0;
					this.game.state.restart(true, false);
			});
			this.fallDownSwitch = false;
			}
		}


		if(this.fallDownCounter > 0 && this.inputClass.direction == 'down'){
			if(this.fallDownSwitch){
			this.fallDown = true;
			this.inputClass.pyfootsteps.stop();	
			this.player.animations.stop();
			this.player.movable = false;
			this.game.camera.fade(0x000000, 1000, true);
			this.game.time.events.loop(50, () => {
				this.player.body.velocity.y = 300;
			}, this);
			this.game.time.events.add(
				Phaser.Timer.SECOND * 1, () => {
					console.log('restart');
					this.fallDownCounter = 0;
					this.game.state.restart(true, false);
			});
			this.fallDownSwitch = false;
			}
		}




		this.fallDownCounter++;
		// console.log(this.fallDownCounter++);



		

	}

	initMap() {
		this.fallDown = false;

		console.log('LoadMap: ' + this.gameData.currentMap);
		this.map = this.game.add.tilemap(this.gameData.currentMap);

		// Background Cloud Layer
		this.backgroundTileset = this.map.addTilesetImage('Clouds', 'Clouds');
		this.backgroundLayer = this.map.createLayer('Clouds');
		this.backgroundLayer.scrollFactorX = this.backgroundLayer.scrollFactorY = 0.5;

		//  Connect with Tileset
		this.map.addTilesetImage('Tileset', 'gameTileset2', 36, 36);

		//  Define Layers
		this.groundLayer = this.map.createLayer('BackgroundLayer');
		this.detailGroundLayer = this.map.createLayer('DetailBackgroundLayer');

		this.collisionLayer = this.map.createLayer('CollisionLayer');
		this.foregroundLayer = this.map.createLayer('ForegroundLayer');

		//  Resize the world
		this.groundLayer.resizeWorld();
		this.detailGroundLayer.resizeWorld();
		this.foregroundLayer.resizeWorld();

		// this.collisionLayer.debug = true;
		

		// this.foregroundLayer.blendMode = Phaser.blendModes.MULTIPLY;
		this.foregroundLayer.alpha = 0.9;

		// Set Collision Tiles
		this.map.setCollisionBetween(3, true, 'CollisionLayer');

		this.map.setTileIndexCallback(3, this.fallDownFunction, this, this.collisionLayer);
		// this.map.setTileLocationCallback(3, 0, 1, 1, this.fallDownFunction, this);

		// Get Map Properties
		this.tilemapProperties = this.map.plus.properties;

		// Get Properties for Nightmode
		this.dayCycle = this.tilemapProperties.dayCycle;

		// Enable Tile Animations
		this.map.plus.animation.enable();
	}
}
