class Castle extends Phaser.Scene {
    constructor() {
        super('castleScene')
    }

    init(data) {
        this.player = data.player
    }

    create() {
        //setup
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


        //create walls for corridor
        this.wall_1 = this.physics.add.sprite(0,17*32,'wall').setOrigin(0,0)
        this.wall_2 = this.physics.add.sprite(32*14,17*32,'wall').setOrigin(0,0)
        this.wall_1.body.setImmovable(true)
        this.wall_2.body.setImmovable(true)
        this.physics.add.collider(this.player,this.wall_1)
        this.physics.add.collider(this.player,this.wall_2)
    }

    update() {
        this.player.update()
    }
}