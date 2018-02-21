import Phaser from 'phaser';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.setup();
	}

	setup() {
		this.test = navigator.getBattery().then(function(battery) {
			updateLevelInfo();
			updateChargeInfo();

			battery.addEventListener('chargingchange', function() {
				updateChargeInfo();
			});

			function updateChargeInfo() {
				console.log('Battery charging? ' + (battery.charging ? 'Yes' : 'No'));
			}

			battery.addEventListener('levelchange', function() {
				updateLevelInfo();
			});

			function updateLevelInfo() {
				console.log('Battery level: ' + battery.level * 100 + '%');

				if (battery.level < 25) {
					if (typeof ipc !== 'undefined') {
						let myNotification = new Notification('Battery', {
							body: '🔋 Your Battery Level is low!',
							silent: true
						});
					} else {
						// this.level.GUICLASS.createNotification('Battery', '🔋 Your Battery Level is low!');
						return 'HIHIHI';
					}
				}
			}
		});
		console.log('HELLO');
		console.log(navigator);
		console.log(this.test);
		console.log(this.test.catch());
	}
}
