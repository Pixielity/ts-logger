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

export { MessagePlaceholderProcessor };
//# sourceMappingURL=message-placeholder-processor.mjs.map
//# sourceMappingURL=message-placeholder-processor.mjs.map