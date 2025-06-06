import { ILogEvent } from './log-event.interface.mjs';
import { LogContext } from '../../types/log-context.type.mjs';

/**
 * IContextDehydrating defines the contract for context dehydrating events.
 * It provides methods for accessing information about context dehydration.
 */
interface IContextDehydrating extends ILogEvent {
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
/**
 * Namespace containing symbols for dependency injection
 */
declare namespace IContextDehydrating {
    /**
     * Symbol for injecting the context dehydrating event
     */
    const $: unique symbol;
}

export { IContextDehydrating };
