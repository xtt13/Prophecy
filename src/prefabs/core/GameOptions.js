
export default class {
	constructor(game, level, ingameMenu) {
		this.game = game;
		this.level = level;
		this.ingameMenu = ingameMenu;
	}

	showOptions() {
		this.muteMusicButton = this.game.add.button(240, 100, 'muteMusicButton', this.actionOnClick, this, 0, 2, 1);
		this.muteMusicButton.fixedToCamera = true;

		this.muteSoundButton = this.game.add.button(240, 130, 'muteSoundButton', this.actionOnClick, this, 0, 2, 1);
		this.muteSoundButton.fixedToCamera = true;

		this.FSmodeButton = this.game.add.button(240, 160, 'FSmodeButton', this.actionOnClick, this, 0, 2, 1);
		this.FSmodeButton.fixedToCamera = true;

		this.getGamePreferences();

		// this.fullScreenMode = this.game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
		// this.fullScreenMode.setText('Beta 1.0', true, -1, 5, 'left', true)
		// this.fullScreenModeImage = this.game.add.image(this.game.camera.width - 90, this.game.camera.height - 10, this.versionText);
	}

	getGamePreferences() {
		this.gamePreferences = this.level.safe.getGamePreferences();

		if (this.gamePreferences.muteMusic) {
			this.muteMusic = true;
			this.muteMusicButton.setFrames(0, 1, 2);
		} else {
			this.muteMusic = false;
			this.muteMusicButton.setFrames(0, 2, 1);
		}

		if (this.gamePreferences.muteSound) {
			this.muteSound = true;
			this.muteSoundButton.setFrames(0, 1, 2);
		} else {
			this.muteSound = false;
			this.muteSoundButton.setFrames(0, 2, 1);
		}

		if (this.game.scale.isFullScreen) {
			// this.muteSound = true;
			this.FSmodeButton.setFrames(1, 1, 1);
		} else {
			// this.muteSound = false;
			this.FSmodeButton.setFrames(0, 2, 1);
		}
	}

	setGamePreferences(gamePreferences) {
		this.level.safe.setGamePreferences(gamePreferences);
	}

	actionOnClick(button) {
		if (button.key == 'muteMusicButton') {
			if (this.muteMusic) {
				this.muteMusic = false;
				this.muteMusicButton.setFrames(0, 2, 1);
				this.game.musicPlayer.initMap(this.level.tilemapProperties, true, 5000);
			} else {
				this.muteMusic = true;
				this.muteMusicButton.setFrames(1, 1, 1);
				this.game.musicPlayer.fadeOut();
			}
		} else if (button.key == 'muteSoundButton') {
			if (this.muteSound) {
				this.muteSound = false;
				this.muteSoundButton.setFrames(0, 2, 1);
				this.game.soundManager.initSound(this.level.tilemapProperties.athmoSound);
			} else {
				this.muteSound = true;
				this.muteSoundButton.setFrames(1, 1, 1);
				this.game.soundManager.fadeOut();
			}
		} else if (button.key == 'FSmodeButton'){
			if (this.game.scale.isFullScreen) {
				this.game.scale.stopFullScreen();
				this.FSmodeButton.setFrames(0, 2, 1);
			} else {
				this.game.scale.startFullScreen(false, false);
				this.FSmodeButton.setFrames(1, 1, 1);
			}
		}

		this.setGamePreferences({
			muteMusic: this.muteMusic,
			muteSound: this.muteSound
		});
	}
}
