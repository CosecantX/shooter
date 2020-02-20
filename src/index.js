import Phaser from 'phaser';

var game;
const gameOptions = {
    playerSpeed: 300,
    playerDiagSpeed: -1,
    bulletSpeed: 500,
    bulletTime: 2000,
    fireRate: 100,
}
gameOptions.playerDiagSpeed = gameOptions.playerSpeed * Math.sin(Math.PI / 4)

const WIDTH = 600;
const HEIGHT = 800;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

/*const ANGLES = {
    right: 0,
    upRight: Math.PI / 4,
    up: Math.PI / 2,
    upLeft: (3 * Math.PI) / 4,
    left: Math.PI,
    downLeft: (5 * Math.PI) / 4,
    down: (3 * Math.PI) / 2,
    downRight: (7 * Math.PI) / 4,
}*/


var player;
var cursor;
var keys;

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        parent: "cnv",
        width: WIDTH,
        height: HEIGHT,
        scene: [loadScene, gameScene],
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        }
    }
    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener('resize', resizeGame);
}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, CENTER_X, 600, 'ship');
        scene.physics.add.existing(scene.add.existing(this));
        this.setSize(12, 12);
        this.setDepth(1);
        scene.events.on('update', (time, delta) => {
            this.update(time, delta)
        });

        this.fireTimer = gameOptions.fireRate;
        this.fireBullet = false;
        this.moveAngle = 0;
    }

    update(time, delta) {
        if (this.fireTimer > 0) {
            this.fireTimer -= delta;
        } else if (this.fireBullet) {
            let bullet = this.scene.playerBullets.get().setActive(true).setVisible(true);
            if (bullet) {
                bullet.fire(player, cursor);
            }
            this.fireTimer = gameOptions.fireRate;
        }
    }

    /*move(angle) {
        if (angle) {
            this.moveAngle = angle;
        }

        let v = getXYVelocities(this.moveAngle, gameOptions.playerSpeed);
        this.setVelocity(v.x, v.y);
    }*/
}

class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene) {
        super(scene, -10, -10, 'shot')
        scene.physics.add.existing(scene.add.existing(this));
        this.setSize(this.width, this.width);

        this.born = 0;
    }

    update(time, delta) {
        this.born += delta;
        if (this.born > gameOptions.bulletTime) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    fire(source, target) {
        this.born = 0;
        this.x = source.x;
        this.y = source.y;

        this.rotation = Math.PI / 2 + Phaser.Math.Angle.Between(source.x, source.y, target.x, target.y);

        let v = getXYVelocities(this.rotation, gameOptions.bulletSpeed);
        this.setVelocity(v.x, v.y);
    }
}

class loadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        this.load.image('circle50', 'assets/circle50.png');
        this.load.image('circle20', 'assets/circle20.png');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('shot', 'assets/shot.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}

class gameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
        player = new Player(this);
        player.setCollideWorldBounds(true);

        this.playerBullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });
        this.enemyBullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });

        cursor = this.physics.add.image(CENTER_X, CENTER_Y, 'circle20');

        keys = this.input.keyboard.addKeys('W,A,S,D');

        this.input.on('pointermove', (pointer) => {
            cursor.setPosition(pointer.x, pointer.y)
        })

        this.input.on('pointerdown', pointer => {
            player.fireBullet = true;
        })

        this.input.on('pointerup', pointer => {
            player.fireBullet = false;
        })
    }

    update() {
        player.rotation = Math.PI / 2 + Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);

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

        /*if (keys.W.isDown) {
            if (!keys.A.isDown && !keys.D.isDown) {
                player.move(ANGLES.up);
            } else if (keys.A.isDown) {
                player.move(ANGLES.upLeft);
            } else if (keys.D.isDown) {
                player.move(ANGLES.upRight);
            }
        } else if (keys.A.isDown) {
            if (!keys.W.isDown && !keys.S.isDown) {
                player.move(ANGLES.left);
            } else if (keys.S.isDown) {
                player.move(ANGLES.downLeft);
            } 
        } else if (keys.S.isDown) {
            if (!keys.A.isDown && !keys.D.isDown) {
                player.move(ANGLES.down);
            } else if (keys.D.isDown) {
                player.move(ANGLES.downRight);
            }
        } else if (keys.D.isDown) {
            if (!keys.W.isDown && !keys.S.isDown) {
                player.move(ANGLES.right);
            }
        } else {
            player.setVelocity(0, 0);
        }*/

    }
}

function getXYVelocities(angle, speed) {
    return {
        x: (speed * Math.sin(angle)), // Horizontal component
        y: (speed * -Math.cos(angle)) // Vertical component
    };
}

function resizeGame() {
    let canvas = document.querySelector('#cnv canvas');
    let windowWidth = window.innerWidth - 25;
    let windowHeight = window.innerHeight - 25;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + 'px';
        canvas.style.height = (windowWidth / gameRatio) + 'px';
    } else {
        canvas.style.width = (windowHeight * gameRatio) + 'px';
        canvas.style.height = windowHeight + 'px';
    }
}