'use strict'

/*
Name: Hao Deng
Game: Tales Saga Chronicles
Inspiration: 
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
            debug: true
        }
    },
    scene: [ Load, Menu, Intro, Play, Castle]
}

const game = new Phaser.Game(config)