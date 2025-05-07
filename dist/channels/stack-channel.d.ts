import { LogRecord } from '../types/log-record.type.js';
import { LogContext } from '../types/log-context.type.js';
import { LogLevel } from '../enums/log-level.enum.js';
import { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface.js';
import { IStackChannel } from '../interfaces/channels/stack-channel.interface.js';
import { ILoggingChannel } from '../interfaces/channels/logging-channel.interface.js';
import '../interfaces/events/log-event.interface.js';
import '../types/log-listener.type.js';

/**
 * StackChannel is an implementation of the IStackChannel interface.
 * It combines multiple channels into a single channel.
 */
declare class StackChannel implements IStackChannel {
    private name;
    private context;
    private channels;
    /**
     * Create a new StackChannel instance
     * @param name The channel name
     * @param eventDispatcher The event dispatcher to use
     */
    constructor(name: string, eventDispatcher: IEventDispatcher);
    /**
     * Log a message at the specified level
     * @param level The log level
     * @param message The message to log
     * @param context Optional contextual data
     */
    log(level: LogLevel, message: string, context?: LogContext): void;
    /**
     * Add contextual data to all subsequent log messages
     * @param context The contextual data to add
     */
    withContext(context: LogContext): ILoggingChannel;
    /**
     * Remove contextual data from all subsequent log messages
     * @param keys The keys to remove from the context
     */
    withoutContext(keys: string[]): ILoggingChannel;
    /**
     * Get the channel name
     */
    getName(): string;
    /**
     * Process a log record
     * @param record The log record to process
     */
    processRecord(record: LogRecord): LogRecord;
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
     * Get the channels in the stack
     */
    getChannels(): ILoggingChannel[];
    /**
     * Add a channel to the stack
     * @param channel The channel to add
     */
    addChannel(channel: ILoggingChannel): void;
    /**
     * Remove a channel from the stack
     * @param name The name of the channel to remove
     */
    removeChannel(name: string): void;
    /**
     * Check if the stack contains a channel with the specified name
     * @param name The channel name
     */
    hasChannel(name: string): boolean;
    /**
     * Get the channel with the specified name
     * @param name The channel name
     */
    getChannel(name: string): ILoggingChannel | undefined;
}

export { StackChannel };
