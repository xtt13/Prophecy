import Phaser from 'phaser';
import Message from './Message';

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

			if(this.upperBar){
				this.game.world.bringToTop(this.upperBar);
				this.game.world.bringToTop(this.downBar);
			}
		}
	}

	createMessage(message, playerMovable, readable) {
		this.message = new Message(this.game, message, playerMovable, readable, this.player);
	}

	setPlayer(player) {
		this.player = player;
	}
}
