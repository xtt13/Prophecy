import Phaser from 'phaser';
import 'phaser-tilemap-plus';
import config from './../../config';

import Pathfinder from '../gamemechanics/Pathfinder';
import Bridgebuilder from '../gamemechanics/Bridgebuilder';
import Enemy from '../beings/Enemy';

import dialogues from './../../dialogues';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.spawnEnemiesRunning = false;
		this.templeDoorOpen = false;
		this.bossDoorOpen = false;
		this.spotViewerPlayed = false;
		this.spotViewerPlayedSwitch = false;
		this.areaSoundOnce = false;

		this.level.map.plus.physics.enableObjectLayer('Collision');
		this.level.map.plus.events.regions.enableObjectLayer('Events');

		this.level.map.plus.events.collisions.add(this.level.player, (shape, oldVelocity, newVelocity, contactNormal) => {
			this.level.inputClass.collision = true;

			this.game.time.events.add(500, () => {
				this.level.inputClass.collision = false;
			});
		});

		for (var i = 0; i < this.level.player.weaponGun.bullets.children.length; i++) {
			let bullet = this.level.player.weaponGun.bullets.children[i];
			this.level.map.plus.events.collisions.add(bullet, (shape, oldVelocity, newVelocity, contactNormal) => {

				this.game.camera.shake(0.003, 100);

				let explosion = this.game.add.emitter(bullet.x, bullet.y, 100);
				explosion.fixedToCamera = true;
				explosion.setAlpha(1, 0, 2000, null, false);
				explosion.setXSpeed(this.game.rnd.integerInRange(-100, 100));
				explosion.gravity = 150;
				explosion.setYSpeed(-100);
				explosion.makeParticles('bulletParticle', 100);
				explosion.start(true, 0, null, 10);

				this.game.time.events.add(2000, () => {
					explosion.destroy();
				}, this);

				bullet.kill();
			});
		}



		this.level.map.plus.events.regions.onEnterAdd(this.level.player, region => {
			if (region.properties.message) {
				this.message(region);
			} else if (region.properties.addBridge) {
				this.addBridge(region);
			} else if (region.properties.removeBridge) {
				this.removeBridge(region);
			} else if (region.properties.pathfinderMessage) {
				this.pathfinderMessage(region);
			} else if (region.properties.port) {
				this.port(region);
			} else if (region.properties.fightArea) {
				this.fightArea(region);
			} else if (region.properties.showQuestmap) {
				this.showQuestmap(region);
			} else if (region.properties.startMusic) {
				this.startMusic(region);
			} else if (region.properties.addQuest) {
				this.addQuest(region);
			} else if (region.properties.openTempleDoor) {
				this.openTempleDoor(region);
			} else if (region.properties.movePlayerToXY) {
				this.movePlayerToXY(region);
			} else if (region.properties.spawnEnemies) {
				this.spawnEnemies(region);
			} else if (region.properties.lockCamera) {
				this.lockCamera(region);
			} else if (region.properties.foreGroundShift) {
				this.foreGroundShift(region);
			} else if (region.properties.stairs) {
				this.stairs(region);
			} else if (region.properties.soundArea) {
				this.soundArea(region);
			} else if (region.properties.quickSave) {
				this.quickSave(region);
			} else if (region.properties.branch) {
				this.branch(region);
			} else if (region.properties.openBossDoor) {
				this.openBossDoor(region);
			} else if (region.properties.spotViewer) {
				this.spotViewer(region);
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
			} else if (region.properties.openBossDoor) {
				this.closeBossDoor(region);
			} else if (region.properties.spotViewer) {
				this.followPlayer(region);
			}
		});
	}

	message(region) {
		const message_id = region.properties.id;
		const all_messages = Object.values(dialogues.dialogues);
		const ifQuestID = region.properties.ifQuestID;
		const removeQuestID = region.properties.removeQuestID;
		const addQuestID = region.properties.addQuestID;


		if (!this.level.questManager.checkIfQuestExists(ifQuestID) && ifQuestID !== undefined) return;
		if (this.level.questManager.checkIfQuestWasDone(ifQuestID)) return;

		console.log('New QuestID: ' + addQuestID);
		if(addQuestID !== undefined){		
			this.level.questManager.addQuest(addQuestID);
		}


		if (removeQuestID !== undefined) {
			this.level.questManager.removeQuest(removeQuestID);
		}

		for (let i = 0; i < all_messages.length; i++) {
			if (i + 1 == message_id) {

				// if (region.properties.removeQuestID !== undefined) {
				// 	this.level.questManager.removeQuest(region.properties.removeQuestID);
				// }

				// if (this.level.questManager.checkIfQuestExists(region.properties.questID)) return;
				// this.level.questManager.addQuest(region.properties.questID);
				// this.level.GUICLASS.createNotification('quest', 'Questupdate');

				const message = all_messages[i];

				this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
				break;
			}
		}
	}

	addBridge(region) {
		const bridgeID = region.properties.id;
		const requiredItemID = region.properties.requiredItemID;
		const requiredMasteredQuestID = region.properties.requiredMasteredQuestID;

		if (!this.level.questManager.checkIfQuestWasDone(region.properties.requiredMasteredQuestID) &&
			requiredMasteredQuestID !== undefined
		){
			return;
		}

		

		if (this.level.activatedBridges.includes(bridgeID)) return;

		if (requiredItemID !== undefined && !this.level.itemIDs.includes(requiredItemID)) return;

		if (region.properties.removeQuestID !== undefined) {
			this.level.questManager.removeQuest(region.properties.removeQuestID);
		}


		if (region.properties.addQuestID !== undefined) {
			if (this.level.questManager.checkIfQuestExists(region.properties.addQuestID) && this.level.questManager.checkIfQuestWasDone(region.properties.addQuestID)){
				this.level.questManager.addQuest(region.properties.addQuestID);
			}	
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
		// const requiredItemID = region.properties.requiredItemID;
		const requiredMasteredQuestID = region.properties.requiredMasteredQuestID;

		if (!this.level.questManager.checkIfQuestWasDone(region.properties.requiredMasteredQuestID) &&
			requiredMasteredQuestID !== undefined
		)
			return;

		if (this.level.activatedBridges.includes(bridgeID)) return;

		if (region.properties.removeQuestID !== undefined) {
			this.level.questManager.removeQuest(region.properties.removeQuestID);
		}

		this.bridgebuilderRemove = new Bridgebuilder(
			this.game,
			region,
			this.level.player,
			this.level.map,
			this.level.groundLayer,
			this.level.collisionLayer
		);

		// If Wait -> Wait
		if (region.properties.wait !== undefined) {
			this.game.time.events.add(
				region.properties.wait, () => {
					this.bridgebuilderRemove.removeBridge();
				});
		} else {
			this.bridgebuilderRemove.removeBridge();
		}

		this.level.activatedBridges.push(bridgeID);
	}

	movePlayerToXY(region) {
		const targetX = region.properties.targetX;
		const targetY = region.properties.targetY;

		if (this.level.movePlayerPathfinder == undefined) {
			this.level.movePlayerPathfinder = new Pathfinder(
				this.game,
				this.level.map,
				this.level.player, {
					x: targetX,
					y: targetY
				},
				this.level.groundLayer,
				false,
				400
			);

		}
		// this.level.player.animations.stop();
		this.level.player.animations.play('run_up', 19, true);
	}

	pathfinderMessage(region) {

		const characterID = region.properties.characterID;
		const requiredMasteredQuestID = region.properties.requiredMasteredQuestID;
		const ifQuestID = region.properties.ifQuestID;

		if (!this.level.questManager.checkIfQuestExists(ifQuestID) && ifQuestID !== undefined) return;

		if (!this.level.questManager.checkIfQuestWasDone(region.properties.requiredMasteredQuestID) &&
			requiredMasteredQuestID !== undefined
		)
			return;



		if (region.properties.removeQuestID !== undefined) {
			this.level.questManager.removeQuest(region.properties.removeQuestID);
		}

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
				this.pathfinderCharacter, {
					x: this.level.player.x,
					y: this.level.player.y - 50
				},
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
					this.level.player.animations.play('idle_up');

					const message_id = region.properties.messageID;
					const all_messages = Object.values(dialogues.dialogues);


					for (let i = 0; i < all_messages.length; i++) {
						if (i + 1 == message_id) {
							const message = all_messages[i];

							this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);

							this.game.time.events.add(Phaser.Timer.SECOND * 8, () => {

								if (
									region.properties.endDestinationX !== 'currentPosition' &&
									region.properties.endDestinationY !== 'currentPosition'
								) {
									this.endDestinationX = region.properties.endDestinationX;
									this.endDestinationY = region.properties.endDestinationY;

									this.level.pathfinder = new Pathfinder(
										this.game,
										this.level.map,
										this.pathfinderCharacter, {
											x: this.endDestinationX,
											y: this.endDestinationY
										},
										this.level.groundLayer,
										false,
										400
									);
								}

								if (this.level.questManager.checkIfQuestExists(region.properties.questID)) return;
								this.level.questManager.addQuest(region.properties.questID);

								this.level.GUICLASS.createNotification('quest', 'Questupdate');

							});
							break;
						}
					}
				},
				this
			);
		}
	}

	quickSave(region) {
		let targetID = region.properties.targetID;
		let direction = region.properties.direction;

		this.level.gameData.targetID = targetID;
		this.level.gameData.direction = direction;
		this.level.safe.setGameConfig(this.level.gameData);

		// this.level.GUICLASS.createNotification('quest', 'Save...');

	}

	port(region) {
		let targetMap = region.properties.targetMap;
		let targetID = region.properties.targetID;
		let direction = region.properties.direction;

		config.buildMode = false;


		if (this.level.inputClass.stick) {
			this.level.inputClass.stick.alpha = 0;
			this.level.inputClass.stick.enabled = false;
		}

		this.level.gameData.currentMap = targetMap;
		this.level.gameData.targetID = targetID;
		this.level.gameData.direction = direction;
		this.level.safe.setGameConfig(this.level.gameData);

		console.log('TargetMap: ' + targetMap);

		if (this.level.inputClass.pyfootsteps) {
			this.level.inputClass.pyfootsteps.stop('gravel1');
		}

		this.game.state.restart(true, false, {
			map: targetMap,
			targetID: targetID,
			direction: direction
		});
	}

	fightArea() {
		this.game.add
			.tween(this.level.groundLayer)
			.to({
				tint: 0x000000
			}, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		this.game.add
			.tween(this.level.backgroundLayer)
			.to({
				tint: 0x000000
			}, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		this.game.add
			.tween(this.level.player)
			.to({
				tint: 0x000000
			}, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);

		for (var i = 0; i < this.level.enemies.length; i++) {
			this.game.add
				.tween(this.level.enemies[i])
				.to({
					tint: 0x000000
				}, 10000, Phaser.Easing.Exponential.In, true, 0, true, true);
		}
	}

	showQuestmap() {
		this.level.GUICLASS.createQuestmap();
	}

	addQuest(region) {
		if (this.level.questManager.checkIfQuestExists(region.properties.questID)) return;

		if (this.level.questManager.checkIfQuestWasDone(region.properties.questID)) return;

		this.level.questManager.addQuest(region.properties.questID);

		this.level.GUICLASS.createNotification('quest', 'Questupdate');
	}

	openTempleDoor() {
		if (this.level.gameData.targetID == 2) {
			this.level.levelBuilder.templeDoor.animations.play('idle', 1, true);
		} else {

			// if(!this.level.questManager.checkIfQuestExists(20)) return;
			if(this.templeDoorOpen) return;

			this.doorOpenSound = this.game.add.audio('sfxstonedoor');
			this.doorOpenSound.play();

			this.level.levelBuilder.templeDoor.animations.play('open', 8, false);
			this.game.camera.shake(0.0015, 2500, true);
			
			

			// this.level.levelBuilder.templeDoor.animations._anims.open.onComplete.add(() => {
			// 	this.templeDoorOpen = true;
			// }, this);

		}



	}

	spawnEnemies(region) {
		// Prevent from always spawning when triggering event!
		if (this.spawnEnemiesRunning) return;

		if (this.level.questManager.checkIfQuestWasDone(region.properties.questID)) return;

		this.spawnEnemiesRunning = true;

		if (!this.level.questManager.checkIfQuestExists(region.properties.questID)) {
			this.level.questManager.addQuest(region.properties.questID);
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
		

		const diff1 = region.right - region.left;
		const diff2 = region.bottom - region.top;
		const cameraX = region.left + diff1 / 2;
		const cameraY = region.bottom - diff2 / 2;

		if(this.level.questManager.checkIfQuestWasDone(1) && !this.level.questManager.checkIfQuestWasDone(2)) return;

		if (this.level.gameData.currentMap == 'map1' && this.level.gameData.targetID == 1) {
			this.transitionTime = 1;
		} else if(this.level.gameData.currentMap == 'map3' && this.level.gameData.targetID == 2 && region.properties.id == 2){
			this.transitionTime = 1;
		} else {
			// this.transitionTime = 750;
			this.transitionTime = 2000;
		}


		this.game.camera.unfollow();
		// this.game.camera.lerp = 0.1;
		// this.game.camera.focusOnXY(cameraX, cameraY);

		this.game.add
			.tween(this.game.camera)
			.to({
					x: cameraX - this.game.camera.width / 2,
					y: cameraY - this.game.camera.height / 2
				},
				this.transitionTime,
				Phaser.Easing.Quadratic.InOut,
				true
			);
	}

	followPlayer(event, duration) {
		// this.followDuration = duration  || 1000;
		this.followDuration = duration  || 2000;

		this.followTween = this.game.add
			.tween(this.game.camera)
			.to({
					x: this.level.player.x - (this.game.camera.width / 2) - 20,
					y: this.level.player.y - (this.game.camera.height / 2)
				},
				this.followDuration,
				Phaser.Easing.Quadratic.InOut,
				true
			);

		this.followTween.onComplete.add(() => {

			switch (this.level.tilemapProperties.cameraMode) {
				case 'follow':
					this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
					break;

				case 'topdown':
					this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.07, 0.07);
					break;

				default:
					console.warn('Default Camera Mode!');
					this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
					break;
			}

		}, this);
	}

	startMusic() {
		if (this.level.muteMusic) return;
		this.game.musicPlayer.initMap(this.level.tilemapProperties, true, 10000);
	}

	foreGroundShift() {
		this.level.foreGroundShift = true;
	}

	foreGroundReset() {
		this.level.foreGroundShift = false;
	}

	stairs() {
		// Return on Fall Down
		if (this.level.fallDown) return;

		// Clear and set new Loop-Speed
		this.game.time.events.remove(this.level.inputClass.movementloop);
		this.level.inputClass.movementloop = null;
		this.level.inputClass.movementloopSpeed = 190;
		this.level.inputClass.addMovementSound();

		// Set new Sound-Type
		this.level.inputClass.movementSound = 'grass1';

		// Set Player-Speed
		this.level.inputClass.playerSpeed -= 20;

		// Set Animation Speed
		this.level.player.animations._anims.run_up.speed += 13;
		this.level.player.animations._anims.run_down.speed += 13;
		this.level.player.animations._anims.run_left.speed += 8;
		this.level.player.animations._anims.run_right.speed += 8;

	}

	stairsLeave() {
		// Return on Fall Down
		if (this.level.fallDown) return;

		// Clear and set new Loop-Speed
		this.game.time.events.remove(this.level.inputClass.movementloop);
		this.level.inputClass.movementloop = null;
		this.level.inputClass.movementloopSpeed = this.level.inputClass.movementloopSpeedDefault;
		this.level.inputClass.addMovementSound();

		// Set new Sound-Type
		this.level.inputClass.movementSound = this.level.map.plus.properties.ground;

		// Set Player-Speed
		this.level.inputClass.playerSpeed = this.level.inputClass.playerSpeedDefault;

		// Set Animation Speed
		this.level.player.animations._anims.run_down.speed = 19;
		this.level.player.animations._anims.run_up.speed = 19;
		this.level.player.animations._anims.run_left.speed = 19;
		this.level.player.animations._anims.run_right.speed = 19;

	}

	soundArea(region) {
		if(region.properties.nightMode && this.level.night) return;
		if(region.properties.once){
			if(this.areaSoundOnce) return;
		}
		this.areaSoundOnce = true;

		this.areaSound = this.game.add.audio(region.properties.soundkey);
		this.areaSound.fadeIn(4000);
	}

	soundAreaLeave(region) {
		if(region.properties.nightMode && this.level.night) return;
		this.areaSound.fadeOut(500);
	}

	soundAreaVillager(region){

	}

	soundAreaVillagerLeave(region) {
		this.areaSound.fadeOut(4000);
	}

	branch(region) {
		if (this.level.questManager.checkIfQuestWasDone(1)) return;

		this.game.canvas.classList.add('greyscale');
		this.followPlayer(null, 4000);
		
		this.level.questManager.addQuest(1);
		this.level.questManager.removeQuest(1);
		this.level.questManager.addQuest(2);

		this.level.GUICLASS.healthBar.removeHeart(5, false);
		this.level.player.health = 2;
		this.level.gameData.playerHealth = 2;
		this.level.safe.setGameConfig(this.level.gameData);
		// this.game.camera.follow(this.level.player, Phaser.Camera.FOLLOW_LOCKON, 0.01, 0.01);
		// this.level.GUICLASS.createMessage([' WTF?'], false, true);
		this.level.player.movable = false;

		this.branchTween = this.game.add
			.tween(this.level.levelBuilder.branch)
			.to({
				y: this.level.player.y - 20,
				angle: this.level.levelBuilder.branch.angle + 10
			}, 500, Phaser.Easing.Bounce.Out, true, 0, 0, false);


		this.game.time.events.add(
			250,
			() => {
				this.game.camera.flash(0xc10000, 400, true);
			}, this);

		this.game.time.events.add(
			2000,
			() => {
				
				
				this.game.add.tween(this.level.levelBuilder.branch).to({
					alpha: 0
				}, 250, Phaser.Easing.Bounce.Out, true);
				
				this.level.gameOver();

				this.game.time.events.add(
					5000,
					() => {
						this.game.camera.fade(0x000000, 5000, true);
					}, this);
				}, this);

		this.game.time.events.add(
			13000,
			() => {
				this.game.canvas.classList.remove('greyscale');
				this.game.state.restart(true, false);
			}, this);

	}


	openBossDoor() {
		// if(!this.level.questManager.checkIfQuestExists(20)) return;
		if(this.bossDoorOpen) return;
		this.doorOpenSound = this.game.add.audio('sfxstonedoor');

		if (this.level.levelBuilder.bossDoor.animations._anims.close.isPlaying) {
			// this.level.levelBuilder.bossDoor.animations._anims.close.onComplete.add(() => {
				// this.game.time.events.add(
				// 	2500,
				// 	() => {
				// 		this.doorOpenSound.play();
				// 		this.game.camera.shake(0.0015, 2500, true);
				// 		this.level.levelBuilder.bossDoor.play('open', 15, false);
				// 	}, this);
			// }, this);
		} else {
			this.doorOpenSound.play();
			this.game.camera.shake(0.0015, 2500, true);
			this.level.levelBuilder.bossDoor.play('open', 15, false);
		}

		this.level.levelBuilder.bossDoor.animations._anims.open.onComplete.add(() => {
			this.bossDoorOpen = true;
		}, this);

	}

	closeBossDoor() {
		// if(!this.level.questManager.checkIfQuestExists(20)) return;

	// 	this.doorOpenSound = this.game.add.audio('sfxstonedoor');

	// 	if (this.level.levelBuilder.bossDoor.animations._anims.open.isPlaying) {
	// 		this.level.levelBuilder.bossDoor.animations._anims.open.onComplete.add(() => {
	// 			this.bossDoorOpen = true;
	// 			this.game.time.events.add(
	// 				2000,
	// 				() => {
	// 					this.bossDoorOpen = false;
	// 					this.doorOpenSound.play();
	// 					this.game.camera.shake(0.0015, 2500, true);
	// 					this.level.levelBuilder.bossDoor.play('close', 15, false);
	// 				}, this);

	// 		}, this);
	// 	} else {
	// 		this.game.time.events.add(
	// 			2000,
	// 			() => {
	// 				this.bossDoorOpen = false;
	// 				this.doorOpenSound.play();
	// 				this.game.camera.shake(0.0015, 2500, true);
	// 				this.level.levelBuilder.bossDoor.play('close', 15, false);
	// 			}, this);
	// 	}
	}

	spotViewer(region){

		if (region.properties.ifQuestID !== undefined && !this.level.questManager.checkIfQuestExists(region.properties.ifQuestID)) return;
		if(this.spotViewerPlayedSwitch) return;
		this.spotViewerPlayed = true;
		this.spotViewerPlayedSwitch = true;

		let focusX = region.properties.focusX;
		let focusY = region.properties.focusY;

		let transitionTime = 2000;

		const addQuestID = region.properties.addQuestID;
		const removeQuestID = region.properties.removeQuestID;

		if(addQuestID !== undefined){		
			this.level.questManager.addQuest(addQuestID);
		}

		if (removeQuestID !== undefined) {
			this.level.questManager.removeQuest(removeQuestID);
		}

		if(region.properties.messageID !== undefined){
			const all_messages = Object.values(dialogues.dialogues);
			for (let i = 0; i < all_messages.length; i++) {
				if (i + 1 == region.properties.messageID) {

					const message = all_messages[i];
	
					this.level.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
					break;
				}
			}
		}

		this.game.camera.unfollow();

		this.level.player.movable = false;



		// BARS
		var width = this.game.camera.width;
		var height = 20;
		var bmd = this.game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 1;
		bmd.ctx.fill();

		this.level.GUICLASS.healthBar.fadeOut();

		this.upperBar = this.game.add.sprite(this.game.camera.width / 2 - bmd.width / 2, this.game.camera.height, bmd);
		this.upperBar.fixedToCamera = true;

		this.downBar = this.game.add.sprite(
			this.game.camera.width / 2 - bmd.width / 2,
			this.game.camera.height - this.game.camera.height - 20,
			bmd
		);
		this.downBar.fixedToCamera = true;

		this.game.add
			.tween(this.upperBar.cameraOffset)
			.to({ y: this.upperBar.y - 20 }, 1000, Phaser.Easing.Linear.None, true);
		this.downBarTween = this.game.add
			.tween(this.downBar.cameraOffset)
			.to({ y: this.downBar.y + 20 }, 1000, Phaser.Easing.Linear.None, true);

		this.downBarTween.onComplete.add(() => {
			this.game.add
			.tween(this.game.camera)
			.to({
					x: focusX - this.game.camera.width / 2,
					y: focusY - this.game.camera.height / 2
				},
				transitionTime,
				Phaser.Easing.Quadratic.InOut,
				true
			);

		}, this);

		this.game.time.events.add(
			4000,
			() => {
				this.level.player.movable = true;

				this.upperBarTween = this.game.add
				.tween(this.upperBar.cameraOffset)
				.to({ y: this.game.camera.height }, 1000, Phaser.Easing.Linear.None, true);
				this.downBarTween = this.game.add
				.tween(this.downBar.cameraOffset)
				.to({ y: this.game.camera.height - this.game.camera.height - 20 }, 1000, Phaser.Easing.Linear.None, true);
	
			this.upperBarTween.onComplete.add(function() {
				this.upperBar.destroy();
				this.downBar.destroy();
				this.upperBar = false;
				this.spotViewerPlayed = false;
				this.followPlayer();
				this.level.GUICLASS.healthBar.fadeIn();
	
			}, this);



				
			}, this);

	}

}