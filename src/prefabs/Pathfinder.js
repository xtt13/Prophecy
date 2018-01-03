import Phaser from 'phaser';
import PhaserEasystar from 'phaser-easystar-ts';

export default class {
	constructor(game, map, player, target, layer, cornerCutting, movingSpeed, finderCallObject) {
		this.game = game;
		this.map = map;
		this.player = player;
		this.layer = layer;
		this.cornerCutting = cornerCutting;
		this.target = target;
		this.movingSpeed = movingSpeed;

		this.finderCallObject = finderCallObject;

		this.showPaths = false;

		this.pathToFollow = [];
		this.walkables = [2, 9];

		this.blocked = false;
		this.followingPath = false;
		this.trail = game.add.group();
		this.path;

		this.marker;

		this.movingTween = this.game.add.tween(this.player);
		this.movingTween.onComplete.add(() => {
			this.followingPath = false;
			this.player.movable = true;

			this.game.time.events.add(
				Phaser.Timer.SECOND * this.game.rnd.integerInRange(3, 8),
				function() {
					this.followPath();
				},
				this
			);
		});

		this.pathfinder = new PhaserEasystar(this.game);
		
		if(this.cornerCutting){
			this.pathfinder.easystar.enableCornerCutting();
			this.pathfinder.easystar.enableDiagonals();
		}

		this.pathfinder.easystar.setIterationsPerCalculation(1000);
		this.pathfinder.setGrid(this.map.layers[0].data, this.walkables);
		this.findPathTo(this.layer.getTileX(this.target.x), this.layer.getTileY(this.target.y));
	}

	findPathTo(tilex, tiley) {
		this.pathfinder.setCallbackFunction(path => {
			this.trail.destroy(true, true);
			if (path === null) {
				return;
			}

			if (this.showPaths) {
				var ilen = path.length;
				for (let i = 0; i < ilen; i++) {
					this.marker = this.game.add.graphics(path[i].x * 36, path[i].y * 36);
					this.marker.data.cellX = path[i].x;
					this.marker.data.cellY = path[i].y;
					this.trail.add(this.marker);
					this.marker.lineStyle(2, 0xab4642, 0.5);
					this.marker.drawRect(8, 8, 16, 16);
				}
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
		if (!this.pathToFollow.length || this.followingPath) {
			return;
		}

		if (this.pathToFollow.length == 1 && this.finderCallObject !== undefined) {
			this.finderCallObject.finderCall = true;
		}

		this.player.movable = false;

		var next = this.pathToFollow.shift();
		if (!next) {
			return;
		}

		if (this.showPaths) {
			this.trail.forEach(marker => {
				if (marker.data.cellX === next.x && marker.data.cellY === next.y) {
					marker.destroy();
				}
			});
		}

		var x = next.x * 36 + 18;
		var y = next.y * 36 + 18;
		
		this.followingPath = true;
		this.movingTween.target = this.player;
		this.movingTween.timeline = [];
		this.movingTween.to({ x, y }, this.movingSpeed);
		this.movingTween.start();
	}
}
