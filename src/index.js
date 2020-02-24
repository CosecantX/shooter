import Phaser from 'phaser';

var game;

const gameOptions = {
    playerSpeed: 200,
    //playerDiagSpeed: -1,
    playerHP: 100,
    playerFireRate: 100,

    spawnTimer: 5000,
    bulletSpeed: 500,
    bulletLife: 2000,

    shfFireRate: 200,
    shfMoveRate: 500,
    shfMoveSpeed: 200,

    spnSpinRate: .03,
    spnFireRate: 200,
    spnMoveRate: 2000,
    spnMoveSpeed: 100,
}
//gameOptions.playerDiagSpeed = gameOptions.playerSpeed * Math.sin(Math.PI / 4);

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
var topLine = new Phaser.Geom.Line(10, 10, WIDTH - 10, 10);
var bottomLine = new Phaser.Geom.Line(10, HEIGHT - 10, WIDTH - 10, HEIGHT - 10);

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

class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene, type) {
        super(scene, -100, -100, type)
        scene.physics.add.existing(scene.add.existing(this));
        this.setSize(this.width, this.width);

        this.born = 0;
    }

    update(time, delta) {
        this.born += delta;
        if (this.born > gameOptions.bulletLife) {
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
        this.setCollideWorldBounds(true);

        this.fireTimer = gameOptions.playerFireRate;
        this.fireBullet = false;
        this.hp = gameOptions.playerHP;
    }

    update(time, delta) {
        this.rotation = Math.PI / 2 + Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);
        this.tryFire(delta);

    }

    tryFire(delta) {
        if (this.fireTimer > 0) {
            this.fireTimer -= delta;
        } else if (this.fireBullet) {
            let bullet = this.scene.playerBullets.get().setActive(true).setVisible(true);
            if (bullet) {
                bullet.fire(player, cursor);
            }
            this.fireTimer = gameOptions.playerFireRate;
        }
    }

    removeHP(num) {
        this.hp -= num;
        if (this.hp <= 0) {
            this.hp = 0;
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
        this.setCollideWorldBounds(true);

        this.moveAngle = 0;
        this.moveTimer = gameOptions.shfMoveRate;
        this.fireTimer = gameOptions.shfFireRate;

        this.setRotation(ANGLES.down);;
    }

    update(time, delta) {
        this.tryMove(delta);
        this.tryFire(delta);
    }

    tryFire(delta) {
        if (this.fireTimer > 0) {
            this.fireTimer -= delta;
        } else {
            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);
            if (bullet) {
                bullet.fire(this, player);
                this.setRotation(Math.PI / 2 + Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y));
            }
            this.fireTimer = gameOptions.shfFireRate;
        }
    }

    tryMove(delta) {
        if (this.moveTimer > 0) {
            this.moveTimer -= delta;
        } else {
            this.moveAngle = Phaser.Math.RND.rotation();
            this.move();
            this.moveTimer = gameOptions.shfMoveRate;
        }
    }

    move(angle) {
        if (angle) {
            this.moveAngle = angle;
        }

        let v = getXYVelocities(this.moveAngle, gameOptions.shfMoveSpeed);
        this.setVelocity(v.x, v.y);
    }

}

class Spinner extends Ship {
    constructor(scene, x, y) {
        super(scene, x, y, 'ship');
        this.setCollideWorldBounds(true);

        this.spinDir = +1;
        this.moveAngle = 0;
        this.moveTimer = gameOptions.spnMoveRate;
        this.fireTimer = gameOptions.spnFireRate;

        this.setRotation(ANGLES.down);

        this.line = new Phaser.Geom.Line(x, y - 1, x, y + 1);
    }

    update(time, delta) {
        this.tryMove(delta);
        this.movePoints();
        this.tryFire(delta);
        this.rotatePoints();
    }

    tryMove(delta) {
        if (this.moveTimer > 0) {
            this.moveTimer -= delta;
        } else {
            this.moveAngle = Phaser.Math.RND.rotation();
            this.move();
            this.moveTimer = gameOptions.spnMoveRate;
        }
    }

    move(angle) {
        if (angle) {
            this.moveAngle = angle;
        }

        let v = getXYVelocities(this.moveAngle, gameOptions.spnMoveSpeed);
        this.setVelocity(v.x, v.y);
    }

    movePoints() {
        Phaser.Geom.Line.CenterOn(this.line, this.x, this.y);
    }

    rotatePoints() {
        Phaser.Geom.Line.Rotate(this.line, this.spinDir * gameOptions.spnSpinRate);
        let point = this.line.getPointB();
        this.setRotation(Math.PI / 2 + Phaser.Math.Angle.Between(this.x, this.y, point.x, point.y));
    }

    tryFire(delta) {
        if (this.fireTimer > 0) {
            this.fireTimer -= delta;
        } else {
            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);
            let bullet2 = this.scene.enemyBullets.get().setActive(true).setVisible(true);
            if (bullet && bullet2) {
                bullet.fire(this, this.line.getPointA());
                bullet2.fire(this, this.line.getPointB());
            }
            this.fireTimer = gameOptions.spnFireRate;
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

        text = this.add.text(10, 10, 'HP: ' + player.hp);

        this.spawnTimer = gameOptions.spawnTimer;
        this.spawnCount = 2;

        //let shuffler = new Shuffler(this, CENTER_X, 20);
        //let spinner = new Spinner(this, CENTER_X, CENTER_Y)
        //console.log(spinner);

        this.enemyGroup = this.physics.add.group();

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
            b.destroy();
            //b.setActive(false).setVisible(false);
            player.addHP(1);
        })

        this.physics.add.overlap(player, this.enemyBullets, (p, b) => {
            b.destroy();
            //b.setActive(false).setVisible(false);
            player.removeHP(10);
        })
    }

    update(time, delta) {

        this.handleKeys();
        this.trySpawn(delta);
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

    trySpawn(delta) {
        if (this.spawnTimer > 0) {
            this.spawnTimer -= delta;
        } else {
            this.spawn();
            this.spawnTimer = gameOptions.spawnTimer;
        }
    }

    spawn() {
        let spawn1 = topLine.getRandomPoint();
        let spawn2 = bottomLine.getRandomPoint();
        let enemy1 = this.pickEnemy(spawn1);
        let enemy2 = this.pickEnemy(spawn2);
        this.enemyGroup.add(enemy1);
        this.enemyGroup.add(enemy2);
    }

    pickEnemy(point) {
        let rand = Phaser.Math.Between(0, 1);
        switch(rand) {
            case 0: return new Shuffler(this, point.x, point.y);
            case 1: return new Spinner(this, point.x, point.y);
        }
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