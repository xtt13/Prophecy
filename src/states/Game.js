/* globals __DEV__ */
import Phaser from 'phaser';
import Level from '../prefabs/Level';
import GUI from '../prefabs/GUI';

export default class extends Phaser.State {
	init(instruction) {
		if (instruction == undefined) {
			this.instruction = false;
		} else {
			this.instruction = instruction;
		}

		console.log('%c ' + 'GameState' + ' ', 'background: #0061ff; color: #bada55');
	}

	create() {
		// Toggle Fullscreen onclick
		let isSafari =
			navigator.vendor &&
			navigator.vendor.indexOf('Apple') > -1 &&
			navigator.userAgent &&
			!navigator.userAgent.match('CriOS');

		if (!isSafari) {
			this.input.onDown.add(this.toggleFullScreen, this);
			this.input.onTap.add(this.toggleFullScreen, this, null, 'onTap');
		}

		// Set GUIClass
		this.GUI = new GUI(this.game);

		this.level = new Level(this.game, this.GUI, this.instruction);
	}

	update() {
		this.level.update();
	}

	render() {
		// Debugging
		if (__DEV__) {
			this.game.debug.text('Version: 1.1.1', 20, 20, '#00ff00');
			this.game.debug.text(game.time.fps.toString() + " FPS", 20, 40, '#00ff00');
			// this.game.debug.soundInfo(this.level.weather.weatherSound, 20, 50);
			// this.game.debug.soundInfo(this.game.musicPlayer.music, 20, 50);
			// this.game.debug.soundInfo(this.game.soundManager.sound, 20, 50);
			// console.log(this.game.musicPlayer);
			// this.game.debug.spriteInfo(this.level.player, 32, 32);
			// this.game.debug.cameraInfo(this.game.camera, 32, 32);
			// this.level.weather.emitter.debug(20, 200);

			// for (var i = 0; i < this.level.enemies.length; i++) {
			// 	this.game.debug.body(this.level.enemies[i]);
			// }

			// this.game.debug.body(this.level.player);

			// this.game.debug.quadTree(this.game.physics.arcade.quadTree);

			// this.level.inputClass.stick.debug();
			// this.game.debug.body(this.level.enemies);
			// this.game.debug.body(this.level.player);
			this.game.debug.text(this.level.player.health + " HP", 90, 40);
		}
	}

	toggleFullScreen() {
		this.game.scale.startFullScreen(false, false);
	}
}
