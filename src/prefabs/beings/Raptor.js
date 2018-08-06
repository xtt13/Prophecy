import Phaser from 'phaser';
import Pathfinder from './../gamemechanics/Pathfinder';

export default class extends Phaser.Sprite {
	constructor(game, x, y, player, map, layer, properties) {
		super(game, x, y, 'raptor');

		this.game = game;
		this.player = player;
		this.map = map;
        this.layer = layer;
        this.type = properties.type;
        
		this.dropItemID = properties.dropItemID;
		this.itemType = properties.itemType;
		this.killQuestID = properties.killQuestID;


		this.health = 2;
		this.dead = false;
		this.paralyze = false;
        this.attackSoundSwitch = true;
        this.speed = 180;
	
		this.anchor.setTo(0.5);

		this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6], 15, true);
		// this.animations.add('wait', [0], 15, true);
		// this.animations.add('idle', [10, 11, 12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 10, true);
		
        this.scale.set(1, 1);
        
		// this.game.time.events.add(Phaser.Timer.SECOND * this.game.rnd.integerInRange(1, 3), () => {
			this.animations.play('fly');
		// }, this);


		this.game.physics.enable(this);

        this.body.setSize(13, 10, 27, 27);
        
		this.body.bounce.set(1.7);
        this.body.drag.set(1500);
        
		// this.body.enable = false;

		game.add.existing(this);
	}

	update() {
        if(this.dead) return;
        
		if(this.paralyze){
			// this.animations.play('wait');
			return;
		}

		this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

		if (this.distanceBetweenEnemiePlayer < 170) {

			// if (this.distanceBetweenEnemiePlayer < 100) {
			// 	this.animations.play('walk');
			// 	this.game.physics.arcade.moveToObject(this, this.player, 150);
			// } else {
			// 	this.animations.play('walk');
			// 	this.game.physics.arcade.moveToObject(this, this.player, this.closeSpeed);
			// }


			let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
			if (angle == 1 || angle == 2 || angle == 0) {
				this.scale.set(-1, 1);
				// console.log('flip left');
			} else {
				this.scale.set(1, 1);
				// console.log('flip right');
			}

			// if(this.attackSoundSwitch){
			// 	this.attackSoundSwitch = false;
			// 	this.rndVoice = this.game.rnd.pick(['vx1', 'vx2', 'vx3', 'vx4', 'vx5', 'vx6', 'vx7', 'vx8', 'vx9', 'vx10', 'vx11', 'vx12', 'vx13', 'vx14', 'vx15']);
			// 	this.voice = this.game.add.audioSprite('VxSeeds');
			// 	this.voice.play(this.rndVoice, 0.1);
			// 	this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
			// 		this.attackSoundSwitch = true;
			// 	}, this);
			// }

			

			this.game.physics.arcade.moveToObject(this, this.player.body, this.speed);


			// if(this.animations.currentAnim.name == "idle"){
			// 	this.animations._anims.idle.stop();
			// }

			// this.animations.play('walk');
			

		}




	}
}
