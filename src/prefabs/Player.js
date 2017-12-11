import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'player');

    this.game = game;
    this.zahl = 588;
    this.anchor.setTo(0.5);

    this.game.physics.enable(this);

	game.add.existing(this);
  }

  walk(direction, speed){
  	console.log(direction, speed);
  }

}
