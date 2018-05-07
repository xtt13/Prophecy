import Phaser from 'phaser';


export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'rock');

		this.game = game;
		this.player = player;
		this.map = map;
		this.layer = layer;


		this.health = 3;
		this.dead = false;
		this.paralyze = false;
		
		this.anchor.setTo(0.5);

		// this.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
		// this.animations.add('idle', [0], 1, true);
		// this.animations.play('walk');

		this.game.physics.enable(this);

        this.body.setSize(13, 10, 5, 7);
        
        this.weapon = game.add.weapon(10, 'bulletRock');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
		this.weapon.bulletLifespan = 2000;
		this.weapon.bulletSpeed = 200;
		this.weapon.fireRate = 400;
		this.weapon.trackSprite(this, 0, 13, false);

		game.add.existing(this);
	}

	update() {
		if(this.dead) return;
        if(this.paralyze) return;
        
        this.game.world.setChildIndex(this.weapon.bullets, 10);

        // console.log(Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y)));
		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
		this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if (this.distanceBetweenEnemiePlayer < 200) {
            if(angle !== 2){
                this.weapon.fireAtXY(this.player.body.x, this.player.body.y);
            }
            
        }

        this.game.physics.arcade.collide(this.weapon.bullets, this.player.weapon.bullets, this.reverse, null, this);
        this.game.physics.arcade.collide(this.weapon.bullets, this.player, this.player.bulletHit, null, this);
        
        
    }

    reverse(weaponBullet, playerBullet){
        weaponBullet.body.velocity.x *= (-1.8);
        weaponBullet.body.velocity.y *= (-1.8);
    }

		
}
