import { IFingersCrossedHandler } from '../interfaces/handlers/fingers-crossed-handler.interface.js';
import { ILogHandler } from '../interfaces/handlers/log-handler.interface.js';
import { LogLevel } from '../enums/log-level.enum.js';
import { LogRecord } from '../types/types.js';

/**
 * FingersCrossedHandler is an implementation of the IFingersCrossedHandler interface.
 * It buffers log records until a certain action level is reached, then passes all buffered records to the next handler.
 */
declare class FingersCrossedHandler implements IFingersCrossedHandler {
    private name;
    private next;
    private actionLevel;
    private bufferSize;
    private buffer;
    private activated;
    private handler;
    /**
     * Create a new FingersCrossedHandler instance
     * @param handler The handler to use when activated
     * @param options Options for the handler
     */
    constructor(handler: ILogHandler, options?: {
        actionLevel?: LogLevel;
        bufferSize?: number;
    });
    /**
     * Handle a log record
     * @param record The log record to handle
     */
    handle(record: LogRecord): void;
    /**
     * Check if a log level is at or above the action level
     * @param level The log level to check
     */
    private isActionLevel;
    /**
     * Check if the handler can handle the log record
     * @param record The log record to check
     */
    isHandling(record: LogRecord): boolean;
    /**
     * Set the next handler in the chain
     * @param handler The next handler
     */
    setNext(handler: ILogHandler): ILogHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): ILogHandler | null;
    /**
     * Get the handler name
     */
    getName(): string;
    /**
     * Get the action level
     */
    getActionLevel(): LogLevel;
    /**
     * Set the action level
     * @param level The action level
     */
    setActionLevel(level: LogLevel): void;
    /**
     * Get the buffer size
     */
    getBufferSize(): number;
    /**
     * Set the buffer size
     * @param size The buffer size
     */
    setBufferSize(size: number): void;
    /**
     * Get whether the handler is activated
     */
    isActivated(): boolean;
    /**
     * Reset the handler
     */
    reset(): void;
}

export { FingersCrossedHandler };
