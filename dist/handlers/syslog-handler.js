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
//# sourceMappingURL=syslog-handler.js.map
//# sourceMappingURL=syslog-handler.js.map