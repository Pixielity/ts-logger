import type { LogRecord } from '../../types/log-record.type'

/**
 * ILogHandler defines the contract for log handlers.
 * It provides methods for handling log records.
 */
export interface ILogHandler {
  /**
   * Handle a log record
   * @param record The log record to handle
   */
  handle(record: LogRecord): void

  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  isHandling(record: LogRecord): boolean

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  setNext(handler: ILogHandler): ILogHandler

  /**
   * Get the next handler in the chain
   */
  getNext(): ILogHandler | null

  /**
   * Get the handler name
   */
  getName(): string
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace ILogHandler {
  /**
   * Symbol for injecting the log handler
   */
  export const $ = Symbol.for('ILogHandler')
}
