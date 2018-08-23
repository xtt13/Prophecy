import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor(game, x, y, level, chest) {
        super(game, x, y, 'energyStone');

        this.game = game;
        this.level = level;
        this.chest = chest;

        this.id = 3;
        
        this.used = false;

        this.anchor.setTo(0.5);

        this.actionSymbol = this.game.add.sprite(this.x + 5, this.y - 15, 'actionSymbol');
        this.actionSymbol.smoothed = false;
        this.actionSymbol.alpha = 0;

        

        this.game.physics.enable(this);

        // setSize(width, height, offsetX, offsetY)
        this.body.setSize(10, 18, 10, 18);

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

    update() {
        if (this.used) return;

        this.chest.actionSymbol.alpha = 0;
        // this.game.physics.arcade.collide(this, this.level.player);

        this.game.world.bringToTop(this);
        // this.game.world.bringToTop(this.itemEmitter);

        if (this.game.physics.arcade.distanceBetween(this, this.level.player) < 50) {
            if (this.action) {
                this.actionSymbol.alpha = 0;
                return;
            }

            this.game.world.bringToTop(this.actionSymbol);

            this.actionSymbol.alpha = 1;

            // On E-click
            if (this.level.inputClass.button_E.isDown) {
                // if(this.openSwitch) return;
                // this.openSwitch = true;
                // this.action = true;
                this.actionSymbol.alpha = 0;
                this.level.player.collideWithItem(this.level.player, this);
                return;

            }
        } else {
            this.actionSymbol.alpha = 0;
        }




    }
}