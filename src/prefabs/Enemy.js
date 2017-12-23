import Phaser from 'phaser';
import config from './../config';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player) {
		super(game, x, y, 'enemy');

		this.game = game;
		this.player = player;
		this.health = 100;
		this.anchor.setTo(0.5);
		// this.scale.set(-5);

		this.animations.add('walk', [0, 1, 2, 3, 4], 5, true);
		this.animations.play('walk');

		this.game.physics.enable(this);
		this.body.setSize(10, 6, 5, 7);

		game.add.existing(this);
	}

	update() {
		// console.log(this.game.physics.arcade.distanceBetween(this, this.player));
		if (
			this.game.physics.arcade.distanceBetween(this, this.player) < 100 &&
			this.game.physics.arcade.distanceBetween(this, this.player) > 40
		) {
			this.game.physics.arcade.moveToObject(this, this.player, 30);
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
		if (angle == 2) {
			this.game.world.bringToTop(this);
		}
	}
}
