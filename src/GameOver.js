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
            color: '#FF1500',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.title = this.add.text(100,25,"Game Over", titleConfig)

        let startConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
        }

        if (this.cause == 'none') {
            this.add.text("How did you even get here???")
        } else if (this.cause == 'slime') {
            this.add.text("How did you even get here???")
        }

        this.returnText = this.add.text(25,200,"Press A to return to the Main Menu", startConfig)

    }

    
}