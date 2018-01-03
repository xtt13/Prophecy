// Game Configuration
export default {
	phaserConfig: {
		width: 480,
		height: 280,
		renderer: Phaser.AUTO,
		antialias: true,
		multiTexture: false,
		enableDebug: true
	},

	localStorageName: 'prophecy',
	weather: true,
	playerHealth: 5,
	scaleRate: 3,
	forceMobile: false,
	night: true,
	enemies: true,
	startMap: 'map2'
};
