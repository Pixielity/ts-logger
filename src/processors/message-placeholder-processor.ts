import { injectable } from 'inversify'
import type { IMessagePlaceholderProcessor } from '../interfaces/processors/message-placeholder-processor.interface'
import type { LogRecord } from '../types/types'
import { ProcessorType } from '../enums/processor-type.enum'

/**
 * MessagePlaceholderProcessor is an implementation of the IMessagePlaceholderProcessor interface.
 * It replaces placeholders in log messages with context values.
 */
@injectable()
export class MessagePlaceholderProcessor implements IMessagePlaceholderProcessor {
  private name = ProcessorType.MESSAGE_PLACEHOLDER
  private placeholderFormat = '{key}'
  private emojiSupport = true

  /**
   * Create a new MessagePlaceholderProcessor instance
   * @param options Options for the processor
   */
  constructor(options: { placeholderFormat?: string; emojiSupport?: boolean } = {}) {
    if (options.placeholderFormat) {
      this.placeholderFormat = options.placeholderFormat
    }
    if (options.emojiSupport !== undefined) {
      this.emojiSupport = options.emojiSupport
    }
  }

  /**
   * Process a log record
   * @param record The log record to process
   */
  public process(record: LogRecord): LogRecord {
    // Replace placeholders in the message
    const message = this.replacePlaceholders(record.message, record.context)

    // Return the updated record
    return {
      ...record,
      message,
    }
  }

  /**
   * Replace placeholders in a message with context values
   * @param message The message to process
   * @param context The context values
   */
  private replacePlaceholders(message: string, context: Record<string, any>): string {
    if (!message || !context || Object.keys(context).length === 0) {
      return message
    }

    let result = message

    // Get the placeholder pattern
    const placeholderPattern = this.getPlaceholderPattern()

    // Replace all placeholders
    for (const [key, value] of Object.entries(context)) {
      const placeholder = placeholderPattern.replace('key', key)
      const regex = new RegExp(this.escapeRegExp(placeholder), 'g')

      // Convert the value to a string
      let stringValue = this.convertToString(value)

      // Add emoji if enabled and the value is a string with an emoji
      if (this.emojiSupport && typeof value === 'string' && this.isEmoji(value)) {
        stringValue = value
      }

      result = result.replace(regex, stringValue)
    }

    return result
  }

  /**
   * Get the placeholder pattern
   */
  private getPlaceholderPattern(): string {
    return this.placeholderFormat
  }

  /**
   * Escape special characters in a string for use in a regular expression
   * @param string The string to escape
   */
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  /**
   * Convert a value to a string
   * @param value The value to convert
   */
  private convertToString(value: any): string {
    if (value === null || value === undefined) {
      return ''
    }
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    return String(value)
  }

  /**
   * Check if a string is an emoji
   * @param string The string to check
   */
  private isEmoji(string: string): boolean {
    // Simple check for emoji (Unicode emoji range)
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
    return emojiRegex.test(string)
  }

  /**
   * Get the processor name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Set the placeholder format
   * @param format The placeholder format (e.g., '{key}')
   */
  public setPlaceholderFormat(format: string): void {
    this.placeholderFormat = format
  }

  /**
   * Get the placeholder format
   */
  public getPlaceholderFormat(): string {
    return this.placeholderFormat
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
}
