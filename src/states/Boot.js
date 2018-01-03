import Phaser from 'phaser';
import 'phaser-tilemap-plus';

export default class extends Phaser.State {
	init() {
		// Boot Log
		console.log('%c Boot it up! ', 'background: #0061ff; color: #bada55');
	}

	create() {
		const mobile = this.isMobileDevice();
		if (!mobile) {
			this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.pageAlignVertically = true;
			this.game.scale.pageAlignHorizontally = true;
		} else {
			this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.pageAlignVertically = true;
			this.game.scale.pageAlignHorizontally = true;
		}

		// enable crisp rendering
		this.game.renderer.renderSession.roundPixels = true;
		this.game.time.advancedTiming = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		this.game.plugins.add(Phaser.Plugin.TilemapPlus);

		// Start Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Init Gamepads
		this.input.gamepad.start();

		// Enable Pixel Rendering
		this.stage.smoothed = false;

		// Start the Preload State
		this.state.start('Preload');
	}

	isMobileDevice() {
		return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
	}
}
