import { injectable, inject } from 'inversify';

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

// src/interfaces/context/management.interface.ts
var IContextManagement;
((IContextManagement2) => {
  IContextManagement2.$ = Symbol.for("IContextManagement");
})(IContextManagement || (IContextManagement = {}));

// src/context/manager.ts
var ContextManager = class {
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
    const scopedManager = new ContextManager(this.contextRepository);
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
ContextManager = __decorateClass([
  injectable(),
  __decorateParam(0, inject(IContextManagement.$))
], ContextManager);

export { ContextManager };
//# sourceMappingURL=manager.mjs.map
//# sourceMappingURL=manager.mjs.map