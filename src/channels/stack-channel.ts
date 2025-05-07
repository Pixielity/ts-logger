import { injectable, inject } from 'inversify'
import type { LogLevel } from '../enums/log-level.enum'
import type { IStackChannel } from '../interfaces/channels/stack-channel.interface'
import type { ILoggingChannel } from '../interfaces/channels/logging-channel.interface'
import { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface'
import type { LogContext, LogRecord } from '../types/types'

/**
 * StackChannel is an implementation of the IStackChannel interface.
 * It combines multiple channels into a single channel.
 */
@injectable()
export class StackChannel implements IStackChannel {
  private name: string
  private context: LogContext = {}
  private channels: ILoggingChannel[] = []

  /**
   * Create a new StackChannel instance
   * @param name The channel name
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(name: string, @inject(IEventDispatcher.$) eventDispatcher: IEventDispatcher) {
    this.name = name
  }

  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  public log(level: LogLevel, message: string, context: LogContext = {}): void {
    // Merge the context with the channel's context
    const mergedContext = { ...this.context, ...context }

    // Log the message to all channels in the stack
    for (const channel of this.channels) {
      channel.log(level, message, mergedContext)
    }
  }

  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  public withContext(context: LogContext): ILoggingChannel {
    this.context = { ...this.context, ...context }
    return this
  }

  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  public withoutContext(keys: string[]): ILoggingChannel {
    const newContext: LogContext = { ...this.context }
    for (const key of keys) {
      delete newContext[key]
    }
    this.context = newContext
    return this
  }

  /**
   * Get the channel name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Process a log record
   * @param record The log record to process
   */
  public processRecord(record: LogRecord): LogRecord {
    // Process the record with all channels in the stack
    let processedRecord = record
    for (const channel of this.channels) {
      processedRecord = channel.processRecord(processedRecord)
    }
    return processedRecord
  }

  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  public shareContext(context: LogContext): void {
    for (const channel of this.channels) {
      channel.shareContext(context)
    }
  }

  /**
   * Flush shared context
   */
  public flushSharedContext(): void {
    for (const channel of this.channels) {
      channel.flushSharedContext()
    }
  }

  /**
   * Get the channels in the stack
   */
  public getChannels(): ILoggingChannel[] {
    return this.channels
  }

  /**
   * Add a channel to the stack
   * @param channel The channel to add
   */
  public addChannel(channel: ILoggingChannel): void {
    this.channels.push(channel)
  }

  /**
   * Remove a channel from the stack
   * @param name The name of the channel to remove
   */
  public removeChannel(name: string): void {
    this.channels = this.channels.filter((channel) => channel.getName() !== name)
  }

  /**
   * Check if the stack contains a channel with the specified name
   * @param name The channel name
   */
  public hasChannel(name: string): boolean {
    return this.channels.some((channel) => channel.getName() === name)
  }

  /**
   * Get the channel with the specified name
   * @param name The channel name
   */
  public getChannel(name: string): ILoggingChannel | undefined {
    return this.channels.find((channel) => channel.getName() === name)
  }
}
