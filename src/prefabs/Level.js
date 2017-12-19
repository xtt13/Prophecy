import Phaser from 'phaser';
import "phaser-tilemap-plus";
import Player from '../prefabs/Player';
import Weather from '../prefabs/Weather';
import Input from '../prefabs/Input';
import config from './../config';

export default class{
  constructor(game, inputClass, currentLevel){
  	this.game = game;
    this.inputClass = inputClass;
  	this.currentLevel = currentLevel;
  	this.loadLevel();
  }

  loadLevel(){



  	// JSON Map Data
	this.map = this.game.add.tilemap(this.currentLevel);

	//  Connect with Tileset
  this.map.addTilesetImage('Tileset', 'gameTileset2', 36, 36);

	//  Define Layers
  this.groundLayer = this.map.createLayer('Layer1');

	// Scale Layers
	this.groundLayer.setScale(config.scaleRate);

	//  Resize the world
	this.groundLayer.resizeWorld();

	// Set Collisions
	//this.map.setCollisionBetween(0, 5000, true, 'Collision');

	this.loadItems();
	this.loadEnemies();
	this.weather = new Weather(this.game, 'Storm');
	
	

	// Check for XBOX or PS Controller
  //this.inputClass = new Input(this.game);

  const tilemapProperties = this.map.plus.properties;
  console.log(tilemapProperties);

  this.player = new Player(this.game, 2200, 2200);
  this.inputClass.setPlayer(this.player);

  this.map.plus.physics.enableObjectLayer("Collision");
  console.log(this.map.plus);

    
  }


  loadEnemies(){

  }

  loadItems(){

  }

  loadWeather(){

  }

  update(){
    const player = this.player;
  	this.map.plus.physics.collideWith(player);

    // Update Weather
    this.weather.updateWeather();
  }
}
