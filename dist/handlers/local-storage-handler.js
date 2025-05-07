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
exports.LocalStorageHandler = class LocalStorageHandler {
  /**
   * Create a new LocalStorageHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    this.name = "localStorage";
    this.next = null;
    this.key = "ts-log";
    this.maxEntries = 100;
    if (options.key) {
      this.key = options.key;
    }
    if (options.maxEntries) {
      this.maxEntries = options.maxEntries;
    }
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  handle(record) {
    try {
      const entries = this.getEntries();
      entries.push({
        level: record.level,
        levelName: record.levelName,
        message: record.message,
        context: record.context,
        datetime: record.datetime.toISOString(),
        stack: record.stack
      });
      if (entries.length > this.maxEntries) {
        entries.splice(0, entries.length - this.maxEntries);
      }
      localStorage.setItem(this.key, JSON.stringify(entries));
    } catch (error) {
      console.error("Failed to store log in localStorage:", error);
    }
    if (this.next) {
      this.next.handle(record);
    }
  }
  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  isHandling(record) {
    return typeof localStorage !== "undefined";
  }
  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  setNext(handler) {
    this.next = handler;
    return handler;
  }
  /**
   * Get the next handler in the chain
   */
  getNext() {
    return this.next;
  }
  /**
   * Get the handler name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the localStorage key used to store logs
   */
  getKey() {
    return this.key;
  }
  /**
   * Set the localStorage key used to store logs
   * @param key The localStorage key
   */
  setKey(key) {
    this.key = key;
  }
  /**
   * Get the maximum number of log entries to store
   */
  getMaxEntries() {
    return this.maxEntries;
  }
  /**
   * Set the maximum number of log entries to store
   * @param maxEntries The maximum number of log entries
   */
  setMaxEntries(maxEntries) {
    this.maxEntries = maxEntries;
  }
  /**
   * Get all stored log entries
   */
  getEntries() {
    try {
      const entriesJson = localStorage.getItem(this.key);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
      console.error("Failed to retrieve logs from localStorage:", error);
      return [];
    }
  }
  /**
   * Clear all stored log entries
   */
  clearEntries() {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error("Failed to clear logs from localStorage:", error);
    }
  }
};
exports.LocalStorageHandler = __decorateClass([
  inversify.injectable()
], exports.LocalStorageHandler);
//# sourceMappingURL=local-storage-handler.js.map
//# sourceMappingURL=local-storage-handler.js.map