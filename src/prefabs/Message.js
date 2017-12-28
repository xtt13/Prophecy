import Phaser from 'phaser';

export default class {
	constructor(game, message, movable, readable, player) {
		this.game = game;
		this.message = message;
		this.movable = movable;
		this.readable = readable;
		this.player = player;

		this.line = [];
		this.wordIndex = 0;
		this.lineIndex = 0;

		this.wordDelay = 100;
		this.lineDelay = 2000;

		// let background = new Phaser.Rectangle(130, 30, 800, 50);

		var drawnObject;
		var width = 300;
		var height = 85;
		var bmd = game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 0.8;
		bmd.ctx.fill();
		this.background = game.add.sprite(this.game.camera.width / 2 - bmd.width/2, this.game.camera.height - 90, bmd);
		this.background.fixedToCamera = true;

		if (this.readable) {
			this.text = this.game.add.bitmapText(
				this.background.x + 20,
				this.game.camera.height - 80,
				'pxlfont',
				'',
				51
			);
		} else {
			this.text = this.game.add.bitmapText(
				this.background.x + 20,
				this.game.camera.height - 60,
				'pxlfont',
				'',
				32
			);
		}

		// this.text = this.game.add.bitmapText(130, 30, 'pxlfont', '', 20);
		this.text.scale.set(0.26);
		this.text.maxWidth = 1000;
		this.text.textHeight = 1500;
		this.game.cache.getBitmapFont('pxlfont').font.lineHeight = 100;
		this.text.fixedToCamera = true;
		this.text.smoothed = false;

		if (!this.movable) {
			this.player.movable = false;
		}

		this.nextLine();

		return 'test';
	}

	nextLine() {
		if (this.lineIndex === this.message.length) {
			this.game.time.events.add(Phaser.Timer.SECOND * 2, this.removeMessage, this);
			return;
		}

		this.line = this.message[this.lineIndex].split(' ');
		this.wordIndex = 0;
		this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
		this.text.text = '';
		this.lineIndex++;
	}

	nextWord() {
		this.text.text = this.text.text.concat(this.line[this.wordIndex] + ' ');
		this.wordIndex++;

		if (this.wordIndex === this.line.length) {
			this.text.text = this.text.text.concat('\n');
			this.game.time.events.add(this.lineDelay, this.nextLine, this);
		}
	}

	removeMessage() {
		this.text.destroy();
		this.background.destroy();
		if (!this.movable) {
			this.player.movable = true;
		}
	}
}
