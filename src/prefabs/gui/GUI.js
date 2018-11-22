import Message from './Message';
import Notification from './Notification';
import IngameMenu from './IngameMenu';
import Questmap from './Questmap';
import Gamemap from './Gamemap';
import Healthbar from './Healthbar';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.notification = false;
		this.healthBar = new Healthbar(this.game, this.level);
		this.createGUI();
	}

	createGUI() {
		this.questMap = new Questmap(this.game, this);
		this.gameMap = new Gamemap(this.game, this, this.level);
		this.ingameMenu = new IngameMenu(this.game, this.level);
	}

	update() {
		if (this.message) {
			this.message.update();
			this.game.world.bringToTop(this.message.background);
			this.game.world.bringToTop(this.message.text);
			this.game.world.bringToTop(this.message.upperBar);
			this.game.world.bringToTop(this.message.downBar);
			this.game.world.bringToTop(this.message.nextGUI);
			this.game.world.bringToTop(this.message.fontImage);			
		}

		if (this.notification.notificationBar) {
			this.game.world.bringToTop(this.notification.notificationBar);
			this.game.world.bringToTop(this.notification.fontImage);
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
			this.game.world.bringToTop(this.ingameMenu.blackBG);
			this.game.world.bringToTop(this.ingameMenu.menuBackground);
			this.game.world.bringToTop(this.ingameMenu.mapButton);
			this.game.world.bringToTop(this.ingameMenu.questButton);
			this.game.world.bringToTop(this.ingameMenu.inventoryButton);
			this.game.world.bringToTop(this.ingameMenu.controllsButton);
			this.game.world.bringToTop(this.ingameMenu.optionsButton);

			if (this.ingameMenu.gameMap.map) {
				
				this.game.world.bringToTop(this.ingameMenu.gameMap.mask);
				this.game.world.bringToTop(this.ingameMenu.gameMap.map);
				this.game.world.bringToTop(this.ingameMenu.gameMap.playerDot);

				this.ingameMenu.gameMap.update();

			}

			if(this.ingameMenu.controllsSprite){
				this.game.world.bringToTop(this.ingameMenu.controllsSprite);
			}

			if(this.ingameMenu.inventory.textImage){
				this.game.world.bringToTop(this.ingameMenu.inventory.textImage);
			}

			if (this.ingameMenu.questMap.text) {
				this.game.world.bringToTop(this.ingameMenu.questMap.text);
				this.game.world.bringToTop(this.ingameMenu.questMap.fontImage);
				this.game.world.bringToTop(this.ingameMenu.questMap.fontImageMastered);
				this.game.world.bringToTop(this.ingameMenu.questMap.heading1Sprite);
				this.game.world.bringToTop(this.ingameMenu.questMap.heading2Sprite);
			}

			if (this.ingameMenu.gameOptions.muteMusicButton) {
				this.game.world.bringToTop(this.ingameMenu.gameOptions.muteMusicButton);
				this.game.world.bringToTop(this.ingameMenu.gameOptions.muteSoundButton);
				this.game.world.bringToTop(this.ingameMenu.gameOptions.FSmodeButton);
				this.game.world.bringToTop(this.ingameMenu.gameOptions.resetButton);
			}
		}

		this.healthBar.update();

		this.game.world.bringToTop(this.healthBar.healthBarGroup);
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
