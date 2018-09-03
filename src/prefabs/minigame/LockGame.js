import Phaser from 'phaser';
import EnergyStone from '../gamemechanics/EnergyStone';

export default class {
	constructor(game, x, y, player, chest, level, properties) {
		this.game = game;
		this.x = x;
		this.y = y;
		this.player = player;
		this.chest = chest;
		this.level = level;
		this.properties = properties;

		this.successQuestID = this.properties.successQuestID;
		this.removeQuestID = this.properties.removeQuestID;
		this.ifQuestID = this.properties.ifQuestID;

		// this.bgColors = [0x62bd18, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2, 0x588c7e, 0x8c4646];
		// this.tintColor = game.rnd.pick(this.bgColors);

		this.rotationSpeed = 3;
		this.maxAngleDifference = 10;
		this.scaleRate = 0.25;
		this.dead = false;
		this.run = true;
		this.firstSetup = true;
		this.currentTry = 1;
		this.moving = false;

		// if(this.ifQuestID !== undefined && !this.level.questManager.checkIfQuestExists(this.ifQuestID)) return;

		this.lockPickSound = this.game.add.audioSprite('sfxLockPick');

		this.setupGame();
	}

	setupGame() {
		this.player.movable = false;

		this.ring = this.game.add.sprite(this.x, this.y, 'LockGameRing');
		this.ring.anchor.set(0.5);
		this.ring.smoothed = false;
		// this.ring.alpha = 0.5;
		// this.ring.scale.set(this.scaleRate);

		this.ball = this.game.add.sprite(this.x, this.y, 'LockGameBall');
		this.ball.anchor.set(0.5);
		this.ball.ballAngle = -90;
		this.ball.smoothed = false;
		// this.ball.scale.set(this.scaleRate);

		this.placeBall();

		this.bar = this.game.add.sprite(this.x - 12, this.y + 23, 'LockGameBar');
		this.bar.anchor.set(0, 0.5);
		this.bar.angle = -90;
		this.bar.crossingBall = false;
		this.bar.smoothed = false;
		this.bar.rotationDirection = 0;
		// this.bar.scale.set(this.scaleRate);

		this.firstTry = this.game.add.sprite(this.x - 42, this.y + 29, 'LockGameBar');
		this.firstTry.angle = -90;
		this.firstTry.anchor.set(0.5);
		// this.firstTry.ballAngle = -90;
		// this.firstTry.scale.set(this.scaleRate);

		this.secondTry = this.game.add.sprite(this.x - 12, this.y + 29, 'LockGameBar');
		this.secondTry.angle = -90;
		this.secondTry.anchor.set(0.5);
		// this.secondTry.ballAngle = -90;
		// this.secondTry.scale.set(this.scaleRate);

		this.thirdTry = this.game.add.sprite(this.x + 18, this.y + 29, 'LockGameBar');
		this.thirdTry.angle = -90;
		this.thirdTry.anchor.set(0.5);
		// this.thirdTry.ballAngle = -90;
		// this.thirdTry.scale.set(this.scaleRate);

		if (this.firstSetup) {
			this.ring.alpha = 0;
			this.ball.alpha = 0;
			this.bar.alpha = 0;

			this.firstTry.alpha = 0;
			this.secondTry.alpha = 0;
			this.thirdTry.alpha = 0;

			this.game.add.tween(this.ring).to({ alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.bar).to({ alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.ball).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

			this.game.add.tween(this.firstTry).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.secondTry).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.thirdTry).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

			// this.game.add.tween(this.player).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

			this.player.body.immovable = true;
			this.firstSetup = false;
		}

		// this.game.input.onDown.add(this.startMoving, this);
	}

	placeBall() {
		this.ball.x = 100;
		do {
			this.newAngle = this.game.rnd.angle();
		} while (this.angleDifferenceFunc(this.newAngle, this.ball.ballAngle) < 40);

		this.ball.ballAngle = this.newAngle;
		this.ball.x = this.ring.x + 88 * Math.cos(Phaser.Math.degToRad(this.ball.ballAngle));
		this.ball.y = this.ring.y + 88 * Math.sin(Phaser.Math.degToRad(this.ball.ballAngle));
		this.ball.rotation = this.game.physics.arcade.angleBetween(this.ball, this.ring) + 1.5;
	}

	startMoving() {
		this.dead = false;
		this.moving = true;
		// this.game.input.onDown.remove(this.startMoving, this);
		// this.game.input.onDown.add(this.changeDirection, this);
		this.bar.rotationDirection = 1;
		this.lockPickSound.play('roll', 2);
	}

	changeDirection() {
		this.angleDifference = Math.abs(this.ball.ballAngle - this.bar.angle);
		if (this.angleDifference > this.maxAngleDifference) {
			// this.fail();
		} else {
			switch (this.currentTry) {
				case 1:
					this.lockPickSound.play('win');
					this.firstTry.tint = 0x00ff11;
					this.currentTry = 2;
					this.rotationSpeed = 4;
					break;

				case 2:
				this.lockPickSound.play('win');
					this.secondTry.tint = 0x00ff11;
					this.currentTry = 3;
					this.rotationSpeed = 5;
					break;

				case 3:
					this.thirdTry.tint = 0x00ff11;
					this.run = false;

					this.game.add.tween(this.ring).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
					this.game.add.tween(this.bar).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
					this.game.add.tween(this.ball).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

					this.game.add.tween(this.firstTry).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
					this.game.add.tween(this.secondTry).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
					this.game.add.tween(this.thirdTry).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

					// this.game.add.tween(this.player).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

					this.player.body.immovable = false;
					this.player.movable = true;
					this.chest.animations.play('open');
					this.lockPickSound.stop('roll');
					this.chestSound = this.game.add.audioSprite('sfxChest');
					this.chestSound.play('open', 1);

					this.game.time.events.add(500, () => {
						this.energyStone = new EnergyStone(this.game, this.chest.x + 18, this.chest.y - 15, this.level, this.chest);
					}, this);
					
					

					if(this.successQuestID !== undefined){
						this.level.questManager.addQuest(this.successQuestID);
					}

					if(this.removeQuestID !== undefined){
						this.level.questManager.removeQuest(this.removeQuestID);
					}

					break;

				default:
			}

			this.bar.crossingBall = false;
			this.bar.rotationDirection *= -1;
			this.placeBall();
		}
	}

	update() {
		if(this.level.inputClass.button_E.isDown){
			// if(this.ifQuestID !== undefined && !this.level.questManager.checkIfQuestExists(this.ifQuestID)) return;

			if(this.moving && !this.dead){
				this.changeDirection();
			} else {
				this.startMoving();
			}
			
		}

		if (this.run) {
			this.bar.angle += this.rotationSpeed * this.bar.rotationDirection;
			this.angleDifference = Math.abs(this.ball.ballAngle - this.bar.angle);

			if (this.angleDifference < this.maxAngleDifference && !this.bar.crossingBall) {
				this.bar.crossingBall = true;
			}

			if (this.angleDifference > this.maxAngleDifference && this.bar.crossingBall) {
				this.fail();
			}
		}
	}

	fail() {
		this.lockPickSound.stop('roll');
		this.lockPickSound.play('break');
		this.bar.rotationDirection = 0;
		this.bar.tint = 0xff0000;
		this.dead = true;
		this.currentTry = 1;
		this.rotationSpeed = 3;

		this.game.camera.flash(0xff0000, 200);

		if (window.navigator.vibrate !== undefined && 'vibrate' in window.navigator) {
			window.navigator.vibrate(500);
		}

		this.bar.destroy();
		this.ring.destroy();
		this.ball.destroy();

		this.firstTry.destroy();
		this.secondTry.destroy();
		this.thirdTry.destroy();

		this.setupGame();
	}

	angleDifferenceFunc(a1, a2) {
		return Math.abs((a1 + 180 - a2) % 360 - 180);
	}
}
