import Phaser from 'phaser';
import config from './../config';

export default class extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, 2100, 2000, 'player');

    this.game = game;
    this.health = config.playerHealth;
    this.anchor.setTo(0.5);
    this.scale.set(3);

    this.animations.add('idle', [0,1,2,3], 5, true);

    this.game.physics.enable(this);

    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);

	game.add.existing(this);
  }

  setPlayerCoordinates(x, y){
  	this.x = x;
  	this.y = y;
  }

  walk(direction, speed) {

  		this.animations.play('idle');

	  switch(direction) {
	    case 'up':
	        this.body.velocity.y = -speed;
	        //this.play('walk_up');
	        break;
	    case 'down':
	        this.body.velocity.y = speed;
	        //this.play('walk_down');
	        break;
	    case 'left':
	        this.body.velocity.x = -speed;
	        //this.play('walk_left');
	        break;
	    case 'right':
	        this.body.velocity.x = speed;
	        //this.play('walk_right');
	        break;
	    case 'idle':
	        this.body.velocity.x = 0
	        this.body.velocity.y = 0;
	        //this.playerSprite.animations.stop(true);
	        break;
	    default:
	        // this.body.velocity.x = 0;
	        // this.body.velocity.y = 0;
	        //this.animations.stop(true);
		}
  }

  fight(){

  }

  getdamage(){

  }

}
