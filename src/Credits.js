class Credits extends Phaser.Scene {
    constructor() {
        super("credits")
    }

    create() {
        this.sound.play('creditsmusic',{loop: true})
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#AAAA00',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.title = this.add.text(50,50,"Congratulations!", titleConfig)

        let startConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            color: '#AAAA00',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.add.text(50,100,"You have defeated the demon king \nand saved the realm!", startConfig)
        let creditConfig = {
            fontFamily: 'Courier',
            fontSize: '12px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
            },
        }
        this.add.text(150,150,"Credits", creditConfig)
        this.add.text(50,175,"Art and Programming by Hao Deng", creditConfig)
        this.add.text(50,200,"Sound Effects from Blue Archive", creditConfig)
        this.add.text(50,225,"Based on Blue Archive", creditConfig)
        this.add.text(50,200,"Sound Effects from Blue Archive", creditConfig)

        this.add.text(75,250,"Press A to return to menu", startConfig)


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