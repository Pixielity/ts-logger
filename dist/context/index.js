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
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

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

// src/interfaces/context/management.interface.ts
var IContextManagement;
((IContextManagement2) => {
  IContextManagement2.$ = Symbol.for("IContextManagement");
})(IContextManagement || (IContextManagement = {}));

// src/context/manager.ts
exports.ContextManager = class ContextManager {
  /**
   * Create a new ContextManager instance
   * @param contextRepository The context repository to use
   */
  constructor(contextRepository) {
    this.context = {};
    this.parent = null;
    this.contextRepository = contextRepository;
  }
  /**
   * Add contextual data
   * @param context The contextual data to add
   */
  addContext(context) {
    this.context = { ...this.context, ...context };
    for (const [key, value] of Object.entries(context)) {
      this.contextRepository.add(key, value);
    }
  }
  /**
   * Remove contextual data
   * @param keys The keys to remove from the context
   */
  removeContext(keys) {
    const newContext = { ...this.context };
    for (const key of keys) {
      delete newContext[key];
      this.contextRepository.forget(key);
    }
    this.context = newContext;
  }
  /**
   * Get all contextual data
   */
  getContext() {
    return this.context;
  }
  /**
   * Clear all contextual data
   */
  clearContext() {
    this.context = {};
  }
  /**
   * Create a scoped context manager
   */
  createScope() {
    const scopedManager = new exports.ContextManager(this.contextRepository);
    scopedManager.parent = this;
    return scopedManager;
  }
  /**
   * Merge contextual data from another context manager
   * @param manager The context manager to merge from
   */
  merge(manager) {
    this.addContext(manager.getContext());
  }
};
exports.ContextManager = __decorateClass([
  inversify.injectable(),
  __decorateParam(0, inversify.inject(IContextManagement.$))
], exports.ContextManager);
exports.ContextRepository = class ContextRepository {
  /**
   * Create a new ContextRepository instance
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(eventDispatcher) {
    this.context = {};
    this.hiddenContext = {};
    this.stacks = {};
    this.counters = {};
    this.eventDispatcher = eventDispatcher;
  }
  /**
   * Add a value to the context
   * @param key The context key
   * @param value The context value
   */
  add(key, value) {
    this.context[key] = value;
  }
  /**
   * Get a value from the context
   * @param key The context key
   * @param defaultValue The default value to return if the key is not found
   */
  get(key, defaultValue) {
    var _a;
    return (_a = this.context[key]) != null ? _a : defaultValue;
  }
  /**
   * Check if the context contains a key
   * @param key The context key
   */
  has(key) {
    return key in this.context;
  }
  /**
   * Remove a value from the context
   * @param key The context key
   */
  forget(key) {
    delete this.context[key];
  }
  /**
   * Add a hidden value to the context
   * @param key The context key
   * @param value The context value
   */
  addHidden(key, value) {
    this.hiddenContext[key] = value;
  }
  /**
   * Get a hidden value from the context
   * @param key The context key
   * @param defaultValue The default value to return if the key is not found
   */
  getHidden(key, defaultValue) {
    var _a;
    return (_a = this.hiddenContext[key]) != null ? _a : defaultValue;
  }
  /**
   * Check if the context contains a hidden key
   * @param key The context key
   */
  hasHidden(key) {
    return key in this.hiddenContext;
  }
  /**
   * Remove a hidden value from the context
   * @param key The context key
   */
  forgetHidden(key) {
    delete this.hiddenContext[key];
  }
  /**
   * Push a value onto a stack in the context
   * @param key The context key
   * @param value The value to push
   */
  push(key, value) {
    if (!this.stacks[key]) {
      this.stacks[key] = [];
    }
    this.stacks[key].push(value);
  }
  /**
   * Pop a value from a stack in the context
   * @param key The context key
   */
  pop(key) {
    if (!this.stacks[key] || this.stacks[key].length === 0) {
      return void 0;
    }
    return this.stacks[key].pop();
  }
  /**
   * Check if a stack in the context contains a value
   * @param key The context key
   * @param value The value to check for
   */
  stackContains(key, value) {
    if (!this.stacks[key]) {
      return false;
    }
    return this.stacks[key].includes(value);
  }
  /**
   * Increment a counter in the context
   * @param key The context key
   * @param amount The amount to increment by
   */
  increment(key, amount = 1) {
    if (!this.counters[key]) {
      this.counters[key] = 0;
    }
    this.counters[key] += amount;
    return this.counters[key];
  }
  /**
   * Decrement a counter in the context
   * @param key The context key
   * @param amount The amount to decrement by
   */
  decrement(key, amount = 1) {
    if (!this.counters[key]) {
      this.counters[key] = 0;
    }
    this.counters[key] -= amount;
    return this.counters[key];
  }
  /**
   * Create a scoped context
   * @param callback The callback function to execute with the scoped context
   */
  scope(callback) {
    const savedContext = { ...this.context };
    const savedHiddenContext = { ...this.hiddenContext };
    const savedStacks = { ...this.stacks };
    const savedCounters = { ...this.counters };
    try {
      return callback();
    } finally {
      this.context = savedContext;
      this.hiddenContext = savedHiddenContext;
      this.stacks = savedStacks;
      this.counters = savedCounters;
    }
  }
  /**
   * Dehydrate the context to a serializable object
   */
  dehydrate() {
    const dehydratedContext = {
      context: { ...this.context },
      counters: { ...this.counters }
    };
    const event = new ContextDehydratingEvent(dehydratedContext.context);
    this.eventDispatcher.dispatch(event);
    dehydratedContext.context = event.getContext();
    return dehydratedContext;
  }
  /**
   * Hydrate the context from a serialized object
   * @param data The serialized context data
   */
  hydrate(data) {
    try {
      if (data.context) {
        this.context = { ...this.context, ...data.context };
      }
      if (data.counters) {
        this.counters = { ...this.counters, ...data.counters };
      }
      const event = new ContextHydratedEvent(this.context, "dehydrated");
      this.eventDispatcher.dispatch(event);
    } catch (error) {
      console.error("Failed to hydrate context:", error);
    }
  }
  /**
   * Get all context data
   */
  all() {
    return { ...this.context };
  }
  /**
   * Clear all context data
   */
  clear() {
    this.context = {};
    this.hiddenContext = {};
    this.stacks = {};
    this.counters = {};
  }
};
exports.ContextRepository = __decorateClass([
  inversify.injectable()
], exports.ContextRepository);

exports.ContextDehydratingEvent = ContextDehydratingEvent;
exports.ContextHydratedEvent = ContextHydratedEvent;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map