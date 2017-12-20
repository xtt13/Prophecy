// Game Configuration
export default {

  phaserConfig: {
	width: window.innerWidth,
	height: window.innerHeight,
	renderer: Phaser.AUTO,
	antialias: true,
	multiTexture: false,
	enableDebug: true
  },

  localStorageName: 'prophecy',
  weather: false,
  playerHealth: 5,
  scaleRate: 3

};
