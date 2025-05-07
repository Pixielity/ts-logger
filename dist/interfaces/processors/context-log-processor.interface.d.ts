import { ILogProcessor } from './log-processor.interface.js';
import { LogContext } from '../../types/types.js';

/**
 * IContextLogProcessor defines the contract for context log processors.
 * It provides methods for adding contextual data to log records.
 */
interface IContextLogProcessor extends ILogProcessor {
    /**
     * Add contextual data to all subsequent log records
     * @param context The contextual data to add
     */
    addContext(context: LogContext): void;
    /**
     * Remove contextual data from all subsequent log records
     * @param keys The keys to remove from the context
     */
    removeContext(keys: string[]): void;
    /**
     * Get the current context
     */
    getContext(): LogContext;
    /**
     * Clear the current context
     */
    clearContext(): void;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IContextLogProcessor {
    /**
     * Symbol for injecting the context log processor
     */
    const $: unique symbol;
}

export { IContextLogProcessor };
