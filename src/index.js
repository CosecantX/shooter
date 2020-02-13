import Phaser from 'phaser';

let Scene1 = new Phaser.Scene();

const config = {
    type: Phaser.AUTO,
    parent: "cnv",
    width: 600,
    height: 800,
    scene: Scene1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

Scene1.init = function () {
    this.WIDTH = game.config.width;
    this.HEIGHT = game.config.height;
    this.CENTER_X = this.WIDTH / 2;
    this.CENTER_Y = this.HEIGHT / 2;
    this.PLAYER_SPEED = 250;
    this.PLAYER_DIAG_SPEED_COMPONENT = Math.sin(Phaser.Math.DegToRad(45)) * this.PLAYER_SPEED;

    /*this.getXYVelocities = function (angle, speed) {
        return {
            x: (speed * Math.sin(angle)), // Horizontal component
            y: (speed * -Math.cos(angle)) // Vertical component
        };
    }*/
}

class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(x, y) {
        super(Scene1, x, y, 'circle20');

        /*this.angle = angle;
        this.speed = speed;
        this.speedX = speed * Math.sin(angle);
        this.speedY = speed * -Math.cos(angle);
        this.setVelocityX(this.speedX);
        this.setVelocityY(this.speedY);*/
    }
}



Scene1.preload = function () {
    this.load.image('circle50', 'assets/circle50.png');
    this.load.image('circle20', 'assets/circle20.png');
}

Scene1.create = function () {
    this.physics.world.setBounds(0, 0, this.WIDTH, this.HEIGHT);
    this.player = this.physics.add.sprite(this.CENTER_X, 600, 'circle50');
    this.player.setCollideWorldBounds(true);

    console.log(this.player)

    this.cursors = this.input.keyboard.addKeys('w,a,s,d,up,down,left,right,space');

    var b = new Bullet(300, 500);
    console.log(b)
}

Scene1.update = function (time, delta) {

    if (this.cursors.w.isDown) {
        this.player.setAccelerationY(-800);
    } else if (this.cursors.s.isDown) {
        this.player.setAccelerationY(800);
    } else {
        this.player.setAccelerationY(0);
    }

    if (this.cursors.a.isDown) {
        this.player.setAccelerationX(-800);
    } else if (this.cursors.d.isDown) {
        this.player.setAccelerationX(800)
    } else {
        this.player.setAccelerationX(0);
    }

    

    if (this.cursors.space.isDown) {
        let bullet = this.physics.add.sprite(this.player.x, this.player.y, 'circle20');
        bullet.setVelocityY(-350);
    }

}



const game = new Phaser.Game(config);