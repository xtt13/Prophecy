/* globals __DEV__ */
import Phaser from 'phaser';
import Level from '../prefabs/core/Level';
import config from '../config';

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
		// // iOS & Safari Check
		// let isSafari =
		// 	navigator.vendor &&
		// 	navigator.vendor.indexOf('Apple') > -1 &&
		// 	navigator.userAgent &&
		// 	!navigator.userAgent.match('CriOS');

		// if (!isSafari) {
		// 	this.input.onDown.add(this.toggleFullScreen, this);
		// 	// this.input.onTap.add(this.toggleFullScreen, this, null, 'onTap');
		// }

		this.level = new Level(this.game, this.instruction);

		// window.onbeforeunload = function(e) {
		// 	console.log('LKDSJFLSDKFJ');
		// 	// var dialogText = 'Dialog text here';
		// 	// e.returnValue = dialogText;
		// 	// return dialogText;
		// };


	}

	update() {
		this.level.update();
	}

	paused() {
		console.log('PAUSED');
	}

	resumed() { }

	render() {
		// Debugging

		if (config.phaserConfig.enableDebug) {
			// this.game.debug.currentAlpha = 0.2;

			// this.game.debug.text('Version: 1.5.4', 20, 20, '#00ff00', '10px Pixeled');
			if (config.showFPS) {

				this.game.debug.text(this.game.time.fps.toString() + ' FPS', 95, 30, '#00ff00', '10px Pixeled');
			}


			// DEBUG SOUND
			// this.game.debug.soundInfo(this.level.weather.weatherSound, 20, 50);
			// this.game.debug.soundInfo(this.game.musicPlayer.music, 20, 50);
			// this.game.debug.soundInfo(this.game.soundManager.sound, 20, 50);

			// DEBUG SPRITE
			// this.game.debug.spriteInfo(this.level.GUICLASS.cursor, 32, 50);

			// DEBUG CAMERA
			// this.game.debug.cameraInfo(this.game.camera, 32, 32);

			// DEBUG WEATHER
			// this.level.weather.emitter.debug(20, 200);

			// DEBUG ENEMIES
			// for (var i = 0; i < this.level.enemies.length; i++) {
			// 	this.game.debug.body(this.level.enemies[i]);
			// }

			// this.game.debug.body(this.level.levelBuilder.endBossHead);

			// DEBUG PEOPLE BODY
			// for (var i = 0; i < this.level.characters.length; i++) {
			// 	this.game.debug.body(this.level.characters[i]);
			// }

			// this.game.debug.body(this.level.chests[0]);

			// DEBUG ITEMS
			// for (var i = 0; i < this.level.items.length; i++) {
			// 	this.game.debug.body(this.level.items[i]);
			// }

			// DEBUG POINTER
			// this.game.debug.pointer(this.game.input.activePointer );

			// DEBUG Player
			// this.game.debug.body(this.level.player);
			// this.game.debug.spriteInfo(this.level.player, 32, 32);

			// OTHER
			// this.game.debug.quadTree(this.game.physics.arcade.quadTree);
			// this.level.inputClass.stick.debug();
			// this.game.debug.text('Player z-depth: ' + this.level.player.z, 20, 60);
			// this.game.debug.text(this.level.player.health + ' HP', 90, 40, '#00ff00', '10px Pixeled');


		}
	}

	toggleFullScreen() {
		this.game.scale.startFullScreen(false, false);
	}
}