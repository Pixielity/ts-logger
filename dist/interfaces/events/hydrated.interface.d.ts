import { ILogEvent } from './log-event.interface.js';
import { LogContext } from '../../types/log-context.type.js';

/**
 * IContextHydrated defines the contract for context hydrated events.
 * It provides methods for accessing information about context hydration.
 */
interface IContextHydrated extends ILogEvent {
    /**
     * Get the context data that was hydrated
     */
    getContext(): LogContext;
    /**
     * Get the source of the hydrated data
     */
    getSource(): string;
}
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IContextHydrated {
    /**
     * Symbol for injecting the context hydrated event
     */
    const $: unique symbol;
}

export { IContextHydrated };
