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

	setGameConfig(playerData){
		localStorage.setItem("playerData", JSON.stringify(playerData));
	}

	getGameConfig(){
		let playerData = JSON.parse(localStorage.getItem("playerData"));
		console.log('Get:');
		console.log(playerData);

		if(playerData == null){
			console.log('First Save');

			let playerData = {
				playerHealth: 100,
				currentMap: 'map1'
			};

			return playerData;
		} else {
			return playerData;
		}


	}

	setItemIDs(itemsIDs){
		localStorage.setItem("itemIDs", JSON.stringify(itemsIDs));
	}

	getItemIDs(){
		let itemIDs = JSON.parse(localStorage.getItem("itemIDs"));

		if(itemIDs == null){
			let itemIDs = [];
			return itemIDs;
		} else {
			return itemIDs;
		}

	}

	setPlayedDialogues(playedDialogues){
		localStorage.setItem("playedDialogues", JSON.stringify(playedDialogues));
	}

	getPlayedDialogues(){
		let playedDialogues = JSON.parse(localStorage.getItem("playedDialogues"));

		if(playedDialogues == null){
			let playedDialogues = [];
			return playedDialogues;
		} else {
			return playedDialogues;
		}
	}

	resetLocalStorage(){
		localStorage.clear();
	}
	
}
