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
import config from './../config';
import dialogues from './../dialogues';

export default class {
	constructor(game, inputClass, GUIclass, instructions) {
		this.game = game;
		this.GUICLASS = GUIclass;
		this.instructions = instructions;
		// console.log(this.instructions);

		this.characters = [];
		this.items = [];
		this.playedDialogues = [];
		this.activatedBridges = [];
		this.itemIDs = [];
		this.enemies = [];

		this.startPoint = {};
		this.customStartPoints = [];
		this.defaultStartPoint = {};

		this.night = config.night;

		this.loadLevel();
	}

	loadLevel() {

		// FadeIn on Load
		this.game.camera.flash(0x000000, 2000);

		// Load Map
		this.initMap();

		this.loadEntryPoints();

		if(this.instructions == undefined){
			this.startPoint.x = this.defaultStartPoint.x;
			this.startPoint.y = this.defaultStartPoint.y;
		} else {
			for (var i = 0; i < this.customStartPoints.length; i++) {
				if(this.customStartPoints[i].id == this.instructions.targetID){
					this.startPoint.x = this.customStartPoints[i].x;
					this.startPoint.y = this.customStartPoints[i].y;
				}
			}
		}
		// console.log(this.startPoint);

		// Create Player
		this.player = new Player(this.game, this.startPoint.x, this.startPoint.y);

		// Init InputClass
		// console.log(this.game);
		// console.log(this.inputClass);
		this.inputClass = new Input(this.game, this.player);
		this.GUICLASS.setPlayer(this.player);


		this.loadItems();
		if(config.enemies) this.loadEnemies();
		
		this.loadPeople();
		this.manageEvents();

		// Create Weather
		this.weather = new Weather(this.game, this.tilemapProperties.weather);

		if (config.night) {
			this.shadowTexture = this.game.add.bitmapData(this.game.width + 300, this.game.height + 300);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
			this.lightSprite.alpha = 0.99;

			this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
			this.characters[0].blendMode = Phaser.blendModes.DARKEN;
		}

		
	}

	loadEntryPoints(){
		let elementsArr = this.findObjectsByType('startPointType', this.map, 'EntryPoints');

		elementsArr.forEach(function(element) {
			if (element.properties.startPointType == 'default') {
				this.defaultStartPoint = {x: element.x, y: element.y};
			}

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
		let elementsArr = this.findObjectsByType('character', this.map, 'People');

		elementsArr.forEach(function(element) {
			if (element.properties.character == 'death') {
				this.characters.push(new Character(this.game, element.x, element.y, this.player));
			}
		}, this);
	}

	loadItems() {
		let elementsArr = this.findObjectsByType('type', this.map, 'Items');

		elementsArr.forEach(function(element) {
			if (element.properties.type == 'key') {
				this.items.push(new Item(this.game, element.x, element.y, 'item', element.properties.id));
			}
		}, this);
	}

	loadEnemies() {

		let elementsArr = this.findObjectsByType('type', this.map, 'Enemies');

		elementsArr.forEach(function(element) {
			if (element.properties.type == 'seed') {
				this.enemies.push(new Enemy(this.game, element.x, element.y, this.player, this.map, this.groundLayer));
			}
		}, this);
	}

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

	updateShadowTexture() {
		this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
		this.shadowTexture.context.fillRect(0, 0, this.game.width + 400, this.game.height + 400);

		var radius = 100 + this.game.rnd.integerInRange(1, 8),
			heroX = this.player.x - this.game.camera.x,
			heroY = this.player.y - this.game.camera.y;

		var gradient = this.shadowTexture.context.createRadialGradient(heroX, heroY, 100 * 0.75, heroX, heroY, radius);
		gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

		this.shadowTexture.context.beginPath();
		this.shadowTexture.context.fillStyle = gradient;
		this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
		this.shadowTexture.context.fill();

		this.shadowTexture.dirty = true;
	}

	update() {

		this.inputClass.update();

		if (this.pathfinder) {
			this.pathfinder.followPath();
		}

		this.game.physics.arcade.collide(this.enemies, this.enemies);
		this.game.physics.arcade.collide(this.enemies, this.player);
		this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

		this.game.physics.arcade.collide(this.characters, this.player);
		this.game.physics.arcade.collide(this.player, this.collisionLayer);
		this.game.physics.arcade.collide(this.player, this.items, this.collisionHandlerItem, null, this);
		this.game.world.bringToTop(this.player);

		// TilemapPlus Physics
		this.map.plus.physics.collideWith(this.player);
		this.map.plus.events.regions.triggerWith(this.player);

		// Update Weather
		this.weather.updateWeather();
		this.GUICLASS.update();

		if (config.night) {
			this.lightSprite.reset(this.game.camera.x - 10, this.game.camera.y - 10);
			this.updateShadowTexture();
		}

		if(this.lockGame){
			this.lockGame.update();
		}
	}

	initMap() {
		// JSON Map Data
		if(this.instructions == undefined){
			this.map = this.game.add.tilemap(config.startMap);
		} else {
			this.map = this.game.add.tilemap(this.instructions.map);
		}

		this.backgroundTileset = this.map.addTilesetImage('Clouds', 'Clouds');
		this.backgroundLayer = this.map.createLayer('Clouds');
		this.backgroundLayer.tint = 0x262626;

		console.log(this.backgroundLayer);
		this.backgroundLayer.scrollFactorX = this.backgroundLayer.scrollFactorY = 0.5;

		//  Connect with Tileset
		this.map.addTilesetImage('Tileset', 'gameTileset2', 36, 36);

		//  Define Layers
		this.groundLayer = this.map.createLayer('BackgroundLayer');
		this.collisionLayer = this.map.createLayer('CollisionLayer');

		//  Resize the world
		this.groundLayer.resizeWorld();

		this.map.setCollisionBetween(0, 20, true, 'CollisionLayer');

		this.tilemapProperties = this.map.plus.properties;
		this.map.plus.animation.enable();
	}

	manageEvents() {
		// Map Events
		this.map.plus.physics.enableObjectLayer('Collision');
		this.map.plus.events.regions.enableObjectLayer('Events');

		// Enter Events
		this.map.plus.events.regions.onEnterAdd(this.player, region => {
			if (region.properties.message) {
				const message_id = region.properties.id;
				const all_messages = Object.values(dialogues.dialogues);
				for (let i = 0; i < all_messages.length; i++) {
					if (i + 1 == message_id) {
						if (this.playedDialogues.includes(message_id)) return;
						const message = all_messages[i];
						this.playedDialogues.push(message_id);
						this.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
						break;
					}
				}
			}

			if (region.properties.bridge) {
				const bridgeID = region.properties.id;
				const requiredID = region.properties.requiredID;
				if (this.activatedBridges.includes(bridgeID)) return;
				if (requiredID !== undefined && !this.itemIDs.includes(requiredID)) return;

				this.bridgebuilder = new Bridgebuilder(
					this.game,
					region,
					this.player,
					this.map,
					this.groundLayer,
					this.collisionLayer
				);

				this.activatedBridges.push(bridgeID);
			}

			if (region.properties.pathfinder) {
				// (game, map, objectToMove, {target.x, target.y}), layer);
				// this.pathfinder = new Pathfinder(this.game, this.map, this.player, {x: 710, y: 316}, this.groundLayer);
				if (this.pathfinder == undefined) {
					this.pathfinder = new Pathfinder(
						this.game,
						this.map,
						this.characters[0],
						{ x: this.player.x, y: this.player.y },
						this.groundLayer,
						false,
						200
					);
					this.game.camera.follow(this.characters[0], Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
					this.player.movable = false;
					this.game.time.events.add(
						Phaser.Timer.SECOND * 3,
						function() {
							this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
							this.player.movable = true;
							this.GUICLASS.createMessage(['Hello!'], false, true);
						},
						this
					);
				}
			}

			if (region.properties.endLevel) {
				this.game.camera.fade(0x000000, 4000);
				this.game.time.events.add(
					Phaser.Timer.SECOND * 5,
					function() {
						this.game.state.restart(true, false);
					},
					this
				);
			}

			if(region.properties.port){
				let targetMap = region.properties.targetMap;
				let targetID = region.properties.targetID;
				if(this.inputClass.stick){
					this.inputClass.stick.destroy();
				}
				this.game.state.restart(true, false, {map: targetMap, targetID: targetID });
			}
		});
	}

	collisionHandlerItem(player, item) {
		this.lockGame = new LockGame(this.game, this.player.x, this.player.y, this.player);
		this.itemIDs.push(item.id);
		item.destroy();
		this.items.splice(item, 1);
	}
}
