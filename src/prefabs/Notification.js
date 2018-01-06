import Phaser from 'phaser';

export default class {
	constructor(game, type, message) {
		this.game = game;
		this.type = type;
		this.message = message;

		this.game.time.events.add(Phaser.Timer.SECOND * 2, this.createNotification, this);
	}

	createNotification(){
		var drawnObject;
		var width = 50;
		var height = 20;
		this.bmd = game.add.bitmapData(width, height);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, width, height);
		this.bmd.ctx.fillStyle = '#000000';
		this.bmd.ctx.globalAlpha = 0.8;;
		this.bmd.ctx.fill();

		this.notificationBar = game.add.sprite(this.game.camera.width - this.bmd.width - 20, -20, this.bmd);
		this.notificationBar.fixedToCamera = true;
		this.notificationBar.alpha = 0;

		this.text = this.game.add.bitmapText(this.notificationBar.x, this.notificationBar.y - 4, 'pxlfont', '', 51);
		this.text.text = this.message;
		this.text.scale.set(0.26);
		this.text.alpha = 0;
		this.text.fixedToCamera = true;

		this.notificationBar.width = this.text.width + 20;
		this.text.anchor.set(0.5);
		this.notificationBar.anchor.set(0.5);

		this.game.add.tween(this.text.cameraOffset).to( { y: this.text.y + 43 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.notificationBar.cameraOffset).to( { y: this.notificationBar.y + 40 }, 800, Phaser.Easing.Back.Out, true);

		this.game.add.tween(this.text).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(this.notificationBar).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);

		this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeNotification, this);
	}

	removeNotification(){

		this.removeTween = this.game.add.tween(this.text).to( { alpha: 0 }, 1000, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.notificationBar).to( { alpha: 0 }, 1000, Phaser.Easing.Back.Out, true);

		this.removeTween.onComplete.add(function(){
            this.notificationBar.destroy();
            this.text.destroy();
            this.bmd.destroy();
        }, this);
	}
}
