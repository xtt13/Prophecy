/*eslint no-undef: */
// Game Configuration Default w:580, h:280
export default {
	phaserConfig: {
		// width: 1400,
		// height: 800,

		// width: 900,
		// height: 400,

		 //width: 790,
		 //height: 380,

		width: 580,
		height: 280,

		multiTexture: true,

		renderer: Phaser.WEBGL_MULTI,
		antialias: true,
		enableDebug: __DEV__ ? true : false
	},

	localStorageName: 'prophecy',
	weather: true,
	playerHealth: 100,
	scaleRate: 3,
	forceMobile: false,
	night: true,
	enemies: true,
	startMap: 'map1',
	secureLS: false,
	devHour: 11,
	devStartState: 'Game',
	serviceWorker: false,
	allowFastTravel: __DEV__ ? true : false,
	buildMode: false
};
