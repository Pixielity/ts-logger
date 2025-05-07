import { IConsoleHandler } from '../interfaces/handlers/console-handler.interface.mjs';
import { LogRecord } from '../types/types.mjs';
import '../interfaces/handlers/log-handler.interface.mjs';

/**
 * ConsoleHandler is an implementation of the IConsoleHandler interface.
 * It handles log records by outputting them to the browser console.
 */
declare class ConsoleHandler implements IConsoleHandler {
    private name;
    private next;
    private emojiSupport;
    private colorSupport;
    /**
     * Create a new ConsoleHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        emojiSupport?: boolean;
        colorSupport?: boolean;
    });
    /**
     * Handle a log record
     * @param record The log record to handle
     */
    handle(record: LogRecord): void;
    /**
     * Check if the handler can handle the log record
     * @param record The log record to check
     */
    isHandling(record: LogRecord): boolean;
    /**
     * Set the next handler in the chain
     * @param handler The next handler
     */
    setNext(handler: IConsoleHandler): IConsoleHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): IConsoleHandler | null;
    /**
     * Get the handler name
     */
    getName(): string;
    /**
     * Enable or disable emoji support
     * @param enabled Whether emoji support is enabled
     */
    setEmojiSupport(enabled: boolean): void;
    /**
     * Enable or disable color support
     * @param enabled Whether color support is enabled
     */
    setColorSupport(enabled: boolean): void;
    /**
     * Get whether emoji support is enabled
     */
    isEmojiSupportEnabled(): boolean;
    /**
     * Get whether color support is enabled
     */
    isColorSupportEnabled(): boolean;
}

export { ConsoleHandler };
