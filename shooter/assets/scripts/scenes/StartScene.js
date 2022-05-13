class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }
    create() {
        this.createBackground();
        this.createText();
        this.setEvents();
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }
    createText() {
        this.add.text(this.sys.game.config.width / 2, 550, "Tap To Start", {
            font: '80px CourseCasual',
            fill: '#ffffff',
        }).setOrigin(0.5);
    }
    setEvents() {
        this.input.on('pointerdown', () => this.scene.start('Game'))
    }
}