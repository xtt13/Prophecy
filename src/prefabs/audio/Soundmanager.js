import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;
		this.fadeDuration = 2000;

		this.globalVolume = 0;
		this.fadeVolumeTo = 0.5;

		// this.secureSwitch = false;
	}

	initSound(properties, start, fadeDuration, night){

		

		// Set Values
		this.fadeDuration = fadeDuration;
		
		if(night && properties.athmoSound !== 'AtmoWindRain'){
			this.key = properties.athmoSoundNight;
		} else {
			this.key = properties.athmoSound;
		}

		this.start = true;


		// Checks
		if (this.start !== undefined && !this.start) return;
		if (this.key == undefined) return;
		if(this.sound == undefined){
			this.playSound(this.key);
			console.log('this.sound is not defined');
			return;
		}

		// Continue if same key
		if (this.sound.key == this.key) {
			console.log('Continue Sound');
			return;
		}

		// FadeOut on empty string
		if(this.key == ''){
			console.log('Empty String -> Fade out && destroy!');
				if (this.sound && this.sound.isPlaying) {
					this.sound.allowMultiple = false;
					this.sound.fadeOut(this.fadeDuration);
					
					return;
				}
		}

		// If Music isPlaying -> Fade Out -> FadeIn
		this.fadeOutFadeIn(this.key);

	}

	playSound(key){
		if (!this.checkCache(key)) {
			// Load music and play it
			this.loadSound(key);
		} else {
			// Play music from cache
			this.sound = this.game.add.audio(key, this.globalVolume, true);
			this.sound.allowMultiple = false;
			this.sound.onDecoded.add(() => {
				this.sound.play();
				console.log('play');
				this.game.add
					.tween(this.sound)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);
			}, this);
		}
	}

	fadeOutFadeIn(key){
		this.sound.fadeOut(2000);

		this.sound.onFadeComplete.add(() => {
			console.log('Fade Out Sound Complete Fade In!');
			if(this.sound){
				this.sound.destroy();
				this.sound = null;	
			}
			

			this.playSound(key);

			console.log(this.sound);
		}, this);
	}

	fadeOut() {
			this.sound.fadeOut(2000);

			this.sound.onFadeComplete.add(() => {
				console.log('Fade Out Sound Complete Destroy!');
				this.sound.destroy();
				this.sound = undefined;	
			}, this);
	}

	checkCache(key) {
		if (this.game.cache.checkSoundKey(key)) {
			return true;
		} else {
			return false;
		}
	}

	

	loadSound(key) {
		console.log('Load Sound');
		this.game.load.audio(key, 'assets/sounds/' + key + '.mp3');
		this.game.load.start();
		// this.game.load.onLoadStart.add(function() {}, this);
		this.game.load.onLoadComplete.add(() => {
			this.sound = this.game.add.audio(key, this.globalVolume, true);
			this.sound.allowMultiple = false;
			this.sound.onDecoded.add(() => {
				// this.sound.fadeIn(this.fadeDuration, true);

				this.sound.play();
				this.sound.volume = 0;
				console.log('Loaded Sound play');
				this.volumeTween = this.game.add
					.tween(this.sound)
					.to({ volume: this.fadeVolumeTo }, this.fadeDuration, Phaser.Easing.Linear.None, true);

			}, this);
		}, this);
	}
}

