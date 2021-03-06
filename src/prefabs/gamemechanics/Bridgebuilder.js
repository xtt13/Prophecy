
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
		console.log(this.collX);

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

				// let currentTile = this.map.getTile(this.collX, this.collY, this.groundLayer);
				// console.log(currentTile);
				// let currentTileIndex = currentTile.index;

				// if(currentTileIndex !== 36){
					if (bridgeCounter + 1 == bridgeLength) {
						this.map.putTile(2656, this.bridgeX, this.bridgeY, this.groundLayer);
						this.map.putTile(2652, this.bridgeX - 1, this.bridgeY, this.groundLayer);
						this.map.putTile(2656, this.bridgeX, this.bridgeY + 1, this.groundLayer);
						this.map.putTile(2652, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
					} else {
						this.map.putTile(2557, this.bridgeX, this.bridgeY, this.groundLayer);
						this.map.putTile(2555, this.bridgeX - 1, this.bridgeY, this.groundLayer);
						this.map.putTile(2656, this.bridgeX, this.bridgeY + 1, this.groundLayer);
						this.map.putTile(2652, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
					}
					
					// console.log(this.bridgeX, this.bridgeY, this.map);
				// }

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
					this.map.putTile(2656, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(2652, this.bridgeX - 1, this.bridgeY, this.groundLayer);
					this.map.putTile(2656, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(2652, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
				} else {
					this.map.putTile(2656, this.bridgeX, this.bridgeY, this.groundLayer);
					this.map.putTile(2652, this.bridgeX - 1, this.bridgeY, this.groundLayer);
					this.map.putTile(2676, this.bridgeX, this.bridgeY + 1, this.groundLayer);
					this.map.putTile(2672, this.bridgeX - 1, this.bridgeY + 1, this.groundLayer);
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
		const bridgeWidth = this.region.properties.width;
		console.log(bridgeDuration);

		// const putBackgroundTile = this.region.properties.putBackgroundTile;

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

				console.log('REMOVE');
				// this.map.putTile(3, this.bridgeX, this.bridgeY, this.collisionLayer);
				// this.map.putTile(3, this.bridgeX - 1, this.bridgeY, this.collisionLayer);
				// this.map.removeTile(this.collX, this.collY, this.groundLayer);
				// this.map.removeTile(this.collX - 1, this.collY, this.groundLayer);


				for (var i = 0; i < bridgeWidth; i++) {
					console.log(i);
					this.map.putTile(3, (this.bridgeX - bridgeWidth) + i, this.bridgeY, this.collisionLayer);
					this.map.putTile(3, this.bridgeX + i, this.bridgeY, this.collisionLayer);
					this.map.removeTile((this.collX - bridgeWidth) + i, this.collY, this.groundLayer);	
					this.map.removeTile(this.collX + i, this.collY, this.groundLayer);
							
				}

				// if (putBackgroundTile !== undefined) {
				// 	this.map.putTile(putBackgroundTile, this.bridgeX, this.bridgeY, this.groundLayer);
				// 	this.map.putTile(putBackgroundTile, this.bridgeX - 1, this.bridgeY, this.groundLayer);
				// }
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
