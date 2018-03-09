import Phaser from 'phaser';
import Safe from '../core/Safe';

export default class {
	constructor(game) {
		this.game = game;
		this.fadeDuration = 2000;

		this.globalVolume = 0;
		this.fadeVolumeTo = 1;
	}

	initMap(properties, start, fadeDuration) {
		this.fadeDuration = fadeDuration;
		let key = properties.music;

		if (start !== undefined && !start) return;

		// If Key is not undefined
		if (key !== undefined) {
			console.log('MusicKey is not undefined!');

			// If Key is not a empty string
			if (key !== '') {
				console.log(key);
				console.log(this.music);
				console.log('MusicKey is not a empty string!');

				// If music is currently playing
				if (this.music !== undefined && this.music.isPlaying) {
					console.log(this.music.key, key);

					if (this.music !== undefined && this.music.key == key) {
						console.log('LET THE MUSIC CONTINUE OO');
						return;
					}

					console.log('THIS SHOULD NOT FOLLOW IN LET THE MUSIC CON');

					// Fade it out
					this.music.fadeOut(this.fadeDuration);

					// Wait
					this.game.time.events.add(Phaser.Timer.SECOND * (this.fadeDuration / 1000), () => {
						// Check if music is in cache
						if (!this.checkCache(key)) {
							// Load music and play it
							this.loadMusic(key);
						} else {
							// Play music from cache
							this.music = this.game.add.audio(key, this.globalVolume, true);
							this.music.allowMultiple = false;
							this.music.onDecoded.add(() => {
								this.music.play();
								this.game.add
									.tween(this.music)
									.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
							}, this);
						}
					});
				} else {
					if (this.music !== undefined && this.music.key == key) {
						console.log(this.music.key, key);
						console.log('LET THE MUSIC CONTINUE');
						return;
					}

					console.log('INIT MUSIC');

					// Initalize music
					// Check if music is in cache
					if (!this.checkCache(key)) {
						// Load music and play it
						this.loadMusic(key);
					} else {
						// Play music from cache
						this.music = this.game.add.audio(key, this.globalVolume, true);
						this.music.allowMultiple = false;
						this.music.onDecoded.add(() => {
							this.music.play();
							this.game.add
								.tween(this.music)
								.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
						}, this);
					}
				}
			} else {
				// If no music is defined -> Fade out!
				console.log('Empty String -> Fade out!');
				console.log(key);
				if (this.music && this.music.isPlaying) {
					this.music.fadeOut(this.fadeDuration);

					this.game.time.events.add(Phaser.Timer.SECOND * (this.fadeDuration / 1000), () => {
						console.log('DESTROY');
						this.music.destroy();
						this.music = undefined;
					});
				}
			}
		} else {
			console.warn('MusicKey undefined');
		}
	}

	fadeOut() {
		if (this.music && this.music.isPlaying) {
			this.music.fadeOut(3000);
			this.game.time.events.add(Phaser.Timer.SECOND * (3000 / 1000), () => {
				this.music.destroy();
				this.music = undefined;
			});
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
			this.music.allowMultiple = false;
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
