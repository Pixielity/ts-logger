import type { LogLevel } from '../enums/log-level.enum'
import type { LogContext } from '../types/log-context.type'
import type { IMessageLogged } from '../interfaces/events/message-logged.interface'

/**
 * MessageLoggedEvent is an implementation of the IMessageLogged interface.
 * It represents an event that is dispatched when a message is logged.
 */
export class MessageLoggedEvent implements IMessageLogged {
  private name = 'message.logged'
  private timestamp: Date = new Date()
  private level: LogLevel
  private message: string
  private context: LogContext
  private stack?: string
  private channel: string

  /**
   * Create a new MessageLoggedEvent instance
   * @param level The log level
   * @param message The log message
   * @param context The log context
   * @param stack The stack trace
   * @param channel The channel name
   */
  constructor(
    level: LogLevel,
    message: string,
    context: LogContext,
    stack?: string,
    channel = 'default',
  ) {
    this.level = level
    this.message = message
    this.context = context
    this.stack = stack
    this.channel = channel
  }

  /**
   * Get the event name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Get the event data
   */
  public getData(): Record<string, any> {
    return {
      level: this.level,
      message: this.message,
      context: this.context,
      stack: this.stack,
      channel: this.channel,
    }
  }

  /**
   * Get the event timestamp
   */
  public getTimestamp(): Date {
    return this.timestamp
  }

  /**
   * Get the log level
   */
  public getLevel(): LogLevel {
    return this.level
  }

  /**
   * Get the log message
   */
  public getMessage(): string {
    return this.message
  }

  /**
   * Get the log context
   */
  public getContext(): LogContext {
    return this.context
  }

  /**
   * Get the stack trace
   */
  public getStack(): string | undefined {
    return this.stack
  }

  /**
   * Get the channel name
   */
  public getChannel(): string {
    return this.channel
  }
}
