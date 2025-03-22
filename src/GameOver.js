class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver')
    }
    init(data) {
        this.cause = data.cause
    }

    create() {
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFAA00',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.title = this.add.text(100,250,"GameOver", titleConfig)

        let startConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#000000',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.title = this.add.text(100,250,"Press A to return to the Main Menu", startConfig)

    }

    
}