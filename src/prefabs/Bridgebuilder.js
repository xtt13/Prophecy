import Phaser from 'phaser';

export default class {
	constructor(game, region, player, map, groundLayer, collisionLayer) {
		this.game = game;
		this.player = player;
		this.map = map;
		this.groundLayer = groundLayer;
		this.collisionLayer = collisionLayer;
		this.region = region;

		console.log(region);

		this.buildBridge();
	}

	buildBridge() {
		const bridgeDirection = this.region.properties.direction;
		const bridgeLength = this.region.properties.length;

		// let bridgeX = this.groundLayer.getTileX(this.player.x);
		// let bridgeY = this.groundLayer.getTileY(this.player.y);

		// let collX = this.collisionLayer.getTileX(this.player.x);
		// let collY = this.collisionLayer.getTileY(this.player.y);

		let bridgeX = this.groundLayer.getTileX(this.region.left) + 1;
		let bridgeY = this.groundLayer.getTileY(this.region.top);

		let collX = this.collisionLayer.getTileX(this.region.left) + 1;
		let collY = this.collisionLayer.getTileY(this.region.top);

		let bridgeCounter = 0;
		let bridgeInterval = setInterval(() => {
			if (bridgeDirection == 'up') {
				bridgeY--;
				collY--;

				this.map.putTile(2, bridgeX, bridgeY, this.groundLayer);
				this.map.putTile(2, bridgeX - 1, bridgeY, this.groundLayer);
				this.map.removeTile(collX, collY, this.collisionLayer);
				this.map.removeTile(collX - 1, collY, this.collisionLayer);
			} else if (bridgeDirection == 'down') {
				bridgeY++;
				collY++;

				this.map.putTile(2, bridgeX, bridgeY, this.groundLayer);
				this.map.putTile(2, bridgeX - 1, bridgeY, this.groundLayer);
				this.map.removeTile(collX, collY, this.collisionLayer);
				this.map.removeTile(collX - 1, collY, this.collisionLayer);
			} else if (bridgeDirection == 'left') {
				bridgeX--;
				collX--;

				this.map.putTile(2, bridgeX, bridgeY, this.groundLayer);
				this.map.putTile(2, bridgeX, bridgeY - 1, this.groundLayer);
				this.map.removeTile(collX, collY, this.collisionLayer);
				this.map.removeTile(collX, collY - 1, this.collisionLayer);
			} else if (bridgeDirection == 'right') {
				bridgeX++;
				collX++;

				this.map.putTile(2, bridgeX, bridgeY, this.groundLayer);
				this.map.putTile(2, bridgeX, bridgeY - 1, this.groundLayer);
				this.map.removeTile(collX, collY, this.collisionLayer);
				this.map.removeTile(collX, collY - 1, this.collisionLayer);
			}

			this.game.camera.shake(0.0015, 500);

			bridgeCounter++;

			if (bridgeCounter === bridgeLength) clearInterval(bridgeInterval);
		}, 500);
	}
}
