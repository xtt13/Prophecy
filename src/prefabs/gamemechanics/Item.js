import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, x, y, type, properties) {
		super(game, x, y, 'potion');

		this.game = game;
		this.type = type;
		this.id = properties.id;
		this.questID = properties.questID;
		this.questMessage = properties.questMessage;
		this.removeQuestID = properties.removeQuestID;
		this.anchor.setTo(0.5);

		if(this.type == 'potion'){
			this.animations.add('play', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
		} else {
			this.animations.add('play', [0, 1, 2, 3], 12, true);
		}

		this.animations.play('play');

		

		this.game.physics.enable(this);

		this.game.add.existing(this);
	}

	update(){
		// this.game.world.setChildIndex(this, 14);
	}
}
