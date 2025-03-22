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
        this.load.image('castleMap','CastleMap.png')
        this.load.image('slime', 'slime.png')
        this.load.image('bullet','bullet.png')
        this.load.spritesheet('cut','cut.png', {
            frameWidth: 64,
            frameHeight:32,
        })
        this.load.image('menu', 'Menu.png')
        this.load.spritesheet('castle','Castle.png', {
            frameWidth: 128,
            frameHeight: 128,
        })

        this.load.bitmapFont('dogica', 'dogica/gem.png', 'font/gem.xml')

        //audio
        this.load.audio('pixel-time','1-02. Pixel Time.mp3')
        this.load.audio('win','SE_RetroSuccess_01.wav.mp3')
        this.load.audio('swing','click.wav')
        this.load.audio('dash','SE_Umbrella_01.wav')
        this.load.audio('lose','SE_RetroOver_01.wav.mp3')

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

        //player attack animations
        this.anims.create({
            key: 'swing-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {frames: [16,17,18,19]}),
        })
        this.anims.create({
            key: 'swing-up',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {frames:[20,21,22,23]}),
        })
        this.anims.create({
            key: 'swing-down',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {frames: [24,25,26,27]}),
        })
        this.anims.create({
            key: 'swing-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', {frames: [28,29,30,31]}),
        })

        //slash animations
        this.anims.create({
            key: 'slash',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('cut', {frames: [0,1,2,3]}),
        })
        this.scene.start('menuScene')
    }
}