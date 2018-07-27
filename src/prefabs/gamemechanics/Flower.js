import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor(game, x, y, type, properties, level) {
        super(game, x, y, 'flower');

        this.game = game;
        this.type = type;
        this.level = level;
        this.anchor.setTo(0.5);


        this.game.physics.enable(this);
        this.body.drag.set(1000);

        this.game.add.existing(this);
    }

    update() {
        // this.game.physics.arcade.collide(this, this.level.player);
        this.game.physics.arcade.collide(this.level.player.weapon.bullets, this, this.cut, null, this);

        let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.level.player, this.x, this.y));
		if (angle == 2 && this.y > this.level.player.body.y) {
			this.game.world.moveUp(this);
			// this.game.world.setChildIndex(this.player, 1);
		}
    }

    cut() {

        this.rndVoice = this.game.rnd.pick(['cut1', 'cut2']);
        this.voice = this.game.add.audioSprite('sfxswordmulti');
        this.voice.play(this.rndVoice, 0.5);

        console.log('CUT!');
        this.alpha = 0;
        

        let px = this.body.velocity.x;
        let py = this.body.velocity.y;

        px *= 2;
        py *= 2;

        this.cutAnimation = this.game.add.emitter(this.x, this.y, 2);
        this.cutAnimation.angularDrag = 500;
        this.cutAnimation.particleDrag.set(1800);

        if (this.level.inputClass.direction == 'left' || this.level.inputClass.direction == 'right') {
            this.cutAnimation.setXSpeed(px);
            this.cutAnimation.setYSpeed(400);
        } else {
            this.cutAnimation.setXSpeed(400);
            this.cutAnimation.setYSpeed(py);
        }

        this.cutAnimation.minParticleScale = 0.5;
        this.cutAnimation.maxParticleScale = 1;
        this.cutAnimation.makeParticles('flowerPieces', [0, 1, 2, 3], 2);
        this.cutAnimation.setAlpha(1, 0, 5000, null, false);
        this.cutAnimation.start(true, 0, null, 10);

        

        this.game.time.events.add(500, () => {
            this.body.enable = false;
        }, this);
    }
}