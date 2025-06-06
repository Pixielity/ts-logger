'use strict';

var inversify = require('inversify');
var Dexie = require('dexie');
var tsApplication = require('@pixielity/ts-application');
var StackTrace = require('stacktrace-js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Dexie__default = /*#__PURE__*/_interopDefault(Dexie);
var StackTrace__default = /*#__PURE__*/_interopDefault(StackTrace);

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/enums/log-level.enum.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["EMERGENCY"] = "emergency";
  LogLevel2["ALERT"] = "alert";
  LogLevel2["CRITICAL"] = "critical";
  LogLevel2["ERROR"] = "error";
  LogLevel2["WARNING"] = "warning";
  LogLevel2["NOTICE"] = "notice";
  LogLevel2["INFO"] = "info";
  LogLevel2["DEBUG"] = "debug";
  return LogLevel2;
})(LogLevel || {});

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
exports.IEventDispatcher = void 0;
((IEventDispatcher2) => {
  IEventDispatcher2.$ = Symbol.for("IEventDispatcher");
})(exports.IEventDispatcher || (exports.IEventDispatcher = {}));

// src/logger.ts
exports.Logger = class Logger {
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
exports.Logger = __decorateClass([
  inversify.injectable(),
  __decorateParam(1, inversify.inject(exports.IEventDispatcher.$))
], exports.Logger);

// src/enums/date-format.enum.ts
var DateFormat = /* @__PURE__ */ ((DateFormat2) => {
  DateFormat2["ISO8601"] = "ISO8601";
  DateFormat2["RFC3339"] = "RFC3339";
  DateFormat2["RFC2822"] = "RFC2822";
  DateFormat2["UNIX"] = "UNIX";
  DateFormat2["YYYY_MM_DD"] = "YYYY-MM-DD";
  DateFormat2["YYYY_MM_DD_HH_MM_SS"] = "YYYY-MM-DD HH:mm:ss";
  DateFormat2["DD_MM_YYYY"] = "DD/MM/YYYY";
  DateFormat2["MM_DD_YYYY"] = "MM/DD/YYYY";
  DateFormat2["HH_MM_SS"] = "HH:mm:ss";
  DateFormat2["CUSTOM"] = "custom";
  DateFormat2["YYYY_MM_DD_HH_MM_SS_MILLI"] = "YYYY-MM-DD HH:mm:ss.SSS";
  return DateFormat2;
})(DateFormat || {});

// src/enums/handler-type.enum.ts
var HandlerType = /* @__PURE__ */ ((HandlerType2) => {
  HandlerType2["CONSOLE"] = "console";
  HandlerType2["LOCAL_STORAGE"] = "localStorage";
  HandlerType2["INDEXED_DB"] = "indexedDB";
  HandlerType2["HTTP"] = "http";
  HandlerType2["SLACK"] = "slack";
  HandlerType2["ERROR_LOG"] = "errorLog";
  HandlerType2["SYSLOG"] = "syslog";
  HandlerType2["FINGERS_CROSSED"] = "fingersCrossed";
  HandlerType2["CUSTOM"] = "custom";
  return HandlerType2;
})(HandlerType || {});

// src/enums/formatter-type.enum.ts
var FormatterType = /* @__PURE__ */ ((FormatterType2) => {
  FormatterType2["LINE"] = "line";
  FormatterType2["JSON"] = "json";
  FormatterType2["SIMPLE"] = "simple";
  FormatterType2["CUSTOM"] = "custom";
  return FormatterType2;
})(FormatterType || {});

// src/enums/processor-type.enum.ts
var ProcessorType = /* @__PURE__ */ ((ProcessorType2) => {
  ProcessorType2["MESSAGE_PLACEHOLDER"] = "messagePlaceholder";
  ProcessorType2["CONTEXT"] = "context";
  ProcessorType2["CUSTOM"] = "custom";
  return ProcessorType2;
})(ProcessorType || {});

// src/enums/log-channel-type.enum.ts
var LogChannelType = /* @__PURE__ */ ((LogChannelType2) => {
  LogChannelType2["CONSOLE"] = "console";
  LogChannelType2["LOCAL_STORAGE"] = "localStorage";
  LogChannelType2["INDEXED_DB"] = "indexedDB";
  LogChannelType2["HTTP"] = "http";
  LogChannelType2["SLACK"] = "slack";
  LogChannelType2["ERROR_LOG"] = "errorLog";
  LogChannelType2["SYSLOG"] = "syslog";
  LogChannelType2["STACK"] = "stack";
  LogChannelType2["CUSTOM"] = "custom";
  return LogChannelType2;
})(LogChannelType || {});

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
  },
  /**
   * Emoji configuration
   */
  emoji: {
    enabled: true,
    levels: {
      ["emergency" /* EMERGENCY */]: "\u{1F6A8}",
      ["alert" /* ALERT */]: "\u{1F514}",
      ["critical" /* CRITICAL */]: "\u2757",
      ["error" /* ERROR */]: "\u{1F534}",
      ["warning" /* WARNING */]: "\u26A0\uFE0F",
      ["notice" /* NOTICE */]: "\u{1F4DD}",
      ["info" /* INFO */]: "\u2705",
      ["debug" /* DEBUG */]: "\u{1F6E0}\uFE0F"
    }
  },
  /**
   * Color configuration
   */
  color: {
    enabled: true,
    levels: {
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
    }
  }
};

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
    return this.driver(name);
  }
  /**
   * Get the stack channel with the specified name
   * @param name The stack name
   */
  stack(name) {
    return this.driver(name);
  }
  /**
   * Get the driver with the specified name
   * @param name The driver name
   */
  driver(name) {
    const channelName = name || this._defaultChannel;
    if (!this._channels[channelName]) {
      throw new Error(`Channel [${channelName}] not found.`);
    }
    return this._channels[channelName];
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
    const logger = new exports.Logger(
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

// src/interfaces/context/manager.interface.ts
exports.IContextManager = void 0;
((IContextManager2) => {
  IContextManager2.$ = Symbol.for("IContextManager");
})(exports.IContextManager || (exports.IContextManager = {}));

// src/interfaces/utils/exception-formatter.interface.ts
exports.IExceptionFormatter = void 0;
((IExceptionFormatter2) => {
  IExceptionFormatter2.$ = Symbol.for("IExceptionFormatter");
})(exports.IExceptionFormatter || (exports.IExceptionFormatter = {}));

// src/interfaces/events/dehydrating.interface.ts
exports.IContextDehydrating = void 0;
((IContextDehydrating2) => {
  IContextDehydrating2.$ = Symbol.for("IContextDehydrating");
})(exports.IContextDehydrating || (exports.IContextDehydrating = {}));

// src/interfaces/events/hydrated.interface.ts
exports.IContextHydrated = void 0;
((IContextHydrated2) => {
  IContextHydrated2.$ = Symbol.for("IContextHydrated");
})(exports.IContextHydrated || (exports.IContextHydrated = {}));

// src/interfaces/events/log-event.interface.ts
exports.ILogEvent = void 0;
((ILogEvent2) => {
  ILogEvent2.$ = Symbol.for("ILogEvent");
})(exports.ILogEvent || (exports.ILogEvent = {}));

// src/interfaces/events/message-logged.interface.ts
exports.IMessageLogged = void 0;
((IMessageLogged2) => {
  IMessageLogged2.$ = Symbol.for("IMessageLogged");
})(exports.IMessageLogged || (exports.IMessageLogged = {}));

// src/interfaces/logging/manager.interface.ts
exports.ILogManager = void 0;
((ILogManager2) => {
  ILogManager2.$ = Symbol.for("ILogManager");
})(exports.ILogManager || (exports.ILogManager = {}));

// src/interfaces/logging/logging-service.interface.ts
exports.ILoggingService = void 0;
((ILoggingService2) => {
  ILoggingService2.$ = Symbol.for("ILoggingService");
})(exports.ILoggingService || (exports.ILoggingService = {}));

// src/interfaces/context/management.interface.ts
exports.IContextManagement = void 0;
((IContextManagement2) => {
  IContextManagement2.$ = Symbol.for("IContextManagement");
})(exports.IContextManagement || (exports.IContextManagement = {}));

// src/interfaces/channels/logging-channel.interface.ts
exports.ILoggingChannel = void 0;
((ILoggingChannel2) => {
  ILoggingChannel2.$ = Symbol.for("ILoggingChannel");
})(exports.ILoggingChannel || (exports.ILoggingChannel = {}));

// src/interfaces/channels/single-channel.interface.ts
exports.ISingleChannel = void 0;
((ISingleChannel2) => {
  ISingleChannel2.$ = Symbol.for("ISingleChannel");
})(exports.ISingleChannel || (exports.ISingleChannel = {}));

// src/interfaces/channels/stack-channel.interface.ts
exports.IStackChannel = void 0;
((IStackChannel2) => {
  IStackChannel2.$ = Symbol.for("IStackChannel");
})(exports.IStackChannel || (exports.IStackChannel = {}));

// src/interfaces/handlers/console-handler.interface.ts
exports.IConsoleHandler = void 0;
((IConsoleHandler2) => {
  IConsoleHandler2.$ = Symbol.for("IConsoleHandler");
})(exports.IConsoleHandler || (exports.IConsoleHandler = {}));

// src/interfaces/handlers/error-log-handler.interface.ts
exports.IErrorLogHandler = void 0;
((IErrorLogHandler2) => {
  IErrorLogHandler2.$ = Symbol.for("IErrorLogHandler");
})(exports.IErrorLogHandler || (exports.IErrorLogHandler = {}));

// src/interfaces/handlers/fingers-crossed-handler.interface.ts
exports.IFingersCrossedHandler = void 0;
((IFingersCrossedHandler2) => {
  IFingersCrossedHandler2.$ = Symbol.for("IFingersCrossedHandler");
})(exports.IFingersCrossedHandler || (exports.IFingersCrossedHandler = {}));

// src/interfaces/handlers/http-handler.interface.ts
exports.IHttpHandler = void 0;
((IHttpHandler2) => {
  IHttpHandler2.$ = Symbol.for("IHttpHandler");
})(exports.IHttpHandler || (exports.IHttpHandler = {}));

// src/interfaces/handlers/indexed-db-handler.interface.ts
exports.IIndexedDBHandler = void 0;
((IIndexedDBHandler2) => {
  IIndexedDBHandler2.$ = Symbol.for("IIndexedDBHandler");
})(exports.IIndexedDBHandler || (exports.IIndexedDBHandler = {}));

// src/interfaces/handlers/local-storage-handler.interface.ts
exports.ILocalStorageHandler = void 0;
((ILocalStorageHandler2) => {
  ILocalStorageHandler2.$ = Symbol.for("ILocalStorageHandler");
})(exports.ILocalStorageHandler || (exports.ILocalStorageHandler = {}));

// src/interfaces/handlers/log-handler.interface.ts
exports.ILogHandler = void 0;
((ILogHandler2) => {
  ILogHandler2.$ = Symbol.for("ILogHandler");
})(exports.ILogHandler || (exports.ILogHandler = {}));

// src/interfaces/handlers/slack-webhook-handler.interface.ts
exports.ISlackWebhookHandler = void 0;
((ISlackWebhookHandler2) => {
  ISlackWebhookHandler2.$ = Symbol.for("ISlackWebhookHandler");
})(exports.ISlackWebhookHandler || (exports.ISlackWebhookHandler = {}));

// src/interfaces/handlers/syslog-handler.interface.ts
exports.ISyslogHandler = void 0;
((ISyslogHandler2) => {
  ISyslogHandler2.$ = Symbol.for("ISyslogHandler");
})(exports.ISyslogHandler || (exports.ISyslogHandler = {}));

// src/interfaces/formatters/json-formatter.interface.ts
exports.IJsonFormatter = void 0;
((IJsonFormatter2) => {
  IJsonFormatter2.$ = Symbol.for("IJsonFormatter");
})(exports.IJsonFormatter || (exports.IJsonFormatter = {}));

// src/interfaces/formatters/line-formatter.interface.ts
exports.ILineFormatter = void 0;
((ILineFormatter2) => {
  ILineFormatter2.$ = Symbol.for("ILineFormatter");
})(exports.ILineFormatter || (exports.ILineFormatter = {}));

// src/interfaces/formatters/log-formatter.interface.ts
exports.ILogFormatter = void 0;
((ILogFormatter2) => {
  ILogFormatter2.$ = Symbol.for("ILogFormatter");
})(exports.ILogFormatter || (exports.ILogFormatter = {}));

// src/interfaces/formatters/simple-formatter.interface.ts
exports.ISimpleFormatter = void 0;
((ISimpleFormatter2) => {
  ISimpleFormatter2.$ = Symbol.for("ISimpleFormatter");
})(exports.ISimpleFormatter || (exports.ISimpleFormatter = {}));

// src/interfaces/processors/context-log-processor.interface.ts
exports.IContextLogProcessor = void 0;
((IContextLogProcessor2) => {
  IContextLogProcessor2.$ = Symbol.for("IContextLogProcessor");
})(exports.IContextLogProcessor || (exports.IContextLogProcessor = {}));

// src/interfaces/processors/log-processor.interface.ts
exports.ILogProcessor = void 0;
((ILogProcessor2) => {
  ILogProcessor2.$ = Symbol.for("ILogProcessor");
})(exports.ILogProcessor || (exports.ILogProcessor = {}));

// src/interfaces/processors/message-placeholder-processor.interface.ts
exports.IMessagePlaceholderProcessor = void 0;
((IMessagePlaceholderProcessor2) => {
  IMessagePlaceholderProcessor2.$ = Symbol.for("IMessagePlaceholderProcessor");
})(exports.IMessagePlaceholderProcessor || (exports.IMessagePlaceholderProcessor = {}));
exports.SingleChannel = class SingleChannel {
  /**
   * Create a new SingleChannel instance
   * @param name The channel name
   * @param handler The handler to use
   * @param formatter The formatter to use
   */
  constructor(name, handler, formatter) {
    this.processors = [];
    this.context = {};
    this.name = name;
    this.handler = handler;
    this.formatter = formatter;
  }
  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  log(level, message, context = {}) {
    let record = {
      level,
      levelName: level.toUpperCase(),
      message,
      context: { ...this.context, ...context },
      datetime: /* @__PURE__ */ new Date()
    };
    record = this.processRecord(record);
    if (this.handler.isHandling(record)) {
      this.handler.handle(record);
    }
  }
  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  withContext(context) {
    this.context = { ...this.context, ...context };
    return this;
  }
  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  withoutContext(keys) {
    const newContext = { ...this.context };
    for (const key of keys) {
      delete newContext[key];
    }
    this.context = newContext;
    return this;
  }
  /**
   * Get the channel name
   */
  getName() {
    return this.name;
  }
  /**
   * Process a log record
   * @param record The log record to process
   */
  processRecord(record) {
    let processedRecord = record;
    for (const processor of this.processors) {
      processedRecord = processor.process(processedRecord);
    }
    return processedRecord;
  }
  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  shareContext(context) {
    this.context = { ...this.context, ...context };
  }
  /**
   * Flush shared context
   */
  flushSharedContext() {
    this.context = {};
  }
  /**
   * Get the handler used by the channel
   */
  getHandler() {
    return this.handler;
  }
  /**
   * Set the handler used by the channel
   * @param handler The handler to use
   */
  setHandler(handler) {
    this.handler = handler;
  }
  /**
   * Get the formatter used by the channel
   */
  getFormatter() {
    return this.formatter;
  }
  /**
   * Set the formatter used by the channel
   * @param formatter The formatter to use
   */
  setFormatter(formatter) {
    this.formatter = formatter;
  }
  /**
   * Get the processors used by the channel
   */
  getProcessors() {
    return this.processors;
  }
  /**
   * Add a processor to the channel
   * @param processor The processor to add
   */
  addProcessor(processor) {
    this.processors.push(processor);
  }
  /**
   * Remove a processor from the channel
   * @param name The name of the processor to remove
   */
  removeProcessor(name) {
    this.processors = this.processors.filter((processor) => processor.getName() !== name);
  }
};
exports.SingleChannel = __decorateClass([
  inversify.injectable()
], exports.SingleChannel);
exports.StackChannel = class StackChannel {
  /**
   * Create a new StackChannel instance
   * @param name The channel name
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(name, eventDispatcher) {
    this.context = {};
    this.channels = [];
    this.name = name;
  }
  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  log(level, message, context = {}) {
    const mergedContext = { ...this.context, ...context };
    for (const channel of this.channels) {
      channel.log(level, message, mergedContext);
    }
  }
  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  withContext(context) {
    this.context = { ...this.context, ...context };
    return this;
  }
  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  withoutContext(keys) {
    const newContext = { ...this.context };
    for (const key of keys) {
      delete newContext[key];
    }
    this.context = newContext;
    return this;
  }
  /**
   * Get the channel name
   */
  getName() {
    return this.name;
  }
  /**
   * Process a log record
   * @param record The log record to process
   */
  processRecord(record) {
    let processedRecord = record;
    for (const channel of this.channels) {
      processedRecord = channel.processRecord(processedRecord);
    }
    return processedRecord;
  }
  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  shareContext(context) {
    for (const channel of this.channels) {
      channel.shareContext(context);
    }
  }
  /**
   * Flush shared context
   */
  flushSharedContext() {
    for (const channel of this.channels) {
      channel.flushSharedContext();
    }
  }
  /**
   * Get the channels in the stack
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Add a channel to the stack
   * @param channel The channel to add
   */
  addChannel(channel) {
    this.channels.push(channel);
  }
  /**
   * Remove a channel from the stack
   * @param name The name of the channel to remove
   */
  removeChannel(name) {
    this.channels = this.channels.filter((channel) => channel.getName() !== name);
  }
  /**
   * Check if the stack contains a channel with the specified name
   * @param name The channel name
   */
  hasChannel(name) {
    return this.channels.some((channel) => channel.getName() === name);
  }
  /**
   * Get the channel with the specified name
   * @param name The channel name
   */
  getChannel(name) {
    return this.channels.find((channel) => channel.getName() === name);
  }
};
exports.StackChannel = __decorateClass([
  inversify.injectable(),
  __decorateParam(1, inversify.inject(exports.IEventDispatcher.$))
], exports.StackChannel);

// src/context/events/dehydrating.event.ts
var ContextDehydratingEvent = class {
  /**
   * Create a new ContextDehydratingEvent instance
   * @param context The context data being dehydrated
   */
  constructor(context) {
    this.name = "context.dehydrating";
    this.timestamp = /* @__PURE__ */ new Date();
    this.context = context;
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
      context: this.context
    };
  }
  /**
   * Get the event timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }
  /**
   * Get the context data being dehydrated
   */
  getContext() {
    return this.context;
  }
  /**
   * Set the context data being dehydrated
   * @param context The context data
   */
  setContext(context) {
    this.context = context;
  }
};

// src/context/events/hydrated.event.ts
var ContextHydratedEvent = class {
  /**
   * Create a new ContextHydratedEvent instance
   * @param context The context data that was hydrated
   * @param source The source of the hydrated data
   */
  constructor(context, source) {
    this.name = "context.hydrated";
    this.timestamp = /* @__PURE__ */ new Date();
    this.context = context;
    this.source = source;
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
      context: this.context,
      source: this.source
    };
  }
  /**
   * Get the event timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }
  /**
   * Get the context data that was hydrated
   */
  getContext() {
    return this.context;
  }
  /**
   * Get the source of the hydrated data
   */
  getSource() {
    return this.source;
  }
};
exports.ContextManager = class ContextManager {
  /**
   * Create a new ContextManager instance
   * @param contextRepository The context repository to use
   */
  constructor(contextRepository) {
    this.context = {};
    this.parent = null;
    this.contextRepository = contextRepository;
  }
  /**
   * Add contextual data
   * @param context The contextual data to add
   */
  addContext(context) {
    this.context = { ...this.context, ...context };
    for (const [key, value] of Object.entries(context)) {
      this.contextRepository.add(key, value);
    }
  }
  /**
   * Remove contextual data
   * @param keys The keys to remove from the context
   */
  removeContext(keys) {
    const newContext = { ...this.context };
    for (const key of keys) {
      delete newContext[key];
      this.contextRepository.forget(key);
    }
    this.context = newContext;
  }
  /**
   * Get all contextual data
   */
  getContext() {
    return this.context;
  }
  /**
   * Clear all contextual data
   */
  clearContext() {
    this.context = {};
  }
  /**
   * Create a scoped context manager
   */
  createScope() {
    const scopedManager = new exports.ContextManager(this.contextRepository);
    scopedManager.parent = this;
    return scopedManager;
  }
  /**
   * Merge contextual data from another context manager
   * @param manager The context manager to merge from
   */
  merge(manager) {
    this.addContext(manager.getContext());
  }
};
exports.ContextManager = __decorateClass([
  inversify.injectable(),
  __decorateParam(0, inversify.inject(exports.IContextManagement.$))
], exports.ContextManager);
exports.ContextRepository = class ContextRepository {
  /**
   * Create a new ContextRepository instance
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(eventDispatcher) {
    this.context = {};
    this.hiddenContext = {};
    this.stacks = {};
    this.counters = {};
    this.eventDispatcher = eventDispatcher;
  }
  /**
   * Add a value to the context
   * @param key The context key
   * @param value The context value
   */
  add(key, value) {
    this.context[key] = value;
  }
  /**
   * Get a value from the context
   * @param key The context key
   * @param defaultValue The default value to return if the key is not found
   */
  get(key, defaultValue) {
    var _a;
    return (_a = this.context[key]) != null ? _a : defaultValue;
  }
  /**
   * Check if the context contains a key
   * @param key The context key
   */
  has(key) {
    return key in this.context;
  }
  /**
   * Remove a value from the context
   * @param key The context key
   */
  forget(key) {
    delete this.context[key];
  }
  /**
   * Add a hidden value to the context
   * @param key The context key
   * @param value The context value
   */
  addHidden(key, value) {
    this.hiddenContext[key] = value;
  }
  /**
   * Get a hidden value from the context
   * @param key The context key
   * @param defaultValue The default value to return if the key is not found
   */
  getHidden(key, defaultValue) {
    var _a;
    return (_a = this.hiddenContext[key]) != null ? _a : defaultValue;
  }
  /**
   * Check if the context contains a hidden key
   * @param key The context key
   */
  hasHidden(key) {
    return key in this.hiddenContext;
  }
  /**
   * Remove a hidden value from the context
   * @param key The context key
   */
  forgetHidden(key) {
    delete this.hiddenContext[key];
  }
  /**
   * Push a value onto a stack in the context
   * @param key The context key
   * @param value The value to push
   */
  push(key, value) {
    if (!this.stacks[key]) {
      this.stacks[key] = [];
    }
    this.stacks[key].push(value);
  }
  /**
   * Pop a value from a stack in the context
   * @param key The context key
   */
  pop(key) {
    if (!this.stacks[key] || this.stacks[key].length === 0) {
      return void 0;
    }
    return this.stacks[key].pop();
  }
  /**
   * Check if a stack in the context contains a value
   * @param key The context key
   * @param value The value to check for
   */
  stackContains(key, value) {
    if (!this.stacks[key]) {
      return false;
    }
    return this.stacks[key].includes(value);
  }
  /**
   * Increment a counter in the context
   * @param key The context key
   * @param amount The amount to increment by
   */
  increment(key, amount = 1) {
    if (!this.counters[key]) {
      this.counters[key] = 0;
    }
    this.counters[key] += amount;
    return this.counters[key];
  }
  /**
   * Decrement a counter in the context
   * @param key The context key
   * @param amount The amount to decrement by
   */
  decrement(key, amount = 1) {
    if (!this.counters[key]) {
      this.counters[key] = 0;
    }
    this.counters[key] -= amount;
    return this.counters[key];
  }
  /**
   * Create a scoped context
   * @param callback The callback function to execute with the scoped context
   */
  scope(callback) {
    const savedContext = { ...this.context };
    const savedHiddenContext = { ...this.hiddenContext };
    const savedStacks = { ...this.stacks };
    const savedCounters = { ...this.counters };
    try {
      return callback();
    } finally {
      this.context = savedContext;
      this.hiddenContext = savedHiddenContext;
      this.stacks = savedStacks;
      this.counters = savedCounters;
    }
  }
  /**
   * Dehydrate the context to a serializable object
   */
  dehydrate() {
    const dehydratedContext = {
      context: { ...this.context },
      counters: { ...this.counters }
    };
    const event = new ContextDehydratingEvent(dehydratedContext.context);
    this.eventDispatcher.dispatch(event);
    dehydratedContext.context = event.getContext();
    return dehydratedContext;
  }
  /**
   * Hydrate the context from a serialized object
   * @param data The serialized context data
   */
  hydrate(data) {
    try {
      if (data.context) {
        this.context = { ...this.context, ...data.context };
      }
      if (data.counters) {
        this.counters = { ...this.counters, ...data.counters };
      }
      const event = new ContextHydratedEvent(this.context, "dehydrated");
      this.eventDispatcher.dispatch(event);
    } catch (error) {
      console.error("Failed to hydrate context:", error);
    }
  }
  /**
   * Get all context data
   */
  all() {
    return { ...this.context };
  }
  /**
   * Clear all context data
   */
  clear() {
    this.context = {};
    this.hiddenContext = {};
    this.stacks = {};
    this.counters = {};
  }
};
exports.ContextRepository = __decorateClass([
  inversify.injectable()
], exports.ContextRepository);
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
exports.JsonFormatter = class JsonFormatter {
  /**
   * Create a new JsonFormatter instance
   * @param options Options for the formatter
   */
  constructor(options = {}) {
    this.name = "json" /* JSON */;
    this.prettyPrint = false;
    this.stackTraceFormatting = true;
    if (options.prettyPrint !== void 0) {
      this.prettyPrint = options.prettyPrint;
    }
    if (options.stackTraceFormatting !== void 0) {
      this.stackTraceFormatting = options.stackTraceFormatting;
    }
  }
  /**
   * Format a log record
   * @param record The log record to format
   */
  format(record) {
    const jsonRecord = {
      level: record.level,
      levelName: record.levelName,
      message: record.message,
      context: record.context,
      datetime: record.datetime.toISOString()
    };
    if (record.stack && this.stackTraceFormatting) {
      jsonRecord.stack = record.stack;
    }
    if (record.extra) {
      jsonRecord.extra = record.extra;
    }
    return JSON.stringify(jsonRecord, null, this.prettyPrint ? 2 : 0);
  }
  /**
   * Format a batch of log records
   * @param records The log records to format
   */
  formatBatch(records) {
    const jsonRecords = records.map((record) => {
      const jsonRecord = {
        level: record.level,
        levelName: record.levelName,
        message: record.message,
        context: record.context,
        datetime: record.datetime.toISOString()
      };
      if (record.stack && this.stackTraceFormatting) {
        jsonRecord.stack = record.stack;
      }
      if (record.extra) {
        jsonRecord.extra = record.extra;
      }
      return jsonRecord;
    });
    return JSON.stringify(jsonRecords, null, this.prettyPrint ? 2 : 0);
  }
  /**
   * Get the formatter name
   */
  getName() {
    return this.name;
  }
  /**
   * Enable or disable pretty printing
   * @param enabled Whether pretty printing is enabled
   */
  setPrettyPrint(enabled) {
    this.prettyPrint = enabled;
  }
  /**
   * Get whether pretty printing is enabled
   */
  isPrettyPrintEnabled() {
    return this.prettyPrint;
  }
  /**
   * Enable or disable stack trace formatting
   * @param enabled Whether stack trace formatting is enabled
   */
  setStackTraceFormatting(enabled) {
    this.stackTraceFormatting = enabled;
  }
  /**
   * Get whether stack trace formatting is enabled
   */
  isStackTraceFormattingEnabled() {
    return this.stackTraceFormatting;
  }
};
exports.JsonFormatter = __decorateClass([
  inversify.injectable()
], exports.JsonFormatter);

// src/utils/date.ts
function getDateFormatString(format, customFormat) {
  switch (format) {
    case "ISO8601" /* ISO8601 */:
      return "YYYY-MM-DDTHH:mm:ss.SSSZ";
    case "RFC3339" /* RFC3339 */:
      return "YYYY-MM-DDTHH:mm:ssZ";
    case "RFC2822" /* RFC2822 */:
      return "ddd, DD MMM YYYY HH:mm:ss ZZ";
    case "UNIX" /* UNIX */:
      return "X";
    case "YYYY-MM-DD" /* YYYY_MM_DD */:
      return "YYYY-MM-DD";
    case "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */:
      return "YYYY-MM-DD HH:mm:ss";
    case "DD/MM/YYYY" /* DD_MM_YYYY */:
      return "DD/MM/YYYY";
    case "MM/DD/YYYY" /* MM_DD_YYYY */:
      return "MM/DD/YYYY";
    case "HH:mm:ss" /* HH_MM_SS */:
      return "HH:mm:ss";
    case "YYYY-MM-DD HH:mm:ss.SSS" /* YYYY_MM_DD_HH_MM_SS_MILLI */:
      return "YYYY-MM-DD HH:mm:ss.SSS";
    // Handle milliseconds format here
    case "custom" /* CUSTOM */:
      return customFormat || "YYYY-MM-DD HH:mm:ss";
    default:
      return "YYYY-MM-DD HH:mm:ss";
  }
}
function formatDate(date, format, customFormat) {
  const formatString = getDateFormatString(format, customFormat);
  const year = date.getUTCFullYear();
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  if (format === "UNIX" /* UNIX */) {
    return Math.floor(date.getTime() / 1e3).toString();
  }
  return formatString.replace("YYYY", String(year)).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds).replace("SSS", milliseconds);
}

// src/constants/log-level-color.constant.ts
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

// src/constants/log-level-emoji.constant.ts
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

// src/formatters/line-formatter.ts
exports.LineFormatter = class LineFormatter {
  /**
   * Create a new LineFormatter instance
   * @param options Options for the formatter
   */
  constructor(options = {}) {
    this.name = "line" /* LINE */;
    this.dateFormat = "YYYY-MM-DD HH:mm:ss" /* YYYY_MM_DD_HH_MM_SS */;
    this.emojiSupport = true;
    this.colorSupport = true;
    this.stackTraceFormatting = true;
    if (options.dateFormat !== void 0) {
      this.dateFormat = options.dateFormat;
    }
    if (options.customDateFormat !== void 0) {
      this.customDateFormat = options.customDateFormat;
    }
    if (options.emojiSupport !== void 0) {
      this.emojiSupport = options.emojiSupport;
    }
    if (options.colorSupport !== void 0) {
      this.colorSupport = options.colorSupport;
    }
    if (options.stackTraceFormatting !== void 0) {
      this.stackTraceFormatting = options.stackTraceFormatting;
    }
  }
  /**
   * Format a log record
   * @param record The log record to format
   */
  format(record) {
    const level = record.level;
    const levelName = record.levelName;
    const message = record.message;
    const context = record.context;
    const datetime = this.formatDate(record.datetime);
    const stack = record.stack;
    let formattedMessage = message;
    if (this.emojiSupport && LogLevelEmoji[level]) {
      if (level in LogLevelEmoji) {
        formattedMessage = `${LogLevelEmoji[level]} ${formattedMessage}`;
      }
    }
    let line = `[${datetime}] [${levelName}] ${formattedMessage}`;
    if (Object.keys(context).length > 0) {
      line += ` ${JSON.stringify(context)}`;
    }
    if (stack && this.stackTraceFormatting) {
      line += `
${stack}`;
    }
    if (this.colorSupport && LogLevelColor[level]) {
      LogLevelColor[level];
      line = `%c${line}`;
    }
    return line;
  }
  /**
   * Format a batch of log records
   * @param records The log records to format
   */
  formatBatch(records) {
    return records.map((record) => this.format(record)).join("\n");
  }
  /**
   * Format a date according to the date format
   * @param date The date to format
   */
  formatDate(date) {
    return formatDate(date, this.dateFormat, this.customDateFormat);
  }
  /**
   * Get the formatter name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the date format
   */
  getDateFormat() {
    return this.dateFormat === "custom" /* CUSTOM */ && this.customDateFormat ? this.customDateFormat : this.dateFormat;
  }
  /**
   * Set the date format
   * @param format The date format
   */
  setDateFormat(format) {
    if (typeof format === "string") {
      this.dateFormat = "custom" /* CUSTOM */;
      this.customDateFormat = format;
    } else {
      this.dateFormat = format;
      this.customDateFormat = void 0;
    }
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
  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  setColorSupport(enabled) {
    this.colorSupport = enabled;
  }
  /**
   * Get whether color support is enabled
   */
  isColorSupportEnabled() {
    return this.colorSupport;
  }
  /**
   * Enable or disable stack trace formatting
   * @param enabled Whether stack trace formatting is enabled
   */
  setStackTraceFormatting(enabled) {
    this.stackTraceFormatting = enabled;
  }
  /**
   * Get whether stack trace formatting is enabled
   */
  isStackTraceFormattingEnabled() {
    return this.stackTraceFormatting;
  }
};
exports.LineFormatter = __decorateClass([
  inversify.injectable()
], exports.LineFormatter);
exports.SimpleFormatter = class SimpleFormatter {
  /**
   * Create a new SimpleFormatter instance
   * @param options Options for the formatter
   */
  constructor(options = {}) {
    this.name = "simple" /* SIMPLE */;
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
   * Format a log record
   * @param record The log record to format
   */
  format(record) {
    const level = record.level;
    const message = record.message;
    let formattedMessage = message;
    if (this.emojiSupport && LogLevelEmoji[level]) {
      formattedMessage = `${LogLevelEmoji[level]} ${formattedMessage}`;
    }
    let line = `[${record.levelName}] ${formattedMessage}`;
    if (this.colorSupport && LogLevelColor[level]) {
      const color = LogLevelColor[level];
      line = `%c${line}`;
      console.log(line, `color: ${color}`);
    }
    return line;
  }
  /**
   * Format a batch of log records
   * @param records The log records to format
   */
  formatBatch(records) {
    return records.map((record) => this.format(record)).join("\n");
  }
  /**
   * Get the formatter name
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
  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  setColorSupport(enabled) {
    this.colorSupport = enabled;
  }
  /**
   * Get whether color support is enabled
   */
  isColorSupportEnabled() {
    return this.colorSupport;
  }
};
exports.SimpleFormatter = __decorateClass([
  inversify.injectable()
], exports.SimpleFormatter);
exports.ConsoleHandler = class ConsoleHandler {
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
exports.ConsoleHandler = __decorateClass([
  inversify.injectable()
], exports.ConsoleHandler);
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
exports.FingersCrossedHandler = class FingersCrossedHandler {
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
exports.FingersCrossedHandler = __decorateClass([
  inversify.injectable()
], exports.FingersCrossedHandler);
exports.HttpHandler = class HttpHandler {
  /**
   * Create a new HttpHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    this.name = "http";
    this.next = null;
    this.url = "";
    this.method = "POST";
    this.headers = {
      "Content-Type": "application/json"
    };
    this.maxRetries = 3;
    if (options.url) {
      this.url = options.url;
    }
    if (options.method) {
      this.method = options.method;
    }
    if (options.headers) {
      this.headers = { ...this.headers, ...options.headers };
    }
    if (options.maxRetries !== void 0) {
      this.maxRetries = options.maxRetries;
    }
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  async handle(record) {
    if (!this.url) {
      console.error("HTTP handler URL not configured");
      return;
    }
    const payload = {
      level: record.level,
      levelName: record.levelName,
      message: record.message,
      context: record.context,
      datetime: record.datetime.toISOString(),
      stack: record.stack
    };
    let retries = 0;
    let success = false;
    while (!success && retries <= this.maxRetries) {
      try {
        const response = await fetch(this.url, {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          success = true;
        } else {
          retries++;
          if (retries <= this.maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 1e3 * Math.pow(2, retries - 1)));
          }
        }
      } catch (error) {
        retries++;
        if (retries <= this.maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1e3 * Math.pow(2, retries - 1)));
        } else {
          console.error("Failed to send log to HTTP endpoint:", error);
        }
      }
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
    return !!this.url && typeof fetch !== "undefined";
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
   * Set the name of the handler
   * @param name The name to set
   */
  setName(name) {
    this.name = name;
  }
  /**
   * Get the URL to send log records to
   */
  getUrl() {
    return this.url;
  }
  /**
   * Set the URL to send log records to
   * @param url The URL
   */
  setUrl(url) {
    this.url = url;
  }
  /**
   * Get the HTTP method to use
   */
  getMethod() {
    return this.method;
  }
  /**
   * Set the HTTP method to use
   * @param method The HTTP method
   */
  setMethod(method) {
    this.method = method;
  }
  /**
   * Get the HTTP headers to include in requests
   */
  getHeaders() {
    return this.headers;
  }
  /**
   * Set the HTTP headers to include in requests
   * @param headers The HTTP headers
   */
  setHeaders(headers) {
    this.headers = headers;
  }
  /**
   * Get the maximum number of retry attempts
   */
  getMaxRetries() {
    return this.maxRetries;
  }
  /**
   * Set the maximum number of retry attempts
   * @param maxRetries The maximum number of retry attempts
   */
  setMaxRetries(maxRetries) {
    this.maxRetries = maxRetries;
  }
};
exports.HttpHandler = __decorateClass([
  inversify.injectable()
], exports.HttpHandler);
exports.IndexedDBHandler = class IndexedDBHandler {
  /**
   * Create a new IndexedDBHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    this.name = "indexedDB" /* INDEXED_DB */;
    this.next = null;
    this.databaseName = "ts-log";
    this.tableName = "logs";
    this.maxEntries = 1e3;
    this.db = null;
    if (options.databaseName) {
      this.databaseName = options.databaseName;
    }
    if (options.tableName) {
      this.tableName = options.tableName;
    }
    if (options.maxEntries) {
      this.maxEntries = options.maxEntries;
    }
  }
  initDatabase() {
    if (typeof window === "undefined" || !window.indexedDB) {
      return;
    }
    try {
      this.db = new Dexie__default.default(this.databaseName);
      this.db.version(1).stores({
        [this.tableName]: "++id,level,datetime"
      });
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
    }
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  async handle(record) {
    if (!this.db) {
      console.error("IndexedDB not initialized");
      return;
    }
    try {
      await this.db.table(this.tableName).add({
        level: record.level,
        levelName: record.levelName,
        message: record.message,
        context: JSON.stringify(record.context),
        datetime: record.datetime.toISOString(),
        stack: record.stack
      });
      const count = await this.db.table(this.tableName).count();
      if (count > this.maxEntries) {
        const entriesToDelete = count - this.maxEntries;
        const oldestEntries = await this.db.table(this.tableName).orderBy("datetime").limit(entriesToDelete).toArray();
        const oldestIds = oldestEntries.map((entry) => entry.id);
        await this.db.table(this.tableName).bulkDelete(oldestIds);
      }
    } catch (error) {
      console.error("Failed to store log in IndexedDB:", error);
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
    return typeof window !== "undefined" && !!window.indexedDB && !!this.db;
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
   * Get the database name
   */
  getDatabaseName() {
    return this.databaseName;
  }
  /**
   * Set the database name
   * @param name The database name
   */
  setDatabaseName(name) {
    this.databaseName = name;
    this.initDatabase();
  }
  /**
   * Get the table name
   */
  getTableName() {
    return this.tableName;
  }
  /**
   * Set the table name
   * @param name The table name
   */
  setTableName(name) {
    this.tableName = name;
    this.initDatabase();
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
  async getEntries() {
    if (!this.db) {
      return [];
    }
    try {
      const entries = await this.db.table(this.tableName).toArray();
      return entries.map((entry) => ({
        ...entry,
        context: JSON.parse(entry.context)
      }));
    } catch (error) {
      console.error("Failed to retrieve logs from IndexedDB:", error);
      return [];
    }
  }
  /**
   * Clear all stored log entries
   */
  async clearEntries() {
    if (!this.db) {
      return;
    }
    try {
      await this.db.table(this.tableName).clear();
    } catch (error) {
      console.error("Failed to clear logs from IndexedDB:", error);
    }
  }
};
__decorateClass([
  inversify.postConstruct()
], exports.IndexedDBHandler.prototype, "initDatabase", 1);
exports.IndexedDBHandler = __decorateClass([
  inversify.injectable()
], exports.IndexedDBHandler);
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
exports.SlackWebhookHandler = class SlackWebhookHandler extends exports.HttpHandler {
  /**
   * Create a new SlackWebhookHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    super({
      url: options.url,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      maxRetries: options.maxRetries
    });
    this.channel = "#logs";
    this.username = "ts-log";
    this.iconEmoji = ":memo:";
    this.emojiSupport = true;
    if (options.channel) {
      this.channel = options.channel;
    }
    if (options.username) {
      this.username = options.username;
    }
    if (options.iconEmoji) {
      this.iconEmoji = options.iconEmoji;
    }
    if (options.emojiSupport !== void 0) {
      this.emojiSupport = options.emojiSupport;
    }
    this.setName("slack");
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  async handle(record) {
    if (!this.getUrl()) {
      console.error("Slack webhook URL not configured");
      return;
    }
    let message = record.message;
    if (this.emojiSupport && LogLevelEmoji[record.level]) {
      message = `${LogLevelEmoji[record.level]} ${message}`;
    }
    const payload = {
      channel: this.channel,
      username: this.username,
      icon_emoji: this.iconEmoji,
      text: `[${record.levelName}] ${message}`,
      attachments: [
        {
          color: this.getColorForLevel(record.level),
          fields: [
            {
              title: "Time",
              value: record.datetime.toISOString(),
              short: true
            },
            {
              title: "Level",
              value: record.levelName,
              short: true
            }
          ],
          fallback: `[${record.levelName}] ${message}`
        }
      ]
    };
    if (Object.keys(record.context).length > 0) {
      for (const [key, value] of Object.entries(record.context)) {
        payload.attachments[0].fields.push({
          title: key,
          value: JSON.stringify(value),
          short: false
        });
      }
    }
    if (record.stack) {
      payload.attachments[0].fields.push({
        title: "Stack Trace",
        value: `\`\`\`${record.stack}\`\`\``,
        short: false
      });
    }
    const originalHeaders = this.getHeaders();
    this.setHeaders({
      ...originalHeaders,
      "Content-Type": "application/json"
    });
    await super.handle({
      ...record,
      message: JSON.stringify(payload)
    });
  }
  /**
   * Get the color for a log level
   * @param level The log level
   */
  getColorForLevel(level) {
    switch (level) {
      case "emergency":
      case "alert":
      case "critical":
      case "error":
        return "danger";
      case "warning":
        return "warning";
      case "notice":
      case "info":
        return "good";
      case "debug":
      default:
        return "#CCCCCC";
    }
  }
  /**
   * Get the Slack channel to send log records to
   */
  getChannel() {
    return this.channel;
  }
  /**
   * Set the Slack channel to send log records to
   * @param channel The Slack channel
   */
  setChannel(channel) {
    this.channel = channel;
  }
  /**
   * Get the username to use when sending log records
   */
  getUsername() {
    return this.username;
  }
  /**
   * Set the username to use when sending log records
   * @param username The username
   */
  setUsername(username) {
    this.username = username;
  }
  /**
   * Get the emoji to use as the icon when sending log records
   */
  getIconEmoji() {
    return this.iconEmoji;
  }
  /**
   * Set the emoji to use as the icon when sending log records
   * @param emoji The emoji
   */
  setIconEmoji(emoji) {
    this.iconEmoji = emoji;
  }
  /**
   * Enable or disable emoji support in log messages
   * @param enabled Whether emoji support is enabled
   */
  setEmojiSupport(enabled) {
    this.emojiSupport = enabled;
  }
  /**
   * Get whether emoji support is enabled in log messages
   */
  isEmojiSupportEnabled() {
    return this.emojiSupport;
  }
};
exports.SlackWebhookHandler = __decorateClass([
  inversify.injectable()
], exports.SlackWebhookHandler);
exports.SyslogHandler = class SyslogHandler {
  /**
   * Create a new SyslogHandler instance
   * @param options Options for the handler
   */
  constructor(options = {}) {
    this.name = "syslog";
    this.next = null;
    this.facility = 16;
    // local0
    this.appName = "ts-log";
    this.procId = "browser";
    if (options.facility !== void 0) {
      this.facility = options.facility;
    }
    if (options.appName) {
      this.appName = options.appName;
    }
    if (options.procId) {
      this.procId = options.procId;
    }
  }
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  handle(record) {
    const syslogMessage = this.formatSyslogMessage(record);
    console.log(syslogMessage);
    if (this.next) {
      this.next.handle(record);
    }
  }
  /**
   * Format a log record as a syslog message
   * @param record The log record to format
   */
  formatSyslogMessage(record) {
    const priority = this.calculatePriority(record.level);
    const timestamp = record.datetime.toISOString();
    const message = record.message;
    const structuredData = this.formatStructuredData(record);
    return `<${priority}>1 ${timestamp} ${window.location.hostname} ${this.appName} ${this.procId} - ${structuredData} ${message}`;
  }
  /**
   * Calculate the syslog priority
   * @param level The log level
   */
  calculatePriority(level) {
    let severity;
    switch (level) {
      case "emergency" /* EMERGENCY */:
        severity = 0;
        break;
      case "alert" /* ALERT */:
        severity = 1;
        break;
      case "critical" /* CRITICAL */:
        severity = 2;
        break;
      case "error" /* ERROR */:
        severity = 3;
        break;
      case "warning" /* WARNING */:
        severity = 4;
        break;
      case "notice" /* NOTICE */:
        severity = 5;
        break;
      case "info" /* INFO */:
        severity = 6;
        break;
      case "debug" /* DEBUG */:
        severity = 7;
        break;
      default:
        severity = 7;
    }
    return this.facility * 8 + severity;
  }
  /**
   * Format the structured data
   * @param record The log record
   */
  formatStructuredData(record) {
    if (!record.context || Object.keys(record.context).length === 0) {
      return "-";
    }
    let structuredData = `[ts-log@0 `;
    for (const [key, value] of Object.entries(record.context)) {
      const escapedValue = String(value).replace(/[\\"]/g, "\\$&");
      structuredData += `${key}="${escapedValue}" `;
    }
    structuredData = structuredData.trim() + "]";
    return structuredData;
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
   * Get the facility code
   */
  getFacility() {
    return this.facility;
  }
  /**
   * Set the facility code
   * @param facility The facility code
   */
  setFacility(facility) {
    this.facility = facility;
  }
  /**
   * Get the application name
   */
  getAppName() {
    return this.appName;
  }
  /**
   * Set the application name
   * @param appName The application name
   */
  setAppName(appName) {
    this.appName = appName;
  }
  /**
   * Get the process ID
   */
  getProcId() {
    return this.procId;
  }
  /**
   * Set the process ID
   * @param procId The process ID
   */
  setProcId(procId) {
    this.procId = procId;
  }
};
exports.SyslogHandler = __decorateClass([
  inversify.injectable()
], exports.SyslogHandler);
exports.ContextLogProcessor = class ContextLogProcessor {
  /**
   * Create a new ContextLogProcessor instance
   * @param context Initial context
   */
  constructor(context = {}) {
    this.name = "context" /* CONTEXT */;
    this.context = {};
    this.context = context;
  }
  /**
   * Process a log record
   * @param record The log record to process
   */
  process(record) {
    const mergedContext = { ...this.context, ...record.context };
    return {
      ...record,
      context: mergedContext
    };
  }
  /**
   * Add contextual data to all subsequent log records
   * @param context The contextual data to add
   */
  addContext(context) {
    this.context = { ...this.context, ...context };
  }
  /**
   * Remove contextual data from all subsequent log records
   * @param keys The keys to remove from the context
   */
  removeContext(keys) {
    const newContext = { ...this.context };
    for (const key of keys) {
      delete newContext[key];
    }
    this.context = newContext;
  }
  /**
   * Get the current context
   */
  getContext() {
    return this.context;
  }
  /**
   * Clear the current context
   */
  clearContext() {
    this.context = {};
  }
  /**
   * Get the processor name
   */
  getName() {
    return this.name;
  }
};
exports.ContextLogProcessor = __decorateClass([
  inversify.injectable()
], exports.ContextLogProcessor);
exports.MessagePlaceholderProcessor = class MessagePlaceholderProcessor {
  /**
   * Create a new MessagePlaceholderProcessor instance
   * @param options Options for the processor
   */
  constructor(options = {}) {
    this.name = "messagePlaceholder" /* MESSAGE_PLACEHOLDER */;
    this.placeholderFormat = "{key}";
    this.emojiSupport = true;
    if (options.placeholderFormat) {
      this.placeholderFormat = options.placeholderFormat;
    }
    if (options.emojiSupport !== void 0) {
      this.emojiSupport = options.emojiSupport;
    }
  }
  /**
   * Process a log record
   * @param record The log record to process
   */
  process(record) {
    const message = this.replacePlaceholders(record.message, record.context);
    return {
      ...record,
      message
    };
  }
  /**
   * Replace placeholders in a message with corresponding context values.
   * The placeholder format is dynamically determined (e.g., '{key}', '%key%', '{{var}}', etc.).
   *
   * @param message - The input message string that may contain placeholders.
   * @param context - A dictionary of keys and values used to replace placeholders.
   * @returns The message with placeholders replaced by context values.
   */
  replacePlaceholders(message, context) {
    if (!message || !context || Object.keys(context).length === 0) {
      return message;
    }
    const pattern = this.getPlaceholderPattern();
    const match = pattern.match(/^(.*)(key|var)(.*)$/);
    if (!match) return message;
    const [, prefix, , suffix] = match;
    const regex = new RegExp(this.escapeRegExp(prefix) + "(\\w+)" + this.escapeRegExp(suffix), "g");
    return message.replace(regex, (_fullMatch, token) => {
      const value = context[token];
      if (value === void 0 || value === null) return "";
      if (typeof value === "object") return this.convertToString(value);
      if (this.emojiSupport && typeof value === "string" && this.isEmoji(value)) {
        return value;
      }
      return String(value);
    });
  }
  /**
   * Get the placeholder pattern
   */
  getPlaceholderPattern() {
    return this.placeholderFormat;
  }
  /**
   * Escape special characters in a string for use in a regular expression
   * @param string The string to escape
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  /**
   * Convert a value to a string
   * @param value The value to convert
   */
  convertToString(value) {
    if (value === null || value === void 0) {
      return "";
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value);
  }
  /**
   * Check if a string is an emoji
   * @param string The string to check
   */
  isEmoji(string) {
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(string);
  }
  /**
   * Get the processor name
   */
  getName() {
    return this.name;
  }
  /**
   * Set the placeholder format
   * @param format The placeholder format (e.g., '{key}')
   */
  setPlaceholderFormat(format) {
    this.placeholderFormat = format;
  }
  /**
   * Get the placeholder format
   */
  getPlaceholderFormat() {
    return this.placeholderFormat;
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
exports.MessagePlaceholderProcessor = __decorateClass([
  inversify.injectable()
], exports.MessagePlaceholderProcessor);
exports.ExceptionFormatter = class ExceptionFormatter {
  /**
   * Create a new ExceptionFormatter instance
   * @param options Options for the formatter
   */
  constructor(options = {}) {
    this.colorSupport = true;
    if (options.colorSupport !== void 0) {
      this.colorSupport = options.colorSupport;
    }
  }
  /**
   * Format an exception
   * @param exception The exception to format
   */
  async format(exception) {
    const message = exception.message;
    const name = exception.name;
    const stack = await this.getStackTrace(exception);
    let formatted = `${name}: ${message}
${stack}`;
    if (this.colorSupport) {
      formatted = `%c${formatted}`;
    }
    return formatted;
  }
  /**
   * Get the stack trace from an exception
   * @param exception The exception to get the stack trace from
   */
  async getStackTrace(exception) {
    try {
      const stackFrames = await StackTrace__default.default.fromError(exception);
      return this.formatStackFrames(stackFrames);
    } catch (error) {
      return exception.stack || "";
    }
  }
  /**
   * Format stack frames
   * @param stackFrames The stack frames to format
   */
  formatStackFrames(stackFrames) {
    return stackFrames.map((frame) => {
      const fileName = frame.fileName || "<anonymous>";
      const lineNumber = frame.lineNumber || "?";
      const columnNumber = frame.columnNumber || "?";
      const functionName = frame.functionName || "<anonymous>";
      return `    at ${functionName} (${fileName}:${lineNumber}:${columnNumber})`;
    }).join("\n");
  }
  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  setColorSupport(enabled) {
    this.colorSupport = enabled;
  }
  /**
   * Get whether color support is enabled
   */
  isColorSupportEnabled() {
    return this.colorSupport;
  }
};
exports.ExceptionFormatter = __decorateClass([
  inversify.injectable()
], exports.ExceptionFormatter);

// src/providers/context-service-provider.ts
exports.ContextServiceProvider = class ContextServiceProvider extends tsApplication.ServiceProvider {
  /**
   * Register the context management services in the container
   */
  register() {
    this.app.bind(exports.IContextManagement.$).to(exports.ContextRepository).inSingletonScope();
    this.app.bind(exports.IContextLogProcessor.$).to(exports.ContextLogProcessor).inSingletonScope();
    this.app.bind(exports.IContextManager.$).to(exports.ContextManager).inSingletonScope();
    this.app.bind(exports.IExceptionFormatter.$).to(exports.ExceptionFormatter).inSingletonScope();
  }
  /**
   * Boot the context management services
   */
  boot() {
    const contextRepository = this.app.make(exports.IContextManagement.$);
    this.app.make(exports.IContextLogProcessor.$);
    this.app.make(exports.IEventDispatcher.$);
    contextRepository.add("app", "ts-logger");
    contextRepository.add("startTime", (/* @__PURE__ */ new Date()).toISOString());
  }
};
exports.ContextServiceProvider = __decorateClass([
  inversify.injectable()
], exports.ContextServiceProvider);
exports.LogServiceProvider = class LogServiceProvider extends tsApplication.ServiceProvider {
  /**
   * Register all logging services, channels, handlers, formatters, and processors
   */
  register() {
    this.app.bind(exports.IEventDispatcher.$).to(exports.EventDispatcher).inSingletonScope();
    this.app.bind(exports.ILogManager.$).to(exports.LogManager).inSingletonScope();
    this.app.bind(exports.ILoggingService.$).to(exports.Logger);
    this.app.bind(exports.IStackChannel.$).to(exports.StackChannel);
    this.app.bind(exports.ISingleChannel.$).to(exports.SingleChannel);
    this.app.bind(exports.ILogHandler.$).to(exports.ConsoleHandler);
    this.app.bind(exports.IConsoleHandler.$).to(exports.ConsoleHandler);
    this.app.bind(exports.ILocalStorageHandler.$).to(exports.LocalStorageHandler);
    this.app.bind(exports.IIndexedDBHandler.$).to(exports.IndexedDBHandler);
    this.app.bind(exports.IHttpHandler.$).to(exports.HttpHandler);
    this.app.bind(exports.ISlackWebhookHandler.$).to(exports.SlackWebhookHandler);
    this.app.bind(exports.ISyslogHandler.$).to(exports.SyslogHandler);
    this.app.bind(exports.IErrorLogHandler.$).to(exports.ErrorLogHandler);
    this.app.bind(exports.IFingersCrossedHandler.$).to(exports.FingersCrossedHandler);
    this.app.bind(exports.ILogFormatter.$).to(exports.LineFormatter);
    this.app.bind(exports.ILineFormatter.$).to(exports.LineFormatter);
    this.app.bind(exports.IJsonFormatter.$).to(exports.JsonFormatter);
    this.app.bind(exports.ISimpleFormatter.$).to(exports.SimpleFormatter);
    this.app.bind(exports.ILogProcessor.$).to(exports.MessagePlaceholderProcessor);
    this.app.bind(exports.IMessagePlaceholderProcessor.$).to(exports.MessagePlaceholderProcessor);
  }
};
exports.LogServiceProvider = __decorateClass([
  inversify.injectable()
], exports.LogServiceProvider);

// src/utils/validations.ts
function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNull(value) {
  return value === null;
}
function isNullOrUndefined(value) {
  return isNull(value) || isUndefined(value);
}
function isEmpty(value) {
  if (isNullOrUndefined(value)) {
    return true;
  }
  if (isString(value) || Array.isArray(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}
function merge(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return merge(target, ...sources);
}

exports.ContextDehydratingEvent = ContextDehydratingEvent;
exports.ContextHydratedEvent = ContextHydratedEvent;
exports.DateFormat = DateFormat;
exports.FormatterType = FormatterType;
exports.HandlerType = HandlerType;
exports.LogChannelType = LogChannelType;
exports.LogLevel = LogLevel;
exports.LogLevelColor = LogLevelColor;
exports.LogLevelEmoji = LogLevelEmoji;
exports.LogLevelValue = LogLevelValue;
exports.MessageLoggedEvent = MessageLoggedEvent;
exports.ProcessorType = ProcessorType;
exports.formatDate = formatDate;
exports.getDateFormatString = getDateFormatString;
exports.isBoolean = isBoolean;
exports.isEmpty = isEmpty;
exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.loggingConfig = loggingConfig;
exports.merge = merge;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map