import Phaser from 'phaser';

export default class extends Phaser.State {
	init() {
		// Boot Log
		// console.log('%c Boot it up! ', 'background: #0061ff; color: #bada55');
	}

	create() {
		this.notificationSwitch = true;
		this.startSwitch = true;
		this.playOnce = false;

		this.game.camera.flash(0x000000, 3000);
		

		// this.menuText = this.game.add.bitmapText(
		// 	this.game.camera.width / 2,
		// 	this.game.camera.height / 2,
		// 	'pxlfont',
		// 	'PROPHECY',
		// 	51
		// );
		// this.menuText.anchor.set(0.5);

		this.logo = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2 - 10, 'logo');
		this.logo.anchor.set(0.5);
		// this.logo.scale.setTo(0.2);
		this.logo.smoothed = false;

		// this.subText = this.game.add.bitmapText(
		// 	this.game.camera.width / 2,
		// 	this.game.camera.height / 2 + 107,
		// 	'pxlfont',
		// 	'Click To Move On',
		// 	10
		// );
		// this.subText.smoothed = false;
		// this.subText.anchor.set(0.5);

		this.subText = this.game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
		// this.subText.text = 'Click To Move On';
		this.subText.setText('Click!', true, -1, 5, 'left', true)
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			this.subText.text = 'Mobile Version coming soon!';
		}
		this.fontImage = this.game.add.image(this.game.camera.width / 2 - 15, this.game.camera.height / 2 + 107, this.subText);

		// this.variation2();

		var chosenValue = this.game.rnd.integerInRange(0, 3);

		switch (chosenValue) {
			case 0:
				this.variation1();
				break;

			case 1:
			this.variation2();
				break;

			case 2:
			this.variation3();
				break;

			case 3:
			this.variation4();
				break;
		
			default:
				break;
		}

		


		let isSafari =
			navigator.vendor &&
			navigator.vendor.indexOf('Apple') > -1 &&
			navigator.userAgent &&
			!navigator.userAgent.match('CriOS');

		if (!isSafari && typeof ipc == 'undefined') {
			this.input.onDown.add(this.toggleFullScreen, this);
			this.input.onTap.add(this.toggleFullScreen, this, null, 'onTap');
		}

		this.input.onDown.add(function() {
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) return;
			if (this.playOnce) return;
			this.playOnce = true;

			if(this.sfxheartbeat !== undefined){
				this.sfxheartbeat.fadeOut();
			}
			this.game.camera.fade(0x000000, 4000, true);
			this.startSound = this.game.add.audio('startGame', 0.3);
			this.startSound.play();
			this.game.add.tween(this.fontImage).to({ alpha: 0 }, 2000, Phaser.Easing.Back.Out, true);
			this.game.time.events.add(Phaser.Timer.SECOND * 4, () => {
				this.state.start('Game', true, false);
			});
		}, this);

		this.input.gamepad.start();
		this.pad1 = this.game.input.gamepad.pad1;
		this.pad1.addCallbacks(this, {
			onConnect: () => {
				if (typeof ipc !== 'undefined' && this.pad1.connected) {
					// let myNotification = 
					new Notification('Input', {
						body: '🎮 New Controller Connected',
						silent: true
					});
				}
				this.subText.text = 'Press A-Button To Move On';
			}
		});
		
	}


	variation1() {

		this.game.soundManager.initSound({athmoSound: 'AtmoWindRain'}, true, 2000);

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
		emitter.gravity = 200;
		emitter.start(false, 2500, 1, 0);

		this.autumnGlimmerEmitter = this.game.add.emitter(-500, 0, 150);
		this.autumnGlimmerEmitter.fixedToCamera = true;
		this.autumnGlimmerEmitter.width = this.game.world.bounds.width;
		this.autumnGlimmerEmitter.height = this.game.world.bounds.height;
		this.autumnGlimmerEmitter.minParticleScale = 0.1;
		this.autumnGlimmerEmitter.maxParticleScale = 0.5;
		this.autumnGlimmerEmitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
		this.autumnGlimmerEmitter.setYSpeed(300);
		this.autumnGlimmerEmitter.setXSpeed(-300, 300);
		this.autumnGlimmerEmitter.minParticleScale = 0.25;
		this.autumnGlimmerEmitter.maxParticleScale = 1;
		this.autumnGlimmerEmitter.gravity = 0.5;
		this.autumnGlimmerEmitter.minRotation = 25;
		this.autumnGlimmerEmitter.setAlpha(0.5, 1);
		this.autumnGlimmerEmitter.makeParticles('glimmerParticle');
		this.autumnGlimmerEmitter.start(false, 5000, 5, 0);

	}

	variation2(){

		this.game.soundManager.initSound({athmoSound: 'AxTemple'}, true, 2000);
		
		this.addVillageGlimmer = this.game.add.emitter(this.game.camera.width/2, this.game.camera.height/2, 600);
		this.addVillageGlimmer.width = this.game.camera.width * 2;
		this.addVillageGlimmer.height = this.game.camera.height * 2;
		this.addVillageGlimmer.minParticleScale = 5;
		this.addVillageGlimmer.gravity = 0;
		this.addVillageGlimmer.setYSpeed(-4, 4);
		this.addVillageGlimmer.setXSpeed(-4, 4);
		this.addVillageGlimmer.maxRotation = 0;
		this.addVillageGlimmer.minRotation = 0;
		this.addVillageGlimmer.setAlpha(0, 1, 4000, Phaser.Easing.Exponential.In, true);
		this.addVillageGlimmer.makeParticles('particle');
		this.addVillageGlimmer.start(false, 10000, 5, 0);
	}

	variation3(){
		this.game.soundManager.initSound({athmoSound: 'AxBotanic'}, true, 2000);
		this.sfxheartbeat = this.game.add.audio('sfxheartbeat', 0.05);
		this.sfxheartbeat.loop = true;
		this.sfxheartbeat.play();


		this.tweenTint(this.subText, 0xFFFFFF, 0x49ffc5, 850);

		this.manager = this.game.plugins.add(Phaser.ParticleStorm);
		
		var data = {
			lifespan: 3000,
			// red: { min: 200, max: 255 },
			// green: 50,
			// blue: { min: 200, max: 255 },

			red: 73,
			green: 255,
			blue: 197,

			// alpha: { initial: 0, value: 1, control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ] }

			alpha: {min: 0.5, max: 1},

			
			// vx: { min: 1, max: 0 },
			// vy: { min: 1, max: 1 }
		};

		this.manager.addData('basic', data);

		var line = this.manager.createLineZone(0, -30, this.game.camera.width, -30);

		//  This creates a Pixel Renderer.
		//  It works by rendering just pixels (it can't render images or textures)
		//  The red, green and blue properties of the particle data control the
		//  color of the pixel particles.
	
		this.emitter = this.manager.createEmitter(Phaser.ParticleStorm.PIXEL, new Phaser.Point(0, 0.03));
	
		//  The autoClear property tells the Pixel emitter to not clear ifself before
		//  rendering. You can then clear it yourself via renderer.clear() (see the update method)
		this.emitter.renderer.autoClear = false;
	
		this.emitter.renderer.pixelSize = 1;
	
		this.emitter.addToWorld();
	
		this.emitter.emit('basic', 0, 0, { zone: line, total: 1, repeat: -1, frequency: 1000 });
	

	}

	variation4(){
		this.game.soundManager.initSound({athmoSound: 'AtmoWaterStill'}, true, 2000);
		this.templeFliesEmitter = this.game.add.emitter(this.logo.x - 40, this.logo.y + 40, 100);
		// emitter.fixedToCamera = true;
		this.templeFliesEmitter.width = 100;
		this.templeFliesEmitter.height = 200;
		this.templeFliesEmitter.angle = -10;
		this.templeFliesEmitter.minParticleScale = 0.1;
		this.templeFliesEmitter.maxParticleScale = 0.5;
		// emitter.maxParticleSpeed.setTo(2, 2);

		this.templeFliesEmitter.setYSpeed(2, 6);
		this.templeFliesEmitter.setXSpeed(10, -10);

		this.templeFliesEmitter.gravity = 0.5;
		this.templeFliesEmitter.minRotation = 0;
		this.templeFliesEmitter.maxRotation = 0;
		this.templeFliesEmitter.setAlpha(0.7, 1, 1000, Phaser.Easing.Exponential.In, true);
		this.templeFliesEmitter.makeParticles('fly');
		this.templeFliesEmitter.start(false, 5000, 5, 0);
	}

	tweenTint(obj, startColor, endColor, time) {    
		// create an object to tween with our step value at 0    
		var colorBlend = {step: 0};    
		// create the tween on this object and tween its step property to 100    
		var colorTween = this.game.add.tween(colorBlend).to({step: 100}, time, Phaser.Easing.Bounce.Out, true, 0, 0, true).loop();        
		// run the interpolateColor function every time the tween updates, feeding it the    
		// updated value of our tween each time, and set the result as our tint    
		colorTween.onUpdateCallback(function() {      
			obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
		});        
		// set the object to the start color straight away    
		obj.tint = startColor;            
		// start the tween    
		colorTween.start();
	}

	preload() {}

	update() {
		if (!this.pad1.connected) {
			this.subText.text = 'Click!';
		} else {
			// this.gamepadbuttonA = this.pad1.getButton(Phaser.Gamepad.XBOX360_A);
			// console.log(this.gamepadbuttonA);
			// this.gamepadbuttonA.events.onInputUp.add(()=>{
			// 	// this.game.scale.startFullScreen(false, false);
			// 	console.log('hello');
			// });
		}

		if(this.addVillageGlimmer){
			this.game.world.bringToTop(this.addVillageGlimmer);
		}

		if(this.templeFliesEmitter){
			this.game.world.bringToTop(this.templeFliesEmitter);
		}

		if(this.manager){
			// this.game.world.bringToTop(this.logo);
			
			this.emitter.renderer.clear(0.01);
			// this.logo.reset(this.game.camera.width / 2, this.game.camera.height / 2);
			// this.logo.resetFrame();
			// this.subText.resetFrame();
			this.game.world.bringToTop(this.logo);
			this.game.world.bringToTop(this.subText);
			
		}

		if (this.game.input.gamepad.supported) {
			this.pad1 = this.game.input.gamepad.pad1;

			if (this.notificationSwitch) {
				if (typeof ipc !== 'undefined' && this.pad1.connected) {
					// let myNotification = 
					new Notification('Input', {
						body: '🎮 New Controller Connected',
						silent: true
					});
					this.subText.text = 'Press A-Button To Move On';
					this.notificationSwitch = false;
				}
			}

			if (this.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
				if (this.startSwitch) {
					this.startSwitch = false;
					this.game.camera.fade(0x000000, 4000, true);
					this.startSound = this.game.add.audio('startGame', 0.3);
					this.startSound.play();
					this.game.add.tween(this.fontImage).to({ alpha: 0 }, 2000, Phaser.Easing.Back.Out, true);
					this.game.time.events.add(Phaser.Timer.SECOND * 4, () => {
						this.state.start('Game', true, false);
					});
				}
			}
		}
	}

	toggleFullScreen() {
		this.game.scale.startFullScreen(false, false);
	}
}
