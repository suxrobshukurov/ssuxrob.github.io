class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.createBackground();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this);
    }
    update() {
        this.player.move();
        this.bg.tilePositionX += 0.8;
    }
    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0, 0);
        console.log(this.bg);

    }
}