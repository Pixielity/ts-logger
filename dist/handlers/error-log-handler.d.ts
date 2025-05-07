import { IErrorLogHandler } from '../interfaces/handlers/error-log-handler.interface.js';
import { LogRecord } from '../types/types.js';
import '../interfaces/handlers/log-handler.interface.js';

/**
 * ErrorLogHandler is an implementation of the IErrorLogHandler interface.
 * It handles log records by outputting them to the browser's error log.
 */
declare class ErrorLogHandler implements IErrorLogHandler {
    private name;
    private next;
    private emojiSupport;
    /**
     * Create a new ErrorLogHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        emojiSupport?: boolean;
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
    setNext(handler: IErrorLogHandler): IErrorLogHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): IErrorLogHandler | null;
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
     * Get whether emoji support is enabled
     */
    isEmojiSupportEnabled(): boolean;
}

export { ErrorLogHandler };
