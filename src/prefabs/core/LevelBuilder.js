/*eslint-disable */
import config from './../../config';
import Lucy from '../beings/Lucy';
import EndbossHead from '../beings/EndbossHead';
import dialogues from './../../dialogues';

export default class {
	constructor(game, level, currentMap) {
        this.game = game;
        this.level = level;
        
        this[currentMap]();

        // this.bringBranchToTop = false;
        

	}

	map1() {

        this.sleeping = true;
        this.standUpApproval = false;

        console.log(this.level.gameData.targetID);
        if(this.level.gameData.targetID == undefined || this.level.gameData.targetID == 1){
            this.level.player.movable = false;
            this.standUpApproval = true;
            this.level.player.animations.play('sleep');
        }

        if( this.level.gameData.targetID == 3){
            this.level.player.animations.play('sleep');
        }
       

        if (!this.level.questManager.checkIfQuestWasDone(1)){
            this.branch = this.game.add.sprite(1131, 1210, 'branch');
            this.branch.anchor.set(0.5);
            this.bringBranchToTop = true;     
            // this.branch.alpha = 0;       
        } else {
            
            this.branch = this.game.add.sprite(1131, 1210, 'branch');
            this.branch.anchor.set(0.5);
            this.bringBranchToTop = false;
            this.branch.alpha = 0;
        }

        if (this.level.questManager.checkIfQuestExists(2)){
            this.level.player.movable = false;
        }
        

        if (this.level.questManager.checkIfQuestWasDone(1) && this.level.questManager.checkIfQuestExists(2)){

            this.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                this.level.player.animations.play('standUpFast');
            }, this);

            this.game.time.events.add(Phaser.Timer.SECOND * 4, () => {
                this.level.inputClass.direction = 'up';
                this.level.player.animations.play('static_idle_up');
            }, this);

            this.game.time.events.add(Phaser.Timer.SECOND * 5, () => {

                let messageID = 1;
                const all_messages = Object.values(dialogues.dialogues);
                for (let i = 0; i < all_messages.length; i++) {
                    if (i + 1 == messageID) {
        
                        const message = all_messages[i];
        
                        this.level.GUICLASS.createMessage(message, false, true);
                        break;
                    }
                }

                this.level.questManager.removeQuest(2);
                this.level.questManager.addQuest(3);
                
            }, this);
        }

        if (this.level.questManager.checkIfQuestExists(2)){
            this.game.camera.flash(0x000000, 10000, true);
            this.level.lucy = new Lucy(this.game, this.level.player.x, this.level.player.y - 500, this.level)
        } else if(this.level.questManager.checkIfQuestWasDone(2)){
            this.level.lucy = new Lucy(this.game, this.level.player.x, this.level.player.y - 20, this.level)
        } else {

        }


        

        // if (!this.level.questManager.checkIfQuestWasDone(1)) {
		// 	this.game.camera.flash(0x000000, 8000, true);
        // }
        
        // this.island = this.game.add.sprite(1100, 227, 'island');
        // this.island.anchor.set(0.5);
        // this.island.scale.setTo(0.8);
        // this.islandTween = this.game.add
        // 		.tween(this.island)
        // 		.to({ y: this.island.y + 2.5 }, 2000, Phaser.Easing.Back.Out, true, 0, 0, true)
        // 		.loop();
        // this.game.add
        // 		.tween(this.island)
        // 		.to({ x: this.island.x + 2.5 }, 2000, Phaser.Easing.Back.Out, true, 0, 0, true)
        // 		.loop();

        
    }

    map1update(){
        if(this.bringBranchToTop){
            this.game.world.bringToTop(this.branch);
        
        }     
        if(this.level.items[0] !== undefined){
            this.game.world.bringToTop(this.level.items[0]);
        }
        
        this.game.world.bringToTop(this.level.templeFliesEmitter);
        this.game.world.bringToTop(this.level.fountainSparkling);

        if (this.level.inputClass.button_A.isDown || this.level.inputClass.button_D.isDown || this.level.inputClass.button_W.isDown || this.level.inputClass.button_S.isDown) {
            if(!this.sleeping) return;
            if(!this.standUpApproval) return;

            this.sleeping = false;
            this.level.player.animations.play('standUp');
            this.level.player.animations._anims.standUp.onComplete.add(() => {
                this.level.player.movable = true;
            }, this);
        }
        
    }
    
    map2() {
    }

    map2update(){
        this.game.world.bringToTop(this.level.emberEmitter);
    }

    map3(){

    }

    map3update(){
        this.game.world.bringToTop(this.level.fountainSparkling);
    }

    map4(){
        this.templeDoor = this.game.add.sprite(253, -12, 'templeDoor');
        this.templeDoor.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 18, true);
        this.templeDoor.animations.add('idle', [39], 1, true);
        this.game.physics.enable(this.templeDoor);
        this.templeDoor.body.immovable = true;
    }

    map4update(){
        // this.game.world.setChildIndex(this.templeDoor, 10);

        if(this.level.eventManager.templeDoorOpen){
            this.game.world.setChildIndex(this.templeDoor, 1);
        } else {
            this.game.physics.arcade.collide(this.level.player, this.templeDoor);
            this.game.world.setChildIndex(this.templeDoor, 10);
        }
    }

    map5(){

    }

    map5update(){

    }

    map6(){

    }

    map6update(){
        
    }

    map7(){

    }

    map7update(){
        
    }

    map8(){

    }

    map8update(){
        
    }

    map9(){

        this.level.GUICLASS.healthBar.healthBarGroup.scale.setTo(1.5);
        this.level.GUICLASS.healthBar.healthBarGroup.x = 0;
        this.level.GUICLASS.healthBar.healthBarGroup.y = -140;

        console.log(this.game.camera);


        this.deadSprouts = 0;

        this.headGroup = this.game.add.group();

        this.endBoss = this.game.add.sprite(497, 0, 'endBoss');
        this.endBoss.scale.setTo(1.1, 1);
        this.endBoss.anchor.set(0.5);

        this.endBossNeck = this.game.add.sprite(472, -130, 'endBossNeck');
        this.endBossNeck.anchor.set(0.5, 0);
        // this.endBossNeck.tint = 0xFF0000;

        this.endBossHeadShadow = this.game.add.sprite(472, 0, 'endBossHeadShadow');
        this.endBossHeadShadow.anchor.set(0.5);

        this.endBossClaw1 = this.game.add.sprite(370, -145, 'endBossClaw1');
        // this.endBossClaw1.anchor.set(1, 0);
        this.headGroup.add(this.endBossClaw1);
        // this.endBossClaw1.anchor.set(3, 0);
        // this.endBossClaw1.x += 100;

        this.endBossClaw2 = this.game.add.sprite(518, -145, 'endBossClaw2');
        // this.endBossClaw2.anchor.set(0, 0);
        this.headGroup.add(this.endBossClaw2);

        

        this.endBossHead = new EndbossHead(this.game, 472, -90, this.level.player, this);
        this.headGroup.add(this.endBossHead);

        this.headGroup.x = 410;
        this.headGroup.y = 400;

        this.headGroup.pivot.x = 420;
        this.headGroup.pivot.y = 420;
        // this.headGroup.pivot.set(20);

        this.headGroupIdle = this.game.add.tween(this.headGroup).to(
            {y: this.headGroup.y + 20}
        , 5000, 'Linear', true, 0, 0, true).loop();


        this.bossMovement = this.game.add.tween(this.endBoss).to(
            {y: this.endBoss.y + 470}
        , 12000, 'Linear', true, 0, 0, false);
        this.game.camera.shake(0.0015, 12000, true);

        this.bossNeckMovement = this.game.add.tween(this.endBossNeck).to(
            {y: this.endBossNeck.y + 470}
        , 12000, 'Linear', true, 0, 0, false);
        this.game.camera.shake(0.0015, 12000, true);

        this.bossClaw1Movement = this.game.add.tween(this.endBossClaw1).to(
            {y: this.endBossClaw1.y + 470}
        , 12000, 'Linear', true, 0, 0, false);
        this.game.camera.shake(0.0015, 12000, true);

        this.bossClaw2Movement = this.game.add.tween(this.endBossClaw2).to(
            {y: this.endBossClaw2.y + 470}
        , 12000, 'Linear', true, 0, 0, false);
        this.game.camera.shake(0.0015, 12000, true);

        this.endBossHeadShadowMovement = this.game.add.tween(this.endBossHeadShadow).to(
            {y: this.endBossHeadShadow.y + 470}
        , 12000, 'Linear', true, 0, 0, false);
        this.game.camera.shake(0.0015, 12000, true);

        this.bossMovement.onComplete.add(() => {
            for (let i = 0; i < this.level.enemies.length; i++) {
                const sprout = null;
                if(this.level.enemies[i].type == 'sprout'){
                    this.level.enemies[i].addLevelBuilder(this);
                    this.level.enemies[i].grow();
                }   
                
                this.game.add.tween(this.endBoss.scale).to(
                    {x: 1.05, y: 1}
                , 5000, 'Linear', true, 0, 0, true).loop();
            }
        }, this);

        this.bossHeadMovement = this.game.add.tween(this.endBossHead).to(
            {y: this.endBossHead.y + 470}
        , 12000, 'Linear', true, 0, 0, false);
    }

    map9update(){
        this.headGroup.rotation = (this.game.physics.arcade.angleToXY(this.headGroup, this.level.player.x, this.level.player.y) - 1.5)/3;
        // this.headGroup.rotation = (this.game.physics.arcade.angleToXY(this.endBossHead, this.level.player.x, this.level.player.y));
        // this.headGroup.angle += 1;
        
        // this.endBossHeadShadow.x = this.headGroup.x;
        // this.endBossHeadShadow.y = this.headGroup.y;

        this.endBossHeadShadow.rotation = this.headGroup.rotation;
        this.game.world.bringToTop(this.headGroup);

        // this.headGroup.children.forEach((sprite) => {
        //     this.game.debug.body(sprite);
        // });

        
    }

    map10(){


        this.bossDoor = this.game.add.sprite(321, 960, 'bossDoor');
        this.game.physics.enable(this.bossDoor);
        this.bossDoor.body.immovable = true;
        this.bossDoor.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 8, true);
        this.bossDoor.animations.add('close', [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 8, true);
        this.bossDoor.animations.add('idle', [32], 1, true);

        // this.game.renderer.renderSession.roundPixels = true;
        // console.log(this.game.renderer.renderSession);

        // if(this.level.gameData.targetID == 3){
        //     this.bossDoor.animations.play('open', 100, false);
        // }

    }

    map10update(){
        if(this.level.eventManager.bossDoorOpen){
            this.game.world.setChildIndex(this.bossDoor, 14);
        } else {
            this.game.physics.arcade.collide(this.level.player, this.bossDoor);
            this.game.world.setChildIndex(this.bossDoor, 10);
        }

        this.game.world.bringToTop(this.level.templeFliesEmitter);
        
    }

    map11(){
        
    }

    map11update(){
        
    }

    map12(){
        
    }

    map12update(){
        
    }

    map13(){
        
    }

    map13update(){
        
    }

    map14(){
        
    }

    map14update(){
        
    }

    map15(){
        
    }

    map15update(){
        
    }

    map16(){
        
    }

    map16update(){
        
    }
    
    update(){
        this[this.level.currentMap + 'update']();
    }

	
}
