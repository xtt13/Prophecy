import Phaser from 'phaser';
import Message from './Message';
import Notification from './Notification';
import IngameMenu from './IngameMenu';
import Questmap from './Questmap';
import Gamemap from './Gamemap';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.createGUI();
	}

	createGUI() {
		this.questMap = new Questmap(this.game, this);
		this.gameMap = new Gamemap(this.game, this, this.level);
		this.ingameMenu = new IngameMenu(this.game, this.level);
	}

	updateGUI(option, value) {
		switch (option) {
			case 'hp':
				break;
			case 'defence':
				break;
			default:
		}
	}

	update() {
		if (this.message) {
			this.game.world.bringToTop(this.message.background);
			this.game.world.bringToTop(this.message.text);
			this.game.world.bringToTop(this.message.upperBar);
			this.game.world.bringToTop(this.message.downBar);
		}

		if (this.notification.notificationBar) {
			this.game.world.bringToTop(this.notification.notificationBar);
			this.game.world.bringToTop(this.notification.text);
		}

		if (this.questMap.questmapBackground) {
			this.game.world.bringToTop(this.questMap.questmapBackground);
			this.game.world.bringToTop(this.questMap.text);
		}

		if (this.gameMap.gameMapbackground) {
			this.gameMap.update();

			this.game.world.bringToTop(this.gameMap.gameMapbackground);
			this.game.world.bringToTop(this.gameMap.mapGroup);
			this.game.world.bringToTop(this.gameMap.playerDot);
		}

		if (this.ingameMenu.menuBackground) {
			// this.gameMap.update();

			this.game.world.bringToTop(this.ingameMenu.menuBackground);
			this.game.world.bringToTop(this.ingameMenu.mapButton);
			this.game.world.bringToTop(this.ingameMenu.questButton);
			this.game.world.bringToTop(this.ingameMenu.optionsButton);

			if (this.ingameMenu.gameMap.map) {
				this.game.world.bringToTop(this.ingameMenu.gameMap.mask);
				this.game.world.bringToTop(this.ingameMenu.gameMap.map);
				this.game.world.bringToTop(this.ingameMenu.gameMap.playerDot);

				this.ingameMenu.gameMap.update();
			}

			if (this.ingameMenu.questMap.text) {
				this.game.world.bringToTop(this.ingameMenu.questMap.text);
			}

			if(this.ingameMenu.gameOptions.muteMusicButton){
				this.game.world.bringToTop(this.ingameMenu.gameOptions.muteMusicButton);
				this.game.world.bringToTop(this.ingameMenu.gameOptions.muteSoundButton);
			}
		}

		// let onePSx = this.game.world.width / 100;
		// onePSx = onePSx.toFixed(1);

		// let xValue = (this.player.x / onePSx) / 100;
		// xValue = xValue.toFixed(1);

		// let onePSy = this.game.world.height / 100;
		// onePSy = onePSy.toFixed(1);

		// let yValue = (this.player.y / onePSy) / 100;
		// yValue = yValue.toFixed(1);

		// console.log(xValue, yValue);
	}

	createMessage(message, playerMovable, readable) {
		this.message = new Message(this.game, message, playerMovable, readable, this.player, this.level);
	}

	createNotification(type, message) {
		this.notification = new Notification(this.game, type, message);
	}

	setLevel(level) {
		this.level = level;
		this.player = this.level.player;
	}
}
