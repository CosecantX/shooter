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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nvar game;\r\nconst gameOptions = {\r\n    playerSpeed: 300,\r\n    bulletSpeed: 500,\r\n    bulletTime: 2000,\r\n}\r\n\r\n\r\nconst WIDTH = 600;\r\nconst HEIGHT = 800;\r\nconst CENTER_X = WIDTH / 2;\r\nconst CENTER_Y = HEIGHT / 2;\r\n\r\n//const DIAG_SPEED = gameOptions.playerSpeed * Math.sin(Math.PI / 4);\r\n\r\nvar player;\r\nvar cursor;\r\nvar keys;\r\n\r\nwindow.onload = function () {\r\n    const config = {\r\n        type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\r\n        parent: \"cnv\",\r\n        width: WIDTH,\r\n        height: HEIGHT,\r\n        scene: [loadScene, gameScene],\r\n        physics: {\r\n            default: 'arcade',\r\n            arcade: {\r\n                //debug: true\r\n            }\r\n        }\r\n    }\r\n    game = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game(config);\r\n    window.focus();\r\n    resizeGame();\r\n    window.addEventListener('resize', resizeGame);\r\n}\r\n\r\nclass Player extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Sprite {\r\n    constructor(scene) {\r\n        super(scene, CENTER_X, 600, 'circle50')\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n    }\r\n}\r\n\r\nclass Bullet extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Physics.Arcade.Image {\r\n    constructor(scene) {\r\n        super(scene, player.x, player.y, 'circle20')\r\n        scene.physics.add.existing(scene.add.existing(this));\r\n\r\n        this.born = 0;\r\n\r\n    }\r\n\r\n    update(time, delta) {\r\n        this.born += delta;\r\n        if (this.born > gameOptions.bulletTime) {\r\n            this.setActive(false);\r\n            this.setVisible(false);\r\n        }\r\n    }\r\n\r\n    fire() {\r\n        this.born = 0;\r\n        this.x = player.x;\r\n        this.y = player.y;\r\n\r\n        this.angle = Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);\r\n\r\n        let v = this.getXYVelocities(this.angle, gameOptions.bulletSpeed);\r\n        this.setVelocity(v.x, v.y);\r\n    }\r\n\r\n    getXYVelocities(angle, speed) {\r\n        return {\r\n            x: (speed * Math.sin(angle)), // Horizontal component\r\n            y: (speed * -Math.cos(angle)) // Vertical component\r\n        };\r\n    }\r\n}\r\n\r\nclass loadScene extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('LoadScene');\r\n    }\r\n\r\n    preload() {\r\n        this.load.image('circle50', 'assets/circle50.png');\r\n        this.load.image('circle20', 'assets/circle20.png');\r\n    }\r\n\r\n    create() {\r\n        this.scene.start('GameScene');\r\n    }\r\n}\r\n\r\nclass gameScene extends phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene {\r\n    constructor() {\r\n        super('GameScene');\r\n    }\r\n\r\n    create() {\r\n        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);\r\n        player = new Player(this);\r\n        player.setCollideWorldBounds(true);\r\n\r\n        this.playerBullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});\r\n        this.enemyBullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});\r\n\r\n        cursor = this.physics.add.image(CENTER_X, CENTER_Y, 'circle20');\r\n\r\n        keys = this.input.keyboard.addKeys('W,A,S,D');\r\n\r\n        this.input.on('pointermove', (pointer) => {\r\n            cursor.setPosition(pointer.x, pointer.y)\r\n        })\r\n\r\n        this.input.on('pointerdown', pointer => {\r\n            let bullet = this.playerBullets.get().setActive(true).setVisible(true);\r\n            if (bullet) {\r\n                bullet.fire();\r\n            }\r\n        })\r\n    }\r\n\r\n    update() {\r\n        player.angle = Math.PI / 2 + phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y);\r\n\r\n        this.handleKeys();\r\n\r\n    }\r\n\r\n    handleKeys() {\r\n\r\n        if (keys.W.isDown) {\r\n            player.setVelocityY(-gameOptions.playerSpeed);\r\n        } else if (keys.S.isDown) {\r\n            player.setVelocityY(gameOptions.playerSpeed);\r\n        } else {\r\n            player.setVelocityY(0);\r\n        }\r\n\r\n        if (keys.A.isDown) {\r\n            player.setVelocityX(-gameOptions.playerSpeed);\r\n        } else if (keys.D.isDown) {\r\n            player.setVelocityX(gameOptions.playerSpeed);\r\n        } else {\r\n            player.setVelocityX(0);\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\r\nfunction resizeGame() {\r\n    let canvas = document.querySelector('#cnv canvas');\r\n    let windowWidth = window.innerWidth - 25;\r\n    let windowHeight = window.innerHeight - 25;\r\n    let windowRatio = windowWidth / windowHeight;\r\n    let gameRatio = game.config.width / game.config.height;\r\n\r\n    if (windowRatio < gameRatio) {\r\n        canvas.style.width = windowWidth + 'px';\r\n        canvas.style.height = (windowWidth / gameRatio) + 'px';\r\n    } else {\r\n        canvas.style.width = (windowHeight * gameRatio) + 'px';\r\n        canvas.style.height = windowHeight + 'px';\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });