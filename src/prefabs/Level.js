import Phaser from 'phaser';
import "phaser-tilemap-plus";
import Player from '../prefabs/Player';
import Enemy from '../prefabs/Enemy';
import Character from '../prefabs/Character';
import Weather from '../prefabs/Weather';
import Input from '../prefabs/Input';
import config from './../config';

export default class{
  constructor(game, inputClass, GUIclass, currentLevel){
  	this.game = game;
    this.inputClass = inputClass;
    this.GUICLASS = GUIclass;
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

	//  Resize the world
	this.groundLayer.resizeWorld();

  const tilemapProperties = this.map.plus.properties;
  console.log(this.map);
  this.map.plus.animation.enable();

	this.loadItems();
	this.loadEnemies();
	this.weather = new Weather(this.game, tilemapProperties.weather);

  // Create Player
  this.player = new Player(this.game, tilemapProperties.playerStartX, tilemapProperties.playerStartY);

  // Map Player to Inputclass
  this.inputClass.setPlayer(this.player);
  this.GUICLASS.setPlayer(this.player);




  const message = [
    "If a person who has an evil heart gets the Triforce, a Hero is destined to appear... and he alone must face the person who began the Great Cataclysm. ",
    "If the evil one destroys the Hero, nothing can save the world from his wicked reign. Only a person of the Knights Of Hyrule, who protected the royalty of Hylia, can become the Hero."

  ];

  
  this.game.time.events.add(Phaser.Timer.SECOND * 10, function(){
    this.GUICLASS.createMessage(message, false);
  }, this);

  // Create Enemies
  this.enemies = [];
  for (var i = 0; i < 0; i++) {
    this.enemies.push(new Enemy(this.game, this.game.rnd.integerInRange(this.game.world.centerX - 50, this.game.world.centerX + 50), this.game.rnd.integerInRange(this.game.world.centerY + 50, this.game.world.centerY - 50), this.player));
  }

  this.priest = new Character(this.game, this.game.world.centerX, this.game.world.centerY, this.player);

  // Map Events
  this.map.plus.physics.enableObjectLayer("Collision");

  this.map.plus.events.regions.enableObjectLayer("Events");
  this.map.plus.events.regions.onEnterAdd(this.player, (region) => {

      if (region.properties.onWakeUp) {
          console.log('Enter');
      }
  });
  this.map.plus.events.regions.onLeaveAdd(this.player, (region) => {

      if (region.properties.onWakeUp) {
          console.log('Leave');
      }
  });
    
  }


  loadEnemies(){

  }

  loadItems(){

  }

  loadWeather(){

  }

  update(){
  
    this.game.physics.arcade.collide(this.enemies, this.enemies);   
    this.game.physics.arcade.collide(this.enemies, this.player);
    this.game.physics.arcade.collide(this.priest, this.player);
    this.game.world.bringToTop(this.player);

    // TilemapPlus Physics
  	this.map.plus.physics.collideWith(this.player);
    this.map.plus.events.regions.triggerWith(this.player);


    // Update Weather
    this.weather.updateWeather();
  }
}
