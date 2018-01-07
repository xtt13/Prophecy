import Phaser from 'phaser';
import Message from './Message';
import Notification from './Notification';
import Questmap from './Questmap';

export default class {
	constructor(game) {
		this.game = game;
		this.createGUI();
	}

	createGUI() {}

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
		}

		if(this.notification.notificationBar){
			this.game.world.bringToTop(this.notification.notificationBar);
			this.game.world.bringToTop(this.notification.text);
		}

		if(this.upperBar){
			this.game.world.bringToTop(this.upperBar);
			this.game.world.bringToTop(this.downBar);
		}

		if(this.questMap){
			this.game.world.bringToTop(this.questMap.questmapBackground);
			this.game.world.bringToTop(this.questMap.text);
		}
	}

	createMessage(message, playerMovable, readable) {
		this.message = new Message(this.game, message, playerMovable, readable, this.player);
	}

	createNotification(type, message){
		this.notification = new Notification(this.game, type, message);

	}

	createQuestmap(){
		this.questMap = new Questmap(this.game, this);
	}

	setLevel(level) {
		this.level = level;
		this.player = this.level.player;
	}
}
