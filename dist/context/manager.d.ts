import { IContextManager } from '../interfaces/context/manager.interface.js';
import { IContextManagement } from '../interfaces/context/management.interface.js';
import { LogContext } from '../types/types.js';

/**
 * ContextManager is an implementation of the IContextManager interface.
 * It provides methods for managing contextual data across components.
 */
declare class ContextManager implements IContextManager {
    private context;
    private parent;
    private contextRepository;
    /**
     * Create a new ContextManager instance
     * @param contextRepository The context repository to use
     */
    constructor(contextRepository: IContextManagement);
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

export { ContextManager };
