import { injectable, inject } from 'inversify'
import type { IContextManager } from '../interfaces/context/manager.interface'
import { IContextManagement } from '../interfaces/context/management.interface'
import type { LogContext } from '../types/log-context.type'

/**
 * ContextManager is an implementation of the IContextManager interface.
 * It provides methods for managing contextual data across components.
 */
@injectable()
export class ContextManager implements IContextManager {
  private context: LogContext = {}
  private parent: IContextManager | null = null
  private contextRepository: IContextManagement

  /**
   * Create a new ContextManager instance
   * @param contextRepository The context repository to use
   */
  constructor(@inject(IContextManagement.$) contextRepository: IContextManagement) {
    this.contextRepository = contextRepository
  }

  /**
   * Add contextual data
   * @param context The contextual data to add
   */
  public addContext(context: LogContext): void {
    this.context = { ...this.context, ...context }

    // Add the context to the repository
    for (const [key, value] of Object.entries(context)) {
      this.contextRepository.add(key, value)
    }
  }

  /**
   * Remove contextual data
   * @param keys The keys to remove from the context
   */
  public removeContext(keys: string[]): void {
    const newContext: LogContext = { ...this.context }
    for (const key of keys) {
      delete newContext[key]
      this.contextRepository.forget(key)
    }
    this.context = newContext
  }

  /**
   * Get all contextual data
   */
  public getContext(): LogContext {
    return this.context
  }

  /**
   * Clear all contextual data
   */
  public clearContext(): void {
    this.context = {}
  }

  /**
   * Create a scoped context manager
   */
  public createScope(): IContextManager {
    const scopedManager = new ContextManager(this.contextRepository)
    scopedManager.parent = this
    return scopedManager
  }

  /**
   * Merge contextual data from another context manager
   * @param manager The context manager to merge from
   */
  public merge(manager: IContextManager): void {
    this.addContext(manager.getContext())
  }
}
