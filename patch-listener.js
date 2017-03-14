/*!
 * @license Copyright(c) 2017 sasa+1
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PatchListener"] = factory();
	else
		root["PatchListener"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var off = (typeof removeEventListener !== 'undefined') ?
  function off(element, eventName, callback, capture) {
    return element.removeEventListener(eventName, callback, capture);
  } :
  function off(element, eventName, callback) {
    return element.detachEvent('on' + eventName, callback);
  };

var on = (typeof addEventListener !== 'undefined') ?
  function on(element, eventName, callback, capture) {
    return element.addEventListener(eventName, callback, capture);
  } :
  function on(element, eventName, callback) {
    return element.attachEvent('on' + eventName, callback);
  };

function once(element, eventName, callback, capture) {
  var handler = function() {
    off(element, eventName, handler, capture);

    switch (arguments.length) {
      case 0:
        return callback.call(this);
      case 1:
        return callback.call(this, arguments[0]);
      case 2:
        return callback.call(this, arguments[0], arguments[1]);
      case 3:
        return callback.call(this, arguments[0], arguments[1], arguments[2]);
      default:
        return callback.apply(this, arguments);
    }
  };

  return on(element, eventName, handler, capture);
}

module.exports = {
  off: off,
  on: on,
  once: once
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString;

module.exports = function isBoolean(value) {
  return (
    typeof value === 'boolean' || toString.call(value) === '[object Boolean]'
  );
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObjectLike(value) {
  return (value !== null && typeof value === 'object');
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eventListener = __webpack_require__(0),
    isBoolean = __webpack_require__(1),
    isObjectLike = __webpack_require__(2);

/**
 * PatchListener constructor
 *
 * @constructor
 * @param {Element|Object} element
 * @param {Element} element.element
 * @param {string} element.eventName
 * @param {Function} element.callback
 * @param {boolean} element.capture
 * @param {string} eventName
 * @param {Function} callback
 * @param {boolean} capture
 */
function PatchListener(element, eventName, callback, capture) {
  var args = arguments,
      params;

  if (!(this instanceof PatchListener)) {
    switch (args.length) {
      case 0:
        return new PatchListener();
      case 1:
        return new PatchListener(args[0]);
      case 2:
        return new PatchListener(args[0], args[1]);
      case 3:
        return new PatchListener(args[0], args[1], args[2]);
      default:
        return new PatchListener(args[0], args[1], args[2], args[3]);
    }
  }

  if (args.length === 1 && isObjectLike(element)) {
    params = element;

    element = params.element;
    eventName = params.eventName;
    callback = params.callback;
    capture = params.capture;
  }

  this.element = element;
  this.eventName = eventName;
  this.callback = callback;
  this.capture = capture;
}

/**
 * remove from EventListener
 *
 * @param {Element} [element]
 * @param {string} [eventName]
 * @param {Function} [callback]
 * @param {boolean} [capture]
 */
PatchListener.prototype.off = function off(element, eventName, callback, capture) {
  element || (element = this.element);
  eventName || (eventName = this.eventName);
  callback || (callback = this.callback);

  capture = (isBoolean(capture)) ? capture : this.capture;

  eventListener.off(element, eventName, callback, capture);
};

/**
 * add to EventListener
 *
 * @param {Element} [element]
 * @param {string} [eventName]
 * @param {Function} [callback]
 * @param {boolean} [capture]
 */
PatchListener.prototype.on = function on(element, eventName, callback, capture) {
  element || (element = this.element);
  eventName || (eventName = this.eventName);
  callback || (callback = this.callback);

  capture = (isBoolean(capture)) ? capture : this.capture;

  eventListener.on(element, eventName, callback, capture);
};

module.exports = PatchListener;


/***/ })
/******/ ]);
});