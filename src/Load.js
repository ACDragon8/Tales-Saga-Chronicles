class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'

        //sprites
        this.load.spritesheet('hero', 'hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('player', 'player-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.image('map', 'map.png')
        this.load.image('slime', 'slime.png')
        this.load.image('bullet','bullet.png')
        this.load.image('cut','cut.png')
        this.load.spritesheet('castle','Castle.png', {
            frameWidth: 128,
            frameHeight: 128,
        })
        //audio
        this.load.audio('pixel-time','1-02. Pixel Time.mp3')
    }

    create() {
        //castle opening animation
        this.anims.create({
            key: 'castle-open',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('castle',{
                frames: [0,1,2,3,2,1,0],
            }),
        })

        //player animations
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        })

        // hero animations (swinging)
        this.anims.create({
            key: 'swing-down',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 16, end: 19 }),
        })
        this.anims.create({
            key: 'swing-up',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 20, end: 23 }),
        })
        this.anims.create({
            key: 'swing-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 24, end: 27 }),
        })
        this.anims.create({
            key: 'swing-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 28, end: 31 }),
        })

        this.scene.start('menuScene')
    }
}