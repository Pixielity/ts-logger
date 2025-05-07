import { LogRecord } from '../types/log-record.type.mjs';
import { IJsonFormatter } from '../interfaces/formatters/json-formatter.interface.mjs';
import '../types/log-context.type.mjs';
import '../interfaces/formatters/log-formatter.interface.mjs';

/**
 * JsonFormatter is an implementation of the IJsonFormatter interface.
 * It formats log records as JSON.
 */
declare class JsonFormatter implements IJsonFormatter {
    private name;
    private prettyPrint;
    private stackTraceFormatting;
    /**
     * Create a new JsonFormatter instance
     * @param options Options for the formatter
     */
    constructor(options?: {
        prettyPrint?: boolean;
        stackTraceFormatting?: boolean;
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
     * Enable or disable pretty printing
     * @param enabled Whether pretty printing is enabled
     */
    setPrettyPrint(enabled: boolean): void;
    /**
     * Get whether pretty printing is enabled
     */
    isPrettyPrintEnabled(): boolean;
    /**
     * Enable or disable stack trace formatting
     * @param enabled Whether stack trace formatting is enabled
     */
    setStackTraceFormatting(enabled: boolean): void;
    /**
     * Get whether stack trace formatting is enabled
     */
    isStackTraceFormattingEnabled(): boolean;
}

export { JsonFormatter };
