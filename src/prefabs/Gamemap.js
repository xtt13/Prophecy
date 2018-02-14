import Phaser from 'phaser';

export default class {
	constructor(game, GUI, level) {
		this.game = game;
		this.GUI = GUI;
		this.level = level;
		this.show = false;

		this.mapValues = {
			"map1": {
				x: 144,
				y: 128,
				width: 32,
				height: 32
			},
			"map2": {
				x: 134,
				y: 96,
				width: 32,
				height: 32
			},
			"map3": {
				x: 133,
				y: 65,
				width: 32,
				height: 32
			},
			"map4": {
				x: 104,
				y: 107,
				width: 32,
				height: 32
			},
			"map6": {
				x: 105,
				y: 76,
				width: 30,
				height: 30
			}
		}
		
	}

	toggleMap(){
		this.reloadInterval;
		if (!this.show) {
			this.show = true;

			this.createMap();

			this.game.time.events.add(
				Phaser.Timer.SECOND * 0.1,
				() => {
					this.game.paused = true;
			});
			
			
		} else {
			// clearInterval(this.reloadInterval);
			this.game.paused = false;
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

		this.map = this.game.add.sprite(140, 40, 'gameMap');
		this.map.fixedToCamera = true;
		this.mapGroup.add(this.map);


		this.bmdPlayer = game.add.bitmapData(3, 3);

		this.bmdPlayer.ctx.beginPath();
		this.bmdPlayer.ctx.rect(0, 0, 3, 3);
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
				// console.log(this.piece);
			}
		}

		this.playerPX = this.piece.x + (this.valueX * this.piece.width);
		this.playerPY = this.piece.y + (this.valueY * this.piece.height);

		this.playerDot = game.add.sprite(
			140 + this.playerPX,
			80 + this.playerPY - 35,
			this.bmdPlayer
		);
		this.playerDot.anchor.set(0.5);

		this.playerDot.fixedToCamera = true;
		this.mapGroup.add(this.playerDot);



	}

	calculateValues(){
		//Player Values from 0 to 1
		this.valueX =  Math.round(((this.level.player.x / this.game.world.width/100)*100) * 10) / 10;
		this.valueY =  Math.round(((this.level.player.y / this.game.world.height/100)*100) * 10) / 10;

		// console.log("ValuePlayerX: " + this.valueX);
		// console.log("ValuePlayerY: " + this.valueY);


	}

	removeMap(){
		if(this.gameMapbackground){
			this.gameMapbackground.destroy();
			this.map.destroy();
			this.playerDot.destroy();
		}

	}

	
}
