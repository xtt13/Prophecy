import Phaser from 'phaser';
import config from './../config';

export default class {
	constructor(game, GUI) {
		this.game = game;
		this.GUI = GUI;
		this.level = this.GUI.level;
		this.showMap();
	}

	getQuests(){
		this.quests = this.level.safe.getQuests();
	}

	saveQuests(){
		this.quests = this.level.safe.setQuests(this.quests);
	}

	addQuest(){

	}

	removeQuest(){

	}

	showMap() {

		this.getQuests();
		this.quests.push(['Testquest']);
		this.saveQuests();
		this.getQuests();

		console.log(this.quests);

		var width = 400;
		var height = 200;
		this.bmd = game.add.bitmapData(width, height);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, width, height);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 0.9;
		this.bmd.ctx.fill();

		if(!this.questmapBackground){
			this.questmapBackground = game.add.sprite(this.game.camera.width / 2, this.game.camera.width / 2 - this.bmd.height - 20, this.bmd);
			this.questmapBackground.anchor.set(0.5);
			this.questmapBackground.fixedToCamera = true;

			this.text = this.game.add.bitmapText(this.questmapBackground.x - 175, this.questmapBackground.y - 80, 'pxlfont', '', 20);
			this.text.text = '';
			// this.text.scale.set(0.26);
			this.text.alpha = 0;
			this.text.fixedToCamera = true;

			for (var i = 0; i < this.quests.length; i++) {
				this.text.text += this.quests[i] + "\n";
				console.log(this.quests[i]);
			}




			this.questmapBackground.alpha = 0;

			this.game.add.tween(this.text.cameraOffset).to( { y: this.text.y + 120 }, 800, Phaser.Easing.Back.Out, true);
			this.game.add.tween(this.text).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

			this.game.add.tween(this.questmapBackground.cameraOffset).to( { y: this.questmapBackground.y + 120 }, 800, Phaser.Easing.Back.Out, true);
			this.game.add.tween(this.questmapBackground).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
		}

		// this.game.time.events.add(Phaser.Timer.SECOND * 5, this.closeMap, this);
	}

	closeMap(){
		this.tween = this.game.add.tween(this.questmapBackground.cameraOffset).to( { y: 100}, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.questmapBackground).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

		this.tween.onComplete.add(function(){
            this.questmapBackground.destroy();
        }, this);
	}


}
