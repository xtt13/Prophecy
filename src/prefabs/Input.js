import Phaser from 'phaser';
import Player from './Player';
import config from './../config';

export default class {
	constructor(game, level) {
		this.game = game;

		if (level !== undefined) {
			this.level = level;
			this.player = this.level.player;
		}

		this.gamepadSupport = false;
		this.useMobileControl = false;
		this.pad1;
		// this.maxSpeed = 150;
		this.playerSpeed = 100;

		this.game.input.addPointer();
		this.game.input.addPointer();

		console.log(this.game.input);

		this.pyfootsteps = this.game.add.audioSprite('PxFootsteps');
		this.pyfootsteps.allowMultiple = false;

		this.currentUnderground = 'grass';

		this.checkController();
	}

	showMessage(message, error) {
		if (error) {
			console.log('%c ' + message + ' ', 'background: #f00; color: #fff');
		} else {
			console.log('%c ' + message + ' ', 'background: #222; color: #bada55');
		}
	}

	checkController() {
		// If gamepad.supported and gamepad.active
		if (this.game.input.gamepad.supported && this.game.input.gamepad.active) {
			this.gamepadSupport = true;
			this.pad1 = this.game.input.gamepad.pad1;

			// If pad1 is connected
			if (this.pad1.connected) {
				this.showMessage('Controller 1 connected 🎮');
				this.noControllerConnected = false;

				this.useController();
			} else {
				this.showMessage('No Controller connected', true);
				this.noControllerConnected = true;

				if (this.isMobileDevice() || config.forceMobile) {
					console.log('Use Mobile');
					this.useMobileControl = true;
					this.useMobile();
				} else {
					this.useKeyboard();
				}
			}
		} else {
			if (this.isMobileDevice() || config.forceMobile) {
				console.log('Use Mobile');
				this.useMobileControll = true;
				this.useMobile();
			} else {
				this.useKeyboard();
			}
		}
	}

	useMobile() {
		if (this.stick) {
			this.stick.destroy();
		}

		if (this.pad) {
			this.pad.destroy();
		}

		this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

		// console.log(this.pad);

		// this.stick = this.pad.addDPad(0, 0, 200, 'dpad');
		// this.stick.scale = 0.5;
		// this.stick.alignBottomLeft(0);
		// this.stick.showOnTouch = true;
		// console.log(this.stick);

		this.stick = this.pad.addStick(0, 0, 200, 'generic');

		this.stick.scale = 0.5;
		this.stick.alignBottomLeft(0);
		this.stick.showOnTouch = true;
	}

	isMobileDevice() {
		return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
	}

	useKeyboard() {
		console.log('%c Use Keyboard! ', 'background: #222; color: #bada55');
		this.addKeyboardKeys();
	}

	useController() {
		console.log('%c Use Controller! ', 'background: #222; color: #bada55');
		this.pad1.addCallbacks(this, { onConnect: this.addGamepadButtons() });
	}

	addGamepadButtons() {
		if (this.pad1._rawPad.id.indexOf('360')) {
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

			this.gamepad_buttonDPadLeft.onDown.add(this.level.GUICLASS.ingameMenu.mapLeft, this.level.GUICLASS.ingameMenu);
			this.gamepad_buttonDPadRight.onDown.add(this.level.GUICLASS.ingameMenu.mapRight, this.level.GUICLASS.ingameMenu);
			this.gamepad_buttonDPadUp.onDown.add(this.level.GUICLASS.ingameMenu.mapUp, this.level.GUICLASS.ingameMenu);
			this.gamepad_buttonDPadDown.onDown.add(this.level.GUICLASS.ingameMenu.mapDown, this.level.GUICLASS.ingameMenu);

			// this.gamepad_buttonDPadLeft.onUp.add(this.onGamepadUp, this);
			// this.gamepad_buttonDPadRight.onUp.add(this.onGamepadUp, this);
			// this.gamepad_buttonDPadUp.onUp.add(this.onGamepadUp, this);
			// this.gamepad_buttonDPadDown.onUp.add(this.onGamepadUp, this);

			// LB and RB Buttons
			this.gamepad_buttonLeftBumper = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
			this.gamepad_buttonRightBumper = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);

			this.gamepad_buttonLeftBumper.onDown.add(this.level.GUICLASS.ingameMenu.prev, this.level.GUICLASS.ingameMenu);
			this.gamepad_buttonRightBumper.onDown.add(this.level.GUICLASS.ingameMenu.next, this.level.GUICLASS.ingameMenu);

			// LT and RT Buttons
			this.gamepad_buttonLeftTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
			this.gamepad_buttonRightTrigger = this.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

			this.gamepad_buttonLeftTrigger.onDown.add(this.onGamepadDown, this);
			this.gamepad_buttonRightTrigger.onDown.add(this.onGamepadDown, this);

			// Back and Start Buttons
			this.gamepad_buttonBack = this.pad1.getButton(Phaser.Gamepad.XBOX360_BACK);
			this.gamepad_buttonStart = this.pad1.getButton(Phaser.Gamepad.XBOX360_START);

			this.gamepad_buttonBack.onDown.add(this.level.GUICLASS.ingameMenu.toggleMenu, this.level.GUICLASS.ingameMenu);
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

	addKeyboardKeys() {
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.button_W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.button_W.onDown.add(this.addMovementSound, this);
		this.button_W.onUp.add(this.removeMovementSound, this);

		this.button_S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.button_S.onDown.add(this.addMovementSound, this);
		this.button_S.onUp.add(this.removeMovementSound, this);

		this.button_A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.button_A.onDown.add(this.addMovementSound, this);
		this.button_A.onUp.add(this.removeMovementSound, this);

		this.button_D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.button_D.onDown.add(this.addMovementSound, this);
		this.button_D.onUp.add(this.removeMovementSound, this);

		this.button_SPACEBAR = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.button_TAB = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);

		// this.button_TAB.onDown.add(this.level.GUICLASS.questMap.toggleMap, this.level.GUICLASS.questMap);
		this.button_TAB.onDown.add(this.level.GUICLASS.ingameMenu.toggleMenu, this.level.GUICLASS.ingameMenu);

		this.button_0 = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
		this.button_0.onDown.add(this.resetLocalStorage, this);
	}

	onGamepadDown(button) {
		if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT) {
			this.player.walk('left', 200);
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT) {
			this.player.walk('right', 200);
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP) {
			this.player.walk('up', 200);
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN) {
			this.player.walk('down', 200);
		}
	}

	addMovementSound() {
		if (this.button_A.isDown || this.button_D.isDown || this.button_W.isDown || this.button_S.isDown) {
			if(this.currentUnderground == 'grass'){
				this.pyfootsteps.play('gravel1', 4);
			} else if (this.currentUnderground == 'stone'){
				this.pyfootsteps.play('grass1', 4);
			}
			
		} else {
			// this.loop = undefined;
			// clearInterval(this.loop);
			// this.pyfootsteps.stop('gravel1');
		}
	}

	removeMovementSound() {
		if (this.button_A.isDown || this.button_D.isDown || this.button_W.isDown || this.button_S.isDown) {
		} else {
			if(this.currentUnderground == 'grass'){
				this.pyfootsteps.stop('gravel1');
			} else if (this.currentUnderground == 'stone'){
				this.pyfootsteps.stop('grass1');
			}
		}
	}

	resetLocalStorage() {
		this.level.GUICLASS.createNotification('saving', 'Reset Account!');
		localStorage.clear();
		this.game.musicPlayer.fadeOut();
		this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
			this.game.state.start('MainMenu', true, false);
		});
	}

	onGamepadUp(button) {
		if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT) {
			this.player.walk('idle');
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT) {
			this.player.walk('idle');
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP) {
			this.player.walk('idle');
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN) {
			this.player.walk('idle');
		}
	}

	update() {
		// console.log("Y: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y));
		// console.log("X: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X));

		// Gamepad Controls
		if (this.player) {
			if (!this.player.movable) return;

			if (this.pad1 !== undefined && this.pad1.connected) {
				if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
					this.player.body.velocity.x = -this.playerSpeed;
				} else if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
					this.player.body.velocity.x = this.playerSpeed;
				} else {
					this.player.idle('x');
				}

				if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
					this.player.body.velocity.y = -this.playerSpeed;
					this.player.animations.play('run');
				} else if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
					this.player.body.velocity.y = this.playerSpeed;
					this.player.animations.play('run');
				} else {
					this.player.idle('y');
					this.player.animations.play('idle');
				}

			} else if (this.useMobileControl) {
				if (this.stick.isDown) {
					this.game.physics.arcade.velocityFromRotation(
						this.stick.rotation,
						this.stick.force * this.playerSpeed,
						this.player.body.velocity
					);
					// this.player.rotation = this.stick.rotation;

					// console.log(this.stick.force);

					// if(this.game.input.pointer1.active && this.game.input.pointer2.active){
					// 	console.log('2Finger');
					// 	this.player.body.velocity.x = 200;
					// }

					this.stickRotation = this.stick.rotation.toFixed(1);

					if (this.stickRotation <= 2 && this.stickRotation >= 1) {
						// console.log('Down');
						this.player.animations.play('run');
					} else if (this.stickRotation >= -1 && this.stickRotation <= 1) {
						// console.log('Right');
					} else if (this.stickRotation <= -1 && this.stickRotation >= -2) {
						// console.log('Up');
					} else {
						// console.log('Left');
					}
				} else {
					this.player.animations.play('idle');
					this.player.body.velocity.set(0);
				}
			} else {
				// Keyboard Movement

				if (this.button_A.isDown || this.button_D.isDown || this.button_W.isDown || this.button_S.isDown) {
					if (this.button_A.isDown) {
						this.player.animations.play('run');

						if (this.button_W.isDown || this.button_W.isDown) {
							this.player.body.velocity.x = -this.playerSpeed / 2;
						} else {
							this.player.body.velocity.x = -this.playerSpeed;
						}
					} else if (this.button_D.isDown) {
						this.player.animations.play('run');

						if (this.button_W.isDown || this.button_W.isDown) {
							this.player.body.velocity.x = this.playerSpeed / 2;
						} else {
							this.player.body.velocity.x = this.playerSpeed;
						}
					} else {
						// this.player.animations.play('idle');
						this.player.body.velocity.x = 0;
					}

					if (this.button_W.isDown) {
						// this.player.walk('up', 80);
						this.player.animations.play('run');
						this.player.body.velocity.y = -this.playerSpeed;
					} else if (this.button_S.isDown) {
						// this.player.walk('down', 80);
						this.player.animations.play('run');
						this.player.body.velocity.y = this.playerSpeed;
					} else {
						// this.player.animations.play('idle');
						this.player.body.velocity.y = 0;
					}
				} else {
					this.player.body.velocity.y = 0;
					this.player.body.velocity.x = 0;
					this.player.animations.play('idle');
				}

				if (this.button_SPACEBAR.isDown) {
					// this.player.body.setSize(40, 40, 0, 0);
					// this.game.add.tween(this.player.body).to( {width: 40, height: 40}, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);
					// this.game.add.tween(this.player.body).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
					// this.game.add.tween(this.player.body.height).to( 40, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);
					// console.log(this.player.body);
					// console.log(this.player.body.width);
					// console.log(this.player.body.height);
				} else {
					// this.player.body.setSize(8, 22, 15, 20);
				}
			}
		}
	}
}
