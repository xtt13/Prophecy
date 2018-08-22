import Phaser from 'phaser';

export default class {
	constructor(game, type, message) {
		this.game = game;
		this.type = type;
		this.message = message;

		this.game.time.events.add(Phaser.Timer.SECOND * 3, this.createNotification, this);
	}

	createNotification() {

		this.archivementSound = this.game.add.audio('achivement', 2);

		if (this.type == 'success') {
			this.archivementSound.play();
		}

		if (this.type == 'quest') {
			this.archivementSound.play();
		}

		var width = 50;
		var height = 20;
		this.bmd = this.game.add.bitmapData(width, height);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, width, height);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 0.8;
		this.bmd.ctx.fill();

		this.notificationBar = this.game.add.sprite(this.game.camera.width - this.bmd.width - 20, -20, this.bmd);
		this.notificationBar.fixedToCamera = true;
		this.notificationBar.alpha = 0;

		// this.text = this.game.add.bitmapText(this.notificationBar.x, -20, 'pxlfont', '', 51);
		// this.text.scale.set(0.26);

		this.text = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        // this.text.setText(content, true, -1, 5, 'left', true)
		this.fontImage = this.game.add.image(this.notificationBar.x, -20, this.text);
		this.fontImage.fixedToCamera = true;
		this.text.setText(this.message, true, -1, 5, 'left', true)
		this.fontImage.alpha = 0;
		this.fontImage.anchor.set(0.5);

		// this.text = this.game.add.bitmapText(this.notificationBar.x, this.notificationBar.y - 4, 'pxlfont', '', 15);
		// this.text.text = this.message;

		this.notificationBar.width = this.text.width + 20;
		this.notificationBar.anchor.set(0.5);

		// console.log('Beginn Text: ' + this.text.cameraOffset);
		// console.log('Beginn notificationBar: ' + this.notificationBar.cameraOffset);

		this.game.add.tween(this.fontImage.cameraOffset).to({ y: this.fontImage.y + 40 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add
			.tween(this.notificationBar.cameraOffset)
			.to({ y: this.notificationBar.y + 40 }, 800, Phaser.Easing.Back.Out, true);

		this.game.add.tween(this.fontImage).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(this.notificationBar).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

		// console.log('Beginn Text End: ' + this.text.cameraOffset);
		// console.log('Beginn notificationBar End: ' + this.notificationBar.cameraOffset);

		this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeNotification, this);
	}

	removeNotification() {
		this.removeTween = this.game.add.tween(this.fontImage).to({ alpha: 0 }, 1000, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.notificationBar).to({ alpha: 0 }, 1000, Phaser.Easing.Back.Out, true);

		this.notificationBar.cameraOffset.y = -20;
		this.fontImage.cameraOffset.y = -20;

		this.removeTween.onComplete.add(function() {
			this.notificationBar.destroy();
			this.notificationBar = false;
			this.fontImage.destroy();
			this.bmd.destroy();
		}, this);
	}
}
