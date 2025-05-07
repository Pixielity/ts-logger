import { LogRecord } from '../types/log-record.type.mjs';
import { LogContext } from '../types/log-context.type.mjs';
import { LogLevel } from '../enums/log-level.enum.mjs';
import { ILogHandler } from '../interfaces/handlers/log-handler.interface.mjs';
import { ISingleChannel } from '../interfaces/channels/single-channel.interface.mjs';
import { ILogFormatter } from '../interfaces/formatters/log-formatter.interface.mjs';
import { ILogProcessor } from '../interfaces/processors/log-processor.interface.mjs';
import '../interfaces/channels/logging-channel.interface.mjs';

/**
 * SingleChannel is an implementation of the ISingleChannel interface.
 * It uses a single handler to process log messages.
 */
declare class SingleChannel implements ISingleChannel {
    private name;
    private handler;
    private formatter;
    private processors;
    private context;
    /**
     * Create a new SingleChannel instance
     * @param name The channel name
     * @param handler The handler to use
     * @param formatter The formatter to use
     */
    constructor(name: string, handler: ILogHandler, formatter: ILogFormatter);
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
    withContext(context: LogContext): ISingleChannel;
    /**
     * Remove contextual data from all subsequent log messages
     * @param keys The keys to remove from the context
     */
    withoutContext(keys: string[]): ISingleChannel;
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
     * Get the handler used by the channel
     */
    getHandler(): ILogHandler;
    /**
     * Set the handler used by the channel
     * @param handler The handler to use
     */
    setHandler(handler: ILogHandler): void;
    /**
     * Get the formatter used by the channel
     */
    getFormatter(): ILogFormatter;
    /**
     * Set the formatter used by the channel
     * @param formatter The formatter to use
     */
    setFormatter(formatter: ILogFormatter): void;
    /**
     * Get the processors used by the channel
     */
    getProcessors(): ILogProcessor[];
    /**
     * Add a processor to the channel
     * @param processor The processor to add
     */
    addProcessor(processor: ILogProcessor): void;
    /**
     * Remove a processor from the channel
     * @param name The name of the processor to remove
     */
    removeProcessor(name: string): void;
}

export { SingleChannel };
