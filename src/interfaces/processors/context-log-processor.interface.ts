import type { ILogProcessor } from './log-processor.interface'
import type { LogContext } from '../../types/log-context.type'

/**
 * IContextLogProcessor defines the contract for context log processors.
 * It provides methods for adding contextual data to log records.
 */
export interface IContextLogProcessor extends ILogProcessor {
  /**
   * Add contextual data to all subsequent log records
   * @param context The contextual data to add
   */
  addContext(context: LogContext): void

  /**
   * Remove contextual data from all subsequent log records
   * @param keys The keys to remove from the context
   */
  removeContext(keys: string[]): void

  /**
   * Get the current context
   */
  getContext(): LogContext

  /**
   * Clear the current context
   */
  clearContext(): void
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IContextLogProcessor {
  /**
   * Symbol for injecting the context log processor
   */
  export const $ = Symbol.for('IContextLogProcessor')
}
