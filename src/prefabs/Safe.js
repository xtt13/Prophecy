import Phaser from 'phaser';
import config from './../config';
import CryptoJS from 'crypto-js';

export default class {
	constructor(game) {
		this.game = game;
		// let message = CryptoJS.SHA256("Message");
		// console.log(message);
		// console.log(CryptoJS.SHA256);
	}

	setGameConfig(playerData) {
		localStorage.setItem('playerData', JSON.stringify(playerData));
	}

	getGameConfig() {
		let playerData = JSON.parse(localStorage.getItem('playerData'));

		if (playerData == null) {
			let playerData = {
				playerHealth: 100,
				currentMap: 'map1'
			};

			return playerData;
		} else {
			return playerData;
		}
	}

	setItemIDs(itemsIDs) {
		localStorage.setItem('itemIDs', JSON.stringify(itemsIDs));
	}

	getItemIDs() {
		let itemIDs = JSON.parse(localStorage.getItem('itemIDs'));

		if (itemIDs == null) {
			let itemIDs = [];
			return itemIDs;
		} else {
			return itemIDs;
		}
	}

	setGamePreferences(gamePreferences) {
		localStorage.setItem('gamePreferences', JSON.stringify(gamePreferences));
	}

	getGamePreferences() {
		let gamePreferences = JSON.parse(localStorage.getItem('gamePreferences'));

		if (gamePreferences == null) {
			let gamePreferences = {
				muteMusic: false,
				muteSound: false
			};
			return gamePreferences;
		} else {
			return gamePreferences;
		}
	}

	setPlayedDialogues(playedDialogues) {
		localStorage.setItem('playedDialogues', JSON.stringify(playedDialogues));
	}

	getPlayedDialogues() {
		let playedDialogues = JSON.parse(localStorage.getItem('playedDialogues'));

		if (playedDialogues == null) {
			let playedDialogues = [];
			return playedDialogues;
		} else {
			return playedDialogues;
		}
	}

	setQuests(quests) {
		localStorage.setItem('quests', JSON.stringify(quests));
	}

	getQuests() {
		let quests = JSON.parse(localStorage.getItem('quests'));

		if (quests == null) {
			let quests = {
				masteredQuests: {}
			};
			return quests;
		} else {
			return quests;
		}
	}

	removeQuest(id) {
		let quests = this.getQuests();

		for (var i = 0; i < quests.length; i++) {
			if (quests[i][0] == id) {
				quests[i][1] = '';
				// quests.splice(quests[i], 1);
			}
		}

		this.setQuests(quests);

		// let quests = this.getQuests();

		// for (var i = 0; i < quests.length; i++) {
		// 	if (quests[i][0] == id) {
		// 		quests[i][1] = '';
		// 		// quests.splice(quests[i], 1);
		// 	}
		// }

		// this.setQuests(quests);
	}

	resetLocalStorage() {
		localStorage.clear();
	}
}
