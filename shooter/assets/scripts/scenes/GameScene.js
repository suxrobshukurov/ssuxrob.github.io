class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.createBackground()
        this.add.sprite(150, this.sys.game.config.height / 2, 'dragon', 'dragon3')
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }
}