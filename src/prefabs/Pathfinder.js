import Phaser from 'phaser';

export default class {
	constructor(game, map, player, layer) {
		this.game = game;
		this.map = map;
		this.player = player;
		this.layer = layer;

		this.pathToFollow = [];
		this.walkables = [2];

		this.blocked = false;
		this.followingPath = false;
		this.trail = game.add.group();
		this.path;

    	this.pathfinder = new PhaserEasystar(this.game);
    	this.pathfinder.setGrid(this.map.layers[0].data, this.walkables);
	}

	setup(){

	}

	findPathTo(tilex, tiley) {
    	this.pathfinder.setCallbackFunction(function(path) {
        this.trail.destroy(true, true);
        if (path === null) {
            return;
        }

        var ilen = path.length;
        for (let i = 0; i < ilen; i++) {
            let marker = this.game.add.graphics(path[i].x * 32, path[i].y * 32);
            marker.data.cellX = path[i].x;
            marker.data.cellY = path[i].y;
            this.trail.add(marker);
            marker.lineStyle(2, 0xAB4642, 0.8);
            marker.drawRect(8, 8, 16, 16);
        }
        this.pathToFollow = path;
    });

    this.pathfinder.preparePathCalculation([this.layer.getTileX(this.player.x), this.layer.getTileY(this.player.y)], [tilex,tiley]);
    this.pathfinder.calculatePath();
}

}
