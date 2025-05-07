import { injectable } from 'inversify';
import StackTrace from 'stacktrace-js';

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
var ExceptionFormatter = class {
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
      const stackFrames = await StackTrace.fromError(exception);
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
ExceptionFormatter = __decorateClass([
  injectable()
], ExceptionFormatter);

export { ExceptionFormatter, formatDate, getDateFormatString, isBoolean, isEmpty, isFunction, isNull, isNullOrUndefined, isNumber, isObject, isString, isUndefined, merge };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map