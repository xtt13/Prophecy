// Game Configuration
export default {
	phaserConfig: {
		// width: 1500,
		width: 580,
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
	enemies: true,
	startMap: 'map3'
};
