import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import DeltaStormState from './states/DeltaStorm';
import MainMenuState from './states/MainMenu';
import PreloadState from './states/Preload';
import GameState from './states/Game';
import CreditsState from './states/Credits';

import config from './config';

class Game extends Phaser.Game {
	constructor() {
		let isSafari =
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
