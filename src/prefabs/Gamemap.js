import Phaser from 'phaser';

export default class {
	constructor(game, GUI, level) {
		this.game = game;
		this.GUI = GUI;
		this.level = level;
		this.show = false;

		this.mapValues = {
			"map1": {
				x: 112,
				y: 128,
				width: 64,
				height: 64
			},
			"map2": {
				x: 92,
				y: 66,
				width: 64,
				height: 64
			},
			"map3": {
				x: 91,
				y: 2,
				width: 64,
				height: 64
			},
			"map4": {
				x: 27,
				y: 85,
				width: 64,
				height: 64
			},
			"map6": {
				x: 27,
				y: 21,
				width: 64,
				height: 64
			}
		}
		
	}

	toggleMap(){
		if (!this.show) {
			this.show = true;
			this.createMap();	
		} else {
			this.removeMap();
			this.show = false;	
		}
	}

	createMap(){
		this.calculateValues();

		this.mapGroup = this.game.add.group();

		let width = this.game.camera.width + 20;
		let height = this.game.camera.height + 20;

		this.bmd = game.add.bitmapData(width, height);

		this.bmd.ctx.beginPath();
		this.bmd.ctx.rect(0, 0, width, height);
		this.bmd.ctx.fillStyle = '#000000';
		// this.bmd.ctx.globalAlpha = 0.9;
		this.bmd.ctx.fill();

		this.gameMapbackground = game.add.sprite(
			this.game.camera.width / 2,
			this.game.camera.height / 2,
			this.bmd
		);
		this.gameMapbackground.anchor.set(0.5);
		this.gameMapbackground.fixedToCamera = true;
		// this.mapGroup.add(this.gameMapbackground);

		this.map = this.game.add.sprite(180, 40, 'newGameMap');
		this.map.fixedToCamera = true;
		this.map.inputEnabled = true;
		this.map.input.enableDrag(false);

		this.mapGroup.add(this.map);
		
		this.bmdPlayer = game.add.bitmapData(6, 6);
		this.bmdPlayer.ctx.beginPath();
		this.bmdPlayer.ctx.rect(0, 0, 6, 6);
		this.bmdPlayer.ctx.fillStyle = '#FF00FF';
		this.bmdPlayer.ctx.fill();

		// console.log(this.mapValues.map1.x, this.valueX, this.mapValues.map1.width);
		// console.log(this.valueX * this.mapValues.map1.width);
		// console.log(this.mapValues.map1.x, this.valueX * this.mapValues.map1.width);

		// PlyerPX = 304

		if(this.playerDot){
			this.playerDot.destroy();
		}
		// [this.level.currentMap]

		for (let prop in this.mapValues) {
			if(prop == this.level.currentMap){
				this.piece = this.mapValues[prop];
				console.log(this.mapValues[prop]);
			}
		}

		this.playerPX = this.piece.x + (this.valueX * this.piece.width);
		this.playerPY = this.piece.y + (this.valueY * this.piece.height);

		this.playerDot = game.add.sprite(
			this.map.x + this.playerPX,
			this.map.y + this.playerPY,
			this.bmdPlayer
		);

		this.playerDot.anchor.set(0.5);

		// this.playerDot.fixedToCamera = true;

		// this.mapGroup.add(this.playerDot);

		// this.mapGroup.fixedToCamera = true;

		// this.mapGroup.scale.set(1.1);
		// console.log(this.mapGroup.y);
		// this.mapGroup.x = -200;
		// this.mapGroup.y = -120;

	}

	calculateValues(){
		//Player Values from 0 to 1
		this.valueX =  Math.round(((this.level.player.x / this.game.world.width/100)*100) * 10) / 10;
		this.valueY =  Math.round(((this.level.player.y / this.game.world.height/100)*100) * 10) / 10;

		// console.log("ValuePlayerX: " + this.valueX);
		// console.log("ValuePlayerY: " + this.valueY);


	}

	update(){
		this.playerDot.x = this.map.x + this.playerPX;
		this.playerDot.y = this.map.y + this.playerPY;
		console.log(this.playerDot.x);
	}

	removeMap(){
		if(this.gameMapbackground){
			this.gameMapbackground.destroy();
			this.gameMapbackground = false;
			this.map.destroy();
			this.playerDot.destroy();
		}

	}

	
}
