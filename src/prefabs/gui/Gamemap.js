
export default class {
	constructor(game, level, ingameMenu) {
		this.game = game;
		this.level = level;
		this.ingameMenu = ingameMenu;
		this.show = false;

		this.mapValues = {
			map1: {
				x: 112,
				y: 128,
				width: 64,
				height: 64
			},
			map2: {
				x: 92,
				y: 66,
				width: 64,
				height: 64
			},
			map3: {
				x: 91,
				y: 2,
				width: 64,
				height: 64
			},
			map4: {
				x: 27,
				y: 85,
				width: 64,
				height: 64
			},
			map6: {
				x: 27,
				y: 21,
				width: 64,
				height: 64
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

		this.map = this.game.add.sprite(this.game.camera.width / 2 - 100, this.game.camera.height / 2 - 90, 'newGameMap');
		this.map.fixedToCamera = true;
		this.map.inputEnabled = true;
		this.map.input.enableDrag(false);

		this.mask = this.game.add.graphics(300, 180);
		this.mask.beginFill(0xffffff);
		this.mask.drawRect(this.game.camera.width / 2 - 500, this.game.camera.height / 2 - 259, 400, 180);
		this.mask.fixedToCamera = true;

		this.map.mask = this.mask;

		this.bmdPlayer = this.game.add.bitmapData(6, 6);
		this.bmdPlayer.ctx.beginPath();
		this.bmdPlayer.ctx.rect(0, 0, 6, 6);
		this.bmdPlayer.ctx.fillStyle = '#FF00FF';
		this.bmdPlayer.ctx.fill();

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

		this.playerDot = this.game.add.sprite(this.map.x + this.playerPX, this.map.y + this.playerPY, this.bmdPlayer);

		this.playerDot.anchor.set(0.5);

		this.playerDot.mask = this.mask;
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
		this.playerDot.y = this.map.y + this.playerPY;
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
