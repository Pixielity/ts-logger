import { injectable, postConstruct, inject } from 'inversify';
import { ServiceProvider } from '@pixielity/ts-application';
import Dexie from 'dexie';

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

// src/interfaces/context/manager.interface.ts
var IContextManager;
((IContextManager2) => {
  IContextManager2.$ = Symbol.for("IContextManager");
})(IContextManager || (IContextManager = {}));

// src/interfaces/utils/exception-formatter.interface.ts
var IExceptionFormatter;
((IExceptionFormatter2) => {
  IExceptionFormatter2.$ = Symbol.for("IExceptionFormatter");
})(IExceptionFormatter || (IExceptionFormatter = {}));

// src/interfaces/events/dehydrating.interface.ts
var IContextDehydrating;
((IContextDehydrating2) => {
  IContextDehydrating2.$ = Symbol.for("IContextDehydrating");
})(IContextDehydrating || (IContextDehydrating = {}));

// src/interfaces/events/hydrated.interface.ts
var IContextHydrated;
((IContextHydrated2) => {
  IContextHydrated2.$ = Symbol.for("IContextHydrated");
})(IContextHydrated || (IContextHydrated = {}));

// src/interfaces/events/event-dispatcher.interface.ts
var IEventDispatcher;
((IEventDispatcher2) => {
  IEventDispatcher2.$ = Symbol.for("IEventDispatcher");
})(IEventDispatcher || (IEventDispatcher = {}));

// src/interfaces/events/log-event.interface.ts
var ILogEvent;
((ILogEvent2) => {
  ILogEvent2.$ = Symbol.for("ILogEvent");
})(ILogEvent || (ILogEvent = {}));

// src/interfaces/events/message-logged.interface.ts
var IMessageLogged;
((IMessageLogged2) => {
  IMessageLogged2.$ = Symbol.for("IMessageLogged");
})(IMessageLogged || (IMessageLogged = {}));

// src/interfaces/logging/manager.interface.ts
var ILogManager;
((ILogManager2) => {
  ILogManager2.$ = Symbol.for("ILogManager");
})(ILogManager || (ILogManager = {}));

// src/interfaces/logging/logging-service.interface.ts
var ILoggingService;
((ILoggingService2) => {
  ILoggingService2.$ = Symbol.for("ILoggingService");
})(ILoggingService || (ILoggingService = {}));

// src/interfaces/context/management.interface.ts
var IContextManagement;
((IContextManagement2) => {
  IContextManagement2.$ = Symbol.for("IContextManagement");
})(IContextManagement || (IContextManagement = {}));

// src/interfaces/channels/logging-channel.interface.ts
var ILoggingChannel;
((ILoggingChannel2) => {
  ILoggingChannel2.$ = Symbol.for("ILoggingChannel");
})(ILoggingChannel || (ILoggingChannel = {}));

// src/interfaces/channels/single-channel.interface.ts
var ISingleChannel;
((ISingleChannel2) => {
  ISingleChannel2.$ = Symbol.for("ISingleChannel");
})(ISingleChannel || (ISingleChannel = {}));

// src/interfaces/channels/stack-channel.interface.ts
var IStackChannel;
((IStackChannel2) => {
  IStackChannel2.$ = Symbol.for("IStackChannel");
})(IStackChannel || (IStackChannel = {}));

// src/interfaces/handlers/console-handler.interface.ts
var IConsoleHandler;
((IConsoleHandler2) => {
  IConsoleHandler2.$ = Symbol.for("IConsoleHandler");
})(IConsoleHandler || (IConsoleHandler = {}));

// src/interfaces/handlers/error-log-handler.interface.ts
var IErrorLogHandler;
((IErrorLogHandler2) => {
  IErrorLogHandler2.$ = Symbol.for("IErrorLogHandler");
})(IErrorLogHandler || (IErrorLogHandler = {}));

// src/interfaces/handlers/fingers-crossed-handler.interface.ts
var IFingersCrossedHandler;
((IFingersCrossedHandler2) => {
  IFingersCrossedHandler2.$ = Symbol.for("IFingersCrossedHandler");
})(IFingersCrossedHandler || (IFingersCrossedHandler = {}));

// src/interfaces/handlers/http-handler.interface.ts
var IHttpHandler;
((IHttpHandler2) => {
  IHttpHandler2.$ = Symbol.for("IHttpHandler");
})(IHttpHandler || (IHttpHandler = {}));

// src/interfaces/handlers/indexed-db-handler.interface.ts
var IIndexedDBHandler;
((IIndexedDBHandler2) => {
  IIndexedDBHandler2.$ = Symbol.for("IIndexedDBHandler");
})(IIndexedDBHandler || (IIndexedDBHandler = {}));

// src/interfaces/handlers/local-storage-handler.interface.ts
var ILocalStorageHandler;
((ILocalStorageHandler2) => {
  ILocalStorageHandler2.$ = Symbol.for("ILocalStorageHandler");
})(ILocalStorageHandler || (ILocalStorageHandler = {}));

// src/interfaces/handlers/log-handler.interface.ts
var ILogHandler;
((ILogHandler2) => {
  ILogHandler2.$ = Symbol.for("ILogHandler");
})(ILogHandler || (ILogHandler = {}));

// src/interfaces/handlers/slack-webhook-handler.interface.ts
var ISlackWebhookHandler;
((ISlackWebhookHandler2) => {
  ISlackWebhookHandler2.$ = Symbol.for("ISlackWebhookHandler");
})(ISlackWebhookHandler || (ISlackWebhookHandler = {}));

// src/interfaces/handlers/syslog-handler.interface.ts
var ISyslogHandler;
((ISyslogHandler2) => {
  ISyslogHandler2.$ = Symbol.for("ISyslogHandler");
})(ISyslogHandler || (ISyslogHandler = {}));

// src/interfaces/formatters/json-formatter.interface.ts
var IJsonFormatter;
((IJsonFormatter2) => {
  IJsonFormatter2.$ = Symbol.for("IJsonFormatter");
})(IJsonFormatter || (IJsonFormatter = {}));

// src/interfaces/formatters/line-formatter.interface.ts
var ILineFormatter;
((ILineFormatter2) => {
  ILineFormatter2.$ = Symbol.for("ILineFormatter");
})(ILineFormatter || (ILineFormatter = {}));

// src/interfaces/formatters/log-formatter.interface.ts
var ILogFormatter;
((ILogFormatter2) => {
  ILogFormatter2.$ = Symbol.for("ILogFormatter");
})(ILogFormatter || (ILogFormatter = {}));

// src/interfaces/formatters/simple-formatter.interface.ts
var ISimpleFormatter;
((ISimpleFormatter2) => {
  ISimpleFormatter2.$ = Symbol.for("ISimpleFormatter");
})(ISimpleFormatter || (ISimpleFormatter = {}));

// src/interfaces/processors/context-log-processor.interface.ts
var IContextLogProcessor;
((IContextLogProcessor2) => {
  IContextLogProcessor2.$ = Symbol.for("IContextLogProcessor");
})(IContextLogProcessor || (IContextLogProcessor = {}));

// src/interfaces/processors/log-processor.interface.ts
var ILogProcessor;
((ILogProcessor2) => {
  ILogProcessor2.$ = Symbol.for("ILogProcessor");
})(ILogProcessor || (ILogProcessor = {}));

// src/interfaces/processors/message-placeholder-processor.interface.ts
var IMessagePlaceholderProcessor;
((IMessagePlaceholderProcessor2) => {
  IMessagePlaceholderProcessor2.$ = Symbol.for("IMessagePlaceholderProcessor");
})(IMessagePlaceholderProcessor || (IMessagePlaceholderProcessor = {}));

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
var ErrorLogHandler = class {
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
ErrorLogHandler = __decorateClass([
  injectable()
], ErrorLogHandler);
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
var HttpHandler = class {
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
HttpHandler = __decorateClass([
  injectable()
], HttpHandler);
var IndexedDBHandler = class {
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
      this.db = new Dexie(this.databaseName);
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
  postConstruct()
], IndexedDBHandler.prototype, "initDatabase", 1);
IndexedDBHandler = __decorateClass([
  injectable()
], IndexedDBHandler);
var LocalStorageHandler = class {
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
LocalStorageHandler = __decorateClass([
  injectable()
], LocalStorageHandler);
var SlackWebhookHandler = class extends HttpHandler {
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
SlackWebhookHandler = __decorateClass([
  injectable()
], SlackWebhookHandler);
var SyslogHandler = class {
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
SyslogHandler = __decorateClass([
  injectable()
], SyslogHandler);
var JsonFormatter = class {
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
JsonFormatter = __decorateClass([
  injectable()
], JsonFormatter);

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

// src/formatters/line-formatter.ts
var LineFormatter = class {
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
LineFormatter = __decorateClass([
  injectable()
], LineFormatter);
var SimpleFormatter = class {
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
SimpleFormatter = __decorateClass([
  injectable()
], SimpleFormatter);
var SingleChannel = class {
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
SingleChannel = __decorateClass([
  injectable()
], SingleChannel);
var StackChannel = class {
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
StackChannel = __decorateClass([
  injectable(),
  __decorateParam(1, inject(IEventDispatcher.$))
], StackChannel);

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
var LogManager = class {
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
LogManager = __decorateClass([
  injectable()
], LogManager);
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
var MessagePlaceholderProcessor = class {
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
MessagePlaceholderProcessor = __decorateClass([
  injectable()
], MessagePlaceholderProcessor);

// src/providers/log-service-provider.ts
var LogServiceProvider = class extends ServiceProvider {
  /**
   * Register all logging services, channels, handlers, formatters, and processors
   */
  register() {
    this.app.bind(IEventDispatcher.$).to(EventDispatcher).inSingletonScope();
    this.app.bind(ILogManager.$).to(LogManager).inSingletonScope();
    this.app.bind(ILoggingService.$).to(Logger);
    this.app.bind(IStackChannel.$).to(StackChannel);
    this.app.bind(ISingleChannel.$).to(SingleChannel);
    this.app.bind(ILogHandler.$).to(ConsoleHandler);
    this.app.bind(IConsoleHandler.$).to(ConsoleHandler);
    this.app.bind(ILocalStorageHandler.$).to(LocalStorageHandler);
    this.app.bind(IIndexedDBHandler.$).to(IndexedDBHandler);
    this.app.bind(IHttpHandler.$).to(HttpHandler);
    this.app.bind(ISlackWebhookHandler.$).to(SlackWebhookHandler);
    this.app.bind(ISyslogHandler.$).to(SyslogHandler);
    this.app.bind(IErrorLogHandler.$).to(ErrorLogHandler);
    this.app.bind(IFingersCrossedHandler.$).to(FingersCrossedHandler);
    this.app.bind(ILogFormatter.$).to(LineFormatter);
    this.app.bind(ILineFormatter.$).to(LineFormatter);
    this.app.bind(IJsonFormatter.$).to(JsonFormatter);
    this.app.bind(ISimpleFormatter.$).to(SimpleFormatter);
    this.app.bind(ILogProcessor.$).to(MessagePlaceholderProcessor);
    this.app.bind(IMessagePlaceholderProcessor.$).to(MessagePlaceholderProcessor);
  }
};
LogServiceProvider = __decorateClass([
  injectable()
], LogServiceProvider);

export { LogServiceProvider };
//# sourceMappingURL=log-service-provider.mjs.map
//# sourceMappingURL=log-service-provider.mjs.map