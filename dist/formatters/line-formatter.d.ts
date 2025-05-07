import { ILineFormatter } from '../interfaces/formatters/line-formatter.interface.js';
import { LogRecord } from '../types/types.js';
import { DateFormat } from '../enums/date-format.enum.js';
import '../interfaces/formatters/log-formatter.interface.js';

/**
 * LineFormatter is an implementation of the ILineFormatter interface.
 * It formats log records as lines of text.
 */
declare class LineFormatter implements ILineFormatter {
    private name;
    private dateFormat;
    private customDateFormat?;
    private emojiSupport;
    private colorSupport;
    private stackTraceFormatting;
    /**
     * Create a new LineFormatter instance
     * @param options Options for the formatter
     */
    constructor(options?: {
        dateFormat?: DateFormat;
        customDateFormat?: string;
        emojiSupport?: boolean;
        colorSupport?: boolean;
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
     * Format a date according to the date format
     * @param date The date to format
     */
    private formatDate;
    /**
     * Get the formatter name
     */
    getName(): string;
    /**
     * Get the date format
     */
    getDateFormat(): string;
    /**
     * Set the date format
     * @param format The date format
     */
    setDateFormat(format: DateFormat | string): void;
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

export { LineFormatter };
