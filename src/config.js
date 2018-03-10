// Game Configuration
export default {
	phaserConfig: {
		// width: 800,
		width: 580,
		// height: 500,
		height: 280,
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
	enemies: false,
	startMap: 'map3',
	lucy: false,
	secureLS: false
};
