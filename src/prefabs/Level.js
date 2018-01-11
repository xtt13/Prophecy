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
import Eventmanager from '../prefabs/Eventmanager';
import Questmanager from '../prefabs/Questmanager';
import config from './../config';

export default class {
	constructor(game, GUIclass, instruction) {
		this.game = game;
		this.GUICLASS = GUIclass;

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

		// Accesspoints
		this.startPoint = {};
		this.customStartPoints = [];
		this.defaultStartPoint = {};

		// Vars
		this.night = false;

		// Method
		this.loadLevel();
	}

	loadLevel() {
		// Load Map
		this.initMap();

		this.game.camera.flash(0x000000, 2000);

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

		// Customizations
		if (this.currentMap == 'map3') {
			this.door = this.game.add.sprite(864, 792, 'templeDoor');
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

		// EventManager
		this.eventManager = new Eventmanager(this.game, this);

		// Create Weather
		this.weather = new Weather(this.game, this.tilemapProperties.weather, this.backgroundLayer);

		// Create Night
		if (this.night) {
			this.backgroundLayer.tint = 0x262626;
			this.shadowTexture = this.game.add.bitmapData(this.game.width + 200, this.game.height + 200);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
			this.lightSprite.alpha = 0.99;

			this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
			this.weather.clouds.destroy();
			this.weather.lightning.bringToTop();
		}

		// Test Notification
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
		let elementsArr = this.findObjectsByType('character', this.map, 'People');

		// Find specific people
		elementsArr.forEach(function(element) {
			if (element.properties.character == 'death') {
				this.characters.push(new Character(this.game, element.x, element.y, this.player));
			}
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

	loadEnemies() {
		// Get array of enemies from JSON-Map
		let elementsArr = this.findObjectsByType('type', this.map, 'Enemies');

		// Find specific enemy
		elementsArr.forEach(function(element) {
			if (element.properties.type == 'seed') {
				this.enemies.push(
					new Enemy(
						this.game,
						element.x,
						element.y,
						this.player,
						this.map,
						this.groundLayer,
						element.properties
					)
				);
			}
		}, this);
		console.log(this.enemies);
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

	// Night Method
	updateShadowTexture() {
		this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
		this.shadowTexture.context.fillRect(0, 0, this.game.width + 400, this.game.height + 400);

		var radius = 100 + this.game.rnd.integerInRange(1, 8),
			heroX = this.player.x - this.game.camera.x,
			heroY = this.player.y - this.game.camera.y;

		var gradient = this.shadowTexture.context.createRadialGradient(heroX, heroY, 100 * 0.75, heroX, heroY, radius);
		gradient.addColorStop(0, 'rgba(255, 227, 134, 1.0)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

		this.shadowTexture.context.beginPath();
		this.shadowTexture.context.fillStyle = gradient;
		this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
		this.shadowTexture.context.fill();

		this.shadowTexture.dirty = true;
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
		this.game.physics.arcade.collide(this.enemies);
		// this.game.physics.arcade.collide(this.enemies, this.player);
		this.game.physics.arcade.collide(this.enemies, this.player, this.player.getDamage, null, this);
		this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

		this.game.physics.arcade.collide(this.characters, this.player);
		this.game.physics.arcade.collide(this.player, this.collisionLayer);
		this.game.physics.arcade.collide(this.player, this.items, this.player.collideWithItem, null, this);

		this.game.world.bringToTop(this.player);

		// TilemapPlus Physics
		this.map.plus.physics.collideWith(this.player);
		this.map.plus.events.regions.triggerWith(this.player);

		// Update Weather
		this.weather.updateWeather();

		// If clouds == true -> bringtoTop (Layer)
		if (this.weather.clouds) {
			this.game.world.bringToTop(this.weather.clouds);
		}

		// If night == true
		if (this.night) {
			this.lightSprite.reset(this.game.camera.x - 5, this.game.camera.y - 5);
			this.updateShadowTexture();
		}

		// If Lockpicker == true -> update()
		if (this.lockGame) {
			this.lockGame.update();
		}

		// Update GUIClass
		this.GUICLASS.update();
	}

	initMap() {
		this.map = this.game.add.tilemap(this.gameData.currentMap);

		// Background Cloud Layer
		this.backgroundTileset = this.map.addTilesetImage('Clouds', 'Clouds');
		this.backgroundLayer = this.map.createLayer('Clouds');
		this.backgroundLayer.scrollFactorX = this.backgroundLayer.scrollFactorY = 0.5;

		//  Connect with Tileset
		this.map.addTilesetImage('Tileset', 'gameTileset2', 36, 36);

		//  Define Layers
		this.groundLayer = this.map.createLayer('BackgroundLayer');
		this.collisionLayer = this.map.createLayer('CollisionLayer');

		//  Resize the world
		this.groundLayer.resizeWorld();

		// Set Collision Tiles
		this.map.setCollisionBetween(0, 20, true, 'CollisionLayer');

		// Get Map Properties
		this.tilemapProperties = this.map.plus.properties;

		// Get Properties for Nightmode
		this.night = this.tilemapProperties.night;

		// Enable Tile Animations
		this.map.plus.animation.enable();
	}
}
