import Phaser from 'phaser';


export default class extends Phaser.Sprite {
	constructor(game, x, y, player) {
		super(game, x, y, 'endBossHead');

		this.game = game;
		this.player = player;
        
		this.health = 3;
		this.dead = false;
		this.paralyze = false;

        // this.anchor.setTo(0, 0.5);
        this.anchor.setTo(0.5);



		this.game.physics.enable(this);

        // this.body.setSize(13, 10, 5, 7);
        
        this.weapon = game.add.weapon(400, 'bulletBeam');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.weapon.bulletSpeed = 200;
		// this.weapon.bulletCollideWorldBounds = true;
		this.weapon.fireRate = 100;
		this.weapon.bulletAngleVariance = 90;
		this.weapon.bulletRotateToVelocity = true;
		this.weapon.trackSprite(this, 0, 100, true);


		for (var i = 0; i < this.weapon.bullets.children.length; i++) {
			this.weapon.bullets.children[i].body.bounce.set(0.5);
			this.weapon.bullets.children[i].scale.setTo(2);
			this.weapon.bullets.children[i].smoothed = false;
			this.game.add.tween(this.weapon.bullets.children[i]).to( { tint: 0x000000 }, 9000, Phaser.Easing.Exponential.In, true, 0, 0, true).loop();
		}
		

		game.add.existing(this);
    }

    startHead(){

        var shootLoop = this.game.time.events.loop(1, () => {
            this.weapon.fireAtXY(478, 713);
        }, this);
    }

    update(){
        this.rotation = (this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y) - 1.5)/3;
    }
    



		
}
