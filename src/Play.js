class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {

    }

    create() {

        this.sound.play('pixel-time', {
            loop: true
        })

        //keyboard inputs
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keys.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keys.JKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        this.keys.KKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        //spawn objects
        this.map = this.add.image(0,0,"map").setOrigin(0,0)
        this.player = new Player(this, 50, 50, 'hero')
        this.slime = new Slime(this, 100, 100, 'slime')
        this.slimes = []

        // set up camera
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, false)
        this.physics.world.setBounds(0,0,this.map.width, this.map.height)



    }

    update() {
        this.player.update()
        this.slime.update()
    }
}
