import Phaser from 'phaser';
import 'phaser-tilemap-plus';

import Pathfinder from '../prefabs/Pathfinder';
import Bridgebuilder from '../prefabs/Bridgebuilder';
import Questmap from '../prefabs/Questmap';

import dialogues from './../dialogues';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.level.map.plus.physics.enableObjectLayer('Collision');
		this.level.map.plus.events.regions.enableObjectLayer('Events');
		
		this.level.map.plus.events.regions.onEnterAdd(this.level.player, region => {

			if(region.properties.message){
				this.addMessage(region);
			} else if(region.properties.bridge){
				this.addBridge(region);
			} else if(region.properties.pathfinderMessage){
				this.addPathfinderMessage(region)
			} else if(region.properties.port){
				this.addPort(region);
			} else if(region.properties.fightArea){
				this.fightArea(region);
			} else if(region.properties.showQuestmap){
				this.showQuestmap(region);
			} else if(region.properties.addQuest){
				this.addQuest(region);
			}
		});
	}

	addMessage(region){
		const message_id = region.properties.id;
		const all_messages = Object.values(dialogues.dialogues);

		for (let i = 0; i < all_messages.length; i++) {
			if (i + 1 == message_id) {

				if (this.level.playedDialogues.includes(message_id)) return;

				const message = all_messages[i];

				this.level.playedDialogues.push(message_id);
				this.level.safe.setPlayedDialogues(this.level.playedDialogues);
				this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
				break;
			}
		}
	}

	addBridge(region){
		const bridgeID = region.properties.id;
		const requiredID = region.properties.requiredID;

		if (this.level.activatedBridges.includes(bridgeID)) return;

		console.log(this.level.itemIDs);
		console.log(requiredID);

		if (requiredID !== undefined && !this.level.itemIDs.includes(requiredID)) return;

		this.level.bridgebuilder = new Bridgebuilder(
			this.game,
			region,
			this.level.player,
			this.level.map,
			this.level.groundLayer,
			this.level.collisionLayer
		);

		this.level.activatedBridges.push(bridgeID);
	}

	addPathfinderMessage(region){
		const message_id = region.properties.messageID;

		if (this.level.playedDialogues.includes(message_id)) return;
		this.level.playedDialogues.push(message_id);
		this.level.safe.setPlayedDialogues(this.level.playedDialogues);

		if (this.level.pathfinder == undefined) {
			this.level.pathfinder = new Pathfinder(
				this.game,
				this.level.map,
				this.level.characters[0],
				{ x: this.level.player.x, y: this.level.player.y - 50 },
				this.level.groundLayer,
				false,
				200
			);
			this.game.camera.follow(this.level.characters[0], Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
			this.level.player.movable = false;
			this.game.time.events.add(
				Phaser.Timer.SECOND * 3,
				function() {

					this.level.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
					this.level.player.movable = true;

					const message_id = region.properties.messageID;
					const all_messages = Object.values(dialogues.dialogues);

					for (let i = 0; i < all_messages.length; i++) {
						if (i + 1 == message_id) {

							const message = all_messages[i];

							this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);

							this.game.time.events.add(
								Phaser.Timer.SECOND * 8,
								() => {
									this.level.pathfinder = new Pathfinder(
										this.game,
										this.level.map,
										this.level.characters[0],
										{ x: 515, y: 107 },
										this.level.groundLayer,
										false,
										200
									);
								});
							break;
						}
					}
				},
				this
			);
		}
	}

	addPort(region){
		let targetMap = region.properties.targetMap;
		let targetID = region.properties.targetID;

		console.log(this.level.inputClass.stick);
		if(this.level.inputClass.stick){
			this.level.inputClass.stick.destroy();
		}

		this.level.gameData.currentMap = targetMap;
		this.level.gameData.targetID = targetID;
		this.level.safe.setGameConfig(this.level.gameData);

		this.game.state.restart(true, false, {map: targetMap, targetID: targetID });
	}

	fightArea(region){
		this.game.add.tween(this.level.groundLayer).to( { tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		this.game.add.tween(this.level.backgroundLayer).to( { tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		this.game.add.tween(this.level.player).to( { tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);

		for (var i = 0; i < this.level.enemies.length; i++) {		
			this.game.add.tween(this.level.enemies[i]).to( { tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		}
	}

	showQuestmap(region){
		this.level.GUICLASS.createQuestmap();
	}

	addQuest(region){
		this.quests = this.level.safe.getQuests();

		this.stopSearch = false;

		for (var i = 0; i < this.quests.length; i++) {
			if(this.quests[i][0] == region.properties.questID){					
				this.stopSearch = true;
			} 		
		}

		if(this.stopSearch) return;

		

		this.quests.push(
			[region.properties.questID, region.properties.questMessage, false]);

		this.level.safe.setQuests(this.quests);
		this.level.GUICLASS.createNotification('quest', 'Questupdate');
	}

}
