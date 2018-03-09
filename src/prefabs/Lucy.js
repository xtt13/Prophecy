import Phaser from 'phaser';
import config from './../config';

export default class extends Phaser.Sprite {
	constructor(game, x, y, level) {
		super(game, x, y, 'lucy');

		this.game = game;
		this.level = level;
		this.player = this.level.player;
		this.anchor.set(0.5);

		this.speed = 100;

		this.game.physics.enable(this);

		this.tweenSwitch = true;

		let px = this.body.velocity.x;
		let py = this.body.velocity.y;

		px *= -1;
		py *= -1;

		this.customEmitter = this.game.add.emitter(this.x, this.y, 30);
		this.customEmitter.width = 10;
		this.customEmitter.height = 10;
		this.customEmitter.minParticleScale = 1;
		this.customEmitter.maxParticleScale = 2;
		this.customEmitter.gravity = 0.5;
		this.customEmitter.setAlpha(0.5, 1, 1000, null, true);
		// this.customEmitter.setScale(-1, 1, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
		// this.customEmitter.setYSpeed(100);
		// this.customEmitter.setXSpeed(-100, 100);
		this.customEmitter.gravity = 0.5;

		this.customEmitter.minParticleSpeed.set(px, py);
		this.customEmitter.maxParticleSpeed.set(px, py);

		this.customEmitter.makeParticles('blackParticle');
		this.customEmitter.start(false, 1500, 50, 0);

		this.shadow = this.game.add.sprite(this.x, this.y + 30, 'lucyShadow');
		this.shadow.anchor.set(0.5);

		this.shadow.animations.add('shadow', [6, 5, 4, 3, 2, 1, 0], 3, true);
		this.shadow.animations.play('shadow');

		// this.offsetY = this.offsetY + 2;
		// console.log(this.offsetY);

		// this.angle = 90;

		game.add.existing(this);
	}

	update() {
		this.customEmitter.on = true;
		this.customEmitter.x = this.x;
		this.customEmitter.y = this.y;

		this.distanceBetweenLucyPlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if (this.distanceBetweenLucyPlayer > 40) {
			this.shadow.animations.stop();
			this.shadow.x = this.x;
			this.shadow.y = this.y + 30;

			this.tweenSwitch = true;
			if (this.tween) {
				this.tween.stop();
				// this.tween = false;
			}
			if (this.distanceBetweenLucyPlayer > 80) {
				this.game.physics.arcade.moveToObject(this, this.player, 80);
				// console.log('50');
			} else {
				this.game.physics.arcade.moveToObject(this, this.player, 30);
				// console.log('30');
			}
		} else {
			this.shadow.x = this.x;
			this.shadow.y = this.y + 30;
			if (this.tweenSwitch) {
				// this.tweenShadow = this.game.add.tween(this.shadow).to( { y: this.player.y + 10}, 1000, "Linear", true, 0, 0, true).loop();
				this.shadow.animations.play('shadow');
				this.tween = this.game.add
					.tween(this)
					.to({ bottom: this.bottom + 10 }, 1050, 'Linear', true, 0, 0, true)
					.loop();
				this.tweenSwitch = false;
			}

			this.customEmitter.on = false;
			this.body.velocity.set(0);
		}
		// console.log(this.distanceBetweenLucyPlayer);
		// this.angle += 1;

		this.rotation = this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
	}
}
