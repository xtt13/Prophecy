import Phaser from 'phaser';
import config from './../config';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player) {
		super(game, x, y, 'testman');

		this.game = game;
		this.player = player;
		this.health = 100;
		this.anchor.setTo(0.5);

		this.game.physics.enable(this);
		this.body.setSize(10, 15, 18, 20);
		this.body.immovable = true;
		this.body.drag.set(90);

		game.add.existing(this);
	}

	update() {
		// console.log(this.game.physics.arcade.distanceBetween(this, this.player));
		// if(this.game.physics.arcade.distanceBetween(this, this.player) < 100 && this.game.physics.arcade.distanceBetween(this, this.player) > 40){
		//   this.game.physics.arcade.moveToObject(this, this.player, 30);
		// }
		// console.log(Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y)));
		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
		// if(angle == 1 || angle == 2 || angle == -0){
		//   this.scale.set(-1, 1);
		//   // console.log('flip left');
		// } else {
		//   this.scale.set(1, 1);

		//   // console.log('flip right');
		// }
		if (angle == 2) {
			this.game.world.bringToTop(this);
		}
	}
}