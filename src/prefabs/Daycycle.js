import Phaser from 'phaser';

// From Dusk Till Dawn
export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.night = false;

		this.createDayCycle();
	}

	createDayCycle(){
		// Create Night
		if (this.level.dayCycle) {

			this.shadowTexture = this.game.add.bitmapData(this.game.width + 200, this.game.height + 200);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

			this.time = new Date();
			this.timeValue = this.time.getHours();
			// this.timeValue = 12;

			if(this.timeValue >= 0 && this.timeValue < 6){
				console.log('Night');
				this.night = true;

				this.lightSprite.alpha = 0.99;
				this.level.backgroundLayer.tint = 0x070707;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if(this.level.weather.clouds){
					this.level.weather.clouds.destroy();
				}

			} else if(this.timeValue >= 6 && this.timeValue < 8){
				console.log('Dawn');

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.7;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if(this.level.weather.clouds){
					this.level.weather.clouds.forEach(cloud => {
						cloud.tint = 0x383838;
					});
				}

			} else if(this.timeValue >= 8 && this.timeValue < 18){
				console.log('Day');

				this.lightSprite.alpha = 0;

			} else if(this.timeValue >= 18 && this.timeValue < 21){
				console.log('Dusk');

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.7;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if(this.level.weather.clouds){
					this.level.weather.clouds.forEach(cloud => {
						cloud.tint = 0x383838;
					});
				}



			} else if(this.timeValue >= 21 && this.timeValue < 24){
				console.log('Night');
				this.night = true;

				this.level.backgroundLayer.tint = 0x070707;
				this.lightSprite.alpha = 0.99;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if(this.level.weather.clouds){
					this.level.weather.clouds.destroy();
				}

			}

			this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
			

			// this.level.player.blendMode = Phaser.blendModes.MULTIPLY;
			
			if(this.level.weather.lightning){
				this.level.weather.lightning.bringToTop();
			}
			
		}
	}

	updateShadowTexture() {
		this.shadowTexture.context.fillStyle = 'rgb(0, 15, 119)';
		this.shadowTexture.context.fillRect(0, 0, this.game.width + 400, this.game.height + 400);

		// var radius = 100 + this.game.rnd.integerInRange(1, 8),
		// 	heroX = this.player.x - this.game.camera.x,
		// 	heroY = this.player.y - this.game.camera.y;

		// var gradient = this.shadowTexture.context.createRadialGradient(heroX, heroY, 100 * 0.75, heroX, heroY, radius);
		// gradient.addColorStop(0, 'rgba(255, 227, 134, 1.0)');
		// gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

		// this.shadowTexture.context.beginPath();
		// this.shadowTexture.context.fillStyle = gradient;
		// this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
		// this.shadowTexture.context.fill();

		// this.shadowTexture.dirty = true;
	}
}
