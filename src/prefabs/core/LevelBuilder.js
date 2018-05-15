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

    }

    map10update(){
        
    }

    map11(){

    }

    map11update(){
        
    }
    
    update(){
        this[this.level.currentMap + 'update']();
    }

	
}
