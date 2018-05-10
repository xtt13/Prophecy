import Phaser from 'phaser';
import config from './../../config';

// From Dusk Till Dawn
export default class {
	constructor(game, level, width, height) {
        this.game = game;
        this.level = level;
        this.width = width;
        this.height = height;
        
        this.scaleRatio = {
			width: config.phaserConfig.width,
			height: config.phaserConfig.height
		};

        this.game.scale.setGameSize(this.width, this.height);
		// this.startScaling();
	}

	startScaling(){

		this.scaleTween = this.game.add.tween(this.scaleRatio).to({
            width: this.width, height: this.height
		}, 3000, 'Linear', true, 0, 0, false);

		
		this.scaleLoop = this.game.time.events.loop(10, () => {
            this.game.scale.setGameSize(this.scaleRatio.width, this.scaleRatio.height);
            this.level.groundLayer.resizeWorld();
        }, this);
        
        this.scaleTween.onComplete.add(() => {
            this.level.initMap();
            this.game.time.events.remove(this.scaleLoop);
        }, this);

    }
}
