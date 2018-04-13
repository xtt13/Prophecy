import Phaser from 'phaser';
import Item from './../gamemechanics/Item';
import dialogues from './../../dialogues';

export default class extends Phaser.Sprite {
	constructor(game, x, y, level) {
		super(game, x, y, 'player_beta');

		this.game = game;
		this.level = level;

		this.anchor.setTo(0.5);

		this.gameData = this.level.gameData;
		this.health = this.gameData.playerHealth;
		this.safe = this.level.safe;

		this.movable = true;
		this.playerSpeed = 130;
		this.talking = false;
		this.attack = false;

		this.baseImages = [];

		// this.movementBlocked = false;

		this.animations.add('idle', [0, 1, 2, 3], 5, true);
		this.animations.add('idle_right', [28], 1, true);
		this.animations.add('idle_left', [29], 1, true);
		this.animations.add('run_up', [30, 31, 32, 33, 34, 35, 36, 37], 19, true);
		this.animations.add('run_down', [4, 5, 6, 7, 8, 9, 10, 11], 19, true);
		this.animations.add('run_right', [12, 13, 14, 15, 16, 17, 18, 19], 19, true);
		this.animations.add('run_left', [20, 21, 22, 23, 24, 25, 26, 27], 19, true);
		this.animations.add('dash_right', [39], 1, true);
		this.animations.add('dash_left', [38], 1, true);

		this.animations.play('idle');

		this.game.physics.enable(this);
		this.body.setSize(8, 10, 21, 40);

		this.game.camera.roundPx = false;
		this.game.renderer.renderSession.roundPixels = true;
		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
		// this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN, 0.07, 0.07);
		// this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.07, 0.07);

		// Add Lerp after 1 Second
		// this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
		// 	this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.07, 0.07);
		// });

		// -1 Velocity
		let px = this.body.velocity.x;
		let py = this.body.velocity.y;
		px *= -2;
		py *= -2;

		this.customEmitter = this.game.add.emitter(this.x, this.y, 500);
		this.customEmitter.width = 10;
		this.customEmitter.height = 30;
		this.customEmitter.minParticleScale = 1;
		this.customEmitter.maxParticleScale = 1;
		this.customEmitter.gravity = 0.5;
		this.customEmitter.setAlpha(0.5, 1, 500, null, true);
		this.customEmitter.minParticleSpeed.set(px, py);
		this.customEmitter.maxParticleSpeed.set(px, py);
		this.customEmitter.gravity = -10;
		this.customEmitter.makeParticles('cyanParticle', 500);

		this.multiplySprite = game.make.sprite(0, 0, this.key);
		this.multiplySprite.anchor.set(0.5);
		this.multiplySprite.alpha = 0.1;

		this.bmd = this.game.add.bitmapData(100, 100);
		this.baseImages.push(this.bmd.addToWorld(x, y, 0.5, 0.5));
		this.bmd.smoothed = true;
		this.bmd.shadow('#000000', 10, -1, -1);
		this.bmd.draw(this.multiplySprite, 50, 50);

		this.weapon = game.add.weapon(10, 'invisibleAttack');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weapon.bulletLifespan = 100;
		this.weapon.bulletSpeed = 400;
		// this.weapon.fireRate = 200;
		this.weapon.trackSprite(this, 0, 0, false);

		game.add.existing(this);


	}

	addParticles() {
		this.customEmitter.on = true;
		this.customEmitter.x = this.x;
		this.customEmitter.y = this.y;
		this.customEmitter.start(true, 2000, 0.1, 0);
	}

	removeParticles() {
		this.customEmitter.on = false;
	}

	fight(enemy, bullet) {
		console.log('collide');

		// bullet.kill();
		enemy.paralyze = true;
		enemy.tint = 0xFF0000;

		this.game.time.events.add(350, () => {
			enemy.paralyze = false;
		});

		this.game.time.events.add(75, () => {
			enemy.tint = 16777215;
		});

		


		

		// if (player.attack) {

		// 	console.log('punsh');

		// 	enemy.paralyze = true;

		// 	this.game.time.events.add(400, () => {
		// 		enemy.paralyze = false;
		// 	});

		// 	enemy.body.velocity.x = player.body.velocity.x * 2;
		// 	enemy.body.velocity.y = player.body.velocity.y * 2;

			// enemy.health -= 1;

			// console.log(enemy.health, enemy.health <= 0);

			// if (enemy.health <= 0) {

			// 	console.log('die');

			// 	enemy.dead = true;
			// 	enemy.body.moves = false;
			// 	enemy.body.enable = false;

			// 	enemy.animations.stop();

			// 	if (enemy.itemType !== undefined && enemy.itemType == 'key') {
			// 		let properties = {};
			// 		properties.id = enemy.dropItemID;
			// 		this.items.push(new Item(this.game, enemy.x, enemy.y + 40, 'item', properties));
			// 	}
	
			// 	if (enemy.killQuestID !== undefined) {
			// 		this.questManager.checkKillCondition(enemy.killQuestID);
			// 	}
				
			// }


		enemy.health -= 1;

		console.log(enemy.health, enemy.health <= 0);

		if (enemy.health <= 0) {

			console.log('die');

			enemy.dead = true;
			enemy.body.moves = false;
			enemy.body.enable = false;

			enemy.animations.stop();

			if (enemy.itemType !== undefined && enemy.itemType == 'key') {
				let properties = {};
				properties.id = enemy.dropItemID;
				this.items.push(new Item(this.game, enemy.x, enemy.y + 40, 'item', properties));
			}

			if (enemy.killQuestID !== undefined) {
				this.questManager.checkKillCondition(enemy.killQuestID);
			}

			let px = enemy.body.velocity.x;
			let py = enemy.body.velocity.y;

			px *= 2;
			py *= 2;

			this.killAnimation = this.game.add.emitter(enemy.x, enemy.y, 4);
			this.killAnimation.angularDrag = 500;
			this.killAnimation.particleDrag.set(1800);

			if(this.inputClass.direction == 'left' || this.inputClass.direction == 'right'){
				this.killAnimation.setXSpeed(px);
				this.killAnimation.setYSpeed(400);
			} else {
				this.killAnimation.setXSpeed(400);
				this.killAnimation.setYSpeed(py);
			}


			this.killAnimation.makeParticles('enemyPartsSpritesheet', [0, 1, 2, 3], 4);
			this.killAnimation.setAlpha(1, 0, 5000, null, false);
			this.killAnimation.start(true, 0, null, 10);
			this.game.world.setChildIndex(this.killAnimation, 10);

			enemy.kill();

			this.bloodAnimation = this.game.add.emitter(enemy.x, enemy.y, 100);
			this.bloodAnimation.angularDrag = 500;
			this.bloodAnimation.particleDrag.set(1800);
			this.bloodAnimation.setAlpha(1, 0, 1000, null, false);
			// this.bloodAnimation.minParticleSpeed.set(px, 400);

			if(this.inputClass.direction == 'left' || this.inputClass.direction == 'right'){
				this.bloodAnimation.setXSpeed(px);
				this.bloodAnimation.setYSpeed(300);
			} else {
				this.bloodAnimation.setXSpeed(400);
				this.bloodAnimation.setYSpeed(py);
			}

			this.bloodAnimation.makeParticles('blood', 100);	
			this.bloodAnimation.start(true, 0, null, 10);
			
		}


		

	}


	talk(player, character) {

		// PLAYER
		// up: 3
		// down: 4
		// left: 1
		// right: 2

		console.log(character.body.facing);

		let playerFacing = player.body.facing;
		let characterFacing = 0;

		if (
			(playerFacing == 3 && characterFacing == 0) ||
			(playerFacing == 1 && characterFacing == 2) ||
			(playerFacing == 2 && characterFacing == 1) ||
			(playerFacing == 4 && characterFacing == 3)
		) {
			if (!this.player.talking) {
				this.player.talking = true;

				// Check if name is in quest, if true -> get dialogueID
				let dialogueID = this.questManager.checkQuestDialogue(character.name);

				// If there's a number
				if (dialogueID !== false) {

					// get all dialogues
					const all_messages = Object.values(dialogues.dialogues);

					// search for dialogue
					for (let i = 0; i < all_messages.length; i++) {
						if (i + 1 == dialogueID) {
							const message = all_messages[i];
							this.GUICLASS.createMessage(message, false, true);
							break;
						}
					}

				} else {
					this.GUICLASS.createMessage(['Testmessage'], false, true);
				}
			}
		}

	}

	getDamage(player, enemy) {
		enemy.destroy();

		if (enemy.itemType !== undefined && enemy.itemType == 'key') {
			let properties = {};
			properties.id = enemy.dropItemID;
			this.items.push(new Item(this.game, enemy.x, enemy.y + 40, 'item', properties));
		}

		if (enemy.killQuestID !== undefined) {
			this.questManager.checkKillCondition(enemy.killQuestID);
		}

		this.player.health -= 10;
		this.gameData.playerHealth = this.player.health;
		this.safe.setGameConfig(this.gameData);
		this.game.camera.flash(0xc10000, 200);

		if (this.player.health <= 0) {
			this.gameData.playerHealth = 100;
			this.safe.setGameConfig(this.gameData);

			if (this.inputClass.stick) {
				this.inputClass.stick.alpha = 0;
				this.inputClass.stick.enabled = false;
			}

			this.game.state.restart(true, false, {
				map: this.currentMap,
				targetID: this.lastTargetID,
				restartType: 'revive'
			});
		}

		// enemy.body.velocity.x = player.body.velocity.x;
		// enemy.body.velocity.y = player.body.velocity.y;
	}

	collideWithItem(player, item) {
		// this.lockGame = new LockGame(this.game, this.player.x, this.player.y, this.player);

		console.log(item);

		if (!this.itemIDs.includes(item.id)) {
			this.itemIDs.push(item.id);
			this.safe.setItemIDs(this.itemIDs);
		}

		if (item.removeQuestID !== undefined) {
			console.log('Remove');
			this.questManager.removeQuest(item.removeQuestID);
		}

		if (item.questID !== undefined) {
			if (this.questManager.checkIfQuestExists(item.questID)) return;

			// let quest = {
			// 	questID: item.questID,
			// 	questMessage: item.questMessage,
			// 	questKillEnemyType: undefined,
			// 	questDeadEnemies: undefined,
			// 	questKillEnemyAmount: undefined
			// };

			this.questManager.addQuest(item.questID);

			console.log('Questupdate');
			this.GUICLASS.createNotification('success', 'Questupdate');
		}

		this.itemPickUpSound = this.game.add.audio('sfxPickUp', 1);
		this.itemPickUpSound.play();

		item.destroy();
		this.items.splice(item, 1);
	}

	update() {
		this.game.world.bringToTop(this.customEmitter);
		this.customEmitter.x = this.x;
		this.customEmitter.y = this.y;

		if (this.level.inputClass.dash) {
			this.multiplySprite.frame = this.frame;
			this.multiplySprite.alpha = 0.01;
			this.bmd.draw(this.multiplySprite, 50, 50);
			this.baseImages.push(this.bmd.addToWorld(this.x, this.y, 0.5, 0.5));

			if (this.baseImages[0] !== undefined) {
				this.game.time.events.add(100, () => {
					this.baseImages[0].alpha = 0;
					this.baseImages[0].destroy(true, false);
					this.baseImages.shift();
				});
			}
		} else {
			this.game.time.events.add(200, () => {
				this.bmd.clear();
			});
		}

		//
		// Don't go if blocked
		//
		// if(this.body.blocked.down || this.body.blocked.up || this.body.blocked.left || this.body.blocked.right){
		// 	this.animations.play('idle');
		// 	this.movementBlocked = true;
		// } else {
		// 	this.movementBlocked = false;
		// }
	}
}