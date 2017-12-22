import Phaser from 'phaser';
import config from './../config';

export default class extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'player');

    this.game = game;
    this.health = config.playerHealth;
    this.movable = true;
    this.anchor.setTo(0.5);
    // this.scale.set(config.scaleRate);

    this.animations.add('idle', [0,1,2,3,4], 5, true);
    this.animations.play('idle');

    this.game.physics.enable(this);
    this.body.setSize(8, 20, 18, 20);

    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);

	game.add.existing(this);
  }

  walk(direction, speed) {

    if(this.movable){
      //console.log("Direction: " + direction + ", Speed: " + speed);

      switch(direction) {
          case 'up':
              this.body.velocity.y = -speed;
              break;

          case 'down':
              this.body.velocity.y = speed;
              break;

          case 'idle':
              this.body.velocity.y = 0;
              break;

          default:
            this.body.velocity.y = 0;

      }

      switch(direction){
        case 'left':
              this.body.velocity.x = -speed;
              break;

          case 'right':
              this.body.velocity.x = speed;
              break;

          case 'idle':
              this.body.velocity.x = 0;
              break;

          default:
            this.body.velocity.x = 0;

      }
    } else {
      this.body.velocity.set(0);
    }

  	

  }

  idle(direction){
  	if(direction == "x"){
  		this.body.velocity.x = 0;
  	} else if(direction == "y"){
  		this.body.velocity.y = 0;
  	} else {
  		this.body.velocity.x = 0;
  		this.body.velocity.y = 0;
  	}
  
  }

  fight(){

  }

  getdamage(){

  }

}
