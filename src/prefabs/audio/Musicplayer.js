import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;
		this.fadeDuration = 2000;

		this.globalVolume = 0;
		this.fadeVolumeTo = 1;
	}

	initMap(properties, start, fadeDuration){

		// Set Values
		this.fadeDuration = fadeDuration;
		this.key = properties.music;
		this.start = start;

		// Checks
		if (this.start !== undefined && !this.start) return;
		if (this.key == undefined) return;
		if(this.music == undefined){
			this.playMusic(this.key);
			return;
		}

		// Continue if same key
		if (this.music.key == this.key) {
			console.log('Continue Music');
			return;
		}

		// FadeOut on empty string
		if(this.key == ''){
			console.log('Empty String -> Fade out && destroy!');
				if (this.music && this.music.isPlaying) {
					this.music.fadeOut(this.fadeDuration);
					
					return;
				}
		}

		// If Music isPlaying -> Fade Out -> FadeIn
		this.fadeOutFadeIn(this.key);

	}

	playMusic(key){
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

	fadeOutFadeIn(key){
		this.music.fadeOut(2000);

		this.music.onFadeComplete.add(() => {
			console.log('Fade Out Complete Fade In!');
			this.music.destroy();
			this.music = undefined;	

			this.playMusic(key);
		}, this);
	}

	fadeOut() {
			this.music.fadeOut(2000);

			this.music.onFadeComplete.add(() => {
				console.log('Fade Out Complete Destroy!');
				this.music.destroy();
				this.music = undefined;	
			}, this);
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
