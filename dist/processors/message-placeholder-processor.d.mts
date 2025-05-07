import { LogRecord } from '../types/log-record.type.mjs';
import { IMessagePlaceholderProcessor } from '../interfaces/processors/message-placeholder-processor.interface.mjs';
import '../types/log-context.type.mjs';
import '../interfaces/processors/log-processor.interface.mjs';

/**
 * MessagePlaceholderProcessor is an implementation of the IMessagePlaceholderProcessor interface.
 * It replaces placeholders in log messages with context values.
 */
declare class MessagePlaceholderProcessor implements IMessagePlaceholderProcessor {
    private name;
    private placeholderFormat;
    private emojiSupport;
    /**
     * Create a new MessagePlaceholderProcessor instance
     * @param options Options for the processor
     */
    constructor(options?: {
        placeholderFormat?: string;
        emojiSupport?: boolean;
    });
    /**
     * Process a log record
     * @param record The log record to process
     */
    process(record: LogRecord): LogRecord;
    /**
     * Replace placeholders in a message with corresponding context values.
     * The placeholder format is dynamically determined (e.g., '{key}', '%key%', '{{var}}', etc.).
     *
     * @param message - The input message string that may contain placeholders.
     * @param context - A dictionary of keys and values used to replace placeholders.
     * @returns The message with placeholders replaced by context values.
     */
    private replacePlaceholders;
    /**
     * Get the placeholder pattern
     */
    private getPlaceholderPattern;
    /**
     * Escape special characters in a string for use in a regular expression
     * @param string The string to escape
     */
    private escapeRegExp;
    /**
     * Convert a value to a string
     * @param value The value to convert
     */
    private convertToString;
    /**
     * Check if a string is an emoji
     * @param string The string to check
     */
    private isEmoji;
    /**
     * Get the processor name
     */
    getName(): string;
    /**
     * Set the placeholder format
     * @param format The placeholder format (e.g., '{key}')
     */
    setPlaceholderFormat(format: string): void;
    /**
     * Get the placeholder format
     */
    getPlaceholderFormat(): string;
    /**
     * Enable or disable emoji support
     * @param enabled Whether emoji support is enabled
     */
    setEmojiSupport(enabled: boolean): void;
    /**
     * Get whether emoji support is enabled
     */
    isEmojiSupportEnabled(): boolean;
}

export { MessagePlaceholderProcessor };
