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
//# sourceMappingURL=json-formatter.js.map
//# sourceMappingURL=json-formatter.js.map