import Phaser from 'phaser';
import config from './../config';
import Safe from '../prefabs/Safe';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;
	}

	addQuest(properties){
		this.quests = this.level.safe.getQuests();
		let quest = {
			'id': properties.questID,
			'questMessage': properties.questMessage,
			'questKillEnemyType': properties.questKillEnemyType,
			'questDeadEnemies' : 0,
			'questKillEnemyAmount': properties.questKillEnemyAmount
		}
		this.quests[properties.questID] = quest;
		console.log(this.quests);
		this.level.safe.setQuests(this.quests);
	}

	removeQuest(questID){
		console.log('removeInside');
		this.quests = this.level.safe.getQuests();
		let masteredQuest = this.quests[questID];
		delete this.quests[questID];
		this.quests.masteredQuests[questID] = masteredQuest;
		this.level.safe.setQuests(this.quests);
		console.log(this.quests);
	}

	checkIfQuestExists(questID){
		this.quests = this.level.safe.getQuests();
		if((questID in this.quests || questID in this.quests.masteredQuests)){
			return true;
		} else {
			return false;
		}
	}

	checkKillCondition(questID){
		this.quests = this.level.safe.getQuests();

		if(questID in this.quests){
			if(this.quests[questID].questDeadEnemies > this.quests[questID].questKillEnemyAmount){
				this.level.GUICLASS.createNotification('quest', 'Questupdate');
				this.removeQuest(questID);
			} else {
				this.quests[questID].questDeadEnemies += 1;
				this.level.safe.setQuests(this.quests);
				console.log(this.quests);
			}
		}

	}


}
