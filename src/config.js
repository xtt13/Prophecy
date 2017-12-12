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
  weather: true,
  playerHealth: 5

};
