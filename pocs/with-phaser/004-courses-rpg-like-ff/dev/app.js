(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory();
	else
		root["app"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "./dev/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _scenes_world_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/world-scene */ "./src/scenes/world-scene.js");
/* harmony import */ var _scenes_boot_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/boot-scene */ "./src/scenes/boot-scene.js");
/* harmony import */ var _scenes_loading_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/loading-scene */ "./src/scenes/loading-scene.js");




var TITLE_SCENE_KEY = 'TitleScene';
var BOOT_SCENE_KEY = 'BootScene';
var LOADING_SCENE_KEY = 'LoadingScene';
var WORLD_SCENE_KEY = 'WorldScene';
var titleScene = new _scenes_title_scene__WEBPACK_IMPORTED_MODULE_0__["default"]();
var bootScene = new _scenes_boot_scene__WEBPACK_IMPORTED_MODULE_2__["default"]();
var loadingScene = new _scenes_loading_scene__WEBPACK_IMPORTED_MODULE_3__["default"]();
var worldScene = new _scenes_world_scene__WEBPACK_IMPORTED_MODULE_1__["default"]();
var config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    "default": 'arcade',
    arcade: {
      gravity: {
        y: 0
      }
    }
  }
};
var game = new Phaser.Game(config);
game.scene.add(TITLE_SCENE_KEY, titleScene);
game.scene.add(WORLD_SCENE_KEY, worldScene);
game.scene.add(BOOT_SCENE_KEY, bootScene);
game.scene.add(LOADING_SCENE_KEY, loadingScene);
game.scene.start(BOOT_SCENE_KEY, {
  scene: 'title'
});

/***/ }),

/***/ "./src/plugins/user-input.js":
/*!***********************************!*\
  !*** ./src/plugins/user-input.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserInput =
/*#__PURE__*/
function () {
  function UserInput(scene) {
    _classCallCheck(this, UserInput);

    this.scene = scene;
    this.enabled = false;
    this.keyListeners = ['down', 'up'];
  } //#region public methods

  /**
   * attach on input press key
   * @param {*} data json data
   */


  _createClass(UserInput, [{
    key: "setInput",
    value: function setInput(data) {
      var _this = this;

      this.keyListeners.forEach(function (item) {
        var key = 'key' + item;

        _this.scene.input.keyboard.removeAllListeners(key);

        _this.scene.input.keyboard.on(key, _this.processInput, _this);
      });
      this.userData = data;
      this.enabled = true;
    } //#endregion
    //#region internal methods

    /**
     * Keyboard event process
     * @param {*} event key event
     */

  }, {
    key: "processInput",
    value: function processInput(event) {
      if (this.enabled) {
        var input = this.userData[event.type][event.key];

        if (input) {
          var callbackArray = input.callback.split('.');
          var context = this.getContext(callbackArray);
          var callingMethod = this.getCallingMethod(context, callbackArray);
          callingMethod.apply(context, input.args);
        }
      }
    }
    /**
     * Gets calling method from json file and event key
     * @param {*} context 
     * @param {string[]} callbackArray 
     */

  }, {
    key: "getCallingMethod",
    value: function getCallingMethod(context, callbackArray) {
      var methodName = callbackArray[1];
      return context[methodName];
    }
    /**
     * Gets callback array, with context name and callback method
     * @param {string[]} callbackArray 
     */

  }, {
    key: "getContext",
    value: function getContext(callbackArray) {
      var context = undefined;
      var callingObject = callbackArray[0];

      if (callingObject === 'scene') {
        context = this.scene;
      } else {
        context = this.scene.prefabs[callingObject];
      }

      return context;
    } //#endregion

  }]);

  return UserInput;
}();

/* harmony default export */ __webpack_exports__["default"] = (UserInput);

/***/ }),

/***/ "./src/prefabs/prefab.js":
/*!*******************************!*\
  !*** ./src/prefabs/prefab.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Prefab =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Prefab, _Phaser$GameObjects$S);

  function Prefab(scene, name, position, properties) {
    var _this;

    _classCallCheck(this, Prefab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Prefab).call(this, scene, position.x, position.y, properties.texture, properties.frame));

    _this.initialize(scene, name, position, properties);

    return _this;
  } //#region protected methods


  _createClass(Prefab, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      this.scene = scene;
      this.name = name;
      this.scene.add.existing(this);
      this.scene.groups[properties.group].add(this);

      if (properties.scale) {
        this.setScale(properties.scale.x, properties.scale.y);
      }

      if (properties.anchor) {
        this.setOrigin(properties.anchor.x, properties.anchor.y);
      }

      this.scene.prefabs[this.name] = this;
    } //#endregion

  }]);

  return Prefab;
}(Phaser.GameObjects.Sprite);

/* harmony default export */ __webpack_exports__["default"] = (Prefab);

/***/ }),

/***/ "./src/prefabs/text-prefab.js":
/*!************************************!*\
  !*** ./src/prefabs/text-prefab.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextPrefab =
/*#__PURE__*/
function (_Phaser$GameObjects$T) {
  _inherits(TextPrefab, _Phaser$GameObjects$T);

  function TextPrefab(scene, name, position, properties) {
    var _this;

    _classCallCheck(this, TextPrefab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextPrefab).call(this, scene, position.x, position.y, properties.text, properties.style)); // TODO: doing better => prefab and text-prefab got the same code in constructor

    _this.scene = scene;
    _this.name = name;

    _this.scene.add.existing(_assertThisInitialized(_this));

    _this.scene.groups[properties.group].add(_assertThisInitialized(_this));

    if (properties.scale) {
      _this.setScale(properties.scale.x, properties.scale.y);
    }

    if (properties.anchor) {
      _this.setOrigin(properties.anchor.x, properties.anchor.y);
    }

    _this.scene.prefabs[_this.name] = _assertThisInitialized(_this);
    return _this;
  }

  return TextPrefab;
}(Phaser.GameObjects.Text);

/* harmony default export */ __webpack_exports__["default"] = (TextPrefab);

/***/ }),

/***/ "./src/prefabs/world/door.js":
/*!***********************************!*\
  !*** ./src/prefabs/world/door.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Door =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Door, _Prefab);

  function Door(scene, name, position, properties) {
    _classCallCheck(this, Door);

    return _possibleConstructorReturn(this, _getPrototypeOf(Door).call(this, scene, name, position, properties));
  } //#region public methods    
  //#endregion
  //#region protected methods


  _createClass(Door, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Door.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.nextLevel = properties.nextLevel;
      this.scene.physics.add.collider(this, this.scene.groups.players, this.enter, null, this);
      this.body.immovable = true;
    }
    /**
    * Actions when user enters in the cave
    * (callback when collision with Door)
    */

  }, {
    key: "enter",
    value: function enter() {
      this.scene.scene.start('BootScene', {
        scene: this.nextLevel
      });
    } //#endregion

  }]);

  return Door;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Door);

/***/ }),

/***/ "./src/prefabs/world/npc.js":
/*!**********************************!*\
  !*** ./src/prefabs/world/npc.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var NPC =
/*#__PURE__*/
function (_Prefab) {
  _inherits(NPC, _Prefab);

  function NPC(scene, name, position, properties) {
    _classCallCheck(this, NPC);

    return _possibleConstructorReturn(this, _getPrototypeOf(NPC).call(this, scene, name, position, properties));
  } //#region public methods    
  //#endregion
  //#region protected methods


  _createClass(NPC, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(NPC.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.message = this.scene.cache.text.get(properties.message);
      this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
      this.body.immovable = true;
    }
    /**
    * Actions when people will talk
    * (displaying npc message)
    */

  }, {
    key: "talk",
    value: function talk(npc, player) {
      player.stop();
      console.log('talk', this.message);
    } //#endregion

  }]);

  return NPC;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (NPC);

/***/ }),

/***/ "./src/prefabs/world/player.js":
/*!*************************************!*\
  !*** ./src/prefabs/world/player.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Player =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Player, _Prefab);

  function Player(scene, name, position, properties) {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, scene, name, position, properties));
  } //#region public methods


  _createClass(Player, [{
    key: "update",
    value: function update() {
      if (this.body) {
        this.moveByKeyDown();
      }
    }
    /**
     * Activates direction of the player
     * @param {string} direction 
     * @param {boolean} isMoving 
     */

  }, {
    key: "changeMovement",
    value: function changeMovement(direction, isMoving) {
      this.movingDirections[direction] = isMoving;
    }
    /**
     * Stops movement of the player
     */

  }, {
    key: "stop",
    value: function stop() {
      this.stoppingMovements();
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Player.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.defineCollisionSettings();
      this.defineWalkingSpeed(properties);
      this.attachPlayerMovments();
      this.prepareAnimationsByMovment();
    } //#endregion
    //#region internal methods

  }, {
    key: "stoppingMovements",
    value: function stoppingMovements() {
      this.movingDirections.down = false;
      this.movingDirections.left = false;
      this.movingDirections.right = false;
      this.movingDirections.up = false;
    }
  }, {
    key: "moveByKeyDown",
    value: function moveByKeyDown() {
      // console.log('moveByKeyDown->velocity.x', this.body.velocity.x);
      // console.log('moveByKeyDown->velocity.y', this.body.velocity.y);
      this.moveHorizontal();
      this.moveVertical();
      this.stopCurrentAnimation();
    }
  }, {
    key: "moveVertical",
    value: function moveVertical() {
      if (this.movingDirections.up && this.body.velocity.y <= 0) {
        this.body.velocity.y = -this.walkingSpeed;

        if (this.body.velocity.x === 0) {
          this.anims.play('walking_up', true);
        }
      } else if (this.movingDirections.down && this.body.velocity.y >= 0) {
        this.body.velocity.y = this.walkingSpeed;

        if (this.body.velocity.x === 0) {
          this.anims.play('walking_down', true);
        }
      } else {
        this.body.velocity.y = 0;
      }
    }
  }, {
    key: "moveHorizontal",
    value: function moveHorizontal() {
      if (this.movingDirections.left && this.body.velocity.x <= 0) {
        this.body.velocity.x = -this.walkingSpeed;

        if (this.body.velocity.y === 0) {
          this.anims.play('walking_left', true);
        }
      } else if (this.movingDirections.right && this.body.velocity.x >= 0) {
        this.body.velocity.x = this.walkingSpeed;

        if (this.body.velocity.y === 0) {
          this.anims.play('walking_right', true);
        }
      } else {
        this.body.velocity.x = 0;
      }
    }
  }, {
    key: "stopCurrentAnimation",
    value: function stopCurrentAnimation() {
      if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        this.anims.stop();
        this.displayCurrentFrameFromDirection();
      }
    }
  }, {
    key: "displayCurrentFrameFromDirection",
    value: function displayCurrentFrameFromDirection() {
      // console.log('displayCurrentFrameFromDirection->this.body.facing - 10 :', this.body.facing - 10);
      this.setFrame(this.stoppedAnimationFrames[this.body.facing - 10]);
    }
  }, {
    key: "attachPlayerMovments",
    value: function attachPlayerMovments() {
      this.movingDirections = {
        left: false,
        right: false,
        up: false,
        down: false
      };
    }
  }, {
    key: "prepareAnimationsByMovment",
    value: function prepareAnimationsByMovment() {
      this.prepareOneAnimationByMovment('down', 0);
      this.prepareOneAnimationByMovment('up', 1);
      this.prepareOneAnimationByMovment('left', 2);
      this.prepareOneAnimationByMovment('right', 3);
      this.stoppedAnimationFrames = [0, 1, 0, 2, 3];
    }
  }, {
    key: "prepareOneAnimationByMovment",
    value: function prepareOneAnimationByMovment(direction) {
      var spriteLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var directionKey = "walking_".concat(direction);

      if (!this.scene.anims.anims.has(directionKey)) {
        this.scene.anims.create({
          key: directionKey,
          frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
            frames: [0 + spriteLevel, 4 + spriteLevel, 8 + spriteLevel, 12 + spriteLevel]
          }),
          frameRate: 6,
          repeat: -1
        });
      }
    }
  }, {
    key: "defineWalkingSpeed",
    value: function defineWalkingSpeed(properties) {
      this.walkingSpeed = +properties.walkingSpeed;
    }
  }, {
    key: "defineCollisionSettings",
    value: function defineCollisionSettings() {
      this.body.collideWorldBounds = true;
      this.scene.physics.add.collider(this, this.scene.layers.buildings);
    } //#endregion

  }]);

  return Player;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/scenes/boot-scene.js":
/*!**********************************!*\
  !*** ./src/scenes/boot-scene.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Scene that loads the game
 * After, it will load the loading scene
 */
var BootScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(BootScene, _Phaser$Scene);

  function BootScene() {
    var _this;

    _classCallCheck(this, BootScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BootScene).call(this, {
      key: 'BootScene'
    }));
    _this.levels = {
      title: {
        key: 'TitleScene',
        path: 'assets/levels/title_screen.json'
      },
      town: {
        key: 'WorldScene',
        path: 'assets/levels/town.json'
      },
      cave: {
        key: 'WorldScene',
        path: 'assets/levels/cave.json'
      }
    };
    return _this;
  }

  _createClass(BootScene, [{
    key: "preload",
    value: function preload() {
      for (var name in this.levels) {
        var level = this.levels[name];
        this.load.json(name, level.path);
      }
    }
  }, {
    key: "create",
    value: function create(data) {
      var levelData = this.cache.json.get(data.scene);
      this.scene.start('LoadingScene', {
        levelData: levelData,
        scene: this.levels[data.scene].key
      });
    }
  }]);

  return BootScene;
}(Phaser.Scene);

/* harmony default export */ __webpack_exports__["default"] = (BootScene);

/***/ }),

/***/ "./src/scenes/json-level-scene.js":
/*!****************************************!*\
  !*** ./src/scenes/json-level-scene.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefabs_prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefabs/prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _prefabs_text_prefab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prefabs/text-prefab */ "./src/prefabs/text-prefab.js");
/* harmony import */ var _plugins_user_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../plugins/user-input */ "./src/plugins/user-input.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
* Parent class to all scenev: anable you to load data from json file
*/

var JSonLevelScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(JSonLevelScene, _Phaser$Scene);

  function JSonLevelScene(key) {
    var _this;

    _classCallCheck(this, JSonLevelScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JSonLevelScene).call(this, {
      key: key
    }));

    _this.setPrefabs();

    return _this;
  } //#region public methods


  _createClass(JSonLevelScene, [{
    key: "init",
    value: function init(data) {
      this.levelData = data.levelData;
    }
  }, {
    key: "create",
    value: function create() {
      this.prefabs = {};
      this.groups = {};
      this.createGroups();
      this.initAllPrefabs();
      this.initUserInputPlugin();
    }
  }, {
    key: "update",
    value: function update() {
      this.updateAllPrefabs();
    } //#endregion
    //#region internal methods

    /**
     * Inits new UserInput class
     */

  }, {
    key: "initUserInputPlugin",
    value: function initUserInputPlugin() {
      this.userInput = new _plugins_user_input__WEBPACK_IMPORTED_MODULE_2__["default"](this);
      this.userInputData = this.cache.json.get(this.levelData.userInput.key);
      this.userInput.setInput(this.userInputData);
    }
    /**
     * Updates all child prefabs
     */

  }, {
    key: "updateAllPrefabs",
    value: function updateAllPrefabs() {
      for (var name in this.prefabs) {
        if (this.prefabs.hasOwnProperty(name)) {
          this.prefabs[name].update();
        }
      }
    }
    /**
     * Creates physic group (to manage collision for example)
     */

  }, {
    key: "createGroups",
    value: function createGroups() {
      var _this2 = this;

      this.levelData.groups.forEach(function (name) {
        _this2.groups[name] = _this2.physics.add.group();
      }, this);
    }
    /**
     * Create all prefab items
     */

  }, {
    key: "initAllPrefabs",
    value: function initAllPrefabs() {
      for (var key in this.levelData.prefabs) {
        var spriteData = this.levelData.prefabs[key];
        var prefab = new this.prefabsClasses[spriteData.type](this, key, spriteData.position, spriteData.properties);
      }
    }
    /**
    * Define prefabs list 
    * You must with constructors
    * Todo: doing better : just pass class type, and the parent class will set all constructors in the array list
    */

  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      throw new Error('You must override it in child class');
    } //#endregion

  }]);

  return JSonLevelScene;
}(Phaser.Scene);

/* harmony default export */ __webpack_exports__["default"] = (JSonLevelScene);

/***/ }),

/***/ "./src/scenes/loading-scene.js":
/*!*************************************!*\
  !*** ./src/scenes/loading-scene.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoadingScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoadingScene, _Phaser$Scene);

  function LoadingScene() {
    _classCallCheck(this, LoadingScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadingScene).call(this, {
      key: 'LoadingScene'
    }));
  } //#region public methods


  _createClass(LoadingScene, [{
    key: "init",
    value: function init(data) {
      this.levelData = data.levelData;
      var message = this.add.text(320, 240, "Loading", {
        font: "48px Kells",
        fill: "#ffffff"
      });
    }
  }, {
    key: "preload",
    value: function preload() {
      var assets = this.levelData.assets;
      this.loadAssetsByType(assets);
      this.loadUserInputData();
    }
  }, {
    key: "create",
    value: function create(data) {
      this.scene.start(data.scene, {
        levelData: this.levelData
      });
    } //#endregion
    //#region internal methods

    /**
     * Loads image, spritesheets or tilemap from json data
     * @param {*} assets 
     */

  }, {
    key: "loadAssetsByType",
    value: function loadAssetsByType(assets) {
      for (var key in assets) {
        var asset = assets[key];

        switch (asset.type) {
          case 'image':
            this.load.image(key, asset.source);
            break;

          case 'spritesheet':
            {
              this.load.spritesheet(key, asset.source, {
                frameWidth: asset.frameWidth,
                frameHeight: asset.frameHeight,
                frames: asset.frames,
                margin: asset.margin,
                spacing: asset.spacing
              });
            }
            break;

          case "tilemap":
            {
              this.load.tilemapTiledJSON(key, asset.source);
            }
            break;

          default:
            break;
        }
      }
    }
    /**
     * Loads user input json file
     */

  }, {
    key: "loadUserInputData",
    value: function loadUserInputData() {
      this.load.json(this.levelData.userInput.key, this.levelData.userInput.path);
    } //#endregion

  }]);

  return LoadingScene;
}(Phaser.Scene);

/* harmony default export */ __webpack_exports__["default"] = (LoadingScene);

/***/ }),

/***/ "./src/scenes/title-scene.js":
/*!***********************************!*\
  !*** ./src/scenes/title-scene.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_level_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-level-scene */ "./src/scenes/json-level-scene.js");
/* harmony import */ var _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prefabs/prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _prefabs_text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prefabs/text-prefab */ "./src/prefabs/text-prefab.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
 * Scene displaying title and starts game after clicked on it
 */

var TitleScene =
/*#__PURE__*/
function (_JSonLevelScene) {
  _inherits(TitleScene, _JSonLevelScene);

  function TitleScene() {
    _classCallCheck(this, TitleScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(TitleScene).call(this, 'TitleScene'));
  } //#region public methods
  //#endregion
  //#region internal methods


  _createClass(TitleScene, [{
    key: "startGame",
    value: function startGame() {
      console.log('starting');
      this.scene.start('BootScene', {
        scene: 'town'
      });
    }
  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      console.log('setPrefabs');
      this.prefabsClasses = {
        background: _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.constructor,
        text: _prefabs_text_prefab__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.constructor
      };
    } //#endregion

  }]);

  return TitleScene;
}(_json_level_scene__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (TitleScene);

/***/ }),

/***/ "./src/scenes/world-scene.js":
/*!***********************************!*\
  !*** ./src/scenes/world-scene.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_level_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-level-scene */ "./src/scenes/json-level-scene.js");
/* harmony import */ var _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prefabs/prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _prefabs_text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prefabs/text-prefab */ "./src/prefabs/text-prefab.js");
/* harmony import */ var _prefabs_world_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prefabs/world/player */ "./src/prefabs/world/player.js");
/* harmony import */ var _prefabs_world_door__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prefabs/world/door */ "./src/prefabs/world/door.js");
/* harmony import */ var _prefabs_world_npc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../prefabs/world/npc */ "./src/prefabs/world/npc.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







/**
* Loading world tilemap scene
*/

var WorldScene =
/*#__PURE__*/
function (_JSonLevelScene) {
  _inherits(WorldScene, _JSonLevelScene);

  function WorldScene() {
    _classCallCheck(this, WorldScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(WorldScene).call(this, 'WorldScene'));
  } //#region public methods


  _createClass(WorldScene, [{
    key: "create",
    value: function create() {
      this.map = this.add.tilemap(this.levelData.map.key);
      this.prepareTileSets();
      this.prepareLayers();

      _get(_getPrototypeOf(WorldScene.prototype), "create", this).call(this);

      this.prepareObjects();
    }
  }, {
    key: "preload",
    value: function preload() {
      this.loadMessages();
    } //#endregion
    //#region internal methods

  }, {
    key: "loadMessages",
    value: function loadMessages() {
      for (var key in this.levelData.npcMessages) {
        this.load.text(key, this.levelData.npcMessages[key]);
      }
    }
  }, {
    key: "prepareObjects",
    value: function prepareObjects() {
      var _this = this;

      this.map.objects.forEach(function (layer) {
        layer.objects.forEach(_this.createOneOject, _this);
      });
    }
  }, {
    key: "createOneOject",
    value: function createOneOject(object) {
      var position = {
        x: object.x + object.width / 2,
        y: object.y + object.height / 2
      };

      if (this.prefabsClasses.hasOwnProperty(object.type)) {
        var prefab = new this.prefabsClasses[object.type](this, object.name, position, object.properties);
      }
    }
  }, {
    key: "prepareLayers",
    value: function prepareLayers() {
      var _this2 = this;

      this.layers = {};
      this.map.layers.forEach(function (layer, index) {
        _this2.layers[layer.name] = _this2.map.createStaticLayer(layer.name, _this2.tilesets[layer.properties.tileset]);

        if (layer.properties.collision) {
          _this2.map.setCollisionByExclusion([-1], true, layer.name);
        }
      });
    }
  }, {
    key: "prepareTileSets",
    value: function prepareTileSets() {
      var _this3 = this;

      this.tilesets = {};
      this.map.tilesets.forEach(function (tileSet, index) {
        var tileSetContent = _this3.levelData.map.tilesets[index];

        var mapTileset = _this3.map.addTilesetImage(tileSet.name, tileSetContent);

        _this3.tilesets[tileSetContent] = mapTileset;
      }, this);
    }
  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      this.prefabsClasses = {
        player: _prefabs_world_player__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor,
        door: _prefabs_world_door__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.constructor,
        npc: _prefabs_world_npc__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.constructor
      };
    } //#endregion

  }]);

  return WorldScene;
}(_json_level_scene__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (WorldScene);

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! c:\Users\evan\source\repos\ladiagonaledupoulpe\ladiagonaledupoulpe-game-one\pocs\with-phaser\004-courses-rpg-like-ff\src\main.js */"./src/main.js");


/***/ })

/******/ });
});
//# sourceMappingURL=app.js.map