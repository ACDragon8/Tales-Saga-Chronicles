class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.cut // attack object
        this.direction = 'down'
        this.playerVelocity = 200
        this.dashVelocity = 500
        this.offset = 16 //offset of pixels for attacks
        this.cause = 'none' // cause of death
        this.isDashing = false

        this.hp = 1

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        this.body.setImmovable(false)
        


        this.playerState = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            attack: new AttackState(),
            dash: new DashState(),
        },[scene,this])

    }

    update() {
        if(this.hp > 0) {
            this.playerState.step()
        }
    }

}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play(`walk-${player.direction}`)
        player.anims.stop()
    }

    execute(scene, player) {
        //const { left, right, up, down, space, shift } = scene.keys
        const WKey = scene.keys.WKey
        const AKey = scene.keys.AKey
        const SKey = scene.keys.SKey
        const DKey = scene.keys.DKey
        const JKey = scene.keys.JKey
        const KKey = scene.keys.KKey

        // transition to move if pressing a movement key
        if(WKey.isDown || AKey.isDown || SKey.isDown || DKey.isDown ) {
            this.stateMachine.transition('move')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(JKey)) {
            this.stateMachine.transition('attack')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(KKey)) {
            this.stateMachine.transition('dash')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, player) {
        const WKey = scene.keys.WKey
        const AKey = scene.keys.AKey
        const SKey = scene.keys.SKey
        const DKey = scene.keys.DKey
        const JKey = scene.keys.JKey
        const KKey = scene.keys.KKey

        if(Phaser.Input.Keyboard.JustDown(JKey)) {
            this.stateMachine.transition('attack')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(KKey)) {
            this.stateMachine.transition('dash')
            return
        }

        if(!(WKey.isDown || AKey.isDown || SKey.isDown || DKey.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

         // handle movement
         let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(WKey.isDown) {
            moveDirection.y = -1
            player.direction = 'up'
        } else if(SKey.isDown) {
            moveDirection.y = 1
            player.direction = 'down'
        }
        if(AKey.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(DKey.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }

        moveDirection.normalize()
        player.setVelocity(player.playerVelocity * moveDirection.x, player.playerVelocity * moveDirection.y)
        player.anims.play(`walk-${player.direction}`, true)
    }
}

class AttackState extends State {
    enter(scene, player) {
        
        player.setVelocity(0)
        scene.sound.play('swing')
        player.anims.play(`swing-${player.direction}`)
        let offset = player.offset
        //choose direction
        if(player.direction == 'up') {
            this.cut = new Cut(scene,player.x, player.y-offset, 'cut', player)
            this.cut.angle = 0
        } else if(player.direction == 'down') {
            this.cut = new Cut(scene,player.x, player.y+offset, 'cut', player)
            this.cut.body.setSize()
            this.cut.angle = 180
        } else if(player.direction == 'left') {
            this.cut = new Cut(scene,player.x-offset, player.y, 'cut', player)
            this.cut.angle = 270
        } else if(player.direction == 'right') {
            this.cut = new Cut(scene,player.x+offset, player.y, 'cut', player)
            this.cut.angle = 90
        }
        
        
        

        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, player) {
        const WKey = scene.keys.WKey
        const AKey = scene.keys.AKey
        const SKey = scene.keys.SKey
        const DKey = scene.keys.DKey
        const JKey = scene.keys.JKey
        const KKey = scene.keys.KKey

        // handle movement while attacking
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(WKey.isDown) {
            moveDirection.y = -1
            player.direction = 'up'
        } else if(SKey.isDown) {
            moveDirection.y = 1
            player.direction = 'down'
        }
        if(AKey.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(DKey.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }

        moveDirection.normalize()
        player.setVelocity(player.playerVelocity * moveDirection.x, player.playerVelocity * moveDirection.y)
        this.cut.update()
        //player.anims.play(`walk-${player.direction}`, true)
    }
}

class DashState extends State {
    enter(scene, player) {
        this.isDashing = true
        const WKey = scene.keys.WKey
        const AKey = scene.keys.AKey
        const SKey = scene.keys.SKey
        const DKey = scene.keys.DKey
        const JKey = scene.keys.JKey
        const KKey = scene.keys.KKey
        scene.sound.play('dash')

        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(WKey.isDown) {
            moveDirection.y = -1
            player.direction = 'up'
        } else if(SKey.isDown) {
            moveDirection.y = 1
            player.direction = 'down'
        }
        if(AKey.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(DKey.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }
        moveDirection.normalize()
        player.setVelocity(player.dashVelocity * moveDirection.x, player.dashVelocity * moveDirection.y)
        player.setTint(0x00CCFF)
        player.anims.play(`swing-${player.direction}`, true)
        scene.time.delayedCall(300, () => {
            player.setTint(0xFFFFFF)
            this.isDashing = false
            this.stateMachine.transition('idle')
        })
            
    }
}