class Castle extends Phaser.Scene {
    constructor() {
        super('castleScene')
    }

    init(data) {
        this.player = data.player
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keys.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keys.JKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        this.keys.KKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        this.map = this.add.image(0,0,'castleMap').setOrigin(0,0)

        this.player = new Player(this, 384, 900, 'player')
        

        this.cameras.main.setBounds(0,0,this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, false)
        this.physics.world.setBounds(0,0,this.map.width, this.map.height)

        this.sound.stopAll()
    }

    update() {
        this.player.update()
    }
}