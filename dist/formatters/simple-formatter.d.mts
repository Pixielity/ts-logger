import { LogRecord } from '../types/log-record.type.mjs';
import { ISimpleFormatter } from '../interfaces/formatters/simple-formatter.interface.mjs';
import '../types/log-context.type.mjs';
import '../interfaces/formatters/log-formatter.interface.mjs';

/**
 * SimpleFormatter is an implementation of the ISimpleFormatter interface.
 * It formats log records in a simple format.
 */
declare class SimpleFormatter implements ISimpleFormatter {
    private name;
    private emojiSupport;
    private colorSupport;
    /**
     * Create a new SimpleFormatter instance
     * @param options Options for the formatter
     */
    constructor(options?: {
        emojiSupport?: boolean;
        colorSupport?: boolean;
    });
    /**
     * Format a log record
     * @param record The log record to format
     */
    format(record: LogRecord): string;
    /**
     * Format a batch of log records
     * @param records The log records to format
     */
    formatBatch(records: LogRecord[]): string;
    /**
     * Get the formatter name
     */
    getName(): string;
    /**
     * Enable or disable emoji support
     * @param enabled Whether emoji support is enabled
     */
    setEmojiSupport(enabled: boolean): void;
    /**
     * Get whether emoji support is enabled
     */
    isEmojiSupportEnabled(): boolean;
    /**
     * Enable or disable color support
     * @param enabled Whether color support is enabled
     */
    setColorSupport(enabled: boolean): void;
    /**
     * Get whether color support is enabled
     */
    isColorSupportEnabled(): boolean;
}

export { SimpleFormatter };
