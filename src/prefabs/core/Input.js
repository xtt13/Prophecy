import Phaser from 'phaser';
import config from './../../config';

export default class {
	constructor(game, level) {
		this.game = game;

		if (level !== undefined) {
			this.level = level;
			this.player = this.level.player;
		}

		this.pad1;
		this.gamepadSupport = false;
		this.useMobileControl = false;
		this.dash = false;

		this.playerSpeed = 60;
		this.directon = 'down';
		this.currentUnderground = 'grass';

		this.pyfootsteps = this.game.add.audioSprite('PxFootsteps');
		this.pyfootsteps.allowMultiple = false;

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
				this.useMobileControl = true;
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

		this.buttonA = this.pad.addButton(0, 0, 'generic', 'button1-up', 'button1-down');
		this.buttonA.scale = 0.5;
		this.buttonA.alignBottomRight(50);
		this.buttonA.onDown.add(this.beginnDash, this);
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
		this.button_SPACEBAR.onDown.add(this.beginnDash, this);
		// this.button_SPACEBAR.onUp.add(this.endDash, this);

		this.button_0 = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
		this.button_0.onDown.add(this.resetLocalStorage, this);

		if (typeof ipc !== 'undefined') {
			this.button_ESC = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
			this.button_ESC.onDown.add(this.level.GUICLASS.ingameMenu.toggleMenu, this.level.GUICLASS.ingameMenu);
		} else {
			this.button_TAB = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
			this.button_TAB.onDown.add(this.level.GUICLASS.ingameMenu.toggleMenu, this.level.GUICLASS.ingameMenu);
		}
	}

	onGamepadDown(button) {
		if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
			this.beginnDash();
		}
	}

	addMovementSound() {
		if (this.level.muteSound || !this.player.movable) return;
		if (this.button_A.isDown || this.button_D.isDown || this.button_W.isDown || this.button_S.isDown) {
			if (!this.pyfootsteps.isPlaying) {
				if (this.currentUnderground == 'grass') {
					this.pyfootsteps.play('gravel1', 1);
				} else if (this.currentUnderground == 'stone') {
					this.pyfootsteps.play('grass1', 1);
				}

				// if(!this.loop){
				// 	this.loop = this.game.time.events.loop(500, () => {
				// 		this.pyfootsteps.play('gravel2', 4);
				// 	}, this);
				// }
			}
		} else {
			// this.loop.destroy();
			// this.loop = false;
			// this.loop = undefined;
			// clearInterval(this.loop);
			// this.pyfootsteps.stop('gravel1');
		}
	}

	removeMovementSound() {
		if (this.button_A.isDown || this.button_D.isDown || this.button_W.isDown || this.button_S.isDown) {
			//Hi
		} else {
			if (this.currentUnderground == 'grass') {
				this.pyfootsteps.stop('gravel1');
			} else if (this.currentUnderground == 'stone') {
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

	beginnDash() {
		this.dash = true;
		this.player.addParticles();
		this.playerSpeed = 250;
		this.dashSound = this.game.add.audio('sfxfalldown', 0.25);
		this.dashSound.play();

		// this.dashTween = this.game.add
		// 	.tween(this)
		// 	.to({ playerSpeed: playerSpeed + 190 }, 200, Phaser.Easing.Exponential.In, true, 0, 0, true);

		this.game.time.events.add(400, () => {
			this.playerSpeed = 60;
			this.dash = false;
			this.player.removeParticles();
		});
	}

	onGamepadUp() {}

	update() {
		// console.log("Y: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y));
		// console.log("X: " + this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X));

		// Gamepad Controls
		if (this.player) {
			// If the Player should not walk
			if (!this.player.movable) {
				this.player.animations.stop();
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 0;
				return;
			}

			if (this.pad1 !== undefined && this.pad1.connected) {
				if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
					if (this.direction == 'left' || this.direction == 'right') {
						this.player.body.velocity.y = -this.playerSpeed;
					} else {
						this.player.animations.play('run_up');
						this.player.body.velocity.y = -this.playerSpeed;
					}
					this.direction = 'up';
				} else if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
					if (this.direction == 'left' || this.direction == 'right') {
						this.player.body.velocity.y = this.playerSpeed;
					} else {
						this.player.animations.play('run_down');
						this.player.body.velocity.y = this.playerSpeed;
					}
					this.direction = 'down';
				} else {
					this.direction = '';
					this.player.body.velocity.y = 0;
				}

				if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
					if (this.direction == 'up' || this.direction == 'down') {
						this.player.body.velocity.x = -this.playerSpeed;
					} else {
						this.player.animations.play('run_left');
						this.player.body.velocity.x = -this.playerSpeed;
					}
					this.direction = 'left';
				} else if (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
					if (this.direction == 'up' || this.direction == 'down') {
						this.player.body.velocity.x = this.playerSpeed;
					} else {
						this.player.animations.play('run_right');
						this.player.body.velocity.x = this.playerSpeed;
					}
					this.direction = 'right';
				} else {
					this.direction = '';
					this.player.body.velocity.x = 0;
				}

				if (
					this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) == 0 &&
					this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) == 0
				) {
					this.player.animations.stop();
				}
			} else if (this.useMobileControl) {
				if (this.stick.isDown) {
					console.log(this.stick.rotation);
					this.game.physics.arcade.velocityFromRotation(
						this.stick.rotation,
						this.stick.force * this.playerSpeed,
						this.player.body.velocity
					);

					// this.player.rotation = this.stick.rotation;
					this.player.animations._anims.run_right.speed = 19;
					this.player.animations._anims.run_left.speed = 19;
					this.player.animations._anims.run_down.speed = 19;
					this.player.animations._anims.run_up.speed = 19;
					// console.log('HIER: ' + this.player.animations._anims.run_down.speed * this.stick.force);
					this.player.animations._anims.run_down.speed =
						this.player.animations._anims.run_down.speed * this.stick.force + 0.1;
					this.player.animations._anims.run_up.speed =
						this.player.animations._anims.run_up.speed * this.stick.force + 0.1;
					this.player.animations._anims.run_right.speed =
						this.player.animations._anims.run_right.speed * this.stick.force + 0.1;
					this.player.animations._anims.run_left.speed =
						this.player.animations._anims.run_left.speed * this.stick.force + 0.1;
					// console.log(this.player.animations._anims.run_down.speed)
					// console.log(this.stick.force);

					// if(this.game.input.pointer1.active && this.game.input.pointer2.active){
					// 	console.log('2Finger');
					// 	this.player.body.velocity.x = 200;
					// }

					if (this.currentUnderground == 'grass') {
						this.pyfootsteps.play('gravel1', 4);
					} else if (this.currentUnderground == 'stone') {
						this.pyfootsteps.play('grass1', 4);
					}

					this.stickRotation = this.stick.rotation.toFixed(1);

					if (this.stickRotation <= 2 && this.stickRotation >= 1) {
						// console.log('Down');
						this.player.animations.play('run_down');
						this.direction = 'down';
					} else if (this.stickRotation >= -1 && this.stickRotation <= 1) {
						// console.log('Right');
						this.player.animations.play('run_right');
						this.direction = 'right';
					} else if (this.stickRotation <= -1 && this.stickRotation >= -2) {
						// console.log('Up');
						this.player.animations.play('run_up');
						this.direction = 'up';
					} else {
						// console.log('Left');
						this.player.animations.play('run_left');
						this.direction = 'left';
					}
				} else {
					switch (this.direction) {
						case 'up':
							this.player.animations.play('idle');
							break;
						case 'down':
							this.player.animations.play('idle');
							break;
						case 'left':
							this.player.animations.play('idle_left');
							break;
						case 'right':
							this.player.animations.play('idle_right');
							break;
						default:
					}
					// this.player.animations._anims.run_down.speed = 19;
					this.player.body.velocity.set(0);
					this.pyfootsteps.stop();
				}
			} else {
				// Keyboard Movement
				if (this.button_A.isDown || this.button_D.isDown || this.button_W.isDown || this.button_S.isDown) {
					if (this.button_W.isDown) {
						this.direction = 'up';
						// this.player.animations._anims.run_down.speed = 15;
						this.player.body.velocity.y = -this.playerSpeed;

						if (!this.button_A.isDown && !this.button_D.isDown) {
							this.player.animations.play('run_up');
						}
						// console.log(this.player.animations._anims.run_up.speed);
					} else if (this.button_S.isDown) {
						this.direction = 'down';
						// this.player.animations._anims.run_down.speed = 15;

						this.player.body.velocity.y = this.playerSpeed;

						if (!this.button_A.isDown && !this.button_D.isDown) {
							this.player.animations.play('run_down');
						}

						// console.log(this.player.animations._anims.run_down.speed);
						// console.log('S DOWN');
					} else {
						// this.player.animations.play('idle');
						this.player.body.velocity.y = 0;
					}

					if (this.button_A.isDown) {
						// this.player.animations._anims.run_left.speed = 15;

						this.direction = 'left';

						if (this.button_W.isDown || this.button_S.isDown) {
							this.player.body.velocity.x = -this.playerSpeed / 2;
						} else {
							this.player.animations.play('run_left');
							this.player.body.velocity.x = -this.playerSpeed;
						}
					} else if (this.button_D.isDown) {
						// this.player.animations._anims.run_right.speed = 15;

						this.direction = 'right';

						if (this.button_W.isDown || this.button_S.isDown) {
							this.player.body.velocity.x = this.playerSpeed / 2;
						} else {
							this.player.animations.play('run_right');
							this.player.body.velocity.x = this.playerSpeed;
						}
					} else {
						// this.player.animations.play('idle');
						this.player.body.velocity.x = 0;
					}
				} else {
					this.player.body.velocity.y = 0;
					this.player.body.velocity.x = 0;

					// this.game.add
					// 	.tween(this.player.body.velocity)
					// 	.to({ x: 0 }, 100, Phaser.Easing.Circular.Out, true);

					// this.game.add
					// 	.tween(this.player.body.velocity)
					// 	.to({ y: 0 }, 100, Phaser.Easing.Circular.Out, true);

					// this.game.physics.arcade.computeVelocity(2, this.player.body, 20, 100, 20);

					// console.log(this.direction);
					switch (this.direction) {
						case 'up':
							// this.player.animations.play('idle');
							this.player.animations.stop();

							//      this.game.add
							// .tween(this.player.animations._anims.run_up)
							// .to({ speed: 0 }, 25, Phaser.Easing.Linear.None, true);

							break;

						case 'down':
							// this.player.animations.play('idle');
							this.player.animations.stop();

							// console.log(this.player.animations.frame);
							// if(this.player.animations.frame < 11){
							// 	this.player.animations.next();
							// } else {
							// 	this.player.animations.stop();
							// 	// this.player.animations.play('idle');
							// }

							// console.log(this.player.animations.frame);

							//   this.game.add
							// .tween(this.player.animations._anims.run_down)
							// .to({ speed: 0 }, 25, Phaser.Easing.Linear.None, true);

							break;
						case 'left':
							this.player.animations.stop();
							this.player.animations.play('idle_left');

							//   this.game.add
							// .tween(this.player.animations._anims.run_left)
							// .to({ speed: 0 }, 25, Phaser.Easing.Linear.None, true);

							break;
						case 'right':
							this.player.animations.stop();
						this.player.animations.play('idle_right');
						//  	this.game.add
						// .tween(this.player.animations._anims.run_right)
						// .to({ speed: 0 }, 25, Phaser.Easing.Linear.None, true);
						break;
						default:
					}
				}
			}
		}
	}
}