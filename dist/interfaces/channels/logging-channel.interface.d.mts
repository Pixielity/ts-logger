import { LogLevel } from '../../enums/log-level.enum.mjs';
import { LogRecord } from '../../types/log-record.type.mjs';
import { LogContext } from '../../types/log-context.type.mjs';

/**
 * ILoggingChannel defines the contract for logging channels.
 * It provides methods for logging messages and managing channel-specific context.
 */
interface ILoggingChannel {
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
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ILoggingChannel {
    /**
     * Symbol for injecting the logging channel
     */
    const $: unique symbol;
}

export { ILoggingChannel };
