import Phaser from 'phaser';
import config from './../../config';
import Pathfinder from './../gamemechanics/Pathfinder';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'enemy');

		this.game = game;
		this.player = player;
		this.map = map;
		this.layer = layer;
		this.dropItemID = properties.dropItemID;
		this.itemType = properties.itemType;
		this.jumpDown = properties.jumpDown;
		// console.log(properties);
		this.killQuestID = properties.killQuestID;

		this.health = 100;
		this.finderCall = true;
		this.closeSpeed = this.game.rnd.integerInRange(10, 70);
		this.farSpeed = this.game.rnd.integerInRange(400, 600);

		this.startMoving = false;

		this.anchor.setTo(0.5);

		this.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
		this.animations.add('idle', [0], 1, true);
		this.animations.play('walk');

		this.game.physics.enable(this);

		this.body.setSize(13, 10, 5, 7);
		this.body.bounce.set(1);
		this.body.drag.set(200);
		// this.body.enable = false;

		if (this.jumpDown) {
			this.startTween = this.game.add
				.tween(this)
				.from({ y: this.game.camera.height }, 1500, Phaser.Easing.Bounce.Out, true);

			this.startTween.onStart.add(() => {
				this.game.time.events.add(500, () => {
					// this.game.camera.shake(0.005, 500);
				});
			}, this);

			this.startTween.onComplete.add(() => {
				// this.body.enable = true;
				this.startMoving = true;
			}, this);
		} else {
			// this.body.enable = true;
			this.startMoving = true;
		}

		game.add.existing(this);
	}

	update() {
		this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if (this.distanceBetweenEnemiePlayer < 120) {
			if (this.distanceBetweenEnemiePlayer < 100) {
				this.animations.play('walk');
				this.game.physics.arcade.moveToObject(this, this.player, 150);
			} else {
				this.animations.play('walk');
				this.game.physics.arcade.moveToObject(this, this.player, this.closeSpeed);
			}

			this.finderCall = true;
			if (this.pathfinder) {
				this.pathfinder.pathToFollow.length = 0;
			}
		}

		if (this.distanceBetweenEnemiePlayer > 120 && this.distanceBetweenEnemiePlayer < 300 && this.finderCall) {
			console.log('Calculate');

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
			this.pathfinder.followPath();
		}

		// console.log(Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y)));
		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
		if (angle == 1 || angle == 2 || angle == -0) {
			this.scale.set(-1, 1);
			// console.log('flip left');
		} else {
			this.scale.set(1, 1);
			// console.log('flip right');
		}
	}
}
