import { ILogHandler } from './log-handler.interface.mjs';
import '../../types/types.mjs';

/**
 * ILocalStorageHandler defines the contract for localStorage handlers.
 * It provides methods for handling log records in the browser's localStorage.
 */
interface ILocalStorageHandler extends ILogHandler {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace ILocalStorageHandler {
    /**
     * Symbol for injecting the localStorage handler
     */
    const $: unique symbol;
}

export { ILocalStorageHandler };
