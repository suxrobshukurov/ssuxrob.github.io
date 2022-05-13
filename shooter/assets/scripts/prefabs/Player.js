class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 150, config.height / 2, 'dragon', 'dragon1');
        this.init();
    }
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.velocity = config.playerMoveSpeed
    }
    move() {
        this.body.setVelocity(0);

        if(this.scene.cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
        } else if (this.scene.cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
        }
        if(this.scene.cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity);
        } else if(this.scene.cursors.down.isDown) {
            this.body.setVelocityY(this.velocity);
        }
    }

}