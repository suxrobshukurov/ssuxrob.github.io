class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        console.log('BootScene.preload');
        this.load.image('bg', 'assets/sprites/background.png');
    }
    create() {
        console.log('BootScene.create');
        this.scene.start('Preload');
    }
}