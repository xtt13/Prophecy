import Phaser from 'phaser';
import config from './../config';
import Pathfinder from './Pathfinder';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer) {
		super(game, x, y, 'enemy');

		this.game = game;
		this.player = player;
		this.health = 100;
		this.anchor.setTo(0.5);
		this.map = map;
		this.layer = layer;

		this.finderCall = true;
		// this.scale.set(-5);

		this.animations.add('walk', [0, 1, 2, 3, 4], 5, true);
		this.animations.play('walk');

		this.game.physics.enable(this);
		// this.body.setSize(10, 6, 5, 7);
		this.body.setSize(13, 10, 5, 7);

		game.add.existing(this);
	}

	update() {
		// console.log(Math.ceil(this.game.physics.arcade.distanceBetween(this, this.player)));
		if (this.game.physics.arcade.distanceBetween(this, this.player) < 100) {
			this.game.physics.arcade.moveToObject(this, this.player, 50);
			this.finderCall = true;
			if (this.pathfinder) {
				this.pathfinder.pathToFollow.length = 0;
			}
		}

		if (this.game.physics.arcade.distanceBetween(this, this.player) < 400 && this.finderCall) {
			console.log('call');

			this.pathfinder = new Pathfinder(
				this.game,
				this.map,
				this,
				{ x: this.player.x, y: this.player.y },
				this.layer,
				true,
				300,
				this
			);
			this.finderCall = false;
		}

		if (this.pathfinder) {
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
		if (angle == 2) {
			this.game.world.bringToTop(this);
		}
	}
}
