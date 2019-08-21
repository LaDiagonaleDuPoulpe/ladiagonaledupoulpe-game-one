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

/***/ "./node_modules/@firebase/app/dist/index.cjs.js":
/*!******************************************************!*\
  !*** ./node_modules/@firebase/app/dist/index.cjs.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var util = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.cjs.js");

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
// An array to capture listeners before the true auth functions
// exist
var tokenListeners = [];
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
var FirebaseAppImpl = /** @class */ (function () {
    function FirebaseAppImpl(options, config, firebase_) {
        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.services_ = {};
        this.name_ = config.name;
        this._automaticDataCollectionEnabled =
            config.automaticDataCollectionEnabled || false;
        this.options_ = util.deepCopy(options);
        this.INTERNAL = {
            getUid: function () { return null; },
            getToken: function () { return Promise.resolve(null); },
            addAuthTokenListener: function (callback) {
                tokenListeners.push(callback);
                // Make sure callback is called, asynchronously, in the absence of the auth module
                setTimeout(function () { return callback(null); }, 0);
            },
            removeAuthTokenListener: function (callback) {
                tokenListeners = tokenListeners.filter(function (listener) { return listener !== callback; });
            }
        };
    }
    Object.defineProperty(FirebaseAppImpl.prototype, "automaticDataCollectionEnabled", {
        get: function () {
            this.checkDestroyed_();
            return this._automaticDataCollectionEnabled;
        },
        set: function (val) {
            this.checkDestroyed_();
            this._automaticDataCollectionEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "name", {
        get: function () {
            this.checkDestroyed_();
            return this.name_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "options", {
        get: function () {
            this.checkDestroyed_();
            return this.options_;
        },
        enumerable: true,
        configurable: true
    });
    FirebaseAppImpl.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkDestroyed_();
            resolve();
        })
            .then(function () {
            _this.firebase_.INTERNAL.removeApp(_this.name_);
            var services = [];
            Object.keys(_this.services_).forEach(function (serviceKey) {
                Object.keys(_this.services_[serviceKey]).forEach(function (instanceKey) {
                    services.push(_this.services_[serviceKey][instanceKey]);
                });
            });
            return Promise.all(services.map(function (service) {
                return service.INTERNAL.delete();
            }));
        })
            .then(function () {
            _this.isDeleted_ = true;
            _this.services_ = {};
        });
    };
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage is the only one that is leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    FirebaseAppImpl.prototype._getService = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        this.checkDestroyed_();
        if (!this.services_[name]) {
            this.services_[name] = {};
        }
        if (!this.services_[name][instanceIdentifier]) {
            /**
             * If a custom instance has been defined (i.e. not '[DEFAULT]')
             * then we will pass that instance on, otherwise we pass `null`
             */
            var instanceSpecifier = instanceIdentifier !== DEFAULT_ENTRY_NAME
                ? instanceIdentifier
                : undefined;
            var service = this.firebase_.INTERNAL.factories[name](this, this.extendApp.bind(this), instanceSpecifier);
            this.services_[name][instanceIdentifier] = service;
        }
        return this.services_[name][instanceIdentifier];
    };
    /**
     * Callback function used to extend an App instance at the time
     * of service instance creation.
     */
    FirebaseAppImpl.prototype.extendApp = function (props) {
        var _this = this;
        // Copy the object onto the FirebaseAppImpl prototype
        util.deepExtend(this, props);
        /**
         * If the app has overwritten the addAuthTokenListener stub, forward
         * the active token listeners on to the true fxn.
         *
         * TODO: This function is required due to our current module
         * structure. Once we are able to rely strictly upon a single module
         * implementation, this code should be refactored and Auth should
         * provide these stubs and the upgrade logic
         */
        if (props.INTERNAL && props.INTERNAL.addAuthTokenListener) {
            tokenListeners.forEach(function (listener) {
                _this.INTERNAL.addAuthTokenListener(listener);
            });
            tokenListeners = [];
        }
    };
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    FirebaseAppImpl.prototype.checkDestroyed_ = function () {
        if (this.isDeleted_) {
            error('app-deleted', { name: this.name_ });
        }
    };
    return FirebaseAppImpl;
}());
// Prevent dead-code elimination of these methods w/o invalid property
// copying.
(FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options) ||
    FirebaseAppImpl.prototype.delete ||
    console.log('dc');
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var apps_ = {};
    var factories = {};
    var appHooks = {};
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        __esModule: true,
        initializeApp: initializeApp,
        app: app,
        apps: null,
        Promise: Promise,
        SDK_VERSION: '5.0.3',
        INTERNAL: {
            registerService: registerService,
            createFirebaseNamespace: createFirebaseNamespace,
            extendNamespace: extendNamespace,
            createSubscribe: util.createSubscribe,
            ErrorFactory: util.ErrorFactory,
            removeApp: removeApp,
            factories: factories,
            useAsService: useAsService,
            Promise: Promise,
            deepExtend: util.deepExtend
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    util.patchProperty(namespace, 'default', namespace);
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });
    /**
     * Called by App.delete() - but before any services associated with the App
     * are deleted.
     */
    function removeApp(name) {
        var app = apps_[name];
        callAppHooks(app, 'delete');
        delete apps_[name];
    }
    /**
     * Get the App object for a given name (or DEFAULT).
     */
    function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!contains(apps_, name)) {
            error('no-app', { name: name });
        }
        return apps_[name];
    }
    util.patchProperty(app, 'App', FirebaseAppImpl);
    function initializeApp(options, rawConfig) {
        if (rawConfig === void 0) { rawConfig = {}; }
        if (typeof rawConfig !== 'object' || rawConfig === null) {
            var name_1 = rawConfig;
            rawConfig = { name: name_1 };
        }
        var config = rawConfig;
        if (config.name === undefined) {
            config.name = DEFAULT_ENTRY_NAME;
        }
        var name = config.name;
        if (typeof name !== 'string' || !name) {
            error('bad-app-name', { name: name + '' });
        }
        if (contains(apps_, name)) {
            error('duplicate-app', { name: name });
        }
        var app = new FirebaseAppImpl(options, config, namespace);
        apps_[name] = app;
        callAppHooks(app, 'create');
        return app;
    }
    /*
     * Return an array of all the non-deleted FirebaseApps.
     */
    function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps_).map(function (name) { return apps_[name]; });
    }
    /*
     * Register a Firebase Service.
     *
     * firebase.INTERNAL.registerService()
     *
     * TODO: Implement serviceProperties.
     */
    function registerService(name, createService, serviceProperties, appHook, allowMultipleInstances) {
        // Cannot re-register a service that already exists
        if (factories[name]) {
            error('duplicate-service', { name: name });
        }
        // Capture the service factory for later service instantiation
        factories[name] = createService;
        // Capture the appHook, if passed
        if (appHook) {
            appHooks[name] = appHook;
            // Run the **new** app hook on all existing apps
            getApps().forEach(function (app) {
                appHook('create', app);
            });
        }
        // The Service namespace is an accessor function ...
        var serviceNamespace = function (appArg) {
            if (appArg === void 0) { appArg = app(); }
            if (typeof appArg[name] !== 'function') {
                // Invalid argument.
                // This happens in the following case: firebase.storage('gs:/')
                error('invalid-app-argument', { name: name });
            }
            // Forward service instance lookup to the FirebaseApp.
            return appArg[name]();
        };
        // ... and a container for service-level properties.
        if (serviceProperties !== undefined) {
            util.deepExtend(serviceNamespace, serviceProperties);
        }
        // Monkey-patch the serviceNamespace onto the firebase namespace
        namespace[name] = serviceNamespace;
        // Patch the FirebaseAppImpl prototype
        FirebaseAppImpl.prototype[name] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var serviceFxn = this._getService.bind(this, name);
            return serviceFxn.apply(this, allowMultipleInstances ? args : []);
        };
        return serviceNamespace;
    }
    /**
     * Patch the top-level firebase namespace with additional properties.
     *
     * firebase.INTERNAL.extendNamespace()
     */
    function extendNamespace(props) {
        util.deepExtend(namespace, props);
    }
    function callAppHooks(app, eventName) {
        Object.keys(factories).forEach(function (serviceName) {
            // Ignore virtual services
            var factoryName = useAsService(app, serviceName);
            if (factoryName === null) {
                return;
            }
            if (appHooks[factoryName]) {
                appHooks[factoryName](eventName, app);
            }
        });
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        var useService = name;
        var options = app.options;
        return useService;
    }
    return namespace;
}
function error(code, args) {
    throw appErrors.create(code, args);
}
// TypeScript does not support non-string indexes!
// let errors: {[code: AppError: string} = {
var errors = {
    'no-app': "No Firebase App '{$name}' has been created - " +
        'call Firebase App.initializeApp()',
    'bad-app-name': "Illegal App name: '{$name}",
    'duplicate-app': "Firebase App named '{$name}' already exists",
    'app-deleted': "Firebase App named '{$name}' already deleted",
    'duplicate-service': "Firebase service named '{$name}' already registered",
    'sa-not-supported': 'Initializing the Firebase SDK with a service ' +
        'account is only allowed in a Node.js environment. On client ' +
        'devices, you should instead initialize the SDK with an api key and ' +
        'auth domain',
    'invalid-app-argument': 'firebase.{$name}() takes either no argument or a ' +
        'Firebase App instance.'
};
var appErrors = new util.ErrorFactory('app', 'Firebase', errors);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var firebase = createFirebaseNamespace();

exports.firebase = firebase;
exports.default = firebase;


/***/ }),

/***/ "./node_modules/@firebase/auth/dist/auth.js":
/*!**************************************************!*\
  !*** ./node_modules/@firebase/auth/dist/auth.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  var firebase = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/index.cjs.js").default;
  var g,aa=aa||{},k=this;function l(a){return"string"==typeof a}function ba(a){return"boolean"==typeof a}function ca(){}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return null===a}function fa(a){return"array"==da(a)}function ha(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function n(a){return"function"==da(a)}function q(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}var ia="closure_uid_"+(1E9*Math.random()>>>0),ja=0;function ka(a,b,c){return a.call.apply(a.bind,arguments)}
function la(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?r=ka:r=la;return r.apply(null,arguments)}
function ma(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}var na=Date.now||function(){return+new Date};function t(a,b){function c(){}c.prototype=b.prototype;a.lb=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.cd=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};function oa(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0}function pa(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};function u(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}t(u,Error);u.prototype.name="CustomError";function qa(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");u.call(this,c+a[d])}t(qa,u);qa.prototype.name="AssertionError";function ra(a,b){throw new qa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};function sa(a,b){this.c=a;this.f=b;this.b=0;this.a=null}sa.prototype.get=function(){if(0<this.b){this.b--;var a=this.a;this.a=a.next;a.next=null}else a=this.c();return a};function ta(a,b){a.f(b);100>a.b&&(a.b++,b.next=a.a,a.a=b)};function ua(){this.b=this.a=null}var wa=new sa(function(){return new va},function(a){a.reset()});ua.prototype.add=function(a,b){var c=wa.get();c.set(a,b);this.b?this.b.next=c:this.a=c;this.b=c};function xa(){var a=ya,b=null;a.a&&(b=a.a,a.a=a.a.next,a.a||(a.b=null),b.next=null);return b}function va(){this.next=this.b=this.a=null}va.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};va.prototype.reset=function(){this.next=this.b=this.a=null};var za=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(l(a))return l(b)&&1==b.length?a.indexOf(b,0):-1;for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},v=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=l(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Aa(a,b){var c=a.length,d=l(a)?a.split(""):a;for(--c;0<=c;--c)c in d&&b.call(void 0,d[c],c,a)}
var Ba=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e=l(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));return d},Ca=Array.prototype.some?function(a,b){return Array.prototype.some.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=l(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a))return!0;return!1};
function Da(a){a:{var b=Ea;for(var c=a.length,d=l(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:l(a)?a.charAt(b):a[b]}function Fa(a,b){return 0<=za(a,b)}function Ga(a,b){b=za(a,b);var c;(c=0<=b)&&Array.prototype.splice.call(a,b,1);return c}function Ha(a,b){var c=0;Aa(a,function(d,e){b.call(void 0,d,e,a)&&1==Array.prototype.splice.call(a,e,1).length&&c++})}function Ia(a){return Array.prototype.concat.apply([],arguments)}
function Ja(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function Ka(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var La=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function Ma(a){if(!Na.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Oa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Pa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Qa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Ra,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Sa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Ta,"&#0;"));return a}var Oa=/&/g,Pa=/</g,Qa=/>/g,Ra=/"/g,Sa=/'/g,Ta=/\x00/g,Na=/[\x00&<>"']/;function w(a,b){return-1!=a.indexOf(b)}function Ua(a,b){return a<b?-1:a>b?1:0};var Va;a:{var Wa=k.navigator;if(Wa){var Xa=Wa.userAgent;if(Xa){Va=Xa;break a}}Va=""}function x(a){return w(Va,a)};function Ya(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Za(a){for(var b in a)return!1;return!0}function $a(a){var b={},c;for(c in a)b[c]=a[c];return b}var ab="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function bb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ab.length;f++)c=ab[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function cb(a){k.setTimeout(function(){throw a;},0)}var db;
function eb(){var a=k.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow;a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host;a=r(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.tb;c.tb=null;a()}};return function(a){d.next={tb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){k.setTimeout(a,0)}};function fb(a,b){gb||hb();ib||(gb(),ib=!0);ya.add(a,b)}var gb;function hb(){if(k.Promise&&k.Promise.resolve){var a=k.Promise.resolve(void 0);gb=function(){a.then(jb)}}else gb=function(){var a=jb;!n(k.setImmediate)||k.Window&&k.Window.prototype&&!x("Edge")&&k.Window.prototype.setImmediate==k.setImmediate?(db||(db=eb()),db(a)):k.setImmediate(a)}}var ib=!1,ya=new ua;function jb(){for(var a;a=xa();){try{a.a.call(a.b)}catch(b){cb(b)}ta(wa,a)}ib=!1};function y(a,b){this.a=kb;this.i=void 0;this.f=this.b=this.c=null;this.g=this.h=!1;if(a!=ca)try{var c=this;a.call(b,function(a){lb(c,mb,a)},function(a){if(!(a instanceof nb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}lb(c,ob,a)})}catch(d){lb(this,ob,d)}}var kb=0,mb=2,ob=3;function pb(){this.next=this.f=this.b=this.g=this.a=null;this.c=!1}pb.prototype.reset=function(){this.f=this.b=this.g=this.a=null;this.c=!1};var qb=new sa(function(){return new pb},function(a){a.reset()});
function rb(a,b,c){var d=qb.get();d.g=a;d.b=b;d.f=c;return d}function A(a){if(a instanceof y)return a;var b=new y(ca);lb(b,mb,a);return b}function B(a){return new y(function(b,c){c(a)})}function sb(a,b,c){tb(a,b,c,null)||fb(ma(b,a))}function ub(a){return new y(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},h=function(a){c(a)},m=0,p;m<a.length;m++)p=a[m],sb(p,ma(f,m),h);else b(e)})}
function vb(a){return new y(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Zb:!0,value:f}:{Zb:!1,reason:f};0==c&&b(d)},f=0,h;f<a.length;f++)h=a[f],sb(h,ma(e,f,!0),ma(e,f,!1));else b(d)})}y.prototype.then=function(a,b,c){return wb(this,n(a)?a:null,n(b)?b:null,c)};oa(y);g=y.prototype;g.ia=function(a,b){a=rb(a,a,b);a.c=!0;xb(this,a);return this};g.s=function(a,b){return wb(this,null,a,b)};g.cancel=function(a){this.a==kb&&fb(function(){var b=new nb(a);yb(this,b)},this)};
function yb(a,b){if(a.a==kb)if(a.c){var c=a.c;if(c.b){for(var d=0,e=null,f=null,h=c.b;h&&(h.c||(d++,h.a==a&&(e=h),!(e&&1<d)));h=h.next)e||(f=h);e&&(c.a==kb&&1==d?yb(c,b):(f?(d=f,d.next==c.f&&(c.f=d),d.next=d.next.next):zb(c),Ab(c,e,ob,b)))}a.c=null}else lb(a,ob,b)}function xb(a,b){a.b||a.a!=mb&&a.a!=ob||Bb(a);a.f?a.f.next=b:a.b=b;a.f=b}
function wb(a,b,c,d){var e=rb(null,null,null);e.a=new y(function(a,h){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(z){h(z)}}:a;e.b=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof nb?h(b):a(e)}catch(z){h(z)}}:h});e.a.c=a;xb(a,e);return e.a}g.Lc=function(a){this.a=kb;lb(this,mb,a)};g.Mc=function(a){this.a=kb;lb(this,ob,a)};
function lb(a,b,c){a.a==kb&&(a===c&&(b=ob,c=new TypeError("Promise cannot resolve to itself")),a.a=1,tb(c,a.Lc,a.Mc,a)||(a.i=c,a.a=b,a.c=null,Bb(a),b!=ob||c instanceof nb||Cb(a,c)))}function tb(a,b,c,d){if(a instanceof y)return xb(a,rb(b||ca,c||null,d)),!0;if(pa(a))return a.then(b,c,d),!0;if(q(a))try{var e=a.then;if(n(e))return Db(a,e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1}
function Db(a,b,c,d,e){function f(a){m||(m=!0,d.call(e,a))}function h(a){m||(m=!0,c.call(e,a))}var m=!1;try{b.call(a,h,f)}catch(p){f(p)}}function Bb(a){a.h||(a.h=!0,fb(a.Ub,a))}function zb(a){var b=null;a.b&&(b=a.b,a.b=b.next,b.next=null);a.b||(a.f=null);return b}g.Ub=function(){for(var a;a=zb(this);)Ab(this,a,this.a,this.i);this.h=!1};
function Ab(a,b,c,d){if(c==ob&&b.b&&!b.c)for(;a&&a.g;a=a.c)a.g=!1;if(b.a)b.a.c=null,Eb(b,c,d);else try{b.c?b.g.call(b.f):Eb(b,c,d)}catch(e){Fb.call(null,e)}ta(qb,b)}function Eb(a,b,c){b==mb?a.g.call(a.f,c):a.b&&a.b.call(a.f,c)}function Cb(a,b){a.g=!0;fb(function(){a.g&&Fb.call(null,b)})}var Fb=cb;function nb(a){u.call(this,a)}t(nb,u);nb.prototype.name="cancel";function Gb(){0!=Hb&&(Ib[this[ia]||(this[ia]=++ja)]=this);this.pa=this.pa;this.ja=this.ja}var Hb=0,Ib={};Gb.prototype.pa=!1;function Jb(a){if(!a.pa&&(a.pa=!0,a.ua(),0!=Hb)){var b=a[ia]||(a[ia]=++ja);if(0!=Hb&&a.ja&&0<a.ja.length)throw Error(a+" did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");delete Ib[b]}}Gb.prototype.ua=function(){if(this.ja)for(;this.ja.length;)this.ja.shift()()};function Kb(a){Kb[" "](a);return a}Kb[" "]=ca;function Lb(a,b){var c=Mb;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var Nb=x("Opera"),Ob=x("Trident")||x("MSIE"),Pb=x("Edge"),Qb=Pb||Ob,Rb=x("Gecko")&&!(w(Va.toLowerCase(),"webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),Sb=w(Va.toLowerCase(),"webkit")&&!x("Edge");function Tb(){var a=k.document;return a?a.documentMode:void 0}var Ub;
a:{var Vb="",Wb=function(){var a=Va;if(Rb)return/rv:([^\);]+)(\)|;)/.exec(a);if(Pb)return/Edge\/([\d\.]+)/.exec(a);if(Ob)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Sb)return/WebKit\/(\S+)/.exec(a);if(Nb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Wb&&(Vb=Wb?Wb[1]:"");if(Ob){var Xb=Tb();if(null!=Xb&&Xb>parseFloat(Vb)){Ub=String(Xb);break a}}Ub=Vb}var Mb={};
function Yb(a){return Lb(a,function(){for(var b=0,c=La(String(Ub)).split("."),d=La(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var h=c[f]||"",m=d[f]||"";do{h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];m=/(\d*)(\D*)(.*)/.exec(m)||["","","",""];if(0==h[0].length&&0==m[0].length)break;b=Ua(0==h[1].length?0:parseInt(h[1],10),0==m[1].length?0:parseInt(m[1],10))||Ua(0==h[2].length,0==m[2].length)||Ua(h[2],m[2]);h=h[3];m=m[3]}while(0==b)}return 0<=b})}var Zb;var $b=k.document;
Zb=$b&&Ob?Tb()||("CSS1Compat"==$b.compatMode?parseInt(Ub,10):5):void 0;var ac=Object.freeze||function(a){return a};var bc=!Ob||9<=Number(Zb),cc=Ob&&!Yb("9"),dc=function(){if(!k.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});k.addEventListener("test",ca,b);k.removeEventListener("test",ca,b);return a}();function C(a,b){this.type=a;this.b=this.target=b;this.Gb=!0}C.prototype.preventDefault=function(){this.Gb=!1};function ec(a,b){C.call(this,a?a.type:"");this.relatedTarget=this.b=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.pointerId=0;this.pointerType="";this.a=null;if(a){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.b=b;if(b=a.relatedTarget){if(Rb){a:{try{Kb(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=
a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.pointerId=a.pointerId||0;this.pointerType=l(a.pointerType)?a.pointerType:fc[a.pointerType]||"";this.a=a;a.defaultPrevented&&this.preventDefault()}}t(ec,C);var fc=ac({2:"touch",3:"pen",4:"mouse"});ec.prototype.preventDefault=function(){ec.lb.preventDefault.call(this);var a=this.a;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,cc)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};ec.prototype.f=function(){return this.a};var gc="closure_listenable_"+(1E6*Math.random()|0),hc=0;function ic(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.La=e;this.key=++hc;this.na=this.Ia=!1}function jc(a){a.na=!0;a.listener=null;a.proxy=null;a.src=null;a.La=null};function kc(a){this.src=a;this.a={};this.b=0}kc.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.b++);var h=lc(a,b,d,e);-1<h?(b=a[h],c||(b.Ia=!1)):(b=new ic(b,this.src,f,!!d,e),b.Ia=c,a.push(b));return b};function mc(a,b){var c=b.type;c in a.a&&Ga(a.a[c],b)&&(jc(b),0==a.a[c].length&&(delete a.a[c],a.b--))}function lc(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.na&&f.listener==b&&f.capture==!!c&&f.La==d)return e}return-1};var nc="closure_lm_"+(1E6*Math.random()|0),oc={},qc=0;function rc(a,b,c,d,e){if(d&&d.once)sc(a,b,c,d,e);else if(fa(b))for(var f=0;f<b.length;f++)rc(a,b[f],c,d,e);else c=tc(c),a&&a[gc]?uc(a,b,c,q(d)?!!d.capture:!!d,e):vc(a,b,c,!1,d,e)}
function vc(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var h=q(e)?!!e.capture:!!e,m=wc(a);m||(a[nc]=m=new kc(a));c=m.add(b,c,d,h,f);if(!c.proxy){d=xc();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)dc||(e=h),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(yc(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");qc++}}
function xc(){var a=zc,b=bc?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b}function sc(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)sc(a,b[f],c,d,e);else c=tc(c),a&&a[gc]?Ac(a,b,c,q(d)?!!d.capture:!!d,e):vc(a,b,c,!0,d,e)}
function D(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)D(a,b[f],c,d,e);else(d=q(d)?!!d.capture:!!d,c=tc(c),a&&a[gc])?(a=a.m,b=String(b).toString(),b in a.a&&(f=a.a[b],c=lc(f,c,d,e),-1<c&&(jc(f[c]),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=wc(a))&&(b=a.a[b.toString()],a=-1,b&&(a=lc(b,c,d,e)),(c=-1<a?b[a]:null)&&Bc(c))}
function Bc(a){if("number"!=typeof a&&a&&!a.na){var b=a.src;if(b&&b[gc])mc(b.m,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(yc(c),d):b.addListener&&b.removeListener&&b.removeListener(d);qc--;(c=wc(b))?(mc(c,a),0==c.b&&(c.src=null,b[nc]=null)):jc(a)}}}function yc(a){return a in oc?oc[a]:oc[a]="on"+a}
function Cc(a,b,c,d){var e=!0;if(a=wc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.na&&(f=Dc(f,d),e=e&&!1!==f)}return e}function Dc(a,b){var c=a.listener,d=a.La||a.src;a.Ia&&Bc(a);return c.call(d,b)}
function zc(a,b){if(a.na)return!0;if(!bc){if(!b)a:{b=["window","event"];for(var c=k,d=0;d<b.length;d++)if(c=c[b[d]],null==c){b=null;break a}b=c}d=b;b=new ec(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(h){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.b;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;0<=e;e--){b.b=d[e];var f=Cc(d[e],a,!0,b);c=c&&f}for(e=0;e<d.length;e++)b.b=d[e],f=Cc(d[e],a,!1,b),c=c&&f}return c}return Dc(a,
new ec(b,this))}function wc(a){a=a[nc];return a instanceof kc?a:null}var Ec="__closure_events_fn_"+(1E9*Math.random()>>>0);function tc(a){if(n(a))return a;a[Ec]||(a[Ec]=function(b){return a.handleEvent(b)});return a[Ec]};function E(){Gb.call(this);this.m=new kc(this);this.Nb=this;this.Ua=null}t(E,Gb);E.prototype[gc]=!0;E.prototype.addEventListener=function(a,b,c,d){rc(this,a,b,c,d)};E.prototype.removeEventListener=function(a,b,c,d){D(this,a,b,c,d)};
E.prototype.dispatchEvent=function(a){var b,c=this.Ua;if(c)for(b=[];c;c=c.Ua)b.push(c);c=this.Nb;var d=a.type||a;if(l(a))a=new C(a,c);else if(a instanceof C)a.target=a.target||c;else{var e=a;a=new C(d,c);bb(a,e)}e=!0;if(b)for(var f=b.length-1;0<=f;f--){var h=a.b=b[f];e=Fc(h,d,!0,a)&&e}h=a.b=c;e=Fc(h,d,!0,a)&&e;e=Fc(h,d,!1,a)&&e;if(b)for(f=0;f<b.length;f++)h=a.b=b[f],e=Fc(h,d,!1,a)&&e;return e};
E.prototype.ua=function(){E.lb.ua.call(this);if(this.m){var a=this.m,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,jc(d[e]);delete a.a[c];a.b--}}this.Ua=null};function uc(a,b,c,d,e){a.m.add(String(b),c,!1,d,e)}function Ac(a,b,c,d,e){a.m.add(String(b),c,!0,d,e)}
function Fc(a,b,c,d){b=a.m.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.na&&h.capture==c){var m=h.listener,p=h.La||h.src;h.Ia&&mc(a.m,h);e=!1!==m.call(p,d)&&e}}return e&&0!=d.Gb};function Gc(a,b,c){if(n(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:k.setTimeout(a,b||0)}function Hc(a){var b=null;return(new y(function(c,d){b=Gc(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).s(function(a){k.clearTimeout(b);throw a;})};function Ic(a){if(a.S&&"function"==typeof a.S)return a.S();if(l(a))return a.split("");if(ha(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}b=[];c=0;for(d in a)b[c++]=a[d];return b}function Jc(a){if(a.U&&"function"==typeof a.U)return a.U();if(!a.S||"function"!=typeof a.S){if(ha(a)||l(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}b=[];c=0;for(var d in a)b[c++]=d;return b}}
function Kc(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ha(a)||l(a))v(a,b,void 0);else for(var c=Jc(a),d=Ic(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};function Lc(a,b){this.b={};this.a=[];this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Lc)for(c=a.U(),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}g=Lc.prototype;g.S=function(){Mc(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};g.U=function(){Mc(this);return this.a.concat()};
g.clear=function(){this.b={};this.c=this.a.length=0};function Mc(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Nc(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){var e={};for(c=b=0;b<a.a.length;)d=a.a[b],Nc(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}g.get=function(a,b){return Nc(this.b,a)?this.b[a]:b};g.set=function(a,b){Nc(this.b,a)||(this.c++,this.a.push(a));this.b[a]=b};
g.forEach=function(a,b){for(var c=this.U(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};function Nc(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Oc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Qc(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1)}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"")}}};function Rc(a,b){this.b=this.m=this.c="";this.i=null;this.h=this.g="";this.f=!1;if(a instanceof Rc){this.f=void 0!==b?b:a.f;Sc(this,a.c);this.m=a.m;this.b=a.b;Tc(this,a.i);this.g=a.g;b=a.a;var c=new Uc;c.c=b.c;b.a&&(c.a=new Lc(b.a),c.b=b.b);Vc(this,c);this.h=a.h}else a&&(c=String(a).match(Oc))?(this.f=!!b,Sc(this,c[1]||"",!0),this.m=Wc(c[2]||""),this.b=Wc(c[3]||"",!0),Tc(this,c[4]),this.g=Wc(c[5]||"",!0),Vc(this,c[6]||"",!0),this.h=Wc(c[7]||"")):(this.f=!!b,this.a=new Uc(null,this.f))}
Rc.prototype.toString=function(){var a=[],b=this.c;b&&a.push(Xc(b,Yc,!0),":");var c=this.b;if(c||"file"==b)a.push("//"),(b=this.m)&&a.push(Xc(b,Yc,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.i,null!=c&&a.push(":",String(c));if(c=this.g)this.b&&"/"!=c.charAt(0)&&a.push("/"),a.push(Xc(c,"/"==c.charAt(0)?Zc:$c,!0));(c=this.a.toString())&&a.push("?",c);(c=this.h)&&a.push("#",Xc(c,ad));return a.join("")};
function Sc(a,b,c){a.c=c?Wc(b,!0):b;a.c&&(a.c=a.c.replace(/:$/,""))}function Tc(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.i=b}else a.i=null}function Vc(a,b,c){b instanceof Uc?(a.a=b,bd(a.a,a.f)):(c||(b=Xc(b,cd)),a.a=new Uc(b,a.f))}function F(a,b,c){a.a.set(b,c)}function dd(a,b){return a.a.get(b)}function ed(a){return a instanceof Rc?new Rc(a):new Rc(a,void 0)}function fd(a,b){var c=new Rc(null,void 0);Sc(c,"https");a&&(c.b=a);b&&(c.g=b);return c}
function Wc(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Xc(a,b,c){return l(a)?(a=encodeURI(a).replace(b,gd),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function gd(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Yc=/[#\/\?@]/g,$c=/[#\?:]/g,Zc=/[#\?]/g,cd=/[#\?@]/g,ad=/#/g;function Uc(a,b){this.b=this.a=null;this.c=a||null;this.f=!!b}
function hd(a){a.a||(a.a=new Lc,a.b=0,a.c&&Qc(a.c,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))}function id(a){var b=Jc(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new Uc(null,void 0);a=Ic(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];fa(f)?jd(c,e,f):c.add(e,f)}return c}g=Uc.prototype;g.add=function(a,b){hd(this);this.c=null;a=kd(this,a);var c=this.a.get(a);c||this.a.set(a,c=[]);c.push(b);this.b+=1;return this};
function ld(a,b){hd(a);b=kd(a,b);Nc(a.a.b,b)&&(a.c=null,a.b-=a.a.get(b).length,a=a.a,Nc(a.b,b)&&(delete a.b[b],a.c--,a.a.length>2*a.c&&Mc(a)))}g.clear=function(){this.a=this.c=null;this.b=0};function md(a,b){hd(a);b=kd(a,b);return Nc(a.a.b,b)}g.forEach=function(a,b){hd(this);this.a.forEach(function(c,d){v(c,function(c){a.call(b,c,d,this)},this)},this)};g.U=function(){hd(this);for(var a=this.a.S(),b=this.a.U(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
g.S=function(a){hd(this);var b=[];if(l(a))md(this,a)&&(b=Ia(b,this.a.get(kd(this,a))));else{a=this.a.S();for(var c=0;c<a.length;c++)b=Ia(b,a[c])}return b};g.set=function(a,b){hd(this);this.c=null;a=kd(this,a);md(this,a)&&(this.b-=this.a.get(a).length);this.a.set(a,[b]);this.b+=1;return this};g.get=function(a,b){a=a?this.S(a):[];return 0<a.length?String(a[0]):b};function jd(a,b,c){ld(a,b);0<c.length&&(a.c=null,a.a.set(kd(a,b),Ja(c)),a.b+=c.length)}
g.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var a=[],b=this.a.U(),c=0;c<b.length;c++){var d=b[c],e=encodeURIComponent(String(d));d=this.S(d);for(var f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+encodeURIComponent(String(d[f])));a.push(h)}}return this.c=a.join("&")};function kd(a,b){b=String(b);a.f&&(b=b.toLowerCase());return b}function bd(a,b){b&&!a.f&&(hd(a),a.c=null,a.a.forEach(function(a,b){var c=b.toLowerCase();b!=c&&(ld(this,b),jd(this,c,a))},a));a.f=b};var nd=!Ob||9<=Number(Zb);function od(){this.a="";this.b=pd}od.prototype.ma=!0;od.prototype.la=function(){return this.a};od.prototype.toString=function(){return"Const{"+this.a+"}"};function qd(a){if(a instanceof od&&a.constructor===od&&a.b===pd)return a.a;ra("expected object of type Const, got '"+a+"'");return"type_error:Const"}var pd={};function rd(a){var b=new od;b.a=a;return b}rd("");function sd(){this.a="";this.b=td}sd.prototype.ma=!0;sd.prototype.la=function(){return this.a};sd.prototype.toString=function(){return"TrustedResourceUrl{"+this.a+"}"};function ud(a){if(a instanceof sd&&a.constructor===sd&&a.b===td)return a.a;ra("expected object of type TrustedResourceUrl, got '"+a+"' of type "+da(a));return"type_error:TrustedResourceUrl"}
function vd(a,b){var c=qd(a);if(!wd.test(c))throw Error("Invalid TrustedResourceUrl format: "+c);a=c.replace(xd,function(a,e){if(!Object.prototype.hasOwnProperty.call(b,e))throw Error('Found marker, "'+e+'", in format string, "'+c+'", but no valid label mapping found in args: '+JSON.stringify(b));a=b[e];return a instanceof od?qd(a):encodeURIComponent(String(a))});return yd(a)}var xd=/%{(\w+)}/g,wd=/^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank#/i,td={};
function yd(a){var b=new sd;b.a=a;return b};function zd(){this.a="";this.b=Ad}zd.prototype.ma=!0;zd.prototype.la=function(){return this.a};zd.prototype.toString=function(){return"SafeUrl{"+this.a+"}"};function Bd(a){if(a instanceof zd&&a.constructor===zd&&a.b===Ad)return a.a;ra("expected object of type SafeUrl, got '"+a+"' of type "+da(a));return"type_error:SafeUrl"}var Cd=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
function Dd(a){if(a instanceof zd)return a;a=a.ma?a.la():String(a);Cd.test(a)||(a="about:invalid#zClosurez");return Ed(a)}var Ad={};function Ed(a){var b=new zd;b.a=a;return b}Ed("about:blank");function Fd(){this.a="";this.b=Gd}Fd.prototype.ma=!0;Fd.prototype.la=function(){return this.a};Fd.prototype.toString=function(){return"SafeHtml{"+this.a+"}"};function Hd(a){if(a instanceof Fd&&a.constructor===Fd&&a.b===Gd)return a.a;ra("expected object of type SafeHtml, got '"+a+"' of type "+da(a));return"type_error:SafeHtml"}var Gd={};function Id(a){var b=new Fd;b.a=a;return b}Id("<!DOCTYPE html>");Id("");Id("<br>");function Jd(a){var b=document;return l(a)?b.getElementById(a):a}function Kd(a,b){Ya(b,function(b,d){b&&b.ma&&(b=b.la());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Ld.hasOwnProperty(d)?a.setAttribute(Ld[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}
var Ld={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function Md(a,b,c){var d=arguments,e=document,f=String(d[0]),h=d[1];if(!nd&&h&&(h.name||h.type)){f=["<",f];h.name&&f.push(' name="',Ma(h.name),'"');if(h.type){f.push(' type="',Ma(h.type),'"');var m={};bb(m,h);delete m.type;h=m}f.push(">");f=f.join("")}f=e.createElement(f);h&&(l(h)?f.className=h:fa(h)?f.className=h.join(" "):Kd(f,h));2<d.length&&Nd(e,f,d);return f}
function Nd(a,b,c){function d(c){c&&b.appendChild(l(c)?a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=c[e];!ha(f)||q(f)&&0<f.nodeType?d(f):v(Od(f)?Ja(f):f,d)}}function Od(a){if(a&&"number"==typeof a.length){if(q(a))return"function"==typeof a.item||"string"==typeof a.item;if(n(a))return"function"==typeof a.item}return!1};function Pd(a){var b=[];Qd(new Rd,a,b);return b.join("")}function Rd(){}
function Qd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(fa(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Qd(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Sd(d,c),c.push(":"),Qd(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Sd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}var Td={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ud=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;
function Sd(a,b){b.push('"',a.replace(Ud,function(a){var b=Td[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Td[a]=b);return b}),'"')};function Vd(){var a=G();return Ob&&!!Zb&&11==Zb||/Edge\/\d+/.test(a)}function Wd(){return k.window&&k.window.location.href||self&&self.location&&self.location.href||""}function Xd(a,b){b=b||k.window;var c="about:blank";a&&(c=Bd(Dd(a)));b.location.href=c}function Yd(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<Yd(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c}
function Zd(){var a=G();a=$d(a)!=ae?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],10):null;return a&&30>a?!1:!Ob||!Zb||9<Zb}function be(a){a=(a||G()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1}function ce(a){a=a||k.window;try{a.close()}catch(b){}}
function de(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};c=G().toLowerCase();d&&(b.target=d,w(c,"crios/")&&(b.target="_blank"));$d(G())==ee&&(a=a||"http://localhost",b.scrollbars=!0);c=a||"";(a=b)||(a={});d=window;b=c instanceof zd?c:Dd("undefined"!=typeof c.href?c.href:String(c));c=a.target||c.target;e=[];
for(h in a)switch(h){case "width":case "height":case "top":case "left":e.push(h+"="+a[h]);break;case "target":case "noopener":case "noreferrer":break;default:e.push(h+"="+(a[h]?1:0))}var h=e.join(",");(x("iPhone")&&!x("iPod")&&!x("iPad")||x("iPad")||x("iPod"))&&d.navigator&&d.navigator.standalone&&c&&"_self"!=c?(h=d.document.createElement("A"),b instanceof zd||b instanceof zd||(b=b.ma?b.la():String(b),Cd.test(b)||(b="about:invalid#zClosurez"),b=Ed(b)),h.href=Bd(b),h.setAttribute("target",c),a.noreferrer&&
h.setAttribute("rel","noreferrer"),a=document.createEvent("MouseEvent"),a.initMouseEvent("click",!0,!0,d,1),h.dispatchEvent(a),h={}):a.noreferrer?(h=d.open("",c,h),a=Bd(b),h&&(Qb&&w(a,";")&&(a="'"+a.replace(/'/g,"%27")+"'"),h.opener=null,rd("b/12014412, meta tag with sanitized URL"),a='<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url='+Ma(a)+'">',a=Id(a),h.document.write(Hd(a)),h.document.close())):(h=d.open(Bd(b),c,h))&&a.noopener&&(h.opener=null);if(h)try{h.focus()}catch(m){}return h}
function fe(a){return new y(function(b){function c(){Hc(2E3).then(function(){if(!a||a.closed)b();else return c()})}return c()})}var ge=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;function he(){var a=null;return(new y(function(b){"complete"==k.document.readyState?b():(a=function(){b()},sc(window,"load",a))})).s(function(b){D(window,"load",a);throw b;})}
function ie(){return je(void 0)?he().then(function(){return new y(function(a,b){var c=k.document,d=setTimeout(function(){b(Error("Cordova framework is not ready."))},1E3);c.addEventListener("deviceready",function(){clearTimeout(d);a()},!1)})}):B(Error("Cordova must run in an Android or iOS file scheme."))}function je(a){a=a||G();return!("file:"!==ke()||!a.toLowerCase().match(/iphone|ipad|ipod|android/))}function le(){var a=k.window;try{return!(!a||a==a.top)}catch(b){return!1}}
function me(){return"object"!==typeof k.window&&"function"===typeof k.importScripts}function ne(){return firebase.INTERNAL.hasOwnProperty("reactNative")?"ReactNative":firebase.INTERNAL.hasOwnProperty("node")?"Node":me()?"Worker":"Browser"}function oe(){var a=ne();return"ReactNative"===a||"Node"===a}function pe(){for(var a=50,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")}var ee="Firefox",ae="Chrome";
function $d(a){var b=a.toLowerCase();if(w(b,"opera/")||w(b,"opr/")||w(b,"opios/"))return"Opera";if(w(b,"iemobile"))return"IEMobile";if(w(b,"msie")||w(b,"trident/"))return"IE";if(w(b,"edge/"))return"Edge";if(w(b,"firefox/"))return ee;if(w(b,"silk/"))return"Silk";if(w(b,"blackberry"))return"Blackberry";if(w(b,"webos"))return"Webos";if(!w(b,"safari/")||w(b,"chrome/")||w(b,"crios/")||w(b,"android"))if(!w(b,"chrome/")&&!w(b,"crios/")||w(b,"edge/")){if(w(b,"android"))return"Android";if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&
2==a.length)return a[1]}else return ae;else return"Safari";return"Other"}var qe={Sc:"FirebaseCore-web",Uc:"FirebaseUI-web"};function re(a,b){b=b||[];var c=[],d={},e;for(e in qe)d[qe[e]]=!0;for(e=0;e<b.length;e++)"undefined"!==typeof d[b[e]]&&(delete d[b[e]],c.push(b[e]));c.sort();b=c;b.length||(b=["FirebaseCore-web"]);c=ne();"Browser"===c?(d=G(),c=$d(d)):"Worker"===c&&(d=G(),c=$d(d)+"-"+c);return c+"/JsCore/"+a+"/"+b.join(",")}function G(){return k.navigator&&k.navigator.userAgent||""}
function H(a,b){a=a.split(".");b=b||k;for(var c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);return b}function se(){try{var a=k.localStorage,b=te();if(a)return a.setItem(b,"1"),a.removeItem(b),Vd()?!!k.indexedDB:!0}catch(c){return me()&&!!k.indexedDB}return!1}function ue(){return(ve()||"chrome-extension:"===ke()||je())&&!oe()&&se()&&!me()}function ve(){return"http:"===ke()||"https:"===ke()}function ke(){return k.location&&k.location.protocol||null}
function we(a){a=a||G();return be(a)||$d(a)==ee?!1:!0}function xe(a){return"undefined"===typeof a?null:Pd(a)}function ye(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b}function ze(a){if(null!==a)return JSON.parse(a)}function te(a){return a?a:Math.floor(1E9*Math.random()).toString()}function Ae(a){a=a||G();return"Safari"==$d(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0}
function Be(){var a=k.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null}function Ce(a,b){if(a>b)throw Error("Short delay should be less than long delay!");this.a=a;this.c=b;a=G();b=ne();this.b=be(a)||"ReactNative"===b}
Ce.prototype.get=function(){var a=k.navigator;return(a&&"boolean"===typeof a.onLine&&(ve()||"chrome-extension:"===ke()||"undefined"!==typeof a.connection)?a.onLine:1)?this.b?this.c:this.a:Math.min(5E3,this.a)};function De(){var a=k.document;return a&&"undefined"!==typeof a.visibilityState?"visible"==a.visibilityState:!0}
function Ee(){var a=k.document,b=null;return De()||!a?A():(new y(function(c){b=function(){De()&&(a.removeEventListener("visibilitychange",b,!1),c())};a.addEventListener("visibilitychange",b,!1)})).s(function(c){a.removeEventListener("visibilitychange",b,!1);throw c;})}function Fe(a){try{var b=new Date(parseInt(a,10));if(!isNaN(b.getTime())&&!/[^0-9]/.test(a))return b.toUTCString()}catch(c){}return null}function Ge(){return!(!H("fireauth.oauthhelper",k)&&!H("fireauth.iframe",k))};var He={};function Ie(a){He[a]||(He[a]=!0,"undefined"!==typeof console&&"function"===typeof console.warn&&console.warn(a))};var Je;try{var Ke={};Object.defineProperty(Ke,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Ke,"abcd",{configurable:!0,enumerable:!0,value:2});Je=2==Ke.abcd}catch(a){Je=!1}function I(a,b,c){Je?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c}function J(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&I(a,c,b[c])}function Le(a){var b={};J(b,a);return b}function Me(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}
function Ne(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0}function Oe(a){var b=a;if("object"==typeof a&&null!=a){b="length"in a?[]:{};for(var c in a)I(b,c,Oe(a[c]))}return b};function Pe(a){var b={},c=a[Qe],d=a[Re];a=a[Se];if(!a||a!=Te&&!c)throw Error("Invalid provider user info!");b[Ue]=d||null;b[Ve]=c||null;I(this,We,a);I(this,Xe,Oe(b))}var Te="EMAIL_SIGNIN",Qe="email",Re="newEmail",Se="requestType",Ve="email",Ue="fromEmail",Xe="data",We="operation";function K(a,b){this.code=Ye+a;this.message=b||Ze[a]||""}t(K,Error);K.prototype.D=function(){return{code:this.code,message:this.message}};K.prototype.toJSON=function(){return this.D()};function $e(a){var b=a&&a.code;return b?new K(b.substring(Ye.length),a.message):null}
var Ye="auth/",Ze={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
"code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
"dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
"invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal error has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
"invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.",
"invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
"invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
"invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.",
"auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal error has occurred.",
"missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
"network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
"operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.",
"quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.",
"unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.",
"user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled."};function af(a){var b=a[bf];if("undefined"===typeof b)throw new K("missing-continue-uri");if("string"!==typeof b||"string"===typeof b&&!b.length)throw new K("invalid-continue-uri");this.h=b;this.b=this.a=null;this.g=!1;var c=a[cf];if(c&&"object"===typeof c){b=c[df];var d=c[ef];c=c[ff];if("string"===typeof b&&b.length){this.a=b;if("undefined"!==typeof d&&"boolean"!==typeof d)throw new K("argument-error",ef+" property must be a boolean when specified.");this.g=!!d;if("undefined"!==typeof c&&("string"!==
typeof c||"string"===typeof c&&!c.length))throw new K("argument-error",ff+" property must be a non empty string when specified.");this.b=c||null}else{if("undefined"!==typeof b)throw new K("argument-error",df+" property must be a non empty string when specified.");if("undefined"!==typeof d||"undefined"!==typeof c)throw new K("missing-android-pkg-name");}}else if("undefined"!==typeof c)throw new K("argument-error",cf+" property must be a non null object when specified.");this.f=null;if((b=a[gf])&&"object"===
typeof b)if(b=b[hf],"string"===typeof b&&b.length)this.f=b;else{if("undefined"!==typeof b)throw new K("argument-error",hf+" property must be a non empty string when specified.");}else if("undefined"!==typeof b)throw new K("argument-error",gf+" property must be a non null object when specified.");a=a[jf];if("undefined"!==typeof a&&"boolean"!==typeof a)throw new K("argument-error",jf+" property must be a boolean when specified.");this.c=!!a}
var cf="android",jf="handleCodeInApp",gf="iOS",bf="url",ef="installApp",ff="minimumVersion",df="packageName",hf="bundleId";function kf(a){var b={};b.continueUrl=a.h;b.canHandleCodeInApp=a.c;if(b.androidPackageName=a.a)b.androidMinimumVersion=a.b,b.androidInstallApp=a.g;b.iOSBundleId=a.f;for(var c in b)null===b[c]&&delete b[c];return b};function lf(a){return Ba(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};var mf=null,nf=null;function of(a){var b="";pf(a,function(a){b+=String.fromCharCode(a)});return b}function pf(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=nf[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}qf();for(var d=0;;){var e=c(-1),f=c(0),h=c(64),m=c(64);if(64===m&&-1===e)break;b(e<<2|f>>4);64!=h&&(b(f<<4&240|h>>2),64!=m&&b(h<<6&192|m))}}
function qf(){if(!mf){mf={};nf={};for(var a=0;65>a;a++)mf[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),nf[mf[a]]=a,62<=a&&(nf["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};function rf(a){this.c=a.sub;na();this.a=a.provider_id||a.firebase&&a.firebase.sign_in_provider||null;this.b=!!a.is_anonymous||"anonymous"==this.a}rf.prototype.f=function(){return this.b};function sf(a){return(a=tf(a))&&a.sub&&a.iss&&a.aud&&a.exp?new rf(a):null}function tf(a){if(!a)return null;a=a.split(".");if(3!=a.length)return null;a=a[1];for(var b=(4-a.length%4)%4,c=0;c<b;c++)a+=".";try{return JSON.parse(of(a))}catch(d){}return null};var uf="oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),vf=["client_id","response_type","scope","redirect_uri","state"],wf={Tc:{Ma:"locale",Ba:500,Aa:600,Na:"facebook.com",eb:vf},Vc:{Ma:null,Ba:500,Aa:620,Na:"github.com",eb:vf},Wc:{Ma:"hl",Ba:515,Aa:680,Na:"google.com",eb:vf},bd:{Ma:"lang",Ba:485,Aa:705,Na:"twitter.com",eb:uf}};function xf(a){for(var b in wf)if(wf[b].Na==a)return wf[b];return null};function yf(a){var b={};b["facebook.com"]=zf;b["google.com"]=Af;b["github.com"]=Bf;b["twitter.com"]=Cf;var c=a&&a[Df];try{if(c)return b[c]?new b[c](a):new Ef(a);if("undefined"!==typeof a[Ff])return new Gf(a)}catch(d){}return null}var Ff="idToken",Df="providerId";
function Gf(a){var b=a[Df];if(!b&&a[Ff]){var c=sf(a[Ff]);c&&c.a&&(b=c.a)}if(!b)throw Error("Invalid additional user info!");if("anonymous"==b||"custom"==b)b=null;c=!1;"undefined"!==typeof a.isNewUser?c=!!a.isNewUser:"identitytoolkit#SignupNewUserResponse"===a.kind&&(c=!0);I(this,"providerId",b);I(this,"isNewUser",c)}function Ef(a){Gf.call(this,a);a=ze(a.rawUserInfo||"{}");I(this,"profile",Oe(a||{}))}t(Ef,Gf);
function zf(a){Ef.call(this,a);if("facebook.com"!=this.providerId)throw Error("Invalid provider ID!");}t(zf,Ef);function Bf(a){Ef.call(this,a);if("github.com"!=this.providerId)throw Error("Invalid provider ID!");I(this,"username",this.profile&&this.profile.login||null)}t(Bf,Ef);function Af(a){Ef.call(this,a);if("google.com"!=this.providerId)throw Error("Invalid provider ID!");}t(Af,Ef);
function Cf(a){Ef.call(this,a);if("twitter.com"!=this.providerId)throw Error("Invalid provider ID!");I(this,"username",a.screenName||null)}t(Cf,Ef);function Hf(a){this.a=ed(a)};function If(a){var b=ed(a),c=dd(b,"link"),d=dd(ed(c),"link");b=dd(b,"deep_link_id");return dd(ed(b),"link")||b||d||c||a};function Jf(a,b){return a.then(function(a){if(a[L]){var c=sf(a[L]);if(!c||b!=c.c)throw new K("user-mismatch");return a}throw new K("user-mismatch");}).s(function(a){throw a&&a.code&&a.code==Ye+"user-not-found"?new K("user-mismatch"):a;})}
function Kf(a,b,c){if(b.idToken||b.accessToken)b.idToken&&I(this,"idToken",b.idToken),b.accessToken&&I(this,"accessToken",b.accessToken);else if(b.oauthToken&&b.oauthTokenSecret)I(this,"accessToken",b.oauthToken),I(this,"secret",b.oauthTokenSecret);else throw new K("internal-error","failed to construct a credential");I(this,"providerId",a);I(this,"signInMethod",c)}Kf.prototype.ya=function(a){return Lf(a,Mf(this))};Kf.prototype.c=function(a,b){var c=Mf(this);c.idToken=b;return Nf(a,c)};
Kf.prototype.f=function(a,b){var c=Mf(this);return Jf(Of(a,c),b)};function Mf(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.providerId;return{postBody:id(b).toString(),requestUri:"http://localhost"}}
Kf.prototype.D=function(){var a={providerId:this.providerId,signInMethod:this.signInMethod};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};function Pf(a,b){this.Ac=b||[];J(this,{providerId:a,isOAuthProvider:!0});this.vb={};this.$a=(xf(a)||{}).Ma||null;this.Ya=null}Pf.prototype.Da=function(a){this.vb=$a(a);return this};function M(a){Pf.call(this,a,vf);this.a=[]}t(M,Pf);
M.prototype.ta=function(a){Fa(this.a,a)||this.a.push(a);return this};M.prototype.Ab=function(){return Ja(this.a)};M.prototype.credential=function(a,b){if(!a&&!b)throw new K("argument-error","credential failed: must provide the ID token and/or the access token.");return new Kf(this.providerId,{idToken:a||null,accessToken:b||null},this.providerId)};function Qf(){M.call(this,"facebook.com")}t(Qf,M);I(Qf,"PROVIDER_ID","facebook.com");I(Qf,"FACEBOOK_SIGN_IN_METHOD","facebook.com");
function Rf(a){if(!a)throw new K("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;q(a)&&(b=a.accessToken);return(new Qf).credential(null,b)}function Sf(){M.call(this,"github.com")}t(Sf,M);I(Sf,"PROVIDER_ID","github.com");I(Sf,"GITHUB_SIGN_IN_METHOD","github.com");function Tf(a){if(!a)throw new K("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;q(a)&&(b=a.accessToken);return(new Sf).credential(null,b)}
function Uf(){M.call(this,"google.com");this.ta("profile")}t(Uf,M);I(Uf,"PROVIDER_ID","google.com");I(Uf,"GOOGLE_SIGN_IN_METHOD","google.com");function Vf(a,b){var c=a;q(a)&&(c=a.idToken,b=a.accessToken);return(new Uf).credential(c,b)}function Wf(){Pf.call(this,"twitter.com",uf)}t(Wf,Pf);I(Wf,"PROVIDER_ID","twitter.com");I(Wf,"TWITTER_SIGN_IN_METHOD","twitter.com");
function Xf(a,b){var c=a;q(c)||(c={oauthToken:a,oauthTokenSecret:b});if(!c.oauthToken||!c.oauthTokenSecret)throw new K("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");return new Kf("twitter.com",c,"twitter.com")}function Yf(a,b,c){this.a=a;this.b=b;I(this,"providerId","password");I(this,"signInMethod",c===N.EMAIL_LINK_SIGN_IN_METHOD?N.EMAIL_LINK_SIGN_IN_METHOD:N.EMAIL_PASSWORD_SIGN_IN_METHOD)}
Yf.prototype.ya=function(a){return this.signInMethod==N.EMAIL_LINK_SIGN_IN_METHOD?O(a,Zf,{email:this.a,oobCode:this.b}):O(a,$f,{email:this.a,password:this.b})};Yf.prototype.c=function(a,b){return this.signInMethod==N.EMAIL_LINK_SIGN_IN_METHOD?O(a,ag,{idToken:b,email:this.a,oobCode:this.b}):O(a,bg,{idToken:b,email:this.a,password:this.b})};Yf.prototype.f=function(a,b){return Jf(this.ya(a),b)};Yf.prototype.D=function(){return{email:this.a,password:this.b,signInMethod:this.signInMethod}};
function N(){J(this,{providerId:"password",isOAuthProvider:!1})}function cg(a,b){b=dg(b);if(!b)throw new K("argument-error","Invalid email link!");return new Yf(a,b,N.EMAIL_LINK_SIGN_IN_METHOD)}function dg(a){a=If(a);a=new Hf(a);var b=dd(a.a,"oobCode")||null;return"signIn"===(dd(a.a,"mode")||null)&&b?b:null}J(N,{PROVIDER_ID:"password"});J(N,{EMAIL_LINK_SIGN_IN_METHOD:"emailLink"});J(N,{EMAIL_PASSWORD_SIGN_IN_METHOD:"password"});
function eg(a){if(!(a.Sa&&a.Ra||a.Fa&&a.$))throw new K("internal-error");this.a=a;I(this,"providerId","phone");I(this,"signInMethod","phone")}eg.prototype.ya=function(a){return a.Ta(fg(this))};eg.prototype.c=function(a,b){var c=fg(this);c.idToken=b;return O(a,gg,c)};eg.prototype.f=function(a,b){var c=fg(this);c.operation="REAUTH";a=O(a,hg,c);return Jf(a,b)};
eg.prototype.D=function(){var a={providerId:"phone"};this.a.Sa&&(a.verificationId=this.a.Sa);this.a.Ra&&(a.verificationCode=this.a.Ra);this.a.Fa&&(a.temporaryProof=this.a.Fa);this.a.$&&(a.phoneNumber=this.a.$);return a};function fg(a){return a.a.Fa&&a.a.$?{temporaryProof:a.a.Fa,phoneNumber:a.a.$}:{sessionInfo:a.a.Sa,code:a.a.Ra}}
function ig(a){try{this.a=a||firebase.auth()}catch(b){throw new K("argument-error","Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");}J(this,{providerId:"phone",isOAuthProvider:!1})}
ig.prototype.Ta=function(a,b){var c=this.a.b;return A(b.verify()).then(function(d){if(!l(d))throw new K("argument-error","An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");switch(b.type){case "recaptcha":return jg(c,{phoneNumber:a,recaptchaToken:d}).then(function(a){"function"===typeof b.reset&&b.reset();return a},function(a){"function"===typeof b.reset&&b.reset();throw a;});default:throw new K("argument-error",
'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');}})};function kg(a,b){if(!a)throw new K("missing-verification-id");if(!b)throw new K("missing-verification-code");return new eg({Sa:a,Ra:b})}J(ig,{PROVIDER_ID:"phone"});J(ig,{PHONE_SIGN_IN_METHOD:"phone"});
function lg(a){if(a.temporaryProof&&a.phoneNumber)return new eg({Fa:a.temporaryProof,$:a.phoneNumber});var b=a&&a.providerId;if(!b||"password"===b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;try{switch(b){case "google.com":return Vf(a,c);case "facebook.com":return Rf(c);case "github.com":return Tf(c);case "twitter.com":return Xf(c,d);default:return(new M(b)).credential(a,c)}}catch(e){return null}}
function mg(a){if(!a.isOAuthProvider)throw new K("invalid-oauth-provider");};function ng(a,b,c,d,e){this.b=a;this.c=b||null;this.f=c||null;this.g=d||null;this.a=e||null;if(this.f||this.a){if(this.f&&this.a)throw new K("invalid-auth-event");if(this.f&&!this.g)throw new K("invalid-auth-event");}else throw new K("invalid-auth-event");}ng.prototype.D=function(){return{type:this.b,eventId:this.c,urlResponse:this.f,sessionId:this.g,error:this.a&&this.a.D()}};function og(a){a=a||{};return a.type?new ng(a.type,a.eventId,a.urlResponse,a.sessionId,a.error&&$e(a.error)):null};function pg(){this.b=null;this.a=[]}var qg=null;pg.prototype.subscribe=function(a){var b=this;this.a.push(a);this.b||(this.b=function(a){for(var c=0;c<b.a.length;c++)b.a[c](a)},a=H("universalLinks.subscribe",k),"function"===typeof a&&a(null,this.b))};pg.prototype.unsubscribe=function(a){Ha(this.a,function(b){return b==a})};function rg(a){var b="unauthorized-domain",c=void 0,d=ed(a);a=d.b;d=d.c;"chrome-extension"==d?c=Ka("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):"http"==d||"https"==d?c=Ka("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):b="operation-not-supported-in-this-environment";
K.call(this,b,c)}t(rg,K);function sg(a,b,c){K.call(this,a,c);a=b||{};a.wb&&I(this,"email",a.wb);a.$&&I(this,"phoneNumber",a.$);a.credential&&I(this,"credential",a.credential)}t(sg,K);sg.prototype.D=function(){var a={code:this.code,message:this.message};this.email&&(a.email=this.email);this.phoneNumber&&(a.phoneNumber=this.phoneNumber);var b=this.credential&&this.credential.D();b&&bb(a,b);return a};sg.prototype.toJSON=function(){return this.D()};
function tg(a){if(a.code){var b=a.code||"";0==b.indexOf(Ye)&&(b=b.substring(Ye.length));var c={credential:lg(a)};if(a.email)c.wb=a.email;else if(a.phoneNumber)c.$=a.phoneNumber;else return new K(b,a.message||void 0);return new sg(b,c,a.message)}return null};var ug=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;function vg(){}vg.prototype.c=null;function wg(a){return a.c||(a.c=a.b())};var xg;function yg(){}t(yg,vg);yg.prototype.a=function(){var a=zg(this);return a?new ActiveXObject(a):new XMLHttpRequest};yg.prototype.b=function(){var a={};zg(this)&&(a[0]=!0,a[1]=!0);return a};
function zg(a){if(!a.f&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.f=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.f}xg=new yg;function Ag(){}t(Ag,vg);Ag.prototype.a=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new Bg;throw Error("Unsupported browser");};Ag.prototype.b=function(){return{}};
function Bg(){this.a=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText="";this.a.onload=r(this.bc,this);this.a.onerror=r(this.Bb,this);this.a.onprogress=r(this.cc,this);this.a.ontimeout=r(this.fc,this)}g=Bg.prototype;g.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.a.open(a,b)};
g.send=function(a){if(a)if("string"==typeof a)this.a.send(a);else throw Error("Only string data is supported");else this.a.send()};g.abort=function(){this.a.abort()};g.setRequestHeader=function(){};g.getResponseHeader=function(a){return"content-type"==a.toLowerCase()?this.a.contentType:""};g.bc=function(){this.status=200;this.responseText=this.a.responseText;Cg(this,4)};g.Bb=function(){this.status=500;this.responseText="";Cg(this,4)};g.fc=function(){this.Bb()};
g.cc=function(){this.status=200;Cg(this,1)};function Cg(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()}g.getAllResponseHeaders=function(){return"content-type: "+this.a.contentType};function Dg(a,b,c){this.reset(a,b,c,void 0,void 0)}Dg.prototype.a=null;var Eg=0;Dg.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Eg++;d||na();delete this.a};function Fg(a){this.f=a;this.b=this.c=this.a=null}function Gg(a,b){this.name=a;this.value=b}Gg.prototype.toString=function(){return this.name};var Hg=new Gg("SEVERE",1E3),Ig=new Gg("WARNING",900),Jg=new Gg("CONFIG",700),Kg=new Gg("FINE",500);function Lg(a){if(a.c)return a.c;if(a.a)return Lg(a.a);ra("Root logger has no level set.");return null}Fg.prototype.log=function(a,b,c){if(a.value>=Lg(this).value)for(n(b)&&(b=b()),a=new Dg(a,String(b),this.f),c&&(a.a=c),c=this;c;)c=c.a};var Mg={},Ng=null;
function Og(a){Ng||(Ng=new Fg(""),Mg[""]=Ng,Ng.c=Jg);var b;if(!(b=Mg[a])){b=new Fg(a);var c=a.lastIndexOf("."),d=a.substr(c+1);c=Og(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;Mg[a]=b}return b};function P(a,b){a&&a.log(Kg,b,void 0)};function Pg(a){this.f=a}t(Pg,vg);Pg.prototype.a=function(){return new Qg(this.f)};Pg.prototype.b=function(a){return function(){return a}}({});function Qg(a){E.call(this);this.i=a;this.readyState=Rg;this.status=0;this.responseText=this.statusText="";this.onreadystatechange=null;this.g=new Headers;this.b=null;this.h="GET";this.c="";this.a=!1;this.f=Og("goog.net.FetchXmlHttp")}t(Qg,E);var Rg=0;g=Qg.prototype;
g.open=function(a,b){if(this.readyState!=Rg)throw this.abort(),Error("Error reopening a connection");this.h=a;this.c=b;this.readyState=1;Sg(this)};g.send=function(a){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.a=!0;var b={headers:this.g,method:this.h,credentials:void 0,cache:void 0};a&&(b.body=a);this.i.fetch(new Request(this.c,b)).then(this.ec.bind(this),this.Cb.bind(this))};
g.abort=function(){this.responseText="";this.g=new Headers;this.status=0;1<=this.readyState&&this.a&&4!=this.readyState&&(this.readyState=4,this.a=!1,Sg(this));this.readyState=Rg};g.ec=function(a){this.a&&(this.b||(this.b=a.headers,this.readyState=2,Sg(this)),this.a&&(this.readyState=3,Sg(this),this.a&&a.text().then(this.dc.bind(this,a),this.Cb.bind(this))))};g.dc=function(a,b){this.a&&(this.status=a.status,this.statusText=a.statusText,this.responseText=b,this.readyState=4,Sg(this))};
g.Cb=function(a){var b=this.f;b&&b.log(Ig,"Failed to fetch url "+this.c,a instanceof Error?a:Error(a));this.a&&(this.readyState=4,Sg(this))};g.setRequestHeader=function(a,b){this.g.append(a,b)};g.getResponseHeader=function(a){return this.b?this.b.get(a.toLowerCase())||"":((a=this.f)&&a.log(Ig,"Attempting to get response header but no headers have been received for url: "+this.c,void 0),"")};
g.getAllResponseHeaders=function(){if(!this.b){var a=this.f;a&&a.log(Ig,"Attempting to get all response headers but no headers have been received for url: "+this.c,void 0);return""}a=[];for(var b=this.b.entries(),c=b.next();!c.done;)c=c.value,a.push(c[0]+": "+c[1]),c=b.next();return a.join("\r\n")};function Sg(a){a.onreadystatechange&&a.onreadystatechange.call(a)};function Tg(a){E.call(this);this.headers=new Lc;this.C=a||null;this.c=!1;this.w=this.a=null;this.h=this.N=this.l="";this.f=this.I=this.i=this.G=!1;this.g=0;this.u=null;this.o=Ug;this.v=this.O=!1}t(Tg,E);var Ug="";Tg.prototype.b=Og("goog.net.XhrIo");var Vg=/^https?$/i,Wg=["POST","PUT"];
function Xg(a,b,c,d,e){if(a.a)throw Error("[goog.net.XhrIo] Object is active with another request="+a.l+"; newUri="+b);c=c?c.toUpperCase():"GET";a.l=b;a.h="";a.N=c;a.G=!1;a.c=!0;a.a=a.C?a.C.a():xg.a();a.w=a.C?wg(a.C):wg(xg);a.a.onreadystatechange=r(a.Fb,a);try{P(a.b,Yg(a,"Opening Xhr")),a.I=!0,a.a.open(c,String(b),!0),a.I=!1}catch(h){P(a.b,Yg(a,"Error opening Xhr: "+h.message));Zg(a,h);return}b=d||"";var f=new Lc(a.headers);e&&Kc(e,function(a,b){f.set(b,a)});e=Da(f.U());d=k.FormData&&b instanceof
k.FormData;!Fa(Wg,c)||e||d||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},a);a.o&&(a.a.responseType=a.o);"withCredentials"in a.a&&a.a.withCredentials!==a.O&&(a.a.withCredentials=a.O);try{$g(a),0<a.g&&(a.v=ah(a.a),P(a.b,Yg(a,"Will abort after "+a.g+"ms if incomplete, xhr2 "+a.v)),a.v?(a.a.timeout=a.g,a.a.ontimeout=r(a.Ga,a)):a.u=Gc(a.Ga,a.g,a)),P(a.b,Yg(a,"Sending request")),a.i=!0,a.a.send(b),a.i=!1}catch(h){P(a.b,Yg(a,
"Send error: "+h.message)),Zg(a,h)}}function ah(a){return Ob&&Yb(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Ea(a){return"content-type"==a.toLowerCase()}g=Tg.prototype;g.Ga=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.g+"ms, aborting",P(this.b,Yg(this,this.h)),this.dispatchEvent("timeout"),this.abort(8))};function Zg(a,b){a.c=!1;a.a&&(a.f=!0,a.a.abort(),a.f=!1);a.h=b;bh(a);ch(a)}
function bh(a){a.G||(a.G=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}g.abort=function(){this.a&&this.c&&(P(this.b,Yg(this,"Aborting")),this.c=!1,this.f=!0,this.a.abort(),this.f=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),ch(this))};g.ua=function(){this.a&&(this.c&&(this.c=!1,this.f=!0,this.a.abort(),this.f=!1),ch(this,!0));Tg.lb.ua.call(this)};g.Fb=function(){this.pa||(this.I||this.i||this.f?dh(this):this.tc())};g.tc=function(){dh(this)};
function dh(a){if(a.c&&"undefined"!=typeof aa)if(a.w[1]&&4==eh(a)&&2==fh(a))P(a.b,Yg(a,"Local request error detected and ignored"));else if(a.i&&4==eh(a))Gc(a.Fb,0,a);else if(a.dispatchEvent("readystatechange"),4==eh(a)){P(a.b,Yg(a,"Request complete"));a.c=!1;try{var b=fh(a);a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.l).match(Oc)[1]||null;if(!f&&k.self&&k.self.location){var h=k.self.location.protocol;
f=h.substr(0,h.length-1)}e=!Vg.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{try{var m=2<eh(a)?a.a.statusText:""}catch(p){P(a.b,"Can not get status: "+p.message),m=""}a.h=m+" ["+fh(a)+"]";bh(a)}}finally{ch(a)}}}function ch(a,b){if(a.a){$g(a);var c=a.a,d=a.w[0]?ca:null;a.a=null;a.w=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.b)&&a.log(Hg,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}}
function $g(a){a.a&&a.v&&(a.a.ontimeout=null);a.u&&(k.clearTimeout(a.u),a.u=null)}function eh(a){return a.a?a.a.readyState:0}function fh(a){try{return 2<eh(a)?a.a.status:-1}catch(b){return-1}}function gh(a){try{return a.a?a.a.responseText:""}catch(b){return P(a.b,"Can not get responseText: "+b.message),""}}
g.getResponse=function(){try{if(!this.a)return null;if("response"in this.a)return this.a.response;switch(this.o){case Ug:case "text":return this.a.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in this.a)return this.a.mozResponseArrayBuffer}var a=this.b;a&&a.log(Hg,"Response type "+this.o+" is not supported on this browser",void 0);return null}catch(b){return P(this.b,"Can not get response: "+b.message),null}};function Yg(a,b){return b+" ["+a.N+" "+a.l+" "+fh(a)+"]"};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function hh(a,b){this.g=[];this.v=a;this.u=b||null;this.f=this.a=!1;this.c=void 0;this.l=this.w=this.i=!1;this.h=0;this.b=null;this.m=0}hh.prototype.cancel=function(a){if(this.a)this.c instanceof hh&&this.c.cancel();else{if(this.b){var b=this.b;delete this.b;a?b.cancel(a):(b.m--,0>=b.m&&b.cancel())}this.v?this.v.call(this.u,this):this.l=!0;this.a||(a=new ih(this),jh(this),kh(this,!1,a))}};hh.prototype.o=function(a,b){this.i=!1;kh(this,a,b)};function kh(a,b,c){a.a=!0;a.c=c;a.f=!b;lh(a)}
function jh(a){if(a.a){if(!a.l)throw new mh(a);a.l=!1}}hh.prototype.C=function(){jh(this);kh(this,!0,null)};function nh(a,b){oh(a,null,b,void 0)}function oh(a,b,c,d){a.g.push([b,c,d]);a.a&&lh(a)}hh.prototype.then=function(a,b,c){var d,e,f=new y(function(a,b){d=a;e=b});oh(this,d,function(a){a instanceof ih?f.cancel():e(a)});return f.then(a,b,c)};oa(hh);function ph(a){return Ca(a.g,function(a){return n(a[1])})}
function lh(a){if(a.h&&a.a&&ph(a)){var b=a.h,c=qh[b];c&&(k.clearTimeout(c.a),delete qh[b]);a.h=0}a.b&&(a.b.m--,delete a.b);b=a.c;for(var d=c=!1;a.g.length&&!a.i;){var e=a.g.shift(),f=e[0],h=e[1];e=e[2];if(f=a.f?h:f)try{var m=f.call(e||a.u,b);void 0!==m&&(a.f=a.f&&(m==b||m instanceof Error),a.c=b=m);if(pa(b)||"function"===typeof k.Promise&&b instanceof k.Promise)d=!0,a.i=!0}catch(p){b=p,a.f=!0,ph(a)||(c=!0)}}a.c=b;d&&(m=r(a.o,a,!0),d=r(a.o,a,!1),b instanceof hh?(oh(b,m,d),b.w=!0):b.then(m,d));c&&(b=
new rh(b),qh[b.a]=b,a.h=b.a)}function mh(){u.call(this)}t(mh,u);mh.prototype.message="Deferred has already fired";mh.prototype.name="AlreadyCalledError";function ih(){u.call(this)}t(ih,u);ih.prototype.message="Deferred was canceled";ih.prototype.name="CanceledError";function rh(a){this.a=k.setTimeout(r(this.c,this),0);this.b=a}rh.prototype.c=function(){delete qh[this.a];throw this.b;};var qh={};function sh(a){var b={},c=b.document||document,d=ud(a),e=document.createElement("SCRIPT"),f={Hb:e,Ga:void 0},h=new hh(th,f),m=null,p=null!=b.timeout?b.timeout:5E3;0<p&&(m=window.setTimeout(function(){uh(e,!0);var a=new vh(wh,"Timeout reached for loading script "+d);jh(h);kh(h,!1,a)},p),f.Ga=m);e.onload=e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(uh(e,b.dd||!1,m),h.C())};e.onerror=function(){uh(e,!0,m);var a=new vh(xh,"Error while loading script "+
d);jh(h);kh(h,!1,a)};f=b.attributes||{};bb(f,{type:"text/javascript",charset:"UTF-8"});Kd(e,f);e.src=ud(a);yh(c).appendChild(e);return h}function yh(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement}function th(){if(this&&this.Hb){var a=this.Hb;a&&"SCRIPT"==a.tagName&&uh(a,!0,this.Ga)}}
function uh(a,b,c){null!=c&&k.clearTimeout(c);a.onload=ca;a.onerror=ca;a.onreadystatechange=ca;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)}var xh=0,wh=1;function vh(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a}t(vh,u);function zh(a){this.f=a}t(zh,vg);zh.prototype.a=function(){return new this.f};zh.prototype.b=function(){return{}};
function Ah(a,b,c){this.b=a;a=b||{};this.i=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.m=a.secureTokenTimeout||Bh;this.f=$a(a.secureTokenHeaders||Ch);this.g=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.h=a.firebaseTimeout||Dh;this.a=$a(a.firebaseHeaders||Eh);c&&(this.a["X-Client-Version"]=c,this.f["X-Client-Version"]=c);c="Node"==ne();c=k.XMLHttpRequest||c&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!c&&
!me())throw new K("internal-error","The XMLHttpRequest compatibility library was not found.");this.c=void 0;me()?this.c=new Pg(self):oe()?this.c=new zh(c):this.c=new Ag}var Fh,L="idToken",Bh=new Ce(3E4,6E4),Ch={"Content-Type":"application/x-www-form-urlencoded"},Dh=new Ce(3E4,6E4),Eh={"Content-Type":"application/json"};function Gh(a,b){b?a.a["X-Firebase-Locale"]=b:delete a.a["X-Firebase-Locale"]}
function Hh(a,b){b?(a.a["X-Client-Version"]=b,a.f["X-Client-Version"]=b):(delete a.a["X-Client-Version"],delete a.f["X-Client-Version"])}function Ih(a,b,c,d,e,f,h){Zd()||me()?a=r(a.o,a):(Fh||(Fh=new y(function(a,b){Jh(a,b)})),a=r(a.l,a));a(b,c,d,e,f,h)}
Ah.prototype.o=function(a,b,c,d,e,f){if(me()&&("undefined"===typeof k.fetch||"undefined"===typeof k.Headers||"undefined"===typeof k.Request))throw new K("operation-not-supported-in-this-environment","fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.");var h=new Tg(this.c);if(f){h.g=Math.max(0,f);var m=setTimeout(function(){h.dispatchEvent("timeout")},f)}uc(h,"complete",function(){m&&clearTimeout(m);var a=null;try{a=
JSON.parse(gh(this))||null}catch(z){a=null}b&&b(a)});Ac(h,"ready",function(){m&&clearTimeout(m);Jb(this)});Ac(h,"timeout",function(){m&&clearTimeout(m);Jb(this);b&&b(null)});Xg(h,a,c,d,e)};var Kh=rd("https://apis.google.com/js/client.js?onload=%{onload}"),Lh="__fcb"+Math.floor(1E6*Math.random()).toString();
function Jh(a,b){if(((window.gapi||{}).client||{}).request)a();else{k[Lh]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))};var c=vd(Kh,{onload:Lh});nh(sh(c),function(){b(Error("CORS_UNSUPPORTED"))})}}
Ah.prototype.l=function(a,b,c,d,e){var f=this;Fh.then(function(){window.gapi.client.setApiKey(f.b);var h=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(h);b&&b(a)}})}).s(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
function Mh(a,b){return new y(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?Ih(a,a.i+"?key="+encodeURIComponent(a.b),function(a){a?a.error?d(Nh(a)):a.access_token&&a.refresh_token?c(a):d(new K("internal-error")):d(new K("network-request-failed"))},"POST",id(b).toString(),a.f,a.m.get()):d(new K("internal-error"))})}
function Oh(a,b,c,d,e,f){var h=ed(a.g+b);F(h,"key",a.b);f&&F(h,"cb",na().toString());var m="GET"==c;if(m)for(var p in d)d.hasOwnProperty(p)&&F(h,p,d[p]);return new y(function(b,f){Ih(a,h.toString(),function(a){a?a.error?f(Nh(a,e||{})):b(a):f(new K("network-request-failed"))},c,m?void 0:Pd(ye(d)),a.a,a.h.get())})}function Ph(a){if(!ug.test(a.email))throw new K("invalid-email");}function Qh(a){"email"in a&&Ph(a)}
function Rh(a,b){return O(a,Sh,{identifier:b,continueUri:ve()?Wd():"http://localhost"}).then(function(a){return a.allProviders||[]})}function Th(a,b){return O(a,Sh,{identifier:b,continueUri:ve()?Wd():"http://localhost"}).then(function(a){return a.signinMethods||[]})}function Uh(a){return O(a,Vh,{}).then(function(a){return a.authorizedDomains||[]})}function Wh(a){if(!a[L])throw new K("internal-error");}
function Xh(a){if(a.phoneNumber||a.temporaryProof){if(!a.phoneNumber||!a.temporaryProof)throw new K("internal-error");}else{if(!a.sessionInfo)throw new K("missing-verification-id");if(!a.code)throw new K("missing-verification-code");}}Ah.prototype.Pa=function(){return O(this,Yh,{})};Ah.prototype.mb=function(a,b){return O(this,Zh,{idToken:a,email:b})};Ah.prototype.nb=function(a,b){return O(this,bg,{idToken:a,password:b})};var $h={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};g=Ah.prototype;
g.ob=function(a,b){var c={idToken:a},d=[];Ya($h,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return O(this,Zh,c)};g.hb=function(a,b){a={requestType:"PASSWORD_RESET",email:a};bb(a,b);return O(this,ai,a)};g.ib=function(a,b){a={requestType:"EMAIL_SIGNIN",email:a};bb(a,b);return O(this,bi,a)};g.gb=function(a,b){a={requestType:"VERIFY_EMAIL",idToken:a};bb(a,b);return O(this,ci,a)};function jg(a,b){return O(a,di,b)}g.Ta=function(a){return O(this,ei,a)};
function fi(a,b,c){return O(a,gi,{idToken:b,deleteProvider:c})}function hi(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new K("internal-error");}
function ii(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=tg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=tg(a)):"EMAIL_EXISTS"==a.errorMessage?(a.code="email-already-in-use",b=tg(a)):a.errorMessage&&(b=ji(a.errorMessage));if(b)throw b;if(!a[L])throw new K("internal-error");}function Lf(a,b){b.returnIdpCredential=!0;return O(a,ki,b)}function Nf(a,b){b.returnIdpCredential=!0;return O(a,li,b)}
function Of(a,b){b.returnIdpCredential=!0;b.autoCreate=!1;return O(a,mi,b)}function ni(a){if(!a.oobCode)throw new K("invalid-action-code");}g.Xa=function(a,b){return O(this,oi,{oobCode:a,newPassword:b})};g.Ja=function(a){return O(this,pi,{oobCode:a})};g.Va=function(a){return O(this,qi,{oobCode:a})};
var qi={endpoint:"setAccountInfo",B:ni,da:"email"},pi={endpoint:"resetPassword",B:ni,J:function(a){var b=a.requestType;if(!b||!a.email&&"EMAIL_SIGNIN"!=b)throw new K("internal-error");}},ri={endpoint:"signupNewUser",B:function(a){Ph(a);if(!a.password)throw new K("weak-password");},J:Wh,R:!0},Sh={endpoint:"createAuthUri"},si={endpoint:"deleteAccount",T:["idToken"]},gi={endpoint:"setAccountInfo",T:["idToken","deleteProvider"],B:function(a){if(!fa(a.deleteProvider))throw new K("internal-error");}},Zf=
{endpoint:"emailLinkSignin",T:["email","oobCode"],B:Ph,J:Wh,R:!0},ag={endpoint:"emailLinkSignin",T:["idToken","email","oobCode"],B:Ph,J:Wh,R:!0},ti={endpoint:"getAccountInfo"},bi={endpoint:"getOobConfirmationCode",T:["requestType"],B:function(a){if("EMAIL_SIGNIN"!=a.requestType)throw new K("internal-error");Ph(a)},da:"email"},ci={endpoint:"getOobConfirmationCode",T:["idToken","requestType"],B:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new K("internal-error");},da:"email"},ai={endpoint:"getOobConfirmationCode",
T:["requestType"],B:function(a){if("PASSWORD_RESET"!=a.requestType)throw new K("internal-error");Ph(a)},da:"email"},Vh={rb:!0,endpoint:"getProjectConfig",Eb:"GET"},ui={rb:!0,endpoint:"getRecaptchaParam",Eb:"GET",J:function(a){if(!a.recaptchaSiteKey)throw new K("internal-error");}},oi={endpoint:"resetPassword",B:ni,da:"email"},di={endpoint:"sendVerificationCode",T:["phoneNumber","recaptchaToken"],da:"sessionInfo"},Zh={endpoint:"setAccountInfo",T:["idToken"],B:Qh,R:!0},bg={endpoint:"setAccountInfo",
T:["idToken"],B:function(a){Qh(a);if(!a.password)throw new K("weak-password");},J:Wh,R:!0},Yh={endpoint:"signupNewUser",J:Wh,R:!0},ki={endpoint:"verifyAssertion",B:hi,J:ii,R:!0},mi={endpoint:"verifyAssertion",B:hi,J:function(a){if(a.errorMessage&&"USER_NOT_FOUND"==a.errorMessage)throw new K("user-not-found");if(a.errorMessage)throw ji(a.errorMessage);if(!a[L])throw new K("internal-error");},R:!0},li={endpoint:"verifyAssertion",B:function(a){hi(a);if(!a.idToken)throw new K("internal-error");},J:ii,
R:!0},vi={endpoint:"verifyCustomToken",B:function(a){if(!a.token)throw new K("invalid-custom-token");},J:Wh,R:!0},$f={endpoint:"verifyPassword",B:function(a){Ph(a);if(!a.password)throw new K("wrong-password");},J:Wh,R:!0},ei={endpoint:"verifyPhoneNumber",B:Xh,J:Wh},gg={endpoint:"verifyPhoneNumber",B:function(a){if(!a.idToken)throw new K("internal-error");Xh(a)},J:function(a){if(a.temporaryProof)throw a.code="credential-already-in-use",tg(a);Wh(a)}},hg={Tb:{USER_NOT_FOUND:"user-not-found"},endpoint:"verifyPhoneNumber",
B:Xh,J:Wh};function O(a,b,c){if(!Ne(c,b.T))return B(new K("internal-error"));var d=b.Eb||"POST",e;return A(c).then(b.B).then(function(){b.R&&(c.returnSecureToken=!0);return Oh(a,b.endpoint,d,c,b.Tb,b.rb||!1)}).then(function(a){return e=a}).then(b.J).then(function(){if(!b.da)return e;if(!(b.da in e))throw new K("internal-error");return e[b.da]})}function ji(a){return Nh({error:{errors:[{message:a}],code:400,message:a}})}
function Nh(a,b){var c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?new K(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",
MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",INVALID_MESSAGE_PAYLOAD:"invalid-message-payload",INVALID_RECIPIENT_EMAIL:"invalid-recipient-email",INVALID_SENDER:"invalid-sender",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",
INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported",DYNAMIC_LINK_NOT_ACTIVATED:"dynamic-link-not-activated",INVALID_APP_ID:"invalid-app-id",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",USER_CANCELLED:"user-cancelled",CAPTCHA_CHECK_FAILED:"captcha-check-failed",INVALID_APP_CREDENTIAL:"invalid-app-credential",INVALID_CODE:"invalid-verification-code",
INVALID_PHONE_NUMBER:"invalid-phone-number",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_APP_CREDENTIAL:"missing-app-credential",MISSING_CODE:"missing-verification-code",MISSING_PHONE_NUMBER:"missing-phone-number",MISSING_SESSION_INFO:"missing-verification-id",QUOTA_EXCEEDED:"quota-exceeded",SESSION_EXPIRED:"code-expired",INVALID_CONTINUE_URI:"invalid-continue-uri",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",MISSING_IOS_BUNDLE_ID:"missing-ios-bundle-id",
UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",INVALID_CERT_HASH:"invalid-cert-hash"};bb(d,b||{});b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new K(d[e],b);!b&&a&&(b=xe(a));return new K("internal-error",b)};var wi={Yc:{Za:"https://www.googleapis.com/identitytoolkit/v3/relyingparty/",fb:"https://securetoken.googleapis.com/v1/token",id:"p"},$c:{Za:"https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",fb:"https://staging-securetoken.sandbox.googleapis.com/v1/token",id:"s"},ad:{Za:"https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",fb:"https://test-securetoken.sandbox.googleapis.com/v1/token",id:"t"}};
function xi(a){for(var b in wi)if(wi[b].id===a)return a=wi[b],{firebaseEndpoint:a.Za,secureTokenEndpoint:a.fb};return null}var yi;yi=xi("__EID__")?"__EID__":void 0;function zi(a){this.b=a;this.a=null;this.bb=Ai(this)}
function Ai(a){return Bi().then(function(){return new y(function(b,c){H("gapi.iframes.getContext")().open({where:document.body,url:a.b,messageHandlersFilter:H("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"),attributes:{style:{position:"absolute",top:"-100px",width:"1px",height:"1px"}},dontclear:!0},function(d){function e(){clearTimeout(f);b()}a.a=d;a.a.restyle({setHideOnLeave:!1});var f=setTimeout(function(){c(Error("Network Error"))},Ci.get());d.ping(e).then(e,function(){c(Error("Network Error"))})})})})}
function Di(a,b){return a.bb.then(function(){return new y(function(c){a.a.send(b.type,b,c,H("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})})}function Ei(a,b){a.bb.then(function(){a.a.register("authEvent",b,H("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})}var Fi=rd("https://apis.google.com/js/api.js?onload=%{onload}"),Gi=new Ce(3E4,6E4),Ci=new Ce(5E3,15E3),Hi=null;
function Bi(){return Hi?Hi:Hi=(new y(function(a,b){function c(){Be();H("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){Be();b(Error("Network Error"))},timeout:Gi.get()})}if(H("gapi.iframes.Iframe"))a();else if(H("gapi.load"))c();else{var d="__iframefcb"+Math.floor(1E6*Math.random()).toString();k[d]=function(){H("gapi.load")?c():b(Error("Network Error"))};d=vd(Fi,{onload:d});A(sh(d)).s(function(){b(Error("Network Error"))})}})).s(function(a){Hi=null;throw a;})};function Ii(a,b,c){this.i=a;this.g=b;this.h=c;this.f=null;this.a=fd(this.i,"/__/auth/iframe");F(this.a,"apiKey",this.g);F(this.a,"appName",this.h);this.b=null;this.c=[]}Ii.prototype.toString=function(){this.f?F(this.a,"v",this.f):ld(this.a.a,"v");this.b?F(this.a,"eid",this.b):ld(this.a.a,"eid");this.c.length?F(this.a,"fw",this.c.join(",")):ld(this.a.a,"fw");return this.a.toString()};function Ji(a,b,c,d,e){this.o=a;this.l=b;this.c=c;this.m=d;this.h=this.g=this.i=null;this.a=e;this.f=null}
Ji.prototype.toString=function(){var a=fd(this.o,"/__/auth/handler");F(a,"apiKey",this.l);F(a,"appName",this.c);F(a,"authType",this.m);if(this.a.isOAuthProvider){var b=this.a;try{var c=firebase.app(this.c).auth().ea()}catch(m){c=null}b.Ya=c;F(a,"providerId",this.a.providerId);b=this.a;c=ye(b.vb);for(var d in c)c[d]=c[d].toString();d=b.Ac;c=$a(c);for(var e=0;e<d.length;e++){var f=d[e];f in c&&delete c[f]}b.$a&&b.Ya&&!c[b.$a]&&(c[b.$a]=b.Ya);Za(c)||F(a,"customParameters",xe(c))}"function"===typeof this.a.Ab&&
(b=this.a.Ab(),b.length&&F(a,"scopes",b.join(",")));this.i?F(a,"redirectUrl",this.i):ld(a.a,"redirectUrl");this.g?F(a,"eventId",this.g):ld(a.a,"eventId");this.h?F(a,"v",this.h):ld(a.a,"v");if(this.b)for(var h in this.b)this.b.hasOwnProperty(h)&&!dd(a,h)&&F(a,h,this.b[h]);this.f?F(a,"eid",this.f):ld(a.a,"eid");h=Ki(this.c);h.length&&F(a,"fw",h.join(","));return a.toString()};function Ki(a){try{return firebase.app(a).auth().xa()}catch(b){return[]}}
function Li(a,b,c,d,e){this.l=a;this.f=b;this.b=c;this.c=d||null;this.h=e||null;this.o=this.u=this.v=null;this.g=[];this.m=this.a=null}
function Mi(a){var b=Wd();return Uh(a).then(function(a){a:{var c=ed(b),e=c.c;c=c.b;for(var f=0;f<a.length;f++){var h=a[f];var m=c;var p=e;0==h.indexOf("chrome-extension://")?m=ed(h).b==m&&"chrome-extension"==p:"http"!=p&&"https"!=p?m=!1:ge.test(h)?m=m==h:(h=h.split(".").join("\\."),m=(new RegExp("^(.+\\."+h+"|"+h+")$","i")).test(m));if(m){a=!0;break a}}a=!1}if(!a)throw new rg(Wd());})}
function Ni(a){if(a.m)return a.m;a.m=he().then(function(){if(!a.u){var b=a.c,c=a.h,d=Ki(a.b),e=new Ii(a.l,a.f,a.b);e.f=b;e.b=c;e.c=Ja(d||[]);a.u=e.toString()}a.i=new zi(a.u);Oi(a)});return a.m}g=Li.prototype;g.Ea=function(a,b,c){var d=new K("popup-closed-by-user"),e=new K("web-storage-unsupported"),f=this,h=!1;return this.ga().then(function(){Pi(f).then(function(c){c||(a&&ce(a),b(e),h=!0)})}).s(function(){}).then(function(){if(!h)return fe(a)}).then(function(){if(!h)return Hc(c).then(function(){b(d)})})};
g.Ib=function(){var a=G();return!we(a)&&!Ae(a)};g.Db=function(){return!1};
g.zb=function(a,b,c,d,e,f,h){if(!a)return B(new K("popup-blocked"));if(h&&!we())return this.ga().s(function(b){ce(a);e(b)}),d(),A();this.a||(this.a=Mi(Qi(this)));var m=this;return this.a.then(function(){var b=m.ga().s(function(b){ce(a);e(b);throw b;});d();return b}).then(function(){mg(c);if(!h){var d=Ri(m.l,m.f,m.b,b,c,null,f,m.c,void 0,m.h);Xd(d,a)}}).s(function(a){"auth/network-request-failed"==a.code&&(m.a=null);throw a;})};
function Qi(a){a.o||(a.v=a.c?re(a.c,Ki(a.b)):null,a.o=new Ah(a.f,xi(a.h),a.v));return a.o}g.Ca=function(a,b,c){this.a||(this.a=Mi(Qi(this)));var d=this;return this.a.then(function(){mg(b);var e=Ri(d.l,d.f,d.b,a,b,Wd(),c,d.c,void 0,d.h);Xd(e)}).s(function(a){"auth/network-request-failed"==a.code&&(d.a=null);throw a;})};g.ga=function(){var a=this;return Ni(this).then(function(){return a.i.bb}).s(function(){a.a=null;throw new K("network-request-failed");})};g.Mb=function(){return!0};
function Ri(a,b,c,d,e,f,h,m,p,z){a=new Ji(a,b,c,d,e);a.i=f;a.g=h;a.h=m;a.b=$a(p||null);a.f=z;return a.toString()}function Oi(a){if(!a.i)throw Error("IfcHandler must be initialized!");Ei(a.i,function(b){var c={};if(b&&b.authEvent){var d=!1;b=og(b.authEvent);for(c=0;c<a.g.length;c++)d=a.g[c](b)||d;c={};c.status=d?"ACK":"ERROR";return A(c)}c.status="ERROR";return A(c)})}
function Pi(a){var b={type:"webStorageSupport"};return Ni(a).then(function(){return Di(a.i,b)}).then(function(a){if(a&&a.length&&"undefined"!==typeof a[0].webStorageSupport)return a[0].webStorageSupport;throw Error();})}g.va=function(a){this.g.push(a)};g.Ka=function(a){Ha(this.g,function(b){return b==a})};function Si(a){this.a=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.a)throw new K("internal-error","The React Native compatibility library was not found.");this.type="asyncStorage"}g=Si.prototype;g.get=function(a){return A(this.a.getItem(a)).then(function(a){return a&&ze(a)})};g.set=function(a,b){return A(this.a.setItem(a,xe(b)))};g.P=function(a){return A(this.a.removeItem(a))};g.Y=function(){};g.ca=function(){};function Ti(){if(!Ui())throw new K("web-storage-unsupported");this.f={};this.a=[];this.b=0;this.g=k.indexedDB;this.type="indexedDB"}var Vi;function Wi(a){return new y(function(b,c){var d=a.g.deleteDatabase("firebaseLocalStorageDb");d.onsuccess=function(){b()};d.onerror=function(a){c(Error(a.target.error))}})}
function Xi(a){return new y(function(b,c){var d=a.g.open("firebaseLocalStorageDb",1);d.onerror=function(a){try{a.preventDefault()}catch(f){}c(Error(a.target.error))};d.onupgradeneeded=function(a){a=a.target.result;try{a.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(f){c(f)}};d.onsuccess=function(d){d=d.target.result;d.objectStoreNames.contains("firebaseLocalStorage")?b(d):Wi(a).then(function(){return Xi(a)}).then(function(a){b(a)}).s(function(a){c(a)})}})}
function Yi(a){a.h||(a.h=Xi(a));return a.h}function Ui(){try{return!!k.indexedDB}catch(a){return!1}}function Zi(a){return a.objectStore("firebaseLocalStorage")}function $i(a,b){return a.transaction(["firebaseLocalStorage"],b?"readwrite":"readonly")}function aj(a){return new y(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})}g=Ti.prototype;
g.set=function(a,b){var c=!1,d,e=this;return Yi(this).then(function(b){d=b;b=Zi($i(d,!0));return aj(b.get(a))}).then(function(f){var h=Zi($i(d,!0));if(f)return f.value=b,aj(h.put(f));e.b++;c=!0;f={};f.fbase_key=a;f.value=b;return aj(h.add(f))}).then(function(){e.f[a]=b}).ia(function(){c&&e.b--})};g.get=function(a){return Yi(this).then(function(b){return aj(Zi($i(b,!1)).get(a))}).then(function(a){return a&&a.value})};
g.P=function(a){var b=!1,c=this;return Yi(this).then(function(d){b=!0;c.b++;return aj(Zi($i(d,!0))["delete"](a))}).then(function(){delete c.f[a]}).ia(function(){b&&c.b--})};
g.Kc=function(){var a=this;return Yi(this).then(function(a){var b=Zi($i(a,!1));return b.getAll?aj(b.getAll()):new y(function(a,c){var d=[],e=b.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){c(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.b){for(d=0;d<b.length;d++)c[b[d].fbase_key]=b[d].value;d=Yd(a.f,c);a.f=c}return d})};g.Y=function(a){0==this.a.length&&bj(this);this.a.push(a)};
g.ca=function(a){Ha(this.a,function(b){return b==a});0==this.a.length&&this.c&&this.c.cancel("STOP_EVENT")};function bj(a){function b(){a.c=Hc(800).then(r(a.Kc,a)).then(function(b){0<b.length&&v(a.a,function(a){a(b)})}).then(b).s(function(a){"STOP_EVENT"!=a.message&&b()});return a.c}a.c&&a.c.cancel("STOP_EVENT");b()};function cj(a){var b=this,c=null;this.a=[];this.type="indexedDB";this.c=a;this.b=A().then(function(){return Ui()?(Vi||(Vi=new Ti),c=Vi,c.set("__sak","!").then(function(){return c.get("__sak")}).then(function(a){if("!"!==a)throw Error("indexedDB not supported!");return c.P("__sak")}).then(function(){return c}).s(function(){return b.c})):b.c}).then(function(a){b.type=a.type;a.Y(function(a){v(b.a,function(b){b(a)})});return a})}g=cj.prototype;g.get=function(a){return this.b.then(function(b){return b.get(a)})};
g.set=function(a,b){return this.b.then(function(c){return c.set(a,b)})};g.P=function(a){return this.b.then(function(b){return b.P(a)})};g.Y=function(a){this.a.push(a)};g.ca=function(a){Ha(this.a,function(b){return b==a})};function dj(){this.a={};this.type="inMemory"}g=dj.prototype;g.get=function(a){return A(this.a[a])};g.set=function(a,b){this.a[a]=b;return A()};g.P=function(a){delete this.a[a];return A()};g.Y=function(){};g.ca=function(){};function ej(){if(!fj()){if("Node"==ne())throw new K("internal-error","The LocalStorage compatibility library was not found.");throw new K("web-storage-unsupported");}this.a=gj()||firebase.INTERNAL.node.localStorage;this.type="localStorage"}function gj(){try{var a=k.localStorage,b=te();a&&(a.setItem(b,"1"),a.removeItem(b));return a}catch(c){return null}}
function fj(){var a="Node"==ne();a=gj()||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}}g=ej.prototype;g.get=function(a){var b=this;return A().then(function(){var c=b.a.getItem(a);return ze(c)})};g.set=function(a,b){var c=this;return A().then(function(){var d=xe(b);null===d?c.P(a):c.a.setItem(a,d)})};g.P=function(a){var b=this;return A().then(function(){b.a.removeItem(a)})};
g.Y=function(a){k.window&&rc(k.window,"storage",a)};g.ca=function(a){k.window&&D(k.window,"storage",a)};function hj(){this.type="nullStorage"}g=hj.prototype;g.get=function(){return A(null)};g.set=function(){return A()};g.P=function(){return A()};g.Y=function(){};g.ca=function(){};function ij(){if(!jj()){if("Node"==ne())throw new K("internal-error","The SessionStorage compatibility library was not found.");throw new K("web-storage-unsupported");}this.a=kj()||firebase.INTERNAL.node.sessionStorage;this.type="sessionStorage"}function kj(){try{var a=k.sessionStorage,b=te();a&&(a.setItem(b,"1"),a.removeItem(b));return a}catch(c){return null}}
function jj(){var a="Node"==ne();a=kj()||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}}g=ij.prototype;g.get=function(a){var b=this;return A().then(function(){var c=b.a.getItem(a);return ze(c)})};g.set=function(a,b){var c=this;return A().then(function(){var d=xe(b);null===d?c.P(a):c.a.setItem(a,d)})};g.P=function(a){var b=this;return A().then(function(){b.a.removeItem(a)})};g.Y=function(){};
g.ca=function(){};function lj(){var a={};a.Browser=mj;a.Node=nj;a.ReactNative=oj;a.Worker=pj;this.a=a[ne()]}var qj,mj={A:ej,Qa:ij},nj={A:ej,Qa:ij},oj={A:Si,Qa:hj},pj={A:ej,Qa:hj};var rj={Xc:"local",NONE:"none",Zc:"session"};function sj(a){var b=new K("invalid-persistence-type"),c=new K("unsupported-persistence-type");a:{for(d in rj)if(rj[d]==a){var d=!0;break a}d=!1}if(!d||"string"!==typeof a)throw b;switch(ne()){case "ReactNative":if("session"===a)throw c;break;case "Node":if("none"!==a)throw c;break;default:if(!se()&&"none"!==a)throw c;}}
function tj(){var a=!Ae(G())&&le()?!0:!1,b=we(),c=se();this.o=a;this.h=b;this.m=c;this.a={};qj||(qj=new lj);a=qj;try{this.g=!Vd()&&Ge()||!k.indexedDB?new a.a.A:new cj(me()?new dj:new a.a.A)}catch(d){this.g=new dj,this.h=!0}try{this.i=new a.a.Qa}catch(d){this.i=new dj}this.l=new dj;this.f=r(this.Lb,this);this.b={}}var uj;function vj(){uj||(uj=new tj);return uj}function wj(a,b){switch(b){case "session":return a.i;case "none":return a.l;default:return a.g}}
function xj(a,b){return"firebase:"+a.name+(b?":"+b:"")}function yj(a,b,c){var d=xj(b,c),e=wj(a,b.A);return a.get(b,c).then(function(f){var h=null;try{h=ze(k.localStorage.getItem(d))}catch(m){}if(h&&!f)return k.localStorage.removeItem(d),a.set(b,h,c);h&&f&&"localStorage"!=e.type&&k.localStorage.removeItem(d)})}g=tj.prototype;g.get=function(a,b){return wj(this,a.A).get(xj(a,b))};function zj(a,b,c){c=xj(b,c);"local"==b.A&&(a.b[c]=null);return wj(a,b.A).P(c)}
g.set=function(a,b,c){var d=xj(a,c),e=this,f=wj(this,a.A);return f.set(d,b).then(function(){return f.get(d)}).then(function(b){"local"==a.A&&(e.b[d]=b)})};g.addListener=function(a,b,c){a=xj(a,b);this.m&&(this.b[a]=k.localStorage.getItem(a));Za(this.a)&&(wj(this,"local").Y(this.f),this.h||(Vd()||!Ge())&&k.indexedDB||!this.m||Aj(this));this.a[a]||(this.a[a]=[]);this.a[a].push(c)};
g.removeListener=function(a,b,c){a=xj(a,b);this.a[a]&&(Ha(this.a[a],function(a){return a==c}),0==this.a[a].length&&delete this.a[a]);Za(this.a)&&(wj(this,"local").ca(this.f),Bj(this))};function Aj(a){Bj(a);a.c=setInterval(function(){for(var b in a.a){var c=k.localStorage.getItem(b),d=a.b[b];c!=d&&(a.b[b]=c,c=new ec({type:"storage",key:b,target:window,oldValue:d,newValue:c,a:!0}),a.Lb(c))}},1E3)}function Bj(a){a.c&&(clearInterval(a.c),a.c=null)}
g.Lb=function(a){if(a&&a.f){var b=a.a.key;if(null==b)for(var c in this.a){var d=this.b[c];"undefined"===typeof d&&(d=null);var e=k.localStorage.getItem(c);e!==d&&(this.b[c]=e,this.Wa(c))}else if(0==b.indexOf("firebase:")&&this.a[b]){"undefined"!==typeof a.a.a?wj(this,"local").ca(this.f):Bj(this);if(this.o)if(c=k.localStorage.getItem(b),d=a.a.newValue,d!==c)null!==d?k.localStorage.setItem(b,d):k.localStorage.removeItem(b);else if(this.b[b]===d&&"undefined"===typeof a.a.a)return;var f=this;c=function(){if("undefined"!==
typeof a.a.a||f.b[b]!==k.localStorage.getItem(b))f.b[b]=k.localStorage.getItem(b),f.Wa(b)};Ob&&Zb&&10==Zb&&k.localStorage.getItem(b)!==a.a.newValue&&a.a.newValue!==a.a.oldValue?setTimeout(c,10):c()}}else v(a,r(this.Wa,this))};g.Wa=function(a){this.a[a]&&v(this.a[a],function(a){a()})};function Cj(a){this.a=a;this.b=vj()}var Dj={name:"authEvent",A:"local"};function Ej(a){return a.b.get(Dj,a.a).then(function(a){return og(a)})};function Fj(){this.a=vj()};function Gj(){this.b=-1};function Hj(a,b){this.b=-1;this.b=Ij;this.f=k.Uint8Array?new Uint8Array(this.b):Array(this.b);this.g=this.c=0;this.a=[];this.i=a;this.h=b;this.m=k.Int32Array?new Int32Array(64):Array(64);void 0!==Jj||(k.Int32Array?Jj=new Int32Array(Kj):Jj=Kj);this.reset()}var Jj;t(Hj,Gj);for(var Ij=64,Lj=Ij-1,Mj=[],Nj=0;Nj<Lj;Nj++)Mj[Nj]=0;var Oj=Ia(128,Mj);Hj.prototype.reset=function(){this.g=this.c=0;this.a=k.Int32Array?new Int32Array(this.h):Ja(this.h)};
function Pj(a){for(var b=a.f,c=a.m,d=0,e=0;e<b.length;)c[d++]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3],e=4*d;for(b=16;64>b;b++){e=c[b-15]|0;d=c[b-2]|0;var f=(c[b-16]|0)+((e>>>7|e<<25)^(e>>>18|e<<14)^e>>>3)|0,h=(c[b-7]|0)+((d>>>17|d<<15)^(d>>>19|d<<13)^d>>>10)|0;c[b]=f+h|0}d=a.a[0]|0;e=a.a[1]|0;var m=a.a[2]|0,p=a.a[3]|0,z=a.a[4]|0,pc=a.a[5]|0,Pc=a.a[6]|0;f=a.a[7]|0;for(b=0;64>b;b++){var Rl=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&e^d&m^e&m)|0;h=z&pc^~z&Pc;f=f+((z>>>6|z<<26)^(z>>>11|z<<21)^(z>>>
25|z<<7))|0;h=h+(Jj[b]|0)|0;h=f+(h+(c[b]|0)|0)|0;f=Pc;Pc=pc;pc=z;z=p+h|0;p=m;m=e;e=d;d=h+Rl|0}a.a[0]=a.a[0]+d|0;a.a[1]=a.a[1]+e|0;a.a[2]=a.a[2]+m|0;a.a[3]=a.a[3]+p|0;a.a[4]=a.a[4]+z|0;a.a[5]=a.a[5]+pc|0;a.a[6]=a.a[6]+Pc|0;a.a[7]=a.a[7]+f|0}
function Qj(a,b,c){void 0===c&&(c=b.length);var d=0,e=a.c;if(l(b))for(;d<c;)a.f[e++]=b.charCodeAt(d++),e==a.b&&(Pj(a),e=0);else if(ha(b))for(;d<c;){var f=b[d++];if(!("number"==typeof f&&0<=f&&255>=f&&f==(f|0)))throw Error("message must be a byte array");a.f[e++]=f;e==a.b&&(Pj(a),e=0)}else throw Error("message must be string or array");a.c=e;a.g+=c}
var Kj=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,
4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function Rj(){Hj.call(this,8,Sj)}t(Rj,Hj);var Sj=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];function Tj(a,b,c,d,e){this.l=a;this.i=b;this.m=c;this.o=d||null;this.u=e||null;this.h=b+":"+c;this.v=new Fj;this.g=new Cj(this.h);this.f=null;this.b=[];this.a=this.c=null}function Uj(a){return new K("invalid-cordova-configuration",a)}g=Tj.prototype;
g.ga=function(){return this.za?this.za:this.za=ie().then(function(){if("function"!==typeof H("universalLinks.subscribe",k))throw Uj("cordova-universal-links-plugin is not installed");if("undefined"===typeof H("BuildInfo.packageName",k))throw Uj("cordova-plugin-buildinfo is not installed");if("function"!==typeof H("cordova.plugins.browsertab.openUrl",k))throw Uj("cordova-plugin-browsertab is not installed");if("function"!==typeof H("cordova.InAppBrowser.open",k))throw Uj("cordova-plugin-inappbrowser is not installed");
},function(){throw new K("cordova-not-ready");})};function Vj(){for(var a=20,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")}function Wj(a){var b=new Rj;Qj(b,a);a=[];var c=8*b.g;56>b.c?Qj(b,Oj,56-b.c):Qj(b,Oj,b.b-(b.c-56));for(var d=63;56<=d;d--)b.f[d]=c&255,c/=256;Pj(b);for(d=c=0;d<b.i;d++)for(var e=24;0<=e;e-=8)a[c++]=b.a[d]>>e&255;return lf(a)}
g.Ea=function(a,b){b(new K("operation-not-supported-in-this-environment"));return A()};g.zb=function(){return B(new K("operation-not-supported-in-this-environment"))};g.Mb=function(){return!1};g.Ib=function(){return!0};g.Db=function(){return!0};
g.Ca=function(a,b,c){if(this.c)return B(new K("redirect-operation-pending"));var d=this,e=k.document,f=null,h=null,m=null,p=null;return this.c=A().then(function(){mg(b);return Xj(d)}).then(function(){return Yj(d,a,b,c)}).then(function(){return(new y(function(a,b){h=function(){var b=H("cordova.plugins.browsertab.close",k);a();"function"===typeof b&&b();d.a&&"function"===typeof d.a.close&&(d.a.close(),d.a=null);return!1};d.va(h);m=function(){f||(f=Hc(2E3).then(function(){b(new K("redirect-cancelled-by-user"))}))};
p=function(){De()&&m()};e.addEventListener("resume",m,!1);G().toLowerCase().match(/android/)||e.addEventListener("visibilitychange",p,!1)})).s(function(a){return Zj(d).then(function(){throw a;})})}).ia(function(){m&&e.removeEventListener("resume",m,!1);p&&e.removeEventListener("visibilitychange",p,!1);f&&f.cancel();h&&d.Ka(h);d.c=null})};
function Yj(a,b,c,d){var e=Vj(),f=new ng(b,d,null,e,new K("no-auth-event")),h=H("BuildInfo.packageName",k);if("string"!==typeof h)throw new K("invalid-cordova-configuration");var m=H("BuildInfo.displayName",k),p={};if(G().toLowerCase().match(/iphone|ipad|ipod/))p.ibi=h;else if(G().toLowerCase().match(/android/))p.apn=h;else return B(new K("operation-not-supported-in-this-environment"));m&&(p.appDisplayName=m);e=Wj(e);p.sessionId=e;var z=Ri(a.l,a.i,a.m,b,c,null,d,a.o,p,a.u);return a.ga().then(function(){var b=
a.h;return a.v.a.set(Dj,f.D(),b)}).then(function(){var b=H("cordova.plugins.browsertab.isAvailable",k);if("function"!==typeof b)throw new K("invalid-cordova-configuration");var c=null;b(function(b){if(b){c=H("cordova.plugins.browsertab.openUrl",k);if("function"!==typeof c)throw new K("invalid-cordova-configuration");c(z)}else{c=H("cordova.InAppBrowser.open",k);if("function"!==typeof c)throw new K("invalid-cordova-configuration");b=G();b=!(!b.match(/(iPad|iPhone|iPod).*OS 7_\d/i)&&!b.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
a.a=c(z,b?"_blank":"_system","location=yes")}})})}function ak(a,b){for(var c=0;c<a.b.length;c++)try{a.b[c](b)}catch(d){}}function Xj(a){a.f||(a.f=a.ga().then(function(){return new y(function(b){function c(d){b(d);a.Ka(c);return!1}a.va(c);bk(a)})}));return a.f}function Zj(a){var b=null;return Ej(a.g).then(function(c){b=c;c=a.g;return zj(c.b,Dj,c.a)}).then(function(){return b})}
function bk(a){function b(b){d=!0;e&&e.cancel();Zj(a).then(function(d){var e=c;if(d&&b&&b.url){var f=null;e=If(b.url);-1!=e.indexOf("/__/auth/callback")&&(f=ed(e),f=ze(dd(f,"firebaseError")||null),f=(f="object"===typeof f?$e(f):null)?new ng(d.b,d.c,null,null,f):new ng(d.b,d.c,e,d.g));e=f||c}ak(a,e)})}var c=new ng("unknown",null,null,null,new K("no-auth-event")),d=!1,e=Hc(500).then(function(){return Zj(a).then(function(){d||ak(a,c)})}),f=k.handleOpenURL;k.handleOpenURL=function(a){0==a.toLowerCase().indexOf(H("BuildInfo.packageName",
k).toLowerCase()+"://")&&b({url:a});if("function"===typeof f)try{f(a)}catch(m){console.error(m)}};qg||(qg=new pg);qg.subscribe(b)}g.va=function(a){this.b.push(a);Xj(this).s(function(b){"auth/invalid-cordova-configuration"===b.code&&(b=new ng("unknown",null,null,null,new K("no-auth-event")),a(b))})};g.Ka=function(a){Ha(this.b,function(b){return b==a})};function ck(a){this.a=a;this.b=vj()}var dk={name:"pendingRedirect",A:"session"};function ek(a){return a.b.set(dk,"pending",a.a)}function fk(a){return zj(a.b,dk,a.a)}function gk(a){return a.b.get(dk,a.a).then(function(a){return"pending"==a})};function hk(a,b,c){this.v=a;this.m=b;this.l=c;this.h=[];this.f=!1;this.i=r(this.o,this);this.c=new ik;this.u=new jk;this.g=new ck(this.m+":"+this.l);this.b={};this.b.unknown=this.c;this.b.signInViaRedirect=this.c;this.b.linkViaRedirect=this.c;this.b.reauthViaRedirect=this.c;this.b.signInViaPopup=this.u;this.b.linkViaPopup=this.u;this.b.reauthViaPopup=this.u;this.a=kk(this.v,this.m,this.l,yi)}function kk(a,b,c,d){var e=firebase.SDK_VERSION||null;return je()?new Tj(a,b,c,e,d):new Li(a,b,c,e,d)}
hk.prototype.reset=function(){this.f=!1;this.a.Ka(this.i);this.a=kk(this.v,this.m,this.l)};function lk(a){a.f||(a.f=!0,a.a.va(a.i));var b=a.a;return a.a.ga().s(function(c){a.a==b&&a.reset();throw c;})}function mk(a){a.a.Ib()&&lk(a).s(function(b){var c=new ng("unknown",null,null,null,new K("operation-not-supported-in-this-environment"));nk(b)&&a.o(c)});a.a.Db()||ok(a.c)}
hk.prototype.subscribe=function(a){Fa(this.h,a)||this.h.push(a);if(!this.f){var b=this;gk(this.g).then(function(a){a?fk(b.g).then(function(){lk(b).s(function(a){var c=new ng("unknown",null,null,null,new K("operation-not-supported-in-this-environment"));nk(a)&&b.o(c)})}):mk(b)}).s(function(){mk(b)})}};hk.prototype.unsubscribe=function(a){Ha(this.h,function(b){return b==a})};
hk.prototype.o=function(a){if(!a)throw new K("invalid-auth-event");for(var b=!1,c=0;c<this.h.length;c++){var d=this.h[c];if(d.sb(a.b,a.c)){(b=this.b[a.b])&&b.h(a,d);b=!0;break}}ok(this.c);return b};var pk=new Ce(2E3,1E4),qk=new Ce(3E4,6E4);hk.prototype.fa=function(){return this.c.fa()};function rk(a,b,c,d,e,f){return a.a.zb(b,c,d,function(){a.f||(a.f=!0,a.a.va(a.i))},function(){a.reset()},e,f)}function nk(a){return a&&"auth/cordova-not-ready"==a.code?!0:!1}
hk.prototype.Ca=function(a,b,c){var d=this,e;return ek(this.g).then(function(){return d.a.Ca(a,b,c).s(function(a){if(nk(a))throw new K("operation-not-supported-in-this-environment");e=a;return fk(d.g).then(function(){throw e;})}).then(function(){return d.a.Mb()?new y(function(){}):fk(d.g).then(function(){return d.fa()}).then(function(){}).s(function(){})})})};hk.prototype.Ea=function(a,b,c,d){return this.a.Ea(c,function(c){a.ha(b,null,c,d)},pk.get())};var sk={};
function tk(a,b,c){var d=b+":"+c;sk[d]||(sk[d]=new hk(a,b,c));return sk[d]}function ik(){this.b=null;this.f=[];this.c=[];this.a=null;this.g=!1}ik.prototype.reset=function(){this.b=null;this.a&&(this.a.cancel(),this.a=null)};
ik.prototype.h=function(a,b){if(a){this.reset();this.g=!0;var c=a.b,d=a.c,e=a.a&&"auth/web-storage-unsupported"==a.a.code,f=a.a&&"auth/operation-not-supported-in-this-environment"==a.a.code;"unknown"!=c||e||f?a.a?(uk(this,!0,null,a.a),A()):b.wa(c,d)?vk(this,a,b):B(new K("invalid-auth-event")):(uk(this,!1,null,null),A())}else B(new K("invalid-auth-event"))};function ok(a){a.g||(a.g=!0,uk(a,!1,null,null))}
function vk(a,b,c){c=c.wa(b.b,b.c);var d=b.f,e=b.g,f=!!b.b.match(/Redirect$/);c(d,e).then(function(b){uk(a,f,b,null)}).s(function(b){uk(a,f,null,b)})}function wk(a,b){a.b=function(){return B(b)};if(a.c.length)for(var c=0;c<a.c.length;c++)a.c[c](b)}function xk(a,b){a.b=function(){return A(b)};if(a.f.length)for(var c=0;c<a.f.length;c++)a.f[c](b)}function uk(a,b,c,d){b?d?wk(a,d):xk(a,c):xk(a,{user:null});a.f=[];a.c=[]}
ik.prototype.fa=function(){var a=this;return new y(function(b,c){a.b?a.b().then(b,c):(a.f.push(b),a.c.push(c),yk(a))})};function yk(a){var b=new K("timeout");a.a&&a.a.cancel();a.a=Hc(qk.get()).then(function(){a.b||uk(a,!0,null,b)})}function jk(){}jk.prototype.h=function(a,b){if(a){var c=a.b,d=a.c;a.a?(b.ha(a.b,null,a.a,a.c),A()):b.wa(c,d)?zk(a,b):B(new K("invalid-auth-event"))}else B(new K("invalid-auth-event"))};
function zk(a,b){var c=a.c,d=a.b;b.wa(d,c)(a.f,a.g).then(function(a){b.ha(d,a,null,c)}).s(function(a){b.ha(d,null,a,c)})};function Ak(){this.pb=!1;Object.defineProperty(this,"appVerificationDisabled",{get:function(){return this.pb},set:function(a){this.pb=a},enumerable:!1})};function Bk(a,b){this.a=b;I(this,"verificationId",a)}Bk.prototype.confirm=function(a){a=kg(this.verificationId,a);return this.a(a)};function Ck(a,b,c,d){return(new ig(a)).Ta(b,c).then(function(a){return new Bk(a,d)})};function Dk(a){var b=tf(a);if(!(b&&b.exp&&b.auth_time&&b.iat))throw new K("internal-error","An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.");J(this,{token:a,expirationTime:Fe(1E3*b.exp),authTime:Fe(1E3*b.auth_time),issuedAtTime:Fe(1E3*b.iat),signInProvider:b.firebase&&b.firebase.sign_in_provider?b.firebase.sign_in_provider:null,claims:b})};function Ek(a,b,c){this.h=a;this.i=b;this.g=c;this.c=3E4;this.f=96E4;this.b=null;this.a=this.c;if(this.f<this.c)throw Error("Proactive refresh lower bound greater than upper bound!");}Ek.prototype.start=function(){this.a=this.c;Fk(this,!0)};function Gk(a,b){if(b)return a.a=a.c,a.g();b=a.a;a.a*=2;a.a>a.f&&(a.a=a.f);return b}function Fk(a,b){a.stop();a.b=Hc(Gk(a,b)).then(function(){return Ee()}).then(function(){return a.h()}).then(function(){Fk(a,!0)}).s(function(b){a.i(b)&&Fk(a,!1)})}
Ek.prototype.stop=function(){this.b&&(this.b.cancel(),this.b=null)};function Hk(a){this.f=a;this.b=this.a=null;this.c=0}Hk.prototype.D=function(){return{apiKey:this.f.b,refreshToken:this.a,accessToken:this.b,expirationTime:this.c}};function Ik(a,b){var c=b[L],d=b.refreshToken;b=Jk(b.expiresIn);a.b=c;a.c=b;a.a=d}function Kk(a,b){a.b=b.b;a.a=b.a;a.c=b.c}function Jk(a){return na()+1E3*parseInt(a,10)}
function Lk(a,b){return Mh(a.f,b).then(function(b){a.b=b.access_token;a.c=Jk(b.expires_in);a.a=b.refresh_token;return{accessToken:a.b,expirationTime:a.c,refreshToken:a.a}}).s(function(b){"auth/user-token-expired"==b.code&&(a.a=null);throw b;})}Hk.prototype.getToken=function(a){a=!!a;return this.b&&!this.a?B(new K("user-token-expired")):a||!this.b||na()>this.c-3E4?this.a?Lk(this,{grant_type:"refresh_token",refresh_token:this.a}):A(null):A({accessToken:this.b,expirationTime:this.c,refreshToken:this.a})};function Mk(a,b){this.a=a||null;this.b=b||null;J(this,{lastSignInTime:Fe(b||null),creationTime:Fe(a||null)})}function Nk(a){return new Mk(a.a,a.b)}Mk.prototype.D=function(){return{lastLoginAt:this.b,createdAt:this.a}};function Ok(a,b,c,d,e,f){J(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,phoneNumber:f||null,providerId:b})}function Pk(a,b){C.call(this,a);for(var c in b)this[c]=b[c]}t(Pk,C);
function Q(a,b,c){this.G=[];this.l=a.apiKey;this.o=a.appName;this.u=a.authDomain||null;a=firebase.SDK_VERSION?re(firebase.SDK_VERSION):null;this.b=new Ah(this.l,xi(yi),a);this.h=new Hk(this.b);Qk(this,b[L]);Ik(this.h,b);I(this,"refreshToken",this.h.a);Rk(this,c||{});E.call(this);this.I=!1;this.u&&ue()&&(this.a=tk(this.u,this.l,this.o));this.N=[];this.i=null;this.w=Sk(this);this.V=r(this.Ha,this);var d=this;this.ka=null;this.sa=function(a){d.oa(a.g)};this.X=null;this.O=[];this.ra=function(a){Tk(d,
a.c)};this.W=null}t(Q,E);Q.prototype.oa=function(a){this.ka=a;Gh(this.b,a)};Q.prototype.ea=function(){return this.ka};function Uk(a,b){a.X&&D(a.X,"languageCodeChanged",a.sa);(a.X=b)&&rc(b,"languageCodeChanged",a.sa)}function Tk(a,b){a.O=b;Hh(a.b,firebase.SDK_VERSION?re(firebase.SDK_VERSION,a.O):null)}Q.prototype.xa=function(){return Ja(this.O)};function Vk(a,b){a.W&&D(a.W,"frameworkChanged",a.ra);(a.W=b)&&rc(b,"frameworkChanged",a.ra)}Q.prototype.Ha=function(){this.w.b&&(this.w.stop(),this.w.start())};
function Wk(a){try{return firebase.app(a.o).auth()}catch(b){throw new K("internal-error","No firebase.auth.Auth instance is available for the Firebase App '"+a.o+"'!");}}function Sk(a){return new Ek(function(){return a.F(!0)},function(a){return a&&"auth/network-request-failed"==a.code?!0:!1},function(){var b=a.h.c-na()-3E5;return 0<b?b:0})}function Xk(a){a.C||a.w.b||(a.w.start(),D(a,"tokenChanged",a.V),rc(a,"tokenChanged",a.V))}function Yk(a){D(a,"tokenChanged",a.V);a.w.stop()}
function Qk(a,b){a.qa=b;I(a,"_lat",b)}function Zk(a,b){Ha(a.N,function(a){return a==b})}function $k(a){for(var b=[],c=0;c<a.N.length;c++)b.push(a.N[c](a));return vb(b).then(function(){return a})}function al(a){a.a&&!a.I&&(a.I=!0,a.a.subscribe(a))}
function Rk(a,b){J(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,phoneNumber:b.phoneNumber||null,isAnonymous:b.isAnonymous||!1,metadata:new Mk(b.createdAt,b.lastLoginAt),providerData:[]})}I(Q.prototype,"providerId","firebase");function bl(){}function cl(a){return A().then(function(){if(a.C)throw new K("app-deleted");})}function dl(a){return Ba(a.providerData,function(a){return a.providerId})}
function el(a,b){b&&(fl(a,b.providerId),a.providerData.push(b))}function fl(a,b){Ha(a.providerData,function(a){return a.providerId==b})}function gl(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&I(a,b,c)}
function hl(a,b){a!=b&&(J(a,{uid:b.uid,displayName:b.displayName,photoURL:b.photoURL,email:b.email,emailVerified:b.emailVerified,phoneNumber:b.phoneNumber,isAnonymous:b.isAnonymous,providerData:[]}),b.metadata?I(a,"metadata",Nk(b.metadata)):I(a,"metadata",new Mk),v(b.providerData,function(b){el(a,b)}),Kk(a.h,b.h),I(a,"refreshToken",a.h.a))}g=Q.prototype;g.reload=function(){var a=this;return R(this,cl(this).then(function(){return il(a).then(function(){return $k(a)}).then(bl)}))};
function il(a){return a.F().then(function(b){var c=a.isAnonymous;return jl(a,b).then(function(){c||gl(a,"isAnonymous",!1);return b})})}g.ac=function(a){return this.F(a).then(function(a){return new Dk(a)})};g.F=function(a){var b=this;return R(this,cl(this).then(function(){return b.h.getToken(a)}).then(function(a){if(!a)throw new K("internal-error");a.accessToken!=b.qa&&(Qk(b,a.accessToken),b.dispatchEvent(new Pk("tokenChanged")));gl(b,"refreshToken",a.refreshToken);return a.accessToken}))};
function kl(a,b){b[L]&&a.qa!=b[L]&&(Ik(a.h,b),a.dispatchEvent(new Pk("tokenChanged")),Qk(a,b[L]),gl(a,"refreshToken",a.h.a))}function jl(a,b){return O(a.b,ti,{idToken:b}).then(r(a.uc,a))}
g.uc=function(a){a=a.users;if(!a||!a.length)throw new K("internal-error");a=a[0];Rk(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified,phoneNumber:a.phoneNumber,lastLoginAt:a.lastLoginAt,createdAt:a.createdAt});for(var b=ll(a),c=0;c<b.length;c++)el(this,b[c]);gl(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
function ll(a){return(a=a.providerUserInfo)&&a.length?Ba(a,function(a){return new Ok(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl,a.phoneNumber)}):[]}g.cb=function(a){var b=this,c=null;return R(this,a.f(this.b,this.uid).then(function(a){kl(b,a);c=ml(b,a,"reauthenticate");b.i=null;return b.reload()}).then(function(){return c}),!0)};
g.vc=function(a){Ie("firebase.User.prototype.reauthenticateWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential instead.");return this.cb(a).then(function(){})};function nl(a,b){return il(a).then(function(){if(Fa(dl(a),b))return $k(a).then(function(){throw new K("provider-already-linked");})})}
g.ab=function(a){var b=this,c=null;return R(this,nl(this,a.providerId).then(function(){return b.F()}).then(function(c){return a.c(b.b,c)}).then(function(a){c=ml(b,a,"link");return ol(b,a)}).then(function(){return c}))};g.mc=function(a){Ie("firebase.User.prototype.linkWithCredential is deprecated. Please use firebase.User.prototype.linkAndRetrieveDataWithCredential instead.");return this.ab(a).then(function(a){return a.user})};
g.nc=function(a,b){var c=this;return R(this,nl(this,"phone").then(function(){return Ck(Wk(c),a,b,r(c.ab,c))}))};g.wc=function(a,b){var c=this;return R(this,A().then(function(){return Ck(Wk(c),a,b,r(c.cb,c))}),!0)};function ml(a,b,c){var d=lg(b);b=yf(b);return Le({user:a,credential:d,additionalUserInfo:b,operationType:c})}function ol(a,b){kl(a,b);return a.reload().then(function(){return a})}
g.mb=function(a){var b=this;return R(this,this.F().then(function(c){return b.b.mb(c,a)}).then(function(a){kl(b,a);return b.reload()}))};g.Pc=function(a){var b=this;return R(this,this.F().then(function(c){return a.c(b.b,c)}).then(function(a){kl(b,a);return b.reload()}))};g.nb=function(a){var b=this;return R(this,this.F().then(function(c){return b.b.nb(c,a)}).then(function(a){kl(b,a);return b.reload()}))};
g.ob=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return cl(this);var b=this;return R(this,this.F().then(function(c){return b.b.ob(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){kl(b,a);gl(b,"displayName",a.displayName||null);gl(b,"photoURL",a.photoUrl||null);v(b.providerData,function(a){"password"===a.providerId&&(I(a,"displayName",b.displayName),I(a,"photoURL",b.photoURL))});return $k(b)}).then(bl))};
g.Nc=function(a){var b=this;return R(this,il(this).then(function(c){return Fa(dl(b),a)?fi(b.b,c,[a]).then(function(a){var c={};v(a.providerUserInfo||[],function(a){c[a.providerId]=!0});v(dl(b),function(a){c[a]||fl(b,a)});c[ig.PROVIDER_ID]||I(b,"phoneNumber",null);return $k(b)}):$k(b).then(function(){throw new K("no-such-provider");})}))};
g.delete=function(){var a=this;return R(this,this.F().then(function(b){return O(a.b,si,{idToken:b})}).then(function(){a.dispatchEvent(new Pk("userDeleted"))})).then(function(){for(var b=0;b<a.G.length;b++)a.G[b].cancel("app-deleted");Uk(a,null);Vk(a,null);a.G=[];a.C=!0;Yk(a);I(a,"refreshToken",null);a.a&&a.a.unsubscribe(a)})};
g.sb=function(a,b){return"linkViaPopup"==a&&(this.g||null)==b&&this.f||"reauthViaPopup"==a&&(this.g||null)==b&&this.f||"linkViaRedirect"==a&&(this.aa||null)==b||"reauthViaRedirect"==a&&(this.aa||null)==b?!0:!1};g.ha=function(a,b,c,d){"linkViaPopup"!=a&&"reauthViaPopup"!=a||d!=(this.g||null)||(c&&this.v?this.v(c):b&&!c&&this.f&&this.f(b),this.c&&(this.c.cancel(),this.c=null),delete this.f,delete this.v)};
g.wa=function(a,b){return"linkViaPopup"==a&&b==(this.g||null)?r(this.xb,this):"reauthViaPopup"==a&&b==(this.g||null)?r(this.yb,this):"linkViaRedirect"==a&&(this.aa||null)==b?r(this.xb,this):"reauthViaRedirect"==a&&(this.aa||null)==b?r(this.yb,this):null};g.oc=function(a){var b=this;return pl(this,"linkViaPopup",a,function(){return nl(b,a.providerId).then(function(){return $k(b)})},!1)};g.xc=function(a){return pl(this,"reauthViaPopup",a,function(){return A()},!0)};
function pl(a,b,c,d,e){if(!ue())return B(new K("operation-not-supported-in-this-environment"));if(a.i&&!e)return B(a.i);var f=xf(c.providerId),h=te(a.uid+":::"),m=null;(!we()||le())&&a.u&&c.isOAuthProvider&&(m=Ri(a.u,a.l,a.o,b,c,null,h,firebase.SDK_VERSION||null));var p=de(m,f&&f.Ba,f&&f.Aa);d=d().then(function(){ql(a);if(!e)return a.F().then(function(){})}).then(function(){return rk(a.a,p,b,c,h,!!m)}).then(function(){return new y(function(c,d){a.ha(b,null,new K("cancelled-popup-request"),a.g||null);
a.f=c;a.v=d;a.g=h;a.c=a.a.Ea(a,b,p,h)})}).then(function(a){p&&ce(p);return a?Le(a):null}).s(function(a){p&&ce(p);throw a;});return R(a,d,e)}g.pc=function(a){var b=this;return rl(this,"linkViaRedirect",a,function(){return nl(b,a.providerId)},!1)};g.yc=function(a){return rl(this,"reauthViaRedirect",a,function(){return A()},!0)};
function rl(a,b,c,d,e){if(!ue())return B(new K("operation-not-supported-in-this-environment"));if(a.i&&!e)return B(a.i);var f=null,h=te(a.uid+":::");d=d().then(function(){ql(a);if(!e)return a.F().then(function(){})}).then(function(){a.aa=h;return $k(a)}).then(function(b){a.ba&&(b=a.ba,b=b.b.set(sl,a.D(),b.a));return b}).then(function(){return a.a.Ca(b,c,h)}).s(function(b){f=b;if(a.ba)return tl(a.ba);throw f;}).then(function(){if(f)throw f;});return R(a,d,e)}
function ql(a){if(!a.a||!a.I){if(a.a&&!a.I)throw new K("internal-error");throw new K("auth-domain-config-required");}}g.xb=function(a,b){var c=this;this.c&&(this.c.cancel(),this.c=null);var d=null,e=this.F().then(function(d){return Nf(c.b,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=ml(c,a,"link");return ol(c,a)}).then(function(){return d});return R(this,e)};
g.yb=function(a,b){var c=this;this.c&&(this.c.cancel(),this.c=null);var d=null,e=A().then(function(){return Jf(Of(c.b,{requestUri:a,sessionId:b}),c.uid)}).then(function(a){d=ml(c,a,"reauthenticate");kl(c,a);c.i=null;return c.reload()}).then(function(){return d});return R(this,e,!0)};g.gb=function(a){var b=this,c=null;return R(this,this.F().then(function(b){c=b;return"undefined"===typeof a||Za(a)?{}:kf(new af(a))}).then(function(a){return b.b.gb(c,a)}).then(function(a){if(b.email!=a)return b.reload()}).then(function(){}))};
function R(a,b,c){var d=ul(a,b,c);a.G.push(d);d.ia(function(){Ga(a.G,d)});return d}function ul(a,b,c){return a.i&&!c?(b.cancel(),B(a.i)):b.s(function(b){!b||"auth/user-disabled"!=b.code&&"auth/user-token-expired"!=b.code||(a.i||a.dispatchEvent(new Pk("userInvalidated")),a.i=b);throw b;})}g.toJSON=function(){return this.D()};
g.D=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,phoneNumber:this.phoneNumber,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.l,appName:this.o,authDomain:this.u,stsTokenManager:this.h.D(),redirectEventId:this.aa||null};this.metadata&&bb(a,this.metadata.D());v(this.providerData,function(b){a.providerData.push(Me(b))});return a};
function vl(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c[L]=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-na())/1E3;else return null;var d=new Q(b,c,a);a.providerData&&v(a.providerData,function(a){a&&el(d,Le(a))});a.redirectEventId&&(d.aa=a.redirectEventId);return d}
function wl(a,b,c,d){var e=new Q(a,b);c&&(e.ba=c);d&&Tk(e,d);return e.reload().then(function(){return e})}function xl(a,b,c,d){b=b||{apiKey:a.l,authDomain:a.u,appName:a.o};var e=a.h,f={};f[L]=e.b;f.refreshToken=e.a;f.expiresIn=(e.c-na())/1E3;b=new Q(b,f);c&&(b.ba=c);d&&Tk(b,d);hl(b,a);return b};function yl(a){this.a=a;this.b=vj()}var sl={name:"redirectUser",A:"session"};function tl(a){return zj(a.b,sl,a.a)}function zl(a,b){return a.b.get(sl,a.a).then(function(a){a&&b&&(a.authDomain=b);return vl(a||{})})};function Al(a){this.a=a;this.b=vj();this.c=null;this.f=Bl(this);this.b.addListener(Cl("local"),this.a,r(this.g,this))}Al.prototype.g=function(){var a=this,b=Cl("local");Dl(this,function(){return A().then(function(){return a.c&&"local"!=a.c.A?a.b.get(b,a.a):null}).then(function(c){if(c)return El(a,"local").then(function(){a.c=b})})})};function El(a,b){var c=[],d;for(d in rj)rj[d]!==b&&c.push(zj(a.b,Cl(rj[d]),a.a));c.push(zj(a.b,Fl,a.a));return ub(c)}
function Bl(a){var b=Cl("local"),c=Cl("session"),d=Cl("none");return yj(a.b,b,a.a).then(function(){return a.b.get(c,a.a)}).then(function(e){return e?c:a.b.get(d,a.a).then(function(c){return c?d:a.b.get(b,a.a).then(function(c){return c?b:a.b.get(Fl,a.a).then(function(a){return a?Cl(a):b})})})}).then(function(b){a.c=b;return El(a,b.A)}).s(function(){a.c||(a.c=b)})}var Fl={name:"persistence",A:"session"};function Cl(a){return{name:"authUser",A:a}}
Al.prototype.jb=function(a){var b=null,c=this;sj(a);return Dl(this,function(){return a!=c.c.A?c.b.get(c.c,c.a).then(function(d){b=d;return El(c,a)}).then(function(){c.c=Cl(a);if(b)return c.b.set(c.c,b,c.a)}):A()})};function Gl(a){return Dl(a,function(){return a.b.set(Fl,a.c.A,a.a)})}function Hl(a,b){return Dl(a,function(){return a.b.set(a.c,b.D(),a.a)})}function Il(a){return Dl(a,function(){return zj(a.b,a.c,a.a)})}
function Jl(a,b){return Dl(a,function(){return a.b.get(a.c,a.a).then(function(a){a&&b&&(a.authDomain=b);return vl(a||{})})})}function Dl(a,b){a.f=a.f.then(b,b);return a.f};function Kl(a){this.l=!1;I(this,"settings",new Ak);I(this,"app",a);if(S(this).options&&S(this).options.apiKey)a=firebase.SDK_VERSION?re(firebase.SDK_VERSION):null,this.b=new Ah(S(this).options&&S(this).options.apiKey,xi(yi),a);else throw new K("invalid-api-key");this.N=[];this.o=[];this.I=[];this.Pb=firebase.INTERNAL.createSubscribe(r(this.ic,this));this.O=void 0;this.Qb=firebase.INTERNAL.createSubscribe(r(this.jc,this));Ll(this,null);this.h=new Al(S(this).options.apiKey+":"+S(this).name);this.w=
new yl(S(this).options.apiKey+":"+S(this).name);this.V=T(this,Ml(this));this.i=T(this,Nl(this));this.X=!1;this.ka=r(this.Jc,this);this.Ha=r(this.Z,this);this.qa=r(this.Yb,this);this.ra=r(this.gc,this);this.sa=r(this.hc,this);Ol(this);this.INTERNAL={};this.INTERNAL["delete"]=r(this.delete,this);this.INTERNAL.logFramework=r(this.qc,this);this.u=0;E.call(this);Pl(this);this.G=[]}t(Kl,E);function Ql(a){C.call(this,"languageCodeChanged");this.g=a}t(Ql,C);
function Sl(a){C.call(this,"frameworkChanged");this.c=a}t(Sl,C);g=Kl.prototype;g.jb=function(a){a=this.h.jb(a);return T(this,a)};g.oa=function(a){this.W===a||this.l||(this.W=a,Gh(this.b,this.W),this.dispatchEvent(new Ql(this.ea())))};g.ea=function(){return this.W};g.Qc=function(){var a=k.navigator;this.oa(a?a.languages&&a.languages[0]||a.language||a.userLanguage||null:null)};g.qc=function(a){this.G.push(a);Hh(this.b,firebase.SDK_VERSION?re(firebase.SDK_VERSION,this.G):null);this.dispatchEvent(new Sl(this.G))};
g.xa=function(){return Ja(this.G)};function Pl(a){Object.defineProperty(a,"lc",{get:function(){return this.ea()},set:function(a){this.oa(a)},enumerable:!1});a.W=null}g.toJSON=function(){return{apiKey:S(this).options.apiKey,authDomain:S(this).options.authDomain,appName:S(this).name,currentUser:U(this)&&U(this).D()}};function Tl(a){return a.Ob||B(new K("auth-domain-config-required"))}
function Ol(a){var b=S(a).options.authDomain,c=S(a).options.apiKey;b&&ue()&&(a.Ob=a.V.then(function(){if(!a.l){a.a=tk(b,c,S(a).name);a.a.subscribe(a);U(a)&&al(U(a));if(a.C){al(a.C);var d=a.C;d.oa(a.ea());Uk(d,a);d=a.C;Tk(d,a.G);Vk(d,a);a.C=null}return a.a}}))}g.sb=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.g==b&&!!this.f;default:return!1}};
g.ha=function(a,b,c,d){"signInViaPopup"==a&&this.g==d&&(c&&this.v?this.v(c):b&&!c&&this.f&&this.f(b),this.c&&(this.c.cancel(),this.c=null),delete this.f,delete this.v)};g.wa=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.g==b&&this.f?r(this.Xb,this):null};
g.Xb=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.c&&(this.c.cancel(),this.c=null);var d=null,e=null,f=Lf(c.b,a).then(function(a){d=lg(a);e=yf(a);return a});a=c.V.then(function(){return f}).then(function(a){return Ul(c,a)}).then(function(){return Le({user:U(c),credential:d,additionalUserInfo:e,operationType:"signIn"})});return T(this,a)};
g.Hc=function(a){if(!ue())return B(new K("operation-not-supported-in-this-environment"));var b=this,c=xf(a.providerId),d=te(),e=null;(!we()||le())&&S(this).options.authDomain&&a.isOAuthProvider&&(e=Ri(S(this).options.authDomain,S(this).options.apiKey,S(this).name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=de(e,c&&c.Ba,c&&c.Aa);c=Tl(this).then(function(b){return rk(b,f,"signInViaPopup",a,d,!!e)}).then(function(){return new y(function(a,c){b.ha("signInViaPopup",null,new K("cancelled-popup-request"),
b.g);b.f=a;b.v=c;b.g=d;b.c=b.a.Ea(b,"signInViaPopup",f,d)})}).then(function(a){f&&ce(f);return a?Le(a):null}).s(function(a){f&&ce(f);throw a;});return T(this,c)};g.Ic=function(a){if(!ue())return B(new K("operation-not-supported-in-this-environment"));var b=this,c=Tl(this).then(function(){return Gl(b.h)}).then(function(){return b.a.Ca("signInViaRedirect",a)});return T(this,c)};
g.fa=function(){if(!ue())return B(new K("operation-not-supported-in-this-environment"));var a=this,b=Tl(this).then(function(){return a.a.fa()}).then(function(a){return a?Le(a):null});return T(this,b)};
g.Oc=function(a){if(!a)return B(new K("null-user"));var b=this,c={};c.apiKey=S(this).options.apiKey;c.authDomain=S(this).options.authDomain;c.appName=S(this).name;var d=xl(a,c,b.w,b.xa());return T(this,this.i.then(function(){if(S(b).options.apiKey!=a.l)return d.reload()}).then(function(){if(U(b)&&a.uid==U(b).uid)return hl(U(b),a),b.Z(a);Ll(b,d);al(d);return b.Z(d)}).then(function(){Vl(b)}))};
function Ul(a,b){var c={};c.apiKey=S(a).options.apiKey;c.authDomain=S(a).options.authDomain;c.appName=S(a).name;return a.V.then(function(){return wl(c,b,a.w,a.xa())}).then(function(b){if(U(a)&&b.uid==U(a).uid)return hl(U(a),b),a.Z(b);Ll(a,b);al(b);return a.Z(b)}).then(function(){Vl(a)})}
function Ll(a,b){U(a)&&(Zk(U(a),a.Ha),D(U(a),"tokenChanged",a.qa),D(U(a),"userDeleted",a.ra),D(U(a),"userInvalidated",a.sa),Yk(U(a)));b&&(b.N.push(a.Ha),rc(b,"tokenChanged",a.qa),rc(b,"userDeleted",a.ra),rc(b,"userInvalidated",a.sa),0<a.u&&Xk(b));I(a,"currentUser",b);b&&(b.oa(a.ea()),Uk(b,a),Tk(b,a.G),Vk(b,a))}g.kb=function(){var a=this,b=this.i.then(function(){if(!U(a))return A();Ll(a,null);return Il(a.h).then(function(){Vl(a)})});return T(this,b)};
function Wl(a){var b=zl(a.w,S(a).options.authDomain).then(function(b){if(a.C=b)b.ba=a.w;return tl(a.w)});return T(a,b)}function Ml(a){var b=S(a).options.authDomain,c=Wl(a).then(function(){return Jl(a.h,b)}).then(function(b){return b?(b.ba=a.w,a.C&&(a.C.aa||null)==(b.aa||null)?b:b.reload().then(function(){return Hl(a.h,b).then(function(){return b})}).s(function(c){return"auth/network-request-failed"==c.code?b:Il(a.h)})):null}).then(function(b){Ll(a,b||null)});return T(a,c)}
function Nl(a){return a.V.then(function(){return a.fa()}).s(function(){}).then(function(){if(!a.l)return a.ka()}).s(function(){}).then(function(){if(!a.l){a.X=!0;var b=a.h;b.b.addListener(Cl("local"),b.a,a.ka)}})}
g.Jc=function(){var a=this;return Jl(this.h,S(this).options.authDomain).then(function(b){if(!a.l){var c;if(c=U(a)&&b){c=U(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return hl(U(a),b),U(a).F();if(U(a)||b)Ll(a,b),b&&(al(b),b.ba=a.w),a.a&&a.a.subscribe(a),Vl(a)}})};g.Z=function(a){return Hl(this.h,a)};g.Yb=function(){Vl(this);this.Z(U(this))};g.gc=function(){this.kb()};g.hc=function(){this.kb()};
function Xl(a,b){var c=null,d=null;return T(a,b.then(function(b){c=lg(b);d=yf(b);return Ul(a,b)}).then(function(){return Le({user:U(a),credential:c,additionalUserInfo:d,operationType:"signIn"})}))}g.ic=function(a){var b=this;this.addAuthTokenListener(function(){a.next(U(b))})};g.jc=function(a){var b=this;Yl(this,function(){a.next(U(b))})};g.sc=function(a,b,c){var d=this;this.X&&firebase.Promise.resolve().then(function(){n(a)?a(U(d)):n(a.next)&&a.next(U(d))});return this.Pb(a,b,c)};
g.rc=function(a,b,c){var d=this;this.X&&firebase.Promise.resolve().then(function(){d.O=d.getUid();n(a)?a(U(d)):n(a.next)&&a.next(U(d))});return this.Qb(a,b,c)};g.$b=function(a){var b=this,c=this.i.then(function(){return U(b)?U(b).F(a).then(function(a){return{accessToken:a}}):null});return T(this,c)};g.Jb=function(a){var b=this;return this.i.then(function(){return Xl(b,O(b.b,vi,{token:a}))}).then(function(a){var c=a.user;gl(c,"isAnonymous",!1);b.Z(c);return a})};
g.Bc=function(a){Ie("firebase.auth.Auth.prototype.signInAndRetrieveDataWithCustomToken is deprecated. Please use firebase.auth.Auth.prototype.signInWithCustomToken instead.");return this.Jb(a)};g.Cc=function(a,b){Ie("firebase.auth.Auth.prototype.signInAndRetrieveDataWithEmailAndPassword is deprecated. Please use firebase.auth.Auth.prototype.signInWithEmailAndPassword instead.");return this.Kb(a,b)};g.Kb=function(a,b){var c=this;return this.i.then(function(){return Xl(c,O(c.b,$f,{email:a,password:b}))})};
g.ub=function(a,b){var c=this;return this.i.then(function(){return Xl(c,O(c.b,ri,{email:a,password:b}))})};g.Sb=function(a,b){Ie("firebase.auth.Auth.prototype.createUserAndRetrieveDataWithEmailAndPassword is deprecated. Please use firebase.auth.Auth.prototype.createUserWithEmailAndPassword instead.");return this.ub(a,b)};g.Ec=function(a){Ie("firebase.auth.Auth.prototype.signInWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential instead.");return this.Oa(a).then(function(a){return a.user})};
g.Oa=function(a){var b=this;return this.i.then(function(){return Xl(b,a.ya(b.b))})};g.Pa=function(){var a=this;return this.i.then(function(){var b=U(a);if(b&&b.isAnonymous){var c=Le({providerId:null,isNewUser:!1});return Le({user:b,credential:null,additionalUserInfo:c,operationType:"signIn"})}return Xl(a,a.b.Pa()).then(function(b){var c=b.user;gl(c,"isAnonymous",!0);a.Z(c);return b})})};
g.Dc=function(){Ie("firebase.auth.Auth.prototype.signInAnonymouslyAndRetrieveData is deprecated. Please use firebase.auth.Auth.prototype.signInAnonymously instead.");return this.Pa()};function S(a){return a.app}function U(a){return a.currentUser}g.getUid=function(){return U(this)&&U(this).uid||null};function Zl(a){return U(a)&&U(a)._lat||null}
function Vl(a){if(a.X){for(var b=0;b<a.o.length;b++)if(a.o[b])a.o[b](Zl(a));if(a.O!==a.getUid()&&a.I.length)for(a.O=a.getUid(),b=0;b<a.I.length;b++)if(a.I[b])a.I[b](Zl(a))}}g.Rb=function(a){this.addAuthTokenListener(a);this.u++;0<this.u&&U(this)&&Xk(U(this))};g.zc=function(a){var b=this;v(this.o,function(c){c==a&&b.u--});0>this.u&&(this.u=0);0==this.u&&U(this)&&Yk(U(this));this.removeAuthTokenListener(a)};
g.addAuthTokenListener=function(a){var b=this;this.o.push(a);T(this,this.i.then(function(){b.l||Fa(b.o,a)&&a(Zl(b))}))};g.removeAuthTokenListener=function(a){Ha(this.o,function(b){return b==a})};function Yl(a,b){a.I.push(b);T(a,a.i.then(function(){!a.l&&Fa(a.I,b)&&a.O!==a.getUid()&&(a.O=a.getUid(),b(Zl(a)))}))}
g.delete=function(){this.l=!0;for(var a=0;a<this.N.length;a++)this.N[a].cancel("app-deleted");this.N=[];this.h&&(a=this.h,a.b.removeListener(Cl("local"),a.a,this.ka));this.a&&this.a.unsubscribe(this);return firebase.Promise.resolve()};function T(a,b){a.N.push(b);b.ia(function(){Ga(a.N,b)});return b}g.Vb=function(a){Ie("firebase.auth.Auth.prototype.fetchProvidersForEmail is deprecated. Please use firebase.auth.Auth.prototype.fetchSignInMethodsForEmail instead.");return T(this,Rh(this.b,a))};
g.Wb=function(a){return T(this,Th(this.b,a))};g.kc=function(a){return!!dg(a)};g.ib=function(a,b){var c=this;return T(this,A().then(function(){var a=new af(b);if(!a.c)throw new K("argument-error",jf+" must be true when sending sign in link to email");return kf(a)}).then(function(b){return c.b.ib(a,b)}).then(function(){}))};g.Rc=function(a){return this.Ja(a).then(function(a){return a.data.email})};g.Xa=function(a,b){return T(this,this.b.Xa(a,b).then(function(){}))};g.Ja=function(a){return T(this,this.b.Ja(a).then(function(a){return new Pe(a)}))};
g.Va=function(a){return T(this,this.b.Va(a).then(function(){}))};g.hb=function(a,b){var c=this;return T(this,A().then(function(){return"undefined"===typeof b||Za(b)?{}:kf(new af(b))}).then(function(b){return c.b.hb(a,b)}).then(function(){}))};g.Gc=function(a,b){return T(this,Ck(this,a,b,r(this.Oa,this)))};g.Fc=function(a,b){var c=this;return T(this,A().then(function(){var d=cg(a,b||Wd());return c.Oa(d)}))};function $l(){}$l.prototype.render=function(){};$l.prototype.reset=function(){};$l.prototype.getResponse=function(){};$l.prototype.execute=function(){};function am(){this.a={};this.b=1E12}var bm=null;am.prototype.render=function(a,b){this.a[this.b.toString()]=new cm(a,b);return this.b++};am.prototype.reset=function(a){var b=dm(this,a);a=em(a);b&&a&&(b.delete(),delete this.a[a])};am.prototype.getResponse=function(a){return(a=dm(this,a))?a.getResponse():null};am.prototype.execute=function(a){(a=dm(this,a))&&a.execute()};function dm(a,b){return(b=em(b))?a.a[b]||null:null}function em(a){return(a="undefined"===typeof a?1E12:a)?a.toString():null}
function cm(a,b){this.g=!1;this.c=b;this.a=this.b=null;this.h="invisible"!==this.c.size;this.f=Jd(a);var c=this;this.i=function(){c.execute()};this.h?this.execute():rc(this.f,"click",this.i)}cm.prototype.getResponse=function(){fm(this);return this.b};
cm.prototype.execute=function(){fm(this);var a=this;this.a||(this.a=setTimeout(function(){a.b=pe();var b=a.c.callback,c=a.c["expired-callback"];if(b)try{b(a.b)}catch(d){}a.a=setTimeout(function(){a.a=null;a.b=null;if(c)try{c()}catch(d){}a.h&&a.execute()},6E4)},500))};cm.prototype.delete=function(){fm(this);this.g=!0;clearTimeout(this.a);this.a=null;D(this.f,"click",this.i)};function fm(a){if(a.g)throw Error("reCAPTCHA mock was already deleted!");};function gm(){}gm.prototype.g=function(){bm||(bm=new am);return A(bm)};gm.prototype.c=function(){};var hm=null;function im(){this.b=k.grecaptcha?Infinity:0;this.f=null;this.a="__rcb"+Math.floor(1E6*Math.random()).toString()}var jm=rd("https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit&hl=%{hl}"),km=new Ce(3E4,6E4);
im.prototype.g=function(a){var b=this;return new y(function(c,d){var e=setTimeout(function(){d(new K("network-request-failed"))},km.get());if(!k.grecaptcha||a!==b.f&&!b.b){k[b.a]=function(){if(k.grecaptcha){b.f=a;var f=k.grecaptcha.render;k.grecaptcha.render=function(a,c){a=f(a,c);b.b++;return a};clearTimeout(e);c(k.grecaptcha)}else clearTimeout(e),d(new K("internal-error"));delete k[b.a]};var f=vd(jm,{onload:b.a,hl:a||""});A(sh(f)).s(function(){clearTimeout(e);d(new K("internal-error","Unable to load external reCAPTCHA dependencies!"))})}else clearTimeout(e),
c(k.grecaptcha)})};im.prototype.c=function(){this.b--};var lm=null;function mm(a,b,c,d,e,f,h){I(this,"type","recaptcha");this.c=this.f=null;this.C=!1;this.l=b;this.g=null;h?(hm||(hm=new gm),h=hm):(lm||(lm=new im),h=lm);this.o=h;this.a=c||{theme:"light",type:"image"};this.h=[];if(this.a[nm])throw new K("argument-error","sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");this.i="invisible"===this.a[om];if(!k.document)throw new K("operation-not-supported-in-this-environment","RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.");
if(!Jd(b)||!this.i&&Jd(b).hasChildNodes())throw new K("argument-error","reCAPTCHA container is either not found or already contains inner elements!");this.u=new Ah(a,f||null,e||null);this.v=d||function(){return null};var m=this;this.m=[];var p=this.a[pm];this.a[pm]=function(a){qm(m,a);if("function"===typeof p)p(a);else if("string"===typeof p){var b=H(p,k);"function"===typeof b&&b(a)}};var z=this.a[rm];this.a[rm]=function(){qm(m,null);if("function"===typeof z)z();else if("string"===typeof z){var a=
H(z,k);"function"===typeof a&&a()}}}var pm="callback",rm="expired-callback",nm="sitekey",om="size";function qm(a,b){for(var c=0;c<a.m.length;c++)try{a.m[c](b)}catch(d){}}function sm(a,b){Ha(a.m,function(a){return a==b})}function tm(a,b){a.h.push(b);b.ia(function(){Ga(a.h,b)});return b}g=mm.prototype;
g.za=function(){var a=this;return this.f?this.f:this.f=tm(this,A().then(function(){if(ve()&&!me())return he();throw new K("operation-not-supported-in-this-environment","RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");}).then(function(){return a.o.g(a.v())}).then(function(b){a.g=b;return O(a.u,ui,{})}).then(function(b){a.a[nm]=b.recaptchaSiteKey}).s(function(b){a.f=null;throw b;}))};
g.render=function(){um(this);var a=this;return tm(this,this.za().then(function(){if(null===a.c){var b=a.l;if(!a.i){var c=Jd(b);b=Md("DIV");c.appendChild(b)}a.c=a.g.render(b,a.a)}return a.c}))};g.verify=function(){um(this);var a=this;return tm(this,this.render().then(function(b){return new y(function(c){var d=a.g.getResponse(b);if(d)c(d);else{var e=function(b){b&&(sm(a,e),c(b))};a.m.push(e);a.i&&a.g.execute(a.c)}})}))};g.reset=function(){um(this);null!==this.c&&this.g.reset(this.c)};
function um(a){if(a.C)throw new K("internal-error","RecaptchaVerifier instance has been destroyed.");}g.clear=function(){um(this);this.C=!0;this.o.c();for(var a=0;a<this.h.length;a++)this.h[a].cancel("RecaptchaVerifier instance has been destroyed.");if(!this.i){a=Jd(this.l);for(var b;b=a.firstChild;)a.removeChild(b)}};
function vm(a,b,c){var d=!1;try{this.b=c||firebase.app()}catch(h){throw new K("argument-error","No firebase.app.App instance is currently initialized.");}if(this.b.options&&this.b.options.apiKey)c=this.b.options.apiKey;else throw new K("invalid-api-key");var e=this,f=null;try{f=this.b.auth().xa()}catch(h){}try{d=this.b.auth().settings.appVerificationDisabledForTesting}catch(h){}f=firebase.SDK_VERSION?re(firebase.SDK_VERSION,f):null;mm.call(this,c,a,b,function(){try{var a=e.b.auth().ea()}catch(m){a=
null}return a},f,xi(yi),d)}t(vm,mm);function wm(a,b,c,d){a:{c=Array.prototype.slice.call(c);var e=0;for(var f=!1,h=0;h<b.length;h++)if(b[h].optional)f=!0;else{if(f)throw new K("internal-error","Argument validator encountered a required argument after an optional argument.");e++}f=b.length;if(c.length<e||f<c.length)d="Expected "+(e==f?1==e?"1 argument":e+" arguments":e+"-"+f+" arguments")+" but got "+c.length+".";else{for(e=0;e<c.length;e++)if(f=b[e].optional&&void 0===c[e],!b[e].M(c[e])&&!f){b=b[e];if(0>e||e>=xm.length)throw new K("internal-error",
"Argument validator received an unsupported number of arguments.");c=xm[e];d=(d?"":c+" argument ")+(b.name?'"'+b.name+'" ':"")+"must be "+b.K+".";break a}d=null}}if(d)throw new K("argument-error",a+" failed: "+d);}var xm="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" ");function V(a,b){return{name:a||"",K:"a valid string",optional:!!b,M:l}}function ym(a,b){return{name:a||"",K:"a boolean",optional:!!b,M:ba}}
function W(a,b){return{name:a||"",K:"a valid object",optional:!!b,M:q}}function zm(a,b){return{name:a||"",K:"a function",optional:!!b,M:n}}function Am(a,b){return{name:a||"",K:"null",optional:!!b,M:ea}}function Bm(){return{name:"",K:"an HTML element",optional:!1,M:function(a){return!!(a&&a instanceof Element)}}}function Cm(){return{name:"auth",K:"an instance of Firebase Auth",optional:!0,M:function(a){return!!(a&&a instanceof Kl)}}}
function Dm(){return{name:"app",K:"an instance of Firebase App",optional:!0,M:function(a){return!!(a&&a instanceof firebase.app.App)}}}function Em(a){return{name:a?a+"Credential":"credential",K:a?"a valid "+a+" credential":"a valid credential",optional:!1,M:function(b){if(!b)return!1;var c=!a||b.providerId===a;return!(!b.ya||!c)}}}
function Fm(){return{name:"authProvider",K:"a valid Auth provider",optional:!1,M:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}}function Gm(){return{name:"applicationVerifier",K:"an implementation of firebase.auth.ApplicationVerifier",optional:!1,M:function(a){return!!(a&&l(a.type)&&n(a.verify))}}}function X(a,b,c,d){return{name:c||"",K:a.K+" or "+b.K,optional:!!d,M:function(c){return a.M(c)||b.M(c)}}};function Y(a,b){for(var c in b){var d=b[c].name;a[d]=Hm(d,a[c],b[c].j)}}function Im(a,b){for(var c in b){var d=b[c].name;if(d!==c){var e=b[c].qb;Object.defineProperty(a,d,{get:function(){return this[c]},set:function(a){wm(d,[e],[a],!0);this[c]=a},enumerable:!0})}}}function Z(a,b,c,d){a[b]=Hm(b,c,d)}
function Hm(a,b,c){function d(){var a=Array.prototype.slice.call(arguments);wm(e,c,a);return b.apply(this,a)}if(!c)return b;var e=Jm(a),f;for(f in b)d[f]=b[f];for(f in b.prototype)d.prototype[f]=b.prototype[f];return d}function Jm(a){a=a.split(".");return a[a.length-1]};Y(Kl.prototype,{Va:{name:"applyActionCode",j:[V("code")]},Ja:{name:"checkActionCode",j:[V("code")]},Xa:{name:"confirmPasswordReset",j:[V("code"),V("newPassword")]},ub:{name:"createUserWithEmailAndPassword",j:[V("email"),V("password")]},Sb:{name:"createUserAndRetrieveDataWithEmailAndPassword",j:[V("email"),V("password")]},Vb:{name:"fetchProvidersForEmail",j:[V("email")]},Wb:{name:"fetchSignInMethodsForEmail",j:[V("email")]},fa:{name:"getRedirectResult",j:[]},kc:{name:"isSignInWithEmailLink",j:[V("emailLink")]},
rc:{name:"onAuthStateChanged",j:[X(W(),zm(),"nextOrObserver"),zm("opt_error",!0),zm("opt_completed",!0)]},sc:{name:"onIdTokenChanged",j:[X(W(),zm(),"nextOrObserver"),zm("opt_error",!0),zm("opt_completed",!0)]},hb:{name:"sendPasswordResetEmail",j:[V("email"),X(W("opt_actionCodeSettings",!0),Am(null,!0),"opt_actionCodeSettings",!0)]},ib:{name:"sendSignInLinkToEmail",j:[V("email"),W("actionCodeSettings")]},jb:{name:"setPersistence",j:[V("persistence")]},Oa:{name:"signInAndRetrieveDataWithCredential",
j:[Em()]},Pa:{name:"signInAnonymously",j:[]},Dc:{name:"signInAnonymouslyAndRetrieveData",j:[]},Ec:{name:"signInWithCredential",j:[Em()]},Jb:{name:"signInWithCustomToken",j:[V("token")]},Bc:{name:"signInAndRetrieveDataWithCustomToken",j:[V("token")]},Kb:{name:"signInWithEmailAndPassword",j:[V("email"),V("password")]},Fc:{name:"signInWithEmailLink",j:[V("email"),V("emailLink",!0)]},Cc:{name:"signInAndRetrieveDataWithEmailAndPassword",j:[V("email"),V("password")]},Gc:{name:"signInWithPhoneNumber",j:[V("phoneNumber"),
Gm()]},Hc:{name:"signInWithPopup",j:[Fm()]},Ic:{name:"signInWithRedirect",j:[Fm()]},Oc:{name:"updateCurrentUser",j:[X(function(a){return{name:"user",K:"an instance of Firebase User",optional:!!a,M:function(a){return!!(a&&a instanceof Q)}}}(),Am(),"user")]},kb:{name:"signOut",j:[]},toJSON:{name:"toJSON",j:[V(null,!0)]},Qc:{name:"useDeviceLanguage",j:[]},Rc:{name:"verifyPasswordResetCode",j:[V("code")]}});Im(Kl.prototype,{lc:{name:"languageCode",qb:X(V(),Am(),"languageCode")}});Kl.Persistence=rj;
Kl.Persistence.LOCAL="local";Kl.Persistence.SESSION="session";Kl.Persistence.NONE="none";
Y(Q.prototype,{"delete":{name:"delete",j:[]},ac:{name:"getIdTokenResult",j:[ym("opt_forceRefresh",!0)]},F:{name:"getIdToken",j:[ym("opt_forceRefresh",!0)]},ab:{name:"linkAndRetrieveDataWithCredential",j:[Em()]},mc:{name:"linkWithCredential",j:[Em()]},nc:{name:"linkWithPhoneNumber",j:[V("phoneNumber"),Gm()]},oc:{name:"linkWithPopup",j:[Fm()]},pc:{name:"linkWithRedirect",j:[Fm()]},cb:{name:"reauthenticateAndRetrieveDataWithCredential",j:[Em()]},vc:{name:"reauthenticateWithCredential",j:[Em()]},wc:{name:"reauthenticateWithPhoneNumber",
j:[V("phoneNumber"),Gm()]},xc:{name:"reauthenticateWithPopup",j:[Fm()]},yc:{name:"reauthenticateWithRedirect",j:[Fm()]},reload:{name:"reload",j:[]},gb:{name:"sendEmailVerification",j:[X(W("opt_actionCodeSettings",!0),Am(null,!0),"opt_actionCodeSettings",!0)]},toJSON:{name:"toJSON",j:[V(null,!0)]},Nc:{name:"unlink",j:[V("provider")]},mb:{name:"updateEmail",j:[V("email")]},nb:{name:"updatePassword",j:[V("password")]},Pc:{name:"updatePhoneNumber",j:[Em("phone")]},ob:{name:"updateProfile",j:[W("profile")]}});
Y(am.prototype,{execute:{name:"execute"},render:{name:"render"},reset:{name:"reset"},getResponse:{name:"getResponse"}});Y($l.prototype,{execute:{name:"execute"},render:{name:"render"},reset:{name:"reset"},getResponse:{name:"getResponse"}});Y(y.prototype,{ia:{name:"finally"},s:{name:"catch"},then:{name:"then"}});Im(Ak.prototype,{appVerificationDisabled:{name:"appVerificationDisabledForTesting",qb:ym("appVerificationDisabledForTesting")}});Y(Bk.prototype,{confirm:{name:"confirm",j:[V("verificationCode")]}});
Z(N,"credential",function(a,b){return new Yf(a,b)},[V("email"),V("password")]);Y(Qf.prototype,{ta:{name:"addScope",j:[V("scope")]},Da:{name:"setCustomParameters",j:[W("customOAuthParameters")]}});Z(Qf,"credential",Rf,[X(V(),W(),"token")]);Z(N,"credentialWithLink",cg,[V("email"),V("emailLink")]);Y(Sf.prototype,{ta:{name:"addScope",j:[V("scope")]},Da:{name:"setCustomParameters",j:[W("customOAuthParameters")]}});Z(Sf,"credential",Tf,[X(V(),W(),"token")]);
Y(Uf.prototype,{ta:{name:"addScope",j:[V("scope")]},Da:{name:"setCustomParameters",j:[W("customOAuthParameters")]}});Z(Uf,"credential",Vf,[X(V(),X(W(),Am()),"idToken"),X(V(),Am(),"accessToken",!0)]);Y(Wf.prototype,{Da:{name:"setCustomParameters",j:[W("customOAuthParameters")]}});Z(Wf,"credential",Xf,[X(V(),W(),"token"),V("secret",!0)]);
Y(M.prototype,{ta:{name:"addScope",j:[V("scope")]},credential:{name:"credential",j:[X(V(),Am(),"idToken",!0),X(V(),Am(),"accessToken",!0)]},Da:{name:"setCustomParameters",j:[W("customOAuthParameters")]}});Z(ig,"credential",kg,[V("verificationId"),V("verificationCode")]);Y(ig.prototype,{Ta:{name:"verifyPhoneNumber",j:[V("phoneNumber"),Gm()]}});Y(K.prototype,{toJSON:{name:"toJSON",j:[V(null,!0)]}});Y(sg.prototype,{toJSON:{name:"toJSON",j:[V(null,!0)]}});
Y(rg.prototype,{toJSON:{name:"toJSON",j:[V(null,!0)]}});Y(vm.prototype,{clear:{name:"clear",j:[]},render:{name:"render",j:[]},verify:{name:"verify",j:[]}});
(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:Kl,Error:K};Z(a,"EmailAuthProvider",N,[]);Z(a,"FacebookAuthProvider",Qf,[]);Z(a,"GithubAuthProvider",Sf,[]);Z(a,"GoogleAuthProvider",Uf,[]);Z(a,"TwitterAuthProvider",Wf,[]);Z(a,"OAuthProvider",M,[V("providerId")]);Z(a,"PhoneAuthProvider",ig,[Cm()]);Z(a,"RecaptchaVerifier",vm,[X(V(),Bm(),"recaptchaContainer"),W("recaptchaParameters",!0),Dm()]);firebase.INTERNAL.registerService("auth",function(a,
c){a=new Kl(a);c({INTERNAL:{getUid:r(a.getUid,a),getToken:r(a.$b,a),addAuthTokenListener:r(a.Rb,a),removeAuthTokenListener:r(a.zc,a)}});return a},a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:Q})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();
}).call(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@firebase/polyfill/dist/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@firebase/polyfill/dist/index.esm.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate, global) {/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/@firebase/polyfill/node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__);


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!globalNS.Promise) {
  globalNS.Promise = Promise;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

var find = _core.Array.find;

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $find$1 = _arrayMethods(6);
var KEY$1 = 'findIndex';
var forced$1 = true;
// Shouldn't skip holes
if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
_export(_export.P + _export.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

var findIndex = _core.Array.findIndex;

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var startsWith = _core.String.startsWith;

var _stringRepeat = function repeat(count) {
  var str = String(_defined(this));
  var res = '';
  var n = _toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

_export(_export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _stringRepeat
});

var repeat = _core.String.repeat;

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@firebase/polyfill/node_modules/whatwg-fetch/fetch.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@firebase/polyfill/node_modules/whatwg-fetch/fetch.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ "./node_modules/@firebase/util/dist/index.cjs.js":
/*!*******************************************************!*\
  !*** ./node_modules/@firebase/util/dist/index.cjs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 * @param {*} assertion The assertion to be tested for falsiness
 * @param {!string} message The message to display if the check fails
 */
var assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 * @param {string} message
 * @return {!Error}
 */
var assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray = function (str) {
    // TODO(user): Use native implementations if/when available
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) == 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) == 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {Array<number>} bytes Array of numbers representing characters.
 * @return {string} Stringification of the array.
 */
var byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    var out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// Static lookup maps, lazily populated by init_()
var base64 = {
    /**
     * Maps bytes to characters.
     * @type {Object}
     * @private
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @type {Object}
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     * @type {string}
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     * @type {string}
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     * @type {string}
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     * @type {boolean}
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param {Array<number>|Uint8Array} input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param {boolean=} opt_webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encodeByteArray: function (input, opt_webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        var byteToCharMap = opt_webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        var output = [];
        for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;
            var outByte1 = byte1 >> 2;
            var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            var outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            var outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param {string} input A string to encode.
     * @param {boolean=} opt_webSafe If true, we should use the
     *     alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encodeString: function (input, opt_webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !opt_webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray(input), opt_webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param {string} input to decode.
     * @param {boolean=} opt_webSafe True if we should use the
     *     alternative alphabet.
     * @return {string} string representing the decoded value.
     */
    decodeString: function (input, opt_webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !opt_webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, opt_webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param {string} input Input to decode.
     * @param {boolean=} opt_webSafe True if we should use the web-safe alphabet.
     * @return {!Array<number>} bytes representing the decoded value.
     */
    decodeStringToByteArray: function (input, opt_webSafe) {
        this.init_();
        var charToByteMap = opt_webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        var output = [];
        for (var i = 0; i < input.length;) {
            var byte1 = charToByteMap[input.charAt(i++)];
            var haveByte2 = i < input.length;
            var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            var haveByte3 = i < input.length;
            var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            var haveByte4 = i < input.length;
            var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            var outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 != 64) {
                var outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 != 64) {
                    var outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_: function () {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (var i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * URL-safe base64 encoding
 * @param {!string} str
 * @return {!string}
 */
var base64Encode = function (str) {
    var utf8Bytes = stringToByteArray(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param {string} str To be decoded
 * @return {?string} Decoded result, if possible
 */
var base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
// TODO: Really needed (for JSCompiler type checking)?
function patchProperty(obj, prop, value) {
    obj[prop] = value;
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     * @param {((?function(?(Error)): (?|undefined))| (?function(?(Error),?=): (?|undefined)))=} callback
     * @return {!function(?(Error), ?=)}
     */
    Deferred.prototype.wrapCallback = function (callback) {
        var _this = this;
        return function (error, value) {
            if (error) {
                _this.reject(error);
            }
            else {
                _this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                _this.promise.catch(function () { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    };
    return Deferred;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return {string} user agent string
 */
var getUA = function () {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
};
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap in the Ripple emulator) nor
 * Cordova `onDeviceReady`, which would normally wait for a callback.
 *
 * @return {boolean} isMobileCordova
 */
var isMobileCordova = function () {
    return (typeof window !== 'undefined' &&
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
};
/**
 * Detect React Native.
 *
 * @return {boolean} True if ReactNative environment is detected.
 */
var isReactNative = function () {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
};
/**
 * Detect Node.js.
 *
 * @return {boolean} True if Node.js environment is detected.
 */
var isNodeSdk = function () {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
};

var ERROR_NAME = 'FirebaseError';
var captureStackTrace = Error
    .captureStackTrace;
// Export for faking in tests
function patchCapture(captureFake) {
    var result = captureStackTrace;
    captureStackTrace = captureFake;
    return result;
}
var FirebaseError = /** @class */ (function () {
    function FirebaseError(code, message) {
        this.code = code;
        this.message = message;
        // We want the stack value, if implemented by Error
        if (captureStackTrace) {
            // Patches this.stack, omitted calls above ErrorFactory#create
            captureStackTrace(this, ErrorFactory.prototype.create);
        }
        else {
            try {
                // In case of IE11, stack will be set only after error is raised.
                // https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript
                throw Error.apply(this, arguments);
            }
            catch (err) {
                this.name = ERROR_NAME;
                // Make non-enumerable getter for the property.
                Object.defineProperty(this, 'stack', {
                    get: function () {
                        return err.stack;
                    }
                });
            }
        }
    }
    return FirebaseError;
}());
// Back-door inheritance
FirebaseError.prototype = Object.create(Error.prototype);
FirebaseError.prototype.constructor = FirebaseError;
FirebaseError.prototype.name = ERROR_NAME;
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }
    ErrorFactory.prototype.create = function (code, data) {
        if (data === undefined) {
            data = {};
        }
        var template = this.errors[code];
        var fullCode = this.service + '/' + code;
        var message;
        if (template === undefined) {
            message = 'Error';
        }
        else {
            message = template.replace(this.pattern, function (match, key) {
                var value = data[key];
                return value !== undefined ? value.toString() : '<' + key + '?>';
            });
        }
        // Service: Error message (service/code).
        message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
        var err = new FirebaseError(fullCode, message);
        // Populate the Error object with message parts for programmatic
        // accesses (e.g., e.file).
        for (var prop in data) {
            if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                continue;
            }
            err[prop] = data[prop];
        }
        return err;
    };
    return ErrorFactory;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {{header: *, claims: *, data: *, signature: string}}
 */
var decode = function (token) {
    var header = {}, claims = {}, data = {}, signature = '';
    try {
        var parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header: header,
        claims: claims,
        data: data,
        signature: signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isValidTimestamp = function (token) {
    var claims = decode(token).claims, now = Math.floor(new Date().getTime() / 1000), validSince, validUntil;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (now && validSince && validUntil && now >= validSince && now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {?number}
 */
var issuedAtTime = function (token) {
    var claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time and non-empty
 * signature.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isValidFormat = function (token) {
    var decoded = decode(token), claims = decoded.claims;
    return (!!decoded.signature &&
        !!claims &&
        typeof claims === 'object' &&
        claims.hasOwnProperty('iat'));
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isAdmin = function (token) {
    var claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// See http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/
var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var safeGet = function (obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
        return obj[key];
    // else return undefined.
};
/**
 * Enumerates the keys/values in an object, excluding keys defined on the prototype.
 *
 * @param {?Object.<K,V>} obj Object to enumerate.
 * @param {!function(K, V)} fn Function to call for each key and value.
 * @template K,V
 */
var forEach = function (obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn(key, obj[key]);
        }
    }
};
/**
 * Copies all the (own) properties from one object to another.
 * @param {!Object} objTo
 * @param {!Object} objFrom
 * @return {!Object} objTo
 */
var extend = function (objTo, objFrom) {
    forEach(objFrom, function (key, value) {
        objTo[key] = value;
    });
    return objTo;
};
/**
 * Returns a clone of the specified object.
 * @param {!Object} obj
 * @return {!Object} cloned obj.
 */
var clone = function (obj) {
    return extend({}, obj);
};
/**
 * Returns true if obj has typeof "object" and is not null.  Unlike goog.isObject(), does not return true
 * for functions.
 *
 * @param obj {*} A potential object.
 * @returns {boolean} True if it's an object.
 */
var isNonNullObject = function (obj) {
    return typeof obj === 'object' && obj !== null;
};
var isEmpty = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};
var getCount = function (obj) {
    var rv = 0;
    for (var key in obj) {
        rv++;
    }
    return rv;
};
var map = function (obj, f, opt_obj) {
    var res = {};
    for (var key in obj) {
        res[key] = f.call(opt_obj, obj[key], key, obj);
    }
    return res;
};
var findKey = function (obj, fn, opt_this) {
    for (var key in obj) {
        if (fn.call(opt_this, obj[key], key, obj)) {
            return key;
        }
    }
    return undefined;
};
var findValue = function (obj, fn, opt_this) {
    var key = findKey(obj, fn, opt_this);
    return key && obj[key];
};
var getAnyKey = function (obj) {
    for (var key in obj) {
        return key;
    }
};
var getValues = function (obj) {
    var res = [];
    var i = 0;
    for (var key in obj) {
        res[i++] = obj[key];
    }
    return res;
};
/**
 * Tests whether every key/value pair in an object pass the test implemented
 * by the provided function
 *
 * @param {?Object.<K,V>} obj Object to test.
 * @param {!function(K, V)} fn Function to call for each key and value.
 * @template K,V
 */
var every = function (obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (!fn(key, obj[key])) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a params
 * object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 *
 * @param {!Object} querystringParams
 * @return {string}
 */
var querystring = function (querystringParams) {
    var params = [];
    forEach(querystringParams, function (key, value) {
        if (Array.isArray(value)) {
            value.forEach(function (arrayVal) {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    });
    return params.length ? '&' + params.join('&') : '';
};
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object (e.g. {arg: 'val', arg2: 'val2'})
 *
 * @param {string} querystring
 * @return {!Object}
 */
var querystringDecode = function (querystring) {
    var obj = {};
    var tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(function (token) {
        if (token) {
            var key = token.split('=');
            obj[key[0]] = key[1];
        }
    });
    return obj;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Abstract cryptographic hash interface.
 *
 * See Sha1 and Md5 for sample implementations.
 *
 */
/**
 * Create a cryptographic hash instance.
 *
 * @constructor
 * @struct
 */
var Hash = /** @class */ (function () {
    function Hash() {
        /**
         * The block size for the hasher.
         * @type {number}
         */
        this.blockSize = -1;
    }
    return Hash;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @extends {Hash}
 * @final
 * @struct
 */
var Sha1 = /** @class */ (function (_super) {
    tslib_1.__extends(Sha1, _super);
    function Sha1() {
        var _this = _super.call(this) || this;
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @type {!Array<number>}
         * @private
         */
        _this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @type {!Array<number>}
         * @private
         */
        _this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @type {!Array<number>}
         * @private
         */
        _this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @type {!Array<number>}
         * @private
         */
        _this.pad_ = [];
        /**
         * @private {number}
         */
        _this.inbuf_ = 0;
        /**
         * @private {number}
         */
        _this.total_ = 0;
        _this.blockSize = 512 / 8;
        _this.pad_[0] = 128;
        for (var i = 1; i < _this.blockSize; ++i) {
            _this.pad_[i] = 0;
        }
        _this.reset();
        return _this;
    }
    Sha1.prototype.reset = function () {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    };
    /**
     * Internal compress helper function.
     * @param {!Array<number>|!Uint8Array|string} buf Block to compress.
     * @param {number=} opt_offset Offset of the block in the buffer.
     * @private
     */
    Sha1.prototype.compress_ = function (buf, opt_offset) {
        if (!opt_offset) {
            opt_offset = 0;
        }
        var W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (var i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(opt_offset) << 24) |
                        (buf.charCodeAt(opt_offset + 1) << 16) |
                        (buf.charCodeAt(opt_offset + 2) << 8) |
                        buf.charCodeAt(opt_offset + 3);
                opt_offset += 4;
            }
        }
        else {
            for (var i = 0; i < 16; i++) {
                W[i] =
                    (buf[opt_offset] << 24) |
                        (buf[opt_offset + 1] << 16) |
                        (buf[opt_offset + 2] << 8) |
                        buf[opt_offset + 3];
                opt_offset += 4;
            }
        }
        // expand to 80 words
        for (var i = 16; i < 80; i++) {
            var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        var a = this.chain_[0];
        var b = this.chain_[1];
        var c = this.chain_[2];
        var d = this.chain_[3];
        var e = this.chain_[4];
        var f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (var i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    };
    Sha1.prototype.update = function (bytes, opt_length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (opt_length === undefined) {
            opt_length = bytes.length;
        }
        var lengthMinusBlock = opt_length - this.blockSize;
        var n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        var buf = this.buf_;
        var inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < opt_length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf == 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < opt_length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < opt_length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += opt_length;
    };
    /** @override */
    Sha1.prototype.digest = function () {
        var digest = [];
        var totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (var i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        var n = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    };
    return Sha1;
}(Hash));

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /** @class */ (function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(function () {
            executor(_this);
        })
            .catch(function (e) {
            _this.error(e);
        });
    }
    ObserverProxy.prototype.next = function (value) {
        this.forEachObserver(function (observer) {
            observer.next(value);
        });
    };
    ObserverProxy.prototype.error = function (error) {
        this.forEachObserver(function (observer) {
            observer.error(error);
        });
        this.close(error);
    };
    ObserverProxy.prototype.complete = function () {
        this.forEachObserver(function (observer) {
            observer.complete();
        });
        this.close();
    };
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
        var _this = this;
        var observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error: error,
                complete: complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        var unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            this.task.then(function () {
                try {
                    if (_this.finalError) {
                        observer.error(_this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    };
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    ObserverProxy.prototype.unsubscribeOne = function (i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    };
    ObserverProxy.prototype.forEachObserver = function (fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (var i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    };
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    ObserverProxy.prototype.sendOne = function (i, fn) {
        var _this = this;
        // Execute the callback asynchronously
        this.task.then(function () {
            if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                try {
                    fn(_this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    };
    ObserverProxy.prototype.close = function (err) {
        var _this = this;
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        this.task.then(function () {
            _this.observers = undefined;
            _this.onNoObservers = undefined;
        });
    };
    return ObserverProxy;
}());
/** Turn synchronous function into one called asynchronously. */
function async(fn, onError) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Promise.resolve(true)
            .then(function () {
            fn.apply(void 0, args);
        })
            .catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param {!string} fnName The function name
 * @param {!number} minCount The minimum number of arguments to allow for the function call
 * @param {!number} maxCount The maximum number of argument to allow for the function call
 * @param {!number} argCount The actual number of arguments provided.
 */
var validateArgCount = function (fnName, minCount, maxCount, argCount) {
    var argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        var error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param {!string} fnName The function name
 * @param {!number} argumentNumber The index of the argument
 * @param {boolean} optional Whether or not the argument is optional
 * @return {!string} The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argumentNumber, optional) {
    var argName = '';
    switch (argumentNumber) {
        case 1:
            argName = optional ? 'first' : 'First';
            break;
        case 2:
            argName = optional ? 'second' : 'Second';
            break;
        case 3:
            argName = optional ? 'third' : 'Third';
            break;
        case 4:
            argName = optional ? 'fourth' : 'Fourth';
            break;
        default:
            throw new Error('errorPrefix called with argumentNumber > 4.  Need to update it?');
    }
    var error = fnName + ' failed: ';
    error += argName + ' argument ';
    return error;
}
/**
 * @param {!string} fnName
 * @param {!number} argumentNumber
 * @param {!string} namespace
 * @param {boolean} optional
 */
function validateNamespace(fnName, argumentNumber, namespace, optional) {
    if (optional && !namespace)
        return;
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentNumber, callback, optional) {
    if (optional && !callback)
        return;
    if (typeof callback !== 'function')
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid function.');
}
function validateContextObject(fnName, argumentNumber, context, optional) {
    if (optional && !context)
        return;
    if (typeof context !== 'object' || context === null)
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid context object.');
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray$1 = function (str) {
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            var high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = function (str) {
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.assert = assert;
exports.assertionError = assertionError;
exports.base64 = base64;
exports.base64Decode = base64Decode;
exports.base64Encode = base64Encode;
exports.CONSTANTS = CONSTANTS;
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.patchProperty = patchProperty;
exports.Deferred = Deferred;
exports.getUA = getUA;
exports.isMobileCordova = isMobileCordova;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.ErrorFactory = ErrorFactory;
exports.FirebaseError = FirebaseError;
exports.patchCapture = patchCapture;
exports.jsonEval = jsonEval;
exports.stringify = stringify;
exports.decode = decode;
exports.isAdmin = isAdmin;
exports.issuedAtTime = issuedAtTime;
exports.isValidFormat = isValidFormat;
exports.isValidTimestamp = isValidTimestamp;
exports.clone = clone;
exports.contains = contains;
exports.every = every;
exports.extend = extend;
exports.findKey = findKey;
exports.findValue = findValue;
exports.forEach = forEach;
exports.getAnyKey = getAnyKey;
exports.getCount = getCount;
exports.getValues = getValues;
exports.isEmpty = isEmpty;
exports.isNonNullObject = isNonNullObject;
exports.map = map;
exports.safeGet = safeGet;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.Sha1 = Sha1;
exports.async = async;
exports.createSubscribe = createSubscribe;
exports.errorPrefix = errorPrefix;
exports.validateArgCount = validateArgCount;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateNamespace = validateNamespace;
exports.stringLength = stringLength;
exports.stringToByteArray = stringToByteArray$1;


/***/ }),

/***/ "./node_modules/firebase/app/dist/index.cjs.js":
/*!*****************************************************!*\
  !*** ./node_modules/firebase/app/dist/index.cjs.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

__webpack_require__(/*! @firebase/polyfill */ "./node_modules/@firebase/polyfill/dist/index.esm.js");
var firebase = _interopDefault(__webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/index.cjs.js"));

/**
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = firebase;


/***/ }),

/***/ "./node_modules/firebase/auth/dist/index.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/firebase/auth/dist/index.esm.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/auth */ "./node_modules/@firebase/auth/dist/auth.js");
/* harmony import */ var _firebase_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_firebase_auth__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/***/ }),

/***/ "./node_modules/js-priority-queue/priority-queue.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/js-priority-queue/priority-queue.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(t){if(true)module.exports=t();else { var e; }}(function(){return function t(e,i,r){function o(n,s){if(!i[n]){if(!e[n]){var h="function"==typeof require&&require;if(!s&&h)return require(n,!0);if(a)return a(n,!0);var u=new Error("Cannot find module '"+n+"'");throw u.code="MODULE_NOT_FOUND",u}var p=i[n]={exports:{}};e[n][0].call(p.exports,function(t){var i=e[n][1][t];return o(i?i:t)},p,p.exports,t,e,i,r)}return i[n].exports}for(var a="function"==typeof require&&require,n=0;n<r.length;n++)o(r[n]);return o}({1:[function(t,e,i){var r,o,a,n,s,h=function(t,e){function i(){this.constructor=t}for(var r in e)u.call(e,r)&&(t[r]=e[r]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},u={}.hasOwnProperty;r=t("./PriorityQueue/AbstractPriorityQueue"),o=t("./PriorityQueue/ArrayStrategy"),n=t("./PriorityQueue/BinaryHeapStrategy"),a=t("./PriorityQueue/BHeapStrategy"),s=function(t){function e(t){t||(t={}),t.strategy||(t.strategy=n),t.comparator||(t.comparator=function(t,e){return(t||0)-(e||0)}),e.__super__.constructor.call(this,t)}return h(e,t),e}(r),s.ArrayStrategy=o,s.BinaryHeapStrategy=n,s.BHeapStrategy=a,e.exports=s},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(t,e,i){var r;e.exports=r=function(){function t(t){var e;if(null==(null!=t?t.strategy:void 0))throw"Must pass options.strategy, a strategy";if(null==(null!=t?t.comparator:void 0))throw"Must pass options.comparator, a comparator";this.priv=new t.strategy(t),this.length=(null!=t&&null!=(e=t.initialValues)?e.length:void 0)||0}return t.prototype.queue=function(t){this.length++,this.priv.queue(t)},t.prototype.dequeue=function(t){if(!this.length)throw"Empty queue";return this.length--,this.priv.dequeue()},t.prototype.peek=function(t){if(!this.length)throw"Empty queue";return this.priv.peek()},t.prototype.clear=function(){return this.length=0,this.priv.clear()},t}()},{}],3:[function(t,e,i){var r,o;o=function(t,e,i){var r,o,a;for(o=0,r=t.length;r>o;)a=o+r>>>1,i(t[a],e)>=0?o=a+1:r=a;return o},e.exports=r=function(){function t(t){var e;this.options=t,this.comparator=this.options.comparator,this.data=(null!=(e=this.options.initialValues)?e.slice(0):void 0)||[],this.data.sort(this.comparator).reverse()}return t.prototype.queue=function(t){var e;e=o(this.data,t,this.comparator),this.data.splice(e,0,t)},t.prototype.dequeue=function(){return this.data.pop()},t.prototype.peek=function(){return this.data[this.data.length-1]},t.prototype.clear=function(){this.data.length=0},t}()},{}],4:[function(t,e,i){var r;e.exports=r=function(){function t(t){var e,i,r,o,a,n,s,h,u;for(this.comparator=(null!=t?t.comparator:void 0)||function(t,e){return t-e},this.pageSize=(null!=t?t.pageSize:void 0)||512,this.length=0,h=0;1<<h<this.pageSize;)h+=1;if(1<<h!==this.pageSize)throw"pageSize must be a power of two";for(this._shift=h,this._emptyMemoryPageTemplate=e=[],i=r=0,n=this.pageSize;n>=0?n>r:r>n;i=n>=0?++r:--r)e.push(null);if(this._memory=[],this._mask=this.pageSize-1,t.initialValues)for(s=t.initialValues,o=0,a=s.length;a>o;o++)u=s[o],this.queue(u)}return t.prototype.queue=function(t){this.length+=1,this._write(this.length,t),this._bubbleUp(this.length,t)},t.prototype.dequeue=function(){var t,e;return t=this._read(1),e=this._read(this.length),this.length-=1,this.length>0&&(this._write(1,e),this._bubbleDown(1,e)),t},t.prototype.peek=function(){return this._read(1)},t.prototype.clear=function(){this.length=0,this._memory.length=0},t.prototype._write=function(t,e){var i;for(i=t>>this._shift;i>=this._memory.length;)this._memory.push(this._emptyMemoryPageTemplate.slice(0));return this._memory[i][t&this._mask]=e},t.prototype._read=function(t){return this._memory[t>>this._shift][t&this._mask]},t.prototype._bubbleUp=function(t,e){var i,r,o,a;for(i=this.comparator;t>1&&(r=t&this._mask,t<this.pageSize||r>3?o=t&~this._mask|r>>1:2>r?(o=t-this.pageSize>>this._shift,o+=o&~(this._mask>>1),o|=this.pageSize>>1):o=t-2,a=this._read(o),!(i(a,e)<0));)this._write(o,e),this._write(t,a),t=o},t.prototype._bubbleDown=function(t,e){var i,r,o,a,n;for(n=this.comparator;t<this.length;)if(t>this._mask&&!(t&this._mask-1)?i=r=t+2:t&this.pageSize>>1?(i=(t&~this._mask)>>1,i|=t&this._mask>>1,i=i+1<<this._shift,r=i+1):(i=t+(t&this._mask),r=i+1),i!==r&&r<=this.length)if(o=this._read(i),a=this._read(r),n(o,e)<0&&n(o,a)<=0)this._write(i,e),this._write(t,o),t=i;else{if(!(n(a,e)<0))break;this._write(r,e),this._write(t,a),t=r}else{if(!(i<=this.length))break;if(o=this._read(i),!(n(o,e)<0))break;this._write(i,e),this._write(t,o),t=i}},t}()},{}],5:[function(t,e,i){var r;e.exports=r=function(){function t(t){var e;this.comparator=(null!=t?t.comparator:void 0)||function(t,e){return t-e},this.length=0,this.data=(null!=(e=t.initialValues)?e.slice(0):void 0)||[],this._heapify()}return t.prototype._heapify=function(){var t,e,i;if(this.data.length>0)for(t=e=1,i=this.data.length;i>=1?i>e:e>i;t=i>=1?++e:--e)this._bubbleUp(t)},t.prototype.queue=function(t){this.data.push(t),this._bubbleUp(this.data.length-1)},t.prototype.dequeue=function(){var t,e;return e=this.data[0],t=this.data.pop(),this.data.length>0&&(this.data[0]=t,this._bubbleDown(0)),e},t.prototype.peek=function(){return this.data[0]},t.prototype.clear=function(){this.length=0,this.data.length=0},t.prototype._bubbleUp=function(t){for(var e,i;t>0&&(e=t-1>>>1,this.comparator(this.data[t],this.data[e])<0);)i=this.data[e],this.data[e]=this.data[t],this.data[t]=i,t=e},t.prototype._bubbleDown=function(t){var e,i,r,o,a;for(e=this.data.length-1;;){if(i=(t<<1)+1,o=i+1,r=t,e>=i&&this.comparator(this.data[i],this.data[r])<0&&(r=i),e>=o&&this.comparator(this.data[o],this.data[r])<0&&(r=o),r===t)break;a=this.data[r],this.data[r]=this.data[t],this.data[t]=a,t=r}},t}()},{}]},{},[1])(1)});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/global/inventory.js":
/*!*********************************!*\
  !*** ./src/global/inventory.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefabs_battle_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefabs/battle/item */ "./src/prefabs/battle/item.js");
/* harmony import */ var _prefabs_hud_item_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prefabs/hud/item-menu-item */ "./src/prefabs/hud/item-menu-item.js");
/* harmony import */ var _prefabs_battle_unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prefabs/battle/unit */ "./src/prefabs/battle/unit.js");
/* harmony import */ var _prefabs_battle_potion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prefabs/battle/potion */ "./src/prefabs/battle/potion.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





/**
 * Allosw you to collect items in the game
 */

var Inventory =
/*#__PURE__*/
function () {
  function Inventory() {
    _classCallCheck(this, Inventory);

    this.items = [];
    this.itemClasses = {
      "potion": _prefabs_battle_potion__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor
    };
  } //#region public methods

  /**
   * Allows you to know if there is at least one item by type
   * @param {string} type
   * @returns {boolean} true or false
   */


  _createClass(Inventory, [{
    key: "hasItem",
    value: function hasItem(type) {
      return this.items[type].amount > 0;
    }
    /**
     * Use one item of a specific type
     * @param {string} type 
     * @param {Unit} target 
     */

  }, {
    key: "useItem",
    value: function useItem(type, target) {
      this.items[type].prefab.use(target);
      this.items[type].amount--;
    }
    /**
     * Allows you to know if there is items in the array list
     * @returns {boolean}
     */

  }, {
    key: "hasItems",
    value: function hasItems() {
      for (var type in this.items) {
        if (this.items[type].amount > 0) {
          return true;
        }
      }

      return false;
    }
    /**
     * Creates the menu in the specific scene, and binds it with items
     * @param {Scene} scene 
     * @param {menu} itemsMenu 
     * @todo Moves all the code in ItemsMenu, it have to be there !!
     */

  }, {
    key: "createMenu",
    value: function createMenu(scene, itemsMenu) {
      var itemPosition = {
        x: itemsMenu.x,
        y: itemsMenu.y
      };

      for (var itemType in this.items) {
        var menuItem = this.createMenuItem(itemType, scene, itemPosition);
        itemsMenu.items.push(menuItem);
      }

      itemsMenu.enable(false);
    }
    /**
     * Creates one item for the menu
     * @returns {ItemMenuItem} new Item
     * @todo puts the code out there
     */

  }, {
    key: "createMenuItem",
    value: function createMenuItem(itemType, scene, position) {
      var prefab = this.items[itemType].prefab;
      var amount = this.items[itemType].amount;
      var name = itemType + 'MenuItem';
      var setting = {
        group: 'hud',
        texture: prefab.itemTexture,
        itemName: itemType,
        amount: amount
      };
      var menuItem = new _prefabs_hud_item_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"](scene, name, position, setting);
      menuItem.setOrigin(0);
      return menuItem;
    }
    /**
     * Collects a new item from a scene
     */

  }, {
    key: "collect",
    value: function collect(scene, item) {
      this.updateQuantity(item, 1, scene);
    } //#endregion
    //#region internal methods

    /**
     * Updates quantity of a type of item
     * @param {string} type 
     * @param {number} newValue 
     */

  }, {
    key: "updateQuantity",
    value: function updateQuantity(item, newValue, scene) {
      if (this.items[item.type]) {
        this.items[item.type].amount += newValue;
      } else {
        var position = {
          x: 0,
          y: 0
        };
        var newItem = new this.itemClasses[item.type](scene, item.type, position, item.properties);
        this.items[item.type] = {
          prefab: newItem,
          amount: 1
        };
      }
    } //#endregion

  }]);

  return Inventory;
}();

/* harmony default export */ __webpack_exports__["default"] = (Inventory);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _scenes_world_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/world-scene */ "./src/scenes/world-scene.js");
/* harmony import */ var _scenes_boot_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/boot-scene */ "./src/scenes/boot-scene.js");
/* harmony import */ var _scenes_loading_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/loading-scene */ "./src/scenes/loading-scene.js");
/* harmony import */ var _scenes_battle_scene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/battle-scene */ "./src/scenes/battle-scene.js");
/* harmony import */ var _global_inventory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/inventory */ "./src/global/inventory.js");
/* harmony import */ var _scenes_pause_scene__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/pause-scene */ "./src/scenes/pause-scene.js");








var TITLE_SCENE_KEY = 'TitleScene';
var BOOT_SCENE_KEY = 'BootScene';
var LOADING_SCENE_KEY = 'LoadingScene';
var WORLD_SCENE_KEY = 'WorldScene';
var BATTLE_SCENE_KEY = 'BattleScene';
var PAUSE_SCENE_KEY = 'PauseScene';
var titleScene = new _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__["default"]();
var bootScene = new _scenes_boot_scene__WEBPACK_IMPORTED_MODULE_3__["default"]();
var loadingScene = new _scenes_loading_scene__WEBPACK_IMPORTED_MODULE_4__["default"]();
var worldScene = new _scenes_world_scene__WEBPACK_IMPORTED_MODULE_2__["default"]();
var battleScene = new _scenes_battle_scene__WEBPACK_IMPORTED_MODULE_5__["default"]();
var pauseScene = new _scenes_pause_scene__WEBPACK_IMPORTED_MODULE_7__["default"]();
var firebaseConfig = {
  apiKey: "AIzaSyAYCmzH46SO8DzATChqQTAwRHTIeQtZG-s",
  authDomain: "phaserrpgtest-001.firebaseapp.com",
  databaseURL: "https://phaserrpgtest-001.firebaseio.com",
  projectId: "phaserrpgtest-001",
  storageBucket: "",
  messagingSenderId: "119332254887",
  appId: "1:119332254887:web:dc3d7ed526849328"
}; // Initialize Firebase

firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(firebaseConfig);
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
game.inventory = new _global_inventory__WEBPACK_IMPORTED_MODULE_6__["default"]();
game.scene.add(TITLE_SCENE_KEY, titleScene);
game.scene.add(WORLD_SCENE_KEY, worldScene);
game.scene.add(BOOT_SCENE_KEY, bootScene);
game.scene.add(LOADING_SCENE_KEY, loadingScene);
game.scene.add(BATTLE_SCENE_KEY, battleScene);
game.scene.add(PAUSE_SCENE_KEY, pauseScene);
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

/***/ "./src/prefabs/battle/attack.js":
/*!**************************************!*\
  !*** ./src/prefabs/battle/attack.js ***!
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



/**
* Enemy unit (during a battle)
*/

var Attack =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Attack, _Prefab);

  function Attack(scene, name, position, properties) {
    _classCallCheck(this, Attack);

    return _possibleConstructorReturn(this, _getPrototypeOf(Attack).call(this, scene, name, position, properties));
  } //#region public methods

  /**
   * Launches an attack
   * @param {Unit} target 
   */


  _createClass(Attack, [{
    key: "hit",
    value: function hit(target) {
      var damage = this.computeDamage(target);
      target.receiveDamage(damage);
      this.doMoreActionsDuringHit();
      this.owner.anims.play(this.owner.name + '_' + this.defineAnimationToPlay());
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Attack.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.owner = properties.owner;
    }
    /**
     * Defines the animation key to play
     */

  }, {
    key: "defineAnimationToPlay",
    value: function defineAnimationToPlay() {
      return 'attack1';
    }
    /**
     * Here, you can do everything more, by overriding method
     */

  }, {
    key: "doMoreActionsDuringHit",
    value: function doMoreActionsDuringHit() {}
    /**
     * Defines random value to attack multiplier
     */

  }, {
    key: "defineAttackMultiplier",
    value: function defineAttackMultiplier() {
      return this.scene.random.realInRange(0.8, 1.2);
    }
    /**
     * Defines random value to defense multiplier
     */

  }, {
    key: "defineDefenseMultiplier",
    value: function defineDefenseMultiplier() {
      return this.scene.random.realInRange(0.8, 1.2);
    }
    /**
     * Defines the attack point value
     */

  }, {
    key: "getAttackPoint",
    value: function getAttackPoint() {
      return this.owner.stats.attack;
    } //#endregion  
    //#region internal methods

    /**
    * Compute damages to put on unit target
    * @param {Unit} target 
    */

  }, {
    key: "computeDamage",
    value: function computeDamage(target) {
      var attackMultiplier = this.defineAttackMultiplier();
      var defenseMultiplier = this.defineDefenseMultiplier();
      var realAttackPoints = attackMultiplier * this.getAttackPoint();
      var realDefenseUnitPoints = defenseMultiplier * target.stats.defense;
      var damage = Math.max(0, Math.round(realAttackPoints - realDefenseUnitPoints));
      return damage;
    } //#endregion

  }]);

  return Attack;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Attack);

/***/ }),

/***/ "./src/prefabs/battle/boss-unit.js":
/*!*****************************************!*\
  !*** ./src/prefabs/battle/boss-unit.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unit */ "./src/prefabs/battle/unit.js");
/* harmony import */ var _physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physical-attack */ "./src/prefabs/battle/physical-attack.js");
/* harmony import */ var _enemy_unit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enemy-unit */ "./src/prefabs/battle/enemy-unit.js");
/* harmony import */ var _magical_attack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./magical-attack */ "./src/prefabs/battle/magical-attack.js");
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
 * Boss unit (during a battle)
 */

var BossUnit =
/*#__PURE__*/
function (_EnemyUnit) {
  _inherits(BossUnit, _EnemyUnit);

  function BossUnit(scene, name, position, properties) {
    _classCallCheck(this, BossUnit);

    return _possibleConstructorReturn(this, _getPrototypeOf(BossUnit).call(this, scene, name, position, properties));
  } //#region public methods  


  _createClass(BossUnit, [{
    key: "playAction",
    value: function playAction() {
      switch (this.currentState) {
        case 'default':
          this.playDefaultAction();
          break;

        case 'special':
          this.playSpecialAction();
          break;

        case 'enraged':
          this.playEnragedAction();
          break;
      }

      this.selectNextState();
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(BossUnit.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.SPECIAL_ATTACK_THRESHOLD = 0.5;
      this.prepareSpecialAttack();
      this.maxHealth = this.stats.health;
      this.enraged = false;
      this.currentState = 'default';
    } //#endregion
    //#region internal methods

  }, {
    key: "selectNextState",
    value: function selectNextState() {
      this.currentState = 'default';

      switch (this.currentState) {
        case 'default':
          if (this.stats.health < 0.5 * this.maxHealth && !this.enraged) {
            this.enraged = true;
            this.currentState = 'enraged';
          } else {
            var randomValue = this.scene.random.frac();

            if (randomValue < this.SPECIAL_ATTACK_THRESHOLD) {
              this.currentState = 'special';
            }
          }

          break;
      }

      console.log('selectNextState', this.currentState);
    }
    /**
     * Default action, as the same as parent
     */

  }, {
    key: "playDefaultAction",
    value: function playDefaultAction() {
      console.log('default act');

      _get(_getPrototypeOf(BossUnit.prototype), "playAction", this).call(this);
    }
    /**
     * Special action
     */

  }, {
    key: "playSpecialAction",
    value: function playSpecialAction() {
      console.log('special act');

      _get(_getPrototypeOf(BossUnit.prototype), "playActionWithAttack", this).call(this, this.specialAttack);
    }
    /**
     * Enraged action
     */

  }, {
    key: "playEnragedAction",
    value: function playEnragedAction() {
      var _this = this;

      console.log('enraged act');
      this.scene.groups[this.targetUnits].children.each(function (target) {
        if (target.active) {
          _this.specialAttack.hit(target);
        }
      }, this);
    }
    /**
     * Creates a special attack
     */

  }, {
    key: "prepareSpecialAttack",
    value: function prepareSpecialAttack() {
      var position = {
        x: 0,
        y: 0
      };
      var setting = {
        group: 'attacks',
        owner: this
      };
      this.specialAttack = new _magical_attack__WEBPACK_IMPORTED_MODULE_5__["default"](this.scene, this.name + 'SpecialAttack', position, setting);
    } //#endregion

  }]);

  return BossUnit;
}(_enemy_unit__WEBPACK_IMPORTED_MODULE_4__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (BossUnit);

/***/ }),

/***/ "./src/prefabs/battle/enemy-unit.js":
/*!******************************************!*\
  !*** ./src/prefabs/battle/enemy-unit.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unit */ "./src/prefabs/battle/unit.js");
/* harmony import */ var _physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physical-attack */ "./src/prefabs/battle/physical-attack.js");
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
 * Enemy unit (during a battle)
 */

var EnemyUnit =
/*#__PURE__*/
function (_Unit) {
  _inherits(EnemyUnit, _Unit);

  function EnemyUnit(scene, name, position, properties) {
    _classCallCheck(this, EnemyUnit);

    return _possibleConstructorReturn(this, _getPrototypeOf(EnemyUnit).call(this, scene, name, position, properties));
  } //#region public methods  

  /**
   * Launches an attack 
   */


  _createClass(EnemyUnit, [{
    key: "playAction",
    value: function playAction() {
      this.playActionWithAttack(this.attack);
    }
    /**
     * Destroys enemy unit
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.active) {
        var menuItem = this.scene.prefabs[this.name + 'Item'];

        if (menuItem) {
          menuItem.destroy();
        }

        _get(_getPrototypeOf(EnemyUnit.prototype), "destroy", this).call(this);
      }
    } //#endregion
    //#region protected methods

    /**
     * Plays an action to attack or choose item
     * @param {Attack} attackAction 
     */

  }, {
    key: "playActionWithAttack",
    value: function playActionWithAttack(attackAction) {
      this.scene.prefabs.showPlayerUnit.display(false);
      var target = this.chooseTarget();
      attackAction.hit(target);
    }
  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(EnemyUnit.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.targetUnits = properties.targetUnits;
      this.prepareAttack();
    } //#endregion
    //#region internal methods

  }, {
    key: "prepareAttack",
    value: function prepareAttack() {
      var key = this.name + '_' + 'attack';
      var position = {
        x: 0,
        y: 0
      };
      var setting = {
        group: 'attacks',
        owner: this
      };
      this.attack = new _physical_attack__WEBPACK_IMPORTED_MODULE_3__["default"](this.scene, key, position, setting);
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
    } //#endregion

  }]);

  return EnemyUnit;
}(_unit__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (EnemyUnit);

/***/ }),

/***/ "./src/prefabs/battle/item.js":
/*!************************************!*\
  !*** ./src/prefabs/battle/item.js ***!
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



/**
 * Represents an item (potion, ...)
 */

var Item =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Item, _Prefab);

  function Item(scene, name, position, properties) {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _getPrototypeOf(Item).call(this, scene, name, position, properties));
  } //#region public methods

  /**
   * Uses the item, applied to unit
   * @param {Unit} target 
   */


  _createClass(Item, [{
    key: "use",
    value: function use(target) {
      console.log('using item');
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Item.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.itemTexture = properties.itemTexture;
    } //#endregion
    //#region internal methods
    //#endregion

  }]);

  return Item;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Item);

/***/ }),

/***/ "./src/prefabs/battle/magical-attack.js":
/*!**********************************************!*\
  !*** ./src/prefabs/battle/magical-attack.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attack */ "./src/prefabs/battle/attack.js");
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
* Enemy unit (during a battle)
*/

var MagicalAttack =
/*#__PURE__*/
function (_Attack) {
  _inherits(MagicalAttack, _Attack);

  function MagicalAttack(scene, name, position, properties) {
    _classCallCheck(this, MagicalAttack);

    return _possibleConstructorReturn(this, _getPrototypeOf(MagicalAttack).call(this, scene, name, position, properties));
  } //#region protected methods


  _createClass(MagicalAttack, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(MagicalAttack.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.manaCost = properties.manaCost;
    }
  }, {
    key: "defineAttackMultiplier",
    value: function defineAttackMultiplier() {
      return this.scene.random.realInRange(0.9, 1.3);
    }
  }, {
    key: "defineDefenseMultiplier",
    value: function defineDefenseMultiplier() {
      return this.scene.random.realInRange(0.7, 1.1);
    }
  }, {
    key: "getAttackPoint",
    value: function getAttackPoint() {
      return this.owner.stats.magicAttack;
    }
  }, {
    key: "doMoreActionsDuringHit",
    value: function doMoreActionsDuringHit() {
      this.owner.stats.mana -= this.manaCost;
    }
  }, {
    key: "defineAnimationToPlay",
    value: function defineAnimationToPlay() {
      return 'attack2';
    } //#endregion

  }]);

  return MagicalAttack;
}(_attack__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MagicalAttack);

/***/ }),

/***/ "./src/prefabs/battle/physical-attack.js":
/*!***********************************************!*\
  !*** ./src/prefabs/battle/physical-attack.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attack */ "./src/prefabs/battle/attack.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
* Enemy unit (during a battle)
*/

var PhysicalAttack =
/*#__PURE__*/
function (_Attack) {
  _inherits(PhysicalAttack, _Attack);

  function PhysicalAttack(scene, name, position, properties) {
    _classCallCheck(this, PhysicalAttack);

    return _possibleConstructorReturn(this, _getPrototypeOf(PhysicalAttack).call(this, scene, name, position, properties));
  }

  return PhysicalAttack;
}(_attack__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PhysicalAttack);

/***/ }),

/***/ "./src/prefabs/battle/player-unit.js":
/*!*******************************************!*\
  !*** ./src/prefabs/battle/player-unit.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unit */ "./src/prefabs/battle/unit.js");
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
 * Enemy unit (during a battle)
 */

var PlayerUnit =
/*#__PURE__*/
function (_Unit) {
  _inherits(PlayerUnit, _Unit);

  function PlayerUnit(scene, name, position, properties) {
    var _this;

    _classCallCheck(this, PlayerUnit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayerUnit).call(this, scene, name, position, properties));
    _this.experience = 0;
    _this.currentLevel = 0;
    _this.faceTexture = properties.faceTexture;
    return _this;
  } //#region public methods  

  /**
   * Launches an attack, or choose an element (potion, ...)
   */


  _createClass(PlayerUnit, [{
    key: "playAction",
    value: function playAction() {
      this.scene.prefabs.showPlayerUnit.display(true);
      this.updateStatusBar();
      this.scene.activateActionsMenu();
    }
    /**
     * Upgrades experience 
     * @param {number} value 
     */

  }, {
    key: "receiveExperience",
    value: function receiveExperience(value) {
      this.experience += value;
      this.verifyLevel();
    } //#endregion
    //#region internal methods

    /**
     * Changes informations in the status bar (the unit face, the texture, the hp, ...)
     */

  }, {
    key: "updateStatusBar",
    value: function updateStatusBar() {
      this.scene.prefabs.showPlayerUnit.change(this, this.faceTexture);
    }
    /**
     * Verifies level value, and updates if necessary
     */

  }, {
    key: "verifyLevel",
    value: function verifyLevel() {
      var levelData = this.scene.experienceTable[this.currentLevel];

      if (this.experience >= levelData.requiredExperience) {
        this.goToNextLevel();
        this.upgradeStats(levelData);
      }
    }
    /**
     * Go to the next level
     */

  }, {
    key: "goToNextLevel",
    value: function goToNextLevel() {
      this.currentLevel++;
      this.experience = 0;
    }
    /**
     * Update stats from new level
     * @param {JSON} levelData 
     */

  }, {
    key: "upgradeStats",
    value: function upgradeStats(levelData) {
      console.log('upgradeStats::0', this.stats);

      for (var stat in levelData.statsIncrease) {
        this.stats[stat] += levelData.statsIncrease[stat];
      }

      console.log('upgradeStats::1', this.stats);
    } //#endregion

  }]);

  return PlayerUnit;
}(_unit__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PlayerUnit);

/***/ }),

/***/ "./src/prefabs/battle/potion.js":
/*!**************************************!*\
  !*** ./src/prefabs/battle/potion.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./item */ "./src/prefabs/battle/item.js");
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
 * Represents an potion item
 */

var Potion =
/*#__PURE__*/
function (_Item) {
  _inherits(Potion, _Item);

  function Potion(scene, name, position, properties) {
    _classCallCheck(this, Potion);

    return _possibleConstructorReturn(this, _getPrototypeOf(Potion).call(this, scene, name, position, properties));
  } //#region public methods 


  _createClass(Potion, [{
    key: "use",
    value: function use(target) {
      console.log('using item::before', target.stats.health);
      target.stats.health = Math.min(100, target.stats.health + this.healthPower);
      console.log('using item::after', target.stats.health);
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Potion.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.healthPower = properties.healthPower;
    } //#endregion
    //#region internal methods
    //#endregion

  }]);

  return Potion;
}(_item__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Potion);

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



/**
 * Unit (player or enemy)
 */

var Unit =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Unit, _Prefab);

  function Unit(scene, name, position, properties) {
    _classCallCheck(this, Unit);

    return _possibleConstructorReturn(this, _getPrototypeOf(Unit).call(this, scene, name, position, properties));
  } //#region public methods  

  /**
   * Lanuches an action 
   */


  _createClass(Unit, [{
    key: "playAction",
    value: function playAction() {
      throw new Error('not implemented');
    }
    /**
     * Calculates current attack turn
     * @param {number} currentTurn 
     */

  }, {
    key: "calculateAttackTurn",
    value: function calculateAttackTurn(currentTurn) {
      console.log('calculateAttackTurn', currentTurn);

      if (typeof currentTurn === 'undefined') {
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
    } //#endregion
    //#region internal methods

  }, {
    key: "receiveDamage",
    value: function receiveDamage(damage) {
      if (this.scene) {
        this.stats.health -= damage;
        this.anims.play(this.name + '_' + 'hit');
        this.displayDamageText(damage);

        if (this.stats.health <= 0) {
          this.stats.health = 0;
          this.destroy();
        }
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
    value: function backToIdle(animation) {
      this.anims.play(this.startingAnimationKey);
      var beginingKey = this.name + '_' + 'attack';

      if (animation.key.startsWith(beginingKey)) {
        this.scene.goToNextTurn();
      }
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

/***/ "./src/prefabs/hud/attack-menu-item.js":
/*!*********************************************!*\
  !*** ./src/prefabs/hud/attack-menu-item.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../battle/physical-attack */ "./src/prefabs/battle/physical-attack.js");
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
 * It represents a specific menu item, to attack in a fight
 */

var AttackMenuItem =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(AttackMenuItem, _MenuItem);

  function AttackMenuItem(scene, name, position, properties) {
    _classCallCheck(this, AttackMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(AttackMenuItem).call(this, scene, name, position, properties));
  } //#region public methods   
  //#endregion
  //#region protected methods


  _createClass(AttackMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(AttackMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      this.setNewAttack();
    }
    /**
     * Sets new attack item (a new turn)
     */

  }, {
    key: "setNewAttack",
    value: function setNewAttack() {
      var position = {
        x: 0,
        y: 0
      };
      var setting = {
        group: 'attacks',
        owner: this.scene.currentUnit
      };
      var key = this.scene.currentUnit.name + '_' + 'attack';
      this.scene.currentAttack = this.getAttackInstance(key, position, setting);
      this.scene.activateActionsMenu(false);
      this.scene.activateEnemysMenu(true);
    }
    /**
     * Gets attack instance
     * @param {string} key 
     * @param {position} position 
     * @param {properties} setting 
     */

  }, {
    key: "getAttackInstance",
    value: function getAttackInstance(key, position, setting) {
      return new _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__["default"](this.scene, key, position, setting);
    } //#endregion

  }]);

  return AttackMenuItem;
}(_menu_item__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (AttackMenuItem);

/***/ }),

/***/ "./src/prefabs/hud/enemy-menu-item.js":
/*!********************************************!*\
  !*** ./src/prefabs/hud/enemy-menu-item.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
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
 * It represents a specific menu item, about menu enemy
 */

var EnemyMenuItem =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(EnemyMenuItem, _MenuItem);

  function EnemyMenuItem(scene, name, position, properties) {
    _classCallCheck(this, EnemyMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(EnemyMenuItem).call(this, scene, name, position, properties));
  } //#region public methods   
  //#endregion
  //#region protected methods


  _createClass(EnemyMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(EnemyMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.enemy = this.scene.prefabs[properties.enemyName];
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      this.scene.activateEnemysMenu(false);
      this.scene.currentAttack.hit(this.enemy);
    } //#endregion

  }]);

  return EnemyMenuItem;
}(_menu_item__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (EnemyMenuItem);

/***/ }),

/***/ "./src/prefabs/hud/inventory-menu-item.js":
/*!************************************************!*\
  !*** ./src/prefabs/hud/inventory-menu-item.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../battle/physical-attack */ "./src/prefabs/battle/physical-attack.js");
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
 * It represents a specific menu item, when you want to get items
 */

var InventoryMenuItem =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(InventoryMenuItem, _MenuItem);

  function InventoryMenuItem(scene, name, position, properties) {
    _classCallCheck(this, InventoryMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(InventoryMenuItem).call(this, scene, name, position, properties));
  } //#region public methods   
  //#endregion
  //#region protected methods


  _createClass(InventoryMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(InventoryMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      if (this.scene.cache.game.inventory.hasItems()) {
        this.scene.prefabs.actionsMenu.enable(false);
        this.scene.prefabs.itemsMenu.enable(true);
      }
    } //#endregion

  }]);

  return InventoryMenuItem;
}(_menu_item__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (InventoryMenuItem);

/***/ }),

/***/ "./src/prefabs/hud/item-menu-item.js":
/*!*******************************************!*\
  !*** ./src/prefabs/hud/item-menu-item.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../battle/physical-attack */ "./src/prefabs/battle/physical-attack.js");
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
 * It represents a specific menu item, when you want to select one item
 */

var ItemMenuItem =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(ItemMenuItem, _MenuItem);

  function ItemMenuItem(scene, name, position, properties) {
    _classCallCheck(this, ItemMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ItemMenuItem).call(this, scene, name, position, properties));
  } //#region public methods   
  //#endregion
  //#region protected methods


  _createClass(ItemMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(ItemMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.itemName = properties.itemName;
      this.amount = properties.amount;
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      this.useItem();
    } //#endregion
    //#region internal methods   

  }, {
    key: "useItem",
    value: function useItem() {
      if (this.scene.cache.game.inventory.hasItem(this.itemName)) {
        this.scene.prefabs.itemsMenu.enable(false);
        this.scene.cache.game.inventory.useItem(this.itemName, this.scene.currentUnit);
        var sceneBeforeDestroyItem = this.scene;

        if (this.scene.cache.game.inventory.hasItem(this.itemName)) {
          this.destroy();
        }

        sceneBeforeDestroyItem.goToNextTurn();
      }
    } //#endregion

  }]);

  return ItemMenuItem;
}(_menu_item__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ItemMenuItem);

/***/ }),

/***/ "./src/prefabs/hud/magical-attack-menu-item.js":
/*!*****************************************************!*\
  !*** ./src/prefabs/hud/magical-attack-menu-item.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../battle/physical-attack */ "./src/prefabs/battle/physical-attack.js");
/* harmony import */ var _attack_menu_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attack-menu-item */ "./src/prefabs/hud/attack-menu-item.js");
/* harmony import */ var _battle_magical_attack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../battle/magical-attack */ "./src/prefabs/battle/magical-attack.js");
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
 * It represents a specific menu item, to attack in a fight
 */

var MagicalAttackMenuItem =
/*#__PURE__*/
function (_AttackMenuItem) {
  _inherits(MagicalAttackMenuItem, _AttackMenuItem);

  function MagicalAttackMenuItem(scene, name, position, properties) {
    _classCallCheck(this, MagicalAttackMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(MagicalAttackMenuItem).call(this, scene, name, position, properties));
  } //#region protected methods


  _createClass(MagicalAttackMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(MagicalAttackMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.MANA_COST = 10;
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      var manaIsEnabled = this.scene.currentUnit.stats.mana >= this.MANA_COST;

      if (manaIsEnabled) {
        this.setNewAttack();
      }
    }
  }, {
    key: "getAttackInstance",
    value: function getAttackInstance(key, position, setting) {
      setting.manaCost = this.MANA_COST;
      return new _battle_magical_attack__WEBPACK_IMPORTED_MODULE_5__["default"](this.scene, key, position, setting);
    } //#endregion

  }]);

  return MagicalAttackMenuItem;
}(_attack_menu_item__WEBPACK_IMPORTED_MODULE_4__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MagicalAttackMenuItem);

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
      this.on('pointerdown', this.select.bind(this));
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
        if (item.active) {
          item.setInteractive(state);
          item.setVisible(state);
        }
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

/***/ "./src/prefabs/hud/physical-attack-menu-item.js":
/*!******************************************************!*\
  !*** ./src/prefabs/hud/physical-attack-menu-item.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../battle/physical-attack */ "./src/prefabs/battle/physical-attack.js");
/* harmony import */ var _attack_menu_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attack-menu-item */ "./src/prefabs/hud/attack-menu-item.js");
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
 * It represents a specific menu item, to attack in a fight
 */

var PhysicalAttackMenuItem =
/*#__PURE__*/
function (_AttackMenuItem) {
  _inherits(PhysicalAttackMenuItem, _AttackMenuItem);

  function PhysicalAttackMenuItem(scene, name, position, properties) {
    _classCallCheck(this, PhysicalAttackMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(PhysicalAttackMenuItem).call(this, scene, name, position, properties));
  } //#region protected methods


  _createClass(PhysicalAttackMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(PhysicalAttackMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);
    } //#endregion

  }]);

  return PhysicalAttackMenuItem;
}(_attack_menu_item__WEBPACK_IMPORTED_MODULE_4__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PhysicalAttackMenuItem);

/***/ }),

/***/ "./src/prefabs/hud/run-menu-item.js":
/*!******************************************!*\
  !*** ./src/prefabs/hud/run-menu-item.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _menu_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item */ "./src/prefabs/hud/menu-item.js");
/* harmony import */ var _battle_physical_attack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../battle/physical-attack */ "./src/prefabs/battle/physical-attack.js");
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
 * It represents a specific menu item, when you want to leave the fight
 */

var RunMenuItem =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(RunMenuItem, _MenuItem);

  function RunMenuItem(scene, name, position, properties) {
    _classCallCheck(this, RunMenuItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(RunMenuItem).call(this, scene, name, position, properties));
  } //#region public methods   
  //#endregion
  //#region protected methods


  _createClass(RunMenuItem, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(RunMenuItem.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.runChance = properties.runChance;
    }
    /**
     * Selects one menu
     */

  }, {
    key: "select",
    value: function select() {
      var currentChance = this.scene.random.frac();

      if (currentChance < this.runChance) {
        this.scene.backToWorld();
      } else {
        this.scene.goToNextTurn();
      }
    } //#endregion

  }]);

  return RunMenuItem;
}(_menu_item__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (RunMenuItem);

/***/ }),

/***/ "./src/prefabs/hud/show-player-unit-in-pause-screen.js":
/*!*************************************************************!*\
  !*** ./src/prefabs/hud/show-player-unit-in-pause-screen.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../text-prefab */ "./src/prefabs/text-prefab.js");
/* harmony import */ var _show_stat_with_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./show-stat-with-bar */ "./src/prefabs/hud/show-stat-with-bar.js");
/* harmony import */ var _show_player_unit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./show-player-unit */ "./src/prefabs/hud/show-player-unit.js");
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
 * Prefabs to show data information from a unit (HP, MP, ...)
 */

var ShowPlayerUnitInPauseScreen =
/*#__PURE__*/
function (_ShowPlayerUnit) {
  _inherits(ShowPlayerUnitInPauseScreen, _ShowPlayerUnit);

  function ShowPlayerUnitInPauseScreen(scene, name, position, properties) {
    _classCallCheck(this, ShowPlayerUnitInPauseScreen);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowPlayerUnitInPauseScreen).call(this, scene, name, position, properties));
  } //#region public methods  

  /**
   * Updates status bar
   */


  _createClass(ShowPlayerUnitInPauseScreen, [{
    key: "change",
    value: function change(prefab, faceTexture) {
      this.updateUnitData(prefab);
      this.updateFaceTexture(faceTexture);
    }
    /**
     * Shows or hides status bar
     * @param {boolean} isShown 
     */

  }, {
    key: "display",
    value: function display(isShown) {
      _get(_getPrototypeOf(ShowPlayerUnitInPauseScreen.prototype), "display", this).call(this, isShown);

      this.showUnitHeadText.setVisible(isShown);
      this.showUnitHeadTexture.setVisible(isShown);
      this.showUnitDefense.setVisible(isShown);
      this.showUnitMagicAttack.setVisible(isShown);
      this.showUnitSpeed.setVisible(isShown);
      this.levelText.setVisible(isShown);
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(ShowPlayerUnitInPauseScreen.prototype), "initialize", this).call(this, scene, name, position, properties);

      var prefabData = this.scene.cache.game.partyData[properties.prefab];
      this.addZoneAboutEquipment(prefabData, properties);
      this.showUnitDefense = this.addZoneToDisplay(prefabData.stats.attack, 'Defense : \n', 250, 50, properties);
      this.showUnitMagicAttack = this.addZoneToDisplay(prefabData.stats.magicAttack, 'Magic : \n', 400, 0, properties);
      this.showUnitSpeed = this.addZoneToDisplay(prefabData.stats.speed, 'Speed : \n', 400, 50, properties);
      this.addZoneAboutLevel(prefabData, properties);
    } //#endregion
    //#region internal methods

    /**
     * Equipment zone
     * @param {JSON} prefabData 
     * @param {JSON} properties 
     */

  }, {
    key: "addZoneAboutEquipment",
    value: function addZoneAboutEquipment(prefabData, properties) {
      this.showUnitHeadText = this.addZoneToDisplay('', 'Head: ', 250, 0, properties);
      var headEquipment = prefabData.equipment.head;
      var headTexture = undefined; // undefined, to not display empty texture

      if (headEquipment.texture !== "") {
        headTexture = headEquipment.texture;
      }

      this.showUnitHeadTexture = this.scene.add.sprite(this.x + 250, this.y + 20, headTexture);
      this.showUnitHeadTexture.setOrigin(0);
      this.showUnitHeadTexture.setScale(0.3);
    }
    /**
     * Level zone 
     * @param {JSON} prefabData 
     * @param {JSON} properties 
     */

  }, {
    key: "addZoneAboutLevel",
    value: function addZoneAboutLevel(prefabData, properties) {
      this.levelText = this.addZoneToDisplay(prefabData.currentLevel + 1, 'Level', 130, 50, properties);
    }
    /**
     * text zone to display
     */

  }, {
    key: "addZoneToDisplay",
    value: function addZoneToDisplay(value, textValue, addXPosition, addYPosition, properties) {
      var text = this.scene.add.text(this.x + addXPosition, this.y + addYPosition, textValue + value, properties.textStyle);
      text.setOrigin(0);
      return text;
    }
    /**
     * Updates face texture, with the texture attribute
     * @param {JSON} texture 
     */

  }, {
    key: "updateFaceTexture",
    value: function updateFaceTexture(texture) {
      this.faceSprite.setTexture(texture);
    }
    /**
     * Updates unit data, by setting new with prefab attribute
     * @param {JSON} prefab 
     */

  }, {
    key: "updateUnitData",
    value: function updateUnitData(prefab) {
      this.unitData = prefab;
      this.playerUnitHealthBar.unitData = this.unitData;
      this.playerUnitManaBar.unitData = this.unitData;
    } //#endregion

  }]);

  return ShowPlayerUnitInPauseScreen;
}(_show_player_unit__WEBPACK_IMPORTED_MODULE_4__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ShowPlayerUnitInPauseScreen);

/***/ }),

/***/ "./src/prefabs/hud/show-player-unit.js":
/*!*********************************************!*\
  !*** ./src/prefabs/hud/show-player-unit.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prefab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _scenes_title_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scenes/title-scene */ "./src/scenes/title-scene.js");
/* harmony import */ var _text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../text-prefab */ "./src/prefabs/text-prefab.js");
/* harmony import */ var _show_stat_with_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./show-stat-with-bar */ "./src/prefabs/hud/show-stat-with-bar.js");
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
 * Prefabs to show data information from a unit (HP, MP, ...)
 */

var ShowPlayerUnit =
/*#__PURE__*/
function (_Prefab) {
  _inherits(ShowPlayerUnit, _Prefab);

  function ShowPlayerUnit(scene, name, position, properties) {
    _classCallCheck(this, ShowPlayerUnit);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowPlayerUnit).call(this, scene, name, position, properties));
  } //#region public methods  

  /**
   * Updates status bar
   */


  _createClass(ShowPlayerUnit, [{
    key: "change",
    value: function change(prefab, faceTexture) {
      this.updateUnitData(prefab);
      this.updateFaceTexture(faceTexture);
    }
    /**
     * Shows or hides status bar
     * @param {boolean} isShown 
     */

  }, {
    key: "display",
    value: function display(isShown) {
      this.playerUnitHealthBar.display(isShown);
      this.playerUnitManaBar.display(isShown);
      this.faceSprite.setVisible(isShown);
    } //#endregion
    //#region protected methods

  }, {
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(ShowPlayerUnit.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.prepareFaceInformations(properties);
      this.setUnitData(properties);
      this.playerUnitHealthBar = this.constructStatusBar('health', 'HP', properties);
      this.playerUnitManaBar = this.constructStatusBar('mana', 'MP', properties, 30);
    } //#endregion
    //#region internal methods

    /**
     * Updates face texture, with the texture attribute
     * @param {JSON} texture 
     */

  }, {
    key: "updateFaceTexture",
    value: function updateFaceTexture(texture) {
      this.faceSprite.setTexture(texture);
    }
    /**
     * Updates unit data, by setting new with prefab attribute
     * @param {JSON} prefab 
     */

  }, {
    key: "updateUnitData",
    value: function updateUnitData(prefab) {
      this.unitData = prefab;
      this.playerUnitHealthBar.unitData = this.unitData;
      this.playerUnitManaBar.unitData = this.unitData;
    }
    /**
     * Constructs status bar class and returns it
     * @param {string} key 
     * @param {string} title 
     * @param {JSON} properties 
     * @param {number} positionY 
     */

  }, {
    key: "constructStatusBar",
    value: function constructStatusBar(key, title, properties, positionY) {
      var name = this.name + '_' + key;

      if (!positionY) {
        positionY = 0;
      }

      var position = {
        x: this.x,
        y: this.y + positionY
      };
      var setting = {
        group: 'hud',
        anchor: {
          x: 0,
          y: 0
        },
        text: title,
        style: properties.textStyle,
        prefab: properties.prefab,
        stat: key,
        barTexture: key + 'barImage'
      };
      return new _show_stat_with_bar__WEBPACK_IMPORTED_MODULE_3__["default"](this.scene, name, position, setting);
    }
    /**
     * Defines unitData attribute
     * @param {JSON} properties 
     */

  }, {
    key: "setUnitData",
    value: function setUnitData(properties) {
      this.unitData = this.scene.prefabs[properties.prefab];
    }
    /**
     * Prepares face information of the unit
     * @param {JSON} properties 
     */

  }, {
    key: "prepareFaceInformations",
    value: function prepareFaceInformations(properties) {
      this.faceTexture = properties.faceTexture;
      this.faceSprite = this.scene.add.sprite(this.x + 130, this.y, properties.faceTexture);
      this.faceSprite.setOrigin(0);
    } //#endregion

  }]);

  return ShowPlayerUnit;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ShowPlayerUnit);

/***/ }),

/***/ "./src/prefabs/hud/show-stat-with-bar.js":
/*!***********************************************!*\
  !*** ./src/prefabs/hud/show-stat-with-bar.js ***!
  \***********************************************/
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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
 * Prefabs to show data information in a status bar
 */

var ShowStatWithBar =
/*#__PURE__*/
function (_TextPrefab) {
  _inherits(ShowStatWithBar, _TextPrefab);

  function ShowStatWithBar(scene, name, position, properties) {
    var _this;

    _classCallCheck(this, ShowStatWithBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShowStatWithBar).call(this, scene, name, position, properties));

    _this.setUnitData(properties);

    _this.stat = properties.stat;

    _this.createBar(properties);

    return _this;
  } //#region public methods  


  _createClass(ShowStatWithBar, [{
    key: "update",
    value: function update() {
      this.updateScaleOfBar();
    }
    /**
     * Shows or hides status bar
     * @param {boolean} isShown 
     */

  }, {
    key: "display",
    value: function display(isShown) {
      this.setVisible(isShown);
      this.barSprite.setVisible(isShown);
    } //#endregion
    //#region internal methods

    /**
     * Updates scale of the status bar
     */

  }, {
    key: "updateScaleOfBar",
    value: function updateScaleOfBar() {
      this.currentStat = this.unitData.stats[this.stat];
      this.barSprite.setScale(this.currentStat / 100, 1.0);
    }
    /**
     * Adds sprite dedicated to the status bar
     */

  }, {
    key: "createBar",
    value: function createBar(properties) {
      this.barSprite = this.scene.add.sprite(this.x, this.y + 20, properties.barTexture);
      this.barSprite.setOrigin(0);
    }
    /**
     * sets unitData attribute
     * @param {JSON} properties 
     */

  }, {
    key: "setUnitData",
    value: function setUnitData(properties) {
      this.unitData = this.scene.prefabs[properties.prefab];
    } //#endregion

  }]);

  return ShowStatWithBar;
}(_text_prefab__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ShowStatWithBar);

/***/ }),

/***/ "./src/prefabs/hud/unit-stats.js":
/*!***************************************!*\
  !*** ./src/prefabs/hud/unit-stats.js ***!
  \***************************************/
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




/**
 * Displaying stats of one unit
 */

var UnitStats =
/*#__PURE__*/
function (_Prefab) {
  _inherits(UnitStats, _Prefab);

  function UnitStats(scene, name, position, properties) {
    _classCallCheck(this, UnitStats);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnitStats).call(this, scene, name, position, properties));
  } //#region public methods 
  //#endregion
  //#region protected methods


  _createClass(UnitStats, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(UnitStats.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.stats = Object.create(properties.stats);
      this.faceTexture = properties.faceTexture;
    } //#endregion

  }]);

  return UnitStats;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (UnitStats);

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

/**
 * Prefab to display text
 */
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



/**
 * Manages player meeting with enemy
 */

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

      this.encounter = this.scene.cache.json.get(properties.encounter);
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
        scene: 'battle',
        extraParameters: {
          previousLevel: this.scene.levelData.level,
          encounter: this.encounter
        }
      });
    } //#endregion

  }]);

  return EnemySpawner;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (EnemySpawner);

/***/ }),

/***/ "./src/prefabs/world/equipment.js":
/*!****************************************!*\
  !*** ./src/prefabs/world/equipment.js ***!
  \****************************************/
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



/**
 * Equipment that could be present in the worl scene
 */

var Equipment =
/*#__PURE__*/
function (_Prefab) {
  _inherits(Equipment, _Prefab);

  function Equipment(scene, name, position, properties) {
    _classCallCheck(this, Equipment);

    return _possibleConstructorReturn(this, _getPrototypeOf(Equipment).call(this, scene, name, position, properties));
  } //#region public methods    
  //#endregion
  //#region protected methods


  _createClass(Equipment, [{
    key: "initialize",
    value: function initialize(scene, name, position, properties) {
      _get(_getPrototypeOf(Equipment.prototype), "initialize", this).call(this, scene, name, position, properties);

      this.setScale(0.3, 0.3);
      this.unitName = properties.unitName;
      this.bodyPart = properties.bodyPart;
      this.stat = properties.stat;
      this.bonus = +properties.bonus;
      this.textureName = properties.texture;
      this.body.immovable = true;
      this.body.setSize(this.width * this.scaleX, this.height * this.scaleY);
      this.scene.physics.add.collider(this, this.scene.groups.players, this.collect, null, this);
    }
    /**
    * Actions when user touch an equipment
    */

  }, {
    key: "collect",
    value: function collect() {
      var unitData = this.scene.cache.game.partyData[this.unitName];
      this.updateUnitBodyPart(unitData);
    } //#endregion
    //#region internal methods    

    /**
     * Updates unit body part
     * @param {JSON} unitData 
     */

  }, {
    key: "updateUnitBodyPart",
    value: function updateUnitBodyPart(unitData) {
      var isDifferentEquipement = unitData.equipment[this.bodyPart].name !== this.name;

      if (isDifferentEquipement) {
        unitData.equipment[this.bodyPart] = {
          name: this.name,
          texture: this.textureName
        };
        unitData.statsBonus[this.stat] = this.bonus;
        this.destroy();
      }
    } //#endregion

  }]);

  return Equipment;
}(_prefab__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Equipment);

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
/* harmony import */ var _prefabs_battle_player_unit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../prefabs/battle/player-unit */ "./src/prefabs/battle/player-unit.js");
/* harmony import */ var _prefabs_battle_enemy_unit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../prefabs/battle/enemy-unit */ "./src/prefabs/battle/enemy-unit.js");
/* harmony import */ var _prefabs_hud_physical_attack_menu_item__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../prefabs/hud/physical-attack-menu-item */ "./src/prefabs/hud/physical-attack-menu-item.js");
/* harmony import */ var _prefabs_hud_enemy_menu_item__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../prefabs/hud/enemy-menu-item */ "./src/prefabs/hud/enemy-menu-item.js");
/* harmony import */ var _prefabs_hud_magical_attack_menu_item__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../prefabs/hud/magical-attack-menu-item */ "./src/prefabs/hud/magical-attack-menu-item.js");
/* harmony import */ var _prefabs_hud_run_menu_item__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../prefabs/hud/run-menu-item */ "./src/prefabs/hud/run-menu-item.js");
/* harmony import */ var _prefabs_hud_show_player_unit__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../prefabs/hud/show-player-unit */ "./src/prefabs/hud/show-player-unit.js");
/* harmony import */ var _prefabs_hud_inventory_menu_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../prefabs/hud/inventory-menu-item */ "./src/prefabs/hud/inventory-menu-item.js");
/* harmony import */ var _prefabs_battle_boss_unit__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../prefabs/battle/boss-unit */ "./src/prefabs/battle/boss-unit.js");
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

      this.getExperienceTable();
      this.createAllEnemies();
      this.loadPartyData();
      this.prepareGamingQueue();
    }
  }, {
    key: "init",
    value: function init(data) {
      _get(_getPrototypeOf(BattleScene.prototype), "init", this).call(this, data);

      this.previousLevel = data.extraParameters.previousLevel;
      this.encounter = data.extraParameters.encounter;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.loadExperienceTable();
    }
    /**
     * Stops battle, and go back to map
     */

  }, {
    key: "backToWorld",
    value: function backToWorld() {
      this.scene.start('BootScene', {
        scene: this.previousLevel
      });
    }
    /**
     * Launches new turn of attack in battle scene, thanks to queue
     */

  }, {
    key: "goToNextTurn",
    value: function goToNextTurn() {
      var nextTurnIsValid = true;

      if (this.groups.enemyUnits.countActive() === 0) {
        this.endBattle();
        nextTurnIsValid = false;
      }

      if (this.groups.playerUnits.countActive() === 0) {
        this.gameOver();
        nextTurnIsValid = false;
      }

      if (nextTurnIsValid) {
        this.currentUnit = this.units.dequeue();

        if (this.currentUnit.active) {
          this.currentUnit.playAction();
          this.currentUnit.calculateAttackTurn();
          this.units.queue(this.currentUnit);
        } else {
          this.currentUnit = undefined;
          this.goToNextTurn();
        }
      }
    }
    /**
     * Activates the actions menu
     * @param {boolean} enable 
     */

  }, {
    key: "activateActionsMenu",
    value: function activateActionsMenu(enable) {
      this.setEnableMenu(this.prefabs.actionsMenu, enable);
    }
    /**
     * Activates the enemies menu
     * @param {boolean} enable 
     */

  }, {
    key: "activateEnemysMenu",
    value: function activateEnemysMenu(enable) {
      this.setEnableMenu(this.prefabs.enemyUnitsMenu, enable);
    } //#endregion
    //#region internal methods

    /**
     * Loads party data from cache (prefabs stats)
     */

  }, {
    key: "loadPartyData",
    value: function loadPartyData() {
      for (var unitDataKey in this.cache.game.partyData) {
        var cacheDataUnit = this.cache.game.partyData[unitDataKey];
        this.prefabs[unitDataKey].stats = {};

        for (var statKey in cacheDataUnit.stats) {
          this.prefabs[unitDataKey].stats[statKey] = cacheDataUnit.stats[statKey] + cacheDataUnit.statsBonus[statKey];
        }

        this.prefabs[unitDataKey].experience = cacheDataUnit.experience;
        this.prefabs[unitDataKey].currentLevel = cacheDataUnit.currentLevel;
      }

      console.log('loadPartyData::warrior.stats', this.prefabs.warrior.stats);
    }
  }, {
    key: "getExperienceTable",
    value: function getExperienceTable() {
      this.experienceTable = this.cache.json.get('experience_table');
    }
  }, {
    key: "loadExperienceTable",
    value: function loadExperienceTable() {
      this.load.json('experience_table', 'assets/levels/experience_table.json');
    }
    /**
     * All enemy units are killed
     */

  }, {
    key: "endBattle",
    value: function endBattle() {
      this.giveMoreExperienceToUnits(this.saveDataFromUnitInCache.bind(this));
      this.collectItems();
      this.backToWorld();
    }
  }, {
    key: "collectItems",
    value: function collectItems() {
      var _this2 = this;

      this.encounter.reward.items.forEach(function (item) {
        _this2.cache.game.inventory.collect(_this2, item);
      }, this);
    }
    /**
     * Saves data from one unit in cache data
     * @param {Unit} unit 
     */

  }, {
    key: "saveDataFromUnitInCache",
    value: function saveDataFromUnitInCache(unit) {
      console.log('saveDataFromUnitInCache::before', this.cache.game.partyData[unit.name].stats);
      this.cache.game.partyData[unit.name].stats = unit.stats;
      this.cache.game.partyData[unit.name].experience = unit.experience;
      this.cache.game.partyData[unit.name].currentLevel = unit.currentLevel;
      console.log('saveDataFromUnitInCache::after', this.cache.game.partyData[unit.name].stats);
    }
    /**
     * Iterates units and gives experiences
     */

  }, {
    key: "giveMoreExperienceToUnits",
    value: function giveMoreExperienceToUnits(saveDataInCache) {
      var _this3 = this;

      var receivedExperience = this.encounter.reward.experience;
      this.groups.playerUnits.children.each(function (unit) {
        var addingExperience = receivedExperience / _this3.groups.playerUnits.children.size;
        unit.receiveExperience(addingExperience);
        saveDataInCache(unit);
      }, this);
    }
    /**
     * All player units are killed
     */

  }, {
    key: "gameOver",
    value: function gameOver() {
      this.scene.start('BootScene', {
        scene: 'title'
      });
    }
    /**
     * Creates all enemy prefabs
     */

  }, {
    key: "createAllEnemies",
    value: function createAllEnemies() {
      for (var key in this.encounter.enemyData) {
        this.createPrefab(key, this.encounter.enemyData[key]);
      }
    }
  }, {
    key: "setEnableMenu",
    value: function setEnableMenu(menu, enable) {
      if (typeof enable == "undefined") {
        enable = true;
      }

      menu.enable(enable);
    }
  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      this.prefabsClasses = {
        background: _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.constructor,
        playerUnit: _prefabs_battle_player_unit__WEBPACK_IMPORTED_MODULE_7__["default"].prototype.constructor,
        enemyUnit: _prefabs_battle_enemy_unit__WEBPACK_IMPORTED_MODULE_8__["default"].prototype.constructor,
        bossUnit: _prefabs_battle_boss_unit__WEBPACK_IMPORTED_MODULE_15__["default"].prototype.constructor,
        menuItem: _prefabs_hud_menu_item__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.constructor,
        physicalAttackMenuItem: _prefabs_hud_physical_attack_menu_item__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.constructor,
        enemyMenuItem: _prefabs_hud_enemy_menu_item__WEBPACK_IMPORTED_MODULE_10__["default"].prototype.constructor,
        magicalAttackMenuItem: _prefabs_hud_magical_attack_menu_item__WEBPACK_IMPORTED_MODULE_11__["default"].prototype.constructor,
        inventoryMenuItem: _prefabs_hud_inventory_menu_item__WEBPACK_IMPORTED_MODULE_14__["default"].prototype.constructor,
        runMenuItem: _prefabs_hud_run_menu_item__WEBPACK_IMPORTED_MODULE_12__["default"].prototype.constructor,
        menu: _prefabs_hud_menu__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.constructor,
        showPlayerUnit: _prefabs_hud_show_player_unit__WEBPACK_IMPORTED_MODULE_13__["default"].prototype.constructor
      };
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
      this.createItemsMenu();
      this.goToNextTurn();
    }
    /**
     * Creates items menu
     */

  }, {
    key: "createItemsMenu",
    value: function createItemsMenu() {
      this.cache.game.inventory.createMenu(this, this.prefabs.itemsMenu);
    }
    /**
     * Calculates turn for a group (all of the childrens)
     * @param {group} unitGroup 
     * @param {number} turn 
     */

  }, {
    key: "calculateTurnForAllGroup",
    value: function calculateTurnForAllGroup(unitGroup, turn) {
      var _this4 = this;

      unitGroup.children.each(function (unit) {
        unit.calculateAttackTurn(turn);

        _this4.units.queue(unit);
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
      pause: {
        key: 'PauseScene',
        path: 'assets/levels/pause_screen.json'
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
        scene: this.levels[data.scene].key,
        extraParameters: data.extraParameters
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
        levelData: this.levelData,
        extraParameters: data.extraParameters
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

/***/ "./src/scenes/pause-scene.js":
/*!***********************************!*\
  !*** ./src/scenes/pause-scene.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_level_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-level-scene */ "./src/scenes/json-level-scene.js");
/* harmony import */ var _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prefabs/prefab */ "./src/prefabs/prefab.js");
/* harmony import */ var _prefabs_text_prefab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prefabs/text-prefab */ "./src/prefabs/text-prefab.js");
/* harmony import */ var _prefabs_hud_unit_stats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prefabs/hud/unit-stats */ "./src/prefabs/hud/unit-stats.js");
/* harmony import */ var _prefabs_hud_show_player_unit_in_pause_screen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prefabs/hud/show-player-unit-in-pause-screen */ "./src/prefabs/hud/show-player-unit-in-pause-screen.js");
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
 * Scene displaying resume of a fight
 */

var PauseScene =
/*#__PURE__*/
function (_JSonLevelScene) {
  _inherits(PauseScene, _JSonLevelScene);

  function PauseScene() {
    _classCallCheck(this, PauseScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PauseScene).call(this, 'PauseScene'));
  } //#region public methods


  _createClass(PauseScene, [{
    key: "init",
    value: function init(data) {
      _get(_getPrototypeOf(PauseScene.prototype), "init", this).call(this, data);

      this.previousLevel = data.extraParameters.previousLevel;
    }
    /**
     * Stops pause, and go back to map
     */

  }, {
    key: "backToWorld",
    value: function backToWorld() {
      this.scene.start('BootScene', {
        scene: this.previousLevel
      });
    }
  }, {
    key: "create",
    value: function create() {
      _get(_getPrototypeOf(PauseScene.prototype), "create", this).call(this);

      this.getDefaultDataParty();
    } //#endregion
    //#region internal methods

    /**
         * Loads party data from cache (prefabs stats)
         */

  }, {
    key: "loadPartyData",
    value: function loadPartyData() {
      for (var unitDataKey in this.cache.game.partyData) {
        var cacheDataUnit = this.cache.game.partyData[unitDataKey];
        this.prefabs[unitDataKey].stats = {};

        for (var statKey in cacheDataUnit.stats) {
          this.prefabs[unitDataKey].stats[statKey] = cacheDataUnit.stats[statKey] + cacheDataUnit.statsBonus[statKey];
        }

        this.prefabs[unitDataKey].experience = cacheDataUnit.experience;
        this.prefabs[unitDataKey].currentLevel = cacheDataUnit.currentLevel;
      }

      console.log('loadPartyData::warrior.stats', this.prefabs.warrior.stats);
    }
    /**
     * Loads default data of the party
     */

  }, {
    key: "loadDefaultDataParty",
    value: function loadDefaultDataParty() {
      this.load.json('default_data', 'assets/levels/default_data.json');
    }
  }, {
    key: "getDefaultDataParty",
    value: function getDefaultDataParty() {
      this.cache.game.partyData = this.cache.json.get('default_data');
    }
  }, {
    key: "setPrefabs",
    value: function setPrefabs() {
      this.prefabsClasses = {
        background: _prefabs_prefab__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.constructor,
        unitStats: _prefabs_hud_unit_stats__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.constructor,
        showPlayerUnit: _prefabs_hud_show_player_unit_in_pause_screen__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.constructor
      };
    } //#endregion

  }]);

  return PauseScene;
}(_json_level_scene__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PauseScene);

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
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
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

var TitleScene =
/*#__PURE__*/
function (_JSonLevelScene) {
  _inherits(TitleScene, _JSonLevelScene);

  function TitleScene() {
    _classCallCheck(this, TitleScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(TitleScene).call(this, 'TitleScene'));
  } //#region public methods


  _createClass(TitleScene, [{
    key: "login",
    value: function login() {
      var readyToStartGame = true;

      if (!firebase_app__WEBPACK_IMPORTED_MODULE_3___default.a.auth().currentUser) {
        readyToStartGame = false;
        this.launchLoginInformationsPopup();
      }

      if (readyToStartGame) {
        this.startGame();
      }
    }
    /**
     * Starts the game
     */

  }, {
    key: "startGame",
    value: function startGame() {
      this.scene.start('BootScene', {
        scene: 'town'
      });
    }
  }, {
    key: "preload",
    value: function preload() {
      this.loadDefaultDataParty();
    }
  }, {
    key: "create",
    value: function create() {
      _get(_getPrototypeOf(TitleScene.prototype), "create", this).call(this);

      this.getDefaultDataParty();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      console.error('try to log', error);
    } //#endregion
    //#region internal methods

  }, {
    key: "launchLoginInformationsPopup",
    value: function launchLoginInformationsPopup() {
      var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_3___default.a.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      firebase_app__WEBPACK_IMPORTED_MODULE_3___default.a.auth().signInWithPopup(provider).then(this.startGame.bind(this))["catch"](this.handleError.bind(this));
    }
    /**
     * Loads default data of the party
     */

  }, {
    key: "loadDefaultDataParty",
    value: function loadDefaultDataParty() {
      this.load.json('default_data', 'assets/levels/default_data.json');
    }
  }, {
    key: "getDefaultDataParty",
    value: function getDefaultDataParty() {
      this.cache.game.partyData = this.cache.json.get('default_data');
    }
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
/* harmony import */ var _prefabs_world_equipment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../prefabs/world/equipment */ "./src/prefabs/world/equipment.js");
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
    key: "putGameInPause",
    value: function putGameInPause() {
      this.scene.start('BootScene', {
        scene: 'pause',
        extraParameters: {
          previousLevel: this.levelData.level
        }
      });
    }
    /**
     * Creates the world (loads map, tilesets, layers, ...)
     */

  }, {
    key: "create",
    value: function create() {
      this.map = this.add.tilemap(this.levelData.map.key);
      this.prepareTileSets();
      this.prepareLayers();

      _get(_getPrototypeOf(WorldScene.prototype), "create", this).call(this);

      this.prepareObjects();
    }
    /**
     * Preloads data messages
     */

  }, {
    key: "preload",
    value: function preload() {
      this.loadMessages();
      this.loadEnemyEncounters();
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
    key: "loadEnemyEncounters",
    value: function loadEnemyEncounters() {
      for (var key in this.levelData.enemyEncounters) {
        this.load.json(key, this.levelData.enemyEncounters[key]);
      }
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
        equipment: _prefabs_world_equipment__WEBPACK_IMPORTED_MODULE_7__["default"].prototype.constructor,
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

module.exports = __webpack_require__(/*! F:\Works\LaDiagonaleDuPoulpe\ladiagonaledupoulpe-game-one\pocs\with-phaser\004-courses-rpg-like-ff\src\main.js */"./src/main.js");


/***/ })

/******/ });
});
//# sourceMappingURL=app.js.map