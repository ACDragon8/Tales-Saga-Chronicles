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
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.title = this.add.text(100,50,"Game Over", titleConfig)

        let startConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
        }

        //dialog
        if (this.cause == 'none') {
            this.add.text(50,100,"How did you even get here???",startConfig)
        } else if (this.cause == 'slime') {
            this.add.text(25,100,"Puny Jelly: You should know better \nthan to bring a sword to a gun \nfight. Hmph!",startConfig)
        } else if (this.cause == 'demon') {
            this.add.text(50,100,"Demon King: Know your place, \nfoolish human!",startConfig)
        } 

        this.returnText = this.add.text(50,200,"Press A to return to the Main Menu", startConfig)

    }
    
    update() {
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.JKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        const JKey = this.keys.JKey
        this.keys.KKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
        const KKey = this.keys.KKey
        
        //transition to menu
        if(Phaser.Input.Keyboard.JustDown(JKey)) {
            //this.sound.play('win')
            this.time.delayedCall(100, () => {
                this.scene.start('menuScene')
            })
            
        }
    }

    
}