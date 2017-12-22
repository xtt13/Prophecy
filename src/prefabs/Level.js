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

    this.characters = [];


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

  // Create Player
  this.player = new Player(this.game, tilemapProperties.playerStartX, tilemapProperties.playerStartY);

  // Map Player to Inputclass
  this.inputClass.setPlayer(this.player);
  this.GUICLASS.setPlayer(this.player);




  const message = [
    "If a person who has an evil heart gets the Triforce, a Hero is destined to appear... and he alone must face the person who began the Great Cataclysm. ",
    "If the evil one destroys the Hero, nothing can save the world from his wicked reign. Only a person of the Knights Of Hyrule, who protected the royalty of Hylia, can become the Hero."

  ];

  // Create Enemies
  // this.enemies = [];
  // for (var i = 0; i < 0; i++) {
  //   this.enemies.push(new Enemy(this.game, this.game.rnd.integerInRange(this.game.world.centerX - 50, this.game.world.centerX + 50), this.game.rnd.integerInRange(this.game.world.centerY + 50, this.game.world.centerY - 50), this.player));
  // }

  this.loadItems();
  this.loadPeople();

  // Map Events
  this.map.plus.physics.enableObjectLayer("Collision");

  this.map.plus.events.regions.enableObjectLayer("Events");
  this.map.plus.events.regions.onEnterAdd(this.player, (region) => {

      if (region.properties.message) {
          this.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
      }
  });

  this.weather = new Weather(this.game, tilemapProperties.weather);
    
  }


  loadPeople(){
    let elementsArr = this.findObjectsByType('character', this.map, 'People');

    elementsArr.forEach(function(element){

      if(element.properties.character == 'death'){
        console.log(this.player);
        this.characters.push(new Character(this.game, element.x, element.y, this.player));
      }
    }, this);

  } 

  loadItems(){

  }

  findObjectsByType(targetType, tilemap, layer){
    let result = [];

    tilemap.objects[layer].forEach(function(element){

    let container = Object.keys(element.properties).toString();

    if(container == targetType) {
      element.y -= tilemap.tileHeight/2;
      element.x += tilemap.tileHeight/2;
      result.push(element);
    }

    }, this);

    return result;
  }

  loadWeather(){

  }

  update(){

  
    // this.game.physics.arcade.collide(this.enemies, this.enemies);   
    // this.game.physics.arcade.collide(this.enemies, this.player);
    this.game.physics.arcade.collide(this.characters, this.player);
    this.game.world.bringToTop(this.player);

    // TilemapPlus Physics
  	this.map.plus.physics.collideWith(this.player);
    this.map.plus.events.regions.triggerWith(this.player);


    // Update Weather
    this.weather.updateWeather();
  }
}
