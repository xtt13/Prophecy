import Phaser from 'phaser';
import 'phaser-tilemap-plus';

import Pathfinder from '../gamemechanics/Pathfinder';
import Bridgebuilder from '../gamemechanics/Bridgebuilder';
import Questmap from '../gui/Questmap';
import Enemy from '../beings/Enemy';

import dialogues from './../../dialogues';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.spawnEnemiesRunning = false;

		this.level.map.plus.physics.enableObjectLayer('Collision');
		this.level.map.plus.events.regions.enableObjectLayer('Events');

		this.level.map.plus.events.regions.onEnterAdd(this.level.player, region => {
			if (region.properties.message) {
				this.addMessage(region);
			} else if (region.properties.addBridge) {
				this.addBridge(region);
			} else if (region.properties.removeBridge) {
				this.removeBridge(region);
			} else if (region.properties.pathfinderMessage) {
				this.addPathfinderMessage(region);
			} else if (region.properties.port) {
				this.addPort(region);
			} else if (region.properties.fightArea) {
				this.fightArea(region);
			} else if (region.properties.showQuestmap) {
				this.showQuestmap(region);
			} else if (region.properties.startMusic) {
				this.startMusic(region);
			} else if (region.properties.addQuest) {
				this.addQuest(region);
			} else if (region.properties.openDoor) {
				this.openDoor(region);
			} else if (region.properties.movePlayerToXY) {
				this.movePlayerToXY(region);
			} else if (region.properties.spawnEnemies) {
				this.spawnEnemies(region);
			} else if (region.properties.lockCamera) {
				this.lockCamera(region);
			} else if (region.properties.foreGroundShift) {
				this.foreGroundShift(region);
			} else if (region.properties.stairs) {
				this.stairsEnter(region);
			} else if (region.properties.soundArea) {
				this.soundAreaEnter(region);
			}
		});

		this.level.map.plus.events.regions.onLeaveAdd(this.level.player, region => {
			if (region.properties.lockCamera) {
				this.followPlayer(region);
			} else if (region.properties.foreGroundShift) {
				this.foreGroundReset(region);
			} else if (region.properties.stairs) {
				this.stairsLeave(region);
			} else if (region.properties.soundArea) {
				this.soundAreaLeave(region);
			}
		});
	}

	addMessage(region) {
		const message_id = region.properties.id;
		const all_messages = Object.values(dialogues.dialogues);

		for (let i = 0; i < all_messages.length; i++) {
			if (i + 1 == message_id) {
				if (this.level.playedDialogues.includes(message_id)) return;

				if (region.properties.removeQuestID !== undefined) {
					this.level.questManager.removeQuest(region.properties.removeQuestID);
				}

				if (this.level.questManager.checkIfQuestExists(region.properties.questID)) return;
				this.level.questManager.addQuest(region.properties);
				this.level.GUICLASS.createNotification('quest', 'Questupdate');

				const message = all_messages[i];

				this.level.playedDialogues.push(message_id);
				this.level.safe.setPlayedDialogues(this.level.playedDialogues);
				this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
				break;
			}
		}
	}

	addBridge(region) {
		const bridgeID = region.properties.id;
		const requiredItemID = region.properties.requiredItemID;
		const requiredMasteredQuestID = region.properties.requiredMasteredQuestID;

		if (
			!this.level.questManager.checkIfQuestWasDone(region.properties.requiredMasteredQuestID) &&
			requiredMasteredQuestID !== undefined
		)
			return;

		if (this.level.activatedBridges.includes(bridgeID)) return;

		if (requiredItemID !== undefined && !this.level.itemIDs.includes(requiredItemID)) return;

		if (region.properties.removeQuestID !== undefined) {
			this.level.questManager.removeQuest(region.properties.removeQuestID);
		}

		this.level.bridgebuilder = new Bridgebuilder(
			this.game,
			region,
			this.level.player,
			this.level.map,
			this.level.groundLayer,
			this.level.collisionLayer
		);
		this.level.bridgebuilder.buildBridge();

		this.level.activatedBridges.push(bridgeID);
	}

	removeBridge(region) {
		const bridgeID = region.properties.id;
		const requiredItemID = region.properties.requiredItemID;
		const requiredMasteredQuestID = region.properties.requiredMasteredQuestID;

		if (
			!this.level.questManager.checkIfQuestWasDone(region.properties.requiredMasteredQuestID) &&
			requiredMasteredQuestID !== undefined
		)
			return;

		if (this.level.activatedBridges.includes(bridgeID)) return;

		if (region.properties.removeQuestID !== undefined) {
			this.level.questManager.removeQuest(region.properties.removeQuestID);
		}

		this.level.bridgebuilder = new Bridgebuilder(
			this.game,
			region,
			this.level.player,
			this.level.map,
			this.level.groundLayer,
			this.level.collisionLayer
		);

		this.level.bridgebuilder.removeBridge();

		this.level.activatedBridges.push(bridgeID);
	}

	movePlayerToXY(region) {
		const targetX = region.properties.targetX;
		const targetY = region.properties.targetY;

		if (this.level.pathfinder == undefined) {
			this.level.pathfinder = new Pathfinder(
				this.game,
				this.level.map,
				this.level.player,
				{ x: targetX, y: targetY },
				this.level.groundLayer,
				false,
				200
			);
		}
	}

	addPathfinderMessage(region) {
		const message_id = region.properties.messageID;
		const characterID = region.properties.characterID;
		const requiredMasteredQuestID = region.properties.requiredMasteredQuestID;

		if (
			!this.level.questManager.checkIfQuestWasDone(region.properties.requiredMasteredQuestID) &&
			requiredMasteredQuestID !== undefined
		)
			return;

		if (this.level.playedDialogues.includes(message_id)) return;
		this.level.playedDialogues.push(message_id);
		this.level.safe.setPlayedDialogues(this.level.playedDialogues);

		for (var i = 0; i < this.level.characters.length; i++) {
			if (this.level.characters[i].id == characterID) {
				this.pathfinderCharacter = this.level.characters[i];
			} else {
				console.warn('Character not found!');
			}
		}

		if (this.level.pathfinder == undefined) {
			this.level.pathfinder = new Pathfinder(
				this.game,
				this.level.map,
				this.pathfinderCharacter,
				{ x: this.level.player.x, y: this.level.player.y - 50 },
				this.level.groundLayer,
				true,
				400
			);

			this.game.camera.follow(this.level.characters[0], Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
			this.level.player.movable = false;

			this.game.time.events.add(
				Phaser.Timer.SECOND * region.properties.messageWaitingDuration,
				() => {
					this.level.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
					this.level.player.movable = true;

					const message_id = region.properties.messageID;
					const all_messages = Object.values(dialogues.dialogues);

					for (let i = 0; i < all_messages.length; i++) {
						if (i + 1 == message_id) {
							const message = all_messages[i];

							this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);

							this.game.time.events.add(Phaser.Timer.SECOND * 8, () => {
								if (this.level.questManager.checkIfQuestExists(region.properties.questID)) return;

								this.level.questManager.addQuest(region.properties);

								this.level.GUICLASS.createNotification('quest', 'Questupdate');

								if (
									region.properties.endDestinationX !== 'currentPosition' &&
									region.properties.endDestinationY !== 'currentPosition'
								) {
									this.endDestinationX = region.properties.endDestinationX;
									this.endDestinationY = region.properties.endDestinationY;

									this.level.pathfinder = new Pathfinder(
										this.game,
										this.level.map,
										this.pathfinderCharacter,
										{ x: this.endDestinationX, y: this.endDestinationY },
										this.level.groundLayer,
										false,
										400
									);
								}
							});
							break;
						}
					}
				},
				this
			);
		}
	}

	addPort(region) {
		let targetMap = region.properties.targetMap;
		let targetID = region.properties.targetID;

		if (this.level.inputClass.stick) {
			this.level.inputClass.stick.alpha = 0;
			this.level.inputClass.stick.enabled = false;
		}

		this.level.gameData.currentMap = targetMap;
		this.level.gameData.targetID = targetID;
		this.level.safe.setGameConfig(this.level.gameData);

		console.log('TargetMap: ' + targetMap);

		if (this.level.inputClass.pyfootsteps) {
			this.level.inputClass.pyfootsteps.stop('gravel1');
		}

		this.game.state.restart(true, false, { map: targetMap, targetID: targetID });
	}

	fightArea(region) {
		this.game.add
			.tween(this.level.groundLayer)
			.to({ tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		this.game.add
			.tween(this.level.backgroundLayer)
			.to({ tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		this.game.add
			.tween(this.level.player)
			.to({ tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);

		for (var i = 0; i < this.level.enemies.length; i++) {
			this.game.add
				.tween(this.level.enemies[i])
				.to({ tint: 0x000000 }, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		}
	}

	showQuestmap(region) {
		this.level.GUICLASS.createQuestmap();
	}

	addQuest(region) {
		if (this.level.questManager.checkIfQuestExists(region.properties.questID)) return;

		this.level.questManager.addQuest(region.properties);

		this.level.GUICLASS.createNotification('quest', 'Questupdate');
	}

	openDoor(region) {
		if (this.level.gameData.targetID == 3) {
			this.level.door.animations.play('idle', 1, true);
		} else {
			this.level.door.animations.play('open', 8, false);
		}
		// this.game.camera.shake(0.0015, 10000, true);
	}

	spawnEnemies(region) {
		// Prevent from always spawning when triggering event!
		if (this.spawnEnemiesRunning) return;

		if (this.level.questManager.checkIfQuestWasDone(region.properties.questID)) return;

		this.spawnEnemiesRunning = true;

		if (!this.level.questManager.checkIfQuestExists(region.properties.questID)) {
			this.level.questManager.addQuest(region.properties);
		}

		for (var i = 0; i < region.properties.amount; i++) {
			const rndX = this.game.rnd.integerInRange(0, 1);
			const rndY = this.game.rnd.integerInRange(0, 1);

			const x = rndX ? region.left : region.right;
			const y = rndY ? region.top : region.bottom;

			// const x = this.game.rnd.integerInRange(region.left, region.right);
			// const y = this.game.rnd.integerInRange(region.top, region.bottom);

			this.level.enemies.push(
				new Enemy(this.game, x, y, this.level.player, this.level.map, this.level.groundLayer, region.properties)
			);

			// for (var i = 0; i < this.level.enemies.length; i++) {

			// 	this.game.add
			// 	.tween(this.level.enemies[i])
			// 	.from( { y: -200 }, 1500, Phaser.Easing.Bounce.Out, true);

			// }
		}
	}

	lockCamera(region) {
		console.log(region);

		const diff1 = region.right - region.left;
		const diff2 = region.bottom - region.top;
		const cameraX = region.left + diff1 / 2;
		const cameraY = region.bottom - diff2 / 2;

		console.log(cameraX, cameraY);

		this.game.camera.unfollow();
		// this.game.camera.lerp = 0.1;
		// this.game.camera.focusOnXY(cameraX, cameraY);

		this.game.add
			.tween(this.game.camera)
			.to(
				{ x: cameraX - this.game.camera.width / 2, y: cameraY - this.game.camera.height / 2 },
				750,
				Phaser.Easing.Quadratic.InOut,
				true
			);
	}

	followPlayer(region) {
		this.followTween = this.game.add
			.tween(this.game.camera)
			.to(
				{ x: this.level.player.x - this.game.camera.width / 2, y: this.level.player.y - this.game.camera.height / 2 },
				400,
				Phaser.Easing.Quadratic.InOut,
				true
			);

		this.followTween.onComplete.add(() => {
			this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		}, this);
	}

	startMusic(region) {
		if (this.level.muteMusic) return;
		this.game.musicPlayer.initMap(this.level.tilemapProperties, true, 10000);
	}

	foreGroundShift(region) {
		console.log('SHIFT');
		this.level.foreGroundShift = true;
	}

	foreGroundReset(region) {
		this.level.foreGroundShift = false;
	}

	stairsEnter(region) {
		if (this.level.fallDown) return;
		this.level.inputClass.playerSpeed -= 30;

		this.level.player.animations._anims.run_up.speed += 10;
		this.level.player.animations._anims.run_down.speed += 10;
		this.level.inputClass.pyfootsteps.stop('gravel1');
		this.level.inputClass.pyfootsteps.play('grass1', 4);
		this.level.inputClass.currentUnderground = 'stone';
	}

	stairsLeave(region) {
		if (this.level.fallDown) return;
		this.level.inputClass.playerSpeed += 30;
		// this.level.player.animations._anims.run_down.speed -= 20;
		// this.level.player.animations._anims.run_up.speed -= 20;
		this.level.player.animations._anims.run_down.speed = 15;
		this.level.player.animations._anims.run_up.speed = 15;

		this.level.inputClass.pyfootsteps.stop('grass1');
		this.level.inputClass.pyfootsteps.play('gravel1', 4);
		this.level.inputClass.currentUnderground = 'grass';
	}

	soundAreaEnter(region) {
		console.log('ISDFJISDFJ');
		this.areaSound = game.add.audio(region.properties.soundkey);
		this.areaSound.fadeIn(2000);
	}

	soundAreaLeave(region) {
		this.areaSound.fadeOut(2000);
	}
}
