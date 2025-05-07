import { ILogFormatter } from './log-formatter.interface.mjs';
import '../../types/log-record.type.mjs';
import '../../types/log-context.type.mjs';

/**
 * IJsonFormatter defines the contract for JSON formatters.
 * It provides methods for formatting log records as JSON.
 */
interface IJsonFormatter extends ILogFormatter {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IJsonFormatter {
    /**
     * Symbol for injecting the JSON formatter
     */
    const $: unique symbol;
}

export { IJsonFormatter };
