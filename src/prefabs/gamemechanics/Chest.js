import Phaser from 'phaser';
import LockGame from '../minigame/LockGame';

export default class extends Phaser.Sprite {
	constructor(game, x, y, properties, level) {
		super(game, parseInt(x), parseInt(y), 'chest');

		this.game = game;
		this.id = properties.id;
		this.level = level;

		this.action = false;
		this.openSwitch = false;

		this.properties = properties;

        // this.anchor.setTo(0.5);
		// this.scale.setTo(1.25);
		
		this.actionSymbol = this.game.add.sprite(this.x + 15, this.y - 10, 'actionSymbol');
		this.actionSymbol.smoothed = false;
		this.actionSymbol.alpha = 0;
		// this.actionSymbol.animations.add('play');
		// this.actionSymbol.animations.play('play', 2, true);


        this.animations.add('open', [0, 1, 2, 3, 4, 5], 15, false);
        this.animations.add('close', [5, 4, 3, 2, 1, 0], 15, false);

		this.game.physics.enable(this);
		this.body.immovable = true;
		this.body.setSize(14, 11, 1, 11);

		this.game.add.existing(this);
	}

	openChest() {
		let chestID = this.id;
		let searchedChest = null;

		for (let i = 0; i < this.level.chests.length; i++) {
			const chest = this.level.chests[i];
			if (chest.id == chestID) {
				searchedChest = chest;
				break;
			}
		}

		let x = this.game.camera.x + this.game.camera.width / 2;
		let y = this.game.camera.y + this.game.camera.height / 2;
		this.level.lockGame = new LockGame(this.game, x, y, this.level.player, searchedChest, this.level, this.properties);


	}

	closeChest() {
		if(!this.action) return;

		let chestID = this.id;
		let searchedChest = null;

		this.action = false;
		this.openSwitch = false;

		for (let i = 0; i < this.level.chests.length; i++) {
			const chest = this.level.chests[i];
			if (chest.id == chestID) {
				searchedChest = chest;
				break;
			}
		}

		searchedChest.animations.play('close');
	}

	update(){
        this.game.physics.arcade.collide(this, this.level.player);
		

		if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 30){
			if(this.action){
				this.actionSymbol.alpha = 0;
				return;
			}
			this.game.world.bringToTop(this.actionSymbol);
			this.actionSymbol.alpha = 1;
			// On E-click
			if(this.level.inputClass.button_E.isDown){
				if(this.openSwitch) return;
				this.openSwitch = true;
				this.action = true;

				this.openChest();
			}	
		} else {
			this.actionSymbol.alpha = 0;
			this.closeChest();
		}

		

		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.level.player, this.x, this.y));
		if (angle < 0) {
			// this.game.world.moveUp(this);
			this.game.world.setChildIndex(this, 10);
		} else {
			this.game.world.bringToTop(this);
		}



	}
}
