import Phaser from 'phaser';
import config from './../config';

export default class {
  constructor (game, type) {

    if(config.weather){
      this.createWeather(type);
    }
  }

  createWeather(type){
    switch(type) {
    case 'Snow':
        this.addSnow();
        break;

    case 'Storm':
        this.addStorm();
        break;
        
    default:
        
    }
  }

  addSnow(){

  }

  addStorm(){

  }

  updateWeather(){

  }
}
