import Phaser from 'phaser';
import PhaserEasystar from 'phaser-easystar-ts';

export default class {
	constructor(game, map, player, target, layer) {
		this.game = game;
		this.map = map;
		this.player = player;
		this.layer = layer;
		this.target = target;

		this.pathToFollow = [];
		this.walkables = [2];

		this.blocked = false;
		this.followingPath = false;
		this.trail = game.add.group();
		this.path;

		this.marker;

		this.movingTween = this.game.add.tween(this.player);
		this.movingTween.onComplete.add(() => {
			this.followingPath = false;
			this.player.movable = true;
			// this.findPathTo(this.layer.getTileX(this.target.x), this.layer.getTileY(this.target.y));
			// console.log('END');
			this.followPath();
		});

		this.pathfinder = new PhaserEasystar(this.game);
		this.pathfinder.setGrid(this.map.layers[0].data, this.walkables);
		this.findPathTo(this.layer.getTileX(this.target.x), this.layer.getTileY(this.target.y));
	}

	findPathTo(tilex, tiley) {
		this.pathfinder.setCallbackFunction(path => {
			this.trail.destroy(true, true);
			if (path === null) {
				return;
			}

			var ilen = path.length;
			for (let i = 0; i < ilen; i++) {
				this.marker = this.game.add.graphics(path[i].x * 36, path[i].y * 36);
				this.marker.data.cellX = path[i].x;
				this.marker.data.cellY = path[i].y;
				this.trail.add(this.marker);
				this.marker.lineStyle(2, 0xab4642, 0.5);
				this.marker.drawRect(8, 8, 16, 16);
			}
			this.pathToFollow = path;
		});

		this.pathfinder.preparePathCalculation(
			[this.layer.getTileX(this.player.x), this.layer.getTileY(this.player.y)],
			[tilex, tiley]
		);
		this.pathfinder.calculatePath();
	}

	followPath() {
		// if(this.pathToFollow.length == 0){
		//     console.log('HOPE');
		//     this.findPathTo(this.layer.getTileX(this.target.x), this.layer.getTileY(this.target.y));
		// }
		if (!this.pathToFollow.length || this.followingPath) {
			return;
		}

		this.player.movable = false;
		var next = this.pathToFollow.shift();
		if (!next) {
			return;
		}

		// remove the lit path as we walk it
		this.trail.forEach(marker => {
			if (marker.data.cellX === next.x && marker.data.cellY === next.y) {
				marker.destroy();
			}
		});

		var x = next.x * 36 + 2;
		var y = next.y * 36 + 2;
		// console.log("moving to", x, y, next);
		this.followingPath = true;
		this.movingTween.target = this.player;
		this.movingTween.timeline = [];
		this.movingTween.to({ x, y }, 200);
		this.movingTween.start();
	}
}
