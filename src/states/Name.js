import Phaser from 'phaser';
import SlickUI from '../plugins/SlickUI';

var slickUI = null;

export default class extends Phaser.State {
	preload() {
		slickUI = new SlickUI(game);
        slickUI.load('assets/input/kenney/kenney.json');
	}

	create() {


		var panel;

		slickUI.add(panel = new slickUI.Panel(game, 8, 8, game.width - 16, game.height - 16));
		
        // panel.add(new slickUI.Text(game,10,10, "Text input")).centerHorizontally().text.alpha = 0.5;
		// panel.add(new slickUI.Text(game,12,34, "Your name"));
		
		// var textField = panel.add(new slickUI.TextField(game,10,58, panel.width - 20, 40));

		var cb1, cb2;
		panel.add(cb1 = new slickUI.Checkbox(game, 20 , 100, slickUI.Checkbox.TYPE_RADIO));
		panel.add(cb2 = new slickUI.Checkbox(game, 20 , 150, slickUI.Checkbox.TYPE_RADIO));
		panel.add(new slickUI.Checkbox(game, 100, 100));
		

        cb1.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb2.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb1.checked = true;
            }
        }, this);
		
        cb2.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb1.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb2.checked = true;
            }
        }, this);

				
	}

	update() {
    }
}
