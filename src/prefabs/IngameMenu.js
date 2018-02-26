import Phaser from 'phaser';

import Questmap from './Questmap';
import Gamemap from './Gamemap';
import GameOptions from './GameOptions';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.show = false;
		this.currentTab = 1;

		this.gameMap = new Gamemap(this.game, this.level, this);
		this.questMap = new Questmap(this.game, this.level, this);
		this.gameOptions = new GameOptions(this.game, this.level, this);
	}

	toggleMenu() {
		if (!this.show) {
			this.showMenu();
			this.show = true;
		} else {
			this.closeMenu();
			this.show = false;
		}
	}

	showMenu() {
		// Disable Storm, Disable Playermovement, No Camera Lerp
		this.level.weather.enableStorm = false;
		this.level.player.movable = false;
		this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 1, 1);

		// Create BitmapData Background
		this.bmd = this.game.add.bitmapData(400, 200);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, 400, 200);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, 400, 20);
		this.bmd.ctx.fillStyle = '#404040';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 18, 400, 2);
		this.bmd.ctx.fillStyle = '#FFFFFF';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();

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

		// Create OptionsButton
		this.optionsButton = this.game.add.button(
			this.menuBackground.x + 120,
			this.menuBackground.y,
			'optionsButton',
			this.actionOnClick,
			this,
			0,
			1,
			2
		);
		this.optionsButton.fixedToCamera = true;

		// Set Buttonframes
		this.mapButton.setFrames(2, 2, 2);
		this.questButton.setFrames(0, 1, 2);
		this.optionsButton.setFrames(0, 1, 2);

		// Open Maptab by default
		this.gameMap.createMap();
	}

	closeMenu() {
		if (this.menuBackground) {
			// Enable Storm, Enable Playermovement, Add Camera Lerp
			this.level.weather.enableStorm = true;
			this.level.player.movable = true;
			this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 0.07, 0.07);

			// Destroy menuBackground + all buttons
			this.menuBackground.destroy();
			this.mapButton.destroy();
			this.questButton.destroy();
			this.optionsButton.destroy();
			this.menuBackground = false;

			if (this.gameMap.map) {
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.playerDot.destroy();
				this.gameMap.map = false;
			}

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}
		}
	}

	actionOnClick(button) {
		if (button.key == 'mapButton') {
			// If Map is active --> return
			if (this.gameMap.map) return;

			this.mapButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}


			this.gameMap.createMap();
		} else if (button.key == 'questButton') {
			// If Questmap is active --> return
			if (this.questMap.text) return;

			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);
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
		} else if (button.key == 'optionsButton') {
			this.optionsButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);

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
		}
	}

	next() {
		if (!this.show) return;
		this.currentTab++;

		if (this.currentTab > 3) {
			this.currentTab = 1;
		}

		if (this.currentTab == 1) {
			if (this.gameMap.map) return;
			this.mapButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			this.gameMap.createMap();
		} else if (this.currentTab == 2) {
			if (this.questMap.text) return;
			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);
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
			this.optionsButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);

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
		}
	}

	prev() {
		if (!this.show) return;
		this.currentTab--;

		if (this.currentTab < 1) {
			this.currentTab = 3;
		}

		if (this.currentTab == 1) {
			if (this.gameMap.map) return;
			this.mapButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.optionsButton.setFrames(0, 1, 2);

			if (this.questMap.text) {
				this.questMap.text.destroy();
				this.questMap.text = false;
			}

			if (this.gameOptions.muteMusicButton) {
				this.gameOptions.muteMusicButton.destroy();
				this.gameOptions.muteSoundButton.destroy();
				this.gameOptions.muteMusicButton = false;
			}

			this.gameMap.createMap();
		} else if (this.currentTab == 2) {
			if (this.questMap.text) return;
			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);
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
			this.optionsButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);
			this.mapButton.setFrames(0, 1, 2);

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
		}
	}

	mapUp() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({ y: this.gameMap.map.cameraOffset.y + 40 }, 200, Phaser.Easing.Linear.None, true);
		}
	}

	mapDown() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({ y: this.gameMap.map.cameraOffset.y - 40 }, 200, Phaser.Easing.Linear.None, true);
		}
	}

	mapLeft() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({ x: this.gameMap.map.cameraOffset.x + 40 }, 200, Phaser.Easing.Linear.None, true);
		}
	}

	mapRight() {
		if (!this.show) return;
		if (this.gameMap.map) {
			console.log('move');
			this.game.add
				.tween(this.gameMap.map.cameraOffset)
				.to({ x: this.gameMap.map.cameraOffset.x - 40 }, 200, Phaser.Easing.Linear.None, true);
		}
	}
}
