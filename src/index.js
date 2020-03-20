import Phaser from 'phaser';

var game;

const settings = {
    playerSpeed: 200,
    //playerDiagSpeed: -1,
    playerHP: 100,
    playerFireRate: 100,
    playerHitBox: 12,
    shieldDistance: 30,
    playerHitTime: 400,
    playerHitHP: 10,
    //playerShieldHP: 1,

    scoreEnemy: 100,
    scoreShot: 1,
    spawnTimer: 5000,
    bulletSpeed: 500,
    bulletLife: 2000,
    closeStarDuration: 4000,
    farStarDuration: 8000,
    closeStarTimer: 500,
    farStarTimer: 500,
    dropRate: .25,
    pickupHP: 10,
    pickupScore: 500,
    dropRot: 0.03,
    pickupDuration: 5000,

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
var text2;
var score = 0;
var topLine = new Phaser.Geom.Line(10, -10, WIDTH - 10, -10);
var bottomLine = new Phaser.Geom.Line(10, HEIGHT + 10, WIDTH - 10, HEIGHT + 10);

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        parent: "cnv",
        width: WIDTH,
        height: HEIGHT,
        scene: [loadScene, gameScene, gameOver],
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
        if (this.born > settings.bulletLife) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    fire(source, target) {
        this.born = 0;
        this.x = source.x;
        this.y = source.y;

        this.rotation = Math.PI / 2 + Phaser.Math.Angle.Between(source.x, source.y, target.x, target.y);

        let v = getXYVelocities(this.rotation, settings.bulletSpeed);
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
        super(scene, CENTER_X, CENTER_Y, 'ship');
        this.setCollideWorldBounds(true);
        this.setSize(settings.playerHitBox, settings.playerHitBox);

        this.fireTimer = settings.playerFireRate;
        this.fireBullet = false;
        this.hp = settings.playerHP;
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
            this.fireTimer = settings.playerFireRate;
        }
    }

    hit() {
        if (this.hitOK) {
            this.removeHP(settings.playerHitHP);
            this.hitOK = false;
            this.hitTimer = settings.playerHitTime;
        }
    }

    removeHP(num) {
        this.hp -= num;
        if (this.hp <= 0) {
            this.hp = 0;
            text.setText('HP: ' + this.hp);
            this.scene.scene.start('GameOver');
        } else {
            text.setText('HP: ' + this.hp);
        }
    }

    addHP(num) {
        this.hp += num;
        if (this.hp > settings.playerHP) {
            this.hp = settings.playerHP;
        }
        text.setText('HP: ' + this.hp);
    }

}

class Shield extends Phaser.Physics.Arcade.Image {
    constructor(scene) {
        super(scene, -100, -100, 'shield');
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
        let point = new Phaser.Geom.Point(player.x + settings.shieldDistance * Math.cos(angle), player.y + settings.shieldDistance * Math.sin(angle));
        this.x = point.x;
        this.y = point.y;
    }
}

class Pickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, -100, -100, 'pickup');
        scene.physics.add.existing(scene.add.existing(this));
        this.setDepth(1);
        scene.add.tween({
            targets: this,
            duration: settings.pickupDuration,
            ease: 'Linear',
            rotation: 2 * Math.PI,
            loop: -1
        })
    }

    tryDrop(source) {
        if (settings.dropRate >= Math.random()) {
            this.drop(source);
        }
    }

    drop(source) {
        this.x = source.x;
        this.y = source.y;
        this.setActive(true).setVisible(true);
    }
}

class Shuffler extends Ship {
    constructor(scene, x, y) {
        super(scene, x, y, 'shuffler');
        //this.setCollideWorldBounds(true);
        this.setSize(settings.shfHitBox, settings.shfHitBox);

        this.moveAngle = 0;
        this.moveTimer = settings.shfMoveRate;
        this.fireTimer = settings.shfFireRate;
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
            this.fireTimer = settings.shfFireRate;
        }
    }

    tryMove(delta) {
        if (this.moveTimer > 0) {
            this.moveTimer -= delta;
        } else {
            this.moveAngle = Phaser.Math.RND.rotation();
            this.move();
            this.moveTimer = settings.shfMoveRate;
        }
    }

    move(angle) {
        if (angle) {
            this.moveAngle = angle;
        }

        let v = getXYVelocities(this.moveAngle, settings.shfMoveSpeed);
        this.setVelocity(v.x, v.y);
    }

}

class Spinner extends Ship {
    constructor(scene, x, y) {
        super(scene, x, y, 'spinner');
        //this.setCollideWorldBounds(true);
        this.setSize(settings.spnHitBox, settings.spnHitBox);

        this.spinDir = +1;
        this.moveAngle = 0;
        this.moveTimer = settings.spnMoveRate;
        this.fireTimer = settings.spnFireRate;

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
            this.moveTimer = settings.spnMoveRate;
        }
    }

    move(angle) {
        if (angle) {
            this.moveAngle = angle;
        }

        let v = getXYVelocities(this.moveAngle, settings.spnMoveSpeed);
        this.setVelocity(v.x, v.y);
    }

    movePoints() {
        Phaser.Geom.Line.CenterOn(this.line, this.x, this.y);
    }

    rotatePoints() {
        Phaser.Geom.Line.Rotate(this.line, this.spinDir * settings.spnSpinRate);
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
            this.fireTimer = settings.spnFireRate;
        }
    }
}

class Star extends Phaser.GameObjects.Image {
    constructor(scene, duration, texture) {
        super(scene, -10, -10, texture);
        scene.add.existing(this);
        this.duration = duration;
    }

    fire(x) {
        this.x = x;
        //this.y = -10;
        this.scene.add.tween({
            targets: this,
            duration: this.duration,
            y: {
                start: -10,
                to: HEIGHT + 10
            },
            ease: 'Linear',
            onComplete: function (tween, targets) {
                targets.forEach(e => {
                    e.setActive(false);
                    e.setVisible(false);
                })
            }
        })
    }
}

class CloseStar extends Star {
    constructor(scene) {
        super(scene, settings.closeStarDuration, 'star-close');
    }
}

class FarStar extends Star {
    constructor(scene) {
        super(scene, settings.farStarDuration, 'star-far');
    }
}

class loadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }

    preload() {
        let shoottext = this.add.text(CENTER_X, CENTER_Y - 200, 'Shooter Game');
        shoottext.x = CENTER_X - (shoottext.width / 2);

        this.load.image('ship', 'assets/ship.png');
        this.load.image('shot', 'assets/shot.png');
        this.load.image('eshot', 'assets/eshot.png');
        this.load.image('cursor', 'assets/cursor.png');
        this.load.image('shuffler', 'assets/shuffler.png');
        this.load.image('spinner', 'assets/spinner.png');
        this.load.image('shield', 'assets/shield.png');
        this.load.image('star-close', 'assets/star-close.png');
        this.load.image('star-far', 'assets/star-far.png');
        this.load.image('pickup', 'assets/pickup.png');
    }

    create() {
        let start = this.add.text(CENTER_X, CENTER_Y, 'CLICK TO START');
        start.x = CENTER_X - (start.width / 2);
        start.setInteractive();
        start.on('pointerdown', e => {
            this.scene.start('GameScene');
        })
    }
}

class gameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);

        // Set global vars

        player = new Player(this);

        cursor = this.physics.add.image(-100, -100, 'cursor');

        shield = new Shield(this);

        keys = this.input.keyboard.addKeys('W,A,S,D,C');

        text = this.add.text(10, 10, 'HP: ' + player.hp).setDepth(2);

        text2 = this.add.text(10, 30, 'Score: ' + score).setDepth(2);

        // Set timers

        this.spawnTimer = settings.spawnTimer;

        this.closeStarTimer = settings.closeStarTimer;

        this.farStarTimer = settings.farStarTimer;

        // Set groups

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

        this.closeStars = this.add.group({
            classType: CloseStar
        })

        this.farStars = this.add.group({
            classType: FarStar
        })

        this.pickups = this.physics.add.group({
            classType: Pickup,
        })

        // Set input events

        this.input.on('pointermove', (pointer) => {
            cursor.setPosition(pointer.x, pointer.y)
        })

        this.input.on('pointerdown', pointer => {
            player.fireBullet = true;
        })

        this.input.on('pointerup', pointer => {
            player.fireBullet = false;
        })

        // Set overlaps and colliders

        this.physics.add.overlap(shield, this.enemyBullets, (s, b) => {
            b.destroy();
            //player.addHP(settings.playerShieldHP);
            score += settings.scoreShot;
            text2.setText('Score: ' + score);
        })

        this.physics.add.overlap(player, this.enemyBullets, (p, b) => {
            b.destroy();
            player.hit();
        })

        this.physics.add.overlap(this.playerBullets, this.enemyGroup, (b, e) => {
            b.destroy();
            e.destroy();
            score += settings.scoreEnemy;
            text2.setText('Score: ' + score);

            let pickup = this.pickups.get();
            pickup.tryDrop(e);
        })

        this.physics.add.overlap(player, this.pickups, (pl, pu) => {
            player.addHP(settings.pickupHP);
            score += settings.pickupScore;
            pu.x = -100;
            pu.y = -100;
            pu.setActive(false).setVisible(false);
        })

        this.physics.add.collider(player, this.enemyGroup);

        this.physics.add.collider(this.enemyGroup, this.enemyGroup);
    }

    update(time, delta) {

        this.handleKeys();
        this.trySpawn(delta);
        this.tryFireStar(delta);
    }

    handleKeys() {

        if (keys.W.isDown) {
            player.setVelocityY(-settings.playerSpeed);
        } else if (keys.S.isDown) {
            player.setVelocityY(settings.playerSpeed);
        } else {
            player.setVelocityY(0);
        }

        if (keys.A.isDown) {
            player.setVelocityX(-settings.playerSpeed);
        } else if (keys.D.isDown) {
            player.setVelocityX(settings.playerSpeed);
        } else {
            player.setVelocityX(0);
        }

        if (keys.C.isDown) {
            this.enemyGroup.getChildren().forEach(e => {
                e.destroy();
            })
        }
    }

    trySpawn(delta) {
        if (this.spawnTimer > 0) {
            this.spawnTimer -= delta;
        } else {
            this.spawn();
            this.spawnTimer = settings.spawnTimer;
        }
    }

    spawn() {
        let spawn1 = topLine.getRandomPoint();
        let spawn2 = bottomLine.getRandomPoint();
        let enemy1 = this.pickEnemy(spawn1);
        let enemy2 = this.pickEnemy(spawn2);
        this.add.tween({
            targets: enemy1,
            ease: 'Linear',
            duration: 500,
            y: {
                start: -10,
                to: 20
            },
            onComplete: function (tween, targets) {
                targets.forEach(e => {
                    e.scene.enemyGroup.add(e);
                })
            }
        })
        this.add.tween({
            targets: enemy2,
            ease: 'Linear',
            duration: 500,
            y: {
                start: (HEIGHT + 10),
                to: (HEIGHT - 20)
            },
            onComplete: function (tween, targets) {
                targets.forEach(e => {
                    e.scene.enemyGroup.add(e);
                })
            }
        })
    }

    pickEnemy(point) {
        let rand = Phaser.Math.Between(0, 1);
        switch (rand) {
            case 0:
                return new Shuffler(this, point.x, point.y);
            case 1:
                return new Spinner(this, point.x, point.y);
        }
    }

    tryFireStar(delta) {
        if (this.closeStarTimer > 0) {
            this.closeStarTimer -= delta;
        } else {
            let x = Phaser.Math.Between(0, WIDTH);
            this.fireCloseStar(x);
            this.closeStarTimer = settings.closeStarTimer;
        }

        if (this.farStarTimer > 0) {
            this.farStarTimer -= delta;
        } else {
            let x = Phaser.Math.Between(0, WIDTH);
            this.fireFarStar(x);
            this.farStarTimer = settings.farStarTimer;
        }
    }

    fireCloseStar(x) {
        let star = this.closeStars.get().setActive(true).setVisible(true);
        if (star) {
            star.fire(x);
        }
    }

    fireFarStar(x) {
        let star = this.farStars.get().setActive(true).setVisible(true);
        if (star) {
            star.fire(x);
        }
    }
}

class gameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        let go = this.add.text(CENTER_X, CENTER_Y - 200, 'GAME OVER');
        go.x = CENTER_X - (go.width / 2);

        let scoretext = this.add.text(CENTER_X, CENTER_Y - 100, 'SCORE: ' + score);
        scoretext.x = CENTER_X - (scoretext.width / 2);

        let restart = this.add.text(CENTER_X, CENTER_Y + 100, 'Restart?');
        restart.x = CENTER_X - (restart.width / 2);
        restart.setInteractive();
        restart.on('pointerdown', e => {
            this.scene.start('GameScene');
        })
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