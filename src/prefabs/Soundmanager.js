import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;

		this.fadeDuration = 2000;
		this.globalVolume = 0;
		this.fadeVolumeTo = 1;
		this.fadeDuration = 2000;

		this.sound = this.game.add.audio('AtmoWindRain', this.globalVolume, true);
	}

	initSound(key) {
		console.log('A');
		if (key !== undefined) {
			if(key !== ""){
			console.log('B');
			if (this.sound.key !== key) {
				console.log('C');
				if (this.sound.isPlaying) {
					this.sound.fadeOut(this.fadeDuration);

					this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
						if (!this.checkCache(key)) {
							this.loadSound(key);
						}

						this.sound = this.game.add.audio(key, this.globalVolume, true);
						this.sound.onDecoded.add(() => {
							// this.music.fadeIn(this.fadeDuration, true);
							this.sound.play();
							this.game.add
								.tween(this.sound)
								.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
						}, this);
					});
				} else {
					if (!this.checkCache(key)) {
						this.loadSound(key);
					}

					// this.sound = this.game.add.audio(key, this.globalVolume, true);
					// this.sound.onDecoded.add(() => {
					// 	this.sound.play();
					// 	this.game.add
					// 		.tween(this.sound)
					// 		.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
					// }, this);
				}
			} else {
				this.sound = this.game.add.audio('AtmoWindRain', this.globalVolume, true);
				this.sound.onDecoded.add(() => {
				this.sound.play();
				this.game.add
						.tween(this.sound)
						.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
				}, this);
			}
		} else {
			if(this.sound.isPlaying){
				this.sound.fadeOut(this.fadeDuration);
			}
		}
		} else {
			console.warn('SoundKey undefined');
			// this.sound.stop();
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
		this.game.load.start();
		this.game.load.onLoadStart.add(function() {}, this);
		this.game.load.onLoadComplete.add(() => {
			this.sound = this.game.add.audio(key, this.globalVolume, true);
			this.sound.onDecoded.add(() => {
				// this.sound.fadeIn(this.fadeDuration, true);
				this.sound.play();
				this.game.add
					.tween(this.sound)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
			}, this);
		}, this);
	}
}
