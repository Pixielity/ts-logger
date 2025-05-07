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
  inversify.injectable(),
  __decorateParam(1, inversify.inject(IEventDispatcher.$))
], Logger);

// src/config/logging-config.ts
var loggingConfig = {
  /**
   * The default channel to use
   */
  default: "console",
  /**
   * The minimum log level to record
   */
  minimumLevel: "debug" /* DEBUG */,
  /**
   * The channels configuration
   */
  channels: {
    console: {
      type: "console" /* CONSOLE */,
      handler: {
        type: "console" /* CONSOLE */,
        emojiSupport: true,
        colorSupport: true
      },
      formatter: {
        type: "line" /* LINE */,
        dateFormat: "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */,
        emojiSupport: true,
        colorSupport: true,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    localStorage: {
      type: "localStorage" /* LOCAL_STORAGE */,
      handler: {
        type: "localStorage" /* LOCAL_STORAGE */,
        key: "ts-log",
        maxEntries: 100
      },
      formatter: {
        type: "json" /* JSON */,
        prettyPrint: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    indexedDB: {
      type: "indexedDB" /* INDEXED_DB */,
      handler: {
        type: "indexedDB" /* INDEXED_DB */,
        databaseName: "ts-log",
        tableName: "logs",
        maxEntries: 1e3
      },
      formatter: {
        type: "json" /* JSON */,
        prettyPrint: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    slack: {
      type: "slack" /* SLACK */,
      handler: {
        type: "slack" /* SLACK */,
        url: "",
        channel: "#logs",
        username: "ts-log",
        iconEmoji: ":memo:",
        emojiSupport: true,
        maxRetries: 3
      },
      formatter: {
        type: "line" /* LINE */,
        dateFormat: "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */,
        emojiSupport: true,
        colorSupport: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    errorLog: {
      type: "errorLog" /* ERROR_LOG */,
      handler: {
        type: "errorLog" /* ERROR_LOG */,
        emojiSupport: true
      },
      formatter: {
        type: "simple" /* SIMPLE */,
        emojiSupport: true,
        colorSupport: false
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: true
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    syslog: {
      type: "syslog" /* SYSLOG */,
      handler: {
        type: "syslog" /* SYSLOG */,
        facility: 16,
        // local0
        appName: "ts-log",
        procId: "browser"
      },
      formatter: {
        type: "line" /* LINE */,
        dateFormat: "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */,
        emojiSupport: false,
        colorSupport: false,
        stackTraceFormatting: true
      },
      processors: [
        {
          type: "messagePlaceholder" /* MESSAGE_PLACEHOLDER */,
          placeholderFormat: "{key}",
          emojiSupport: false
        },
        {
          type: "context" /* CONTEXT */
        }
      ]
    },
    stack: {
      type: "stack" /* STACK */,
      channels: ["console", "localStorage"]
    }
  }};

// src/manager.ts
exports.LogManager = class LogManager {
  /**
   * Create a new LogManager instance
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(eventDispatcher) {
    this._channels = {};
    this._customDrivers = {};
    this._defaultChannel = loggingConfig.default;
    this._minimumLevel = loggingConfig.minimumLevel;
    this._eventDispatcher = eventDispatcher;
    this.initializeChannels();
  }
  /**
   * Initialize channels from config
   */
  initializeChannels() {
    for (const [name, config] of Object.entries(loggingConfig.channels)) {
      try {
        const channelConfig = config;
        const channelType = channelConfig.type;
        this.createChannel(name, channelType, channelConfig);
      } catch (error) {
        console.error(`Failed to initialize channel ${name}:`, error);
      }
    }
  }
  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  log(level, message, context = {}) {
    this.channel().log(level, message, context);
  }
  /**
   * Log a debug message
   * @param message The message to log
   * @param context Optional contextual data
   */
  debug(message, context = {}) {
    this.channel().debug(message, context);
  }
  /**
   * Log an info message
   * @param message The message to log
   * @param context Optional contextual data
   */
  info(message, context = {}) {
    this.channel().info(message, context);
  }
  /**
   * Log a notice message
   * @param message The message to log
   * @param context Optional contextual data
   */
  notice(message, context = {}) {
    this.channel().notice(message, context);
  }
  /**
   * Log a warning message
   * @param message The message to log
   * @param context Optional contextual data
   */
  warning(message, context = {}) {
    this.channel().warning(message, context);
  }
  /**
   * Log an error message
   * @param message The message to log
   * @param context Optional contextual data
   */
  error(message, context = {}) {
    this.channel().error(message, context);
  }
  /**
   * Log a critical message
   * @param message The message to log
   * @param context Optional contextual data
   */
  critical(message, context = {}) {
    this.channel().critical(message, context);
  }
  /**
   * Log an alert message
   * @param message The message to log
   * @param context Optional contextual data
   */
  alert(message, context = {}) {
    this.channel().alert(message, context);
  }
  /**
   * Log an emergency message
   * @param message The message to log
   * @param context Optional contextual data
   */
  emergency(message, context = {}) {
    this.channel().emergency(message, context);
  }
  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  withContext(context) {
    return this.channel().withContext(context);
  }
  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  withoutContext(keys) {
    return this.channel().withoutContext(keys);
  }
  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  shareContext(context) {
    this.channel().shareContext(context);
  }
  /**
   * Flush shared context
   */
  flushSharedContext() {
    this.channel().flushSharedContext();
  }
  /**
   * Get the channel with the specified name
   * @param name The channel name
   */
  channel(name) {
    const channelName = name || this._defaultChannel;
    if (!this._channels[channelName]) {
      throw new Error(`Channel [${channelName}] not found.`);
    }
    return this._channels[channelName];
  }
  /**
   * Get the stack channel with the specified name
   * @param name The stack name
   */
  stack(name) {
    return this.channel(name);
  }
  /**
   * Get the driver with the specified name
   * @param name The driver name
   */
  driver(name) {
    return this.channel(name);
  }
  /**
   * Extend the logging system with a custom driver creator
   * @param driver The driver name
   * @param callback The callback function that creates the driver
   */
  extend(driver, callback) {
    this._customDrivers[driver] = callback;
  }
  /**
   * Get all registered channels
   */
  getChannels() {
    return this._channels;
  }
  /**
   * Get the default channel name
   */
  getDefaultChannel() {
    return this._defaultChannel;
  }
  /**
   * Set the default channel name
   * @param name The default channel name
   */
  setDefaultChannel(name) {
    if (!this._channels[name]) {
      throw new Error(`Channel [${name}] not found.`);
    }
    this._defaultChannel = name;
  }
  /**
   * Create a channel with the specified configuration
   * @param name The channel name
   * @param type The channel type
   * @param options The channel options
   */
  createChannel(name, type, options) {
    const logger = new Logger(
      {},
      // This would be replaced with the actual channel
      this._eventDispatcher
    );
    this._channels[name] = logger;
    return logger;
  }
  /**
   * Create a handler with the specified configuration
   * @param type The handler type
   * @param options The handler options
   */
  createHandler(type, options) {
    return {};
  }
  /**
   * Create a formatter with the specified configuration
   * @param type The formatter type
   * @param options The formatter options
   */
  createFormatter(type, options) {
    return {};
  }
  /**
   * Create a processor with the specified configuration
   * @param type The processor type
   * @param options The processor options
   */
  createProcessor(type, options) {
    return {};
  }
  /**
   * Get the minimum log level
   */
  getMinimumLevel() {
    return this._minimumLevel;
  }
  /**
   * Set the minimum log level
   * @param level The minimum log level
   */
  setMinimumLevel(level) {
    this._minimumLevel = level;
  }
};
exports.LogManager = __decorateClass([
  inversify.injectable()
], exports.LogManager);
//# sourceMappingURL=manager.js.map
//# sourceMappingURL=manager.js.map