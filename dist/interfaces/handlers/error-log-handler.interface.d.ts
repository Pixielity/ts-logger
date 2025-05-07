import { ILogHandler } from './log-handler.interface.js';
import '../../types/log-record.type.js';
import '../../types/log-context.type.js';

/**
 * IErrorLogHandler defines the contract for error log handlers.
 * It provides methods for handling log records in the browser's error log.
 */
interface IErrorLogHandler extends ILogHandler {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IErrorLogHandler {
    /**
     * Symbol for injecting the error log handler
     */
    const $: unique symbol;
}

export { IErrorLogHandler };
