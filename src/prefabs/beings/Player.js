import Phaser from 'phaser';
import Item from './../gamemechanics/Item';


export default class extends Phaser.Sprite {
	constructor(game, x, y, level) {
		super(game, x, y, 'player');

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

		// this.blendMode = PIXI.blendModes.OVERLAY;
		// this.tint = 0x00000FF;

		this.damageSwitch = false;

		this.baseImages = [];

		// this.movementBlocked = false;

		this.frameRate = 19;


		this.animations.add('dash_left', [71], 1, true);
		this.animations.add('dash_right', [72], 1, true);
		this.animations.add('dash_up', [82], 1, true);
		this.animations.add('dash_down', [81], 1, true);

		this.animations.add('static_idle_up', [36], 1, true);
		this.animations.add('static_idle_down', [16], 1, true);
		this.animations.add('static_idle_left', [53], 1, true);
		this.animations.add('static_idle_right', [70], 1, true);

		this.animations.add('run_up', [17, 18, 19, 20, 21, 22, 23, 24], this.frameRate, true);
		this.animations.add('run_down', [0, 1, 2, 3, 4, 5, 6, 7], this.frameRate, true);
		this.animations.add('run_right', [54, 55, 56, 57, 58, 59, 60, 61], this.frameRate, true);
		this.animations.add('run_left', [37, 38, 39, 40, 41, 42, 43, 44], this.frameRate, true);

		this.animations.add('run_up_idle', [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], this.frameRate, false);
		this.animations.add('run_down_idle', [8, 9, 10, 11, 12, 13, 14, 15], this.frameRate, false);
		this.animations.add('run_right_idle', [62, 63, 64, 65, 66, 67, 68, 69], this.frameRate, false);
		this.animations.add('run_left_idle', [45, 46, 47, 48, 49, 50, 51, 52], this.frameRate, false);

		this.animations.add('idle_run_up', [36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25], this.frameRate, false);
		this.animations.add('idle_run_down', [16, 15, 14, 13, 12, 11, 10, 9, 8], this.frameRate, false);
		this.animations.add('idle_run_right', [70, 69, 68, 67, 66, 65, 64, 63, 62], this.frameRate, false);
		this.animations.add('idle_run_left', [53, 52, 51, 50, 49, 48, 47, 46, 45], this.frameRate, false);

		this.animations.add('fight_right', [73, 74, 75, 76], this.frameRate, false);
		this.animations.add('fight_left', [77, 78, 79, 80], this.frameRate, false);

		// this.animations.play('idle');

		this.dustAnimation = this.game.add.sprite(this.x, this.y, 'dustAnimation');
		this.dustAnimation.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, false);
		this.dustAnimation.alpha = 0;

		this.dustAnimationLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 2, () => {
			this.playDustAnimation();
		}, this);



		this.game.physics.enable(this);
		this.body.setSize(10, 6, 21, 47);

		// this.body.bounce.set(2);
		this.body.drag.set(500);

		// No Glitch on Camera
		this.game.camera.roundPx = true;

		this.game.renderer.renderSession.roundPixels = false;

		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
		// this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN, 0.07, 0.07);
		// this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.07, 0.07);

		// Add Lerp after 1 Second
		this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
			if(this.gameData.currentMap == 'map1') return;

			switch (this.level.tilemapProperties.cameraMode) {
				case 'follow':
					this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.05, 0.05);
					break;
	
				case 'topdown':
					// this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.07, 0.07);
					this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);
					
					break;
			
				default:
					console.warn('Default Camera Mode!');
					this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
					break;
			}
		});

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
		this.customEmitter.gravity = 0;
		this.customEmitter.setAlpha(0.5, 1, 500, null, true);
		this.customEmitter.minParticleSpeed.set(px, py);
		this.customEmitter.maxParticleSpeed.set(px, py);
		// this.customEmitter.gravity = -10;
		this.customEmitter.makeParticles('cyanParticle', 500);

		this.multiplySprite = game.make.sprite(0, 0, this.key);
		this.multiplySprite.anchor.set(0.5);
		this.multiplySprite.alpha = 0.1;

		this.bmd = this.game.add.bitmapData(100, 100);
		this.baseImages.push(this.bmd.addToWorld(x, y, 0.5, 0.5));
		this.bmd.smoothed = true;
		this.bmd.shadow('#000000', 10, -1, -1);
		this.bmd.draw(this.multiplySprite, 50, 50);

		this.weapon = this.game.add.weapon(10, 'invisibleAttack');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weapon.bulletLifespan = 40;
		this.weapon.bulletSpeed = 400;
		// this.weapon.fireRate = 200;
		this.weapon.trackSprite(this, 0, 0, false);

		this.playerArm = this.game.add.sprite(this.x, this.y, 'playerArm');
		this.playerArm.anchor.set(0.5, 0);
		this.playerArm.visible = false;

		this.weaponGun = this.game.add.weapon(30, 'bulletBeam');
		this.weaponGun.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weaponGun.bulletLifespan = 2000;
		this.weaponGun.bulletSpeed = 400;
		this.weaponGun.fireRate = 1000;
		// this.weaponGun.bulletAngleVariance = 10;
		this.weaponGun.trackSprite(this.playerArm, 0, 10, true);

		for (var i = 0; i < this.weaponGun.bullets.children.length; i++) {
			// this.weaponGun.bullets.children[i].scale.setTo(2);
			this.weaponGun.bullets.children[i].smoothed = false;
			
		}

		this.weaponGun.onFire.add(() => {
			// console.log('BOOOM');
			// this.game.camera.shake(0.003, 100);
		}, this);
		

		

		game.add.existing(this);

		// this.teleport();

	}

	playDustAnimation(){
		if(this.level.inputClass.standing) return;
		this.dustAnimation.alpha = 1;

		if(this.level.inputClass.direction == 'left'){
			this.dustAnimation.x = this.x;
			this.dustAnimation.y = this.y + 8;
		} else if(this.level.inputClass.direction == 'right'){
			this.dustAnimation.x = this.x - 18;
			this.dustAnimation.y = this.y + 7;
		} else if(this.level.inputClass.direction == 'up'){
			this.dustAnimation.x = this.x - 12;
			this.dustAnimation.y = this.y + 10;
		} else if(this.level.inputClass.direction == 'down'){
			this.dustAnimation.x = this.x - 12;
			this.dustAnimation.y = this.y - 8;
		}

		this.dustAnimation.play('run');
	}

	teleport(){
		this.alpha = 0;
		this.game.forceSingleUpdate = true;
		
		this.manager = this.game.plugins.add(Phaser.ParticleStorm);

		var data = {
			lifespan: 0
		};
	
		this.manager.addData('burst', data);
	
		this.teleportEmitter = this.manager.createEmitter(Phaser.ParticleStorm.PIXEL);
	
		this.teleportEmitter.renderer.pixelSize = 8;
	
		this.teleportEmitter.addToWorld();
	
		this.image = this.manager.createImageZone('player');

		this.teleportEmitter.emit('burst', this.x, this.y, { zone: this.image, full: true, spacing: 8, setColor: true });

		this.teleportEmitter.forEachNew(this.setVelocity, this, this.x, this.y);

		console.log('hi');
		console.log(this.teleportEmitter);
    	
	}

	setVelocity(particle, x ,y ){
		console.log(x,y);
		particle.setLife(3000);
		particle.radiateFrom(x, y, 3);
	}

	addParticles() {
		this.customEmitter.on = true;
		this.customEmitter.x = this.x;
		this.customEmitter.y = this.y;
		
		this.emitterLoop = this.game.time.events.loop(1, () => {
			this.customEmitter.start(true);
		}, this);

	}

	removeParticles() {
		this.game.time.events.remove(this.emitterLoop);
		this.customEmitter.on = false;
	}

	fight(enemy, bullet) {
		// console.log('collide');

		// this.inputClass.muteAttack = true;
		




		// bullet.kill();
		enemy.paralyze = true;
		enemy.tint = 0xFF0000;

		this.game.time.events.add(350, () => {
			enemy.paralyze = false;
		});

		this.game.time.events.add(75, () => {
			enemy.tint = 16777215;
		});

		let px = enemy.body.velocity.x;
		let py = enemy.body.velocity.y;

		px *= 2;
		py *= 2;

		this.bloodAnimation = this.game.add.emitter(enemy.x, enemy.y, 100);
		// this.bloodAnimation.angularDrag = 500;
		this.bloodAnimation.minParticleScale = 1;
		this.bloodAnimation.maxParticleScale = 1;
		this.bloodAnimation.maxRotation = 0;
		this.bloodAnimation.minRotation = 0;
		this.bloodAnimation.particleDrag.set(1800);
		this.bloodAnimation.setAlpha(1, 0, 1000, null, false);
		
		// console.log(this.bloodAnimation);

		if(this.inputClass.direction == 'left' || this.inputClass.direction == 'right'){
			this.bloodAnimation.setXSpeed(px);
			this.bloodAnimation.setYSpeed(-400);
		} else {
			this.bloodAnimation.setXSpeed(400);
			this.bloodAnimation.setYSpeed(py);
		}

		this.bloodAnimation.makeParticles('bloodEnemy', 100);
		

		this.bloodAnimation.start(true, 3000, null, 10);

		


		

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

		// console.log(enemy.health, enemy.health <= 0);

		if (enemy.health <= 0) {

			// console.log('die');

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

			this.rndVoice = this.game.rnd.pick(['death1', 'death2', 'death3', 'death4']);
			this.voice = this.game.add.audioSprite('sfxswordmulti');
			this.voice.play(this.rndVoice, 0.5);
			
		} else {
			this.rndVoiceSword = this.game.rnd.pick(['vx3', 'vx4', 'vx5', 'vx6', 'vx7', 'vx8', 'vx9', 'vx10']);
			this.voiceSword = this.game.add.audioSprite('sfxswordmulti');
			this.voiceSword.play(this.rndVoiceSword, 0.5);
			this.rndVoice = this.game.rnd.pick(['vx1', 'vx2', 'vx3', 'vx4', 'vx5']);
			this.voice = this.game.add.audioSprite('VxSeeds');
			this.voice.play(this.rndVoice, 0.5);
		}

		// this.inputClass.muteAttack = false;


		

	}

	turnPlayer(focusObject){
		// console.log('turn');
		let value = this.game.physics.arcade.angleToXY(this, focusObject.x, focusObject.y);

		if ((value > -2.5 && value < -0.5)) {
			this.level.GUICLASS.direction = 'up';
			this.animations.play('static_idle_up');

		} else if (value > 1 && value < 2.5) {
			this.level.GUICLASS.direction = 'down';
			this.animations.play('static_idle_down');

		} else if (value > -0.5 && value < 1) {
			this.level.GUICLASS.direction = 'right';
			this.animations.play('static_idle_right');

		} else if (value > 2.5 || value < -2.5) {
			this.level.GUICLASS.direction = 'left';
			this.animations.play('static_idle_left');

		}
	}

	getDamage(player, enemy) {
		// console.log('collide');
		if(this.damageSwitch) return;
		this.damageSwitch = true;
		enemy.paralyze = true;


		this.game.time.events.add(1000, () => {
			this.damageSwitch = false;
			enemy.paralyze = false;
		}, this);

		this.game.camera.flash(0xc10000, 200);
		this.GUICLASS.healthBar.removeHeart(1, true);
		return;

		// 5-1 = 4

		// enemy.destroy();

		// if (enemy.itemType !== undefined && enemy.itemType == 'key') {
		// 	let properties = {};
		// 	properties.id = enemy.dropItemID;
		// 	this.items.push(new Item(this.game, enemy.x, enemy.y + 40, 'item', properties));
		// }

		// if (enemy.killQuestID !== undefined) {
		// 	this.questManager.checkKillCondition(enemy.killQuestID);
		// }

		// console.log(this.player.health);
		this.player.health -= 1;
		
		this.gameData.playerHealth = this.player.health;
		this.safe.setGameConfig(this.gameData);
		
		// this.GUICLASS.healthBar.removeHeart(1, true);
		// this.game.camera.flash(0xc10000, 200);

		if (this.player.health <= 0) {
			this.gameData.playerHealth = 5;
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

		// console.log(item);

		if (!this.level.itemIDs.includes(item.id)) {
			this.level.itemIDs.push(item.id);
			this.level.safe.setItemIDs(this.level.itemIDs);
		}

		if(item.type == 'potion'){
			this.level.GUICLASS.healthBar.addHeart(5);
			this.level.player.health = 5;
			this.level.gameData.playerHealth = 5;
			this.level.safe.setGameConfig(this.level.gameData);
		}

		if (item.removeQuestID !== undefined) {
			// console.log('Remove');
			this.level.questManager.removeQuest(item.removeQuestID);
		}

		if (item.ifQuestID !== undefined) {
			if (this.level.questManager.checkIfQuestExists(item.ifQuestID)){
				this.level.questManager.removeQuest(item.ifQuestID);
				console.log('NewQuestID: ' + item.newQuestID);
				this.level.questManager.addQuest(item.newQuestID);
			}

			console.log('Questupdate');
			this.level.GUICLASS.createNotification('success', 'Questupdate');
		}

		this.level.itemPickUpSound = this.game.add.audio('sfxPickUp', 1);
		this.level.itemPickUpSound.play();

		item.used = true;
		item.destroy();
		this.level.items.splice(item, 1);
	}

	bulletHit(player, bullet){
		bullet.kill();
		player.tint = 0xFF0000;

		this.game.time.events.add(200, () => {
			player.tint = 16777215;
		});
	}

	update() {
		// console.log(this.animations.currentFrame.index);
		this.game.world.bringToTop(this.customEmitter);

		if(this.level.inputClass.direction == 'right' || this.level.inputClass.direction == 'down'){
			// this.game.world.bringToTop(this.playerArm);
			this.game.world.setChildIndex(this.playerArm, 14);
		}
		this.playerArm.rotation = this.game.physics.arcade.angleToPointer(this.playerArm) - 360;




		// this.game.world.setChildIndex(this.customEmitter, 5);
		this.customEmitter.x = this.x;
		this.customEmitter.y = this.y;

		if (this.level.inputClass.dash) {
			// this.multiplySprite.frame = this.frame;
			// this.multiplySprite.alpha = 0.01;
			// this.bmd.draw(this.multiplySprite, 50, 50);
			// this.baseImages.push(this.bmd.addToWorld(this.x, this.y, 0.5, 0.5));
			// // this.game.world.setChildIndex(this.bmd, 1);

			// if (this.baseImages[0] !== undefined) {
			// 	this.game.time.events.add(100, () => {
			// 		this.baseImages[0].alpha = 0;
			// 		this.baseImages[0].destroy(true, false);
			// 		this.baseImages.shift();
			// 	});
			// }
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