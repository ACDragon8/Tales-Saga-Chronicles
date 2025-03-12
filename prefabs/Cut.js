class Cut extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture,player,frame,) {
        super(scene,x,y,texture,frame)
        this.player = player
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.lifetime = 250
        //this.active = true
        this.body.setSize(this.width / 4 * 3, this.height / 4 * 3)
        this.body.setImmovable(true)
        //for (let i = 0; i < scene.slimes.; i++) {
            scene.physics.add.collider(this,scene.slimes, (cut, slime) => {
                slime.hp -= 1
                console.log('slime damage')
                console.log(slime.hp) 
            })
        //}

        //exist temporarily
        scene.time.delayedCall(this.lifetime, () => {
            this.destroy()
        })

    }
    update() {
        this.setX(this.player.x)
        this.setY(this.player.y)
    }
}