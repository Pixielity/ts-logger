import { IIndexedDBHandler } from '../interfaces/handlers/indexed-db-handler.interface.js';
import { LogRecord } from '../types/types.js';
import '../interfaces/handlers/log-handler.interface.js';

/**
 * IndexedDBHandler is an implementation of the IIndexedDBHandler interface.
 * It handles log records by storing them in the browser's IndexedDB.
 */
declare class IndexedDBHandler implements IIndexedDBHandler {
    private name;
    private next;
    private databaseName;
    private tableName;
    private maxEntries;
    private db;
    /**
     * Create a new IndexedDBHandler instance
     * @param options Options for the handler
     */
    constructor(options?: {
        databaseName?: string;
        tableName?: string;
        maxEntries?: number;
    });
    /**
     * Initialize the database
     * This method is called automatically after the constructor
     */
    private initDatabase;
    /**
     * Handle a log record
     * @param record The log record to handle
     */
    handle(record: LogRecord): Promise<void>;
    /**
     * Check if the handler can handle the log record
     * @param record The log record to check
     */
    isHandling(record: LogRecord): boolean;
    /**
     * Set the next handler in the chain
     * @param handler The next handler
     */
    setNext(handler: IIndexedDBHandler): IIndexedDBHandler;
    /**
     * Get the next handler in the chain
     */
    getNext(): IIndexedDBHandler | null;
    /**
     * Get the handler name
     */
    getName(): string;
    /**
     * Get the database name
     */
    getDatabaseName(): string;
    /**
     * Set the database name
     * @param name The database name
     */
    setDatabaseName(name: string): void;
    /**
     * Get the table name
     */
    getTableName(): string;
    /**
     * Set the table name
     * @param name The table name
     */
    setTableName(name: string): void;
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
    getEntries(): Promise<any[]>;
    /**
     * Clear all stored log entries
     */
    clearEntries(): Promise<void>;
}

export { IndexedDBHandler };
