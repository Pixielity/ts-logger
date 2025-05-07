import { injectable } from 'inversify'

import type { LogRecord } from '../types/log-record.type'
import { ProcessorType } from '../enums/processor-type.enum'
import type { IMessagePlaceholderProcessor } from '../interfaces/processors/message-placeholder-processor.interface'

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
   * Replace placeholders in a message with corresponding context values.
   * The placeholder format is dynamically determined (e.g., '{key}', '%key%', '{{var}}', etc.).
   *
   * @param message - The input message string that may contain placeholders.
   * @param context - A dictionary of keys and values used to replace placeholders.
   * @returns The message with placeholders replaced by context values.
   */
  private replacePlaceholders(message: string, context: Record<string, any>): string {
    // If the message is empty or there is no context to apply, return the message as is
    if (!message || !context || Object.keys(context).length === 0) {
      return message
    }

    // Retrieve the placeholder format pattern (e.g., '{key}', '{{var}}', '%key%')
    const pattern = this.getPlaceholderPattern()

    /**
     * Match and extract the parts of the pattern:
     * - group 1: prefix (before 'key' or 'var')
     * - group 2: the token placeholder ('key' or 'var')
     * - group 3: suffix (after 'key' or 'var')
     */
    const match = pattern.match(/^(.*)(key|var)(.*)$/)

    // If pattern does not include 'key' or 'var', we can't process it
    if (!match) return message

    // Destructure the match groups: prefix and suffix around the token name
    const [, prefix, , suffix] = match

    /**
     * Build a dynamic RegExp using the detected prefix and suffix
     * Example: if prefix='{', suffix='}', it becomes /\{(\w+)\}/g
     * The (\w+) group captures the placeholder token (e.g., "user" in "{user}")
     */
    const regex = new RegExp(this.escapeRegExp(prefix) + '(\\w+)' + this.escapeRegExp(suffix), 'g')

    // Replace each matched placeholder in the message
    return message.replace(regex, (_fullMatch, token) => {
      // Look up the token in the context
      const value = context[token]

      // If the token isn't found or is null/undefined, replace with an empty string
      if (value === undefined || value === null) return ''

      // If value is an object (e.g., array, plain object), convert it to a JSON string
      if (typeof value === 'object') return this.convertToString(value)

      // If emoji support is enabled and value is a string emoji, use it as-is
      if (this.emojiSupport && typeof value === 'string' && this.isEmoji(value)) {
        return value
      }

      // Otherwise, return the value converted to a string
      return String(value)
    })
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
