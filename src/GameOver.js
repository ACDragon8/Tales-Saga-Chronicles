class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver')
    }
    init(data) {
        this.cause = data.cause
    }

    
}