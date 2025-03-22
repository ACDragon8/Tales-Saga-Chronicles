class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame,cause) {
        super(scene, x, y, texture, frame, cause)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.bullets.add(this)
        this.speed = 150
        this.lifetime = 5000

        this.cause = cause //who caused the death

        this.body.setSize(this.width / 8, this.height / 8)
        this.body.setBounce(0)

        //points towards player and moves towards it
        this.direction = new Phaser.Math.Vector2(scene.player.x - x,scene.player.y - y)
        this.direction.normalize()
        this.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y)

        //on hitting the player, log a hit
        scene.physics.add.overlap(this, scene.player, (bullet, player) => {
            //miss if player is dashing
            if (!player.isDashing) {
                if (!god) {
                    player.hp -=1
                    player.cause = cause
                }
            }
            else {
            }
            bullet.destroy()
        })

        scene.time.delayedCall(this.lifetime, () => {
            this.destroy()
        })
    }

}