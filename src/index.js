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

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(x, y, angle, speed) {
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

    this.cursors = this.input.keyboard.addKeys('w,a,s,d,up,down,left,right,space');
    this.keys = {};
    this.keys.left = function () {
        return (Scene1.cursors.left.isDown || Scene1.cursors.a.isDown)
    };
    this.keys.right = function () {
        return (Scene1.cursors.right.isDown || Scene1.cursors.d.isDown)
    };
    this.keys.up = function () {
        return (Scene1.cursors.up.isDown || Scene1.cursors.w.isDown)
    };
    this.keys.down = function () {
        return (Scene1.cursors.down.isDown || Scene1.cursors.s.isDown)
    };

    this.checkMovement = function () {
        // direction key movement
        if (this.keys.up()) {
            if (this.keys.left()) {
                this.player.setVelocity(-this.PLAYER_DIAG_SPEED_COMPONENT, -this.PLAYER_DIAG_SPEED_COMPONENT);
            } else if (this.keys.right()) {
                this.player.setVelocity(this.PLAYER_DIAG_SPEED_COMPONENT, -this.PLAYER_DIAG_SPEED_COMPONENT);
            } else {
                this.player.setVelocity(0, -this.PLAYER_SPEED);
            }
        } else if (this.keys.left()) {
            if (this.keys.up()) {
                this.player.setVelocity(-this.PLAYER_DIAG_SPEED_COMPONENT, -this.PLAYER_DIAG_SPEED_COMPONENT);
            } else if (this.keys.down()) {
                this.player.setVelocity(-this.PLAYER_DIAG_SPEED_COMPONENT, this.PLAYER_DIAG_SPEED_COMPONENT);
            } else {
                this.player.setVelocity(-this.PLAYER_SPEED, 0);
            }
        } else if (this.keys.down()) {
            if (this.keys.left()) {
                this.player.setVelocity(-this.PLAYER_DIAG_SPEED_COMPONENT, this.PLAYER_DIAG_SPEED_COMPONENT);
            } else if (this.keys.right()) {
                this.player.setVelocity(this.PLAYER_DIAG_SPEED_COMPONENT, this.PLAYER_DIAG_SPEED_COMPONENT);
            } else {
                this.player.setVelocity(0, this.PLAYER_SPEED);
            }
        } else if (this.keys.right()) {
            if (this.keys.up()) {
                this.player.setVelocity(this.PLAYER_DIAG_SPEED_COMPONENT, -this.PLAYER_DIAG_SPEED_COMPONENT);
            } else if (this.keys.down()) {
                this.player.setVelocity(this.PLAYER_DIAG_SPEED_COMPONENT, this.PLAYER_DIAG_SPEED_COMPONENT);
            } else {
                this.player.setVelocity(this.PLAYER_SPEED, 0);
            }
        } else {
            this.player.setVelocity(0, 0);
        }
    }

}

Scene1.update = function () {

    this.checkMovement();

    if (this.cursors.space.isDown) {
        let bullet = this.physics.add.sprite(this.player.x, this.player.y, 'circle20');
        bullet.setVelocityY(-350);
    }

}



const game = new Phaser.Game(config);