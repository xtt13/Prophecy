import Phaser from 'phaser';

export default class {
	constructor(game, level, ingameMenu) {
		this.game = game;
		this.level = level;
		this.ingameMenu = ingameMenu;
	}

	showOptions() {
		
		this.muteMusicButton = this.game.add.button(
			110,
			80,
			'muteMusicButton',
			this.actionOnClick,
			this,
			0,
			2,
			1
		);
		this.muteMusicButton.fixedToCamera = true;

		this.muteSoundButton = this.game.add.button(
			110,
			120,
			'muteSoundButton',
			this.actionOnClick,
			this,
			0,
			2,
			1
		);
		this.muteSoundButton.fixedToCamera = true;

		this.getGamePreferences();
	}

	getGamePreferences(){
		this.gamePreferences = this.level.safe.getGamePreferences();

		if(this.gamePreferences.muteMusic){
			this.muteMusic = true;
			this.muteMusicButton.setFrames(0, 1, 2);
		} else {
			this.muteMusic = false;
			this.muteMusicButton.setFrames(0, 2, 1);
		}

		if(this.gamePreferences.muteSound){
			this.muteSound = true;
			this.muteSoundButton.setFrames(0, 1, 2);
		} else {
			this.muteSound = false;
			this.muteSoundButton.setFrames(0, 2, 1);
		}
	}

	setGamePreferences(gamePreferences){
		this.level.safe.setGamePreferences(gamePreferences);
	}



	actionOnClick(button){
		if (button.key == 'muteMusicButton') {
			if(this.muteMusic){
				this.muteMusic = false;
				this.muteMusicButton.setFrames(0, 2, 1);
				this.game.musicPlayer.initMap(this.level.tilemapProperties, true, 5000);
			} else {
				this.muteMusic = true;
				this.muteMusicButton.setFrames(1, 1, 1);
				this.game.musicPlayer.fadeOut();
			}
		} else if (button.key == 'muteSoundButton') {
			if(this.muteSound){
				this.muteSound = false;
				this.muteSoundButton.setFrames(0, 2, 1);
				this.game.soundManager.initSound(this.level.tilemapProperties.athmoSound);
				
			} else {
				this.muteSound = true;
				this.muteSoundButton.setFrames(1, 1, 1);
				this.game.soundManager.fadeOut();
			}
		}

		this.setGamePreferences(
			{
			muteMusic: this.muteMusic,
			muteSound: this.muteSound
			}
		);


	}
}
