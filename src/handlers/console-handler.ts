import { injectable } from 'inversify'
import type { IConsoleHandler } from '../interfaces/handlers/console-handler.interface'
import type { LogRecord } from '../types/types'
import { HandlerType } from '../enums/handler-type.enum'
import { LogLevelColor, LogLevelEmoji } from '../constants'
import { LogLevel } from '../enums'

/**
 * ConsoleHandler is an implementation of the IConsoleHandler interface.
 * It handles log records by outputting them to the browser console.
 */
@injectable()
export class ConsoleHandler implements IConsoleHandler {
  private name = HandlerType.CONSOLE
  private next: IConsoleHandler | null = null
  private emojiSupport = true
  private colorSupport = true

  /**
   * Create a new ConsoleHandler instance
   * @param options Options for the handler
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
   * Handle a log record
   * @param record The log record to handle
   */
  public handle(record: LogRecord): void {
    const level = record.level as LogLevel
    const message = record.message
    const context = record.context
    const datetime = record.datetime
    const stack = record.stack

    // Format the message with emoji and color
    let formattedMessage = message
    if (this.emojiSupport && LogLevelEmoji[level as keyof typeof LogLevelEmoji]) {
      formattedMessage = `${LogLevelEmoji[level as keyof typeof LogLevelEmoji]} ${formattedMessage}`
    }

    // Log to the console with the appropriate method
    if (this.colorSupport && LogLevelColor[level as keyof typeof LogLevelColor]) {
      const color = LogLevelColor[level as keyof typeof LogLevelColor]
      console.log(
        `%c${datetime.toISOString()} [${level.toUpperCase()}] ${formattedMessage}`,
        `color: ${color}`,
      )
    } else {
      console.log(`${datetime.toISOString()} [${level.toUpperCase()}] ${formattedMessage}`)
    }

    // Log the context if it's not empty
    if (Object.keys(context).length > 0) {
      console.log('Context:', context)
    }

    // Log the stack trace if it exists
    if (stack) {
      console.log('Stack trace:', stack)
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
  public setNext(handler: IConsoleHandler): IConsoleHandler {
    this.next = handler
    return handler
  }

  /**
   * Get the next handler in the chain
   */
  public getNext(): IConsoleHandler | null {
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
   * Enable or disable color support
   * @param enabled Whether color support is enabled
   */
  public setColorSupport(enabled: boolean): void {
    this.colorSupport = enabled
  }

  /**
   * Get whether emoji support is enabled
   */
  public isEmojiSupportEnabled(): boolean {
    return this.emojiSupport
  }

  /**
   * Get whether color support is enabled
   */
  public isColorSupportEnabled(): boolean {
    return this.colorSupport
  }
}
