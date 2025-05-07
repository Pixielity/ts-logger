/**
 * ILogEvent defines the contract for log events.
 * It provides methods for identifying and handling log events.
 */
export interface ILogEvent {
  /**
   * Get the event name
   */
  getName(): string

  /**
   * Get the event data
   */
  getData(): Record<string, any>

  /**
   * Get the event timestamp
   */
  getTimestamp(): Date
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace ILogEvent {
  /**
   * Symbol for injecting the log event
   */
  export const $ = Symbol.for('ILogEvent')
}
