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

export { LineFormatter };
//# sourceMappingURL=line-formatter.mjs.map
//# sourceMappingURL=line-formatter.mjs.map