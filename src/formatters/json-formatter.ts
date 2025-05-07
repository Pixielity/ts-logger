import { injectable } from 'inversify'
import type { IJsonFormatter } from '../interfaces/formatters/json-formatter.interface'
import type { LogRecord } from '../types/types'
import { FormatterType } from '../enums/formatter-type.enum'

/**
 * JsonFormatter is an implementation of the IJsonFormatter interface.
 * It formats log records as JSON.
 */
@injectable()
export class JsonFormatter implements IJsonFormatter {
  private name = FormatterType.JSON
  private prettyPrint = false
  private stackTraceFormatting = true

  /**
   * Create a new JsonFormatter instance
   * @param options Options for the formatter
   */
  constructor(options: { prettyPrint?: boolean; stackTraceFormatting?: boolean } = {}) {
    if (options.prettyPrint !== undefined) {
      this.prettyPrint = options.prettyPrint
    }
    if (options.stackTraceFormatting !== undefined) {
      this.stackTraceFormatting = options.stackTraceFormatting
    }
  }

  /**
   * Format a log record
   * @param record The log record to format
   */
  public format(record: LogRecord): string {
    const jsonRecord: Record<string, any> = {
      level: record.level,
      levelName: record.levelName,
      message: record.message,
      context: record.context,
      datetime: record.datetime.toISOString(),
    }

    // Add stack trace if it exists and stack trace formatting is enabled
    if (record.stack && this.stackTraceFormatting) {
      jsonRecord.stack = record.stack
    }

    // Add extra fields if they exist
    if (record.extra) {
      jsonRecord.extra = record.extra
    }

    // Convert to JSON
    return JSON.stringify(jsonRecord, null, this.prettyPrint ? 2 : 0)
  }

  /**
   * Format a batch of log records
   * @param records The log records to format
   */
  public formatBatch(records: LogRecord[]): string {
    const jsonRecords = records.map((record) => {
      const jsonRecord: Record<string, any> = {
        level: record.level,
        levelName: record.levelName,
        message: record.message,
        context: record.context,
        datetime: record.datetime.toISOString(),
      }

      // Add stack trace if it exists and stack trace formatting is enabled
      if (record.stack && this.stackTraceFormatting) {
        jsonRecord.stack = record.stack
      }

      // Add extra fields if they exist
      if (record.extra) {
        jsonRecord.extra = record.extra
      }

      return jsonRecord
    })

    // Convert to JSON
    return JSON.stringify(jsonRecords, null, this.prettyPrint ? 2 : 0)
  }

  /**
   * Get the formatter name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Enable or disable pretty printing
   * @param enabled Whether pretty printing is enabled
   */
  public setPrettyPrint(enabled: boolean): void {
    this.prettyPrint = enabled
  }

  /**
   * Get whether pretty printing is enabled
   */
  public isPrettyPrintEnabled(): boolean {
    return this.prettyPrint
  }

  /**
   * Enable or disable stack trace formatting
   * @param enabled Whether stack trace formatting is enabled
   */
  public setStackTraceFormatting(enabled: boolean): void {
    this.stackTraceFormatting = enabled
  }

  /**
   * Get whether stack trace formatting is enabled
   */
  public isStackTraceFormattingEnabled(): boolean {
    return this.stackTraceFormatting
  }
}
