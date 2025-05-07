/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


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

export { MessageLoggedEvent };
//# sourceMappingURL=message-logged.event.mjs.map
//# sourceMappingURL=message-logged.event.mjs.map