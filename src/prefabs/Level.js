import Phaser from 'phaser';
import "phaser-tilemap-plus";
import Player from '../prefabs/Player';
import Enemy from '../prefabs/Enemy';
import Character from '../prefabs/Character';
import Weather from '../prefabs/Weather';
import Input from '../prefabs/Input';
import config from './../config';
import dialogues from './../dialogues';

export default class{
  constructor(game, inputClass, GUIclass, currentLevel){

  	this.game = game;
    this.inputClass = inputClass;
    this.GUICLASS = GUIclass;
  	this.currentLevel = currentLevel;

    this.characters = [];
    this.playedDialogues = [];
    this.activatedBridges = [];


  	this.loadLevel();
  }

  loadLevel(){

  // JSON Map Data
	this.map = this.game.add.tilemap(this.currentLevel);

	//  Connect with Tileset
  this.map.addTilesetImage('Tileset', 'gameTileset2', 36, 36);

	//  Define Layers
  this.groundLayer = this.map.createLayer('Layer1');
  this.collisionLayer = this.map.createLayer('CollisionLayer');

	//  Resize the world
	this.groundLayer.resizeWorld();

  this.map.setCollisionBetween(0, 20, true, 'CollisionLayer');

  const tilemapProperties = this.map.plus.properties;
  this.map.plus.animation.enable();

  // Create Player
  this.player = new Player(this.game, tilemapProperties.playerStartX, tilemapProperties.playerStartY);

  // Map Player to Inputclass
  this.inputClass.setPlayer(this.player);
  this.GUICLASS.setPlayer(this.player);




  // const message = [
  //   "If a person who has an evil heart gets the Triforce, a Hero is destined to appear... and he alone must face the person who began the Great Cataclysm. ",
  //   "If the evil one destroys the Hero, nothing can save the world from his wicked reign. Only a person of the Knights Of Hyrule, who protected the royalty of Hylia, can become the Hero."

  // ];

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

  // Enter Events
  this.map.plus.events.regions.onEnterAdd(this.player, (region) => {

      if(region.properties.message) {
          const message_id = region.properties.id
          const all_messages = Object.values(dialogues.dialogues);
          for (var i = 0; i < all_messages.length; i++) {
            if(i+1 == message_id){
              if(this.playedDialogues.includes(message_id)) return;
              const message = all_messages[i];
              this.playedDialogues.push(message_id);
              this.GUICLASS.createMessage(message, region.properties.movable, region.properties.readable);
              break;
            }
          }      
      }

      if(region.properties.bridge){
        const bridgeID = region.properties.id;
        if(this.activatedBridges.includes(bridgeID)) return;
        const bridgeDirection = region.properties.direction;
        const bridgeLength = region.properties.length;
        console.log(region);

        var bridgeX = this.groundLayer.getTileX(this.player.x);
        var bridgeY = this.groundLayer.getTileY(this.player.y);

        var collX = this.collisionLayer.getTileX(this.player.x);
        var collY = this.collisionLayer.getTileY(this.player.y);
        console.log(collX, collY);

        let bridgeCounter = 0;
        window.setInterval(() => {
          bridgeY--;
          collY--;
          
          this.map.putTile(2, bridgeX, bridgeY, this.groundLayer);
          this.map.putTile(2, bridgeX-1, bridgeY, this.groundLayer);

          this.map.removeTile(collX, collY, this.collisionLayer);
          this.map.removeTile(collX-1, collY, this.collisionLayer);
          this.game.camera.shake(0.0015, 500);
          bridgeCounter++;
          if(bridgeCounter == bridgeLength) return;
        }, 500);

        this.activatedBridges.push(bridgeID);
        
      }
  });

  this.weather = new Weather(this.game, tilemapProperties.weather);
    
  }


  loadPeople(){
    let elementsArr = this.findObjectsByType('character', this.map, 'People');

    elementsArr.forEach(function(element){

      if(element.properties.character == 'death'){
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
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
    this.game.world.bringToTop(this.player);

    // TilemapPlus Physics
  	this.map.plus.physics.collideWith(this.player);
    this.map.plus.events.regions.triggerWith(this.player);


    // Update Weather
    this.weather.updateWeather();
  }
}
