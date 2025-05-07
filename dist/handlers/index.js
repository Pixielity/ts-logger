'use strict';

var inversify = require('inversify');
var Dexie = require('dexie');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Dexie__default = /*#__PURE__*/_interopDefault(Dexie);

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

// src/constants/constants.ts
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
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map