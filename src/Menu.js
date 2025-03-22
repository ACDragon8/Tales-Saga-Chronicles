class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        //this.scene.start('playScene')
        this.add.image(0,0,'menu').setOrigin(0,0)

        let TitleConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#000000',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
            //fixedWidth: 100
          }


        this.title = this.add.text(25,25,"Tales Saga Chronicles", TitleConfig)

        this.castle = this.add.image(300,125,'castle',1).setScale(0.25)

        this.player = this.add.image(140,160,'player',6).setScale(1)

        

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
        this.title = this.add.text(100,250,"Press A to Start", startConfig)
    }

    update() {

        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.JKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        const JKey = this.keys.JKey

        if(Phaser.Input.Keyboard.JustDown(JKey)) {
            this.scene.start('playScene')
        }
    }
}