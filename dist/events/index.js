'use strict';

var inversify = require('inversify');

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
exports.EventDispatcher = class EventDispatcher {
  constructor() {
    this.listeners = {};
  }
  /**
   * Dispatch an event
   * @param event The event to dispatch
   */
  dispatch(event) {
    const eventName = event.getName();
    const eventListeners = this.listeners[eventName] || [];
    for (const listener of eventListeners) {
      try {
        listener(event);
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error);
      }
    }
  }
  /**
   * Add a listener for an event
   * @param eventName The event name
   * @param listener The event listener
   */
  addListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }
  /**
   * Remove a listener for an event
   * @param eventName The event name
   * @param listener The event listener
   */
  removeListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName] = this.listeners[eventName].filter((l) => l !== listener);
  }
  /**
   * Get all listeners for an event
   * @param eventName The event name
   */
  getListeners(eventName) {
    return this.listeners[eventName] || [];
  }
  /**
   * Check if an event has listeners
   * @param eventName The event name
   */
  hasListeners(eventName) {
    return !!this.listeners[eventName] && this.listeners[eventName].length > 0;
  }
  /**
   * Remove all listeners for an event
   * @param eventName The event name
   */
  clearListeners(eventName) {
    this.listeners[eventName] = [];
  }
};
exports.EventDispatcher = __decorateClass([
  inversify.injectable()
], exports.EventDispatcher);

// src/events/message-logged.event.ts
var MessageLoggedEvent = class {
  /**
   * Create a new MessageLoggedEvent instance
   * @param level The log level
   * @param message The log message
   * @param context The log context
   * @param stack The stack trace
   * @param channel The channel name
   */
  constructor(level, message, context, stack, channel = "default") {
    this.name = "message.logged";
    this.timestamp = /* @__PURE__ */ new Date();
    this.level = level;
    this.message = message;
    this.context = context;
    this.stack = stack;
    this.channel = channel;
  }
  /**
   * Get the event name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the event data
   */
  getData() {
    return {
      level: this.level,
      message: this.message,
      context: this.context,
      stack: this.stack,
      channel: this.channel
    };
  }
  /**
   * Get the event timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }
  /**
   * Get the log level
   */
  getLevel() {
    return this.level;
  }
  /**
   * Get the log message
   */
  getMessage() {
    return this.message;
  }
  /**
   * Get the log context
   */
  getContext() {
    return this.context;
  }
  /**
   * Get the stack trace
   */
  getStack() {
    return this.stack;
  }
  /**
   * Get the channel name
   */
  getChannel() {
    return this.channel;
  }
};

exports.MessageLoggedEvent = MessageLoggedEvent;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map