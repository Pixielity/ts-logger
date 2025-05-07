import { IContextLogProcessor } from '../interfaces/processors/context-log-processor.interface.mjs';
import { LogContext, LogRecord } from '../types/types.mjs';
import '../interfaces/processors/log-processor.interface.mjs';

/**
 * ContextLogProcessor is an implementation of the IContextLogProcessor interface.
 * It adds contextual data to log records.
 */
declare class ContextLogProcessor implements IContextLogProcessor {
    private name;
    private context;
    /**
     * Create a new ContextLogProcessor instance
     * @param context Initial context
     */
    constructor(context?: LogContext);
    /**
     * Process a log record
     * @param record The log record to process
     */
    process(record: LogRecord): LogRecord;
    /**
     * Add contextual data to all subsequent log records
     * @param context The contextual data to add
     */
    addContext(context: LogContext): void;
    /**
     * Remove contextual data from all subsequent log records
     * @param keys The keys to remove from the context
     */
    removeContext(keys: string[]): void;
    /**
     * Get the current context
     */
    getContext(): LogContext;
    /**
     * Clear the current context
     */
    clearContext(): void;
    /**
     * Get the processor name
     */
    getName(): string;
}

export { ContextLogProcessor };
