import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, x, y, type, properties, level) {
		super(game, x, y, 'potion');

		this.game = game;
		this.type = type;
		this.level = level;
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
		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.level.player, this.x, this.y));
		// console.log(angle);
		if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 40){
			if (angle > 0) {			
				this.game.world.bringToTop(this);
			} else {
				this.game.world.setChildIndex(this, 15);		
			}
		} else {
			this.game.world.bringToTop(this);
		}


	}
}
