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

		this.show = false;
	}

	toggleMap() {
		if (!this.show) {
			this.showMap();
			this.show = true;
		} else {
			this.closeMap();
			this.show = false;
		}
	}

	showMap() {
		console.log('Show Questmap');

		this.level = this.GUI.level;

		this.quests = this.level.safe.getQuests();
		console.log(this.quests);

		var width = 400;
		var height = 200;
		this.bmd = game.add.bitmapData(width, height);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, width, height);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 0.9;
		this.bmd.ctx.fill();

		this.questmapBackground = game.add.sprite(
			this.game.camera.width / 2,
			this.game.camera.height / 2 - this.bmd.height / 2,
			this.bmd
		);
		this.questmapBackground.anchor.set(0.5);
		this.questmapBackground.fixedToCamera = true;

		this.text = this.game.add.bitmapText(
			this.questmapBackground.x - 175,
			this.questmapBackground.y - 80,
			'pxlfont',
			'',
			20
		);
		this.text.text = '';
		this.text.alpha = 0;
		this.text.fixedToCamera = true;

		for (let prop in this.quests) {
			if (!isNaN(prop)) {
				if (this.quests[prop].questKillEnemyAmount !== undefined) {
					this.text.text +=
						this.quests[prop].questMessage +
						': ' +
						this.quests[prop].questDeadEnemies +
						'/' +
						this.quests[prop].questKillEnemyAmount +
						'\n';
				} else {
					this.text.text += this.quests[prop].questMessage + '\n';
				}
			}
		}

		let counter = 0;
		let maxEntries = 3;
		for (let prop in this.quests.masteredQuests) {
			if (!isNaN(prop) && counter < maxEntries) {
				console.log(this.quests.masteredQuests[prop].questMessage);
				counter++;
			}
		}

		this.questmapBackground.alpha = 0;
		this.text.alpha = 0;

		this.game.add.tween(this.text.cameraOffset).to({ y: this.text.y + 120 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.text).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add
			.tween(this.questmapBackground.cameraOffset)
			.to({ y: this.questmapBackground.y + 120 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.questmapBackground).to({ alpha: 1 }, 800, Phaser.Easing.Linear.None, true);
	}

	closeMap() {
		console.log('Close Questmap');

		this.tween = this.game.add
			.tween(this.questmapBackground.cameraOffset)
			.to({ y: 100 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.questmapBackground).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

		this.tween = this.game.add.tween(this.text.cameraOffset).to({ y: 10 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.text).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

		this.tween.onComplete.add(function() {
			// this.questmapBackground.destroy();
			// this.text.destroy();
			// this.questmapBackground = false;
		}, this);
	}
}
