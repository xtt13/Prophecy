import Phaser from 'phaser';

export default class {
	constructor(game, region, player, map, groundLayer, collisionLayer) {
		this.game = game;
		this.player = player;
		this.map = map;
		this.groundLayer = groundLayer;
		this.collisionLayer = collisionLayer;
		this.region = region;

		this.bridgeSound = this.game.add.audio('sfxBridge', 1);
		this.bridgeSound.allowMultiple = true;
	}

	buildBridge() {
		const bridgeDirection = this.region.properties.direction;
		const bridgeLength = this.region.properties.length;
		const bridgeDuration = this.region.properties.duration;

		if (bridgeDuration < 100) {
			this.bridgeSound.volume = 0;
		}

		this.bridgeX = this.groundLayer.getTileX(this.region.left) + 1;
		this.bridgeY = this.groundLayer.getTileY(this.region.top);

		this.collX = this.collisionLayer.getTileX(this.region.left) + 1;
		this.collY = this.collisionLayer.getTileY(this.region.top);

		let bridgeCounter = 0;
		let bridgeInterval = setInterval(() => {
			if (bridgeDirection == 'up') {
				this.bridgeY--;
				this.collY--;

				this.bridgeSound.play();

				// if("vibrate" in window.navigator) {
				// 	window.navigator.vibrate(100);
				// }

				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX - 1, this.collY, this.collisionLayer);

				if (bridgeCounter + 1 == bridgeLength) {
					this.map.putTile(37, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(38, this.bridgeX - 1, this.bridgeY, this.groundLayer);
					this.map.putTile(37, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(38, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				} else {
					this.map.putTile(59, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(58, this.bridgeX - 1, this.bridgeY, this.groundLayer);
					this.map.putTile(37, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(38, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				}
			} else if (bridgeDirection == 'down') {
				this.bridgeY++;
				this.collY++;

				this.bridgeSound.play();

				// this.map.putTile(48, this.bridgeX, this.bridgeY, this.groundLayer);
				// this.map.putTile(47, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				// this.map.putTile(37, this.bridgeX, this.bridgeY-1, this.groundLayer);
				// this.map.putTile(38, this.bridgeX - 1, this.bridgeY-1, this.groundLayer);

				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX - 1, this.collY, this.collisionLayer);

				if (bridgeCounter + 1 == bridgeLength) {
					this.map.putTile(37, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(38, this.bridgeX - 1, this.bridgeY, this.groundLayer);
					this.map.putTile(37, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(38, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				} else {
					this.map.putTile(37, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(38, this.bridgeX - 1, this.bridgeY, this.groundLayer);
					this.map.putTile(48, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(47, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				}
			} else if (bridgeDirection == 'left') {
				console.log('HEY');

				this.bridgeX--;
				this.collX--;

				this.bridgeSound.play();

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.groundLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.groundLayer);
				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.collisionLayer);

				this.map.putTile(22, this.bridgeX, this.bridgeY + 1, this.groundLayer);
			} else if (bridgeDirection == 'right') {
				this.map.putTile(2, this.bridgeX, this.bridgeY, this.groundLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.groundLayer);
				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.collisionLayer);

				this.map.putTile(22, this.bridgeX, this.bridgeY + 1, this.groundLayer);

				this.bridgeX++;
				this.collX++;

				this.bridgeSound.play();
			}

			this.game.camera.shake(0.0015, bridgeDuration);

			bridgeCounter++;

			if (bridgeCounter === bridgeLength) clearInterval(bridgeInterval);
		}, bridgeDuration);
	}

	removeBridge() {
		console.log('remove bridge');
		const bridgeDirection = this.region.properties.direction;
		const bridgeLength = this.region.properties.length;
		const bridgeDuration = this.region.properties.duration;

		const putBackgroundTile = this.region.properties.putBackgroundTile;

		this.bridgeX = this.groundLayer.getTileX(this.region.left) + 1;
		this.bridgeY = this.groundLayer.getTileY(this.region.top);

		this.collX = this.collisionLayer.getTileX(this.region.left) + 1;
		this.collY = this.collisionLayer.getTileY(this.region.top);

		let bridgeCounter = 0;
		let bridgeInterval = setInterval(() => {
			if (bridgeDirection == 'up') {
				this.bridgeY--;
				this.collY--;

				this.bridgeSound.play();

				this.map.putTile(3, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(3, this.bridgeX - 1, this.bridgeY, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY, this.groundLayer);
				this.map.removeTile(this.collX - 1, this.collY, this.groundLayer);

				if (putBackgroundTile !== undefined) {
					this.map.putTile(putBackgroundTile, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(putBackgroundTile, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				}
			} else if (bridgeDirection == 'down') {
				console.log(bridgeCounter, bridgeLength);
				this.bridgeY++;
				this.collY++;

				this.bridgeSound.play();

				this.map.putTile(3, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(3, this.bridgeX - 1, this.bridgeY, this.collisionLayer);

				if (bridgeCounter == 0) {
					this.map.putTile(36, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(36, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				} else {
					this.map.putTile(3, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(3, this.bridgeX - 1, this.bridgeY, this.groundLayer);

					this.map.putTile(49, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(49, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				}

				// if (putBackgroundTile !== undefined) {
				// 	this.map.putTile(putBackgroundTile, this.bridgeX, this.bridgeY, this.groundLayer);
				// 	this.map.putTile(putBackgroundTile, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				// }
			} else if (bridgeDirection == 'left') {
				this.bridgeX--;
				this.collX--;

				this.bridgeSound.play();

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY, this.groundLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.groundLayer);
			} else if (bridgeDirection == 'right') {
				this.bridgeX++;
				this.collX++;

				this.bridgeSound.play();

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY, this.groundLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.groundLayer);
			}

			this.game.camera.shake(0.0015, bridgeDuration);

			bridgeCounter++;

			if (bridgeCounter === bridgeLength) clearInterval(bridgeInterval);
		}, bridgeDuration);
	}
}
