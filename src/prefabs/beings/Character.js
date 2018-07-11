import Phaser from 'phaser';
import dialogues from './../../dialogues';
import dialoguesVillager from './../../dialoguesVillager';

export default class extends Phaser.Sprite {
	constructor(game, element, player, level) {
		super(game, element.x, element.y + (element.height / 2), element.properties.character);
		// console.log(element);
		this.game = game;
		this.id = element.properties.id;
		this.name = element.properties.character;
		this.player = player;
		this.level = level;
		this.health = 100;
		this.radius = 60;
		this.randomMovement = true;
		this.anchor.setTo(0.5);

		this.talkSwitch = false;

		

		this.game.physics.enable(this);
		this.body.immovable = true;
		this.body.drag.set(90);

		// console.log(this);

		this.talkSymbol = this.game.add.sprite(this.body.x + 5, this.body.y - 30, 'characterTalk');
		this.talkSymbol.smoothed = false;
		this.talkSymbol.alpha = 0;
		this.talkSymbol.animations.add('play');
		this.talkSymbol.animations.play('play', 2, true);

		// setSize(width, height, offsetX, offsetY)
		switch (element.properties.character) {
			case 'priest':
				this.body.setSize(10, 15, 5, 20);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'smith':
				this.body.setSize(15, 15, 9, 26);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'botanist':
				this.body.setSize(15, 15, 5, 30);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'veteran':
				this.body.setSize(10, 20, 11, 22);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'librarian':
				this.body.setSize(10, 10, 5, 28);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'woman1':
				this.body.setSize(80, 20, -30, 20);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'woman2':
				this.body.setSize(10, 10, 4, 27);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'girl1':
				this.body.setSize(10, 10, 2, 20);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'girl2':
				this.body.setSize(10, 10, 2, 20);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'girl3':
				this.body.setSize(10, 10, 2, 18);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [1], 1, false);
				this.animations.add('left', [3], 1, false);
				this.animations.add('right', [2], 1, false);
				break;
			case 'fisher':
				this.body.setSize(10, 10, 25, 25);
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [0], 1, false);
				this.animations.add('left', [0], 1, false);
				this.animations.add('right', [0], 1, false);

				// Length, xAnchor, yAnchor
				this.fishingLine(120, this.x - 22, this.y - 18);
				break;
			case 'oracle':
				this.animations.add('down', [0], 1, false);
				this.animations.add('up', [0], 1, false);
				this.animations.add('left', [0], 1, false);
				this.animations.add('right', [0], 1, false);
				this.radius = 150;
				this.talkSymbol.x = this.body.x + 5;
				this.talkSymbol.y = this.body.y - 65;
				this.body.setSize(10, 10, 25, 25);
				this.floatTween = this.game.add
					.tween(this)
					.to({ y: this.y - 2 }, 2000, 'Linear', true, 0, 0, true)
					.loop();
				break;
			default:
				this.body.setSize(10, 15, 0, 0);
		}

		this.movementX = this.x + 100;
		this.movementY = this.y + 100;

		this.runIdleLoop();

		game.add.existing(this);
	}

	runIdleLoop(){
		this.idleLoop = this.game.time.events.loop(this.game.rnd.integerInRange(2000, 5000), () => {
			this.randomDirection();
		}, this);
	}

	stopIdleLoop(){
		this.game.time.events.remove(this.idleLoop);
	}

	fishingLine(length, xAnchor, yAnchor){
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.gravity.y = 600;

		var lastRect;
		var height = 4;        //  Height for the physics body - your image height is 8px
		var width = 8;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
		var maxForce = 20000;   //  The force that holds the rectangles together.
		var newRect;
	
		for (var i = 0; i <= length; i++)
		{
			var x = xAnchor;                    //  All rects are on the same x position
			var y = yAnchor + (i * height);     //  Every new rect is positioned below the last
	
			if (i % 2 === 0)
			{
				//  Add sprite (and switch frame every 2nd time)
				newRect = this.game.add.sprite(x, y, 'fishingLineChain', 1);
				newRect.smoothed = false;
			}   
			else
			{
				newRect = this.game.add.sprite(x, y, 'fishingLineChain', 0);
				newRect.smoothed = false;
				lastRect.bringToTop();
			}
	
			//  Enable physicsbody
			this.game.physics.p2.enable(newRect, false);
	
			//  Set custom rectangle
			newRect.body.setRectangle(width, height);
	
			if (i === 0)
			{
				newRect.body.static = true;
			}
			else
			{  
				//  Anchor the first one created
				newRect.body.velocity.x = 50;      //  Give it a push :) just for fun
				newRect.body.mass = length / i;     //  Reduce mass for evey rope element
			}
	
			//  After the first rectangle is created we can add the constraint
			if (lastRect)
			{
				this.game.physics.p2.createRevoluteConstraint(newRect, [0, -1], lastRect, [0, 1], maxForce);
			}
	
			lastRect = newRect;
	
		}
	}

	talk(){


		if(this.talkSwitch) return;
		this.talkSwitch = true;

		this.stopIdleLoop();
		this.player.talking = true;
		
		this.player.turnPlayer(this);

		let value = this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);

		if ((value > -2.5 && value < -0.5)) {
			this.animations.play('up');

		} else if (value > 1 && value < 2.5) {
			this.animations.play('down');

		} else if (value > -0.5 && value < 1) {
			this.animations.play('right');

		} else if (value > 2.5 || value < -2.5) {
			this.animations.play('left');
		}


		// let playerValue = this.game.physics.arcade.angleToXY(this.player, this.x, this.y);

		// if ((playerValue > -2.5 && playerValue < -0.5)) {
		// 	console.log('up');
		// 	this.level.GUICLASS.direction = 'up';
		// 	this.player.animations.play('up');

		// } else if (playerValue > 1 && playerValue < 2.5) {
		// 	console.log('down');
		// 	this.level.GUICLASS.direction = 'down';
		// 	this.player.animations.play('down');

		// } else if (playerValue > -0.5 && playerValue < 1) {
		// 	console.log('right');
		// 	this.level.GUICLASS.direction = 'right';
		// 	this.player.animations.play('right');

		// } else if (playerValue > 2.5 || playerValue < -2.5) {
		// 	console.log('left');
		// 	this.level.GUICLASS.direction = 'left';
		// 	this.player.animations.play('left');
		// }

		

		// Check if name is in quest, if true -> get dialogueID
		let resultdialogueID = this.level.questManager.checkQuestDialogue(this.name);
		let dialogueID = resultdialogueID[0];
		let newQuestID = resultdialogueID[1];
		let removeQuestID = resultdialogueID[2];

		console.log(resultdialogueID, dialogueID, newQuestID);

		if(newQuestID !== undefined && newQuestID !== false){
			if(!this.level.questManager.checkIfQuestWasDone(newQuestID)){
				this.level.questManager.addQuest(newQuestID);
				// this.level.questManager.removeCharacterDialogue(questID, this.name);
			} else {
				dialogueID = false;
			}
		}

		if(removeQuestID !== undefined && removeQuestID !== false){
			this.level.questManager.removeQuest(removeQuestID);
		}

		/////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////

		

		
		// this.voice.allowMultiple = true;
		


		switch (this.name) {
			case 'priest':
				
				break;

			case 'smith':
				this.voice = this.game.add.audioSprite('VxSmith');
				this.voice.play('vx1', 1);
				
				break;

			case 'botanist':
				this.rndVoice = this.game.rnd.pick(['vx1', 'vx2', 'vx3', 'vx4', 'vx5']);
				this.voice = this.game.add.audioSprite('VxBotanic');
				this.voice.play(this.rndVoice, 0.4);
				break;

			case 'veteran':
				
				break;

			case 'librarian':
				
				break;

			case 'woman1':
				
				break;

			case 'woman2':
				
				break;

			case 'girl1':
				
				break;

			case 'girl2':
				
				break;

			case 'girl3':
				
				break;

			default:
		}


		/////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////

		// If there's a number
		if (dialogueID !== undefined && dialogueID !== false) {

			// get all dialogues
			const all_messages = Object.values(dialoguesVillager.dialogues);

			// search for dialogue
			for (let i = 0; i < all_messages.length; i++) {
				if (i + 1 == dialogueID) {
					const message = all_messages[i];
					this.level.GUICLASS.createMessage(message, false, true);
					break;
				}
			}

		} else {
			let id;

			switch (this.name) {
				case 'priest':
					id = 10;
					break;
				case 'smith':
					id = 4;
					break;
				case 'botanist':
					id = 1;
					break;
				case 'veteran':
					id = 2;
					break;
				case 'librarian':
					id = 3;
					break;
				case 'woman1':
					id = 6;
					break;
				case 'woman2':
					id = 9;
					break;
				case 'girl1':
					id = 8;
					break;
				case 'girl2':
					id = 7;
					break;
				case 'girl3':
					id = 5;
					break;
				case 'fisher':
					id = 41;
					break;
				case 'oracle':
					id = 32;
					break;
				default:
			}

			// get all dialogues
			const all_messages = Object.values(dialoguesVillager.dialogues);

			// search for dialogue
			for (let i = 0; i < all_messages.length; i++) {
				if (i + 1 == id) {
					const message = all_messages[i];
					// this.animations.play('down');
					// this.game.time.events.remove(character.idleLoop);
					this.level.GUICLASS.createMessage(message, false, true);
					break;
				}
			}

			this.game.time.events.add(10000, () => {
				this.game.time.events.remove(this.vxLoop);
				this.talkSwitch = false;
				this.runIdleLoop();
			});

		}


	}

	randomDirection(){
		
		let rndNumber = this.game.rnd.integerInRange(0, 3);
		switch (rndNumber) {
			case 0:
				this.animations.play('down');
				break;
			
			case 1:
				this.animations.play('up');
				break;

			case 2:
				this.animations.play('left');
				break;

			case 3:
				this.animations.play('right');
				break;
		
			default:
				this.animations.play('down');
				break;
		}
		
	}

	update() {

		if(this.game.physics.arcade.distanceBetween(this, this.player) < this.radius){
			if(this.player.talking){
				this.talkSymbol.alpha = 0;
				return;
			}
			this.game.world.bringToTop(this.talkSymbol);
			// this.game.world.setChildIndex(this.talkSymbol, 30);
			this.talkSymbol.alpha = 1;
			// On E-click
			if(this.level.inputClass.button_E.isDown){
				this.talk();
			}	
		} else {
			this.talkSymbol.alpha = 0;
		}

		

		let angle = Math.ceil(this.game.physics.arcade.angleToXY(this.player, this.x, this.y));

		if (angle == 2 && this.y > this.player.body.y) {
			this.game.world.moveUp(this);
			// this.game.world.setChildIndex(this.player, 1);
		}
	}
}
