import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;
		this.loadMusic();
	}

	// Load Tracks via Ajax when needed!
	loadMusic() {
		this.game.load.audio('track1', 'assets/music/test1.mp3');
		this.game.load.start();

		this.game.load.onFileComplete.add(() => {
			// console.log('New Files Loaded');
			this.music = this.game.add.audio('track1');
  			this.music.volume = 0.01;
  			this.music.play();

		}, this);

	}

	// Play with Fade!
	play(key) {
		this.music.play(key);
	}

	// Fade out and stop!
	fadeOut() {}
}
