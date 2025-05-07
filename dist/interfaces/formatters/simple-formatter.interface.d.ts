import { ILogFormatter } from './log-formatter.interface.js';
import '../../types/log-record.type.js';
import '../../types/log-context.type.js';

/**
 * ISimpleFormatter defines the contract for simple formatters.
 * It provides methods for formatting log records in a simple format.
 */
interface ISimpleFormatter extends ILogFormatter {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ISimpleFormatter {
    /**
     * Symbol for injecting the simple formatter
     */
    const $: unique symbol;
}

export { ISimpleFormatter };
