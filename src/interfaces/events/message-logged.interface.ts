import type { ILogEvent } from './log-event.interface'
import type { LogLevel } from '../../enums/log-level.enum'
import type { LogContext } from '../../types/types'

/**
 * IMessageLogged defines the contract for message logged events.
 * It provides methods for accessing information about logged messages.
 */
export interface IMessageLogged extends ILogEvent {
  /**
   * Get the log level
   */
  getLevel(): LogLevel

  /**
   * Get the log message
   */
  getMessage(): string

  /**
   * Get the log context
   */
  getContext(): LogContext

  /**
   * Get the stack trace
   */
  getStack(): string | undefined

  /**
   * Get the channel name
   */
  getChannel(): string
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace IMessageLogged {
  /**
   * Symbol for injecting the message logged event
   */
  export const $ = Symbol.for('IMessageLogged')
}
