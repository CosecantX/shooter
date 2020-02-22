import Phaser from 'phaser';

var game;
const gameOptions = {
    playerSpeed: 200,
    playerDiagSpeed: -1,
    playerHP: 100,
    bulletSpeed: 500,
    bulletTime: 2000,
    fireRate: 100,
    eFireRate: 200,
    eMoveRate: 500,
}
gameOptions.playerDiagSpeed = gameOptions.playerSpeed * Math.sin(Math.PI / 4)

const WIDTH = 600;
const HEIGHT = 800;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const ANGLES = {
    right: Math.PI / 2,
    upRight: Math.PI / 4,
    up: 0,
    upLeft: -Math.PI / 4,
    left: -Math.PI / 2,
    downLeft: -(3 * Math.PI) / 4,
    down: Math.PI,
    downRight: (3 * Math.PI) / 4,
}


var player;
var cursor;
var keys;
var text;

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
                //debug: true
            }
        }
    }
    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener('resize', resizeGame);
}

class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene, type) {
        super(scene, -100, -100, type)
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

class pBullet extends Bullet {
    constructor(scene) {
        super(scene, 'shot')
    }
}

class eBullet extends Bullet {
    constructor(scene) {
        super(scene, 'eshot')
    }
}

class Ship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type)
        scene.physics.add.existing(scene.add.existing(this));
        this.setSize(12, 12);
        this.setDepth(1);
        scene.events.on('update', (time, delta) => {
            this.update(time, delta)
        });
    }
}

class Player extends Ship {
    constructor(scene) {
        super(scene, CENTER_X, 600, 'ship');

        this.fireTimer = gameOptions.fireRate;
        this.fireBullet = false;
        this.hp = gameOptions.playerHP;
    }

    update(time, delta) {
        this.rotation = Math.PI / 2 + Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);

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

    removeHP(num) {
        this.hp -= num;
        if (this.hp <= 0) {
            text.setText('GAMEOVER');
        } else {
            text.setText('HP: ' + this.hp);
        }
    }

    addHP(num) {
        this.hp += num;
        if (this.hp > gameOptions.playerHP) {
            this.hp = gameOptions.playerHP;
        }
        text.setText('HP: ' + this.hp);
    }

}

class Shuffler extends Ship {
    constructor(scene, x, y) {
        super(scene, x, y, 'ship');

        this.moveAngle = 0;
        this.moveTimer = gameOptions.eMoveRate;
        this.fireTimer = gameOptions.eFireRate;
        
        this.rotation = ANGLES.down;
    }

    update(time, delta) {
        if(this.moveTimer > 0) {
            this.moveTimer -= delta;
        } else {
            this.moveAngle = Phaser.Math.RND.rotation();
            this.move();
            this.moveTimer = gameOptions.eMoveRate;
        }

        if (this.fireTimer > 0) {
            this.fireTimer -= delta;
        } else {
            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);
            if (bullet) {
                bullet.fire(this, player);
                this.rotation = Math.PI / 2 + Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
            }
            this.fireTimer = gameOptions.eFireRate;
        }
    }

    move(angle) {
        if (angle) {
            this.moveAngle = angle;
        }

        let v = getXYVelocities(this.moveAngle, gameOptions.playerSpeed);
        this.setVelocity(v.x, v.y);
    }

}

class Spinner extends Ship {
    constructor(scene, x, y) {
        super(scene, x, y, 'ship');

        this.moveAngle = 0;
        this.moveTimer = gameOptions.eMoveRate;
        this.fireTimer = gameOptions.eFireRate;
        
        this.rotation = ANGLES.down;
    }

    update(time, delta) {
        if (this.fireTimer > 0) {
            this.fireTimer -= delta;
        } else {
            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);
            if (bullet) {
                bullet.fire(this, player);
            }
            this.fireTimer = gameOptions.eFireRate;
        }
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
        this.load.image('eshot', 'assets/eshot.png');
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

        text = this.add.text(10, 10, 'HP: ' + player.hp);

        let enemy = new Shuffler(this, CENTER_X, 20);
        enemy.setCollideWorldBounds(true);

        this.playerBullets = this.physics.add.group({
            classType: pBullet,
            runChildUpdate: true
        });
        this.enemyBullets = this.physics.add.group({
            classType: eBullet,
            runChildUpdate: true
        });

        cursor = this.physics.add.image(CENTER_X, -100, 'circle20');

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

        this.physics.add.overlap(cursor, this.enemyBullets, (c, b) => {
            b.setActive(false).setVisible(false);
            player.addHP(1);
        })

        this.physics.add.overlap(player, this.enemyBullets, (p, b) => {
            b.setActive(false).setVisible(false);
            player.removeHP(10)
        })
    }

    update() {

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