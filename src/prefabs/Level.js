import Phaser from 'phaser';
import 'phaser-tilemap-plus';
import PhaserEasystar from 'phaser-easystar-ts';
import Player from '../prefabs/Player';
import Enemy from '../prefabs/Enemy';
import Character from '../prefabs/Character';
import Weather from '../prefabs/Weather';
import Bridgebuilder from '../prefabs/Bridgebuilder';
import Input from '../prefabs/Input';
import config from './../config';
import dialogues from './../dialogues';

export default class {
	constructor(game, inputClass, GUIclass, currentLevel) {
		this.game = game;
		this.inputClass = inputClass;
		this.GUICLASS = GUIclass;
		this.currentLevel = currentLevel;

		this.characters = [];
		this.playedDialogues = [];
		this.activatedBridges = [];

		this.loadLevel();
	}

	loadLevel() {
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
		this.inputClass.setPlayer(this.player);
		this.GUICLASS.setPlayer(this.player);

		// Create Enemies
		// this.enemies = [];
		// for (let i = 0; i < 0; i++) {
		//   this.enemies.push(new Enemy(this.game, this.game.rnd.integerInRange(this.game.world.centerX - 50, this.game.world.centerX + 50), this.game.rnd.integerInRange(this.game.world.centerY + 50, this.game.world.centerY - 50), this.player));
		// }

		this.loadItems();
		this.loadPeople();

		// this.pathfinder = new Pathfinder(this.game, this.map, this.player);

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
				if (this.activatedBridges.includes(bridgeID)) return;

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
		});

		this.weather = new Weather(this.game, tilemapProperties.weather);
	}

	loadPeople() {
		let elementsArr = this.findObjectsByType('character', this.map, 'People');

		elementsArr.forEach(function(element) {
			if (element.properties.character == 'death') {
				this.characters.push(new Character(this.game, element.x, element.y, this.player));
			}
		}, this);
	}

	loadItems() {}

	findObjectsByType(targetType, tilemap, layer) {
		let result = [];

		tilemap.objects[layer].forEach(function(element) {
			let container = Object.keys(element.properties).toString();

			if (container == targetType) {
				element.y -= tilemap.tileHeight / 2;
				element.x += tilemap.tileHeight / 2;
				result.push(element);
			}
		}, this);

		return result;
	}

	loadWeather() {}

	update() {
		// this.game.physics.arcade.collide(this.enemies, this.enemies);
		// this.game.physics.arcade.collide(this.enemies, this.player);
		this.game.physics.arcade.collide(this.characters, this.player);
		this.game.physics.arcade.collide(this.player, this.collisionLayer);
		this.game.world.bringToTop(this.player);

		// TilemapPlus Physics
		this.map.plus.physics.collideWith(this.player);
		this.map.plus.events.regions.triggerWith(this.player);

		// Update Weather
		this.weather.updateWeather();
	}
}
