import Phaser from 'phaser';

export default class {
	constructor(game, level) {
		this.game = game;
		this.level = level;

		this.setup();
	}

	setup() {
		this.batteryPromise = navigator.getBattery().then(function(battery) {
			updateLevelInfo();
			updateChargeInfo();


			battery.addEventListener('chargingchange', function() {
				updateChargeInfo();
			});

			function updateChargeInfo() {
				console.log('Battery charging? ' + (battery.charging ? 'Yes' : 'No'));
				return battery
			}

			battery.addEventListener('levelchange', function() {
				updateLevelInfo();
			});

			function updateLevelInfo() {
				console.log('Battery level: ' + battery.level * 100 + '%');
				return battery

			}

			return battery

		}).then(battery => {
			console.log(battery);

	    	if(battery.level * 100 < 25 && !battery.charging){
	    		if (typeof ipc !== 'undefined') {
						let myNotification = new Notification('Battery', {
							body: '🔋 Your Battery Level is low!',
							silent: true
						});
					} else {

						this.level.GUICLASS.createNotification('Battery', '🔋 Your Battery Level is low!');
						
				}
	    	}
	    
		});

	}
}
