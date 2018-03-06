import Phaser from 'phaser';

export default class extends Phaser.State {
	init() {
		// Boot Log
		// console.log('%c Boot it up! ', 'background: #0061ff; color: #bada55');
	}

	create() {

		this.game.camera.flash(0x000000, 2000);

		this.menuText = this.game.add.bitmapText(
			this.game.camera.width / 2,
			this.game.camera.height / 2,
			'pxlfont',
			'Delta Storm',
			30
		);
		this.menuText.anchor.set(0.5);

		this.subText = this.game.add.bitmapText(
			this.game.camera.width / 2,
			this.game.camera.height / 2 + 40,
			'pxlfont',
			'presents',
			10
		);
		this.subText.smoothed = false;
		this.subText.anchor.set(0.5);

		let isSafari =
			navigator.vendor &&
			navigator.vendor.indexOf('Apple') > -1 &&
			navigator.userAgent &&
			!navigator.userAgent.match('CriOS');

		if (!isSafari && typeof ipc == 'undefined') {
			this.input.onDown.add(this.toggleFullScreen, this);
			this.input.onTap.add(this.toggleFullScreen, this, null, 'onTap');
		}

		this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
			this.game.camera.fade(0x000000, 2000, true);
			this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
				this.state.start('MainMenu', true, false);
			});
		});

	}

	preload() {}

	update() {
		
	}

	toggleFullScreen() {
		this.game.scale.startFullScreen(false, false);
	}
}
