import { injectable } from 'inversify'
import type { IErrorLogHandler } from '../interfaces/handlers/error-log-handler.interface'
import type { LogRecord } from '../types/types'
import { LogLevelEmoji } from '../constants'

/**
 * ErrorLogHandler is an implementation of the IErrorLogHandler interface.
 * It handles log records by outputting them to the browser's error log.
 */
@injectable()
export class ErrorLogHandler implements IErrorLogHandler {
  private name = 'errorLog'
  private next: IErrorLogHandler | null = null
  private emojiSupport = true

  /**
   * Create a new ErrorLogHandler instance
   * @param options Options for the handler
   */
  constructor(options: { emojiSupport?: boolean } = {}) {
    if (options.emojiSupport !== undefined) {
      this.emojiSupport = options.emojiSupport
    }
  }

  /**
   * Handle a log record
   * @param record The log record to handle
   */
  public handle(record: LogRecord): void {
    const level = record.level
    const message = record.message
    const context = record.context
    const datetime = record.datetime
    const stack = record.stack

    // Format the message with emoji if enabled
    let formattedMessage = message
    if (this.emojiSupport && LogLevelEmoji[level as keyof typeof LogLevelEmoji]) {
      formattedMessage = `${LogLevelEmoji[level as keyof typeof LogLevelEmoji]} ${formattedMessage}`
    }

    // Format the error message
    let errorMessage = `[${datetime.toISOString()}] [${record.levelName}] ${formattedMessage}`

    // Add context if it's not empty
    if (Object.keys(context).length > 0) {
      errorMessage += ` ${JSON.stringify(context)}`
    }

    // Log to the console.error
    console.error(errorMessage)

    // Log the stack trace if it exists
    if (stack) {
      console.error('Stack trace:', stack)
    }

    // Pass the record to the next handler in the chain
    if (this.next) {
      this.next.handle(record)
    }
  }

  /**
   * Check if the handler can handle the log record
   * @param record The log record to check
   */
  public isHandling(record: LogRecord): boolean {
    return true
  }

  /**
   * Set the next handler in the chain
   * @param handler The next handler
   */
  public setNext(handler: IErrorLogHandler): IErrorLogHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): IErrorLogHandler | null {
    return this.next
  }

  /**
   * Get the handler name
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
}
