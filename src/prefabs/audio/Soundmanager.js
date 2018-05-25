import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;

		this.fadeDuration = 2000;
		this.globalVolume = 0;
		this.fadeVolumeTo = 1;
		this.fadeDuration = 2000;

		this.secureSwitch = false;
	}

	initSound(key) {
		// If Key is not undefined
		if (key !== undefined) {
			console.log('SoundKey is not undefined!');

			// If Key is not a empty string
			if (key !== '') {
				console.log('SoundKey is not a empty string!');

				// If Sound is currently playing
				if (this.sound && this.sound.isPlaying && this.sound.key !== key) {
					// Fade it out
					this.sound.fadeOut(this.fadeDuration);

					// Wait
					this.game.time.events.add(Phaser.Timer.SECOND * (this.fadeDuration / 1000), () => {
						// Check if sound is in cache
						if (!this.checkCache(key)) {
							// Load Sound and play it
							this.loadSound(key);
						} else {
							// Play sound from cache
							this.sound = this.game.add.audio(key, this.globalVolume, true);
							this.sound.onDecoded.add(() => {
								this.sound.play();
								this.game.add
									.tween(this.sound)
									.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
							}, this);
						}
					});
				} else {
					// Initalize Sound
					// Check if sound is in cache
					if (!this.checkCache(key)) {
						// Load Sound and play it
						this.loadSound(key);
					} else {
						// Play sound from cache
						this.sound = this.game.add.audio(key, this.globalVolume, true);
						this.sound.onDecoded.add(() => {
							this.sound.play();
							this.game.add
								.tween(this.sound)
								.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
						}, this);
					}
				}
			} else {
				// If no sound is defined -> Fade out!
				console.log('Empty String -> Fade out!');
				if (this.sound && this.sound.isPlaying) {
					this.sound.fadeOut(this.fadeDuration);
				}
			}
		} else {
			console.warn('SoundKey undefined');
		}
	}

	checkCache(key) {
		if (this.game.cache.checkSoundKey(key)) {
			return true;
		} else {
			return false;
		}
	}

	loadSound(key) {
		this.game.load.audio(key, 'assets/sounds/' + key + '.mp3');
		// this.game.load.start();
		// this.game.load.onLoadStart.add(function() {}, this);
		this.game.load.onLoadComplete.add(() => {
			this.sound = this.game.add.audio(key, this.globalVolume, true);
			this.sound.onDecoded.add(() => {
				if (this.secureSwitch) return;
				this.secureSwitch = true;

				this.sound.play();
				this.game.add
					.tween(this.sound)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
				this.game.time.events.add(
					300,
					() => {
						this.secureSwitch = false;
				}, this);
			}, this);
		}, this);
	}

	fadeOut() {
		if (this.sound && this.sound.isPlaying) {
			this.sound.fadeOut(3000);
			this.game.time.events.add(Phaser.Timer.SECOND * (3000 / 1000), () => {
				this.sound.destroy();
				this.sound = undefined;
			});
		}
	}
}
