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
var LogLevelEmoji = {
  ["emergency" /* EMERGENCY */]: "\u{1F6A8}",
  ["alert" /* ALERT */]: "\u{1F514}",
  ["critical" /* CRITICAL */]: "\u2757",
  ["error" /* ERROR */]: "\u{1F534}",
  ["warning" /* WARNING */]: "\u26A0\uFE0F",
  ["notice" /* NOTICE */]: "\u{1F4DD}",
  ["info" /* INFO */]: "\u2705",
  ["debug" /* DEBUG */]: "\u{1F6E0}\uFE0F"
};

// src/handlers/error-log-handler.ts
exports.ErrorLogHandler = class ErrorLogHandler {
  /**
   * Create a new ErrorLogHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    this.name = "errorLog";
    this.next = null;
    this.emojiSupport = true;
    if (options.emojiSupport !== void 0) {
      this.emojiSupport = options.emojiSupport;
    }
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  handle(record) {
    const level = record.level;
    const message = record.message;
    const context = record.context;
    const datetime = record.datetime;
    const stack = record.stack;
    let formattedMessage = message;
    if (this.emojiSupport && LogLevelEmoji[level]) {
      formattedMessage = `${LogLevelEmoji[level]} ${formattedMessage}`;
    }
    let errorMessage = `[${datetime.toISOString()}] [${record.levelName}] ${formattedMessage}`;
    if (Object.keys(context).length > 0) {
      errorMessage += ` ${JSON.stringify(context)}`;
    }
    console.error(errorMessage);
    if (stack) {
      console.error("Stack trace:", stack);
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
    return true;
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
   * Enable or disable emoji support
   * @param enabled Whether emoji support is enabled
   */
  setEmojiSupport(enabled) {
    this.emojiSupport = enabled;
  }
  /**
   * Get whether emoji support is enabled
   */
  isEmojiSupportEnabled() {
    return this.emojiSupport;
  }
};
exports.ErrorLogHandler = __decorateClass([
  inversify.injectable()
], exports.ErrorLogHandler);
//# sourceMappingURL=error-log-handler.js.map
//# sourceMappingURL=error-log-handler.js.map