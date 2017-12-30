/* globals __DEV__ */
import Phaser from 'phaser';
import Level from '../prefabs/Level';
import GUI from '../prefabs/GUI';

export default class extends Phaser.State {
	init() {
		console.log('%c ' + 'GameState' + ' ', 'background: #0061ff; color: #bada55');
	}

	create() {
		// Toggle Fullscreen onclick
		this.input.onDown.add(this.toggleFullScreen, this);
		this.input.onTap.add(this.toggleFullScreen, this, null, 'onTap');

		this.GUI = new GUI(this.game);

		// Später mit unique Tileset auf JSON verknüpfen
		this.level = new Level(this.game, this.inputClass, this.GUI, 'map1');
		// this.inputClass.checkController();
	}

	update() {

		this.level.update();

	}

	render() {
		// Debugging
		if (__DEV__) {
			this.game.debug.text(game.time.fps.toString(), 20, 20, '#00ff00');
			// this.game.debug.spriteInfo(this.level.player, 32, 32);
			// this.game.debug.cameraInfo(this.game.camera, 32, 32);
			// this.level.weather.emitter.debug(20, 200);

			// for (var i = 0; i < this.level.enemies.length; i++) {
			// 	game.debug.body(this.level.enemies[i]);
			// }

			// game.debug.body(this.level.enemies);
		}
	}

	toggleFullScreen() {
		this.game.scale.startFullScreen(false, false);
	}
}
