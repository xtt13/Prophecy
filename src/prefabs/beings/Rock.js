import Phaser from 'phaser';


export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'rock');

		this.game = game;
		this.player = player;
		this.map = map;
		this.layer = layer;

		this.open = false;


		this.health = 3;
		this.dead = false;
		this.paralyze = false;
		
		this.anchor.setTo(0.5);

		this.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 15, false);
		this.animations.add('close', [13, 14, 15, 16, 17, 18, 19, 20], 15, false);

		this.game.physics.enable(this);
		this.body.immovable = true;

        this.body.setSize(80, 40, 10, 60);
        
        this.weapon = game.add.weapon(10, 'bulletRock');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weapon.bulletLifespan = 2000;
		this.weapon.bulletSpeed = 200;
		this.weapon.fireRate = 400;
		this.weapon.trackSprite(this, 0, 35, false);

		game.add.existing(this);
	}

	update() {
		if(this.dead) return;
        if(this.paralyze) return;
        
        this.game.world.setChildIndex(this.weapon.bullets, 20);

        // console.log(Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y)));
		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
		this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if ((angle == 1 || angle == 2 || angle == 3) && this.y > this.player.body.y) {
			// this.game.world.moveUp(this);
			// this.game.world.setChildIndex(this.player, 1);
			this.game.world.bringToTop(this);
		}

		if (this.distanceBetweenEnemiePlayer < 150) {
            if(angle !== 2){
				if(!this.animations._anims.open.isPlaying && !this.open){
					this.animations.play('open');

					this.animations._anims.open.onComplete.add(() => {
						this.open = true;
					}, this);
				}
				
				if(this.open){
					this.weapon.fireAtXY(this.player.body.x, this.player.body.y);
				}
                
            } else {
				if(!this.animations._anims.close.isPlaying && this.open){
					this.animations.play('close');
					this.open = false;
				}
				
			}
            
        } else {
			if(!this.animations._anims.close.isPlaying && this.open){
				this.animations.play('close');
				this.open = false;
			}
		}

        this.game.physics.arcade.collide(this.weapon.bullets, this.player.weapon.bullets, this.reverse, null, this);
        this.game.physics.arcade.collide(this.weapon.bullets, this.player, this.player.bulletHit, null, this);
        
        
    }

    reverse(weaponBullet, playerBullet){
        weaponBullet.body.velocity.x *= (-2.8);
        weaponBullet.body.velocity.y *= (-2.8);
    }

		
}
