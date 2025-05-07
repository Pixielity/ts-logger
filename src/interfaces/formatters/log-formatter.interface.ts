import type { LogRecord } from '../../types/log-record.type'

/**
 * ILogFormatter defines the contract for log formatters.
 * It provides methods for formatting log records.
 */
export interface ILogFormatter {
  /**
   * Format a log record
   * @param record The log record to format
   */
  format(record: LogRecord): string

  /**
   * Format a batch of log records
   * @param records The log records to format
   */
  formatBatch(records: LogRecord[]): string

  /**
   * Get the formatter name
   */
  getName(): string
}

/**
 * Namespace containing symbols for dependency injection
 */
export namespace ILogFormatter {
  /**
   * Symbol for injecting the log formatter
   */
  export const $ = Symbol.for('ILogFormatter')
}
