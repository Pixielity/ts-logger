import { IContextManagement } from '../interfaces/context/management.interface.mjs';
import { IEventDispatcher } from '../interfaces/events/event-dispatcher.interface.mjs';
import { LogContext } from '../types/log-context.type.mjs';
import '../interfaces/events/log-event.interface.mjs';
import '../types/log-listener.type.mjs';

/**
 * ContextRepository is an implementation of the IContextManagement interface.
 * It provides methods for managing contextual data.
 */
declare class ContextRepository implements IContextManagement {
    private context;
    private hiddenContext;
    private stacks;
    private counters;
    private eventDispatcher;
    /**
     * Create a new ContextRepository instance
     * @param eventDispatcher The event dispatcher to use
     */
    constructor(eventDispatcher: IEventDispatcher);
    /**
     * Add a value to the context
     * @param key The context key
     * @param value The context value
     */
    add(key: string, value: any): void;
    /**
     * Get a value from the context
     * @param key The context key
     * @param defaultValue The default value to return if the key is not found
     */
    get<T>(key: string, defaultValue?: T): T;
    /**
     * Check if the context contains a key
     * @param key The context key
     */
    has(key: string): boolean;
    /**
     * Remove a value from the context
     * @param key The context key
     */
    forget(key: string): void;
    /**
     * Add a hidden value to the context
     * @param key The context key
     * @param value The context value
     */
    addHidden(key: string, value: any): void;
    /**
     * Get a hidden value from the context
     * @param key The context key
     * @param defaultValue The default value to return if the key is not found
     */
    getHidden<T>(key: string, defaultValue?: T): T;
    /**
     * Check if the context contains a hidden key
     * @param key The context key
     */
    hasHidden(key: string): boolean;
    /**
     * Remove a hidden value from the context
     * @param key The context key
     */
    forgetHidden(key: string): void;
    /**
     * Push a value onto a stack in the context
     * @param key The context key
     * @param value The value to push
     */
    push(key: string, value: any): void;
    /**
     * Pop a value from a stack in the context
     * @param key The context key
     */
    pop<T>(key: string): T | undefined;
    /**
     * Check if a stack in the context contains a value
     * @param key The context key
     * @param value The value to check for
     */
    stackContains(key: string, value: any): boolean;
    /**
     * Increment a counter in the context
     * @param key The context key
     * @param amount The amount to increment by
     */
    increment(key: string, amount?: number): number;
    /**
     * Decrement a counter in the context
     * @param key The context key
     * @param amount The amount to decrement by
     */
    decrement(key: string, amount?: number): number;
    /**
     * Create a scoped context
     * @param callback The callback function to execute with the scoped context
     */
    scope<T>(callback: () => T): T;
    /**
     * Dehydrate the context to a serializable object
     */
    dehydrate(): Record<string, any>;
    /**
     * Hydrate the context from a serialized object
     * @param data The serialized context data
     */
    hydrate(data: Record<string, any>): void;
    /**
     * Get all context data
     */
    all(): LogContext;
    /**
     * Clear all context data
     */
    clear(): void;
}

export { ContextRepository };
