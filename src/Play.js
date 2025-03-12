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
        
        this.player = new Player(this, 550, 900, 'player')
        

        //demon king's castle
        this.castle = this.physics.add.sprite(640,64,'castle')
        this.castle.body.setImmovable(true)

        this.children.bringToTop(this.player)

        

        //spawn slimes every so often
        this.slimes = this.add.group({classType: Slime, runChildUpdate: true})
        this.slimeMax = 2
        this.slimeCount = 0
        this.spawnRate = 1000
        this.minSpawn = 50
        this.spawnRange = 100
       
        this.spawn = this.time.addEvent({delay: this.spawnRate,
            callback: () => {
                if (this.slimeCount < this.slimeMax) {
                    let signX = Math.random()
                    if (signX > 0.5) {
                        signX = 1
                    }
                    else {
                        signX = -1
                    }
                    let signY = Math.random()
                    if (signY > 0.5) {
                        signY = 1
                    }
                    else {
                        signY = -1
                    }
                    let slime = new Slime(this, this.player.x +(signX * Math.random()*this.spawnRange) + (signX * this.minSpawn) , this.player.y +(signY * Math.random()*this.spawnRange) + signY * this.minSpawn, 'slime')
                    this.slimes.add(slime)
                    this.children.bringToTop(this.player)
                    this.slimeCount++
                }
            },
            callbackScope: this,
            args: null,
            loop: true
          })
    

        

        // set up camera
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, false)
        this.physics.world.setBounds(0,0,this.map.width, this.map.height)



    }

    update() {
        this.player.update()

    }
}
