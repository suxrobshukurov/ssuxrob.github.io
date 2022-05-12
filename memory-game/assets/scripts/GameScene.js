class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        this.load.image('bg', 'assets/sprites/background.webp');
        this.load.image('card', 'assets/sprites/card.webp');
        this.load.image('card1', 'assets/sprites/card1.webp');
        this.load.image('card2', 'assets/sprites/card2.webp');
        this.load.image('card3', 'assets/sprites/card3.webp');
        this.load.image('card4', 'assets/sprites/card4.webp');
        this.load.image('card5', 'assets/sprites/card5.webp');
    }
    createText() {
        this.timeoutText = this.add.text(10, 330, "", {
            font: '36px CourseCasual',
            fill: '#ffffff',
        });
    }
    onTimerTick() {
        this.timeoutText.setText("Time: " + this.timeout );
        if(this.timeout <= 0) {
            this.start();
            this.timeout = config.gameTimeout;
        } else  {
            --this.timeout;
        }
    }
    createTimer() {

        this.time.addEvent({
            delay: 1000,
            callback: () => this.onTimerTick(),
            callbackScope: this,
            loop: true
        })
    }
    create() {
        this.timeout = config.gameTimeout;
        this.createBackground();
        this.createText();
        this.createTimer();
        this.createCards();
        this.start();
    }
    start() {
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.initCards();
    }
    initCards() {
        let positions = this.getCardsPositions();

        this.cards.forEach(card => {
            let position = positions.pop();
            card.setPosition(position.x, position.y);
            card.close();
        })
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }
    createCards() {
        this.cards = [];

        for (let value of config.cards) {
            for (let  i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value));

            }
        }
        this.input.on('gameobjectdown', this.onCardClicked, this);
    }
    onCardClicked(pointer, card) {
        if (card.opened) {
            return false;
        }

        if (this.openedCard) {
            // Уже есть открытая карта
            if (this.openedCard.value === card.value) {
                // картинки равны -> запомнить
                this.openedCard = null;
                ++this.openedCardsCount;
            } else {
                // картинки разные -> скрыть прошлое
                this.openedCard.close();
                this.openedCard = card;

            }
        } else {
            // еще нет открытой карты
            this.openedCard = card;
        }

        card.open();

        if (this.openedCardsCount === this.cards.length / 2) {
            this.start()
        }

    }
    getCardsPositions() {
        let positions = []
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardGap = config.cardGap;
        let cardWidth = cardTexture.width + cardGap;
        let cardHeight = cardTexture.height + cardGap;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + (cardWidth / 2);
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + (cardHeight / 2);

        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight
                })
            }
        }
        return Phaser.Utils.Array.Shuffle(positions);

    }
}
