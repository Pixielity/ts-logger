import { inject, injectable } from 'inversify'

import type { LogContext } from './types/types'
import { LogLevel } from './enums/log-level.enum'
import { MessageLoggedEvent } from './events/message-logged.event'
import type { ILoggingService } from './interfaces/logging/logging-service.interface'
import type { ILoggingChannel } from './interfaces/channels/logging-channel.interface'
import { IEventDispatcher } from './interfaces/events/event-dispatcher.interface'

/**
 * Logger is the main implementation of the ILoggingService interface.
 * It provides methods for logging messages at different levels and with contextual data.
 */
@injectable()
export class Logger implements ILoggingService {
  private _channel: ILoggingChannel
  private _context: LogContext = {}
  private _eventDispatcher: IEventDispatcher

  /**
   * Create a new Logger instance
   * @param channel The logging channel to use
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(
    injectableChannel: ILoggingChannel,
    @inject(IEventDispatcher.$) eventDispatcher: IEventDispatcher,
  ) {
    this._channel = injectableChannel
    this._eventDispatcher = eventDispatcher
  }

  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  public log(level: LogLevel, message: string, context: LogContext = {}): void {
    // Merge the context with the logger's context
    const mergedContext = { ...this._context, ...context }

    // Log the message to the channel
    this._channel.log(level, message, mergedContext)

    // Dispatch a MessageLogged event
    this._eventDispatcher.dispatch(
      new MessageLoggedEvent(
        level,
        message,
        mergedContext,
        undefined, // Stack trace will be added by the handler if needed
        this._channel.getName(),
      ),
    )
  }

  /**
   * Log a debug message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public debug(message: string, context: LogContext = {}): void {
    this.log(LogLevel.DEBUG, message, context)
  }

  /**
   * Log an info message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public info(message: string, context: LogContext = {}): void {
    this.log(LogLevel.INFO, message, context)
  }

  /**
   * Log a notice message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public notice(message: string, context: LogContext = {}): void {
    this.log(LogLevel.NOTICE, message, context)
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public warning(message: string, context: LogContext = {}): void {
    this.log(LogLevel.WARNING, message, context)
  }

  /**
   * Log an error message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public error(message: string, context: LogContext = {}): void {
    this.log(LogLevel.ERROR, message, context)
  }

  /**
   * Log a critical message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public critical(message: string, context: LogContext = {}): void {
    this.log(LogLevel.CRITICAL, message, context)
  }

  /**
   * Log an alert message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public alert(message: string, context: LogContext = {}): void {
    this.log(LogLevel.ALERT, message, context)
  }

  /**
   * Log an emergency message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public emergency(message: string, context: LogContext = {}): void {
    this.log(LogLevel.EMERGENCY, message, context)
  }

  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  public withContext(context: LogContext): ILoggingService {
    this._context = { ...this._context, ...context }
    return this
  }

  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  public withoutContext(keys: string[]): ILoggingService {
    const newContext: LogContext = { ...this._context }
    for (const key of keys) {
      delete newContext[key]
    }
    this._context = newContext
    return this
  }

  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  public shareContext(context: LogContext): void {
    this._channel.shareContext(context)
  }

  /**
   * Flush shared context
   */
  public flushSharedContext(): void {
    this._channel.flushSharedContext()
  }

  /**
   * Get the channel with the specified name
   * @param channel The channel name
   */
  public channel(channel: string): ILoggingService {
    throw new Error('Method not implemented in Logger. Use LogManager.channel() instead.')
  }

  /**
   * Get the stack channel with the specified name
   * @param stack The stack name
   */
  public stack(stack: string): ILoggingService {
    throw new Error('Method not implemented in Logger. Use LogManager.stack() instead.')
  }
}
