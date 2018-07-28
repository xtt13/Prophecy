import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties, level) {
		super(game, x, y, 'sprout');

		this.game = game;
		this.player = player;
		this.map = map;
		this.layer = layer;
		this.type = 'sprout';
		this.mirror = properties.mirror;
		this.id = properties.id;
		this.level = level;

		this.shootX = properties.shootX;
		this.shootY = properties.shootY;

		this.health = 5;

		

		this.grown = false;

		this.mirrorBeamRunning = false;
		this.shootAtPlayerRunning = false;
		this.rotationShootRunning = false;
		this.shootAtPlayerCounter = 0;
		this.jailAttackRunning = true;

		this.health = 3;
		this.dead = false;
		this.paralyze = false;

		this.angleSwitch = true;
		
		this.anchor.setTo(0, 0.5);

		this.game.physics.enable(this);
		this.body.allowRotation = true;
		this.body.immovable = true;

		if(properties.mirror){
			// this.scale.setTo(1, 1);
			this.scale.setTo(0);
			this.angle += 60;
			this.body.setSize(70, 45, -20, 0);
		} else {
			this.body.setSize(70, 45, -38, 0);
			this.scale.setTo(0);
			this.angle += 120;
		}
		

		// this.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
		// this.animations.add('idle', [0], 1, true);
		// this.animations.play('walk');


		

        
        
        this.weapon = game.add.weapon(400, 'bulletBeam');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weapon.bulletLifespan = 3000;
		this.weapon.bulletSpeed = 700;
		this.weapon.bulletCollideWorldBounds = true;
		this.weapon.fireRate = 1;
		// this.weapon.bulletAngleVariance = 10;
		this.weapon.bulletRotateToVelocity = true;
		this.weapon.trackSprite(this, 20, 0, true);

		console.log(this.weapon.bullets);

		for (var i = 0; i < this.weapon.bullets.children.length; i++) {
			this.weapon.bullets.children[i].body.bounce.set(0.5);
			this.weapon.bullets.children[i].scale.setTo(2);
			this.weapon.bullets.children[i].smoothed = false;
			this.game.add.tween(this.weapon.bullets.children[i]).to( { tint: 0x000000 }, 9000, Phaser.Easing.Exponential.In, true, 0, 0, true).loop();
		}
		

		this.game.add.existing(this);
	}

	addLevelBuilder(levelBuilder){
		this.levelBuilder = levelBuilder;
	}


	hit(sprout, bullet){
		bullet.kill();
		sprout.health -= 1;
		sprout.tint = 0xFF0000;
		this.game.time.events.add(100, () => {
			sprout.tint = 16777215;
		});
		

		if(sprout.health <= 0){
			sprout.kill();
			sprout.dead = true;
			this.levelBuilder.deadSprouts += 1;
			if(this.levelBuilder.deadSprouts == 4){
				this.levelBuilder.endBossHead.startHead();
			}
			sprout.weapon = this.game.add.weapon(0, 'bulletBeam');
		}
		
	}

	grow(){
		if(this.mirror){
			

			this.growTween = this.game.add.tween(this.scale).to(
				{x: 1, y: 1}
			, 3000, Phaser.Easing.Back.Out, true, 0, 0, false);

		} else {
			

			this.growTween = this.game.add.tween(this.scale).to(
				{x: 1, y: -1}
			, 3000, Phaser.Easing.Back.Out, true, 0, 0, false);
		}

		this.growTween.onComplete.add(() => {
			this.grown = true;

			// FIRST ATTACK
			// this.mirrorBeam();
			this.jailAttack();

			// this.shootAtPlayer(3);
			// this.rotationShoot(10000);


        }, this);
	}

	mirrorBeam(){
		if(this.dead) return;
		
		this.mirrorBeamRunning = true;
		let targetRotation = this.game.physics.arcade.angleToXY(this, this.shootX, this.shootY);
		this.rotationTween = this.game.add.tween(this).to(
			{rotation: targetRotation}
		, 2000, Phaser.Easing.Back.Out, true, 0, 0, false);
		this.rotationTween.onComplete.add(() => {
			var shootLoop = this.game.time.events.loop(1, () => {
				this.weapon.fireAtXY(this.shootX, this.shootY);
			}, this);
			this.game.time.events.add(Phaser.Timer.SECOND * 5, () => {
				this.mirrorBeamRunning = false;
				this.game.time.events.remove(shootLoop);

				// SECOND ATTACK
				this.shootAtPlayer(3);
			});
		}, this);	
	}

	shootAtPlayer(times){
		if(this.dead) return;

		this.shootAtPlayerRunning = true;
		let playerX = this.player.body.x;
		let playerY = this.player.body.y;
		let targetRotation = this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
		this.rotationTween = this.game.add.tween(this).to(
			{rotation: targetRotation}
		, 500, Phaser.Easing.Back.Out, true, 0, 0, false);
		this.rotationTween.onComplete.add(() => {
			var shootLoop = this.game.time.events.loop(1, () => {
				this.weapon.fireAtXY(playerX, playerY);
			}, this);
			this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
				this.shootAtPlayerCounter++;
				this.game.time.events.remove(shootLoop);
				console.log(this.shootAtPlayerCounter, times);
				if(this.shootAtPlayerCounter == times){
					this.shootAtPlayerRunning = false;
					this.shootAtPlayerCounter = 0;
					// THIRD ATTACK
					this.rotationShoot(5000);
				} else {
					this.shootAtPlayer(times);
				}
				
			});
		}, this);	
	}

	rotationShoot(duration){
		if(this.dead) return;

		this.rotationShootRunning = true;

		let targetRotation = this.game.physics.arcade.angleToXY(this, 0, 500);
		this.rotationTween = this.game.add.tween(this).to(
			{rotation: targetRotation}
		, 1000, Phaser.Easing.Back.Out, true, 0, 0, false);
		this.rotationTween.onComplete.add(() => {

			var shootLoop = this.game.time.events.loop(1, () => {
				if(this.angle >= 160){
					this.angleSwitch = false;
				} else if(!this.angleSwitch && this.angle <= 30){
					this.angleSwitch = true;
				}
	
				if(this.angleSwitch){
					this.angle += 1;
				} else {
					this.angle -= 1;
				}
	
				this.weapon.fire();
			}, this);
			this.game.time.events.add(duration, () => {
	
				this.game.time.events.remove(shootLoop);
				this.rotationShootRunning = false;
				this.jailAttack();
			});
			
		}, this);	
	}

	jailAttack(){
		if(this.dead) return;

		this.shootAtPlayerRunning = true;

		let targetRotation = this.game.physics.arcade.angleToXY(this, this.x, 760);
		this.rotationTween = this.game.add.tween(this).to(
			{rotation: targetRotation}
		, 1000, Phaser.Easing.Back.Out, true, 0, 0, false);
		this.rotationTween.onComplete.add(() => {

			let explosion = this.game.add.emitter(this.x, this.y + 30, 200);
			// explosion.fixedToCamera = true;
			explosion.setAlpha(1, 0, 2000, null, false);
			// explosion.setXSpeed(this.game.rnd.integerInRange(-100, 100));
			explosion.gravity = 10;
			explosion.setYSpeed(100);
			explosion.setXSpeed(-30, 30);
			explosion.minParticleScale = 2;
			explosion.makeParticles('bulletParticle');
			explosion.start(false, 2000, 1);

			this.game.time.events.add(4000, () => {
				explosion.on = false;
			}, this);

			this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
				if(this.id == 1 || this.id == 4){
					var xValue1 = this.x;
					var xValue2 = this.x;
					var shootLoop = this.game.time.events.loop(1, () => {
						if(this.id == 1){
							xValue1 += 1;
							this.rotation = this.game.physics.arcade.angleToXY(this, xValue1, 760);
							this.weapon.fireAtXY(xValue1, 760);
						}
		
						if(this.id == 4){
							xValue2 -= 1;
							this.rotation = this.game.physics.arcade.angleToXY(this, xValue2, 760);
							this.weapon.fireAtXY(xValue2, 760);
						}
		
					}, this);
				}
		
				if(this.id == 2 || this.id == 3){
					var shootLoop = this.game.time.events.loop(1, () => {
							this.weapon.fireAtXY(this.x, 760);
						
					}, this);
				}
		
				this.game.time.events.add(Phaser.Timer.SECOND * 6, () => {
					explosion.destroy();
					this.game.time.events.remove(shootLoop);	
					this.shootAtPlayerRunning = false;
					this.mirrorBeam();
				});
			});

			
			
		}, this);

		
	}

	update() {
		
		if(this.dead) return;
		if(this.paralyze) return;

		this.game.physics.arcade.collide(this, this.player.weaponGun.bullets, this.hit, null, this);
		
		// this.game.world.bringToTop(this.weapon.bullets); 
		this.game.world.bringToTop(this); 
        this.game.world.setChildIndex(this.weapon.bullets, 13);


		this.game.physics.arcade.collide(this.weapon.bullets, this.layer, this.collisionHandler, null, this);
        this.game.physics.arcade.collide(this.weapon.bullets, this.player.weapon.bullets, this.reverse, null, this);
		this.game.physics.arcade.collide(this.weapon.bullets, this.player, this.player.bulletHit, null, this);
        
        
    }

    reverse(weaponBullet, playerBullet){
        weaponBullet.body.velocity.x *= (-1.8);
        weaponBullet.body.velocity.y *= (-1.8);
	}
	
	collisionHandler(bullet, layer){
		

		this.game.camera.shake(0.003, 100);

		if(this.jailAttackRunning){
			bullet.kill();
		}

		let explosion = this.game.add.emitter(bullet.x, bullet.y, 2);
		explosion.fixedToCamera = true;
		explosion.setAlpha(1, 0, 2000, null, false);
		explosion.setXSpeed(this.game.rnd.integerInRange(-100, 100));
		explosion.gravity = 150;
		explosion.minParticleScale = 0.1;
		explosion.maxParticleScale = 0.5;
		explosion.setYSpeed(-100);
		explosion.makeParticles('bulletBeam', 100);
		explosion.start(true, 0, null, 10);

		this.game.time.events.add(2000, () => {
			explosion.destroy();
		}, this);

		// bullet.kill();
	}

		
}
