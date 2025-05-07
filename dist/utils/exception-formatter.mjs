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

export { ExceptionFormatter };
//# sourceMappingURL=exception-formatter.mjs.map
//# sourceMappingURL=exception-formatter.mjs.map