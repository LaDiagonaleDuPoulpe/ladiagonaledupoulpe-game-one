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

/***/ "./node_modules/js-priority-queue/priority-queue.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/js-priority-queue/priority-queue.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(t){if(true)module.exports=t();else { var e; }}(function(){return function t(e,i,r){function o(n,s){if(!i[n]){if(!e[n]){var h="function"==typeof require&&require;if(!s&&h)return require(n,!0);if(a)return a(n,!0);var u=new Error("Cannot find module '"+n+"'");throw u.code="MODULE_NOT_FOUND",u}var p=i[n]={exports:{}};e[n][0].call(p.exports,function(t){var i=e[n][1][t];return o(i?i:t)},p,p.exports,t,e,i,r)}return i[n].exports}for(var a="function"==typeof require&&require,n=0;n<r.length;n++)o(r[n]);return o}({1:[function(t,e,i){var r,o,a,n,s,h=function(t,e){function i(){this.constructor=t}for(var r in e)u.call(e,r)&&(t[r]=e[r]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},u={}.hasOwnProperty;r=t("./PriorityQueue/AbstractPriorityQueue"),o=t("./PriorityQueue/ArrayStrategy"),n=t("./PriorityQueue/BinaryHeapStrategy"),a=t("./PriorityQueue/BHeapStrategy"),s=function(t){function e(t){t||(t={}),t.strategy||(t.strategy=n),t.comparator||(t.comparator=function(t,e){return(t||0)-(e||0)}),e.__super__.constructor.call(this,t)}return h(e,t),e}(r),s.ArrayStrategy=o,s.BinaryHeapStrategy=n,s.BHeapStrategy=a,e.exports=s},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(t,e,i){var r;e.exports=r=function(){function t(t){var e;if(null==(null!=t?t.strategy:void 0))throw"Must pass options.strategy, a strategy";if(null==(null!=t?t.comparator:void 0))throw"Must pass options.comparator, a comparator";this.priv=new t.strategy(t),this.length=(null!=t&&null!=(e=t.initialValues)?e.length:void 0)||0}return t.prototype.queue=function(t){this.length++,this.priv.queue(t)},t.prototype.dequeue=function(t){if(!this.length)throw"Empty queue";return this.length--,this.priv.dequeue()},t.prototype.peek=function(t){if(!this.length)throw"Empty queue";return this.priv.peek()},t.prototype.clear=function(){return this.length=0,this.priv.clear()},t}()},{}],3:[function(t,e,i){var r,o;o=function(t,e,i){var r,o,a;for(o=0,r=t.length;r>o;)a=o+r>>>1,i(t[a],e)>=0?o=a+1:r=a;return o},e.exports=r=function(){function t(t){var e;this.options=t,this.comparator=this.options.comparator,this.data=(null!=(e=this.options.initialValues)?e.slice(0):void 0)||[],this.data.sort(this.comparator).reverse()}return t.prototype.queue=function(t){var e;e=o(this.data,t,this.comparator),this.data.splice(e,0,t)},t.prototype.dequeue=function(){return this.data.pop()},t.prototype.peek=function(){return this.data[this.data.length-1]},t.prototype.clear=function(){this.data.length=0},t}()},{}],4:[function(t,e,i){var r;e.exports=r=function(){function t(t){var e,i,r,o,a,n,s,h,u;for(this.comparator=(null!=t?t.comparator:void 0)||function(t,e){return t-e},this.pageSize=(null!=t?t.pageSize:void 0)||512,this.length=0,h=0;1<<h<this.pageSize;)h+=1;if(1<<h!==this.pageSize)throw"pageSize must be a power of two";for(this._shift=h,this._emptyMemoryPageTemplate=e=[],i=r=0,n=this.pageSize;n>=0?n>r:r>n;i=n>=0?++r:--r)e.push(null);if(this._memory=[],this._mask=this.pageSize-1,t.initialValues)for(s=t.initialValues,o=0,a=s.length;a>o;o++)u=s[o],this.queue(u)}return t.prototype.queue=function(t){this.length+=1,this._write(this.length,t),this._bubbleUp(this.length,t)},t.prototype.dequeue=function(){var t,e;return t=this._read(1),e=this._read(this.length),this.length-=1,this.length>0&&(this._write(1,e),this._bubbleDown(1,e)),t},t.prototype.peek=function(){return this._read(1)},t.prototype.clear=function(){this.length=0,this._memory.length=0},t.prototype._write=function(t,e){var i;for(i=t>>this._shift;i>=this._memory.length;)this._memory.push(this._emptyMemoryPageTemplate.slice(0));return this._memory[i][t&this._mask]=e},t.prototype._read=function(t){return this._memory[t>>this._shift][t&this._mask]},t.prototype._bubbleUp=function(t,e){var i,r,o,a;for(i=this.comparator;t>1&&(r=t&this._mask,t<this.pageSize||r>3?o=t&~this._mask|r>>1:2>r?(o=t-this.pageSize>>this._shift,o+=o&~(this._mask>>1),o|=this.pageSize>>1):o=t-2,a=this._read(o),!(i(a,e)<0));)this._write(o,e),this._write(t,a),t=o},t.prototype._bubbleDown=function(t,e){var i,r,o,a,n;for(n=this.comparator;t<this.length;)if(t>this._mask&&!(t&this._mask-1)?i=r=t+2:t&this.pageSize>>1?(i=(t&~this._mask)>>1,i|=t&this._mask>>1,i=i+1<<this._shift,r=i+1):(i=t+(t&this._mask),r=i+1),i!==r&&r<=this.length)if(o=this._read(i),a=this._read(r),n(o,e)<0&&n(o,a)<=0)this._write(i,e),this._write(t,o),t=i;else{if(!(n(a,e)<0))break;this._write(r,e),this._write(t,a),t=r}else{if(!(i<=this.length))break;if(o=this._read(i),!(n(o,e)<0))break;this._write(i,e),this._write(t,o),t=i}},t}()},{}],5:[function(t,e,i){var r;e.exports=r=function(){function t(t){var e;this.comparator=(null!=t?t.comparator:void 0)||function(t,e){return t-e},this.length=0,this.data=(null!=(e=t.initialValues)?e.slice(0):void 0)||[],this._heapify()}return t.prototype._heapify=function(){var t,e,i;if(this.data.length>0)for(t=e=1,i=this.data.length;i>=1?i>e:e>i;t=i>=1?++e:--e)this._bubbleUp(t)},t.prototype.queue=function(t){this.data.push(t),this._bubbleUp(this.data.length-1)},t.prototype.dequeue=function(){var t,e;return e=this.data[0],t=this.data.pop(),this.data.length>0&&(this.data[0]=t,this._bubbleDown(0)),e},t.prototype.peek=function(){return this.data[0]},t.prototype.clear=function(){this.length=0,this.data.length=0},t.prototype._bubbleUp=function(t){for(var e,i;t>0&&(e=t-1>>>1,this.comparator(this.data[t],this.data[e])<0);)i=this.data[e],this.data[e]=this.data[t],this.data[t]=i,t=e},t.prototype._bubbleDown=function(t){var e,i,r,o,a;for(e=this.data.length-1;;){if(i=(t<<1)+1,o=i+1,r=t,e>=i&&this.comparator(this.data[i],this.data[r])<0&&(r=i),e>=o&&this.comparator(this.data[o],this.data[r])<0&&(r=o),r===t)break;a=this.data[r],this.data[r]=this.data[t],this.data[t]=a,t=r}},t}()},{}]},{},[1])(1)});

/***/ }),

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
/* harmony import */ var _scenes_battle_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/battle-scene */ "./src/scenes/battle-scene.js");





var TITLE_SCENE_KEY = 'TitleScene';
var BOOT_SCENE_KEY = 'BootScene';
var LOADING_SCENE_KEY = 'LoadingScene';
var WORLD_SCENE_KEY = 'WorldScene';
var BATTLE_SCENE_KEY = 'BattleScene';
var titleScene = new _scenes_title_scene__WEBPACK_IMPORTED_MODULE_0__["default"]();
var bootScene = new _scenes_boot_scene__WEBPACK_IMPORTED_MODULE_2__["default"]();
var loadingScene = new _scenes_loading_scene__WEBPACK_IMPORTED_MODULE_3__["default"]();
var worldScene = new _scenes_world_scene__WEBPACK_IMPORTED_MODULE_1__["default"]();
var battleScene = new _scenes_battle_scene__WEBPACK_IMPORTED_MODULE_4__["default"]();
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
game.scene.add(BATTLE_SCENE_KEY, battleScene);
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

/***/ "./src/prefabs/battle/unit.js":
/*!************************************!*\
  !*** ./src/prefabs/battle/unit.js ***!
  \************************************/
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




var Unit =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Unit, _Prefab);

  function Unit(scene, name, position, properties) {
    _classCallCheck(this, Unit);

    return _possibleConstructorReturn(this, _getPrototypeOf(Unit).call(this, scene, name, position, properties));
  } //#region public methods  

  /**
   * Lanuches an attack 
   */


  _createClass(Unit, [{
    key: "attack",
    value: function attack() {
      var target = this.chooseTarget();
      var damage = this.computeDamage(target);
      target.receiveDamage(damage);
      this.anims.play(this.name + '_' + 'attack1');
    }
    /**
     * Calculates current attack turn
     * @param {number} currentTurn 
     */

  }, {
    key: "calculateAttackTurn",
    value: function calculateAttackTurn(currentTurn) {
      console.log('calculateAttackTurn', currentTurn);

      if (!currentTurn) {
        currentTurn = this.attackTurn;
      }

      this.attackTurn = currentTurn + Math.ceil(100 / this.stats.speed);
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Unit.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.createAnimations(name, properties);
      this.attachEvents();
      this.anims.play(this.startingAnimationKey);
      this.stats = properties.stats;
      this.targetUnits = properties.targetUnits;
    } //#endregion
    //#region internal methods

  }, {
    key: "receiveDamage",
    value: function receiveDamage(damage) {
      this.stats.health -= damage;
      this.anims.play(this.name + '_' + 'hit');
      this.displayDamageText(damage);

      if (this.stats.health <= 0) {
        this.stats.health = 0;
        this.destroy();
      }
    }
  }, {
    key: "displayDamageText",
    value: function displayDamageText(damage) {
      var damageText = this.scene.add.text(this.x, this.y - 50, '' + damage, {
        font: 'bold 24px Kells',
        fill: '#ff0000'
      }, this.scene.groups.hud);
      this.timeEvent = this.scene.time.addEvent({
        delay: 1000,
        callback: damageText.destroy,
        callbackScope: damageText
      });
    }
    /**
    * Compute damages to put on unit target
    * @param {Unit} target 
    */

  }, {
    key: "computeDamage",
    value: function computeDamage(target) {
      var attackMultiplier = this.scene.random.realInRange(0.8, 1.2);
      var defenseMultiplier = this.scene.random.realInRange(0.8, 1.2);
      var realAttackPoints = attackMultiplier * this.stats.attack;
      var realDefenseUnitPoints = defenseMultiplier * target.stats.defense;
      var damage = Math.max(0, Math.round(realAttackPoints - realDefenseUnitPoints));
      return damage;
    }
    /**
     * Chooses a target to attack
     */

  }, {
    key: "chooseTarget",
    value: function chooseTarget() {
      return this.getActiveUnit();
    }
    /**
     * Gets active unit in battle scene
     */

  }, {
    key: "getActiveUnit",
    value: function getActiveUnit() {
      var targetGroup = this.scene.groups[this.targetUnits];
      var targetIndex = this.scene.random.between(0, targetGroup.countActive() - 1);
      var target = undefined;
      var i = 0;
      targetGroup.children.each(function (unit) {
        if (unit.active) {
          if (i == targetIndex) {
            target = unit;
          }

          i++;
        }
      }, this);
      return target;
    }
  }, {
    key: "createAnimations",
    value: function createAnimations(name, properties) {
      this.startingAnimationKey = this.createAnimation('idle', name, properties);
      this.createAnimation('attack1', name, properties);
      this.createAnimation('attack2', name, properties);
      this.createAnimation('hit', name, properties);
    }
    /**
    * Attachs on events (complete, ...)
    */

  }, {
    key: "attachEvents",
    value: function attachEvents() {
      this.on('animationcomplete', this.backToIdle.bind(this));
    }
    /**
    * After battle, go back to idle animation
    */

  }, {
    key: "backToIdle",
    value: function backToIdle() {
      this.anims.play(this.startingAnimationKey);
    }
    /**
    * Creates an animation and return the animationKey
    * @param {string} name 
    * @param {string} animationName
    * @returns Returns animation key 
    */

  }, {
    key: "createAnimation",
    value: function createAnimation(animationName, name, properties) {
      var animationKey = name + '_' + animationName;

      if (!this.scene.anims.anims.has(animationKey)) {
        var frameConfig = {
          frames: properties.animations[animationName].frames
        };
        var frames = this.scene.anims.generateFrameNumbers(this.texture.key, frameConfig);
        this.scene.anims.create({
          key: animationKey,
          frames: frames,
          frameRate: properties.animations[animationName].fps //repeat: -1 // repeat animation

        });
      }

      return animationKey;
    } //#endregion

  }]);

  return Unit;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Unit);

/***/ }),

/***/ "./src/prefabs/hud/menu-item.js":
/*!**************************************!*\
  !*** ./src/prefabs/hud/menu-item.js ***!
  \**************************************/
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




var MenuItem =
/*#__PURE__*/
function (_Prefab) {
  _inherits(MenuItem, _Prefab);

  function MenuItem(scene, name, position, properties) {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).call(this, scene, name, position, properties));
  } //#region public methods   
  //#endregion
  //#region protected methods


  _createClass(MenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(MenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.setInteractive();
      this.on('pointerDown', this.select.bind(this));
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      console.log(this.name + ' selected');
    } //#endregion

  }]);

  return MenuItem;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MenuItem);

/***/ }),

/***/ "./src/prefabs/hud/menu.js":
/*!*********************************!*\
  !*** ./src/prefabs/hud/menu.js ***!
  \*********************************/
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




var Menu =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Menu, _Prefab);

  function Menu(scene, name, position, properties) {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, scene, name, position, properties));
  } //#region public methods

  /**
   * Enables or disables menu items
   * @param {bool} state 
   */


  _createClass(Menu, [{
    key: "enable",
    value: function enable(state) {
      this.items.forEach(function (item) {
        item.setInteractive(state);
        item.setVisible(state);
      }, this);
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Menu.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.prepare(properties);
    } //#endregion
    //#region internal methods

    /**
     * Prepares menu with items in properties array
     */

  }, {
    key: "prepare",
    value: function prepare(properties) {
      this.items = [];

      for (var name in properties.menuItems) {
        if (properties.menuItems.hasOwnProperty(name)) {
          var menuItem = this.scene.createPrefab(name, properties.menuItems[name]);
          this.items.push(menuItem);
        }
      }

      this.enable(false);
    } //#endregion

  }]);

  return Menu;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "./src/prefabs/hud/message-box.js":
/*!****************************************!*\
  !*** ./src/prefabs/hud/message-box.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../text-prefab */ "./src/prefabs/text-prefab.js");
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





var MessageBox =
/*#__PURE__*/
function (_Prefab) {
  _inherits(MessageBox, _Prefab);

  function MessageBox(scene, name, position, properties) {
    _classCallCheck(this, MessageBox);

    return _possibleConstructorReturn(this, _getPrototypeOf(MessageBox).call(this, scene, name, position, properties));
  } //#region public methods    

  /**
   * Hides and destroy the message box
   */


  _createClass(MessageBox, [{
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(MessageBox.prototype), "destroy", this).call(this);

      this.messageText.destroy();
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(MessageBox.prototype), "initialize", this).call(this, scene, name, position, properties);

      var newPosition = {
        x: this.x + this.width / 2,
        y: this.y + 50
      };
      var newProperties = {
        group: 'hud',
        text: properties.message,
        style: Object.create(this.scene.TEXT_STYLE)
      };
      this.messageText = new _text_prefab__WEBPACK_IMPORTED_MODULE_2__["default"](this.scene, this.name + 'Message', newPosition, newProperties);
      this.setOrigin(0);
      this.messageText.setOrigin(0.5);
    } //#endregion

  }]);

  return MessageBox;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MessageBox);

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

/***/ "./src/prefabs/world/enemy-spawner.js":
/*!********************************************!*\
  !*** ./src/prefabs/world/enemy-spawner.js ***!
  \********************************************/
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




var EnemySpawner =
/*#__PURE__*/
function (_Prefab) {
  _inherits(EnemySpawner, _Prefab);

  function EnemySpawner(scene, name, position, properties) {
    _classCallCheck(this, EnemySpawner);

    return _possibleConstructorReturn(this, _getPrototypeOf(EnemySpawner).call(this, scene, name, position, properties));
  } //#region public methods    
  //#endregion
  //#region protected methods


  _createClass(EnemySpawner, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(EnemySpawner.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);
      this.body.immovable = true;
    }
    /**
    * Action the enemy starts the battle
    */

  }, {
    key: "spawn",
    value: function spawn() {
      this.scene.scene.start('BootScene', {
        scene: 'battle'
      });
    } //#endregion

  }]);

  return EnemySpawner;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (EnemySpawner);

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
/* harmony import */ var _hud_message_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hud/message-box */ "./src/prefabs/hud/message-box.js");
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
      this.MESSAGE_BOX_POSITION = {
        x: 0,
        y: 360
      };
      this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
      this.body.immovable = true;
    } //#endregion
    //#region internal methods

    /**
    * Actions when people will talk
    * (displaying npc message)
    */

  }, {
    key: "talk",
    value: function talk(npc, player) {
      player.stop();
      this.createBox();
    }
    /**
     * Creates the message box
     */

  }, {
    key: "createBox",
    value: function createBox() {
      var properties = {
        texture: 'messageBoxImage',
        group: 'hud',
        message: this.message
      };
      var box = new _hud_message_box__WEBPACK_IMPORTED_MODULE_2__["default"](this.scene, this.name + 'MessageBox', this.MESSAGE_BOX_POSITION, properties);
      this.scene.currentMessageBox = box;
      this.scene.userInput.setInput(this.scene.userInputs.talkingUserInput);
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

/***/ "./src/scenes/battle-scene.js":
/*!************************************!*\
  !*** ./src/scenes/battle-scene.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_level_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-level-scene */ "./src/scenes/json-level-scene.js");
/* harmony import */ var _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prefabs/prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _prefabs_text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prefabs/text-prefab */ "./src/prefabs/text-prefab.js");
/* harmony import */ var _prefabs_battle_unit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prefabs/battle/unit */ "./src/prefabs/battle/unit.js");
/* harmony import */ var _node_modules_js_priority_queue_priority_queue_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/js-priority-queue/priority-queue.min */ "./node_modules/js-priority-queue/priority-queue.min.js");
/* harmony import */ var _node_modules_js_priority_queue_priority_queue_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_js_priority_queue_priority_queue_min__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _prefabs_hud_menu_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../prefabs/hud/menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _prefabs_hud_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../prefabs/hud/menu */ "./src/prefabs/hud/menu.js");
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
 * Scene displaying title and starts game after clicked on it
 */

var BattleScene =
/*#__PURE__*/
function (_JSonLevelScene) {
  _inherits(BattleScene, _JSonLevelScene);

  function BattleScene() {
    var _this;

    _classCallCheck(this, BattleScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BattleScene).call(this, 'BattleScene'));
    _this.random = new Phaser.Math.RandomDataGenerator();
    return _this;
  } //#region public methods


  _createClass(BattleScene, [{
    key: "create",
    value: function create() {
      _get(_getPrototypeOf(BattleScene.prototype), "create", this).call(this);

      this.activeMenu();
      this.prepareGamingQueue();
    }
    /**
     * Launchs new turn of attack in battle scene, thanks to queue
     */

  }, {
    key: "goToNextTurn",
    value: function goToNextTurn() {
      this.currentUnit = this.units.dequeue();

      if (this.currentUnit.active) {
        this.currentUnit.attack();
        this.currentUnit.calculateAttackTurn();
        this.units.queue(this.currentUnit);
      } else {
        this.currentUnit = undefined;
        this.goToNextTurn();
      }

      console.log('next turn', this.units);
    } //#endregion
    //#region internal methods

  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      this.prefabsClasses = {
        background: _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.constructor,
        playerUnit: _prefabs_battle_unit__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor,
        enemyUnit: _prefabs_battle_unit__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor,
        menuItem: _prefabs_hud_menu_item__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.constructor,
        menu: _prefabs_hud_menu__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.constructor
      };
    }
  }, {
    key: "activeMenu",
    value: function activeMenu() {
      this.prefabs.actionsMenu.enable(true);
    }
  }, {
    key: "prepareGamingQueue",
    value: function prepareGamingQueue() {
      this.units = new _node_modules_js_priority_queue_priority_queue_min__WEBPACK_IMPORTED_MODULE_4___default.a({
        comparator: function comparator(unitA, unitB) {
          return unitA.attackTurn - unitB.attackTurn;
        }
      });
      this.calculateTurnForAllGroup(this.groups.playerUnits, 0);
      this.calculateTurnForAllGroup(this.groups.enemyUnits, 0);
      this.goToNextTurn();
    }
  }, {
    key: "calculateTurnForAllGroup",
    value: function calculateTurnForAllGroup(unitGroup, turn) {
      var _this2 = this;

      unitGroup.children.each(function (unit) {
        unit.calculateAttackTurn(turn);

        _this2.units.queue(unit);
      });
    } //#endregion

  }]);

  return BattleScene;
}(_json_level_scene__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (BattleScene);

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
      },
      battle: {
        key: 'BattleScene',
        path: 'assets/levels/battle.json'
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
    //#region protected method

    /**
    * Creates prefab
    * @param {string} spriteName 
    * @param {json} spriteData 
    */

  }, {
    key: "createPrefab",
    value: function createPrefab(spriteName, spriteData) {
      return new this.prefabsClasses[spriteData.type](this, spriteName, spriteData.position, spriteData.properties);
    } //#endregion
    //#region internal methods

    /**
    * Inits new UserInput class
    */

  }, {
    key: "initUserInputPlugin",
    value: function initUserInputPlugin() {
      if (this.levelData.userInput) {
        this.userInputs = {};

        for (var key in this.levelData.userInput) {
          if (this.levelData.userInput.hasOwnProperty(key)) {
            this.userInputs[key] = this.cache.json.get(key);
          }
        }

        this.userInput = new _plugins_user_input__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.userInputData = this.cache.json.get(this.levelData.initialUserInput);
        this.userInput.setInput(this.userInputData);
      }
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
        this.createPrefab(key, spriteData);
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
      for (var key in this.levelData.userInput) {
        if (this.levelData.userInput.hasOwnProperty(key)) {
          var path = this.levelData.userInput[key];
          this.load.json(key, path);
        }
      }
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


  _createClass(TitleScene, [{
    key: "startGame",
    value: function startGame() {
      this.scene.start('BootScene', {
        scene: 'town'
      });
    } //#endregion
    //#region internal methods

  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
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
/* harmony import */ var _prefabs_world_enemy_spawner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../prefabs/world/enemy-spawner */ "./src/prefabs/world/enemy-spawner.js");
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
    var _this;

    _classCallCheck(this, WorldScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WorldScene).call(this, 'WorldScene'));

    _this.defineTextStyle();

    return _this;
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
    }
  }, {
    key: "endTalk",
    value: function endTalk() {
      this.currentMessageBox.destroy();
      this.userInput.setInput(this.userInputs.townUserInput);
    } //#endregion
    //#region internal methods

  }, {
    key: "defineTextStyle",
    value: function defineTextStyle() {
      this.TEXT_STYLE = {
        font: '14px Kells',
        fill: "#ffffff"
      };
    }
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
      var _this2 = this;

      this.map.objects.forEach(function (layer) {
        layer.objects.forEach(_this2.createOneOject, _this2);
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
      var _this3 = this;

      this.layers = {};
      this.map.layers.forEach(function (layer, index) {
        _this3.layers[layer.name] = _this3.map.createStaticLayer(layer.name, _this3.tilesets[layer.properties.tileset]);

        if (layer.properties.collision) {
          _this3.map.setCollisionByExclusion([-1], true, layer.name);
        }
      });
    }
  }, {
    key: "prepareTileSets",
    value: function prepareTileSets() {
      var _this4 = this;

      this.tilesets = {};
      this.map.tilesets.forEach(function (tileSet, index) {
        var tileSetContent = _this4.levelData.map.tilesets[index];

        var mapTileset = _this4.map.addTilesetImage(tileSet.name, tileSetContent);

        _this4.tilesets[tileSetContent] = mapTileset;
      }, this);
    }
  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      this.prefabsClasses = {
        player: _prefabs_world_player__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor,
        door: _prefabs_world_door__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.constructor,
        npc: _prefabs_world_npc__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.constructor,
        enemySpawner: _prefabs_world_enemy_spawner__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.constructor
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