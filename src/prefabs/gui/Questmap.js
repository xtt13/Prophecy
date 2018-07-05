
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

		this.heading1 = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
		this.heading1.setText('Active Quests:', true, -1, 5, 'left', true)
		this.heading1Sprite = this.game.add.image(this.game.camera.width / 2 - 190, this.game.camera.height / 2 - 70, this.heading1);
		this.heading1Sprite.fixedToCamera = true;
		

		this.text = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        // this.text.setText(content, true, -1, 5, 'left', true)
		this.fontImage = this.game.add.image(this.game.camera.width / 2 - 190, this.game.camera.height / 2 - 50, this.text);
		this.fontImage.fixedToCamera = true;

		let content = '';

		for (let prop in this.quests) {
			if (!isNaN(prop)) {
				if (this.quests[prop].questKillEnemyAmount !== undefined && this.quests[prop].questKillEnemyAmount !== false) {
					content += '* ' + 
						this.quests[prop].questMessage
						+
						': '
						 +
						this.quests[prop].questDeadEnemies +
						'/' +
						this.quests[prop].questKillEnemyAmount +
						'\n';
						
				} else {
					content += '* ' + this.quests[prop].questMessage + '\n';
				}
			}
		}

		this.text.setText(content, true, -1, 5, 'left', true)

		let counter = 0;
		let maxEntries = 3;
		let reversedMasteredQuests = this.quests.masteredQuests.reverse();

		this.heading2 = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
		this.heading2.setText('Mastered Quests:', true, -1, 5, 'left', true);
		this.heading2Sprite = this.game.add.image(this.game.camera.width / 2 - 190, this.game.camera.height / 2 + 10, this.heading2);
		this.heading2Sprite.fixedToCamera = true;


		this.textMastered = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        // this.text.setText(content, true, -1, 5, 'left', true)
		this.fontImageMastered = this.game.add.image(this.game.camera.width / 2 - 190, this.game.camera.height / 2 + 30, this.textMastered);
		this.fontImageMastered.fixedToCamera = true;
		this.fontImageMastered.alpha = 0.3;

		let contentMastered = '';

		for (let i = 0; i < reversedMasteredQuests.length; i++) {
			if (counter < maxEntries) {
				let quest = this.level.questManager.getQuestByID(reversedMasteredQuests[i]);
				if(quest.questMessage == '') continue;
				contentMastered += '* ' + quest.questMessage + '\n';
				counter++;
			}
		}

		this.textMastered.setText(contentMastered, true, -1, 5, 'left', true)


	}

	closeMap() {
		console.log('Close Questmap');
	}
}
