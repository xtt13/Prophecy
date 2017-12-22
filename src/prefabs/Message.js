import Phaser from 'phaser';

export default class {
  constructor (game, message, movable, player) {
    this.game = game;
    this.message = message;
    this.movable = movable;
    this.player = player;

    this.line = [];
    console.log('INSIDE');
    this.wordIndex = 0;
    this.lineIndex = 0;

    this.wordDelay = 120;
    this.lineDelay = 3500;

    this.text = this.game.add.bitmapText(130, 30, 'pxlfont', '', 20);
    this.text.scale.set(0.26);
    this.text.maxWidth = 1000;
    this.text.textHeight = 1500;
    this.game.cache.getBitmapFont('pxlfont').font.lineHeight = 50;
    console.log(this.text);
    this.text.fixedToCamera = true;
    this.text.smoothed = false;

    if(!this.movable){
      this.player.movable = false;
    }

    this.nextLine();
  	
    }

    nextLine(){
      if (this.lineIndex === this.message.length){
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removeMessage, this);
        return;
      }

      this.line = this.message[this.lineIndex].split(' ');
      this.wordIndex = 0;
      this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
      this.text.text = "";
      this.lineIndex++;
    }

    nextWord(){
      this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
      this.wordIndex++;

      if (this.wordIndex === this.line.length){
        this.text.text = this.text.text.concat("\n");
        this.game.time.events.add(this.lineDelay, this.nextLine, this);
      }
    }

    removeMessage(){
      this.text.destroy();
      if(!this.movable){
        this.player.movable = true;
      }
    }

    update(){
      
    }

  


  
}
