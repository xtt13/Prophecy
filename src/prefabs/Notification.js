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
		var bmd = game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 1;
		bmd.ctx.fill();

		this.notificationBar = game.add.sprite(this.game.camera.width - bmd.width - 20, -20, bmd);
		this.notificationBar.fixedToCamera = true;
		this.notificationBar.alpha = 0;

		this.text = this.game.add.bitmapText(this.notificationBar.x + 5, this.notificationBar.y, 'pxlfont', '', 51);
		this.text.text = this.message;
		this.text.scale.set(0.26);
		this.text.alpha = 0;
		this.text.fixedToCamera = true;

		this.game.add.tween(this.text.cameraOffset).to( { y: this.text.y + 33 }, 800, Phaser.Easing.Back.Out, true);
		this.game.add.tween(this.notificationBar.cameraOffset).to( { y: this.notificationBar.y + 30 }, 800, Phaser.Easing.Back.Out, true);

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
        }, this);
	}
}
