import Phaser from 'phaser';
import "phaser-tilemap-plus";

export default class {
  constructor(game, currentLevel){
  	this.game = game;
  	this.currentLevel = currentLevel;
  	this.loadLevel();
  }

  loadLevel(){
  	// JSON Map Data
	this.map = this.game.add.tilemap(this.currentLevel);

	//  Connect with Tileset
	this.map.addTilesetImage('sum', 'gameTileset', 16, 16);

	//  Define Layers
	this.groundLayer = this.map.createLayer('Background');

	// Scale Layers
	this.groundLayer.setScale(3);

	//  Resize the world
	this.groundLayer.resizeWorld();

	// Set Collisions
	//this.map.setCollisionBetween(0, 5000, true, 'Collision');

	this.loadItems();
	this.loadEnemies();
    
  }

  loadEnemies(){

  }

  loadItems(){

  }

  loadWeather(){

  }

  update(){
  	// Update Weather
  }
}
