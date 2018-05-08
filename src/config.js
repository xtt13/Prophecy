/*eslint no-undef: */
// Game Configuration w:580, h:280
export default {
	phaserConfig: {
		width: 900,
		// width: 580,
		height: 400,
		// height: 280,
		renderer: Phaser.AUTO,
		antialias: true,
		multiTexture: false,
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
	secureLS: false
};
