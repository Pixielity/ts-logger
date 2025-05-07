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
var HttpHandler = class {
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
HttpHandler = __decorateClass([
  inversify.injectable()
], HttpHandler);
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

// src/handlers/slack-webhook-handler.ts
exports.SlackWebhookHandler = class SlackWebhookHandler extends HttpHandler {
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
//# sourceMappingURL=slack-webhook-handler.js.map
//# sourceMappingURL=slack-webhook-handler.js.map