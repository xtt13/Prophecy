import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import DeltaStormState from './states/DeltaStorm';
import MainMenuState from './states/MainMenu';
// import NameState from './states/Name';
import PreloadState from './states/Preload';
import GameState from './states/Game';
import CreditsState from './states/Credits';

import config from './config';

import "script-loader!../src/plugins/particle-storm.min.js";
import "script-loader!../src/plugins/phaser-virtual-joystick.min.js";


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
		this.state.add('Credits', CreditsState, false);
		this.state.add('Game', GameState, false);

		document.addEventListener('contextmenu', event => event.preventDefault());

		if (!window.cordova) {
			this.state.start('Boot');
		}
	}
}

// window.onload = function() {

// };

window.game = new Game();



if(config.serviceWorker) {

	// SERVICE WORKER
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js');
	};

}

// if (window.cordova) {
// 	var app = {
// 		initialize: function() {
// 			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
// 		},

// 		// deviceready Event Handler
// 		onDeviceReady: function() {
// 			this.receivedEvent('deviceready');

// 			// When the device is ready, start Phaser Boot state.
// 			window.game.state.start('Boot');
// 		},

// 		receivedEvent: function(id) {
// 			console.log('Received Event: ' + id);
// 		}
// 	};

// 	app.initialize();
// }