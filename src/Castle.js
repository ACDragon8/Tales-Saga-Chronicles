class Castle extends Phaser.Scene {
    constructor() {
        super('castleScene')
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
        this.transition = false
        

        this.cameras.main.setBounds(0,0,this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, false)
        this.physics.world.setBounds(0,0,this.map.width, this.map.height)

        this.sound.stopAll()

        //bullet group for collision
        this.bullets = this.add.group({classType: Bullet})

        //create walls for corridor
        this.wall_1 = this.physics.add.sprite(0,17*32,'wall').setOrigin(0,0)
        this.wall_2 = this.physics.add.sprite(32*14,17*32,'wall').setOrigin(0,0)
        this.wall_1.body.setImmovable(true)
        this.wall_2.body.setImmovable(true)
        this.physics.add.collider(this.player,this.wall_1)
        this.physics.add.collider(this.player,this.wall_2)

        //create spawn event for demon king
        this.spawned = false
        this.start = this.physics.add.sprite(32*11,17*32).setOrigin(0,0)
        this.start.body.setSize(64*3,32)
        this.start.setImmovable(true)
        //spawn demon king on collision
        this.physics.add.collider(this.player,this.start, () => {
            if (!this.spawned) {
                this.spawned = true
                this.sound.play('bossmusic',{loop: true})
                this.start.setX(-200)
                this.start.setY(-200)
                this.demonKing = new DemonKing(this, 32*12-16, 8*32,'demon',0).setOrigin(0.5,0.5)
                this.physics.add.collider(this.player,this.demonKing, () => {
                    if (!god) {
                        this.player.hp -=1
                        this.player.cause = 'demon'
                    }
                    
                }) 
            }
        })
    }

    update() {
        
        if (this.player.hp <= 0) {
            if (!this.transition) {
                //game over transition
                this.player.playerState.transition('idle')
                this.transition = true
                this.player.setVisible(false)
                this.cameras.main.stopFollow()
                this.sound.stopAll()    
                this.sound.play('lose')
                this.time.delayedCall(2000, () => {
                    this.scene.start('gameOver',{cause: this.player.cause})
                })
            }
        } else if(this.spawned && this.demonKing.isDead) {
            this.demonKing.setVisible(false)
            this.demonKing.body.setCollideWorldBounds(false)
            this.demonKing.setX(-200)
            this.demonKing.setY(-200)
            if(!this.transition) {
                this.transition = true
                this.sound.stopAll()
                this.sound.play('win')
                this.time.delayedCall(1400, () => {
                    this.scene.start('credits',{cause:this.player.cause})
                })
            }
            
        }
        else {
            this.player.update()
            if(this.spawned) {
                this.demonKing.update()
            }
        }
     }
}