import Phaser from 'phaser';

import Questmap from './Questmap';
import Gamemap from './Gamemap';
import GameOptions from './../core/GameOptions';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.show = false;
		this.currentTab = 1;

		this.gameMap = new Gamemap(this.game, this.level, this);
		this.questMap = new Questmap(this.game, this.level, this);
		this.gameOptions = new GameOptions(this.game, this.level, this);

		this.UISounds = this.game.add.audioSprite('sfxUI');
		this.UISounds.sounds['UI1'].allowMultiple = true;
		this.UISounds.sounds['UI2'].allowMultiple = true;
		this.UISounds.sounds['openMenu'].allowMultiple = true;
		console.log(this.UISounds);
		// this.UISounds.allowMultiple = true;

		// this.UISounds.play(this.rndVoiceSword, 0.5);
	}

	toggleMenu() {
		if (!this.show) {
			// this.game.renderer.renderSession.roundPixels = true;

			this.showMenu();
			this.openMenuSound();
			this.show = true;
			// this.game.paused = true;
		} else {
			this.game.renderer.renderSession.roundPixels = false;

			this.closeMenu();
			this.openMenuSound();
			this.show = false;
			// this.game.paused = false;
		}
	}

	showMenu() {
		// this.level.GUICLASS.healthBar.fadeOut();

		// Disable Storm, Disable Playermovement, No Camera Lerp
		this.level.weather.enableStorm = false;
		this.level.player.movable = false;
		this.level.player.alpha = 0;
		// this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 1, 1);

		this.blackBGbmd = this.game.add.bitmapData(window.innerWidth, window.innerHeight);
		this.blackBGbmd.ctx.beginPath();
		this.blackBGbmd.ctx.rect(0, 0, window.innerWidth, window.innerHeight);
		this.blackBGbmd.ctx.fillStyle = '#000000';
		this.blackBGbmd.ctx.globalAlpha = 1;
		this.blackBGbmd.ctx.fill();

		this.blackBG = this.game.add.sprite(
			0,
			0,
			this.blackBGbmd
		);
		this.blackBG.fixedToCamera = true;
		this.blackBG.alpha = 0;
		this.alphaTween = this.game.add
			.tween(this.blackBG)
			.to({
				alpha: 0.6
			}, 350, Phaser.Easing.Cubic.Out, true);


		// Create BitmapData Background
		this.bmd = this.game.add.bitmapData(400, 200);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 20, 400, 200);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();

		// this.bmd.ctx.beginPath();
		// this.bmd.ctx.rect(0, 0, 400, 20);
		// this.bmd.ctx.fillStyle = '#404040';
		// this.bmd.ctx.globalAlpha = 1;
		// this.bmd.ctx.fill();

		// this.bmd.ctx.beginPath();
		// this.bmd.ctx.rect(0, 18, 400, 2);
		// this.bmd.ctx.fillStyle = '#FFFFFF';
		// this.bmd.ctx.globalAlpha = 1;
		// this.bmd.ctx.fill();

		this.menuBackground = this.game.add.sprite(
			this.game.camera.width / 2 - this.bmd.width / 2,
			this.game.camera.height / 2 - this.bmd.height / 2,
			this.bmd
		);
		this.menuBackground.fixedToCamera = true;


		// Create Mapbutton
		this.mapButton = this.game.add.button(
			this.menuBackground.x,
			this.menuBackground.y,
			'mapButton',
			this.actionOnClick,
			this,
			0,
			1,
			2
		);
		this.mapButton.fixedToCamera = true;
		this.mapButton.onInputOver.add(this.over, this);

		// Create Questbutton
		this.questButton = this.game.add.button(
			this.menuBackground.x + 60,
			this.menuBackground.y,
			'questButton',
			this.actionOnClick,
			this,
			0,
			1,
			2
		);
		this.questButton.fixedToCamera = true;
		this.questButton.onInputOver.add(this.over, this);

		// Create inventoryButton
		this.inventoryButton = this.game.add.button(
			this.menuBackground.x + 120,
			this.menuBackground.y,
			'inventoryButton',
			this.actionOnClick,
			this,
			0,
			1,
			2
		);
		this.inventoryButton.fixedToCamera = true;
		this.inventoryButton.onInputOver.add(this.over, this);

		// Create Controlls Button
		this.controllsButton = this.game.add.button(
			this.menuBackground.x + 180,
			this.menuBackground.y,
			'controllsButton',
			this.actionOnClick,
			this,
			0,
			1,
			2
		);
		this.controllsButton.fixedToCamera = true;
		this.controllsButton.onInputOver.add(this.over, this);

		// Create Controlls Button
		this.optionsButton = this.game.add.button(
			this.menuBackground.x + 240,
			this.menuBackground.y,
			'optionsButton',
			this.actionOnClick,
			this,
			0,
			1,
			2
		);
		this.optionsButton.fixedToCamera = true;
		this.optionsButton.onInputOver.add(this.over, this);

		// Set Buttonframes
		this.mapButton.setFrames(0, 1, 2);
		this.questButton.setFrames(2, 2, 2);
		this.inventoryButton.setFrames(0, 1, 2);
		this.controllsButton.setFrames(0, 1, 2);
		this.optionsButton.setFrames(0, 1, 2);

		// Open Maptab by default
		// this.gameMap.createMap();
		this.questMap.showMap();
	}

	openMenuSound() {
		this.UISounds.play('openMenu', 0.1);
	}

	over() {
		this.UISounds.play('UI1', 0.1);
	}

	down() {
		this.UISounds.play('UI2', 0.1);
	}

	closeMenu() {
		// this.level.GUICLASS.healthBar.fadeIn();

		if (this.menuBackground) {
			// Enable Storm, Enable Playermovement, Add Camera Lerp
			this.level.weather.enableStorm = true;
			this.level.player.movable = true;
			this.level.player.alpha = 1;
			// this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 0.07, 0.07);

			// Destroy menuBackground + all buttons
			this.alphaTween = this.game.add
				.tween(this.blackBG)
				.to({
					alpha: 0
				}, 350, Phaser.Easing.Cubic.Out, true);

			this.menuBackground.destroy();
			this.mapButton.destroy();
			this.questButton.destroy();
			this.inventoryButton.destroy();
			this.controllsButton.destroy();
			this.optionsButton.destroy();
			this.menuBackground = false;

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}
		}
	}

	actionOnClick(button) {
		this.down();
		if (button.key == 'mapButton') {
			// // If Map is active --> return
			// if (this.gameMap.map) return;

			// this.mapButton.setFrames(2, 2, 2);
			// this.questButton.setFrames(0, 1, 2);
			// this.inventoryButton.setFrames(0, 1, 2);
			// this.controllsButton.setFrames(0, 1, 2);
			// this.optionsButton.setFrames(0, 1, 2);

			// if (this.questMap.text) {
			// 	this.questMap.text.destroy();
			// 	this.questMap.text = false;
			// }

			// if (this.gameOptions.muteMusicButton) {
			// 	this.gameOptions.muteMusicButton.destroy();
			// 	this.gameOptions.muteSoundButton.destroy();
			// 	this.gameOptions.muteMusicButton = false;
			// }

			// this.gameMap.createMap();
		} else if (button.key == 'questButton') {
			// If Questmap is active --> return
			if (this.questMap.text) return;

			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			this.questMap.showMap();
		} else if (button.key == 'inventoryButton') {
			this.inventoryButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			// this.gameOptions.showOptions();

		} else if (button.key == 'controllsButton') {
			this.controllsButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			// this.gameOptions.showOptions();
		} else if (button.key == 'optionsButton') {
			this.optionsButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			// this.gameOptions.showOptions();
		}
	}

	next() {
		if (!this.show) return;
		this.currentTab++;

		if (this.currentTab > 5) {
			this.currentTab = 1;
		}

		if (this.currentTab == 1) {
			if (this.gameMap.map) return;
			this.mapButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			// this.gameMap.createMap();
		} else if (this.currentTab == 2) {
			if (this.questMap.text) return;
			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			this.questMap.showMap();
		} else if (this.currentTab == 3) {
			this.inventoryButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			this.gameOptions.showOptions();
		} else if (this.currentTab == 4) {

			this.inventoryButton.setFrames(0, 1, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(2, 2, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

		} else if (this.currentTab == 5) {
			this.inventoryButton.setFrames(0, 1, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(2, 2, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}
		}
	}

	prev() {
		if (!this.show) return;
		this.currentTab--;

		if (this.currentTab < 1) {
			this.currentTab = 5;
		}

		if (this.currentTab == 1) {
			if (this.gameMap.map) return;
			this.mapButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			// this.gameMap.createMap();
		} else if (this.currentTab == 2) {
			if (this.questMap.text) return;
			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.inventoryButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			this.questMap.showMap();
		} else if (this.currentTab == 3) {
			this.inventoryButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.fontImage.destroy();
				this.questMap.fontImage = false;
				this.questMap.text.destroy();
				this.questMap.text = false;
				this.questMap.fontImageMastered.destroy();
				this.questMap.fontImageMastered = false;
				this.questMap.heading1Sprite.destroy();
				this.questMap.heading1Sprite = false;
				this.questMap.heading2Sprite.destroy();
				this.questMap.heading2Sprite = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			this.gameOptions.showOptions();
		} else if (this.currentTab == 4) {

			this.inventoryButton.setFrames(0, 1, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(2, 2, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

		} else if (this.currentTab == 5) {
			this.inventoryButton.setFrames(0, 1, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);
			this.controllsButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(2, 2, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}
		}
	}

	mapUp() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({
					y: this.gameMap.map.cameraOffset.y + 40
				}, 200, Phaser.Easing.Linear.None, true);
		}
	}

	mapDown() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({
					y: this.gameMap.map.cameraOffset.y - 40
				}, 200, Phaser.Easing.Linear.None, true);
		}
	}

	mapLeft() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({
					x: this.gameMap.map.cameraOffset.x + 40
				}, 200, Phaser.Easing.Linear.None, true);
		}
	}

	mapRight() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({
					x: this.gameMap.map.cameraOffset.x - 40
				}, 200, Phaser.Easing.Linear.None, true);
		}
	}
}