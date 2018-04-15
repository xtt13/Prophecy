/*eslint-disable */
import config from './../../config';
import SecureLS from 'secure-ls';

export default class {
	constructor(game) {
		this.game = game;

		this.secureLS = config.secureLS;
		console.log(this.secureLS);
		this.ls = new SecureLS({ encodingType: 'aes' });
		// this.ls.set('meineVar', 'aöslkdfjaölsdfjkbblaaaaaa');
		// this.ls.get('meineVar'));
	}

	setGameConfig(playerData) {
		if (this.secureLS) {
			this.ls.set('playerData', JSON.stringify(playerData));
		} else {
			localStorage.setItem('playerData', JSON.stringify(playerData));
		}
	}

	getGameConfig() {
		if (this.secureLS) {
			var result = this.ls.get('playerData');
			var playerData = result !== '' ? JSON.parse(result) : null;
		} else {
			var playerData = JSON.parse(localStorage.getItem('playerData'));
		}
		if (playerData == null) {
			var playerData = {
				playerHealth: 100,
				currentMap: config.startMap
			};

			return playerData;
		} else {
			return playerData;
		}
	}

	setItemIDs(itemsIDs) {
		if (this.secureLS) {
			this.ls.set('itemIDs', JSON.stringify(itemsIDs));
		} else {
			localStorage.setItem('itemIDs', JSON.stringify(itemsIDs));
		}
	}

	getItemIDs() {
		if (this.secureLS) {
			var result = this.ls.get('itemIDs');
			var itemIDs = result !== '' ? JSON.parse(result) : null;
		} else {
			var itemIDs = JSON.parse(localStorage.getItem('itemIDs'));
		}

		if (itemIDs == null) {
			var itemIDs = [];
			return itemIDs;
		} else {
			return itemIDs;
		}
	}

	setGamePreferences(gamePreferences) {
		if (this.secureLS) {
			this.ls.set('gamePreferences', JSON.stringify(gamePreferences));
		} else {
			localStorage.setItem('gamePreferences', JSON.stringify(gamePreferences));
		}
	}

	getGamePreferences() {
		if (this.secureLS) {
			var result = this.ls.get('gamePreferences');
			var gamePreferences = result !== '' ? JSON.parse(result) : null;
		} else {
			var gamePreferences = JSON.parse(localStorage.getItem('gamePreferences'));
		}

		if (gamePreferences == null) {
			var gamePreferences = {
				muteMusic: false,
				muteSound: false
			};
			return gamePreferences;
		} else {
			return gamePreferences;
		}
	}

	setQuests(quests) {
		if (this.secureLS) {
			this.ls.set('quests', JSON.stringify(quests));
		} else {
			localStorage.setItem('quests', JSON.stringify(quests));
		}
	}

	getQuests() {
		if (this.secureLS) {
			var result = this.ls.get('quests');
			var quests = result !== '' ? JSON.parse(result) : null;
		} else {
			var quests = JSON.parse(localStorage.getItem('quests'));
		}

		if (quests == null) {
			var quests = {
				masteredQuests: []
			};
			return quests;
		} else {
			return quests;
		}
	}

	removeQuest(id) {
		var quests = this.getQuests();

		for (var i = 0; i < quests.length; i++) {
			if (quests[i][0] == id) {
				quests[i][1] = '';
				// quests.splice(quests[i], 1);
			}
		}

		this.setQuests(quests);
	}

	resetLocalStorage() {
		localStorage.clear();
	}
}
