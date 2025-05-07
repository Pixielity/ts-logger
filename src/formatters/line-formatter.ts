import { injectable } from 'inversify'

import { formatDate } from '../utils/date'
import { DateFormat } from '../enums/date-format.enum'
import type { LogRecord } from '../types/log-record.type'
import { LogLevelEmoji, LogLevelColor } from '../constants'
import { FormatterType } from '../enums/formatter-type.enum'
import type { ILineFormatter } from '../interfaces/formatters/line-formatter.interface'

/**
 * LineFormatter is an implementation of the ILineFormatter interface.
 * It formats log records as lines of text.
 */
@injectable()
export class LineFormatter implements ILineFormatter {
  private name = FormatterType.LINE
  private dateFormat = DateFormat.YYYY_MM_DD_HH_MM_SS
  private customDateFormat?: string
  private emojiSupport = true
  private colorSupport = true
  private stackTraceFormatting = true

  /**
   * Create a new LineFormatter instance
   * @param options Options for the formatter
   */
  constructor(
    options: {
      dateFormat?: DateFormat
      customDateFormat?: string
      emojiSupport?: boolean
      colorSupport?: boolean
      stackTraceFormatting?: boolean
    } = {},
  ) {
    if (options.dateFormat !== undefined) {
      this.dateFormat = options.dateFormat
    }
    if (options.customDateFormat !== undefined) {
      this.customDateFormat = options.customDateFormat
    }
    if (options.emojiSupport !== undefined) {
      this.emojiSupport = options.emojiSupport
    }
    if (options.colorSupport !== undefined) {
      this.colorSupport = options.colorSupport
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
    const level = record.level
    const levelName = record.levelName
    const message = record.message
    const context = record.context
    const datetime = this.formatDate(record.datetime)
    const stack = record.stack

    // Format the message with emoji if enabled
    let formattedMessage = message
    if (this.emojiSupport && LogLevelEmoji[level as keyof typeof LogLevelEmoji]) {
      if (level in LogLevelEmoji) {
        formattedMessage = `${
          LogLevelEmoji[level as keyof typeof LogLevelEmoji]
        } ${formattedMessage}`
      }
    }

    // Format the line
    let line = `[${datetime}] [${levelName}] ${formattedMessage}`

    // Add context if it's not empty
    if (Object.keys(context).length > 0) {
      line += ` ${JSON.stringify(context)}`
    }

    // Add stack trace if it exists and stack trace formatting is enabled
    if (stack && this.stackTraceFormatting) {
      line += `\n${stack}`
    }

    // Add color if enabled
    if (this.colorSupport && LogLevelColor[level as keyof typeof LogLevelColor]) {
      const color = LogLevelColor[level as keyof typeof LogLevelColor]
      line = `%c${line}`
      // Note: In a browser environment, this would be used with console.log
      // console.log(line, `color: ${color}`)
    }

    return line
  }

  /**
   * Format a batch of log records
   * @param records The log records to format
   */
  public formatBatch(records: LogRecord[]): string {
    return records.map((record) => this.format(record)).join('\n')
  }

  /**
   * Format a date according to the date format
   * @param date The date to format
   */
  private formatDate(date: Date): string {
    return formatDate(date, this.dateFormat, this.customDateFormat)
  }

  /**
   * Get the formatter name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the date format
   */
  public getDateFormat(): string {
    return this.dateFormat === DateFormat.CUSTOM && this.customDateFormat
      ? this.customDateFormat
      : this.dateFormat
  }

  /**
   * Set the date format
   * @param format The date format
   */
  public setDateFormat(format: DateFormat | string): void {
    if (typeof format === 'string') {
      this.dateFormat = DateFormat.CUSTOM
      this.customDateFormat = format
    } else {
      this.dateFormat = format
      this.customDateFormat = undefined
    }
  }

  /**
   * Enable or disable emoji support
   * @param enabled Whether emoji support is enabled
   */
  public setEmojiSupport(enabled: boolean): void {
    this.emojiSupport = enabled
  }

  /**
   * Get whether emoji support is enabled
   */
  public isEmojiSupportEnabled(): boolean {
    return this.emojiSupport
  }

  /**
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  public setColorSupport(enabled: boolean): void {
    this.colorSupport = enabled
  }

  /**
   * Get whether color support is enabled
   */
  public isColorSupportEnabled(): boolean {
    return this.colorSupport
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
