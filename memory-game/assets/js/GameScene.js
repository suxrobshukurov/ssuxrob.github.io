class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        this.load.image('bg', 'assets/sprites/background.webp');
        this.load.image('card', 'assets/sprites/card.webp');
    }
    create() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        let positions = this.getCardsPositions()

        for (let position of positions) {
            this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
        }

    }
    getCardsPositions() {
        let positions = []
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardGap = config.cardGap;
        let cardWidth = cardTexture.width + cardGap;
        let cardHeight = cardTexture.height + cardGap;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2;
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2;

        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight
                })
            }
        }
        return positions;
    }
}
