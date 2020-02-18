import Phaser from 'phaser';

const gameOptions = {
    playerSpeed: 200,
    bulletSpeed: 500,
    bulletTime: 2000,
}

const WIDTH = 600;
const HEIGHT = 800;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

//const DIAG_SPEED = gameOptions.playerSpeed * Math.sin(Math.PI / 4);

var player;
var cursor;
var keys;

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        parent: "cnv",
        width: WIDTH,
        height: HEIGHT,
        scene: gameScene,
        physics: {
            default: 'arcade',
            arcade: {
                //debug: true
            }
        }
    }
    const game = new Phaser.Game(config);
    window.focus();
}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, CENTER_X, 600, 'circle50')
        scene.physics.add.existing(scene.add.existing(this));
    }
}

class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene) {
        super(scene, player.x, player.y, 'circle20')
        scene.physics.add.existing(scene.add.existing(this));

        this.born = 0;

    }

    update(time, delta) {
        this.born += delta;
        if (this.born > gameOptions.bulletTime) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    fire() {
        this.born = 0;
        this.x = player.x;
        this.y = player.y;

        this.angle = Math.PI / 2 + Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);

        let v = this.getXYVelocities(this.angle, gameOptions.bulletSpeed);
        this.setVelocity(v.x, v.y);
    }

    getXYVelocities(angle, speed) {
        return {
            x: (speed * Math.sin(angle)), // Horizontal component
            y: (speed * -Math.cos(angle)) // Vertical component
        };
    }
}

class gameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('circle50', 'assets/circle50.png');
        this.load.image('circle20', 'assets/circle20.png');
    }

    create() {
        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
        player = new Player(this);
        player.setCollideWorldBounds(true);

        this.playerBullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});
        this.enemyBullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});

        cursor = this.physics.add.image(CENTER_X, CENTER_Y, 'circle20');

        keys = this.input.keyboard.addKeys('W,A,S,D');

        this.input.on('pointermove', (pointer) => {
            cursor.setPosition(pointer.x, pointer.y)
        })

        this.input.on('pointerdown', pointer => {
            let bullet = this.playerBullets.get().setActive(true).setVisible(true);
            if (bullet) {
                bullet.fire();
            }
        })
    }

    update() {
        player.angle = Math.PI / 2 + Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);

        this.handleKeys();

    }

    handleKeys() {

        if (keys.W.isDown) {
            player.setVelocityY(-gameOptions.playerSpeed);
        } else if (keys.S.isDown) {
            player.setVelocityY(gameOptions.playerSpeed);
        } else {
            player.setVelocityY(0);
        }

        if (keys.A.isDown) {
            player.setVelocityX(-gameOptions.playerSpeed);
        } else if (keys.D.isDown) {
            player.setVelocityX(gameOptions.playerSpeed);
        } else {
            player.setVelocityX(0);
        }

    }

}