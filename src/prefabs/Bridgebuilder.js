import Phaser from 'phaser';

export default class {
	constructor(game, region, player, map, groundLayer, collisionLayer) {
		this.game = game;
		this.player = player;
		this.map = map;
		this.groundLayer = groundLayer;
		this.collisionLayer = collisionLayer;
		this.region = region;
	}

	buildBridge() {
		const bridgeDirection = this.region.properties.direction;
		const bridgeLength = this.region.properties.length;
		const bridgeDuration = this.region.properties.duration;

		this.bridgeX = this.groundLayer.getTileX(this.region.left) + 1;
		this.bridgeY = this.groundLayer.getTileY(this.region.top);

		this.collX = this.collisionLayer.getTileX(this.region.left) + 1;
		this.collY = this.collisionLayer.getTileY(this.region.top);

		let bridgeCounter = 0;
		let bridgeInterval = setInterval(() => {
			if (bridgeDirection == 'up') {
				this.bridgeY--;
				this.collY--;

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.groundLayer);
				this.map.putTile(2, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX - 1, this.collY, this.collisionLayer);
			} else if (bridgeDirection == 'down') {
				this.bridgeY++;
				this.collY++;

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.groundLayer);
				this.map.putTile(2, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX - 1, this.collY, this.collisionLayer);

				if ((bridgeCounter +1) == bridgeLength){
					this.map.putTile(2, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(2, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);ssssss
				} else {
					this.map.putTile(22, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(22, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				}

			} else if (bridgeDirection == 'left') {
				this.bridgeX--;
				this.collX--;

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.groundLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.groundLayer);
				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.collisionLayer);
			} else if (bridgeDirection == 'right') {
				this.bridgeX++;
				this.collX++;

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.groundLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.groundLayer);
				this.map.removeTile(this.collX, this.collY, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.collisionLayer);
			}

			this.game.camera.shake(0.0015, bridgeDuration);

			bridgeCounter++;

			if (bridgeCounter === bridgeLength) clearInterval(bridgeInterval);
		}, bridgeDuration);
	}

	removeBridge(){
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

				this.map.putTile(3, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(3, this.bridgeX - 1, this.bridgeY, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY, this.groundLayer);
				this.map.removeTile(this.collX - 1, this.collY, this.groundLayer);

				if(putBackgroundTile !== undefined){
					this.map.putTile(putBackgroundTile, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(putBackgroundTile, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				}

			} else if (bridgeDirection == 'down') {
				console.log(bridgeCounter, bridgeLength);
				this.bridgeY++;
				this.collY++;

				this.map.putTile(3, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(3, this.bridgeX - 1, this.bridgeY, this.collisionLayer);

				if(bridgeCounter == 0){
					this.map.putTile(22, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(22, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				} else {
					this.map.removeTile(this.collX, this.collY, this.groundLayer);
					this.map.removeTile(this.collX - 1, this.collY, this.groundLayer);
				}

				if(putBackgroundTile !== undefined){
					this.map.putTile(putBackgroundTile, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(putBackgroundTile, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				}
				
			} else if (bridgeDirection == 'left') {
				this.bridgeX--;
				this.collX--;

				this.map.putTile(2, this.bridgeX, this.bridgeY, this.collisionLayer);
				this.map.putTile(2, this.bridgeX, this.bridgeY - 1, this.collisionLayer);
				this.map.removeTile(this.collX, this.collY, this.groundLayer);
				this.map.removeTile(this.collX, this.collY - 1, this.groundLayer);
			} else if (bridgeDirection == 'right') {
				this.bridgeX++;
				this.collX++;

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
