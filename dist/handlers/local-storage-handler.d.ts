import { LogRecord } from '../types/log-record.type.js';
import { ILocalStorageHandler } from '../interfaces/handlers/local-storage-handler.interface.js';
import '../types/log-context.type.js';
import '../interfaces/handlers/log-handler.interface.js';

/**
 * LocalStorageHandler is an implementation of the ILocalStorageHandler interface.
 * It handles log records by storing them in the browser's localStorage.
 */
declare class LocalStorageHandler implements ILocalStorageHandler {
    private name;
    private next;
    private key;
    private maxEntries;
    /**
     * Create a new LocalStorageHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        key?: string;
        maxEntries?: number;
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
    setNext(handler: ILocalStorageHandler): ILocalStorageHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): ILocalStorageHandler | null;
    /**
     * Get the handler name
     */
    getName(): string;
    /**
     * Get the localStorage key used to store logs
     */
    getKey(): string;
    /**
     * Set the localStorage key used to store logs
     * @param key The localStorage key
     */
    setKey(key: string): void;
    /**
     * Get the maximum number of log entries to store
     */
    getMaxEntries(): number;
    /**
     * Set the maximum number of log entries to store
     * @param maxEntries The maximum number of log entries
     */
    setMaxEntries(maxEntries: number): void;
    /**
     * Get all stored log entries
     */
    getEntries(): any[];
    /**
     * Clear all stored log entries
     */
    clearEntries(): void;
}

export { LocalStorageHandler };
