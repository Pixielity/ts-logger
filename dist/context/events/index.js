'use strict';

/**
 * @pixielity/ts-log v1.0.4
 * 
 * Advanced TypeScript type utilities with metadata inheritance support
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/context/events/dehydrating.event.ts
var ContextDehydratingEvent = class {
  /**
   * Create a new ContextDehydratingEvent instance
   * @param context The context data being dehydrated
   */
  constructor(context) {
    this.name = "context.dehydrating";
    this.timestamp = /* @__PURE__ */ new Date();
    this.context = context;
  }
  /**
   * Get the event name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the event data
   */
  getData() {
    return {
      context: this.context
    };
  }
  /**
   * Get the event timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }
  /**
   * Get the context data being dehydrated
   */
  getContext() {
    return this.context;
  }
  /**
   * Set the context data being dehydrated
   * @param context The context data
   */
  setContext(context) {
    this.context = context;
  }
};

// src/context/events/hydrated.event.ts
var ContextHydratedEvent = class {
  /**
   * Create a new ContextHydratedEvent instance
   * @param context The context data that was hydrated
   * @param source The source of the hydrated data
   */
  constructor(context, source) {
    this.name = "context.hydrated";
    this.timestamp = /* @__PURE__ */ new Date();
    this.context = context;
    this.source = source;
  }
  /**
   * Get the event name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the event data
   */
  getData() {
    return {
      context: this.context,
      source: this.source
    };
  }
  /**
   * Get the event timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }
  /**
   * Get the context data that was hydrated
   */
  getContext() {
    return this.context;
  }
  /**
   * Get the source of the hydrated data
   */
  getSource() {
    return this.source;
  }
};

exports.ContextDehydratingEvent = ContextDehydratingEvent;
exports.ContextHydratedEvent = ContextHydratedEvent;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map