import Phaser from 'phaser';

export default class extends Phaser.Sprite {
	constructor(game, x, y, properties) {
		super(game, x, y, 'chest');

		this.game = game;
		this.id = properties.id;

        // this.anchor.setTo(0.5);
        this.scale.setTo(1.25);

        this.animations.add('open', [0, 1, 2, 3, 4, 5], 15, false);
        this.animations.add('close', [5, 4, 3, 2, 1, 0], 15, false);

		this.game.physics.enable(this);

		this.game.add.existing(this);
	}

	update(){
		// this.game.world.setChildIndex(this, 10);
	}
}
