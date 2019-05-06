import Phaser from 'phaser';
import config from './../../config';

// From Dusk Till Dawn
export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.night = false;
		this.darkness = 0.9;

		this.createDayCycle();
	}

	createDayCycle() {
		if (this.level.dayCycle) {
			this.shadowTexture = this.game.add.bitmapData(this.game.width + 200, this.game.height + 200);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
			this.lightSprite.name = "NightLayer";

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

				this.lightSprite.alpha = this.darkness;

				// Tint Clouds
				this.level.backgroundLayer.tint = 0x000000;
				this.level.godrays.visible = false;
				this.level.godrays.renderable = false;

				// for (var i = 0; i < this.level.characters.length; i++) {
				// 	this.level.characters[i].tint = 0x999999;
				// }

				if (this.level.weather.clouds) {
					this.level.weather.clouds.alpha = 0;
				}
			} else if (this.timeValue >= 6 && this.timeValue < 8) {
				console.log('Dawn');

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.5;

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
				this.lightSprite.alpha = 0.5;
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

				this.level.godrays.visible = false;
				this.level.godrays.renderable = false;
				this.level.backgroundLayer.tint = 0x000000;

				this.lightSprite.alpha = this.darkness;

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

		var radius = 60 + this.game.rnd.integerInRange(1,2),
        heroX = this.level.player.x - this.game.camera.x,
        heroY = this.level.player.y - this.game.camera.y;
    
		var gradient = this.shadowTexture.context.createRadialGradient(
				heroX, heroY, 60 * 0.75,
				heroX, heroY, radius);
		gradient.addColorStop(0, 'rgba(150, 150, 150, 1.0)');
		gradient.addColorStop(1, 'rgba(150, 150, 150, 0.0)');

		this.shadowTexture.context.beginPath();
		this.shadowTexture.context.fillStyle = gradient;
		this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
		this.shadowTexture.context.fill();

		this.shadowTexture.dirty = true;
	}
}
