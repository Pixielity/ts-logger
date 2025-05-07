import { LogContext } from './types/log-context.type.js';
import { HandlerOptions } from './types/handler-options.type.js';
import { ChannelOptions } from './types/channel-options.type.js';
import { FormatterOptions } from './types/formatter-options.type.js';
import { ProcessorOptions } from './types/processor-options.type.js';
import { LogLevel } from './enums/log-level.enum.js';
import { LogChannelType } from './enums/log-channel-type.enum.js';
import { ILogManager } from './interfaces/logging/manager.interface.js';
import { ILogHandler } from './interfaces/handlers/log-handler.interface.js';
import { ILogFormatter } from './interfaces/formatters/log-formatter.interface.js';
import { ILogProcessor } from './interfaces/processors/log-processor.interface.js';
import { IEventDispatcher } from './interfaces/events/event-dispatcher.interface.js';
import { ILoggingService } from './interfaces/logging/logging-service.interface.js';
import './types/log-record.type.js';
import './interfaces/events/log-event.interface.js';
import './types/log-listener.type.js';

/**
 * LogManager is the main implementation of the ILogManager interface.
 * It provides methods for managing channels, drivers, and extending the logging system.
 */
declare class LogManager implements ILogManager {
    private _channels;
    private _customDrivers;
    private _defaultChannel;
    private _minimumLevel;
    private _eventDispatcher;
    /**
     * Create a new LogManager instance
     * @param eventDispatcher The event dispatcher to use
     */
    constructor(eventDispatcher: IEventDispatcher);
    /**
     * Initialize channels from config
     */
    private initializeChannels;
    /**
     * Log a message at the specified level
     * @param level The log level
     * @param message The message to log
     * @param context Optional contextual data
     */
    log(level: LogLevel, message: string, context?: LogContext): void;
    /**
     * Log a debug message
     * @param message The message to log
     * @param context Optional contextual data
     */
    debug(message: string, context?: LogContext): void;
    /**
     * Log an info message
     * @param message The message to log
     * @param context Optional contextual data
     */
    info(message: string, context?: LogContext): void;
    /**
     * Log a notice message
     * @param message The message to log
     * @param context Optional contextual data
     */
    notice(message: string, context?: LogContext): void;
    /**
     * Log a warning message
     * @param message The message to log
     * @param context Optional contextual data
     */
    warning(message: string, context?: LogContext): void;
    /**
     * Log an error message
     * @param message The message to log
     * @param context Optional contextual data
     */
    error(message: string, context?: LogContext): void;
    /**
     * Log a critical message
     * @param message The message to log
     * @param context Optional contextual data
     */
    critical(message: string, context?: LogContext): void;
    /**
     * Log an alert message
     * @param message The message to log
     * @param context Optional contextual data
     */
    alert(message: string, context?: LogContext): void;
    /**
     * Log an emergency message
     * @param message The message to log
     * @param context Optional contextual data
     */
    emergency(message: string, context?: LogContext): void;
    /**
     * Add contextual data to all subsequent log messages
     * @param context The contextual data to add
     */
    withContext(context: LogContext): ILoggingService;
    /**
     * Remove contextual data from all subsequent log messages
     * @param keys The keys to remove from the context
     */
    withoutContext(keys: string[]): ILoggingService;
    /**
     * Share context across channels
     * @param context The contextual data to share
     */
    shareContext(context: LogContext): void;
    /**
     * Flush shared context
     */
    flushSharedContext(): void;
    /**
     * Get the channel with the specified name
     * @param name The channel name
     */
    channel(name?: string): ILoggingService;
    /**
     * Get the stack channel with the specified name
     * @param name The stack name
     */
    stack(name: string): ILoggingService;
    /**
     * Get the driver with the specified name
     * @param name The driver name
     */
    driver(name?: string): ILoggingService;
    /**
     * Extend the logging system with a custom driver creator
     * @param driver The driver name
     * @param callback The callback function that creates the driver
     */
    extend(driver: string, callback: (config: any) => ILoggingService): void;
    /**
     * Get all registered channels
     */
    getChannels(): Record<string, ILoggingService>;
    /**
     * Get the default channel name
     */
    getDefaultChannel(): string;
    /**
     * Set the default channel name
     * @param name The default channel name
     */
    setDefaultChannel(name: string): void;
    /**
     * Create a channel with the specified configuration
     * @param name The channel name
     * @param type The channel type
     * @param options The channel options
     */
    createChannel(name: string, type: LogChannelType, options?: ChannelOptions): ILoggingService;
    /**
     * Create a handler with the specified configuration
     * @param type The handler type
     * @param options The handler options
     */
    createHandler(type: string, options?: HandlerOptions): ILogHandler;
    /**
     * Create a formatter with the specified configuration
     * @param type The formatter type
     * @param options The formatter options
     */
    createFormatter(type: string, options?: FormatterOptions): ILogFormatter;
    /**
     * Create a processor with the specified configuration
     * @param type The processor type
     * @param options The processor options
     */
    createProcessor(type: string, options?: ProcessorOptions): ILogProcessor;
    /**
     * Get the minimum log level
     */
    getMinimumLevel(): LogLevel;
    /**
     * Set the minimum log level
     * @param level The minimum log level
     */
    setMinimumLevel(level: LogLevel): void;
}

export { LogManager };
