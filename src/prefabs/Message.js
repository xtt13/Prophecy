import Phaser from 'phaser';

export default class {
	constructor(game, message, movable, readable, player, level) {
		this.game = game;
		this.message = message;
		this.movable = movable;
		this.readable = readable;
		this.player = player;
		this.level = level;

		this.line = [];
		this.wordIndex = 0;
		this.lineIndex = 0;

		this.wordDelay = 100;
		this.lineDelay = 2000;

		this.followTween = this.game.add

		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.5, 0.5);

		this.addBars();

		var drawnObject;
		var width = 300;
		var height = 65;
		var bmd = game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 0.8;
		bmd.ctx.fill();

		this.background = game.add.sprite(this.game.camera.width / 2 - bmd.width / 2, this.game.camera.height - 90, bmd);
		this.background.fixedToCamera = true;

		if (this.readable) {
			this.text = this.game.add.bitmapText(this.background.x + 20, this.game.camera.height - 80, 'pxlfont', '', 51);
		} else {
			this.text = this.game.add.bitmapText(this.background.x + 20, this.game.camera.height - 60, 'pxlfont', '', 32);
		}

		this.text.scale.set(0.26);
		this.text.maxWidth = 1000;
		this.text.textHeight = 1500;
		this.game.cache.getBitmapFont('pxlfont').font.lineHeight = 100;
		this.text.fixedToCamera = true;
		this.text.smoothed = false;

		if (!this.movable) {
			this.player.movable = false;
			this.player.body.immovable = true;
		}

		this.nextLine();
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
		this.removeBars();
		if (!this.movable) {
			this.player.movable = true;
			this.player.body.immovable = false;
		}
	}

	addBars() {
		var drawnObject;
		var width = this.game.camera.width;
		var height = 20;
		var bmd = game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 1;
		bmd.ctx.fill();

		this.upperBar = game.add.sprite(this.game.camera.width / 2 - bmd.width / 2, this.game.camera.height, bmd);
		this.upperBar.fixedToCamera = true;

		this.downBar = game.add.sprite(
			this.game.camera.width / 2 - bmd.width / 2,
			this.game.camera.height - this.game.camera.height - 20,
			bmd
		);
		this.downBar.fixedToCamera = true;

		this.game.add
			.tween(this.upperBar.cameraOffset)
			.to({ y: this.upperBar.y - 20 }, 1000, Phaser.Easing.Linear.None, true);
		this.game.add
			.tween(this.downBar.cameraOffset)
			.to({ y: this.downBar.y + 20 }, 1000, Phaser.Easing.Linear.None, true);
	}

	removeBars() {
		this.upperBarTween = this.game.add
			.tween(this.upperBar.cameraOffset)
			.to({ y: this.game.camera.height }, 1000, Phaser.Easing.Linear.None, true);
		this.downBarTween = this.game.add
			.tween(this.downBar.cameraOffset)
			.to({ y: this.game.camera.height - this.game.camera.height - 20 }, 1000, Phaser.Easing.Linear.None, true);

		this.upperBarTween.onComplete.add(function() {
			this.upperBar.destroy();
			this.downBar.destroy();
			this.upperBar = false;
			this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.07, 0.07);
		}, this);
	}
}
