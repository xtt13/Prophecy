import Phaser from 'phaser';
import config from './../config';

export default class extends Phaser.Sprite {
	constructor(game, x, y, gameData, safe) {
		super(game, x, y, 'player');

		this.game = game;
		this.gameData = gameData;
		this.health = gameData.playerHealth;
		this.safe = safe;
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

		enemy.destroy();

		this.player.health -= 10;
		this.gameData.playerHealth = this.player.health;
		this.game.camera.flash(0xc10000, 200);

		if(this.player.health <= 0){
			this.gameData.playerHealth = 100;
			this.safe.saveGameConfig(this.gameData);
			this.game.state.restart(true, false, {map: this.currentMap, targetID: this.lastTargetID });
		}
	}
}
