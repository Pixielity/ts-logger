import { ILogFormatter } from './log-formatter.interface.js';
import '../../types/types.js';

/**
 * ILineFormatter defines the contract for line formatters.
 * It provides methods for formatting log records as lines of text.
 */
interface ILineFormatter extends ILogFormatter {
    /**
     * Get the date format
     */
    getDateFormat(): string;
    /**
     * Set the date format
     * @param format The date format
     */
    setDateFormat(format: string): void;
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ILineFormatter {
    /**
     * Symbol for injecting the line formatter
     */
    const $: unique symbol;
}

export { ILineFormatter };
