import Phaser from 'phaser';


export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'sprout');

		this.game = game;
		this.player = player;
		this.map = map;
		this.layer = layer;

		this.shootX = properties.shootX;
		this.shootY = properties.shootY;


		this.health = 3;
		this.dead = false;
		this.paralyze = false;
		
		this.anchor.setTo(0.5);

		if(properties.mirror){
			this.scale.setTo(-0.5, 0.5);
		} else {
			this.scale.setTo(0.5);
		}
		

		// this.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
		// this.animations.add('idle', [0], 1, true);
		// this.animations.play('walk');

		this.game.physics.enable(this);

        this.body.setSize(13, 10, 5, 7);
        
        this.weapon = game.add.weapon(400, 'bulletBeam');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weapon.bulletLifespan = 3000;
		this.weapon.bulletSpeed = 700;
		this.weapon.fireRate = 1;
		// this.weapon.bulletAngleVariance = 10;
		this.weapon.bulletRotateToVelocity = true;
		this.weapon.trackSprite(this, 0, 0, false);

		console.log(this.weapon.bullets);

		for (var i = 0; i < this.weapon.bullets.children.length; i++) {
			this.weapon.bullets.children[i].body.bounce.set(0.5);
			this.weapon.bullets.children[i].scale.setTo(2);
			this.weapon.bullets.children[i].smoothed = false;
		}
		

		game.add.existing(this);
	}

	update() {
		// for (var i = 0; i < this.weapon.bullets.children.length; i++) {
		// 	this.game.physics.arcade.velocityFromAngle(this.weapon.bullets.children[i].angle, 300, this.weapon.bullets.children[i].body.velocity);
		// }

		if(this.dead) return;
        if(this.paralyze) return;
        
        this.game.world.setChildIndex(this.weapon.bullets, 10);

		this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		// if (this.distanceBetweenEnemiePlayer < 200) {
				this.weapon.fireAtXY(this.shootX, this.shootY);
				
				// let explosion = this.game.add.emitter(this.weapon.x, this.weapon.y + 7, 1);
				// explosion.fixedToCamera = true;
				// explosion.setAlpha(1, 0, 1000, null, false);
				// explosion.setXSpeed(50);
				// explosion.gravity = 250;
				// explosion.setYSpeed(-100);
				// explosion.makeParticles('bulletParticle', 100);
				// explosion.start(true, 0, null, 1);

				// this.game.time.events.add(2000, () => {
				// 	explosion.destroy();
				// }, this);
            
        // }

		this.game.physics.arcade.collide(this.weapon.bullets, this.layer);
        this.game.physics.arcade.collide(this.weapon.bullets, this.player.weapon.bullets, this.reverse, null, this);
        this.game.physics.arcade.collide(this.weapon.bullets, this.player, this.player.bulletHit, null, this);
        
        
    }

    reverse(weaponBullet, playerBullet){
        weaponBullet.body.velocity.x *= (-1.8);
        weaponBullet.body.velocity.y *= (-1.8);
    }

		
}
