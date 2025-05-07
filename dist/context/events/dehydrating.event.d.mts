import { IContextDehydrating } from '../../interfaces/events/dehydrating.interface.mjs';
import { LogContext } from '../../types/log-context.type.mjs';
import '../../interfaces/events/log-event.interface.mjs';

/**
 * ContextDehydratingEvent is an implementation of the IContextDehydrating interface.
 * It represents an event that is dispatched when the context is being dehydrated.
 */
declare class ContextDehydratingEvent implements IContextDehydrating {
    private name;
    private timestamp;
    private context;
    /**
     * Create a new ContextDehydratingEvent instance
     * @param context The context data being dehydrated
     */
    constructor(context: LogContext);
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
     * Get the context data being dehydrated
     */
    getContext(): LogContext;
    /**
     * Set the context data being dehydrated
     * @param context The context data
     */
    setContext(context: LogContext): void;
}

export { ContextDehydratingEvent };
