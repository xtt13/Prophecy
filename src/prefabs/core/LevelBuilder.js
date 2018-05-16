/*eslint-disable */
import config from './../../config';
import Lucy from '../beings/Lucy';

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
        // 		.to({ y: this.island.y + 2.5 }, 2000, 'Linear', true, 0, 0, true)
        // 		.loop();
        // this.game.add
        // 		.tween(this.island)
        // 		.to({ x: this.island.x + 2.5 }, 2000, 'Linear', true, 0, 0, true)
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

    }

    map9update(){
        
    }

    map10(){


        this.bossDoor = this.game.add.sprite(321, 960, 'bossDoor');
        this.game.physics.enable(this.bossDoor);
        this.bossDoor.body.immovable = true;
        this.bossDoor.animations.add('open', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 8, true);
        this.bossDoor.animations.add('close', [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 8, true);
        this.bossDoor.animations.add('idle', [32], 1, true);

        // if(this.level.gameData.targetID == 3){
        //     this.bossDoor.animations.play('open', 100, false);
        // }

    }

    map10update(){
        if(this.level.eventManager.bossDoorOpen){
            this.game.world.setChildIndex(this.bossDoor, 20);
        } else {
            this.game.physics.arcade.collide(this.level.player, this.bossDoor);
            this.game.world.setChildIndex(this.bossDoor, 10);
        }
        
    }

    map11(){
        
    }

    map11update(){
        
    }
    
    update(){
        this[this.level.currentMap + 'update']();
    }

	
}
