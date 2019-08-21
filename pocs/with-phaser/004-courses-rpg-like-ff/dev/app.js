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

  /**
   * Starts the game
   */


  _createClass(TitleScene, [{
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
    } //#endregion
    //#region internal methods

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