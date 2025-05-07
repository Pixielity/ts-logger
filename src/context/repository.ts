import { injectable } from 'inversify'
import type { IContextManagement } from '../interfaces/context/management.interface'
import type { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface'
import type { LogContext } from '../types/types'
import { ContextDehydratingEvent } from './events/context-dehydrating.event'
import { ContextHydratedEvent } from './events/context-hydrated.event'

/**
 * ContextRepository is an implementation of the IContextManagement interface.
 * It provides methods for managing contextual data.
 */
@injectable()
export class ContextRepository implements IContextManagement {
  private context: LogContext = {}
  private hiddenContext: LogContext = {}
  private stacks: Record<string, any[]> = {}
  private counters: Record<string, number> = {}
  private eventDispatcher: IEventDispatcher

  /**
   * Create a new ContextRepository instance
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(eventDispatcher: IEventDispatcher) {
    this.eventDispatcher = eventDispatcher
  }

  /**
   * Add a value to the context
   * @param key The context key
   * @param value The context value
   */
  public add(key: string, value: any): void {
    this.context[key] = value
  }

  /**
   * Get a value from the context
   * @param key The context key
   * @param defaultValue The default value to return if the key is not found
   */
  public get<T>(key: string, defaultValue?: T): T {
    return (this.context[key] as T) ?? (defaultValue as T)
  }

  /**
   * Check if the context contains a key
   * @param key The context key
   */
  public has(key: string): boolean {
    return key in this.context
  }

  /**
   * Remove a value from the context
   * @param key The context key
   */
  public forget(key: string): void {
    delete this.context[key]
  }

  /**
   * Add a hidden value to the context
   * @param key The context key
   * @param value The context value
   */
  public addHidden(key: string, value: any): void {
    this.hiddenContext[key] = value
  }

  /**
   * Get a hidden value from the context
   * @param key The context key
   * @param defaultValue The default value to return if the key is not found
   */
  public getHidden<T>(key: string, defaultValue?: T): T {
    return (this.hiddenContext[key] as T) ?? (defaultValue as T)
  }

  /**
   * Check if the context contains a hidden key
   * @param key The context key
   */
  public hasHidden(key: string): boolean {
    return key in this.hiddenContext
  }

  /**
   * Remove a hidden value from the context
   * @param key The context key
   */
  public forgetHidden(key: string): void {
    delete this.hiddenContext[key]
  }

  /**
   * Push a value onto a stack in the context
   * @param key The context key
   * @param value The value to push
   */
  public push(key: string, value: any): void {
    if (!this.stacks[key]) {
      this.stacks[key] = []
    }
    this.stacks[key].push(value)
  }

  /**
   * Pop a value from a stack in the context
   * @param key The context key
   */
  public pop<T>(key: string): T | undefined {
    if (!this.stacks[key] || this.stacks[key].length === 0) {
      return undefined
    }
    return this.stacks[key].pop() as T
  }

  /**
   * Check if a stack in the context contains a value
   * @param key The context key
   * @param value The value to check for
   */
  public stackContains(key: string, value: any): boolean {
    if (!this.stacks[key]) {
      return false
    }
    return this.stacks[key].includes(value)
  }

  /**
   * Increment a counter in the context
   * @param key The context key
   * @param amount The amount to increment by
   */
  public increment(key: string, amount = 1): number {
    if (!this.counters[key]) {
      this.counters[key] = 0
    }
    this.counters[key] += amount
    return this.counters[key]
  }

  /**
   * Decrement a counter in the context
   * @param key The context key
   * @param amount The amount to decrement by
   */
  public decrement(key: string, amount = 1): number {
    if (!this.counters[key]) {
      this.counters[key] = 0
    }
    this.counters[key] -= amount
    return this.counters[key]
  }

  /**
   * Create a scoped context
   * @param callback The callback function to execute with the scoped context
   */
  public scope<T>(callback: () => T): T {
    // Save the current context
    const savedContext = { ...this.context }
    const savedHiddenContext = { ...this.hiddenContext }
    const savedStacks = { ...this.stacks }
    const savedCounters = { ...this.counters }

    try {
      // Execute the callback
      return callback()
    } finally {
      // Restore the context
      this.context = savedContext
      this.hiddenContext = savedHiddenContext
      this.stacks = savedStacks
      this.counters = savedCounters
    }
  }

  /**
   * Dehydrate the context to a serializable object
   */
  public dehydrate(): Record<string, any> {
    // Create a dehydrated context
    const dehydratedContext: Record<string, any> = {
      context: { ...this.context },
      counters: { ...this.counters },
    }

    // Dispatch a ContextDehydrating event
    const event = new ContextDehydratingEvent(dehydratedContext.context)
    this.eventDispatcher.dispatch(event)

    // Update the dehydrated context with any changes made by event listeners
    dehydratedContext.context = event.getContext()

    return dehydratedContext
  }

  /**
   * Hydrate the context from a serialized object
   * @param data The serialized context data
   */
  public hydrate(data: Record<string, any>): void {
    try {
      // Hydrate the context
      if (data.context) {
        this.context = { ...this.context, ...data.context }
      }
      if (data.counters) {
        this.counters = { ...this.counters, ...data.counters }
      }

      // Dispatch a ContextHydrated event
      const event = new ContextHydratedEvent(this.context, 'dehydrated')
      this.eventDispatcher.dispatch(event)
    } catch (error) {
      console.error('Failed to hydrate context:', error)
    }
  }

  /**
   * Get all context data
   */
  public all(): LogContext {
    return { ...this.context }
  }

  /**
   * Clear all context data
   */
  public clear(): void {
    this.context = {}
    this.hiddenContext = {}
    this.stacks = {}
    this.counters = {}
  }
}
