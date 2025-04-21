class DemonKing extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.hp = 10
        this.cd = 750
        this.velocity = 50
        this.kb = 150

        this.body.setCollideWorldBounds(true)
        this.isDamaged = false
        this.isDead = false

        this.state = new StateMachine('idle', {
            idle: new DemonIdle(),
            move: new DemonMove(),
            attack: new DemonAttack(),
            dead: new DemonDead(),
            damage: new DemonDamage(),
        },[scene,this])
    }

    update() {
        //this.state.step()
        if (this.hp > 0) {
            this.state.step()
        }
    }

}

//states
class DemonIdle extends State {
    enter(scene, demon) {
        //randomly transitions between moving and shooting
        scene.time.delayedCall(demon.cd, () => {
            let transition = Math.random() * 2
            if (transition > 1 ) {
                if(!demon.isDamaged) {this.stateMachine.transition('move')}
                return
            }
            else {
                if(!demon.isDamaged) {this.stateMachine.transition('attack')}
                return
            }
        })
    }
}

//moves ddemon king towardsd player
class DemonMove extends State {
    enter(scene, demon) {
        let moveDirection = new Phaser.Math.Vector2(scene.player.x - demon.x ,scene.player.y - demon.y)
        moveDirection.normalize()
        //randomizes the direction the demon moves
        demon.setVelocity(demon.velocity * moveDirection.x, demon.velocity * moveDirection.y)
        scene.time.delayedCall(demon.cd, () => {
            demon.setVelocity(0)
            if(!demon.isDamaged) {this.stateMachine.transition('idle')}
            return
        })
    }   
}

class DemonAttack extends State {
    enter(scene, demon) {
        //shoots thrice and returns to idle
        demon.anims.play('demon-shoot')
        demon.once('animationcomplete', () => {
            new Bullet(scene, demon.x, demon.y, 'bullet',0,'demon')
        scene.time.delayedCall(100, () => {
            new Bullet(scene, demon.x, demon.y, 'bullet',0,'demon')
        })
        scene.time.delayedCall(200, () => {
            new Bullet(scene, demon.x, demon.y, 'bullet',0,'demon')
        })
        scene.time.delayedCall(demon.cd, () => {
            if(!demon.isDamaged) {this.stateMachine.transition('idle')}
            return
        })
        return
        })
        
    }
}

class DemonDead extends State {
    enter(scene, demon) {
        demon.isDead = true
    }
}

class DemonDamage extends State {
    enter(scene,demon) {
        demon.anims.play('demon-idle')
        let moveDirection = new Phaser.Math.Vector2( - scene.player.x + demon.x , - scene.player.y +demon.y).normalize()
        demon.setVelocity(demon.kb * moveDirection.x, demon.kb * moveDirection.y)
        demon.setTint(0xAAAA00)
        scene.time.delayedCall(401, () => {
            if(demon.hp > 0) {
                demon.setTint(0xFFFFFF)
                demon.isDamaged = false
                demon.setVelocity(0)
                demon.state.transition('idle')
            }
            else {
                demon.state.transition('dead')
            }
        })
    }
}