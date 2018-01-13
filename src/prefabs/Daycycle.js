import Phaser from 'phaser';

// From Dusk Till Dawn
export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.createDayCycle();
	}

	createDayCycle(){
		// Create Night
		if (this.level.dayCycle) {

			this.shadowTexture = this.game.add.bitmapData(this.game.width + 200, this.game.height + 200);
			this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

			this.time = new Date();
			this.hours = this.time.getHours();
			// this.hours = 7;
			this.timeValue = this.hours / 24;
			this.timeValue = Math.round(this.timeValue * 10) / 10;

			if(this.timeValue >= 0 && this.timeValue <= 0.2){
				console.log('Night');

				this.lightSprite.alpha = 0.99;
				this.level.backgroundLayer.tint = 0x070707;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

				if(this.level.weather.clouds){
					this.level.weather.clouds.destroy();
				}

			} else if(this.timeValue >= 0.2 && this.timeValue <= 0.3){
				console.log('Dawn');

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.7;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

			} else if(this.timeValue >= 0.3 && this.timeValue <= 0.7){
				console.log('Day');

				this.lightSprite.alpha = 0;

			} else if(this.timeValue >= 0.7 && this.timeValue <= 0.8){
				console.log('Dusk');

				this.level.backgroundLayer.tint = 0x848484;
				this.lightSprite.alpha = 0.7;
				this.level.player.tint = 0x383838;

				for (var i = 0; i < this.level.characters.length; i++) {
					this.level.characters[i].tint = 0x383838;
				}

			} else if(this.timeValue >= 0.8 && this.timeValue <= 1){
				console.log('Night');

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
