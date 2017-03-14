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
  var args;

  if (arguments.length === 1 && isObjectLike(element)) {
    args = element;

    element = args.element;
    eventName = args.eventName;
    callback = args.callback;
    capture = args.capture;
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
