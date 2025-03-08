class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture,frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //console.log('a')

        this.hp = 2
        this.cd = 500
        this.slimeVelocity = 100

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

        this.enemyState = new StateMachine('idle', {
            idle: new SlimeIdle(),
            move: new SlimeMove(),
            attack: new SlimeAttack(),
        },[scene, this])
    }

    update() {
        if(this.hp <= 0)  {
            this.destroy
        }
        this.enemyState.step()
    }
}

//states
class SlimeIdle extends State {
    enter(scene, slime) {
        //randomly transitions between moving and shooting
        scene.time.delayedCall(slime.cd, () => {
            let transition = Math.random() * 2
            //console.log(transition)
            if (transition > 1 ) {
                this.stateMachine.transition('move')
                return
            }
            else {
                this.stateMachine.transition('attack')
                return
            }
        })
    }
}

class SlimeMove extends State {
    enter(scene, slime) {
        let moveDirection = new Phaser.Math.Vector2(Math.floor(Math.random() * 3) - 1 ,Math.floor(Math.random() * 3) - 1)
        moveDirection.normalize()
        //randomizes the direction the slime moves
        slime.setVelocity(slime.slimeVelocity * moveDirection.x, slime.slimeVelocity * moveDirection.y)
        scene.time.delayedCall(slime.cd, () => {
            slime.setVelocity(0)
            this.stateMachine.transition('idle')
            return
        })
    }   
}

class SlimeAttack extends State {
    enter(scene, slime) {
        //shoots once and returns to idle
        new Bullet(scene, slime.x, slime.y, 'bullet')
         scene.time.delayedCall(slime.cd, () => {
            //slime.setVelocity(0)
            this.stateMachine.transition('idle')
            return
        })
        return
    }
}