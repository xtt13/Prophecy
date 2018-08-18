import Phaser from 'phaser';


export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'bird');

		this.game = game;
		this.player = player;
		this.map = map;
		this.layer = layer;

        
        this.startFlying = false;
		
		this.anchor.setTo(0.5);

		this.animations.add('fly', [0, 1, 2, 3, 4], 30, true);
		this.animations.add('idle', [9], 1, true);
        this.animations.play('idle');
        
        this.scale.set(-1, 1);

        this.game.physics.enable(this);

        this.body.checkCollision.none = true;

        this.birdSounds = this.game.add.audioSprite('sfxBirds');
        this.birdSounds.allowMultiple = true;
        

        this.game.time.events.add(this.game.rnd.integerInRange(0, 2000), () => {
            this.twitter();
        }, this);

		game.add.existing(this);
    }
    
    twitter(){


        this.birdInterval = this.game.time.events.loop(this.game.rnd.integerInRange(3000, 5000), () => {
            if(this.game == null) return;
            this.rndBirdSounds = this.game.rnd.pick(['twitter1', 'twitter2', 'twitter3', 'twitter4', 'twitter5']);
            this.birdSounds.play(this.rndBirdSounds);
        }, this);

        

    }

	update() {

        // console.log(this.game.world.children);
        // this.game.world.bringToTop(this);
        this.game.world.setChildIndex(this, this.game.world.children.length-2);
        this.body.checkCollision.none = true;

        if(this.startFlying){
            this.scale.set(-1, 1);
            this.angle = 1;
            
            this.animations.play('fly');
            this.body.velocity.y = -100;
            this.body.velocity.x = 100;

            return;
        }
        
        this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

        if(this.distanceBetweenEnemiePlayer < 130){
            this.birdSounds.volume = 1;
        } else {
            // console.log('Quit BSound');
            this.birdSounds.stop();
        }

		if (this.distanceBetweenEnemiePlayer < 70) {

            this.startFlying = true;
            this.game.time.events.remove(this.birdInterval);
            this.birdSounds.play('flyAway');

            this.game.time.events.add(6000, () => {
                this.destroy();
            }, this);
            
            
        } else {
            // let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
			// if (angle == 1 || angle == 2 || angle == 0) {
			// 	this.scale.set(1, 1);
			// } else {
			// 	this.scale.set(-1, 1);
            // }

            let angle = this.game.physics.arcade.angleToXY(this.player, this.x, this.y);
			if (angle > -1.6) {
				this.scale.set(1, 1);
			} else {
				this.scale.set(-1, 1);
			}
        }

        
    }


		
}
