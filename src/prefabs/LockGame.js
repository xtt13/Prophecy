import Phaser from 'phaser';
import config from './../config';

export default class {
	constructor(game, x, y, player) {
		this.game = game;
		this.bgColors = [0x62bd18, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2, 0x588c7e, 0x8c4646];
		this.tintColor = game.rnd.pick(this.bgColors);
		this.rotationSpeed = 3;
		this.maxAngleDifference = 10;
		this.scaleRate = 0.5;
		this.dead = false;
		this.player = player;

		this.run = true;
		this.firstSetup = true;
		this.currentTry = 1;

		this.x = x;
		this.y = y;

		this.setupGame();
	}

	setupGame(){

		this.player.movable = false;

		this.ring = this.game.add.sprite(this.x, this.y, "LockGameRing");
		this.ring.anchor.set(0.5);
        this.ring.smoothed = false;
        this.ring.alpha = 0.5;
        this.ring.scale.set(this.scaleRate);

		this.ball = this.game.add.sprite(this.x, this.y, "LockGameBall");
		this.ball.anchor.set(0.5);
		this.ball.ballAngle = -90;
		this.ball.smoothed = false;
		this.ball.scale.set(this.scaleRate);

		this.placeBall();      

		this.bar = this.game.add.sprite(this.x, this.y, "LockGameBar");
		this.bar.anchor.set(0, 0.5);
		this.bar.angle = -90;
		this.bar.crossingBall = false;
		this.bar.smoothed = false;
		this.bar.rotationDirection = 0;
		this.bar.scale.set(this.scaleRate);

		this.firstTry = this.game.add.sprite(this.x - 40, this.y, "LockGameBall");
		this.firstTry.anchor.set(0.5);
		this.firstTry.ballAngle = -90;
		this.firstTry.scale.set(this.scaleRate);

		this.secondTry = this.game.add.sprite(this.x, this.y, "LockGameBall");
		this.secondTry.anchor.set(0.5);
		this.secondTry.ballAngle = -90;
		this.secondTry.scale.set(this.scaleRate);

		this.thirdTry = this.game.add.sprite(this.x + 40, this.y, "LockGameBall");
		this.thirdTry.anchor.set(0.5);
		this.thirdTry.ballAngle = -90;
		this.thirdTry.scale.set(this.scaleRate);

		if(this.firstSetup){
			this.ring.alpha = 0;
			this.ball.alpha = 0;
			this.bar.alpha = 0;

			this.firstTry.alpha = 0;
			this.secondTry.alpha = 0;
			this.thirdTry.alpha = 0;

			this.game.add.tween(this.ring).to( { alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.bar).to( { alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.ball).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

			this.game.add.tween(this.firstTry).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.secondTry).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
			this.game.add.tween(this.thirdTry).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

			this.game.add.tween(this.player).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

			this.firstSetup = false;
		}


        this.game.input.onDown.add(this.startMoving, this);
	}

	placeBall(){
		this.ball.x = 200;
          do {
               this.newAngle = game.rnd.angle();
          } while (this.angleDifferenceFunc(this.newAngle, this.ball.ballAngle) < 40)

          this.ball.ballAngle = this.newAngle;  
          this.ball.x = this.ring.x + 88 * Math.cos(Phaser.Math.degToRad(this.ball.ballAngle));
          this.ball.y = this.ring.y + 88 * Math.sin(Phaser.Math.degToRad(this.ball.ballAngle));  
	}

	startMoving(){
		this.dead = false;
          this.game.input.onDown.remove(this.startMoving, this);
          this.game.input.onDown.add(this.changeDirection, this);
          this.bar.rotationDirection = 1;    
	}

	changeDirection(){
          this.angleDifference = Math.abs(this.ball.ballAngle - this.bar.angle);
          if(this.angleDifference > this.maxAngleDifference){
               // this.fail();
          }
          else{

          	switch (this.currentTry) {
				case 1:
					this.firstTry.tint = 0x00ff11;
					this.currentTry = 2;
					this.rotationSpeed = 4;
					break;

				case 2:
					this.secondTry.tint = 0x00ff11;
					this.currentTry = 3;
					this.rotationSpeed = 5;
					break;

				case 3:
					this.thirdTry.tint = 0x00ff11;
					this.run = false;

						this.game.add.tween(this.ring).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
						this.game.add.tween(this.bar).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
						this.game.add.tween(this.ball).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

						this.game.add.tween(this.firstTry).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
						this.game.add.tween(this.secondTry).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
						this.game.add.tween(this.thirdTry).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

						this.game.add.tween(this.player).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

						this.player.movable = true;

					break;

				default:
					
			}

               this.bar.crossingBall = false;
               this.bar.rotationDirection *= -1;
               this.placeBall();
          }
	}

	update(){
		if(this.run){
				this.bar.angle += this.rotationSpeed * this.bar.rotationDirection;
	          this.angleDifference = Math.abs(this.ball.ballAngle - this.bar.angle);

	          if(this.angleDifference < this.maxAngleDifference && !this.bar.crossingBall){
	               this.bar.crossingBall = true;
	          } 

	          if(this.angleDifference > this.maxAngleDifference && this.bar.crossingBall){
	               this.fail();
	          }
		}
	}

	fail(){
      	this.bar.rotationDirection = 0;
      	this.bar.tint = 0xff0000;
      	this.dead = true;
      	this.currentTry = 1;
      	this.rotationSpeed = 3;

      	this.game.camera.flash(0xff0000, 200);

 		if(window.navigator.vibrate !== undefined && "vibrate" in window.navigator) {
    		window.navigator.vibrate(500);
		}

		this.bar.destroy();
		this.ring.destroy();
		this.ball.destroy();

		this.firstTry.destroy();
		this.secondTry.destroy();
		this.thirdTry.destroy();

		this.setupGame();


	}

	angleDifferenceFunc(a1, a2){
		return Math.abs((a1 + 180 -  a2) % 360 - 180);
	}
	
}
