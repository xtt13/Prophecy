import Phaser from 'phaser';
import "phaser-tilemap-plus";
import Player from '../prefabs/Player';
import Weather from '../prefabs/Weather';
import Input from '../prefabs/Input';

export default class{
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
	this.weather = new Weather(this.game, 'Snow');
	
	//this.player = new Player(this.game, 100, 100);

	// Check for XBOX or PS Controller
    this.inputClass = new Input(this.game);
    
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
