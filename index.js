'use strict';

var eventListener = require('event-listener'),
    isBoolean = require('type-check/is-boolean'),
    isObjectLike = require('type-check/is-object-like');

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
