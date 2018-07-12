/* globals __DEV__ */
import Phaser from 'phaser';

export default class extends Phaser.State {
    init() {

    }

    create() {

        console.log(this.game);

        this.game.musicPlayer.playMusic('MxTrailer');

        this.game.camera.flash(0x000000, 8000);

        this.logo = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2 - 10, 'logo');
        this.logo.anchor.set(0.5);
        // this.logo.scale.setTo(0.2);
        this.logo.smoothed = false;


        this.game.time.events.add(4000, () => {

            this.logoTween = this.game.add
                .tween(this.logo)
                .to({
                    alpha: 0
                }, 5000, Phaser.Easing.Exponential.In, true, 0);

            this.logoTween.onComplete.add(() => {
                this.textFade('Development', 'Michael Dorn');

                this.game.time.events.add(10000, () => {
                    this.textFade('Sound', 'Roland K$stler');
                }, this);


                this.game.time.events.add(20000, () => {
                    this.textFade('Game Art', 'Kang Wang');
                }, this);

            }, this);



        }, this);


    }

    // Dauer 
    textFade(headline, text) {
        this.headline = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        this.headline.setText(headline, true, -1, 5, 'left', true);

        this.text = game.add.retroFont('carinaFont', 7, 7, Phaser.RetroFont.TEXT_SET1, 18, 0, 2, 0, 1);
        this.text.setText(text, true, -1, 5, 'left', true);

        this.headlineImage = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 - 50, this.headline);
        this.headlineImage.anchor.setTo(0.5);
        this.headlineImage.alpha = 0;
        this.headlineImage.scale.set(2);

        this.textImage = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 - 20, this.text);
        this.textImage.anchor.setTo(0.5);
        this.textImage.alpha = 0;
        this.textImage.scale.set(1);

        this.fadeInTweenHeadline = this.game.add
            .tween(this.headlineImage)
            .to({
                alpha: 1
            }, 5000, Phaser.Easing.Exponential.In, true, 0);

        this.game.time.events.add(1000, () => {
            this.fadeInTweenText = this.game.add
                .tween(this.textImage)
                .to({
                    alpha: 1
                }, 4000, Phaser.Easing.Exponential.In, true, 0);
        }, this);


        this.game.time.events.add(5000, () => {
            this.fadeOutTweenHeadline = this.game.add
                .tween(this.headlineImage)
                .to({
                    alpha: 0
                }, 5000, Phaser.Easing.Exponential.In, true, 0);

            this.fadeOutTweenText = this.game.add
                .tween(this.textImage)
                .to({
                    alpha: 0
                }, 5000, Phaser.Easing.Exponential.In, true, 0);

        }, this);

    }

    update() {}

    render() {

        // Debugging
        // if (__DEV__) {


        // }
    }

}