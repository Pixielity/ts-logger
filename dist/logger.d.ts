import { LogLevel } from './enums/log-level.enum.js';
import { LogContext } from './types/log-context.type.js';
import { IEventDispatcher } from './interfaces/events/event-dispatcher.interface.js';
import { ILoggingService } from './interfaces/logging/logging-service.interface.js';
import { ILoggingChannel } from './interfaces/channels/logging-channel.interface.js';
import './interfaces/events/log-event.interface.js';
import './types/log-listener.type.js';
import './types/log-record.type.js';

/**
 * Logger is the main implementation of the ILoggingService interface.
 * It provides methods for logging messages at different levels and with contextual data.
 */
declare class Logger implements ILoggingService {
    private _channel;
    private _context;
    private _eventDispatcher;
    /**
     * Create a new Logger instance
     * @param channel The logging channel to use
     * @param eventDispatcher The event dispatcher to use
     */
    constructor(injectableChannel: ILoggingChannel, eventDispatcher: IEventDispatcher);
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
     * @param channel The channel name
     */
    channel(channel: string): ILoggingService;
    /**
     * Get the stack channel with the specified name
     * @param stack The stack name
     */
    stack(stack: string): ILoggingService;
}

export { Logger };
