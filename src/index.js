import Phaser from 'phaser';

var game;

const gameOptions = {
    playerSpeed: 200,
    //playerDiagSpeed: -1,
    playerHP: 100,
    playerFireRate: 100,
    playerHitBox: 12,
    shieldDistance: 30,
    playerHitTime: 500,
    playerHitHP: 10,
    playerShieldHP: 1,


    spawnTimer: 5000,
    bulletSpeed: 500,
    bulletLife: 2000,

    shfFireRate: 300,
    shfMoveRate: 500,
    shfMoveSpeed: 200,
    shfHitBox: 20,

    spnSpinRate: .03,
    spnFireRate: 100,
    spnMoveRate: 2000,
    spnMoveSpeed: 100,
    spnHitBox: 20,
}
//gameOptions.playerDiagSpeed = gameOptions.playerSpeed * Math.sin(Math.PI / 4);

const WIDTH = 600;
const HEIGHT = 800;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

var player;
var cursor;
var shield;
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
        this.setDepth(1);
    }
    
    preUpdate(time, delta) {
        this.update(time, delta)
    }

}

class Player extends Ship {
    constructor(scene) {
        super(scene, CENTER_X, 600, 'ship');
        this.setCollideWorldBounds(true);
        this.setSize(gameOptions.playerHitBox, gameOptions.playerHitBox);

        this.fireTimer = gameOptions.playerFireRate;
        this.fireBullet = false;
        this.hp = gameOptions.playerHP;
        this.hitTimer = 0;
        this.hitOK = true;
    }

    update(time, delta) {
        this.setRotation(Math.PI / 2 + Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y));
        if (this.hitTimer > 0) {
            this.hitTimer -= delta;
        } else if (!this.hitOK) {
            this.hitOK = true;
        }
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
    
    hit() {
        if (this.hitOK) {
            this.removeHP(gameOptions.playerHitHP);
            this.hitOK = false;
            this.hitTimer = gameOptions.playerHitTime;
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

class Shield extends Phaser.Physics.Arcade.Image {
    constructor(scene) {
        super(scene, 100, 100, 'shield');
        scene.physics.add.existing(scene.add.existing(this));
        this.setSize(this.height, this.height);
        this.setDepth(1);
    }

    preUpdate(time, delta) {
        this.update(time, delta)
    }

    update(time, delta) {
        let angle = Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);
        this.setRotation(angle);
        let point = new Phaser.Geom.Point(player.x + gameOptions.shieldDistance * Math.cos(angle), player.y + gameOptions.shieldDistance * Math.sin(angle));
        this.x = point.x;
        this.y = point.y;
    }
}

class Shuffler extends Ship {
    constructor(scene, x, y) {
        super(scene, x, y, 'shuffler');
        this.setCollideWorldBounds(true);
        this.setSize(gameOptions.shfHitBox, gameOptions.shfHitBox);

        this.moveAngle = 0;
        this.moveTimer = gameOptions.shfMoveRate;
        this.fireTimer = gameOptions.shfFireRate;
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
        super(scene, x, y, 'spinner');
        this.setCollideWorldBounds(true);
        this.setSize(gameOptions.spnHitBox, gameOptions.spnHitBox);

        this.spinDir = +1;
        this.moveAngle = 0;
        this.moveTimer = gameOptions.spnMoveRate;
        this.fireTimer = gameOptions.spnFireRate;

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
        this.load.image('ship', 'assets/ship.png');
        this.load.image('shot', 'assets/shot.png');
        this.load.image('eshot', 'assets/eshot.png');
        this.load.image('cursor', 'assets/cursor.png');
        this.load.image('shuffler', 'assets/shuffler.png');
        this.load.image('spinner', 'assets/spinner.png');
        this.load.image('shield', 'assets/shield.png');
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

        this.enemyGroup = this.physics.add.group({
            collideWorldBounds: true,
        });

        this.playerBullets = this.physics.add.group({
            classType: pBullet,
            runChildUpdate: true
        });
        this.enemyBullets = this.physics.add.group({
            classType: eBullet,
            runChildUpdate: true
        });

        cursor = this.physics.add.image(CENTER_X, -100, 'cursor');

        shield = new Shield(this);

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

        this.physics.add.overlap(shield, this.enemyBullets, (c, b) => {
            b.destroy();
            //b.setActive(false).setVisible(false);
            player.addHP(1);
        })

        this.physics.add.overlap(player, this.enemyBullets, (p, b) => {
            b.destroy();
            //b.setActive(false).setVisible(false);
            player.hit();
        })

        this.physics.add.overlap(this.playerBullets, this.enemyGroup, (b, e) => {
            b.destroy();
            e.destroy();
        })

        this.physics.add.collider(player, this.enemyGroup);

        this.physics.add.collider(this.enemyGroup, this.enemyGroup);
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
