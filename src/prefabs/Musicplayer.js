import Phaser from 'phaser';

export default class {
	constructor(game) {
		this.game = game;
		this.fadeDuration = 2000;
		this.music = this.game.add.audio('track1', 0.5, true);
		this.initMap();
	}

	initMap(key){
		if(key !== undefined){
			if(this.music.isPlaying){

				console.log('FadeOut');
				this.music.fadeOut(this.fadeDuration);

				this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {

					if(!this.checkCache(key)){
						this.loadMusic(key);
					}

					this.music = this.game.add.audio(key, 0.5, true);
					this.music.onDecoded.add(() => {
						this.music.fadeIn(this.fadeDuration);
					}, this);

				});

			} else {

				if(!this.checkCache(key)){
					this.loadMusic(key);
				}

				this.music = this.game.add.audio(key, 0.5, true);
				this.music.onDecoded.add(() => {
					this.music.fadeIn(this.fadeDuration);
				}, this);
				
			}
		}

	}

	checkCache(key){
		console.log('Check Cache');
		if(this.game.cache.checkSoundKey(key)){
			console.log('In Cache');
			return true;
		} else {
			console.log('Not in Cache');
			return false;
		}
	}

	loadMusic(key){
		console.log('Load: ' + key);
		this.game.load.audio(key, 'assets/music/' + key + '.mp3');
		this.game.load.start();
		this.game.load.onLoadStart.add(function(){
			console.log('Start Loading');
		}, this);
		this.game.load.onLoadComplete.add(() => {
			this.music = this.game.add.audio(key, 0.5, true);
			this.music.onDecoded.add(() => {
				this.music.fadeIn(this.fadeDuration);
			}, this);
		}, this);
	}

}
