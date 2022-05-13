class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }
    preload() {
        this.load.atlas('dragon', 'assets/sprites/dragon.webp', 'assets/sprites/dragon.json')
    }
    create() {
        this.scene.start('Start')
    }
}