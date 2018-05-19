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

		this.followTween = this.game.add;

		this.wordSound = this.game.add.audio('sfxletters');
		

		// this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.5, 0.5);

		this.addBars();

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

		this.background.x = Math.floor(this.background.x);
		this.background.y = Math.floor(this.background.y);

		//FIX?
		this.game.renderer.renderSession.roundPixels = true;

		this.text = this.game.add.bitmapText(
			this.background.x + 20,
			this.game.camera.height - 80,
			'pxlfont',
			'',
			10
		);
		this.text.smoothed = false;
		// this.text.anchor.set(0.5);

		// if (this.readable) {
		// 	this.text = this.game.add.bitmapText(this.background.x + 20, this.game.camera.height - 80, 'pxlfont', '', 12);
		// } else {
		// 	this.text = this.game.add.bitmapText(this.background.x + 20, this.game.camera.height - 60, 'pxlfont', '', 32);
		// }

		// var style = { font: "10px Pixeled", fill: "#49ffc5", align: "center", wordWrapWidth: 50 };
		// this.text = this.game.add.text(this.background.x + 20, this.game.camera.height - 80, "", style);
		this.text.x = Math.floor(this.text.x);
		this.text.y = Math.floor(this.text.y);

		this.text.smoothed = false;

		// this.text.scale.set(0.35);
		this.text.maxWidth = 200;
		// this.text.textHeight = 1500;
		this.game.cache.getBitmapFont('pxlfont').font.lineHeight = 100;

		this.text.fixedToCamera = true;

		// this.text.x = parseInt(this.text.x);
		// this.text.y = parseInt(this.text.y);

		console.log(this.text);
		

		if (!this.movable) {
			this.player.movable = false;
			this.player.body.immovable = true;
		}

		this.level.GUICLASS.healthBar.fadeOut();

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

		this.text.x = Math.floor(this.text.x);
		this.text.y = Math.floor(this.text.y);
	}

	nextWord() {
		this.text.text = this.text.text.concat(this.line[this.wordIndex] + ' ');
		this.wordIndex++;

		this.wordSound.play();

		if (this.wordIndex === this.line.length) {
			this.text.text = this.text.text.concat('\n');
			this.game.time.events.add(this.lineDelay, this.nextLine, this);
		}

		// this.text.cleanText(text);

		this.text.x = Math.floor(this.text.x);
		this.text.y = Math.floor(this.text.y);
	}

	removeMessage() {

		//FIX END
		this.game.renderer.renderSession.roundPixels = false;
		
		this.text.destroy();
		this.background.destroy();
		this.removeBars();
		this.level.GUICLASS.healthBar.fadeIn();
		if (!this.movable) {
			this.player.movable = true;
			
			this.player.body.immovable = false;

			this.game.time.events.add(3000, () => {
				this.player.talking = false;
			});
		}
	}

	addBars() {
		var width = this.game.camera.width;
		var height = 20;
		var bmd = this.game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 1;
		bmd.ctx.fill();

		this.upperBar = this.game.add.sprite(this.game.camera.width / 2 - bmd.width / 2, this.game.camera.height, bmd);
		this.upperBar.fixedToCamera = true;

		this.downBar = this.game.add.sprite(
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
			
			// switch (this.level.tilemapProperties.cameraMode) {
			// 	case 'follow':
			// 		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
			// 		break;
	
			// 	case 'topdown':
			// 		// this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.07, 0.07);
			// 		this.game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.1, 0.1);
			// 		break;
			
			// 	default:
			// 		console.warn('Default Camera Mode!');
			// 		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
			// 		break;
			// }

		}, this);
	}
}
