import Phaser from 'phaser';
import config from './../config';

export default class {
	constructor(game, GUI) {
		this.game = game;
		this.GUI = GUI;
		this.level = this.GUI.level;
		// this.showMap();
		this.activeOpen = true;
		this.activeClose = true;

		this.questmapBackground;
	}

	addQuest(){

	}

	removeQuest(){

	}

	showMap() {
		if(this.activeOpen){

		this.activeOpen = false;

		this.level = this.GUI.level;

		this.quests = this.level.safe.getQuests();
		this.level.safe.setQuests(this.quests);

		var width = 400;
		var height = 200;
		this.bmd = game.add.bitmapData(width, height);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, width, height);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 0.9;
		this.bmd.ctx.fill();

			this.questmapBackground = game.add.sprite(this.game.camera.width / 2, this.game.camera.width / 2 - this.bmd.height - 20, this.bmd);
			this.questmapBackground.anchor.set(0.5);
			this.questmapBackground.fixedToCamera = true;

			this.text = this.game.add.bitmapText(this.questmapBackground.x - 175, this.questmapBackground.y - 80, 'pxlfont', '', 20);
			this.text.text = '';
			this.text.alpha = 0;
			this.text.fixedToCamera = true;

			for (var i = 0; i < this.quests.length; i++) {
				if(this.quests[i][1] == "") continue;
				this.text.text += this.quests[i][1] + "\n";
			}

			this.questmapBackground.alpha = 0;
			this.text.alpha = 0;

			this.game.add.tween(this.text.cameraOffset).to( { y: this.text.y + 120 }, 800, Phaser.Easing.Back.Out, true);
			this.game.add.tween(this.text).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

			this.game.add.tween(this.questmapBackground.cameraOffset).to( { y: this.questmapBackground.y + 120 }, 800, Phaser.Easing.Back.Out, true);
			this.game.add.tween(this.questmapBackground).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

			}

	}

	closeMap(){
		
		if(this.activeClose && this.activeOpen == false && this.questmapBackground){
		this.activeOpen = true;

		this.tween = this.game.add.tween(this.questmapBackground.cameraOffset).to( { y: 100}, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.questmapBackground).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

		this.tween = this.game.add.tween(this.text.cameraOffset).to( { y: 10}, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.text).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

		this.tween.onComplete.add(function(){
            this.questmapBackground.destroy();
            this.text.destroy();
            this.questmapBackground = false;
            
            this.activeClose = true;
        }, this);
	}
	}


}
