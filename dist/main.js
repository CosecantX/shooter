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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nvar game;\r\n\r\nconst gameOptions = {\r\n    playerSpeed: 200,\r\n    //playerDiagSpeed: -1,\r\n    playerHP: 100,\r\n    playerFireRate: 100,\r\n    playerHitBox: 12,\r\n    shieldDistance: 30,\r\n\r\n    spawnTimer: 5000,\r\n    bulletSpeed: 500,\r\n    bulletLife: 2000,\r\n\r\n    shfFireRate: 300,\r\n    shfMoveRate: 500,\r\n    shfMoveSpeed: 200,\r\n    shfHitBox: 20,\r\n\r\n    spnSpinRate: .03,\r\n    spnFireRate: 100,\r\n    spnMoveRate: 2000,\r\n    spnMoveSpeed: 100,\r\n    spnHitBox: 20,\r\n}\r\n//gameOptions.playerDiagSpeed = gameOptions.playerSpeed * Math.sin(Math.PI / 4);\r\n\r\nconst WIDTH = 600;\r\nconst HEIGHT = 800;\r\nconst CENTER_X = WIDTH / 2;\r\nconst CENTER_Y = HEIGHT / 2;\r\n\r\nconst ANGLES = {\r\n    right: Math.PI / 2,\r\n    upRight: Math.PI / 4,\r\n    up: 0,\r\n    upLeft: -Math.PI / 4,\r\n    left: -Math.PI / 2,\r\n    downLeft: -(3 * Math.PI) / 4,\r\n    down: Math.PI,\r\n    downRight: (3 * Math.PI) / 4,\r\n}\r\n\r\nvar player;\r\nvar cursor;\r\nvar shield;\r\nvar keys;\r\nvar text;\r\nvar topLine = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(10, 10, WIDTH - 10, 10);\r\nvar bottomLine = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(10, HEIGHT - 10, WIDTH - 10, HEIGHT - 10);\r\n\r\nwindow.onload = function () {\r\n    const config = {\r\n        type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\r\n        parent: \"cnv\",\r\n        width: WIDTH,\r\n        height: HEIGHT,\r\n        scene: [loadScene, gameScene],\r\n        physics: {\r\n            default: 'arcade',\r\n            arcade: {\r\n                //debug: true\r\n            }\r\n        }\r\n    }\r\n\r\n    game = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game(config);\r\n    window.focus();\r\n    resizeGame();\r\n    window.addEventListener('resize', resizeGame);\r\n}\r\n\r\nclass Bullet extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Image {\r\n    constructor(scene, type) {\r\n        super(scene, -100, -100, type)\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setSize(this.width, this.width);\r\n\r\n        this.born = 0;\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.born += delta;\r\n        if (this.born > gameOptions.bulletLife) {\r\n            this.setActive(false);\r\n            this.setVisible(false);\r\n        }\r\n    }\r\n\r\n    fire(source, target) {\r\n        this.born = 0;\r\n        this.x = source.x;\r\n        this.y = source.y;\r\n\r\n        this.rotation = Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(source.x, source.y, target.x, target.y);\r\n\r\n        let v = getXYVelocities(this.rotation, gameOptions.bulletSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n}\r\n\r\nclass pBullet extends Bullet {\r\n    constructor(scene) {\r\n        super(scene, 'shot')\r\n    }\r\n}\r\n\r\nclass eBullet extends Bullet {\r\n    constructor(scene) {\r\n        super(scene, 'eshot')\r\n    }\r\n}\r\n\r\nclass Ship extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Sprite {\r\n    constructor(scene, x, y, type) {\r\n        super(scene, x, y, type)\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setDepth(1);\r\n    }\r\n    \r\n    preUpdate(time, delta) {\r\n        this.update(time, delta)\r\n    }\r\n\r\n    remove() {\r\n        this.destroy();\r\n    }\r\n}\r\n\r\nclass Player extends Ship {\r\n    constructor(scene) {\r\n        super(scene, CENTER_X, 600, 'ship');\r\n        this.setCollideWorldBounds(true);\r\n        this.setSize(gameOptions.playerHitBox, gameOptions.playerHitBox);\r\n\r\n        this.fireTimer = gameOptions.playerFireRate;\r\n        this.fireBullet = false;\r\n        this.hp = gameOptions.playerHP;\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.setRotation(Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y));\r\n        this.tryFire(delta);\r\n\r\n    }\r\n\r\n    tryFire(delta) {\r\n        if (this.fireTimer > 0) {\r\n            this.fireTimer -= delta;\r\n        } else if (this.fireBullet) {\r\n            let bullet = this.scene.playerBullets.get().setActive(true).setVisible(true);\r\n            if (bullet) {\r\n                bullet.fire(player, cursor);\r\n            }\r\n            this.fireTimer = gameOptions.playerFireRate;\r\n        }\r\n    }\r\n\r\n    removeHP(num) {\r\n        this.hp -= num;\r\n        if (this.hp <= 0) {\r\n            this.hp = 0;\r\n            text.setText('GAMEOVER');\r\n        } else {\r\n            text.setText('HP: ' + this.hp);\r\n        }\r\n    }\r\n\r\n    addHP(num) {\r\n        this.hp += num;\r\n        if (this.hp > gameOptions.playerHP) {\r\n            this.hp = gameOptions.playerHP;\r\n        }\r\n        text.setText('HP: ' + this.hp);\r\n    }\r\n\r\n}\r\n\r\nclass Shield extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Image {\r\n    constructor(scene) {\r\n        super(scene, 100, 100, 'shot');\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n        this.setSize(this.height, this.height);\r\n        this.setDepth(1);\r\n    }\r\n\r\n    preUpdate(time, delta) {\r\n        this.update(time, delta)\r\n    }\r\n\r\n    update(time, delta) {\r\n        let angle = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);\r\n        this.setRotation(angle);\r\n        let point = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Point(player.x + gameOptions.shieldDistance * Math.cos(angle), player.y + gameOptions.shieldDistance * Math.sin(angle));\r\n        this.x = point.x;\r\n        this.y = point.y;\r\n    }\r\n}\r\n\r\nclass Shuffler extends Ship {\r\n    constructor(scene, x, y) {\r\n        super(scene, x, y, 'ship');\r\n        this.setCollideWorldBounds(true);\r\n        this.setSize(gameOptions.shfHitBox, gameOptions.shfHitBox);\r\n\r\n        this.moveAngle = 0;\r\n        this.moveTimer = gameOptions.shfMoveRate;\r\n        this.fireTimer = gameOptions.shfFireRate;\r\n\r\n        this.setRotation(ANGLES.down);;\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.tryMove(delta);\r\n        this.tryFire(delta);\r\n    }\r\n\r\n    tryFire(delta) {\r\n        if (this.fireTimer > 0) {\r\n            this.fireTimer -= delta;\r\n        } else {\r\n            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);\r\n            if (bullet) {\r\n                bullet.fire(this, player);\r\n                this.setRotation(Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(this.x, this.y, player.x, player.y));\r\n            }\r\n            this.fireTimer = gameOptions.shfFireRate;\r\n        }\r\n    }\r\n\r\n    tryMove(delta) {\r\n        if (this.moveTimer > 0) {\r\n            this.moveTimer -= delta;\r\n        } else {\r\n            this.moveAngle = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.RND.rotation();\r\n            this.move();\r\n            this.moveTimer = gameOptions.shfMoveRate;\r\n        }\r\n    }\r\n\r\n    move(angle) {\r\n        if (angle) {\r\n            this.moveAngle = angle;\r\n        }\r\n\r\n        let v = getXYVelocities(this.moveAngle, gameOptions.shfMoveSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n\r\n}\r\n\r\nclass Spinner extends Ship {\r\n    constructor(scene, x, y) {\r\n        super(scene, x, y, 'ship');\r\n        this.setCollideWorldBounds(true);\r\n        this.setSize(gameOptions.spnHitBox, gameOptions.spnHitBox);\r\n\r\n        this.spinDir = +1;\r\n        this.moveAngle = 0;\r\n        this.moveTimer = gameOptions.spnMoveRate;\r\n        this.fireTimer = gameOptions.spnFireRate;\r\n\r\n        this.setRotation(ANGLES.down);\r\n\r\n        this.line = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(x, y - 1, x, y + 1);\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.tryMove(delta);\r\n        this.movePoints();\r\n        this.tryFire(delta);\r\n        this.rotatePoints();\r\n    }\r\n\r\n    tryMove(delta) {\r\n        if (this.moveTimer > 0) {\r\n            this.moveTimer -= delta;\r\n        } else {\r\n            this.moveAngle = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.RND.rotation();\r\n            this.move();\r\n            this.moveTimer = gameOptions.spnMoveRate;\r\n        }\r\n    }\r\n\r\n    move(angle) {\r\n        if (angle) {\r\n            this.moveAngle = angle;\r\n        }\r\n\r\n        let v = getXYVelocities(this.moveAngle, gameOptions.spnMoveSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n\r\n    movePoints() {\r\n        phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line.CenterOn(this.line, this.x, this.y);\r\n    }\r\n\r\n    rotatePoints() {\r\n        phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line.Rotate(this.line, this.spinDir * gameOptions.spnSpinRate);\r\n        let point = this.line.getPointB();\r\n        this.setRotation(Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(this.x, this.y, point.x, point.y));\r\n    }\r\n\r\n    tryFire(delta) {\r\n        if (this.fireTimer > 0) {\r\n            this.fireTimer -= delta;\r\n        } else {\r\n            let bullet = this.scene.enemyBullets.get().setActive(true).setVisible(true);\r\n            let bullet2 = this.scene.enemyBullets.get().setActive(true).setVisible(true);\r\n            if (bullet && bullet2) {\r\n                bullet.fire(this, this.line.getPointA());\r\n                bullet2.fire(this, this.line.getPointB());\r\n            }\r\n            this.fireTimer = gameOptions.spnFireRate;\r\n        }\r\n    }\r\n}\r\n\r\nclass loadScene extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('LoadScene');\r\n    }\r\n\r\n    preload() {\r\n        this.load.image('circle50', 'assets/circle50.png');\r\n        this.load.image('circle20', 'assets/circle20.png');\r\n        this.load.image('ship', 'assets/ship.png');\r\n        this.load.image('shot', 'assets/shot.png');\r\n        this.load.image('eshot', 'assets/eshot.png');\r\n    }\r\n\r\n    create() {\r\n        this.scene.start('GameScene');\r\n    }\r\n}\r\n\r\nclass gameScene extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('GameScene');\r\n    }\r\n\r\n    create() {\r\n        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);\r\n        player = new Player(this);\r\n\r\n        text = this.add.text(10, 10, 'HP: ' + player.hp);\r\n\r\n        this.spawnTimer = gameOptions.spawnTimer;\r\n        this.spawnCount = 2;\r\n\r\n        //let shuffler = new Shuffler(this, CENTER_X, 20);\r\n        //let spinner = new Spinner(this, CENTER_X, CENTER_Y)\r\n        //console.log(spinner);\r\n\r\n        this.enemyGroup = this.physics.add.group({\r\n            collideWorldBounds: true,\r\n        });\r\n\r\n        this.playerBullets = this.physics.add.group({\r\n            classType: pBullet,\r\n            runChildUpdate: true\r\n        });\r\n        this.enemyBullets = this.physics.add.group({\r\n            classType: eBullet,\r\n            runChildUpdate: true\r\n        });\r\n\r\n        cursor = this.physics.add.image(CENTER_X, -100, 'circle20');\r\n\r\n        shield = new Shield(this);\r\n\r\n        keys = this.input.keyboard.addKeys('W,A,S,D');\r\n\r\n        this.input.on('pointermove', (pointer) => {\r\n            cursor.setPosition(pointer.x, pointer.y)\r\n        })\r\n\r\n        this.input.on('pointerdown', pointer => {\r\n            player.fireBullet = true;\r\n        })\r\n\r\n        this.input.on('pointerup', pointer => {\r\n            player.fireBullet = false;\r\n        })\r\n\r\n        this.physics.add.overlap(shield, this.enemyBullets, (c, b) => {\r\n            b.destroy();\r\n            //b.setActive(false).setVisible(false);\r\n            player.addHP(1);\r\n        })\r\n\r\n        this.physics.add.overlap(player, this.enemyBullets, (p, b) => {\r\n            b.destroy();\r\n            //b.setActive(false).setVisible(false);\r\n            player.removeHP(10);\r\n        })\r\n\r\n        this.physics.add.overlap(this.playerBullets, this.enemyGroup, (b, e) => {\r\n            b.destroy();\r\n            e.destroy();\r\n        })\r\n    }\r\n\r\n    update(time, delta) {\r\n\r\n        this.handleKeys();\r\n        this.trySpawn(delta);\r\n    }\r\n\r\n    handleKeys() {\r\n\r\n        if (keys.W.isDown) {\r\n            player.setVelocityY(-gameOptions.playerSpeed);\r\n        } else if (keys.S.isDown) {\r\n            player.setVelocityY(gameOptions.playerSpeed);\r\n        } else {\r\n            player.setVelocityY(0);\r\n        }\r\n\r\n        if (keys.A.isDown) {\r\n            player.setVelocityX(-gameOptions.playerSpeed);\r\n        } else if (keys.D.isDown) {\r\n            player.setVelocityX(gameOptions.playerSpeed);\r\n        } else {\r\n            player.setVelocityX(0);\r\n        }\r\n    }\r\n\r\n    trySpawn(delta) {\r\n        if (this.spawnTimer > 0) {\r\n            this.spawnTimer -= delta;\r\n        } else {\r\n            this.spawn();\r\n            this.spawnTimer = gameOptions.spawnTimer;\r\n        }\r\n    }\r\n\r\n    spawn() {\r\n        let spawn1 = topLine.getRandomPoint();\r\n        let spawn2 = bottomLine.getRandomPoint();\r\n        let enemy1 = this.pickEnemy(spawn1);\r\n        let enemy2 = this.pickEnemy(spawn2);\r\n        this.enemyGroup.add(enemy1);\r\n        this.enemyGroup.add(enemy2);\r\n    }\r\n\r\n    pickEnemy(point) {\r\n        let rand = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Between(0, 1);\r\n        switch(rand) {\r\n            case 0: return new Shuffler(this, point.x, point.y);\r\n            case 1: return new Spinner(this, point.x, point.y);\r\n        }\r\n    }\r\n}\r\n\r\nfunction getXYVelocities(angle, speed) {\r\n    return {\r\n        x: (speed * Math.sin(angle)), // Horizontal component\r\n        y: (speed * -Math.cos(angle)) // Vertical component\r\n    };\r\n}\r\n\r\nfunction resizeGame() {\r\n    let canvas = document.querySelector('#cnv canvas');\r\n    let windowWidth = window.innerWidth - 25;\r\n    let windowHeight = window.innerHeight - 25;\r\n    let windowRatio = windowWidth / windowHeight;\r\n    let gameRatio = game.config.width / game.config.height;\r\n\r\n    if (windowRatio < gameRatio) {\r\n        canvas.style.width = windowWidth + 'px';\r\n        canvas.style.height = (windowWidth / gameRatio) + 'px';\r\n    } else {\r\n        canvas.style.width = (windowHeight * gameRatio) + 'px';\r\n        canvas.style.height = windowHeight + 'px';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });