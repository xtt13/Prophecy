/*eslint-disable */
import config from './../../config';
import Lucy from '../beings/Lucy';
import EndbossHead from '../beings/EndbossHead';

export default class {
	constructor(game, level, currentMap) {
        this.game = game;
        this.level = level;
        
        this[currentMap]();

        // this.bringBranchToTop = false;
        

	}

	map1() {
        if (!this.level.questManager.checkIfQuestWasDone(1)){
            this.branch = this.game.add.sprite(1123, 460, 'branch');
            this.branch.anchor.set(0.5);
            this.bringBranchToTop = true;            
            console.log('WTF');
        } else {
            
            this.branch = this.game.add.sprite(1120, 608, 'branch');
            this.branch.anchor.set(0.5);
            this.bringBranchToTop = false;
        }

        if (this.level.questManager.checkIfQuestExists(2)){
            this.level.player.movable = false;
        }

        console.log(this.level.questManager.checkIfQuestWasDone(1), this.level.questManager.checkIfQuestExists(2));
        if (this.level.questManager.checkIfQuestWasDone(1) && this.level.questManager.checkIfQuestExists(2)){
            this.game.time.events.add(Phaser.Timer.SECOND * 5, () => {
                this.level.GUICLASS.createMessage([' I am Lucy ...', ' Dash now!'], false, true);
                this.level.questManager.addQuest(3);
            });
        }

        if (this.level.questManager.checkIfQuestExists(2)){
            this.level.lucy = new Lucy(this.game, this.level.player.x - 500, this.level.player.y, this.level)
        } else if(this.level.questManager.checkIfQuestWasDone(2)){
            this.level.lucy = new Lucy(this.game, this.level.player.x, this.level.player.y - 20, this.level)
        } else {

        }


        

        if (!this.level.questManager.checkIfQuestWasDone(1)) {
			this.game.camera.flash(0x000000, 8000, true);
        }
        
        this.island = this.game.add.sprite(878, 227, 'island');
        this.island.anchor.set(0.5);
        this.island.scale.setTo(0.8);
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
    }
    
    map2() {
    }

    map2update(){
        this.game.world.bringToTop(this.level.fountainSparkling);
    }

    map3(){

    }

    map3update(){

    }

    map4(){

    }

    map4update(){
        this.door = this.game.add.sprite(253, -12, 'templeDoor');
        this.door.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 8, true);
        this.door.animations.add('idle', [17], 1, true);
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
        this.endBoss = this.game.add.sprite(497, 0, 'endBoss');
        this.endBoss.scale.setTo(1.1, 1);
        this.endBoss.anchor.set(0.5);

        this.endBossNeck = this.game.add.sprite(472, -130, 'endBossNeck');
        this.endBossNeck.anchor.set(0.5, 0);
        // this.endBossNeck.tint = 0xFF0000;

        this.endBossHeadShadow = this.game.add.sprite(472, 0, 'endBossHeadShadow');
        this.endBossHeadShadow.anchor.set(0.5);

        this.endBossClaw1 = this.game.add.sprite(428, -145, 'endBossClaw1');
        this.endBossClaw1.anchor.set(1, 0);

        this.endBossClaw2 = this.game.add.sprite(518, -145, 'endBossClaw2');
        this.endBossClaw2.anchor.set(0, 0);

        

        this.endBossHead = new EndbossHead(this.game, 472, -90, this.level.player, this);


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
        this.endBossHeadShadow.rotation = this.endBossHead.rotation;
        this.game.world.bringToTop(this.endBossHead);

        
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
    
    update(){
        this[this.level.currentMap + 'update']();
    }

	
}
