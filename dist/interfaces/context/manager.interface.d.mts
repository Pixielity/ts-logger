import { LogContext } from '../../types/log-context.type.mjs';

/**
 * IContextManager defines the contract for context managers.
 * It provides methods for managing contextual data across components.
 */
interface IContextManager {
    /**
     * Add contextual data
     * @param context The contextual data to add
     */
    addContext(context: LogContext): void;
    /**
     * Remove contextual data
     * @param keys The keys to remove from the context
     */
    removeContext(keys: string[]): void;
    /**
     * Get all contextual data
     */
    getContext(): LogContext;
    /**
     * Clear all contextual data
     */
    clearContext(): void;
    /**
     * Create a scoped context manager
     */
    createScope(): IContextManager;
    /**
     * Merge contextual data from another context manager
     * @param manager The context manager to merge from
     */
    merge(manager: IContextManager): void;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IContextManager {
    /**
     * Symbol for injecting the context manager
     */
    const $: unique symbol;
}

export { IContextManager };
