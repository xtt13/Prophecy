import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, element, player) {
		super(game, element.x, element.y + (element.height / 2), element.properties.character);
		console.log(element);
		this.game = game;
		this.id = element.properties.id;
		this.name = element.properties.character;
		this.player = player;
		this.health = 100;
		this.randomMovement = true;
		this.anchor.setTo(0.5);

		this.game.physics.enable(this);
		this.body.immovable = true;
		this.body.drag.set(90);

		this.animations.add('down', [0], 1, false);
		this.animations.add('up', [1], 1, false);
		this.animations.add('left', [2], 1, false);
		this.animations.add('right', [3], 1, false);

		// setSize(width, height, offsetX, offsetY)
		switch (element.properties.character) {
			case 'priest':
				this.body.setSize(10, 15, 5, 20);
				break;
			case 'smith':
				this.body.setSize(15, 15, 9, 26);
				break;
			case 'botanist':
				this.body.setSize(15, 15, 5, 30);
				break;
			case 'veteran':
				this.body.setSize(10, 20, 11, 22);
				break;
			case 'librarian':
				this.body.setSize(10, 10, 5, 28);
				break;
			case 'woman1':
				this.body.setSize(10, 10, 0, 20);
				break;
			case 'woman2':
				this.body.setSize(10, 10, 4, 27);
				break;
			case 'girl1':
				this.body.setSize(10, 10, 2, 20);
				break;
			case 'girl2':
				this.body.setSize(10, 10, 2, 20);
				break;
			case 'girl3':
			this.body.setSize(10, 10, 2, 18);
				break;
			default:
				this.body.setSize(10, 15, 0, 0);
		}

		this.movementX = this.x + 100;
		this.movementY = this.y + 100;

		this.runIdleLoop();

		game.add.existing(this);
	}

	runIdleLoop(){
		this.idleLoop = this.game.time.events.loop(this.game.rnd.integerInRange(2000, 5000), () => {
			this.randomDirection();
		}, this);
	}

	randomDirection(){
		
		let rndNumber = this.game.rnd.integerInRange(0, 3);
		switch (rndNumber) {
			case 0:
				this.animations.play('down');
				break;
			
			case 1:
				this.animations.play('up');
				break;

			case 2:
				this.animations.play('left');
				break;

			case 3:
				this.animations.play('right');
				break;
		
			default:
				this.animations.play('down');
				break;
		}
		
	}

	update() {
		// console.log(this.game.physics.arcade.distanceBetween(this, this.player));
		// if(this.game.physics.arcade.distanceBetween(this, this.player) < 100 && this.game.physics.arcade.distanceBetween(this, this.player) > 40){
		//   this.game.physics.arcade.moveToObject(this, this.player, 30);
		// }

		// console.log(Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y)));
		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));
		// if(angle == 1 || angle == 2 || angle == -0){
		//   this.scale.set(-1, 1);
		//   // console.log('flip left');
		// } else {
		//   this.scale.set(1, 1);

		//   // console.log('flip right');
		// }
		if (angle == 2) {
			this.game.world.moveUp(this);
			// this.game.world.setChildIndex(this.player, 1);
		}
		// this.game.world.moveUp(this);
	}
}
