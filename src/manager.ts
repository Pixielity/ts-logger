import { injectable } from 'inversify'

import type {
  ChannelOptions,
  HandlerOptions,
  FormatterOptions,
  ProcessorOptions,
  LogContext,
} from './types'
import { Logger } from './logger'

import type { LogLevel } from './enums/log-level.enum'
import { loggingConfig } from './config/logging-config'
import type { LogChannelType } from './enums/log-channel-type.enum'

import type { ILogManager } from './interfaces/logging/manager.interface'
import type { ILogHandler } from './interfaces/handlers/log-handler.interface'
import type { ILogFormatter } from './interfaces/formatters/log-formatter.interface'
import type { ILogProcessor } from './interfaces/processors/log-processor.interface'
import type { IEventDispatcher } from './interfaces/events/event-dispatcher.interface'
import type { ILoggingService } from './interfaces/logging/logging-service.interface'
import type { ILoggingChannel } from './interfaces/channels/logging-channel.interface'

/**
 * LogManager is the main implementation of the ILogManager interface.
 * It provides methods for managing channels, drivers, and extending the logging system.
 */
@injectable()
export class LogManager implements ILogManager {
  private _channels: Record<string, ILoggingService> = {}
  private _customDrivers: Record<string, (config: any) => ILoggingService> = {}
  private _defaultChannel: string = loggingConfig.default
  private _minimumLevel: LogLevel = loggingConfig.minimumLevel
  private _eventDispatcher: IEventDispatcher

  /**
   * Create a new LogManager instance
   * @param eventDispatcher The event dispatcher to use
   */
  constructor(eventDispatcher: IEventDispatcher) {
    this._eventDispatcher = eventDispatcher

    // Initialize channels from config
    this.initializeChannels()
  }

  /**
   * Initialize channels from config
   */
  private initializeChannels(): void {
    for (const [name, config] of Object.entries(loggingConfig.channels)) {
      try {
        const channelConfig = config as any
        const channelType = channelConfig.type as LogChannelType

        // Create the channel
        this.createChannel(name, channelType, channelConfig)
      } catch (error) {
        console.error(`Failed to initialize channel ${name}:`, error)
      }
    }
  }

  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param context Optional contextual data
   */
  public log(level: LogLevel, message: string, context: LogContext = {}): void {
    this.channel().log(level, message, context)
  }

  /**
   * Log a debug message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public debug(message: string, context: LogContext = {}): void {
    this.channel().debug(message, context)
  }

  /**
   * Log an info message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public info(message: string, context: LogContext = {}): void {
    this.channel().info(message, context)
  }

  /**
   * Log a notice message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public notice(message: string, context: LogContext = {}): void {
    this.channel().notice(message, context)
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public warning(message: string, context: LogContext = {}): void {
    this.channel().warning(message, context)
  }

  /**
   * Log an error message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public error(message: string, context: LogContext = {}): void {
    this.channel().error(message, context)
  }

  /**
   * Log a critical message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public critical(message: string, context: LogContext = {}): void {
    this.channel().critical(message, context)
  }

  /**
   * Log an alert message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public alert(message: string, context: LogContext = {}): void {
    this.channel().alert(message, context)
  }

  /**
   * Log an emergency message
   * @param message The message to log
   * @param context Optional contextual data
   */
  public emergency(message: string, context: LogContext = {}): void {
    this.channel().emergency(message, context)
  }

  /**
   * Add contextual data to all subsequent log messages
   * @param context The contextual data to add
   */
  public withContext(context: LogContext): ILoggingService {
    return this.channel().withContext(context)
  }

  /**
   * Remove contextual data from all subsequent log messages
   * @param keys The keys to remove from the context
   */
  public withoutContext(keys: string[]): ILoggingService {
    return this.channel().withoutContext(keys)
  }

  /**
   * Share context across channels
   * @param context The contextual data to share
   */
  public shareContext(context: LogContext): void {
    this.channel().shareContext(context)
  }

  /**
   * Flush shared context
   */
  public flushSharedContext(): void {
    this.channel().flushSharedContext()
  }

  /**
   * Get the channel with the specified name
   * @param name The channel name
   */
  public channel(name?: string): ILoggingService {
    return this.driver(name)
  }

  /**
   * Get the stack channel with the specified name
   * @param name The stack name
   */
  public stack(name: string): ILoggingService {
    return this.driver(name)
  }

  /**
   * Get the driver with the specified name
   * @param name The driver name
   */
  public driver(name?: string): ILoggingService {
    const channelName = name || this._defaultChannel

    if (!this._channels[channelName]) {
      throw new Error(`Channel [${channelName}] not found.`)
    }

    return this._channels[channelName]
  }

  /**
   * Extend the logging system with a custom driver creator
   * @param driver The driver name
   * @param callback The callback function that creates the driver
   */
  public extend(driver: string, callback: (config: any) => ILoggingService): void {
    this._customDrivers[driver] = callback
  }

  /**
   * Get all registered channels
   */
  public getChannels(): Record<string, ILoggingService> {
    return this._channels
  }

  /**
   * Get the default channel name
   */
  public getDefaultChannel(): string {
    return this._defaultChannel
  }

  /**
   * Set the default channel name
   * @param name The default channel name
   */
  public setDefaultChannel(name: string): void {
    if (!this._channels[name]) {
      throw new Error(`Channel [${name}] not found.`)
    }

    this._defaultChannel = name
  }

  /**
   * Create a channel with the specified configuration
   * @param name The channel name
   * @param type The channel type
   * @param options The channel options
   */
  public createChannel(
    name: string,
    type: LogChannelType,
    options?: ChannelOptions,
  ): ILoggingService {
    // Implementation would create the appropriate channel type
    // For now, we'll just create a simple logger
    const logger = new Logger(
      {} as ILoggingChannel, // This would be replaced with the actual channel
      this._eventDispatcher,
    )

    this._channels[name] = logger

    return logger
  }

  /**
   * Create a handler with the specified configuration
   * @param type The handler type
   * @param options The handler options
   */
  public createHandler(type: string, options?: HandlerOptions): ILogHandler {
    // Implementation would create the appropriate handler type
    return {} as ILogHandler
  }

  /**
   * Create a formatter with the specified configuration
   * @param type The formatter type
   * @param options The formatter options
   */
  public createFormatter(type: string, options?: FormatterOptions): ILogFormatter {
    // Implementation would create the appropriate formatter type
    return {} as ILogFormatter
  }

  /**
   * Create a processor with the specified configuration
   * @param type The processor type
   * @param options The processor options
   */
  public createProcessor(type: string, options?: ProcessorOptions): ILogProcessor {
    // Implementation would create the appropriate processor type
    return {} as ILogProcessor
  }

  /**
   * Get the minimum log level
   */
  public getMinimumLevel(): LogLevel {
    return this._minimumLevel
  }

  /**
   * Set the minimum log level
   * @param level The minimum log level
   */
  public setMinimumLevel(level: LogLevel): void {
    this._minimumLevel = level
  }
}
