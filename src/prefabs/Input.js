import Phaser from 'phaser';
import Player from './Player';

export default class extends Player{
  constructor(game){
    super(game, 100, 200);
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
    this.addKeyboardKeys();
  }

  useController(){
    console.log('%c Use Controller! ', 'background: #222; color: #bada55');
    this.pad1.addCallbacks(this, { onConnect: this.addGamepadButtons() });
  }

  addGamepadButtons(){
    if(this.pad1._rawPad.id.indexOf("360")){

      // XBOX 360 Controller

      // XYAB Buttons
      this.gamepad_buttonA = this.pad1.getButton(Phaser.Gamepad.XBOX360_A);
      this.gamepad_buttonB = this.pad1.getButton(Phaser.Gamepad.XBOX360_B);
      this.gamepad_buttonX = this.pad1.getButton(Phaser.Gamepad.XBOX360_X);
      this.gamepad_buttonY = this.pad1.getButton(Phaser.Gamepad.XBOX360_Y);

      this.gamepad_buttonA.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonB.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonX.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonY.onDown.add(this.onGamepadDown, this);


      // D-PAD Buttons
      this.gamepad_buttonDPadLeft = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
      this.gamepad_buttonDPadRight = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
      this.gamepad_buttonDPadUp = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
      this.gamepad_buttonDPadDown = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

      this.gamepad_buttonDPadLeft.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonDPadRight.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonDPadUp.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonDPadDown.onDown.add(this.onGamepadDown, this);

      this.gamepad_buttonDPadLeft.onUp.add(this.onGamepadUp, this);
      this.gamepad_buttonDPadRight.onUp.add(this.onGamepadUp, this);
      this.gamepad_buttonDPadUp.onUp.add(this.onGamepadUp, this);
      this.gamepad_buttonDPadDown.onUp.add(this.onGamepadUp, this);


      // LB and RB Buttons
      this.gamepad_buttonLeftBumper = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
      this.gamepad_buttonRightBumper = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);

      this.gamepad_buttonLeftBumper.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonRightBumper.onDown.add(this.onGamepadDown, this);


      // LT and RT Buttons
      this.gamepad_buttonLeftTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
      this.gamepad_buttonRightTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

      this.gamepad_buttonLeftTrigger.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonRightTrigger.onDown.add(this.onGamepadDown, this);


      // Back and Start Buttons
      this.gamepad_buttonBack = this.pad1.getButton(Phaser.Gamepad.XBOX360_BACK);
      this.gamepad_buttonStart = this.pad1.getButton(Phaser.Gamepad.XBOX360_START);

      this.gamepad_buttonBack.onDown.add(this.onGamepadDown, this);
      this.gamepad_buttonStart.onDown.add(this.onGamepadDown, this);


      // Sticks Press Buttons
      //this.gamepad_buttonStickLeft = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_BUTTON);
      //this.gamepad_buttonStickRight = this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON);

      //this.gamepad_buttonStickLeft.onDown.add(this.onGamepadDown, this);
      //this.gamepad_buttonStickRight.onDown.add(this.onGamepadDown, this);


    } else {
      // PS3 Controller
      // this.gamepad_buttonA = this.pad1.getButton(Phaser.Gamepad.PS3XC_X);
      // this.gamepad_buttonB = this.pad1.getButton(Phaser.Gamepad.PS3XC_CIRCLE);
      // this.gamepad_buttonX = this.pad1.getButton(Phaser.Gamepad.PS3XC_SQUARE);
      // this.gamepad_buttonY = this.pad1.getButton(Phaser.Gamepad.PS3XC_TRIANGLE);

      // this.gamepad_buttonDPadLeft = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
      // this.gamepad_buttonDPadRight = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
      // this.gamepad_buttonDPadUp = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
      // this.gamepad_buttonDPadDown = this.pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

      // this.gamepad_buttonLeftBumper = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
      // this.gamepad_buttonRightBumper = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);

      // this.gamepad_buttonLeftTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
      // this.gamepad_buttonRightTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

      // this.gamepad_buttonBack = this.pad1.getButton(Phaser.Gamepad.PS3XC_SELECT);
      // this.gamepad_buttonStart = this.pad1.getButton(Phaser.Gamepad.PS3XC_START);

      // this.gamepad_buttonStickLeft = this.pad1.getButton(Phaser.Gamepad.XBOX360_STICK_LEFT_BUTTON);
      // this.gamepad_buttonStickRight = this.pad1.getButton(Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON);

    }

  }


addKeyboardKeys(){

  this.button_W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.button_W.onDown.add(this.onKeyboardDown, this);
  this.button_W.onUp.add(this.onKeyboardUp, this);

  this.button_S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  this.button_S.onDown.add(this.onKeyboardDown, this);
  this.button_S.onUp.add(this.onKeyboardUp, this);

  this.button_A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.button_A.onDown.add(this.onKeyboardDown, this);
  this.button_A.onUp.add(this.onKeyboardUp, this);

  this.button_D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.button_D.onDown.add(this.onKeyboardDown, this);
  this.button_D.onUp.add(this.onKeyboardUp, this);

};

onGamepadDown(button){

  if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT){
      this.walk('left', 200);
    } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT){
      this.walk('right', 200);
    } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP){
      this.walk('up', 200);
    } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN){
      this.walk('down', 200);
    }

};

onKeyboardDown(button){

  if (button.event.code === 'KeyA'){
   this.walk('left', 200);
  } else if (button.event.code === 'KeyD'){
   this.walk('right', 200);
  } else if (button.event.code === 'KeyW'){
   this.walk('up', 200);
  } else if (button.event.code === 'KeyS'){
   this.walk('down', 200);
  }

};

onGamepadUp(button){

  if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT){
    this.walk('idle');
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT){
    this.walk('idle');
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP){
    this.walk('idle');
  } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN){
    this.walk('idle');
  }

};

onKeyboardUp(button){

  if (button.event.code === 'KeyA'){
   this.walk('idle');
  } else if (button.event.code === 'KeyD'){
   this.walk('idle');
  } else if (button.event.code === 'KeyW'){
   this.walk('idle');
  } else if (button.event.code === 'KeyS'){
   this.walk('idle');
  }

}

update(){
  //console.log('update');
};



}
