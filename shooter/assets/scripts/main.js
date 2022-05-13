let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, PreloadScene, StartScene,GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    playerMoveSpeed: 250
};

let game = new Phaser.Game(config);