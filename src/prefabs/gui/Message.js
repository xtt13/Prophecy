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
		this.endTime = 2000;

		this.playFast = false;

		this.wordDelay = 100;
		this.lineDelay = 2000;

		this.counter = 0;

		this.followTween = this.game.add;

		this.wordSound = this.game.add.audio('sfxletters');
		this.wordSound.volume = 0.2;
		this.wordSound.allowMultiple = true;
		console.log(this.wordSound);
		

		// this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.5, 0.5);

		this.addBars();

		var width = 300;
		var height = 65;
		var bmd = game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width, height);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.globalAlpha = 0.5;
		bmd.ctx.fill();

		bmd.ctx.fill();
        bmd.ctx.beginPath();
        bmd.line(0, 0, 300, 0, '#49ffc5', 4);
        bmd.ctx.fill();

		this.background = game.add.sprite(this.game.camera.width / 2 - bmd.width / 2, this.game.camera.height - 90, bmd);
		this.background.fixedToCamera = true;

		this.background.x = Math.floor(this.background.x);
		this.background.y = Math.floor(this.background.y);

		//FIX?
		// this.game.renderer.renderSession.roundPixels = true;

		this.text = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
		let content = "";
        this.text.setText(content, true, -1, 5, 'left', true)
        // this.text.fixedWidth = 200;
		this.fontImage = this.game.add.image(this.background.x + 10, this.game.camera.height - 80, this.text);
		this.fontImage.fixedToCamera = true;

	

		this.level.inputClass.button_E.onDown.add(() => {
			this.counter++;
			console.log(this.counter);
			if(this.counter == 1) return;
			

			// console.log('faster');
			this.lineDelay = 0;
			this.endTime = 500;

			if (this.lineIndex === this.message.length) {
				this.game.time.events.add(300, this.removeMessage, this);
				return;
			}

			this.wordRepeat = this.game.time.events.repeat(1, this.line.length, this.nextWord, this);

			// if (this.wordIndex === this.line.length) {
				this.nextLine();
			// }
		}, this);


		if (!this.movable) {
			this.player.movable = false;
			this.player.body.immovable = true;
		}

		this.level.GUICLASS.healthBar.fadeOut();
		this.nextLine();
	}

	nextLine() {
		if (this.lineIndex === this.message.length) {
			this.game.time.events.add(this.endTime, this.removeMessage, this);
			return;
		}

		// Split Line from Message Array
		this.line = this.message[this.lineIndex].split(' ');
		this.wordIndex = 0;


		this.text.text = '';
		this.lineIndex++;

		// if(this.playFast){
		// 	this.game.time.events.remove(this.wordRepeat);
		// 	for (let i = 0; i < this.line.length; i++) {
		// 		this.nextWord.call(this);
		// 	}
		// 	this.playFast = false;
		// } else {
		// 	// repeat(delay, repeatCount, callback, callbackContext, arguments)
		// 	this.wordRepeat = this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
		// }

		// repeat(delay, repeatCount, callback, callbackContext, arguments)
		this.wordRepeat = this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

		this.playFast = false;

	}

	nextWord() {

		if(this.line[this.wordIndex] !== undefined){
			this.text.text = this.text.text.concat(this.line[this.wordIndex] + ' ');
			this.wordIndex++;
	
			this.wordSound.play("", 0, 0.2, false, false);
	
			// If Character Count === Line Count --> Next Line
			if (this.wordIndex === this.line.length) {
				this.text.text = this.text.text.concat('\n');
				// this.game.time.events.add(this.lineDelay, this.nextLine, this);
			}
		}

	}

	removeMessage() {

		//FIX END
		// this.game.renderer.renderSession.roundPixels = false;

		this.counter = 0;

		this.fontImage.destroy();
		this.text.destroy();
		this.background.destroy();
		this.removeBars();
		this.level.GUICLASS.healthBar.fadeIn();
		if (!this.movable) {
			this.player.movable = true;
			
			this.player.body.immovable = false;

			this.game.time.events.add(this.endTime, () => {
				this.player.talking = false;
			});
		}
	}

	update(){

		// if(this.level.inputClass.button_SPACEBAR.isDown ){
		// 	console.log(this);
				
		// 	if(this.playFast) return;
		// 	this.playFast = true;

		// 	this.line = this.message[this.lineIndex].split(' ');
		// 	this.wordIndex = 0;
	
	
		// 	this.text.text = '';
		// 	this.lineIndex++;
		// 	this.nextLine();		
		// }
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

		if(this.upperBar !== false){
			this.upperBarTween = this.game.add
			.tween(this.upperBar.cameraOffset)
			.to({ y: this.game.camera.height }, 1000, Phaser.Easing.Linear.None, true);
		}

		if(this.downBar !== false){
			this.downBarTween = this.game.add
			.tween(this.downBar.cameraOffset)
			.to({ y: this.game.camera.height - this.game.camera.height - 20 }, 1000, Phaser.Easing.Linear.None, true);
		}

		this.upperBarTween.onComplete.add(() => {
			if(this.upperBar !== undefined){
				// this.upperBar.destroy();
				this.downBar.destroy();
				this.upperBar = false;
			}


			// this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
			
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
