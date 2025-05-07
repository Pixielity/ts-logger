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
  injectable()
], HttpHandler);

export { HttpHandler };
//# sourceMappingURL=http-handler.mjs.map
//# sourceMappingURL=http-handler.mjs.map