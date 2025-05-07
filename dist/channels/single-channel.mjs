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

export { SingleChannel };
//# sourceMappingURL=single-channel.mjs.map
//# sourceMappingURL=single-channel.mjs.map