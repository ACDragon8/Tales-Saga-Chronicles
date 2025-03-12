class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.speed = 200
        this.lifetime = 5000

        this.body.setSize(this.width / 8, this.height / 8)
        this.body.setBounce(0)

        //points towards player and moves towards it
        this.direction = new Phaser.Math.Vector2(scene.player.x - x,scene.player.y - y)
        this.direction.normalize()
        this.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y)

        //on hitting the player, log a hit
        scene.physics.add.overlap(this, scene.player, (bullet, player) => {
            if (!player.isDashing) {
                console.log('hit')
                bullet.destroy()
            }
        })

        //on hitting a cut, destroy self
        scene.physics.add.collider(this, scene.player.cut, (bullet, player) => {
            bullet.destroy()
        })

        scene.time.delayedCall(this.lifetime, () => {
            this.destroy()
        })
    }

}