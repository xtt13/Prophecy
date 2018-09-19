import Phaser from 'phaser';
import 'phaser-tilemap-plus';


export default class extends Phaser.State {
	init() {
		// Boot Log
		console.log('%c Boot it up! ', 'background: #0061ff; color: #bada55');
		// localStorage.clear();
	}

	create() {
		// Game Scaling
		this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;

		// enable crisp rendering
		// this.game.renderer.renderSession.roundPixels = true;
		this.game.time.advancedTiming = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		// Add Tilemap Plus Plugin
		this.game.plugins.add(Phaser.Plugin.TilemapPlus);

		// Start Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Enable Pixel Rendering
		this.stage.smoothed = false;

		// if(typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1) {
		// 	PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
		// 	// Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
		// }

		// Don't pause on lost focus
		// this.stage.disableVisibilityChange = true;

		// this.game.time.desiredFps = 100;
		// this.game.forceSingleUpdate = true;

		// Start the Preload State
		this.state.start('Preload');
	}

	preload() {
		// this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		this.load.image('carinaFont', 'assets/fonts/carinaFont.png');
		this.load.image('instructions', 'assets/sprites/gui/instructions.png');
		this.load.image('preloadBar', 'assets/sprites/gui/preloadBar.png');
	}
}
