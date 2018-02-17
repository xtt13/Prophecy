import Phaser from 'phaser';

import Questmap from './Questmap';
import Gamemap from './Gamemap';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.show = false;

		this.gameMap = new Gamemap(this.game, this.level, this);
	}

	toggleMenu() {
		if (!this.show) {
			this.showMenu();
			this.show = true;
		} else {
			this.closeMenu();
			this.show = false;
		}
	}

	showMenu() {
		// this.questMap = new Questmap(this.game, this);
		// this.gameMap = new Gamemap(this.game, this, this.level);

		this.bmd = this.game.add.bitmapData(400, 200);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, 400, 200);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, 400, 20);
		this.bmd.ctx.fillStyle = '#404040';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 18, 400, 2);
		this.bmd.ctx.fillStyle = '#FFFFFF';
		this.bmd.ctx.globalAlpha = 1;
		this.bmd.ctx.fill();
		
		this.menuBackground = this.game.add.sprite(
			this.game.camera.width / 2 - (this.bmd.width/2),
			this.game.camera.height / 2 - (this.bmd.height/2),
			this.bmd
		);
		this.menuBackground.fixedToCamera = true;


		// this.menuLine = this.game.add.sprite(
		// 	this.menuBackground.x,
		// 	this.menuBackground.y,
		// 	this.bmdLine
		// );
		// this.menuLine.fixedToCamera = true;



		this.mapButton = this.game.add.button(this.menuBackground.x, this.menuBackground.y, 'mapButton', this.actionOnClick, this, 0, 1, 2);
		this.mapButton.fixedToCamera = true;

		this.questButton = this.game.add.button(this.menuBackground.x + 60, this.menuBackground.y, 'questButton', this.actionOnClick, this, 0, 1, 2);
		this.questButton.fixedToCamera = true;


		this.mapButton.setFrames(2, 2, 2);
		this.questButton.setFrames(0, 1, 2);

		this.gameMap.createMap();

		console.log(this.gameMap.map);
		console.log(this.menuBackground);
		// this.gameMap.map.mask = this.menuBackground;

	}

	closeMenu(){
		if(this.menuBackground){
			this.menuBackground.destroy();
			this.mapButton.destroy();
			this.questButton.destroy();
			this.menuBackground = false;

			if(this.gameMap.map){
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.map = false;
			}
		}
	}

	actionOnClick(button){
		console.log(button.key);
		// button.setFrames(2, 2, 2);

		if(button.key == 'mapButton'){
			this.mapButton.setFrames(2, 2, 2);
			this.questButton.setFrames(0, 1, 2);

			this.gameMap.createMap();

		} else {
			this.questButton.setFrames(2, 2, 2);
			this.mapButton.setFrames(0, 1, 2);

			if(this.gameMap.map){
				this.gameMap.map.destroy();
				this.gameMap.mask.destroy();
				this.gameMap.map = false;
			}
		}
	}

}
