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

        this.body.setSize(130, 130, 50, 30);
        
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

        // this.game.add.tween(this).to( { tint: 0x000000 }, 9000, Phaser.Easing.Exponential.In, true, 0, 0, true).loop();

        var shootLoop = this.game.time.events.loop(1, () => {
            this.weapon.fireAtXY(478, 713);
        }, this);

        let explosion = this.game.add.emitter(this.weapon.x, this.weapon.y + 30, 200);
        // explosion.fixedToCamera = true;
        explosion.setAlpha(1, 0, 2000, null, false);
        // explosion.setXSpeed(this.game.rnd.integerInRange(-100, 100));
        explosion.gravity = 10;
        explosion.setYSpeed(100);
        explosion.setXSpeed(-30, 30);
        explosion.minParticleScale = 2;
        explosion.makeParticles('bulletParticle');
        explosion.start(false, 2000, 1);

        // this.game.time.events.add(4000, () => {
        //     explosion.on = false;
        // }, this);
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
        // this.levelBuilder.level.gameOver(1000);

        // this.game.add.tween(this.levelBuilder.endBossClaw1).to({
		// 	alpha: 0
        // }, 1000, Phaser.Easing.Circular.InOut, true);
        
        // this.game.add.tween(this.levelBuilder.endBossClaw2).to({
		// 	alpha: 0
        // }, 1000, Phaser.Easing.Circular.InOut, true);
        
        // this.game.add.tween(this).to({
		// 	alpha: 0
        // }, 1000, Phaser.Easing.Circular.InOut, true);

        // this.game.add.tween(this.levelBuilder.endBoss).to({
		// 	alpha: 0
        // }, 1000, Phaser.Easing.Circular.InOut, true);
        
        // // this.game.add.tween(this.levelBuilder.endBoss).to({
		// // 	alpha: 0
        // // }, 5000, Phaser.Easing.Circular.InOut, true);
        
        // // this.game.add.tween(this.levelBuilder.endBoss).to({
		// // 	alpha: 0
        // // }, 5000, Phaser.Easing.Circular.InOut, true);
        
        // // this.game.add.tween(this.levelBuilder.endBoss).to({
		// // 	alpha: 0
        // // }, 5000, Phaser.Easing.Circular.InOut, true);
        
        // // this.game.add.tween(this.levelBuilder.endBoss).to({
		// // 	alpha: 0
        // // }, 5000, Phaser.Easing.Circular.InOut, true);
        // this.game.musicPlayer.music.fadeOut(1000);
        // this.game.time.slowMotion = 10.0;

        // this.game.time.events.add(Phaser.Timer.SECOND * 15, () => {
        //     this.game.state.restart(true, false);
        // });

    }

    endBosshit(boss, bullet){
        this.game.camera.flash(0xc10000, 200);
        boss.tint = 0xFF0000;
        this.game.time.events.add(150, () => {
			boss.tint = 16777215;
        });

        
        this.game.camera.shake(0.003, 100);

        this.explosion = this.game.add.emitter(bullet.x, bullet.y, 100);
        this.explosion.fixedToCamera = true;
        this.explosion.setAlpha(1, 0, 2000, null, false);
        this.explosion.setXSpeed(this.game.rnd.integerInRange(-100, 100));
        this.explosion.gravity = 150;
        this.explosion.setYSpeed(-100);
        this.explosion.makeParticles('blood', 100);
        this.explosion.start(true, 0, null, 100);

        this.game.time.events.add(2000, () => {
            if(this.explosion !== null){
                this.explosion.destroy();
            }
            
        }, this);
    }

    reverse(weaponBullet, playerBullet){
        weaponBullet.body.velocity.x *= (-1.8);
        weaponBullet.body.velocity.y *= (-3);
    }

    update(){
        this.game.physics.arcade.collide(this, this.player, this.hit, null, this);
        this.game.physics.arcade.collide(this.weapon.bullets, this.player.weapon.bullets, this.reverse, null, this);
        this.game.physics.arcade.collide(this.weapon.bullets, this, this.endBosshit, null, this);

        

        if(this.explosion){
            this.game.world.bringToTop(this.explosion);
        }
        

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
