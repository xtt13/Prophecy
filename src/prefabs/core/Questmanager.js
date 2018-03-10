import Phaser from 'phaser';
import config from './../../config';
import Safe from './Safe';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;
	}

	// Add quest with properties
	addQuest(properties) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Fill Template
		let quest = {
			id: properties.questID,
			silent: properties.silent,
			questMessage: properties.questMessage,
			questKillEnemyType: properties.questKillEnemyType,
			questDeadEnemies: 1,
			questKillEnemyAmount: properties.questKillEnemyAmount
		};

		this.quests[properties.questID] = quest;

		console.log(this.quests);

		// Set and overwrite Quests
		this.level.safe.setQuests(this.quests);
	}

	// Remove Quest with ID
	removeQuest(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Get and save the removable questItem
		let masteredQuest = this.quests[questID];

		// Delete questItem
		delete this.quests[questID];

		// Push the saved quest to masteredQuests
		this.quests.masteredQuests[questID] = masteredQuest;

		// Set and overwrite Quests
		this.level.safe.setQuests(this.quests);
	}

	checkIfQuestExists(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Check if questID in quests || masteredQuests
		if (questID in this.quests || questID in this.quests.masteredQuests) {
			return true;
		} else {
			return false;
		}
	}

	checkIfQuestWasDone(masteredQuestID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Check if masteredQuestID in masteredQuests
		if (masteredQuestID in this.quests.masteredQuests) {
			return true;
		} else {
			return false;
		}
	}

	// Check Fight Quest-Condition
	checkKillCondition(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Get searched quest
		if (questID in this.quests) {
			console.log(this.quests[questID].questDeadEnemies, this.quests[questID].questKillEnemyAmount);

			// if questDeadEnemies == questKillEnemyAmount (current dead enemies == needed deaths)
			if (this.quests[questID].questDeadEnemies == this.quests[questID].questKillEnemyAmount) {
				// Remove current Quest
				this.removeQuest(questID);

				// Create Notification
				if (this.quests[questID].silent) return;
				this.level.GUICLASS.createNotification('quest', 'Questupdate');
			} else {
				// Current Quest -> questDeadEnemies + 1
				this.quests[questID].questDeadEnemies += 1;

				// Save the change
				this.level.safe.setQuests(this.quests);
			}
		}
	}
}
