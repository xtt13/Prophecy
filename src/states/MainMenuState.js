import Phaser from 'phaser';

export default class extends Phaser.State {
	init() {
		// Boot Log
		// console.log('%c Boot it up! ', 'background: #0061ff; color: #bada55');
	}

	create() {

		this.game.camera.flash(0x000000, 10000);
		this.game.soundManager.initSound('AtmoWindRain');

		this.menuText = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2, 'pxlfont', 'PROPHECY', 51);
		this.menuText.anchor.set(0.5);

		this.menuText = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2 + 80, 'pxlfont', 'Click To Move On', 10);
		this.menuText.anchor.set(0.5);
		

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

		if (!isSafari) {
			this.input.onDown.add(this.toggleFullScreen, this);
			this.input.onTap.add(this.toggleFullScreen, this, null, 'onTap');
		}

		this.input.onDown.add(function(){
			this.state.start('Game', true, false);
		}, this);
	}

	preload() {
	}

	toggleFullScreen() {
		this.game.scale.startFullScreen(false, false);
	}
}
