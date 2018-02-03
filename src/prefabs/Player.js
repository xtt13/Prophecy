import Phaser from 'phaser';
import Item from '../prefabs/Item';
import LockGame from '../prefabs/LockGame';
import config from './../config';

export default class extends Phaser.Sprite {
	constructor(game, x, y, level) {
		super(game, x, y, 'player');

		this.game = game;
		this.level = level;
		this.gameData = this.level.gameData;
		this.health = this.gameData.playerHealth;
		this.safe = this.level.safe;
		this.movable = true;
		this.anchor.setTo(0.5);
		this.playerSpeed = 130;

		this.animations.add('idle', [0, 1, 2, 3], 5, true);
		this.animations.add('run', [4, 5, 6, 7, 8, 9], 10, true);

		this.animations.play('idle');

		this.game.physics.enable(this);
		this.body.setSize(8, 22, 15, 20);

		this.game.camera.roundPx = false;
		this.game.renderer.renderSession.roundPixels = true;
		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 1);

		this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
			console.log('peng');
			this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.04, 0.04);
		});

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
		if (enemy.itemType !== undefined && enemy.itemType == 'key') {
			console.log(enemy.dropItemID);
			let properties = {};
			properties.id = enemy.dropItemID;
			this.items.push(new Item(this.game, enemy.x, enemy.y + 40, 'item', properties));
		}

		if (enemy.killQuestID !== undefined) {
			this.questManager.checkKillCondition(enemy.killQuestID);
		}

		this.player.health -= 10;
		this.gameData.playerHealth = this.player.health;
		this.safe.setGameConfig(this.gameData);
		this.game.camera.flash(0xc10000, 200);

		if (this.player.health <= 0) {
			this.gameData.playerHealth = 100;
			this.safe.setGameConfig(this.gameData);

			if (this.inputClass.stick) {
				this.inputClass.stick.alpha = 0;
				this.inputClass.stick.enabled = false;
			}

			this.game.state.restart(true, false, {
				map: this.currentMap,
				targetID: this.lastTargetID,
				restartType: 'revive'
			});
		}

		enemy.destroy();

		// enemy.body.velocity.x = player.body.velocity.x;
		// enemy.body.velocity.y = player.body.velocity.y;
	}

	collideWithItem(player, item) {
		// this.lockGame = new LockGame(this.game, this.player.x, this.player.y, this.player);

		console.log(item);

		if (!this.itemIDs.includes(item.id)) {
			this.itemIDs.push(item.id);
			this.safe.setItemIDs(this.itemIDs);
		}

		if (item.removeQuestID !== undefined) {
			console.log('Remove');
			this.questManager.removeQuest(item.removeQuestID);
		}

		if (item.questID !== undefined) {
			if (this.questManager.checkIfQuestExists(item.questID)) return;

			let quest = {
				questID: item.questID,
				questMessage: item.questMessage,
				questKillEnemyType: undefined,
				questDeadEnemies: undefined,
				questKillEnemyAmount: undefined
			};

			this.questManager.addQuest(quest);

			console.log('Questupdate');
			this.GUICLASS.createNotification('quest', 'Questupdate');
		}

		item.destroy();
		this.items.splice(item, 1);
	}
}
