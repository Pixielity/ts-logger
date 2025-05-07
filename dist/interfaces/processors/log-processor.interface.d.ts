import { LogRecord } from '../../types/types.js';

/**
 * ILogProcessor defines the contract for log processors.
 * It provides methods for processing log records.
 */
interface ILogProcessor {
    /**
     * Process a log record
     * @param record The log record to process
     */
    process(record: LogRecord): LogRecord;
    /**
     * Get the processor name
     */
    getName(): string;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ILogProcessor {
    /**
     * Symbol for injecting the log processor
     */
    const $: unique symbol;
}

export { ILogProcessor };
