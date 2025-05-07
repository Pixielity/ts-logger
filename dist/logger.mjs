import { injectable, inject } from 'inversify';

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
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

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

// src/interfaces/events/event-dispatcher.interface.ts
var IEventDispatcher;
((IEventDispatcher2) => {
  IEventDispatcher2.$ = Symbol.for("IEventDispatcher");
})(IEventDispatcher || (IEventDispatcher = {}));

// src/logger.ts
var Logger = class {
  /**
   * Create a new Logger instance
   * @param channel The logging channel to use
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(injectableChannel, eventDispatcher) {
    this._context = {};
    console.log("=======>>>>>>>>>", injectableChannel);
    this._channel = injectableChannel;
    this._eventDispatcher = eventDispatcher;
  }
  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  log(level, message, context = {}) {
    const mergedContext = { ...this._context, ...context };
    this._channel.log(level, message, mergedContext);
    this._eventDispatcher.dispatch(
      new MessageLoggedEvent(
        level,
        message,
        mergedContext,
        void 0,
        // Stack trace will be added by the handler if needed
        this._channel.getName()
      )
    );
  }
  /**
   * Log a debug message
   * @param message The message to log
   * @param context Optional contextual data
   */
  debug(message, context = {}) {
    this.log("debug" /* DEBUG */, message, context);
  }
  /**
   * Log an info message
   * @param message The message to log
   * @param context Optional contextual data
   */
  info(message, context = {}) {
    this.log("info" /* INFO */, message, context);
  }
  /**
   * Log a notice message
   * @param message The message to log
   * @param context Optional contextual data
   */
  notice(message, context = {}) {
    this.log("notice" /* NOTICE */, message, context);
  }
  /**
   * Log a warning message
   * @param message The message to log
   * @param context Optional contextual data
   */
  warning(message, context = {}) {
    this.log("warning" /* WARNING */, message, context);
  }
  /**
   * Log an error message
   * @param message The message to log
   * @param context Optional contextual data
   */
  error(message, context = {}) {
    this.log("error" /* ERROR */, message, context);
  }
  /**
   * Log a critical message
   * @param message The message to log
   * @param context Optional contextual data
   */
  critical(message, context = {}) {
    this.log("critical" /* CRITICAL */, message, context);
  }
  /**
   * Log an alert message
   * @param message The message to log
   * @param context Optional contextual data
   */
  alert(message, context = {}) {
    this.log("alert" /* ALERT */, message, context);
  }
  /**
   * Log an emergency message
   * @param message The message to log
   * @param context Optional contextual data
   */
  emergency(message, context = {}) {
    this.log("emergency" /* EMERGENCY */, message, context);
  }
  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  withContext(context) {
    this._context = { ...this._context, ...context };
    return this;
  }
  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  withoutContext(keys) {
    const newContext = { ...this._context };
    for (const key of keys) {
      delete newContext[key];
    }
    this._context = newContext;
    return this;
  }
  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  shareContext(context) {
    this._channel.shareContext(context);
  }
  /**
   * Flush shared context
   */
  flushSharedContext() {
    this._channel.flushSharedContext();
  }
  /**
   * Get the channel with the specified name
   * @param channel The channel name
   */
  channel(channel) {
    throw new Error("Method not implemented in Logger. Use LogManager.channel() instead.");
  }
  /**
   * Get the stack channel with the specified name
   * @param stack The stack name
   */
  stack(stack) {
    throw new Error("Method not implemented in Logger. Use LogManager.stack() instead.");
  }
};
Logger = __decorateClass([
  injectable(),
  __decorateParam(1, inject(IEventDispatcher.$))
], Logger);

export { Logger };
//# sourceMappingURL=logger.mjs.map
//# sourceMappingURL=logger.mjs.map