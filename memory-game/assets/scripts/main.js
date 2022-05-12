let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    rows: 2,
    cols: 5,
    cardGap: 5,
    cards: [1, 2, 3, 4, 5],
    gameTimeout: 30,
    scene: new GameScene()
}

let game = new Phaser.Game(config);