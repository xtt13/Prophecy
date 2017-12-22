import Phaser from 'phaser';
import Message from './Message';

export default class {
  constructor (game) {
    this.game = game;
  	this.createGUI();
  }

  createGUI(){

  }

  updateGUI(option, value){
  	switch(option) {
    case 'hp':
        
        break;
    case 'defence':
        
        break;
    default:
        
	 }

  }

  createMessage(message, playerMovable, readable){
    this.message = new Message(this.game, message, playerMovable, readable, this.player);
  }

  setPlayer(player){
    this.player = player;
  }
}
