import type { ILogEvent } from './log-event.interface'
import type { LogContext } from '../../types/log-context.type'

/**
 * IContextDehydrating defines the contract for context dehydrating events.
 * It provides methods for accessing information about context dehydration.
 */
export interface IContextDehydrating extends ILogEvent {
  /**
   * Get the context data being dehydrated
   */
  getContext(): LogContext

  /**
   * Set the context data being dehydrated
   * @param context The context data
   */
  setContext(context: LogContext): void
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IContextDehydrating {
  /**
   * Symbol for injecting the context dehydrating event
   */
  export const $ = Symbol.for('IContextDehydrating')
}
