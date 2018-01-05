import Phaser from 'phaser';
import config from './../config';

export default class {
	constructor(game) {
		this.game = game;
	}

	saveGameConfig(playerData){
		playerData.test = "Hallo";
		console.log('Save:');
		console.log(playerData);
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

	resetLocalStorage(){
		localStorage.clear();
	}
	
}
