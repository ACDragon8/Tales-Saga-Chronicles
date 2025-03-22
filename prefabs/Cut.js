class Cut extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture,player,frame,) {
        super(scene,x,y,texture,frame)
        this.player = player
        this.direction = player.direction
        
        scene.add.existing(this)
        scene.physics.add.existing(this)

        if (this.direction == 'left' || this.direction == 'right') {
            //console.log('turn')
            this.body.setSize(this.height, this.width)
        }
        this.anims.play('slash')
        this.lifetime = 400
        this.body.setImmovable(true)
        scene.physics.add.collider(this,scene.slimes, (cut, slime) => {
            slime.hp -= 1
            //console.log('slime damage')
            //console.log(slime.hp) 
        })

        //exist temporarily
        scene.time.delayedCall(this.lifetime, () => {
            this.destroy()
        })

    }
    update() {
        
        let player = this.player
        let x, y = 0
        if(this.direction == 'up') {
            x = this.player.x
            y = this.player.y - this.player.offset
        } else if(this.direction == 'down') {
            x = this.player.x
            y = this.player.y + this.player.offset+6
        } else if(this.direction == 'left') {
            x = this.player.x - this.player.offset
            y = this.player.y
        } else if(this.direction == 'right') {
            x = this.player.x + this.player.offset
            y = this.player.y
        }
        this.setX(x)
        this.setY(y)
    }
}