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
		this.game.soundManager.initSound('AtmoWindRain');

		this.menuText = this.game.add.bitmapText(
			this.game.camera.width / 2,
			this.game.camera.height / 2,
			'pxlfont',
			'PROPHECY',
			51
		);
		this.menuText.anchor.set(0.5);

		this.subText = this.game.add.bitmapText(
			this.game.camera.width / 2,
			this.game.camera.height / 2 + 80,
			'pxlfont',
			'Click To Move On',
			10
		);
		this.subText.smoothed = false;
		this.subText.anchor.set(0.5);

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
			if (this.playOnce) return;
			this.playOnce = true;
			this.game.camera.fade(0x000000, 4000, true);
			this.startSound = game.add.audio('startGame', 0.3);
			this.startSound.play();
			this.game.add.tween(this.subText).to({ alpha: 0 }, 2000, Phaser.Easing.Back.Out, true);
			this.game.time.events.add(Phaser.Timer.SECOND * 4, () => {
				this.state.start('Game', true, false);
			});
		}, this);

		this.input.gamepad.start();
		this.pad1 = this.game.input.gamepad.pad1;
		this.pad1.addCallbacks(this, {
			onConnect: () => {
				if (typeof ipc !== 'undefined' && this.pad1.connected) {
					let myNotification = new Notification('Input', {
						body: '🎮 New Controller Connected',
						silent: true
					});
				}
				this.subText.text = 'Press A-Button To Move On';
			}
		});
	}

	preload() {}

	update() {
		if (!this.pad1.connected) {
			this.subText.text = 'Click To Move On';
		} else {
			// this.gamepadbuttonA = this.pad1.getButton(Phaser.Gamepad.XBOX360_A);
			// console.log(this.gamepadbuttonA);
			// this.gamepadbuttonA.events.onInputUp.add(()=>{
			// 	// this.game.scale.startFullScreen(false, false);
			// 	console.log('hello');
			// });
		}

		if (this.game.input.gamepad.supported) {
			this.pad1 = this.game.input.gamepad.pad1;

			if (this.notificationSwitch) {
				if (typeof ipc !== 'undefined' && this.pad1.connected) {
					let myNotification = new Notification('Input', {
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
					this.startSound = game.add.audio('startGame', 0.3);
					this.startSound.play();
					this.game.add.tween(this.subText).to({ alpha: 0 }, 2000, Phaser.Easing.Back.Out, true);
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
