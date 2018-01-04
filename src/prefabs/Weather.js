import Phaser from 'phaser';
import config from './../config';

export default class {
	constructor(game, type, backgroundLayer) {
		this.game = game;
		this.currentWeather = type;
		this.backgroundLayer = backgroundLayer;
		this.manager = this.game.plugins.add(Phaser.ParticleStorm);

		if (config.weather) {
			this.createWeather(type);
		}


	}

	createWeather(type) {
		switch (type) {
			case 'Snow':
				this.addSnow();
				break;

			case 'Storm':
				this.addStorm();
				break;

			case 'SnowWind':
				this.addSnowWind();
				break;

			case 'Leaves':
				this.addLeaves();
				break;

			case 'NiceWeather':
				this.addSun();
				break;

			default:
		}
	}

	addSnow() {
		let emitter = game.add.emitter(-500, 0, 400);
		emitter.fixedToCamera = true;
		emitter.width = this.game.camera.width * 2;
		emitter.angle = -10;
		emitter.makeParticles('snow');
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setYSpeed(0, 0.1);
		// emitter.setXSpeed(-1, 1);
		// emitter.maxParticleSpeed = 100;
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
		emitter.start(false, 4600, 5, 0);
	}

	addStorm() {
		this.backgroundLayer.tint = 0x262626;

		// (x, y, maxParticles)
		let emitter = this.game.add.emitter(-500, 0, 400);
		emitter.fixedToCamera = true;
		emitter.width = this.game.camera.width * 2;
		emitter.angle = -30;
		emitter.makeParticles('rain');
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setYSpeed(200, 310);
		emitter.setXSpeed(-5, 5);
		emitter.minRotation = 180;
		emitter.maxRotation = 0;

		// (explode, lifespan, frequency, quantity)
		emitter.start(false, 2500, 1, 0);

		this.lightningBitmap = this.game.add.bitmapData(window.innerWidth, window.innerHeight + 500);
		this.lightning = this.game.add.image(this.game.camera.width / 2, 0, this.lightningBitmap);
		this.lightning.anchor.setTo(0.5, 0.5);

		let randomSecond = this.game.rnd.integerInRange(10, 18)
		this.game.time.events.loop(Phaser.Timer.SECOND * randomSecond, this.zap, this);

		// this.addFog();
		this.addClouds();

	}

	zap() {
		this.lightningBitmap.x = this.game.camera.x;
		this.lightningBitmap.y = this.game.camera.y;
		this.lightning.x = this.game.camera.x;
		this.lightning.y = this.game.camera.y;

		this.createLightningTexture(
			this.game.rnd.integerInRange(this.game.camera.x, this.game.camera.x + this.game.camera.width),
			0,
			45,
			3,
			false
		);

		this.lightning.alpha = 1;

		this.game.add
			.tween(this.lightning)
			.to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
			.to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
			.to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
			.to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
			.to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
			.start();

		this.game.camera.flash(0xffffff, 200);
		this.game.camera.shake(0.005, 500);

	}

	createLightningTexture(x, y, segments, boltWidth, branch) {
		let ctx = this.lightningBitmap.context;
		let width = this.lightningBitmap.width;
		let height = this.lightningBitmap.height;

		if (!branch) ctx.clearRect(0, 0, width, height);

		for (let i = 0; i < segments; i++) {
			ctx.strokeStyle = 'rgb(255, 255, 255)';
			ctx.lineWidth = boltWidth;

			ctx.beginPath();
			ctx.moveTo(x, y);

			if (branch) {
				x += this.game.rnd.integerInRange(-10, 10);
			} else {
				x += this.game.rnd.integerInRange(-30, 30);
			}
			if (x <= 10) x = 10;
			if (x >= width - 10) x = width - 10;

			if (branch) {
				y += this.game.rnd.integerInRange(10, 20);
			} else {
				y += this.game.rnd.integerInRange(20, height / segments);
			}
			if ((!branch && i == segments - 1) || y > height) {
				y = height;
			}

			ctx.lineTo(x, y);
			ctx.stroke();

			if (y >= height) break;

			if (!branch) {
				if (Math.random() * 100 <= 20) {
					this.createLightningTexture(x, y, 10, 1, true);
				}
			}
		}

		this.lightningBitmap.dirty = true;
	}

	addFog(){
		let fog = this.game.add.bitmapData(this.game.width, this.game.height);
 
	    fog.ctx.rect(0, 0, this.game.width, this.game.height);
	    // fog.ctx.fillStyle = '#b2ddc8';
	    fog.ctx.fillStyle = '#000000';
	    fog.ctx.fill();
	 
	    this.fogSprite = this.game.add.sprite(0, 0, fog);
	    this.fogSprite.fixedToCamera = true;
	    this.fogSprite.alpha = 0.6;
	    this.game.add.tween(this.fogSprite).to( { alpha: 0.4 }, 10000, null, true, 0, 0, true);
	}

	addClouds(){
		this.clouds = this.game.add.group(); 
        this.clouds.createMultiple(20, "cloud", 0, true);

        this.clouds.forEach((cloud) => {
        	// cloud.scale.set(this.game.rnd.realInRange(2, 8));
        	cloud.scale.set(2);
        	cloud.x = this.game.world.randomX;
        	cloud.y = this.game.world.randomY;
    	});

        this.game.add.tween(this.clouds.scale).to({
          x: 2,
          y: 2
        }, 60000, "Linear", true, 0, 0, true);

        
	}

	addSnowWind() {
		// let snowparticles = {
		//     image: [ 'snow'],
		//     lifespan: 2000,
		//     vx: { min: -5, max: 5 },
		//     vy: { value: 0, control: [ { x: 0, y: 1 }, { x: 0.3, y: 1 }, { x: 0.9, y: 0.01 }, { x: 1, y: 0 } ] },
		//     scale: {min: 0.1, max: 0.5},
		//     //rotation: { initial: -90, value: 180, control: [ { x: 0, y: 0 }, { x: 0.2, y: 0.5 }, { x: 0.4, y: 1 }, { x: 0.6, y: 0.5 }, { x: 1, y:0 } ] }
		// };
		// this.manager.addData('snow', snowparticles);
		// console.log(this.manager);
		// this.emitter = this.manager.createEmitter();
		// this.emitter.force.y = 0.025;
		// this.emitter.addToWorld();
		// this.emitter.emit('snow', [700, 800], 650, { repeat: -1, frequency: 10 });
		// console.log(this.emitter);
	}

	addLeaves() {
		let snowparticles = {
			image: ['leave'],
			lifespan: 10000,
			vx: { min: -5, max: 5 },
			vy: { value: 0, control: [{ x: 0, y: 1 }, { x: 0.3, y: 1 }, { x: 0.9, y: 0.01 }, { x: 1, y: 0 }] },
			scale: { min: 0.5, max: 2 },
			alpha: { value: 1, delta: 0.005 },
			rotation: {
				initial: -90,
				value: 180,
				control: [{ x: 0, y: 0 }, { x: 0.2, y: 0.5 }, { x: 0.4, y: 1 }, { x: 0.6, y: 0.5 }, { x: 1, y: 0 }]
			}
		};

		this.manager.addData('leaves', snowparticles);
		this.emitter = this.manager.createEmitter();
		this.emitter.force.y = 0.01;
		this.emitter.addToWorld();
		this.emitter.emit('leaves', [this.game.camera.x, this.game.world.width], 0, { repeat: -1, frequency: 200 });
		console.log(this.emitter);
	}

	addSun(){
		
	}

	updateWeather() {
		// console.log(this.currentWeather);
		// if(this.currentWeather == 'Leaves'){
		//     let wind = Math.max(Math.min(wind + (Math.random() - 0.5) * 0.02, 0.05), -0.05);
		//    this.emitter.force.x = wind;
		// }

	}
}
