import { injectable } from 'inversify'

import type { LogRecord } from '../types/log-record.type'
import { LogLevelColor, LogLevelEmoji } from '../constants'
import { FormatterType } from '../enums/formatter-type.enum'
import type { ISimpleFormatter } from '../interfaces/formatters/simple-formatter.interface'

/**
 * SimpleFormatter is an implementation of the ISimpleFormatter interface.
 * It formats log records in a simple format.
 */
@injectable()
export class SimpleFormatter implements ISimpleFormatter {
  private name = FormatterType.SIMPLE
  private emojiSupport = true
  private colorSupport = true

  /**
   * Create a new SimpleFormatter instance
   * @param options Options for the formatter
   */
  constructor(options: { emojiSupport?: boolean; colorSupport?: boolean } = {}) {
    if (options.emojiSupport !== undefined) {
      this.emojiSupport = options.emojiSupport
    }
    if (options.colorSupport !== undefined) {
      this.colorSupport = options.colorSupport
    }
  }

  /**
   * Format a log record
   * @param record The log record to format
   */
  public format(record: LogRecord): string {
    const level = record.level
    const message = record.message

    // Format the message with emoji if enabled
    let formattedMessage = message
    if (this.emojiSupport && LogLevelEmoji[level as keyof typeof LogLevelEmoji]) {
      formattedMessage = `${LogLevelEmoji[level as keyof typeof LogLevelEmoji]} ${formattedMessage}`
    }

    // Format the line
    let line = `[${record.levelName}] ${formattedMessage}`

    // Add color if enabled
    if (this.colorSupport && LogLevelColor[level as keyof typeof LogLevelColor]) {
      const color = LogLevelColor[level as keyof typeof LogLevelColor]
      line = `%c${line}`
      // Note: In a browser environment, this would be used with console.log
      console.log(line, `color: ${color}`)
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
   * Get the formatter name
   */
  public getName(): string {
    return this.name
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
}
