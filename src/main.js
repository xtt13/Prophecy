import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import DeltaStormState from './states/DeltaStorm';
import MainMenuState from './states/MainMenu';
import PreloadState from './states/Preload';
import GameState from './states/Game';

import config from './config';

require('script-loader!../src/plugins/particle-storm.min.js');
require('script-loader!../src/plugins/phaser-virtual-joystick.min.js');
require('script-loader!../src/plugins/slick-ui.min.js');

class Game extends Phaser.Game {
	constructor() {
		var isSafari =
			navigator.vendor &&
			navigator.vendor.indexOf('Apple') > -1 &&
			navigator.userAgent &&
			!navigator.userAgent.match('CriOS');
		if (isSafari) {
			super(480, 280, Phaser.CANVAS, true, false, true);
		} else {
			super(config.phaserConfig);
		}

		this.state.add('Boot', BootState, false);
		this.state.add('Preload', PreloadState, false);
		this.state.add('DeltaStorm', DeltaStormState, false);
		this.state.add('MainMenu', MainMenuState, false);
		this.state.add('Game', GameState, false);

		// with Cordova with need to wait that the device is ready so we will call the Boot state in another file
		if (!window.cordova) {
			this.state.start('Boot');
		}
	}
}

window.game = new Game();

if (window.cordova) {
	var app = {
		initialize: function() {
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		},

		// deviceready Event Handler
		onDeviceReady: function() {
			this.receivedEvent('deviceready');

			// When the device is ready, start Phaser Boot state.
			window.game.state.start('Boot');
		},

		receivedEvent: function(id) {
			console.log('Received Event: ' + id);
		}
	};

	app.initialize();
}
