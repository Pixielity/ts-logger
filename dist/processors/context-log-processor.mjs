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
var ContextLogProcessor = class {
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
ContextLogProcessor = __decorateClass([
  injectable()
], ContextLogProcessor);

export { ContextLogProcessor };
//# sourceMappingURL=context-log-processor.mjs.map
//# sourceMappingURL=context-log-processor.mjs.map