import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor(game, x, y, level) {
        super(game, x, y, 'heart');

        this.game = game;
        this.level = level;

        // this.id = 4;

        this.used = false;

        this.anchor.setTo(0.5);


        this.game.physics.enable(this);

        this.body.setSize(20, 20, -6, -6);

        this.body.immovable = true;

        this.alpha = 0;

        this.game.add.existing(this);

        this.fadeIn();
    }

    fadeIn() {

        this.alphaTween = this.game.add
            .tween(this)
            .to({
                alpha: 1
            }, 500, Phaser.Easing.Cubic.Out, true);

        this.game.add.tween(this).to({
            y: this.y + 5
        }, 1000, 'Linear', true, 0, 0, true).loop();


        // this.itemEmitter = this.game.add.emitter(this.x, this.y, 40);
        // this.itemEmitter.maxParticleScale = 1;
        // this.itemEmitter.maxRotation = 0;
        // this.itemEmitter.gravity = 0;
        // this.itemEmitter.width = 40;
        // this.itemEmitter.height = 40;
        // this.itemEmitter.setXSpeed(0, 0);
        // this.itemEmitter.setYSpeed(0);
        // this.itemEmitter.maxParticleSpeed.set(1);
        // this.itemEmitter.makeParticles('sparklingSpritesheet', [0, 1, 2, 3], 40);
        // this.itemEmitter.start(false, 1000, 0.1, 0);


    }

    heartUp() {
        this.used = true;
        console.log(this.level);
        if (this.level.player.health < 5) {
            this.level.GUICLASS.healthBar.addHeart(1);
            this.level.player.health += 1;
            this.level.gameData.playerHealth += 1;
            this.level.safe.setGameConfig(this.level.gameData);
        }

    }

    update() {
        if (this.used) {
            this.destroy();
            return;
        }

        // this.game.debug.body(this);

        this.game.physics.arcade.collide(this, this.level.player, this.heartUp, null, this);

        this.game.world.bringToTop(this);
        // this.game.world.bringToTop(this.itemEmitter);

        if (this.game.physics.arcade.distanceBetween(this, this.level.player) < 50) {
            if (this.action) {
                return;
            }



            // On E-click
            if (this.level.inputClass.button_E.isDown) {
                // if(this.openSwitch) return;
                // this.openSwitch = true;
                // this.action = true;
                this.level.player.collideWithItem(this.level.player, this);
                return;

            }
        }




    }
}