import Phaser from 'phaser';

export default class {
	constructor(game, level) {
        this.game = game;
        this.level = level;
        this.player = this.level.player;
        
        this.dashRatio = { value: 1};
        this.waitTimer = this.game.time.events.add(100, () => {});

        this.buildHealthBar();

        this.reloadRatioTween = this.game.add.tween(this.dashBar.scale).to( { x: 1, y: 1 }, 1, 'Linear', true, 0, 0, false);
        this.reloadRatio = this.game.add.tween(this.dashRatio).to( {value: 1 }, 1, 'Linear', true, 0, 0, false);
        this.reduceTween = this.game.add.tween(this.dashBar.scale).to( { x: this.dashRatio.value, y: 1 }, 1, Phaser.Easing.Cubic.Out, true, 0, 0, false);
        
        this.counter = 4;
        this.testLoop = this.game.time.events.loop(500, () => {
            this.removeHeart(this.counter);
            this.counter--;
            if(this.counter == 0){
                this.game.time.events.remove(this.testLoop);
                
            }
        }, this);




        this.game.time.events.add(5000, () => {
            this.buildLoop = this.game.time.events.loop(500, () => {
                this.addHeart(this.counter);
                this.counter++;
                if(this.counter == 5){
                    this.game.time.events.remove(this.buildLoop);
                }
            }, this);
        });
	}

	buildHealthBar() {

        this.heartExplosion = this.game.add.emitter(0, 0, 100);

        var width = 13;
		var height = 13;
		var bmd = this.game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);

		// if(this.level.map.plus.properties.dayCycle){
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.globalAlpha = 1;
		// } else {
			// bmd.ctx.fillStyle = '#49ffc5';
			// bmd.ctx.globalAlpha = 0.2;
		// }

		bmd.ctx.fill();
		bmd.ctx.beginPath();
		bmd.line(0, 0, 13, 0, '#49ffc5', 2);
		bmd.ctx.fill();
		

		this.healthBarIcon = this.game.add.sprite(17, 17, bmd);
		this.healthBarIcon.fixedToCamera = true;
        this.healthBarIcon.alpha = 0.8;		


		var width = 53;
		var height = 13;
		var bmd = this.game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);

		// if(this.level.map.plus.properties.dayCycle){
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.globalAlpha = 1;
		// } else {
			// bmd.ctx.fillStyle = '#49ffc5';
			// bmd.ctx.globalAlpha = 0.2;
		// }
		
		
		bmd.ctx.fill();
		bmd.ctx.beginPath();
		bmd.line(0, 0, 53, 0, '#49ffc5', 2);
		bmd.ctx.fill();

		this.healthBar = this.game.add.sprite(34, 17, bmd);
		this.healthBar.fixedToCamera = true;
        this.healthBar.alpha = 0.8;

        var width = 53;
		var height = 3;
		var bmd_dashBar = this.game.add.bitmapData(width, height);

		bmd_dashBar.ctx.beginPath();
		bmd_dashBar.ctx.rect(0, 0, width, height);
        bmd_dashBar.ctx.fillStyle = '#000000';
        bmd_dashBar.ctx.globalAlpha = 1;
	
		bmd_dashBar.ctx.fill();
		// bmd_dashBar.ctx.beginPath();
		// bmd_dashBar.line(0, 0, 53, 0, '#49ffc5', 2);
		// bmd_dashBar.ctx.fill();

        this.dashBarFrame = this.game.add.sprite(34, 32, bmd_dashBar);
		this.dashBarFrame.fixedToCamera = true;
		this.dashBarFrame.alpha = 0.8;	
        
        this.dashBar = this.game.add.sprite(35, 33, 'dashBar');
        this.dashBar.fixedToCamera = true;
        

		this.hearts = this.game.add.group();
		let counter = 41;
		for (let index = 0; index < 5; index++) {
			var heart = this.game.add.sprite(counter, 24, 'heart');
			heart.scale.set(1);
			heart.anchor.set(0.5);
			heart.fixedToCamera = true;	
			counter += 10;
			heart.alpha = 1;
			this.hearts.add(heart);
			// this.game.add.tween(heart).to({ alpha: 1 }, 10000, 'Linear', true);
			this.game.add.tween(heart.scale).to( { x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false).loop();
		}
		
        this.heartsShaddow = this.game.add.group();
		let counterShaddow = 41;
		for (let index = 0; index < 5; index++) {
			var heartShaddow = this.game.add.sprite(counterShaddow, 24, 'heart');
			heartShaddow.scale.set(1);
			heartShaddow.anchor.set(0.5);
			heartShaddow.fixedToCamera = true;
			heartShaddow.alpha = 0.2;	
            counterShaddow += 10;
            this.heartsShaddow.add(heartShaddow);
		}
	
        // this.removeHeart(3);


    }
    
    removeHeart(index){
        var removeHeart = this.game.add.tween(this.hearts.getChildAt(index).scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Bounce.Out, true, 2000, 0, false);
		removeHeart.onComplete.add(() => {
			this.hearts.getChildAt(index).alpha = 0;
			this.hearts.getChildAt(index).scale.set(0);
        }, this);
        
        this.game.time.events.add(2000, () => {
			this.game.camera.shake(0.005, 500);
			this.heartExplosion = this.game.add.emitter(this.hearts.getChildAt(index).x, this.hearts.getChildAt(index).y, 100);
			this.heartExplosion.fixedToCamera = true;
			this.heartExplosion.setAlpha(1, 0, 2000, null, false);
			this.heartExplosion.setXSpeed(100);	
			this.heartExplosion.setYSpeed(-100);
			this.heartExplosion.makeParticles('bloodHeart', 100);
			this.heartExplosion.start(true, 0, null, 10);


		});
    }

    dash(){
        if(this.dashRatio.value <= 0.1){
            this.reloadRatioTween.stop(true);
            this.reloadRatio.stop(true);
            return;
        }

        this.game.time.events.remove(this.waitTimer);

        if(this.reloadRatioTween.isRunning){

            this.reloadRatioTween.stop(true);
            this.reloadRatio.stop(true);

            this.dashRatio.value -= 0.2;
            if(this.dashRatio.value <= 0.1){
                this.dashRatio.value = 0;
            }
            this.reduceTween = this.game.add.tween(this.dashBar.scale).to( { x: this.dashRatio.value, y: 1 }, 600, Phaser.Easing.Cubic.Out, true, 0, 0, false);

            this.waitTimer = this.game.time.events.add(4000, () => {
                if(this.level.inputClass.dash) return;
                this.reloadRatioTween = this.game.add.tween(this.dashBar.scale).to( { x: 1, y: 1 }, 5000, 'Linear', true, 0, 0, false);
                this.reloadRatio = this.game.add.tween(this.dashRatio).to( {value: 1 }, 5000, 'Linear', true, 0, 0, false);
            });

        } else {

            this.reloadRatioTween.stop();
            this.reloadRatio.stop();

            this.dashRatio.value -= 0.2;
            if(this.dashRatio.value <= 0.1){
                this.dashRatio.value = 0;
            }
            this.game.add.tween(this.dashBar.scale).to( { x: this.dashRatio.value, y: 1 }, 600, Phaser.Easing.Cubic.Out, true, 0, 0, false);
            
            this.waitTimer = this.game.time.events.add(4000, () => {
                this.reloadRatioTween = this.game.add.tween(this.dashBar.scale).to( { x: 1, y: 1 }, 5000, 'Linear', true, 0, 0, false);
                this.reloadRatio = this.game.add.tween(this.dashRatio).to( {value: 1 }, 5000, 'Linear', true, 0, 0, false);
            });
        }

    }

    addHeart(index){
        this.game.add.tween(this.hearts.getChildAt(index)).to({ alpha: 1 }, 500, Phaser.Easing.Bounce.Out, true);
		this.game.add.tween(this.hearts.getChildAt(index).scale).to( { x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out, true, 2000, 0, false);
    }

    update(){
        if(this.level.inputClass.dash){
            if(this.dashRatio.value <= 0.1){
                this.reloadRatioTween.stop();
                this.reloadRatio.stop();
            }
            // if(this.reloadRatioTween.isRunning){
            //     this.reloadRatioTween.stop();
            //     this.reloadRatio.stop();
            // }
        }
        // console.log(this.dashRatio.value);
    }

	
}
