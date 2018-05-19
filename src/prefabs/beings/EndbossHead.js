import Phaser from 'phaser';

// TODO: näher als 200PX -> schnappen -> Tod

export default class extends Phaser.Sprite {
	constructor(game, x, y, player, levelBuilder) {
        super(game, x, y, 'endBossHead');
        

		this.game = game;
        this.player = player;
        this.levelBuilder = levelBuilder;
        
		this.health = 3;
		this.dead = false;
        this.paralyze = false;
        
        this.snapRunning = false;

        // this.anchor.setTo(0, 0.5);
        this.anchor.setTo(0.5);



        this.game.physics.enable(this);
        this.body.immovable = true;

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

        this.game.add.tween(this).to( { tint: 0x000000 }, 9000, Phaser.Easing.Exponential.In, true, 0, 0, true).loop();

        var shootLoop = this.game.time.events.loop(1, () => {
            this.weapon.fireAtXY(478, 713);
        }, this);
    }

    snap(){
        if(this.snapRunning) return;
        this.snapRunning = true;

        this.snapTween = this.game.add.tween(this).to(
            {y: this.y + 150}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);

        this.snapTween = this.game.add.tween(this.levelBuilder.endBossHeadShadow).to(
            {y: this.levelBuilder.endBossHeadShadow.y + 150}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);

        this.snapClaw1Tween = this.game.add.tween(this.levelBuilder.endBossClaw1).to(
            {y: this.levelBuilder.endBossClaw1.y + 150}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);

        this.snapClaw2Tween = this.game.add.tween(this.levelBuilder.endBossClaw2).to(
            {y: this.levelBuilder.endBossClaw2.y + 150}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);

        this.rotateClaw1Tween = this.game.add.tween(this.levelBuilder.endBossClaw1).to(
            {rotation: this.levelBuilder.endBossClaw1.rotation - 0.3}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);

        this.rotateClaw2Tween = this.game.add.tween(this.levelBuilder.endBossClaw2).to(
            {rotation: this.levelBuilder.endBossClaw2.rotation + 0.3}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);

        this.snapTween = this.game.add.tween(this.levelBuilder.endBossNeck.scale).to(
            {y: 2}
        , 400, Phaser.Easing.Back.Out, true, 0, 0, true);


        this.snapTween.onComplete.add(() => {
            this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
                this.snapRunning = false;
            });
            
        }, this);
    }

    hit(){
        this.game.camera.flash(0xc10000, 200);
        // this.game.state.restart(true, false);
    }

    update(){
        this.game.physics.arcade.collide(this, this.player, this.hit, null, this);
        

        this.distanceBetweenEnemiePlayer = this.game.physics.arcade.distanceBetween(this, this.player);

        if (this.distanceBetweenEnemiePlayer < 200) {
            this.snap();       
        } else {
            // this.rotation = (this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y) - 1.5)/3;
            // this.levelBuilder.endBossClaw1.rotation = this.rotation;
            // this.levelBuilder.endBossClaw2.rotation = this.rotation;
        }
    }
    



		
}
