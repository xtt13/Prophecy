import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor (game, x, y, type, id) {
    super(game, x, y, type);

    this.game = game;
    this.type = type;
    this.id = id
    this.anchor.setTo(0.5);

	this.animations.add('play', [0, 1, 2, 3], 5, true);
	this.animations.play('play');

    this.game.physics.enable(this);

	this.game.add.existing(this);
  }

}
