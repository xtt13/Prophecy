import Phaser from 'phaser';
import Item from '../prefabs/Item';
import LockGame from '../prefabs/LockGame';
import config from './../config';

export default class extends Phaser.Sprite {
	constructor(game, x, y, level) {
		super(game, x, y, 'player');

		this.game = game;
		this.level = level;
		console.log(this.level);
		this.gameData = this.level.gameData;
		this.health = this.gameData.playerHealth;
		this.safe = this.level.safe;
		this.movable = true;
		this.anchor.setTo(0.5);
		this.playerSpeed = 130;

		this.animations.add('idle', [0, 1, 2, 3, 4], 5, true);
		this.animations.play('idle');

		this.game.physics.enable(this);
		this.body.setSize(8, 20, 18, 20);

		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);

		game.add.existing(this);
	}

	walk(direction, speed) {
		if (this.movable) {
			//console.log("Direction: " + direction + ", Speed: " + speed);

			switch (direction) {
				case 'up':
					this.body.velocity.y = -this.playerSpeed;
					break;

				case 'down':
					this.body.velocity.y = this.playerSpeed;
					break;

				case 'idle':
					this.body.velocity.y = 0;
					break;

				default:
					this.body.velocity.y = 0;
			}

			switch (direction) {
				case 'left':
					this.body.velocity.x = -this.playerSpeed;
					break;

				case 'right':
					this.body.velocity.x = this.playerSpeed;
					break;

				case 'idle':
					this.body.velocity.x = 0;
					break;

				default:
					this.body.velocity.x = 0;
			}

			// if(direction == 'left'){
			// 	this.body.velocity.x = -this.playerSpeed;
			// } else if(direction == 'right'){
			// 	this.body.velocity.x = this.playerSpeed;
			// }

			// if(direction == 'up'){
			// 	this.body.velocity.y = -this.playerSpeed;
			// } else if(direction == 'down'){
			// 	this.body.velocity.y = this.playerSpeed;
			// }
			
		} else {
			this.body.velocity.set(0);
		}
	}

	idle(direction) {
		if (direction == 'x') {
			this.body.velocity.x = 0;
		} else if (direction == 'y') {
			this.body.velocity.y = 0;
		} else {
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
	}

	fight() {}

	getDamage(enemy, player) {
		if(enemy.itemType !== undefined && enemy.itemType == 'key'){
			this.items.push(new Item(this.game, enemy.x, enemy.y + 40, 'item', enemy.dropItemID));
		}

		enemy.destroy();

		this.player.health -= 10;
		this.gameData.playerHealth = this.player.health;
		this.game.camera.flash(0xc10000, 200);

		if(this.player.health <= 0){
			this.gameData.playerHealth = 100;
			this.safe.setGameConfig(this.gameData);
			this.game.state.restart(true, false, {map: this.currentMap, targetID: this.lastTargetID });
		}
	}

	collideWithItem(player, item){
		this.lockGame = new LockGame(this.game, this.player.x, this.player.y, this.player);
		
		if(!this.itemIDs.includes(item.id)){
			this.itemIDs.push(item.id);
			this.safe.setItemIDs(this.itemIDs);
			this.GUICLASS.createNotification("item", "Quest Update ...");
		}
		
		item.destroy();
		this.items.splice(item, 1);
	}
}
