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

		// this.angle += 90;

		let px = this.body.velocity.x;
    	let py = this.body.velocity.y;

	    px *= -1;
	    py *= -1;

  

		this.customEmitter = this.game.add.emitter(this.x, this.y, 20);
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
 
		// this.angle = 90;

		
		game.add.existing(this);
	}

	update(){
		this.customEmitter.on = true;
		this.customEmitter.x = this.x;
		this.customEmitter.y = this.y;

		this.distanceBetweenLucyPlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if(this.distanceBetweenLucyPlayer > 40){
			if(this.distanceBetweenLucyPlayer > 80){
				this.game.physics.arcade.moveToObject(this, this.player, 80);
				// console.log('50');
			} else {
				this.game.physics.arcade.moveToObject(this, this.player, 30);
				// console.log('30');
			}
			
		} else {
			this.customEmitter.on = false;
			this.body.velocity.set(0);
		}
		// console.log(this.distanceBetweenLucyPlayer);
		// this.angle += 1;
		
		this.rotation = this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
	}



}
