import Phaser from 'phaser';

export default class {
	constructor(game, level, ingameMenu) {
		this.game = game;
		this.level = level;
		this.ingameMenu = ingameMenu;
		this.show = false;

		this.mapValues = {
			map1: {
				x: 504,
				y: 592,
				width: 159,
				height: 242
			},
			map2: {
				x: 342,
				y: 464,
				width: 150,
				height: 144
			},
			map3: {
				x: 370,
				y: 241,
				width: 106,
				height: 223
			},
			map4: {
				x: 27,
				y: 85,
				width: 64,
				height: 64
			},
			map10: {
				x: 308,
				y: 747,
				width: 211,
				height: 139
			},
			map11: {
				x: 339,
				y: 608,
				width: 149,
				height: 139
			}
		};
	}

	toggleMap() {
		if (!this.show) {
			this.show = true;
			this.createMap();
		} else {
			this.removeMap();
			this.show = false;
		}
	}

	createMap() {
		this.calculateValues();
		this.game.renderer.renderSession.roundPixels = true;


		

		this.mask = this.game.add.graphics(300, 180);
		this.mask.beginFill(0xffffff);
		this.mask.drawRect(this.game.camera.width / 2 - 500, this.game.camera.height / 2 - 259, 400, 180);
		this.mask.fixedToCamera = true;

		if (this.playerDot) {
			this.playerDot.destroy();
		}

		// [this.level.currentMap]
		for (let prop in this.mapValues) {
			if (prop == this.level.currentMap) {
				this.piece = this.mapValues[prop];
			}
		}


		this.playerPX = this.piece.x + this.valueX * this.piece.width;
		this.playerPY = this.piece.y + this.valueY * this.piece.height;

		// -180 -360
		console.log(this.game.camera.width / 2 - 470, this.game.camera.height / 2 - 500);

		// 432 521.6
		console.log(this.playerPX, this.playerPY);
		this.map = this.game.add.sprite(this.game.camera.width / 2 - this.playerPX, this.game.camera.height / 2 - this.playerPY, 'newGameMap');
		this.map.fixedToCamera = true;
		this.map.mask = this.mask;

		this.playerDot = this.game.add.sprite(this.map.x + this.playerPX, this.map.y + this.playerPY, 'playerDot');
		this.playerDot.anchor.set(0.5);
		this.playerDot.mask = this.mask;


		// this.map.hitArea = PIXI.Rectangle;

		// this.map.hitArea = new Phaser.Rectangle(this.ingameMenu.menuBackground.x, this.ingameMenu.menuBackground.y, this.ingameMenu.menuBackground.width, this.ingameMenu.menuBackground.height);

		// this.map.inputEnabled = true;	
		// this.map.input.enableDrag(false);

	}

	calculateValues() {
		//Player Values from 0 to 1
		this.valueX = Math.round(this.level.player.x / this.game.world.width / 100 * 100 * 10) / 10;
		this.valueY = Math.round(this.level.player.y / this.game.world.height / 100 * 100 * 10) / 10;

		console.log('ValuePlayerX: ' + this.valueX);
		console.log('ValuePlayerY: ' + this.valueY);
	}

	update() {
		this.playerDot.x = this.map.x + this.playerPX;
		this.playerDot.y = this.map.y + this.playerPY - 5;
	}

	removeMap() {
		this.game.renderer.renderSession.roundPixels = false;
		if (this.map) {
			this.gameMapbackground.destroy();
			this.gameMapbackground = false;
			this.map.destroy();
			this.mask.destroy();
			this.playerDot.destroy();
		}
	}
}
