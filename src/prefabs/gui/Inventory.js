
export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;
	}

	show(){
        console.log('SHOW');
        this.text = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        this.text.setText('Coming soon!', true, -1, 5, 'left', true)
		this.textImage = this.game.add.image(250, 140, this.text);
		this.textImage.fixedToCamera = true;
		// this.textImage.alpha = 0.3;
    }
}
