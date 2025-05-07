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

// src/constants/log-level-value.constant.ts
var LogLevelValue = {
  ["emergency" /* EMERGENCY */]: 800,
  ["alert" /* ALERT */]: 700,
  ["critical" /* CRITICAL */]: 600,
  ["error" /* ERROR */]: 500,
  ["warning" /* WARNING */]: 400,
  ["notice" /* NOTICE */]: 300,
  ["info" /* INFO */]: 200,
  ["debug" /* DEBUG */]: 100
};

// src/handlers/fingers-crossed-handler.ts
var FingersCrossedHandler = class {
  /**
   * Create a new FingersCrossedHandler instance
   * @param handler The handler to use when activated
   * @param options Options for the handler
   */
  constructor(handler, options = {}) {
    this.name = "fingersCrossed";
    this.next = null;
    this.buffer = [];
    this.activated = false;
    this.handler = handler;
    this.actionLevel = options.actionLevel || "warning";
    this.bufferSize = options.bufferSize || 0;
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  handle(record) {
    if (this.activated) {
      this.handler.handle(record);
    } else {
      if (this.isActionLevel(record.level)) {
        this.activated = true;
        for (const bufferedRecord of this.buffer) {
          this.handler.handle(bufferedRecord);
        }
        this.buffer = [];
        this.handler.handle(record);
      } else {
        this.buffer.push(record);
        if (this.bufferSize > 0 && this.buffer.length > this.bufferSize) {
          this.buffer.shift();
        }
      }
    }
    if (this.next) {
      this.next.handle(record);
    }
  }
  /**
   * Check if a log level is at or above the action level
   * @param level The log level to check
   */
  isActionLevel(level) {
    return LogLevelValue[level] >= LogLevelValue[this.actionLevel];
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
   * Get the action level
   */
  getActionLevel() {
    return this.actionLevel;
  }
  /**
   * Set the action level
   * @param level The action level
   */
  setActionLevel(level) {
    this.actionLevel = level;
  }
  /**
   * Get the buffer size
   */
  getBufferSize() {
    return this.bufferSize;
  }
  /**
   * Set the buffer size
   * @param size The buffer size
   */
  setBufferSize(size) {
    this.bufferSize = size;
  }
  /**
   * Get whether the handler is activated
   */
  isActivated() {
    return this.activated;
  }
  /**
   * Reset the handler
   */
  reset() {
    this.activated = false;
    this.buffer = [];
  }
};
FingersCrossedHandler = __decorateClass([
  injectable()
], FingersCrossedHandler);

export { FingersCrossedHandler };
//# sourceMappingURL=fingers-crossed-handler.mjs.map
//# sourceMappingURL=fingers-crossed-handler.mjs.map