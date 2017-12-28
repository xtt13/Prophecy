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
import Item from '../prefabs/Item';
import config from './../config';
import dialogues from './../dialogues';

export default class {
	constructor(game, inputClass, GUIclass, currentLevel) {
		this.game = game;
		// this.inputClass = inputClass;
		// this.inputClass = new Input(this.game);
		this.GUICLASS = GUIclass;
		this.currentLevel = currentLevel;

		this.characters = [];
		this.items = [];
		this.playedDialogues = [];
		this.activatedBridges = [];
		this.itemIDs = [];

		this.night = true;

		this.loadLevel();
	}

	loadLevel() {
		// this.game.stage.backgroundColor = '#a7efff';
		this.game.stage.backgroundColor = 0x000000;

		// JSON Map Data
		this.map = this.game.add.tilemap(this.currentLevel);

		//  Connect with Tileset
		this.map.addTilesetImage('Tileset', 'gameTileset2', 36, 36);

		//  Define Layers
		this.groundLayer = this.map.createLayer('Layer1');
		this.collisionLayer = this.map.createLayer('CollisionLayer');

		//  Resize the world
		this.groundLayer.resizeWorld();

		this.map.setCollisionBetween(0, 20, true, 'CollisionLayer');

		const tilemapProperties = this.map.plus.properties;
		this.map.plus.animation.enable();

		// Create Player
		this.player = new Player(this.game, tilemapProperties.playerStartX, tilemapProperties.playerStartY);

		// Map Player to Inputclass
		this.inputClass = new Input(this.game, this.player);
		// this.inputClass.setPlayer(this.player);
		this.GUICLASS.setPlayer(this.player);

		// Create Enemies
		// this.enemies = [];
		// for (let i = 0; i < 0; i++) {
		//   this.enemies.push(new Enemy(this.game, this.game.rnd.integerInRange(this.game.world.centerX - 50, this.game.world.centerX + 50), this.game.rnd.integerInRange(this.game.world.centerY + 50, this.game.world.centerY - 50), this.player));
		// }

		this.loadItems();
		this.loadPeople();

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
				if(requiredID !== undefined && !this.itemIDs.includes(requiredID)) return;

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
						this.groundLayer
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
		});

		this.weather = new Weather(this.game, tilemapProperties.weather);

		if (this.night) {
			this.shadowTexture = this.game.add.bitmapData(this.game.width + 300, this.game.height + 300);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
			this.lightSprite.alpha = 0.99;
			// this.lightSprite.anchor.set(0.5);

			this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
			// this.characters[0].blendMode = Phaser.blendModes.DARKEN;

		}

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

		var radius = 200 + this.game.rnd.integerInRange(1, 20),
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

		// this.game.physics.arcade.collide(this.enemies, this.enemies);
		// this.game.physics.arcade.collide(this.enemies, this.player);
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

		if (this.night) {
			this.lightSprite.reset(this.game.camera.x - 10, this.game.camera.y - 10);
			this.updateShadowTexture();
		}
	}

	collisionHandlerItem(player, item){
		// this.game.state.restart();
		this.itemIDs.push(item.id);
		item.destroy();
		this.items.splice(item, 1);
	}
}
