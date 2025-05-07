import type { ILogEvent } from './log-event.interface'
import type { LogContext } from '../../types/types'

/**
 * IContextHydrated defines the contract for context hydrated events.
 * It provides methods for accessing information about context hydration.
 */
export interface IContextHydrated extends ILogEvent {
  /**
   * Get the context data that was hydrated
   */
  getContext(): LogContext

  /**
   * Get the source of the hydrated data
   */
  getSource(): string
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IContextHydrated {
  /**
   * Symbol for injecting the context hydrated event
   */
  export const $ = Symbol.for('IContextHydrated')
}
