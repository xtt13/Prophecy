import Phaser from 'phaser';

export default class {
  constructor(game){
  	this.game = game;
    this.gamepadSupport = false;
    this.pad1;

    this.checkController();
  }

  showMessage(message, error){
    if(error){
      console.log("%c "+ message + " ", "background: #f00; color: #fff");
    } else {
      console.log("%c "+ message + " ", "background: #222; color: #bada55");
    }
  }

  checkController(){
    // If gamepad.supported and gamepad.active
    if (this.game.input.gamepad.supported && this.game.input.gamepad.active){

        this.gamepadSupport = true;
        this.pad1 = this.game.input.gamepad.pad1;

        // If pad1 is connected
        if(this.pad1.connected){
          this.showMessage("Controller 1 connected 🎮");
          this.useController();
        } else {
          this.showMessage("No Controller connected", true);
          this.useKeyboard();
        }  

    } else {
      this.useKeyboard();
    }
  }

  useKeyboard(){
    console.log('%c Use Keyboard! ', 'background: #222; color: #bada55');
  }

  useController(){
    console.log('%c Use Controller! ', 'background: #222; color: #bada55');
  }




}
