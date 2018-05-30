import Phaser from 'phaser';
import SlickUI from '../plugins/SlickUI';

var slickUI = null;

export default class extends Phaser.State {
	preload() {
		// this.slickUI = new SlickUI.default(this.game);
		// this.slickUI = this.game.plugins.add(SlickUI);
		slickUI = new SlickUI(game);
		console.log(this.slickUI);
        slickUI.load('assets/input/kenney/kenney.json');
	}

	create() {
		// console.log(bla);
        // this.slickUI = this.game.plugins.add(bla);
        // console.log(this.slickUI);
		// console.log(SlickUI);

		var panel;

		slickUI.add(panel = new slickUI.Panel(game, 8, 8, game.width - 16, game.height - 16));
		
        panel.add(new slickUI.Text(game,10,10, "Text input")).centerHorizontally().text.alpha = 0.5;
		panel.add(new slickUI.Text(game,12,34, "Your name"));
		
		var textField = panel.add(new slickUI.TextField(game,10,58, panel.width - 20, 40));
		
        textField.events.onOK.add(function () {
            alert('Your name is: ' + textField.value);
        });
        textField.events.onToggle.add(function (open) {
            console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
        });
        textField.events.onKeyPress.add(function(key) {
            console.log('You pressed: ' + key);
        });
		
		
	}

	update() {
    }
}
