import type { LogRecord } from '../../types/log-record.type'

/**
 * ILogProcessor defines the contract for log processors.
 * It provides methods for processing log records.
 */
export interface ILogProcessor {
  /**
   * Process a log record
   * @param record The log record to process
   */
  process(record: LogRecord): LogRecord

  /**
   * Get the processor name
   */
  getName(): string
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace ILogProcessor {
  /**
   * Symbol for injecting the log processor
   */
  export const $ = Symbol.for('ILogProcessor')
}
