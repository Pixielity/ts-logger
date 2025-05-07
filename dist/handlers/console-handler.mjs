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
var LogLevelColor = {
  ["emergency" /* EMERGENCY */]: "#FF0000",
  // Red
  ["alert" /* ALERT */]: "#FF4500",
  // OrangeRed
  ["critical" /* CRITICAL */]: "#FF8C00",
  // DarkOrange
  ["error" /* ERROR */]: "#FFA500",
  // Orange
  ["warning" /* WARNING */]: "#FFD700",
  // Gold
  ["notice" /* NOTICE */]: "#1E90FF",
  // DodgerBlue
  ["info" /* INFO */]: "#32CD32",
  // LimeGreen
  ["debug" /* DEBUG */]: "#808080"
  // Gray
};

// src/handlers/console-handler.ts
var ConsoleHandler = class {
  /**
   * Create a new ConsoleHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    this.name = "console" /* CONSOLE */;
    this.next = null;
    this.emojiSupport = true;
    this.colorSupport = true;
    if (options.emojiSupport !== void 0) {
      this.emojiSupport = options.emojiSupport;
    }
    if (options.colorSupport !== void 0) {
      this.colorSupport = options.colorSupport;
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
    if (this.colorSupport && LogLevelColor[level]) {
      const color = LogLevelColor[level];
      console.log(
        `%c${datetime.toISOString()} [${level.toUpperCase()}] ${formattedMessage}`,
        `color: ${color}`
      );
    } else {
      console.log(`${datetime.toISOString()} [${level.toUpperCase()}] ${formattedMessage}`);
    }
    if (Object.keys(context).length > 0) {
      console.log("Context:", context);
    }
    if (stack) {
      console.log("Stack trace:", stack);
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
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  setColorSupport(enabled) {
    this.colorSupport = enabled;
  }
  /**
   * Get whether emoji support is enabled
   */
  isEmojiSupportEnabled() {
    return this.emojiSupport;
  }
  /**
   * Get whether color support is enabled
   */
  isColorSupportEnabled() {
    return this.colorSupport;
  }
};
ConsoleHandler = __decorateClass([
  injectable()
], ConsoleHandler);

export { ConsoleHandler };
//# sourceMappingURL=console-handler.mjs.map
//# sourceMappingURL=console-handler.mjs.map