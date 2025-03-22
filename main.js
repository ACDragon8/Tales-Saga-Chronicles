'use strict'

/*
Name: Hao Deng
Game: Tales Saga Chronicles
Inspiration: Tales Saga Chronicles from Blue Archive

Credits:
Visuals inspired by Blue Archive
Sound Effects from Blue Archive
*/

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 400,
    height: 300,
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Menu, Play, Castle, GameOver]
}

const game = new Phaser.Game(config)

let god = false