import Phaser from 'phaser';

let Scene1 = new Phaser.Scene();

Scene1.preload = function() {

}

Scene1.create = function() {

}

Scene1.update = function() {

}

const config = {
    type: Phaser.AUTO,
    parent: "cnv",
    width: 800,
    height: 600,
    scene: Scene1
};

const game = new Phaser.Game(config);
