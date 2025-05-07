'use strict';

var Dexie = require('dexie');
var inversify = require('inversify');

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
//# sourceMappingURL=indexed-db-handler.js.map
//# sourceMappingURL=indexed-db-handler.js.map