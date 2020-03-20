/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nvar game;\r\n\r\nconst settings = {\r\n    playerSpeed: 200,\r\n    //playerDiagSpeed: -1,\r\n    playerHP: 100,\r\n    playerFireRate: 100,\r\n    playerHitBox: 12,\r\n    shieldDistance: 30,\r\n    playerHitTime: 400,\r\n    playerHitHP: 10,\r\n    //playerShieldHP: 1,\r\n\r\n    scoreEnemy: 100,\r\n    scoreShot: 1,\r\n    spawnTimer: 5000,\r\n    spawnDec: 100,\r\n    bulletSpeed: 500,\r\n    bulletLife: 2000,\r\n    closeStarDuration: 4000,\r\n    farStarDuration: 8000,\r\n    closeStarTimer: 500,\r\n    farStarTimer: 500,\r\n    dropRate: .25,\r\n    pickupHP: 10,\r\n    pickupScore: 500,\r\n    dropRot: 0.03,\r\n    pickupDuration: 5000,\r\n\r\n    shfFireRate: 300,\r\n    shfMoveRate: 500,\r\n    shfMoveSpeed: 200,\r\n    shfHitBox: 20,\r\n\r\n    spnSpinRate: .03,\r\n    spnFireRate: 100,\r\n    spnMoveRate: 2000,\r\n    spnMoveSpeed: 100,\r\n    spnHitBox: 20,\r\n}\r\n//gameOptions.playerDiagSpeed = gameOptions.playerSpeed * Math.sin(Math.PI / 4);\r\n\r\nconst WIDTH = 600;\r\nconst HEIGHT = 800;\r\nconst CENTER_X = WIDTH / 2;\r\nconst CENTER_Y = HEIGHT / 2;\r\n\r\nvar player;\r\nvar cursor;\r\nvar shield;\r\nvar keys;\r\nvar text;\r\nvar text2;\r\nvar text3;\r\nvar score;\r\nvar highScore = parseInt(localStorage.getItem('highScore')) || 0;\r\nvar topLine = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(10, -10, WIDTH - 10, -10);\r\nvar bottomLine = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(10, HEIGHT + 10, WIDTH - 10, HEIGHT + 10);\r\n\r\nwindow.onload = function () {\r\n    const config = {\r\n        type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\r\n        parent: \"cnv\",\r\n        width: WIDTH,\r\n        height: HEIGHT,\r\n        scene: [loadScene, gameScene, gameOver],\r\n        physics: {\r\n            default: 'arcade',\r\n            arcade: {\r\n                //debug: true\r\n            }\r\n        }\r\n    }\r\n\r\n    game = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game(config);\r\n    window.focus();\r\n    resizeGame();\r\n    window.addEventListener('resize', resizeGame);\r\n}\r\n\r\nclass Bullet extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Image {\r\n    constructor(scene, type) {\r\n        super(scene, -100, -100, type)\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setSize(this.width, this.width);\r\n\r\n        this.born = 0;\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.born += delta;\r\n        if (this.born > settings.bulletLife) {\r\n            this.setActive(false);\r\n            this.setVisible(false);\r\n        }\r\n    }\r\n\r\n    fire(source, target) {\r\n        this.born = 0;\r\n        this.x = source.x;\r\n        this.y = source.y;\r\n\r\n        this.rotation = Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(source.x, source.y, target.x, target.y);\r\n\r\n        let v = getXYVelocities(this.rotation, settings.bulletSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n}\r\n\r\nclass pBullet extends Bullet {\r\n    constructor(scene) {\r\n        super(scene, 'shot')\r\n    }\r\n}\r\n\r\nclass eBullet extends Bullet {\r\n    constructor(scene) {\r\n        super(scene, 'eshot')\r\n    }\r\n}\r\n\r\nclass Ship extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Sprite {\r\n    constructor(scene, x, y, type) {\r\n        super(scene, x, y, type)\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setDepth(1);\r\n    }\r\n\r\n    preUpdate(time, delta) {\r\n        this.update(time, delta)\r\n    }\r\n\r\n}\r\n\r\nclass Player extends Ship {\r\n    constructor(scene) {\r\n        super(scene, CENTER_X, CENTER_Y, 'ship');\r\n        this.setCollideWorldBounds(true);\r\n        this.setSize(settings.playerHitBox, settings.playerHitBox);\r\n\r\n        this.fireTimer = settings.playerFireRate;\r\n        this.fireBullet = false;\r\n        this.hp = settings.playerHP;\r\n        this.hitTimer = 0;\r\n        this.hitOK = true;\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.setRotation(Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y));\r\n        if (this.hitTimer > 0) {\r\n            this.hitTimer -= delta;\r\n        } else if (!this.hitOK) {\r\n            this.hitOK = true;\r\n        }\r\n        this.tryFire(delta);\r\n\r\n    }\r\n\r\n    tryFire(delta) {\r\n        if (this.fireTimer > 0) {\r\n            this.fireTimer -= delta;\r\n        } else if (this.fireBullet) {\r\n            let bullet = this.scene.playerBullets.get().setActive(true).setVisible(true);\r\n            if (bullet) {\r\n                bullet.fire(player, cursor);\r\n            }\r\n            this.fireTimer = settings.playerFireRate;\r\n        }\r\n    }\r\n\r\n    hit() {\r\n        if (this.hitOK) {\r\n            this.removeHP(settings.playerHitHP);\r\n            this.hitOK = false;\r\n            this.hitTimer = settings.playerHitTime;\r\n        }\r\n    }\r\n\r\n    removeHP(num) {\r\n        this.hp -= num;\r\n        if (this.hp <= 0) {\r\n            this.hp = 0;\r\n            text.setText('HP: ' + this.hp);\r\n            this.scene.scene.start('GameOver');\r\n        } else {\r\n            text.setText('HP: ' + this.hp);\r\n        }\r\n    }\r\n\r\n    addHP(num) {\r\n        this.hp += num;\r\n        if (this.hp > settings.playerHP) {\r\n            this.hp = settings.playerHP;\r\n        }\r\n        text.setText('HP: ' + this.hp);\r\n    }\r\n\r\n}\r\n\r\nclass Shield extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Image {\r\n    constructor(scene) {\r\n        super(scene, -100, -100, 'shield');\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setSize(this.height, this.height);\r\n        this.setDepth(1);\r\n    }\r\n\r\n    preUpdate(time, delta) {\r\n        this.update(time, delta)\r\n    }\r\n\r\n    update(time, delta) {\r\n        let angle = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);\r\n        this.setRotation(angle);\r\n        let point = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Point(player.x + settings.shieldDistance * Math.cos(angle), player.y + settings.shieldDistance * Math.sin(angle));\r\n        this.x = point.x;\r\n        this.y = point.y;\r\n    }\r\n}\r\n\r\nclass Pickup extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Sprite {\r\n    constructor(scene) {\r\n        super(scene, -100, -100, 'pickup');\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setDepth(1);\r\n        scene.add.tween({\r\n            targets: this,\r\n            duration: settings.pickupDuration,\r\n            ease: 'Linear',\r\n            rotation: 2 * Math.PI,\r\n            loop: -1\r\n        })\r\n    }\r\n\r\n    tryDrop(source) {\r\n        if (settings.dropRate >= Math.random()) {\r\n            this.drop(source);\r\n        }\r\n    }\r\n\r\n    drop(source) {\r\n        this.x = source.x;\r\n        this.y = source.y;\r\n        this.setActive(true).setVisible(true);\r\n    }\r\n}\r\n\r\nclass Shuffler extends Ship {\r\n    constructor(scene, x, y) {\r\n        super(scene, x, y, 'shuffler');\r\n        //this.setCollideWorldBounds(true);\r\n        this.setSize(settings.shfHitBox, settings.shfHitBox);\r\n\r\n        this.moveAngle = 0;\r\n        this.moveTimer = settings.shfMoveRate;\r\n        this.fireTimer = settings.shfFireRate;\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.tryMove(delta);\r\n        this.tryFire(delta);\r\n    }\r\n\r\n    tryFire(delta) {\r\n        if (this.fireTimer > 0) {\r\n            this.fireTimer -= delta;\r\n        } else {\r\n            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);\r\n            if (bullet) {\r\n                bullet.fire(this, player);\r\n                this.setRotation(Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(this.x, this.y, player.x, player.y));\r\n            }\r\n            this.fireTimer = settings.shfFireRate;\r\n        }\r\n    }\r\n\r\n    tryMove(delta) {\r\n        if (this.moveTimer > 0) {\r\n            this.moveTimer -= delta;\r\n        } else {\r\n            this.moveAngle = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.RND.rotation();\r\n            this.move();\r\n            this.moveTimer = settings.shfMoveRate;\r\n        }\r\n    }\r\n\r\n    move(angle) {\r\n        if (angle) {\r\n            this.moveAngle = angle;\r\n        }\r\n\r\n        let v = getXYVelocities(this.moveAngle, settings.shfMoveSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n\r\n}\r\n\r\nclass Spinner extends Ship {\r\n    constructor(scene, x, y) {\r\n        super(scene, x, y, 'spinner');\r\n        //this.setCollideWorldBounds(true);\r\n        this.setSize(settings.spnHitBox, settings.spnHitBox);\r\n\r\n        this.spinDir = +1;\r\n        this.moveAngle = 0;\r\n        this.moveTimer = settings.spnMoveRate;\r\n        this.fireTimer = settings.spnFireRate;\r\n\r\n        this.line = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(x, y - 1, x, y + 1);\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.tryMove(delta);\r\n        this.movePoints();\r\n        this.tryFire(delta);\r\n        this.rotatePoints();\r\n    }\r\n\r\n    tryMove(delta) {\r\n        if (this.moveTimer > 0) {\r\n            this.moveTimer -= delta;\r\n        } else {\r\n            this.moveAngle = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.RND.rotation();\r\n            this.move();\r\n            this.moveTimer = settings.spnMoveRate;\r\n        }\r\n    }\r\n\r\n    move(angle) {\r\n        if (angle) {\r\n            this.moveAngle = angle;\r\n        }\r\n\r\n        let v = getXYVelocities(this.moveAngle, settings.spnMoveSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n\r\n    movePoints() {\r\n        phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line.CenterOn(this.line, this.x, this.y);\r\n    }\r\n\r\n    rotatePoints() {\r\n        phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line.Rotate(this.line, this.spinDir * settings.spnSpinRate);\r\n        let point = this.line.getPointB();\r\n        this.setRotation(Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(this.x, this.y, point.x, point.y));\r\n    }\r\n\r\n    tryFire(delta) {\r\n        if (this.fireTimer > 0) {\r\n            this.fireTimer -= delta;\r\n        } else {\r\n            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);\r\n            let bullet2 = this.scene.enemyBullets.get().setActive(true).setVisible(true);\r\n            if (bullet && bullet2) {\r\n                bullet.fire(this, this.line.getPointA());\r\n                bullet2.fire(this, this.line.getPointB());\r\n            }\r\n            this.fireTimer = settings.spnFireRate;\r\n        }\r\n    }\r\n}\r\n\r\nclass Star extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.GameObjects.Image {\r\n    constructor(scene, duration, texture) {\r\n        super(scene, -10, -10, texture);\r\n        scene.add.existing(this);\r\n        this.duration = duration;\r\n    }\r\n\r\n    fire(x) {\r\n        this.x = x;\r\n        //this.y = -10;\r\n        this.scene.add.tween({\r\n            targets: this,\r\n            duration: this.duration,\r\n            y: {\r\n                start: -10,\r\n                to: HEIGHT + 10\r\n            },\r\n            ease: 'Linear',\r\n            onComplete: function (tween, targets) {\r\n                targets.forEach(e => {\r\n                    e.setActive(false);\r\n                    e.setVisible(false);\r\n                })\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\nclass CloseStar extends Star {\r\n    constructor(scene) {\r\n        super(scene, settings.closeStarDuration, 'star-close');\r\n    }\r\n}\r\n\r\nclass FarStar extends Star {\r\n    constructor(scene) {\r\n        super(scene, settings.farStarDuration, 'star-far');\r\n    }\r\n}\r\n\r\nclass loadScene extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('LoadScene');\r\n    }\r\n\r\n    preload() {\r\n        let shoottext = this.add.text(CENTER_X, CENTER_Y - 200, 'Shooter Game');\r\n        shoottext.x = CENTER_X - (shoottext.width / 2);\r\n\r\n        this.load.image('ship', 'assets/ship.png');\r\n        this.load.image('shot', 'assets/shot.png');\r\n        this.load.image('eshot', 'assets/eshot.png');\r\n        this.load.image('cursor', 'assets/cursor.png');\r\n        this.load.image('shuffler', 'assets/shuffler.png');\r\n        this.load.image('spinner', 'assets/spinner.png');\r\n        this.load.image('shield', 'assets/shield.png');\r\n        this.load.image('star-close', 'assets/star-close.png');\r\n        this.load.image('star-far', 'assets/star-far.png');\r\n        this.load.image('pickup', 'assets/pickup.png');\r\n    }\r\n\r\n    create() {\r\n        let start = this.add.text(CENTER_X, CENTER_Y, 'CLICK TO START');\r\n        start.x = CENTER_X - (start.width / 2);\r\n        start.setInteractive();\r\n        start.on('pointerdown', e => {\r\n            this.scene.start('GameScene');\r\n        })\r\n    }\r\n}\r\n\r\nclass gameScene extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('GameScene');\r\n    }\r\n\r\n    create() {\r\n        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);\r\n\r\n        // Set global vars\r\n\r\n        score = 0;\r\n\r\n        player = new Player(this);\r\n\r\n        cursor = this.physics.add.image(-100, -100, 'cursor');\r\n\r\n        shield = new Shield(this);\r\n\r\n        keys = this.input.keyboard.addKeys('W,A,S,D,C');\r\n\r\n        text = this.add.text(10, 10, 'HP: ' + player.hp).setDepth(2);\r\n\r\n        text2 = this.add.text(10, 30, 'Score: ' + score).setDepth(2);\r\n\r\n        text3 = this.add.text(10, 50, 'High Score: ' + highScore).setDepth(2);\r\n\r\n        // Set timers\r\n\r\n        this.spawnTimer = settings.spawnTimer;\r\n\r\n        this.spawnDec = 0;\r\n\r\n        this.closeStarTimer = settings.closeStarTimer;\r\n\r\n        this.farStarTimer = settings.farStarTimer;\r\n\r\n        // Set groups\r\n\r\n        this.enemyGroup = this.physics.add.group({\r\n            collideWorldBounds: true,\r\n        });\r\n\r\n        this.playerBullets = this.physics.add.group({\r\n            classType: pBullet,\r\n            runChildUpdate: true\r\n        });\r\n\r\n        this.enemyBullets = this.physics.add.group({\r\n            classType: eBullet,\r\n            runChildUpdate: true\r\n        });\r\n\r\n        this.closeStars = this.add.group({\r\n            classType: CloseStar\r\n        })\r\n\r\n        this.farStars = this.add.group({\r\n            classType: FarStar\r\n        })\r\n\r\n        this.pickups = this.physics.add.group({\r\n            classType: Pickup,\r\n        })\r\n\r\n        // Set input events\r\n\r\n        this.input.on('pointermove', (pointer) => {\r\n            cursor.setPosition(pointer.x, pointer.y)\r\n        })\r\n\r\n        this.input.on('pointerdown', pointer => {\r\n            player.fireBullet = true;\r\n        })\r\n\r\n        this.input.on('pointerup', pointer => {\r\n            player.fireBullet = false;\r\n        })\r\n\r\n        // Set overlaps and colliders\r\n\r\n        this.physics.add.overlap(shield, this.enemyBullets, (s, b) => {\r\n            b.destroy();\r\n            //player.addHP(settings.playerShieldHP);\r\n            score += settings.scoreShot;\r\n            text2.setText('Score: ' + score);\r\n        })\r\n\r\n        this.physics.add.overlap(player, this.enemyBullets, (p, b) => {\r\n            b.destroy();\r\n            player.hit();\r\n        })\r\n\r\n        this.physics.add.overlap(this.playerBullets, this.enemyGroup, (b, e) => {\r\n            b.destroy();\r\n            e.destroy();\r\n            score += settings.scoreEnemy;\r\n            text2.setText('Score: ' + score);\r\n\r\n            let pickup = this.pickups.get();\r\n            pickup.tryDrop(e);\r\n        })\r\n\r\n        this.physics.add.overlap(player, this.pickups, (pl, pu) => {\r\n            player.addHP(settings.pickupHP);\r\n            score += settings.pickupScore;\r\n            text2.setText('Score: ' + score);\r\n            pu.x = -100;\r\n            pu.y = -100;\r\n            pu.setActive(false).setVisible(false);\r\n        })\r\n\r\n        this.physics.add.collider(player, this.enemyGroup);\r\n\r\n        this.physics.add.collider(this.enemyGroup, this.enemyGroup);\r\n    }\r\n\r\n    update(time, delta) {\r\n\r\n        this.handleKeys();\r\n        this.trySpawn(delta);\r\n        this.tryFireStar(delta);\r\n    }\r\n\r\n    handleKeys() {\r\n\r\n        if (keys.W.isDown) {\r\n            player.setVelocityY(-settings.playerSpeed);\r\n        } else if (keys.S.isDown) {\r\n            player.setVelocityY(settings.playerSpeed);\r\n        } else {\r\n            player.setVelocityY(0);\r\n        }\r\n\r\n        if (keys.A.isDown) {\r\n            player.setVelocityX(-settings.playerSpeed);\r\n        } else if (keys.D.isDown) {\r\n            player.setVelocityX(settings.playerSpeed);\r\n        } else {\r\n            player.setVelocityX(0);\r\n        }\r\n\r\n        if (keys.C.isDown) {\r\n            this.enemyGroup.getChildren().forEach(e => {\r\n                e.destroy();\r\n            })\r\n        }\r\n    }\r\n\r\n    trySpawn(delta) {\r\n        if (this.spawnTimer > 0) {\r\n            this.spawnTimer -= delta;\r\n        } else {\r\n            this.spawn();\r\n            this.spawnDec += settings.spawnDec;\r\n            this.spawnTimer = settings.spawnTimer - this.spawnDec;\r\n            console.log(this.spawnTimer)\r\n        }\r\n    }\r\n\r\n    spawn() {\r\n        let spawn1 = topLine.getRandomPoint();\r\n        let spawn2 = bottomLine.getRandomPoint();\r\n        let enemy1 = this.pickEnemy(spawn1);\r\n        let enemy2 = this.pickEnemy(spawn2);\r\n        this.add.tween({\r\n            targets: enemy1,\r\n            ease: 'Linear',\r\n            duration: 500,\r\n            y: {\r\n                start: -10,\r\n                to: 20\r\n            },\r\n            onComplete: function (tween, targets) {\r\n                targets.forEach(e => {\r\n                    e.scene.enemyGroup.add(e);\r\n                })\r\n            }\r\n        })\r\n        this.add.tween({\r\n            targets: enemy2,\r\n            ease: 'Linear',\r\n            duration: 500,\r\n            y: {\r\n                start: (HEIGHT + 10),\r\n                to: (HEIGHT - 20)\r\n            },\r\n            onComplete: function (tween, targets) {\r\n                targets.forEach(e => {\r\n                    e.scene.enemyGroup.add(e);\r\n                })\r\n            }\r\n        })\r\n    }\r\n\r\n    pickEnemy(point) {\r\n        let rand = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Between(0, 1);\r\n        switch (rand) {\r\n            case 0:\r\n                return new Shuffler(this, point.x, point.y);\r\n            case 1:\r\n                return new Spinner(this, point.x, point.y);\r\n        }\r\n    }\r\n\r\n    tryFireStar(delta) {\r\n        if (this.closeStarTimer > 0) {\r\n            this.closeStarTimer -= delta;\r\n        } else {\r\n            let x = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Between(0, WIDTH);\r\n            this.fireCloseStar(x);\r\n            this.closeStarTimer = settings.closeStarTimer;\r\n        }\r\n\r\n        if (this.farStarTimer > 0) {\r\n            this.farStarTimer -= delta;\r\n        } else {\r\n            let x = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Between(0, WIDTH);\r\n            this.fireFarStar(x);\r\n            this.farStarTimer = settings.farStarTimer;\r\n        }\r\n    }\r\n\r\n    fireCloseStar(x) {\r\n        let star = this.closeStars.get().setActive(true).setVisible(true);\r\n        if (star) {\r\n            star.fire(x);\r\n        }\r\n    }\r\n\r\n    fireFarStar(x) {\r\n        let star = this.farStars.get().setActive(true).setVisible(true);\r\n        if (star) {\r\n            star.fire(x);\r\n        }\r\n    }\r\n}\r\n\r\nclass gameOver extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('GameOver');\r\n    }\r\n\r\n    create() {\r\n        let go = this.add.text(CENTER_X, CENTER_Y - 200, 'GAME OVER');\r\n        go.x = CENTER_X - (go.width / 2);\r\n\r\n        let scoretext = this.add.text(CENTER_X, CENTER_Y - 100, 'Score: ' + score);\r\n        scoretext.x = CENTER_X - (scoretext.width / 2);\r\n\r\n        if (score > highScore) {\r\n            highScore = score;\r\n            localStorage.setItem('highScore', highScore);\r\n        }\r\n\r\n        let hs = this.add.text(CENTER_X, CENTER_Y, 'High Score: ' + highScore);\r\n        hs.x = CENTER_X - (hs.width / 2);\r\n\r\n        let restart = this.add.text(CENTER_X, CENTER_Y + 100, 'Restart?');\r\n        restart.x = CENTER_X - (restart.width / 2);\r\n        restart.setInteractive();\r\n        restart.on('pointerdown', e => {\r\n            this.scene.start('GameScene');\r\n        })\r\n    }\r\n}\r\n\r\nfunction getXYVelocities(angle, speed) {\r\n    return {\r\n        x: (speed * Math.sin(angle)), // Horizontal component\r\n        y: (speed * -Math.cos(angle)) // Vertical component\r\n    };\r\n}\r\n\r\nfunction resizeGame() {\r\n    let canvas = document.querySelector('#cnv canvas');\r\n    let windowWidth = window.innerWidth - 25;\r\n    let windowHeight = window.innerHeight - 25;\r\n    let windowRatio = windowWidth / windowHeight;\r\n    let gameRatio = game.config.width / game.config.height;\r\n\r\n    if (windowRatio < gameRatio) {\r\n        canvas.style.width = windowWidth + 'px';\r\n        canvas.style.height = (windowWidth / gameRatio) + 'px';\r\n    } else {\r\n        canvas.style.width = (windowHeight * gameRatio) + 'px';\r\n        canvas.style.height = windowHeight + 'px';\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });