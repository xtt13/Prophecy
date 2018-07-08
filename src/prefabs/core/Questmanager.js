// import config from './../../config';
import quests from './../../quests';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

	}

	// Add quest with properties
	addQuest(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();


		this.quests[questID] = quests.quests[questID];

		console.table(this.quests);
		// Set and overwrite Quests
		this.level.safe.setQuests(this.quests);
	}

	// Remove Quest with ID
	removeQuest(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Delete questItem
		delete this.quests[questID];

		// Push the saved quest to masteredQuests
		this.quests.masteredQuests.push(questID);

		// Set and overwrite Quests
		this.level.safe.setQuests(this.quests);
	}

	getQuestByID(questID){
		let quest = quests.quests[questID];
		return quest;
	}

	checkIfQuestExists(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Check if questID in quests
		if (questID in this.quests) {
			return true;
		} else {
			return false;
		}
	}

	checkIfQuestWasDone(masteredQuestID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();
		// Check if masteredQuestID in masteredQuests
		if (this.quests.masteredQuests.includes(masteredQuestID)) {
			return true;
		} else {
			return false;
		}
	}

	checkQuestDialogue(character) {

		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Object -> Array
		var keys = Object.values(this.quests);

		// Reverse Array
		var reversed = keys.reverse(); 

		// Return Dialogue Array
		for (let i = 0; i < reversed.length; i++) {
			if (i == 0) continue;
			if(reversed[i].dialogues[character]){
				return reversed[i].dialogues[character];
			}
		}

		return false;

	}

	// Check Fight Quest-Condition
	checkKillCondition(questID) {
		// Get Quests
		this.quests = this.level.safe.getQuests();

		// Get searched quest
		if (questID in this.quests) {

			console.log(this.quests[questID].questDeadEnemies, this.quests[questID].questKillEnemyAmount);
			console.log(this.quests[questID].questDeadEnemies == this.quests[questID].questKillEnemyAmount);

			// Current Quest -> questDeadEnemies + 1
			this.quests[questID].questDeadEnemies += 1;

			// Save the change
			this.level.safe.setQuests(this.quests);

			// if questDeadEnemies == questKillEnemyAmount (current dead enemies == needed deaths)
			if (this.quests[questID].questDeadEnemies == this.quests[questID].questKillEnemyAmount) {

				// Add new Quest
				this.addQuest(this.quests[questID].fightFinishAddQuestID);

				//Remove current Quest
				this.removeQuest(questID);

				// Create Notification
				this.level.GUICLASS.createNotification('success', 'Questupdate');
			}
		}
	}
}