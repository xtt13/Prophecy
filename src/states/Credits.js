/* globals __DEV__ */
import Phaser from 'phaser';

export default class extends Phaser.State {
    init() {

    }

    create() {

        // this.addVillageGlimmer = this.game.add.emitter(this.game.camera.width/2, this.game.camera.height/2, 2000);
		// this.addVillageGlimmer.width = this.game.camera.width;
		// this.addVillageGlimmer.height = this.game.camera.height;
		// this.addVillageGlimmer.minParticleScale = 5;
		// this.addVillageGlimmer.gravity = 0;
		// this.addVillageGlimmer.setYSpeed(-4, 4);
		// this.addVillageGlimmer.setXSpeed(-4, 4);
		// this.addVillageGlimmer.maxRotation = 0;
		// this.addVillageGlimmer.minRotation = 0;
		// this.addVillageGlimmer.setAlpha(0, 1, 10000, Phaser.Easing.Exponential.In, true);
		// this.addVillageGlimmer.makeParticles('particle');
        // this.addVillageGlimmer.start(false, 10000, 1, 0);

        let emitter = this.game.add.emitter(-500, 0, 400);
		emitter.fixedToCamera = true;
		emitter.width = this.game.camera.width * 2;
		emitter.angle = -30;
		emitter.makeParticles('rain');
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setYSpeed(200, 310);
		emitter.setXSpeed(-5, 5);
		emitter.minRotation = 180;
		emitter.maxRotation = 0;
		emitter.gravity = 200;
		emitter.start(false, 2500, 1, 0);

		this.autumnGlimmerEmitter = this.game.add.emitter(-500, 0, 150);
		this.autumnGlimmerEmitter.fixedToCamera = true;
		this.autumnGlimmerEmitter.width = this.game.world.bounds.width;
		this.autumnGlimmerEmitter.height = this.game.world.bounds.height;
		this.autumnGlimmerEmitter.minParticleScale = 0.1;
		this.autumnGlimmerEmitter.maxParticleScale = 0.5;
		this.autumnGlimmerEmitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
		this.autumnGlimmerEmitter.setYSpeed(300);
		this.autumnGlimmerEmitter.setXSpeed(-300, 300);
		this.autumnGlimmerEmitter.minParticleScale = 0.25;
		this.autumnGlimmerEmitter.maxParticleScale = 1;
		this.autumnGlimmerEmitter.gravity = 0.5;
		this.autumnGlimmerEmitter.minRotation = 25;
		this.autumnGlimmerEmitter.setAlpha(0.5, 1);
		this.autumnGlimmerEmitter.makeParticles('glimmerParticle');
        this.autumnGlimmerEmitter.start(false, 5000, 5, 0);
        
        
        

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
                }, 5000, 'Linear', true, 0);

            this.logoTween.onComplete.add(() => {
                this.textFade('Development', 'Michael Dorn');

                this.game.time.events.add(10000, () => {
                    this.textFade('Game Art', 'Kang Wang\nSabine Rimmer\nNina Leinwatter\nCarina Bichler\nIsabella Griessenberger');
                }, this);

                this.game.time.events.add(20000, () => {
                    this.textFade('Sound and Music', 'Roland K$stler');
                }, this);

                this.game.time.events.add(30000, () => {
                    this.textFade('Project Management', 'Manuela Abdalla');
                }, this);

                this.game.time.events.add(40000, () => {
                    this.textFade('Story', 'Lia Lembacher');
                }, this);

                this.game.time.events.add(50000, () => {
                    this.textFade('Video', 'Jan Rogner');
                }, this);

                this.game.time.events.add(60000, () => {
                    this.textFade('Social Media', 'Felix Kirsch');
                }, this);

                this.game.time.events.add(70000, () => {
                    this.textFade('Voices', 'Priest: Samuel Luftensteiner \n Smith: Michael Hauptmann');
                }, this);

                this.game.time.events.add(80000, () => {
                    this.textFade('Special Thanks To:', 'Richard Davey (Phaser)\nColinvella (Tilemap Plus)');
                }, this);

                this.game.time.events.add(90000, () => {
                    this.textFade('Thank You!', 'For playing Prophecy of the Fallen!');
                }, this);

                this.game.time.events.add(100000, () => {
                    // Redirect Menu
                    this.state.start('MainMenu', true, false);
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
        this.textImage.anchor.setTo(0.5, 0);
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