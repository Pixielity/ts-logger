import { injectable } from 'inversify';

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
var EventDispatcher = class {
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
EventDispatcher = __decorateClass([
  injectable()
], EventDispatcher);

export { EventDispatcher };
//# sourceMappingURL=event-dispatcher.mjs.map
//# sourceMappingURL=event-dispatcher.mjs.map