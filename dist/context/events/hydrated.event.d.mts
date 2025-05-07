import { IContextHydrated } from '../../interfaces/events/hydrated.interface.mjs';
import { LogContext } from '../../types/types.mjs';
import '../../interfaces/events/log-event.interface.mjs';

/**
 * ContextHydratedEvent is an implementation of the IContextHydrated interface.
 * It represents an event that is dispatched when the context has been hydrated.
 */
declare class ContextHydratedEvent implements IContextHydrated {
    private name;
    private timestamp;
    private context;
    private source;
    /**
     * Create a new ContextHydratedEvent instance
     * @param context The context data that was hydrated
     * @param source The source of the hydrated data
     */
    constructor(context: LogContext, source: string);
    /**
     * Get the event name
     */
    getName(): string;
    /**
     * Get the event data
     */
    getData(): Record<string, any>;
    /**
     * Get the event timestamp
     */
    getTimestamp(): Date;
    /**
     * Get the context data that was hydrated
     */
    getContext(): LogContext;
    /**
     * Get the source of the hydrated data
     */
    getSource(): string;
}

export { ContextHydratedEvent };
