class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        this.scene.start('playScene')
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