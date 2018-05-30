
export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.activeOpen = true;
		this.activeClose = true;
		this.show = false;

		this.questmapBackground;
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
		this.quests = this.level.safe.getQuests();

		this.text = this.game.add.bitmapText(
			this.game.camera.width / 2 - 180,
			this.game.camera.height / 2 - 60,
			'pxlfont',
			'',
			10
		);
		this.text.text = ' ';
		this.text.fixedToCamera = true;

		for (let prop in this.quests) {
			if (!isNaN(prop)) {
				if (this.quests[prop].questKillEnemyAmount !== undefined) {
					this.text.text +=
						this.quests[prop].questMessage ;
						// +
						// ': '
						//  +
						// this.quests[prop].questDeadEnemies +
						// '/' +
						// this.quests[prop].questKillEnemyAmount +
						// '\n';
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
	}

	closeMap() {
		console.log('Close Questmap');
	}
}
