class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture,frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //console.log('a')

        this.hp = 1
        this.cd = 500
        this.slimeVelocity = 100
        this.isDead = false
        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

        this.enemyState = new StateMachine('idle', {
            idle: new SlimeIdle(),
            move: new SlimeMove(),
            attack: new SlimeAttack(),
            dead: new SlimeDead(),
        },[scene, this])
    }

    update() {
        if(this.hp <= 0)  {
            this.body.setCollideWorldBounds(false)
            this.x = -1000
            this.y = -1000
            this.scene.slimes.remove(this)
            this.isDead = true
            this.enemyState.transition('dead')
            this.scene.slimeCount -= 1
            

        }
        else {
            this.enemyState.step()
        }
    }
}

//states
class SlimeIdle extends State {
    enter(scene, slime) {
        console.log('idle')
        //randomly transitions between moving and shooting
        scene.time.delayedCall(slime.cd, () => {
            let transition = Math.random() * 2
            //console.log(transition)
            if (transition > 1 ) {
                if(!slime.isDead) {this.stateMachine.transition('move')}
                console.log('move')
                return
            }
            else {
                if(!slime.isDead) {this.stateMachine.transition('attack')}
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
            if(!slime.isDead) {this.stateMachine.transition('idle')}
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
            if(!slime.isDead) {this.stateMachine.transition('idle')}
            return
        })
        return
    }
}

class SlimeDead extends State {
    enter(scene, slime) {
        scene.time.delayedCall(5000, () => {
            slime.destroy()
        })
        return
    }
}