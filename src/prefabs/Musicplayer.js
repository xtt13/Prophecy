import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;
		this.fadeDuration = 2000;

		this.globalVolume = 0;
		this.fadeVolumeTo = 0.1;
		this.fadeDuration = 2000;
		this.music = this.game.add.audio('track1', this.globalVolume, true);
		this.initMap();
	}

	initMap(key) {
		if (key !== undefined) {
			// console.log(this.music.key, key);
			if (this.music.key !== key) {
				if (this.music.isPlaying) {
					this.music.fadeOut(this.fadeDuration);

					this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
						if (!this.checkCache(key)) {
							this.loadMusic(key);
						}

						this.music = this.game.add.audio(key, this.globalVolume, true);
						this.music.onDecoded.add(() => {
							// this.music.fadeIn(this.fadeDuration, true);
							this.music.play();
							this.game.add
								.tween(this.music)
								.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
						}, this);
					});
				} else {
					if (!this.checkCache(key)) {
						this.loadMusic(key);
					}

					this.music = this.game.add.audio(key, this.globalVolume, true);
					this.music.onDecoded.add(() => {
						this.music.play();
						this.game.add
							.tween(this.music)
							.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
					}, this);
				}
			} else {
				console.log('KEEP IT');
				// this.music.onDecoded.add(() => {
				// this.music.play();
				// this.game.add
				// 		.tween(this.music)
				// 		.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
				// }, this);
			}
		} else {
			console.warn('Key undefined');
		}
	}

	checkCache(key) {
		if (this.game.cache.checkSoundKey(key)) {
			return true;
		} else {
			return false;
		}
	}

	loadMusic(key) {
		this.game.load.audio(key, 'assets/music/' + key + '.mp3');
		this.game.load.start();
		this.game.load.onLoadStart.add(function() {}, this);
		this.game.load.onLoadComplete.add(() => {
			this.music = this.game.add.audio(key, this.globalVolume, true);
			this.music.onDecoded.add(() => {
				// this.music.fadeIn(this.fadeDuration, true);
				this.music.play();
				this.game.add
					.tween(this.music)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
			}, this);
		}, this);
	}
}
