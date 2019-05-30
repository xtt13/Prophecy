import Phaser from 'phaser';
import Pathfinder from './../gamemechanics/Pathfinder';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'enemy');

		this.game = game;
		this.player = player;
		this.map = map;
		this.type = properties.type;
		this.layer = layer;
		this.dropItemID = properties.dropItemID;
		this.itemType = properties.itemType;
		this.jumpDown = properties.jumpDown;
		// console.log(properties);
		this.killQuestID = properties.killQuestID;

		this.health = 1;
		this.dead = false;
		this.paralyze = false;
		this.attackSoundSwitch = true;

		this.finderCall = true;
		this.closeSpeed = this.game.rnd.integerInRange(100, 150);
		this.farSpeed = this.game.rnd.integerInRange(200, 400);

		this.startMoving = false;

		this.anchor.setTo(0.5);

		this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, true);
		this.animations.add('wait', [0], 15, true);
		this.animations.add('idle', [10, 11, 12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 10, true);

		this.scale.set(1, 1);
		this.game.time.events.add(Phaser.Timer.SECOND * this.game.rnd.integerInRange(1, 3), () => {
			// if(this.game.rnd.integerInRange(0, 1)){
			// 	this.scale.set(1, 1);
			// }
			this.animations.play('idle');
		}, this);


		this.game.physics.enable(this);

		this.body.setSize(13, 10, 5, 7);
		this.body.bounce.set(1);
		this.body.drag.set(1500);
		// this.body.enable = false;

		if (this.jumpDown) {
			this.startTween = this.game.add
				.tween(this)
				.from({ y: this.game.camera.height }, 1500, Phaser.Easing.Bounce.Out, true);

			this.startTween.onStart.add(() => {
				this.game.time.events.add(2000, () => {
					// this.game.camera.shake(0.005, 500);
					this.startMoving = true;
				});
			}, this);

			this.startTween.onComplete.add(() => {
				// this.body.enable = true;
				// this.startMoving = true;
			}, this);
		} else {
			// this.body.enable = true;
			this.startMoving = true;
		}

		game.add.existing(this);
	}

	update() {
		if (this.dead) return;
		if (this.paralyze) {
			this.animations.play('wait');
			return;
		}

		this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if (this.distanceBetweenEnemiePlayer < 120) {

			// if (this.distanceBetweenEnemiePlayer < 100) {
			// 	this.animations.play('walk');
			// 	this.game.physics.arcade.moveToObject(this, this.player, 150);
			// } else {
			// 	this.animations.play('walk');
			// 	this.game.physics.arcade.moveToObject(this, this.player, this.closeSpeed);
			// }


			let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
			if (angle == 1 || angle == 2 || angle == 0) {
				this.scale.set(-1, 1);
				// console.log('flip left');
			} else {
				this.scale.set(1, 1);
				// console.log('flip right');
			}

			if (this.attackSoundSwitch) {
				this.attackSoundSwitch = false;
				this.rndVoice = this.game.rnd.pick(['vx1', 'vx2', 'vx3', 'vx4', 'vx5', 'vx6', 'vx7', 'vx8', 'vx9', 'vx10', 'vx11', 'vx12', 'vx13', 'vx14', 'vx15']);
				this.voice = this.game.add.audioSprite('VxSeeds');
				this.voice.play(this.rndVoice, 0.1);
				this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
					this.attackSoundSwitch = true;
				}, this);
			}



			this.finderCall = true;

			if (this.pathfinder) {
				this.pathfinder.pathToFollow.length = 0;
			}

			this.game.physics.arcade.moveToObject(this, this.player.body, this.closeSpeed);

			// console.log(this.animations.currentAnim.currentFrame.index);

			if (this.animations.currentAnim.name == "idle") {
				this.animations._anims.idle.stop();
			}

			this.animations.play('walk');





		}

		if (this.distanceBetweenEnemiePlayer > 120 && this.distanceBetweenEnemiePlayer < 400 && this.finderCall) {
			// console.log('Calculate');

			if (this.animations.currentAnim.name == "idle") {
				this.animations._anims.idle.stop();
			}

			if (this.attackSoundSwitch) {
				this.attackSoundSwitch = false;
				this.rndVoice = this.game.rnd.pick(['vx1', 'vx2', 'vx3', 'vx4', 'vx5', 'vx6', 'vx7', 'vx8', 'vx9', 'vx10', 'vx11', 'vx12', 'vx13', 'vx14', 'vx15']);
				this.voice = this.game.add.audioSprite('VxSeeds');
				this.voice.play(this.rndVoice, 0.1);
				this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
					this.attackSoundSwitch = true;
				}, this);
			}

			let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
			if (angle == 1 || angle == 2 || angle == 0) {
				this.scale.set(-1, 1);
				// console.log('flip left');
			} else {
				this.scale.set(1, 1);
				// console.log('flip right');
			}


			this.pathfinder = new Pathfinder(
				this.game,
				this.map,
				this,
				{ x: this.player.x, y: this.player.y },
				this.layer,
				true,
				this.farSpeed,
				this
			);
			this.finderCall = false;
		}

		if (this.pathfinder && this.startMoving) {
			this.animations.play('walk');
			this.pathfinder.followPath();
		}


	}
}
