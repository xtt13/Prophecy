import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, x, y, type, properties, level) {
		super(game, x, y, type);

		this.game = game;
		this.type = type;
		this.level = level;
		this.id = properties.id;

		this.ifQuestID = properties.ifQuestID;
		this.newQuestID = properties.newQuestID;

		this.used = false;

		this.questMessage = properties.questMessage;
		this.removeQuestID = properties.removeQuestID;

		this.anchor.setTo(0.5);

		this.actionSymbol = this.game.add.sprite(this.x + 5, this.y - 15, 'actionSymbol');
		this.actionSymbol.smoothed = false;
		this.actionSymbol.alpha = 0;


		if(this.type == 'potion'){
			this.animations.add('play', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
		} else {
			this.animations.add('play', [0, 1, 2, 3], 12, true);
		}

		this.animations.play('play');

		

		this.game.physics.enable(this);
		// setSize(width, height, offsetX, offsetY)
		this.body.setSize(10, 18, 10, 18);
		this.body.immovable = true;
		this.game.add.existing(this);
	}

	update(){
		if(this.used) return;

		this.game.physics.arcade.collide(this, this.level.player);

		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.level.player, this.x, this.y));
		if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 40){
			if (angle > 0) {			
				this.game.world.bringToTop(this);
			} else {
				this.game.world.setChildIndex(this, 15);		
			}
		} else {
			this.game.world.bringToTop(this);
		}
		

		if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 30){
			if(this.action){
				this.actionSymbol.alpha = 0;
				return;
			}
			this.game.world.bringToTop(this.actionSymbol);
			this.actionSymbol.alpha = 1;
			// On E-click
			if(this.level.inputClass.button_E.isDown){
				// if(this.openSwitch) return;
				// this.openSwitch = true;
				// this.action = true;
				this.actionSymbol.alpha = 0;
				this.level.player.collideWithItem(this.level.player, this);		
				return;

			}	
		} else {
			this.actionSymbol.alpha = 0;
		}




	}
}
