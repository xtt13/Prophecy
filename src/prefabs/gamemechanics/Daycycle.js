import Phaser from 'phaser';
import config from './../../config';

// From Dusk Till Dawn
export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.night = false;

		this.createDayCycle();
	}

	createDayCycle() {
		if (this.level.dayCycle) {
			this.shadowTexture = this.game.add.bitmapData(this.game.width + 200, this.game.height + 200);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

			this.time = new Date();
			// console.log('NACHT');

			/*eslint no-undef: */
			if (__DEV__) {
				this.timeValue = config.devHour;
				
				// this.timeValue = this.time.getHours();
			} else {
				this.timeValue = this.time.getHours();
			}

			if (this.timeValue >= 0 && this.timeValue < 6) {
				console.log('Night');

				this.night = true;

				this.lightSprite.alpha = 0.85;

				// Tint Clouds
				this.level.backgroundLayer.tint = 0x000000;

				// for (var i = 0; i < this.level.characters.length; i++) {
				// 	this.level.characters[i].tint = 0x999999;
				// }

				if (this.level.weather.clouds) {
					this.level.weather.clouds.alpha = 0;
				}
			} else if (this.timeValue >= 6 && this.timeValue < 8) {
				console.log('Dawn');

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.7;

				this.night = false;
				// this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if (this.level.weather.clouds) {
					this.level.weather.clouds.forEach(cloud => {
						cloud.tint = 0x383838;
					});
				}
			} else if (this.timeValue >= 8 && this.timeValue < 18) {
				console.log('Day');

				this.night = false;

				// Normal Player Tint: 16777215

				this.lightSprite.alpha = 0;
			} else if (this.timeValue >= 18 && this.timeValue < 21) {
				console.log('Dusk');

				this.night = false;

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.7;
				// this.level.player.tint = 0x454545;
				
				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if (this.level.weather.clouds) {
					this.level.weather.clouds.forEach(cloud => {
						cloud.tint = 0x383838;
					});
				}
			} else if (this.timeValue >= 21 && this.timeValue < 24) {
				console.log('Night');
				this.night = true;

				this.level.backgroundLayer.tint = 0x000000;

				this.lightSprite.alpha = 0.85;

				// for (var i = 0; i < this.level.characters.length; i++) {
				// 	this.level.characters[i].tint = 0x999999;
				// }

				if (this.level.weather.clouds) {
					this.level.weather.clouds.alpha = 0;
				}
			}

			// if(this.night){
			// 	this.crickets = this.game.add.audio('AxCrickets');
			// 	this.crickets.play();
			// }

			this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

			if (this.level.weather.lightning) {
				this.level.weather.lightning.bringToTop();
			}
		}
	}

	updateShadowTexture() {
		this.shadowTexture.context.fillStyle = 'rgb(0, 15, 119)';
		this.shadowTexture.context.fillRect(0, 0, this.game.width + 400, this.game.height + 400);
	}
}
