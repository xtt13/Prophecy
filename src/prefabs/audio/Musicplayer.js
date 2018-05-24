import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;
		this.fadeDuration = 2000;

		this.globalVolume = 0;
		this.fadeVolumeTo = 0.5;
	}

	initMap(properties, start, fadeDuration){

		// Set Values
		this.fadeDuration = fadeDuration;
		this.key = properties.music;
		this.start = start;

		// Checks
		if (this.start !== undefined && !this.start) return;
		if (this.key == undefined) return;
		if(this.game.music == undefined){
			this.playMusic(this.key);
			return;
		}

		// Continue if same key
		if (this.game.music.key == this.key) {
			console.log('Continue Music');
			return;
		}

		// FadeOut on empty string
		if(this.key == ''){
			console.log('Empty String -> Fade out && destroy!');
				if (this.game.music && this.game.music.isPlaying) {
					this.game.music.fadeOut(this.fadeDuration);
					
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
			this.game.music = this.game.add.audio(key, this.globalVolume, true);
			this.game.music.allowMultiple = false;
			this.game.music.onDecoded.add(() => {
				this.game.music.play();
				this.game.add
					.tween(this.game.music)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
			}, this);
		}
	}

	fadeOutFadeIn(key){
		this.game.music.fadeOut(2000);

		this.game.music.onFadeComplete.add(() => {
			console.log('Fade Out Complete Fade In!');
			this.game.music.destroy();
			this.game.music = undefined;	

			this.playMusic(key);
		}, this);
	}

	fadeOut() {
			this.game.music.fadeOut(2000);

			this.game.music.onFadeComplete.add(() => {
				console.log('Fade Out Complete Destroy!');
				this.game.music.destroy();
				this.game.music = undefined;	
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
			this.game.music = this.game.add.audio(key, this.globalVolume, true);
			this.game.music.allowMultiple = false;
			this.game.music.onDecoded.add(() => {
				// this.game.music.fadeIn(this.fadeDuration, true);
				this.game.music.play();
				this.game.add
					.tween(this.game.music)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
			}, this);
		}, this);
	}
}
