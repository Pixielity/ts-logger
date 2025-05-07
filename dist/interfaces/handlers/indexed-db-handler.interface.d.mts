import { ILogHandler } from './log-handler.interface.mjs';
import '../../types/log-record.type.mjs';
import '../../types/log-context.type.mjs';

/**
 * IIndexedDBHandler defines the contract for IndexedDB handlers.
 * It provides methods for handling log records in the browser's IndexedDB.
 */
interface IIndexedDBHandler extends ILogHandler {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IIndexedDBHandler {
    /**
     * Symbol for injecting the IndexedDB handler
     */
    const $: unique symbol;
}

export { IIndexedDBHandler };
